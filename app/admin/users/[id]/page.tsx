import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import UserDetailClient from './UserDetailClient'

export default async function AdminUserDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true, name: true, email: true, role: true,
      company: true, title: true, avatarColor: true, createdAt: true,
      comparisons: {
        orderBy: { createdAt: 'desc' },
        select: { id: true, createdAt: true, winner: true, results: true },
      },
    },
  })

  if (!user) notFound()

  const serialized = {
    ...user,
    createdAt: user.createdAt.toISOString(),
    comparisons: user.comparisons.map(c => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
      results: ((c.results as any[]) ?? []).map((r: any) => ({
        ...r,
        yiScore: Number(r.yiScore ?? 0),
        rank:    Number(r.rank    ?? 0),
      })) as {
        rank: number
        yiScore: number
        provider: { id: string; name: string; initials: string; color: string }
      }[],
    })),
  }

  return <UserDetailClient user={serialized} />
}
