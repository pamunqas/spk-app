import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

function createAuditLog(
  userId: string,
  action: string,
  entity: string,
  details?: Record<string, unknown>,
  req?: Request
) {
  return prisma.auditLog.create({
    data: {
      userId,
      action,
      entity,
      details: details as any,
      ip: req?.headers.get('x-forwarded-for') || req?.headers.get('x-real-ip') || 'unknown',
      userAgent: req?.headers.get('user-agent') || 'unknown',
    },
  }).catch(console.error)
}

export async function GET() {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
    include: {
      user: { select: { name: true, email: true } },
    },
  })

  return NextResponse.json(logs)
}

export { createAuditLog }