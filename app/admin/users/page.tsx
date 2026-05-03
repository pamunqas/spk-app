import { prisma } from '@/lib/prisma'
import UsersClient from './UsersClient'

export default async function AdminUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, email: true, role: true, company: true, title: true, avatarColor: true, createdAt: true },
  })
  const withCount = await Promise.all(
    users.map(async u => ({
      ...u,
      comparisons: await prisma.comparison.count({ where: { userId: u.id } }),
    }))
  )
  const totalComparisons = await prisma.comparison.count()
  const mostActive = [...withCount].sort((a, b) => b.comparisons - a.comparisons)[0]
  const avg = withCount.length ? (withCount.reduce((s, u) => s + u.comparisons, 0) / withCount.length).toFixed(1) : '0'

  return (
    <UsersClient
      users={withCount}
      stats={{ total: withCount.length, totalComparisons, mostActive: mostActive?.name ?? '—', avg }}
    />
  )
}
