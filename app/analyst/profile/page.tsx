import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import ProfileClient from './ProfileClient'

export default async function ProfilePage() {
  const session = await auth()
  const userId  = (session?.user as any)?.id
  const user    = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, company: true, title: true },
  })
  const comparisons = await prisma.comparison.count({ where: { userId } })
  const winnerCounts: Record<string, number> = {}
  const history = await prisma.comparison.findMany({ where: { userId }, select: { winner: true, providerIds: true } })
  history.forEach(c => { winnerCounts[c.winner] = (winnerCounts[c.winner] || 0) + 1 })
  const topWinner = Object.entries(winnerCounts).sort((a, b) => b[1] - a[1])[0]
  const topWinRate = topWinner ? ((topWinner[1] / comparisons) * 100).toFixed(0) : '0'
  const exploredSet = new Set(history.flatMap(c => c.providerIds))
  const joinedDate = await prisma.user.findUnique({ where: { id: userId }, select: { createdAt: true } })

  return (
    <ProfileClient
      user={user ?? { id: userId, name: '', email: '', company: null, title: null }}
      stats={{
        comparisons,
        explored: exploredSet.size,
        topWinner: topWinner?.[0] ?? '—',
        topWinRate,
        joined: joinedDate?.createdAt
          ? new Date(joinedDate.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          : '—',
      }}
    />
  )
}
