import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const criteria = await prisma.criterion.findMany({ orderBy: { position: 'asc' } })
  return NextResponse.json(criteria)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!Array.isArray(body) || body.length === 0) {
    return NextResponse.json({ error: 'Body harus berupa array criterion dengan id dan weight' }, { status: 400 })
  }

  const data = body as { id: string; weight: number }[]
  for (const item of data) {
    if (!item.id || typeof item.id !== 'string') {
      return NextResponse.json({ error: 'Setiap item harus memiliki id yang valid' }, { status: 400 })
    }
    if (typeof item.weight !== 'number' || item.weight < 0 || item.weight > 1) {
      return NextResponse.json({ error: 'Weight harus berupa angka antara 0 dan 1' }, { status: 400 })
    }
  }

  const criteria = await prisma.criterion.findMany({
    where: { id: { in: data.map(d => d.id) } },
    select: { id: true },
  })
  if (criteria.length !== data.length) {
    const foundIds = new Set(criteria.map(c => c.id))
    const invalid = data.filter(d => !foundIds.has(d.id)).map(d => d.id)
    return NextResponse.json({ error: `Criterion tidak ditemukan: ${invalid.join(', ')}` }, { status: 400 })
  }

  const total = data.reduce((s, c) => s + c.weight, 0)
  if (Math.abs(total - 1) > 0.001) {
    return NextResponse.json({ error: 'Weights must sum to 1.00' }, { status: 400 })
  }
  await Promise.all(
    data.map(c => prisma.criterion.update({ where: { id: c.id }, data: { weight: c.weight } }))
  )
  
  prisma.auditLog.create({
    data: {
      userId: (session.user as any).id,
      action: 'UPDATE',
      entity: 'weight',
      details: { weights: data } as any,
    },
  }).catch(console.error)
  
  return NextResponse.json({ ok: true })
}
