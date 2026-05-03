import { handlers } from '@/auth'
import { prisma } from '@/lib/prisma'

export const GET = handlers.GET
export const POST = handlers.POST

export async function logAudit(userId: string, action: string, entity: string, req: Request) {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        entity,
        ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        userAgent: req.headers.get('user-agent') || 'unknown',
      },
    })
  } catch (e) {
    console.error('Audit log error:', e)
  }
}
