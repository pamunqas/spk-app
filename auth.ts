import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { authConfig } from './auth.config'

if (!authConfig.secret) {
  throw new Error('AUTH_SECRET must be defined in .env.local')
}

async function logAudit(userId: string, action: string, entity: string, details?: Record<string, unknown>) {
  try {
    await prisma.auditLog.create({
      data: { userId, action, entity, details: details as any },
    })
  } catch (e) {
    console.error('Audit log error:', e)
  }
}

export const { handlers, auth, signIn } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })
        if (!user) {
          await logAudit('unknown', 'LOGIN_FAILED', 'user', { email: credentials.email as string })
          return null
        }
        const ok = await bcrypt.compare(credentials.password as string, user.password)
        if (!ok) {
          await logAudit(user.id, 'LOGIN_FAILED', 'user')
          return null
        }
        await logAudit(user.id, 'LOGIN', 'user')
        return { id: user.id, email: user.email, name: user.name, role: user.role } as any
      },
    }),
  ],
})

export async function signOutWithAudit() {
  const session = await auth()
  if (session?.user?.id) {
    await logAudit(session.user.id, 'LOGOUT', 'user')
  }
  const { signOut: nextAuthSignOut } = await import('next-auth/react')
  await nextAuthSignOut()
}