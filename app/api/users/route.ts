import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'asc' },
    select: { id: true, name: true, email: true, role: true, company: true, title: true, avatarColor: true, createdAt: true },
  })
  const usersWithComparisonCount = await prisma.user.findMany({
    where: { id: { in: users.map(u => u.id) } },
    include: { _count: { select: { comparisons: true } } },
  })
  const countMap = new Map(usersWithComparisonCount.map(u => [u.id, u._count.comparisons]))
  const withCount = users.map(u => ({ ...u, comparisons: countMap.get(u.id) ?? 0 }))
  return NextResponse.json(withCount)
}
