import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { computeMoora } from '@/lib/moora'
import type { ProviderInput, Criterion as MooraCriterion } from '@/lib/moora'

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id
  const comparisons = await prisma.comparison.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })
  return NextResponse.json(comparisons)
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const userEmail = (session.user as any).email
    const dbUser = await prisma.user.findUnique({ where: { email: userEmail } })
    if (!dbUser) {
      return NextResponse.json({ error: 'Sesi tidak valid. Silakan login ulang.' }, { status: 401 })
    }

    let body: { providerInputs: { id: string; harga: number; kandunganNutrisi: number; kualitas: number; dampak: number; ramahLingkungan: number; ketersediaan: number }[] }
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { providerInputs } = body
    if (!providerInputs || providerInputs.length < 2) {
      return NextResponse.json({ error: 'Pilih minimal 2 pupuk untuk dibandingkan' }, { status: 400 })
    }

    const [dbProviders, dbCriteria] = await Promise.all([
      prisma.provider.findMany({ where: { status: 'active' } }),
      prisma.criterion.findMany({ orderBy: { position: 'asc' } }),
    ])

    const providerMap = new Map(dbProviders.map(p => [p.id, p]))

    const mooraInputs: ProviderInput[] = providerInputs.map(pi => {
      const db = providerMap.get(pi.id)
      if (!db) throw new Error(`Provider not found: ${pi.id}`)
      return {
        id: db.id,
        slug: db.slug,
        name: db.name,
        initials: db.initials,
        color: db.color,
        description: db.description,
        harga: pi.harga,
        kandunganNutrisi: pi.kandunganNutrisi,
        kualitas: pi.kualitas,
        dampak: pi.dampak,
        ramahLingkungan: pi.ramahLingkungan,
        ketersediaan: pi.ketersediaan,
      }
    })

    const criteria: MooraCriterion[] = dbCriteria.map(c => ({
      key: c.key,
      label: c.label,
      weight: c.weight,
      type: c.type as 'benefit' | 'cost',
      unit: c.unit,
      position: c.position,
    }))

    const result = computeMoora(mooraInputs, criteria)

    const comparison = await prisma.comparison.create({
      data: {
        userId: dbUser.id,
        providerIds: mooraInputs.map(p => p.id),
        winner: result.results[0].provider.name,
        results: {
          inputs: mooraInputs.map(p => ({
            id: p.id,
            name: p.name,
            harga: p.harga,
            kandunganNutrisi: p.kandunganNutrisi,
            kualitas: p.kualitas,
            dampak: p.dampak,
            ramahLingkungan: p.ramahLingkungan,
            ketersediaan: p.ketersediaan,
          })),
          moora: result,
        } as any,
      },
    })

    prisma.auditLog.create({
      data: {
        userId: dbUser.id,
        action: 'CREATE',
        entity: 'comparison',
        entityId: comparison.id,
        details: { winner: result.results[0].provider.name, providerCount: mooraInputs.length } as any,
      },
    }).catch(console.error)

    return NextResponse.json(result)
  } catch (e: any) {
    console.error('POST /api/comparisons error:', e)
    return NextResponse.json({ error: e?.message ?? 'Terjadi kesalahan server' }, { status: 500 })
  }
}
