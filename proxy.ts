import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn  = !!req.auth
  const isLoginPage = nextUrl.pathname === '/login'
  const isAdmin     = nextUrl.pathname.startsWith('/admin')
  const isAnalyst   = nextUrl.pathname.startsWith('/analyst')

  if (!isLoggedIn && (isAdmin || isAnalyst)) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isLoggedIn && isLoginPage) {
    const role = (req.auth?.user as any)?.role
    return NextResponse.redirect(new URL(role === 'admin' ? '/admin/dashboard' : '/analyst/compare', req.url))
  }

  if (isLoggedIn && isAdmin && (req.auth?.user as any)?.role !== 'admin') {
    return NextResponse.redirect(new URL('/analyst/compare', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
