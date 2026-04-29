import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import AnalystShell from './AnalystShell'

export default async function AnalystLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <SessionProvider session={session}>
      <AnalystShell user={session.user as any}>
        {children}
      </AnalystShell>
    </SessionProvider>
  )
}
