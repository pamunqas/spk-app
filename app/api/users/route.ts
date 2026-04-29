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
    where: { role: 'analyst' },
  })
  // attach comparison count
  const withCount = await Promise.all(
    users.map(async u => ({
      ...u,
      comparisons: await prisma.comparison.count({ where: { userId: u.id } }),
    }))
  )
  return NextResponse.json(withCount)
}
