'use client'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

const NAV = [
  {
    href: '/admin/dashboard',
    label: 'Dasbor',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    href: '/admin/analytics',
    label: 'Analitik',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  },
  {
    href: '/admin/providers',
    label: 'Penyedia',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  },
  {
    href: '/admin/weights',
    label: 'Kriteria & Bobot',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>,
  },
  {
    href: '/admin/users',
    label: 'Pengguna',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    href: '/admin/audit',
    label: 'Riwayat Aktivitas',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  },
]

const TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dasbor',
  '/admin/analytics': 'Analitik',
  '/admin/providers': 'Manajemen Penyedia',
  '/admin/weights':   'Kriteria & Bobot',
  '/admin/users':     'Manajemen Pengguna',
  '/admin/audit':     'Riwayat Aktivitas',
}

interface Props {
  children: React.ReactNode
  user: { name?: string | null; email?: string | null; role?: string }
}

export default function AdminShell({ children, user }: Props) {
  const pathname = usePathname()
  const title = TITLES[pathname] ?? 'Admin'
  const initials = (user.name ?? 'A').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="app-layout">
      <Sidebar
        items={NAV}
        userName={user.name ?? 'Admin'}
        userRole="Administrator"
        initials={initials}
      />
      <div className="main-area">
        <div className="topbar">
          <div className="topbar-title">{title}</div>
          <span className="topbar-badge">Admin</span>
        </div>
        <div className="content-area">{children}</div>
      </div>
    </div>
  )
}
