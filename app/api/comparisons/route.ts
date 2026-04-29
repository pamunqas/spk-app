import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { computeMoora } from '@/lib/moora'

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
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { matrix } = await req.json() as {
    matrix: Record<string, Record<string, number>>
  }

  if (!matrix || Object.keys(matrix).length < 2) {
    return NextResponse.json({ error: 'Matrix must include at least 2 providers' }, { status: 400 })
  }

  const providerIds = Object.keys(matrix)

  const [providers, criteria] = await Promise.all([
    prisma.provider.findMany({ where: { id: { in: providerIds }, status: 'active' } }),
    prisma.criterion.findMany({ orderBy: { position: 'asc' } }),
  ])

  const inputs = providers.map(p => ({
    id:             p.id,
    slug:           p.slug,
    name:           p.name,
    initials:       p.initials,
    color:          p.color,
    description:    p.description,
    mdrFee:         matrix[p.id]?.mdrFee          ?? 3,
    settlementTime: matrix[p.id]?.settlementTime  ?? 3,
    successRate:    matrix[p.id]?.successRate     ?? 3,
    setupFee:       matrix[p.id]?.setupFee        ?? 3,
    supportQuality: matrix[p.id]?.supportQuality  ?? 3,
  }))

  // All criteria treated as benefit: user's 5 always means best performance
  const crit = criteria.map(c => ({
    key:      c.key,
    label:    c.label,
    weight:   c.weight,
    type:     'benefit' as const,
    unit:     c.unit,
    position: c.position,
  }))

  const computation = computeMoora(inputs, crit)
  const winner = computation.results[0].provider.name

  const comparison = await prisma.comparison.create({
    data: {
      userId:      (session.user as any).id,
      providerIds: providerIds,
      winner,
      results:     computation.results as any,
    },
  })

  return NextResponse.json({
    ...comparison,
    results:    computation.results,
    normalized: computation.normalized,
    weighted:   computation.weighted,
    yiScores:   computation.yiScores,
  })
}
