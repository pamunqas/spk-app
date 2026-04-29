import { prisma } from '@/lib/prisma'
import AnalyticsClient from './AnalyticsClient'

const CRITERION_COLORS: Record<string, string> = {
  mdrFee: '#F87171', settlementTime: '#F59E0B',
  successRate: '#10B981', setupFee: '#A78BFA', supportQuality: '#818CF8',
}

export default async function AdminAnalytics() {
  const [criteria, totalComparisons, comparisons] = await Promise.all([
    prisma.criterion.findMany({ orderBy: { position: 'asc' } }),
    prisma.comparison.count(),
    prisma.comparison.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
  ])

  console.log('[AdminAnalytics] totalComparisons:', totalComparisons, 'comparisons.length:', comparisons.length)

  // Tally winner frequency from DB
  const winnerCounts: Record<string, number> = {}
  comparisons.forEach(c => {
    winnerCounts[c.winner] = (winnerCounts[c.winner] || 0) + 1
  })
  console.log('[AdminAnalytics] winnerCounts:', winnerCounts)
  const sortedWinners = Object.entries(winnerCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)

  const popLabels = sortedWinners.map(([name]) => name)
  const popData   = sortedWinners.map(([, count]) =>
    totalComparisons ? parseFloat(((count / totalComparisons) * 100).toFixed(1)) : 0
  )
  console.log('[AdminAnalytics] popLabels:', popLabels, 'popData:', popData)

  const avgProviders = comparisons.length
    ? (comparisons.reduce((s, c) => s + c.providerIds.length, 0) / comparisons.length).toFixed(1)
    : '0'

  const mostCompared = popLabels[0] ?? '—'
  const winLeader    = popLabels[0] ?? '—'
  const winRate      = popData[0] ? popData[0].toFixed(0) : '0'

  return (
    <AnalyticsClient
      stats={{ totalComparisons, avgProviders, mostCompared, winLeader, winRate }}
      popLabels={popLabels}
      popData={popData}
      criteria={criteria.map(c => ({ ...c, color: CRITERION_COLORS[c.key] }))}
    />
  )
}
