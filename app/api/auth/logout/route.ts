import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export async function POST() {
  const session = await auth()
  if (session?.user?.id) {
    const { prisma } = await import('@/lib/prisma')
    await prisma.auditLog.create({
      data: {
        userId: session.user.id as string,
        action: 'LOGOUT',
        entity: 'user',
      },
    }).catch(console.error)
  }
  return NextResponse.json({ ok: true })
}
