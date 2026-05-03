import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import AnalystShell from './AnalystShell'

export default async function AnalystLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session) redirect('/login')

  const user = (session?.user as any) || { name: 'Analis', email: '' }

  return (
    <SessionProvider session={session}>
      <AnalystShell user={user}>
        {children}
      </AnalystShell>
    </SessionProvider>
  )
}
