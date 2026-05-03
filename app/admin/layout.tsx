import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { SessionProvider } from 'next-auth/react'
import AdminShell from './AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'admin') redirect('/login')

  const user = (session?.user as any) || { name: 'Admin', email: '' }

  return (
    <SessionProvider session={session}>
      <AdminShell user={user}>
        {children}
      </AdminShell>
    </SessionProvider>
  )
}
