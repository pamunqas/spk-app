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

  let body: { matrix: Record<string, Record<string, number>> }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { matrix } = body
  if (!matrix || typeof matrix !== 'object' || Object.keys(matrix).length < 2) {
    return NextResponse.json({ error: 'Matrix must include at least 2 providers' }, { status: 400 })
  }

  const providerIds = Object.keys(matrix)
  for (const pid of providerIds) {
    if (!pid || typeof pid !== 'string') {
      return NextResponse.json({ error: 'Invalid provider ID' }, { status: 400 })
    }
    const providerData = matrix[pid]
    if (!providerData || typeof providerData !== 'object') {
      return NextResponse.json({ error: `Invalid data for provider ${pid}` }, { status: 400 })
    }
    const validKeys = ['mdrFee', 'settlementTime', 'successRate', 'setupFee', 'supportQuality']
    for (const key of Object.keys(providerData)) {
      if (!validKeys.includes(key)) {
        return NextResponse.json({ error: `Invalid criterion key: ${key}` }, { status: 400 })
      }
      const val = providerData[key]
      if (typeof val !== 'number' || !Number.isInteger(val) || val < 1 || val > 5) {
        return NextResponse.json({ error: `Invalid value for ${key}: must be integer 1-5` }, { status: 400 })
      }
    }
  }

  const [providers, criteria] = await Promise.all([
    prisma.provider.findMany({ where: { id: { in: providerIds }, status: 'active' } }),
    prisma.criterion.findMany({ orderBy: { position: 'asc' } }),
  ])

  if (providers.length !== providerIds.length) {
    const missing = providerIds.filter(id => !providers.find(p => p.id === id))
    return NextResponse.json({ error: `Providers not found: ${missing.join(', ')}` }, { status: 400 })
  }

  const inputs = providers.map(p => {
    const providerData = matrix[p.id] || {}
    return {
      id:             p.id,
      slug:           p.slug,
      name:           p.name,
      initials:       p.initials,
      color:          p.color,
      description:    p.description,
      mdrFee:         providerData.mdrFee ?? 3,
      settlementTime:  providerData.settlementTime ?? 3,
      successRate:   providerData.successRate ?? 3,
      setupFee:       providerData.setupFee ?? 3,
      supportQuality: providerData.supportQuality ?? 3,
    }
  })

  const crit = criteria.map(c => ({
    key:      c.key,
    label:    c.label,
    weight:   c.weight,
    type:     c.type as 'benefit' | 'cost',
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

export async function PATCH() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const userId = (session.user as any).id
  
  const userComparisons = await prisma.comparison.findMany({ where: { userId } })
  const totalComparisons = userComparisons.length
  
  const lastComparison = userComparisons[0]?.createdAt || null
  
  function getMonthlyCount(comparisons: typeof userComparisons, monthOffset: number): number {
    const now = new Date()
    const targetMonth = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1)
    const nextMonth = new Date(now.getFullYear(), now.getMonth() - monthOffset + 1, 1)
    return comparisons.filter(c => {
      const d = new Date(c.createdAt)
      return d >= targetMonth && d < nextMonth
    }).length
  }
  
  const monthlyActivity = [
    { label: 'Februari', value: getMonthlyCount(userComparisons, 3) },
    { label: 'Maret', value: getMonthlyCount(userComparisons, 2) },
    { label: 'April', value: getMonthlyCount(userComparisons, 1) },
    { label: 'Mei', value: getMonthlyCount(userComparisons, 0) },
  ]
  
  const thisMonth = new Date()
  thisMonth.setDate(1)
  thisMonth.setHours(0, 0, 0, 0)
  const monthlyCount = userComparisons.filter(c => new Date(c.createdAt) >= thisMonth).length
  
  const winnerCounts: Record<string, number> = {}
  userComparisons.forEach(c => {
    const winner = c.winner
    winnerCounts[winner] = (winnerCounts[winner] || 0) + 1
  })
  const sortedWinners = Object.entries(winnerCounts).sort((a, b) => b[1] - a[1])
  const mostChosen = sortedWinners[0]?.[0] || null
  const mostChosenCount = sortedWinners[0]?.[1] || 0
  
  const allComparisons = await prisma.comparison.findMany({
    select: { winner: true },
  })
  const globalWinnerCounts: Record<string, number> = {}
  allComparisons.forEach(c => {
    globalWinnerCounts[c.winner] = (globalWinnerCounts[c.winner] || 0) + 1
  })
  const trendingProviders = Object.entries(globalWinnerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }))
  
  const lastResult = userComparisons[0] ? {
    winner: userComparisons[0].winner,
    providerIds: userComparisons[0].providerIds,
    createdAt: userComparisons[0].createdAt,
    results: (userComparisons[0].results as any[])?.slice(0, 4).map((r: any, i: number) => ({
      rank: i + 1,
      name: r.provider?.name || r.winner || '',
      yiScore: r.yiScore,
    })),
  } : null
  
  const providers = await prisma.provider.findMany({ select: { id: true, name: true, initials: true, color: true, logo: true } })
  
  return NextResponse.json({
    totalComparisons,
    lastComparison,
    monthlyCount,
    mostChosen,
    mostChosenCount,
    monthlyActivity,
    trendingProviders,
    lastResult,
    providers,
  })
}
