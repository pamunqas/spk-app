import type { NextAuthConfig } from 'next-auth'

export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id   = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id         = token.id as string
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  providers: [],
}
