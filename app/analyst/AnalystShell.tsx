'use client'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

const NAV = [
  {
    href: '/analyst/dashboard',
    label: 'Dasbor',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  },
  {
    href: '/analyst/compare',
    label: 'Bandingkan Gateway',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    href: '/analyst/history',
    label: 'Riwayat Saya',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
]

const TITLES: Record<string, string> = {
  '/analyst/dashboard':   'Dasbor',
  '/analyst/compare':   'Bandingkan Gateway',
  '/analyst/history':   'Riwayat Perbandingan Saya',
  '/analyst/profile':   'Profil & Preferensi',
}

interface Props {
  children: React.ReactNode
  user: { name?: string | null; email?: string | null; role?: string }
}

export default function AnalystShell({ children, user }: Props) {
  const pathname = usePathname()
  const title = TITLES[pathname] ?? 'Analis'
  const initials = (user.name ?? 'A').split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="app-layout">
      <Sidebar
        items={NAV}
        userName={user.name ?? 'Analis'}
        userRole="Analis"
        initials={initials}
      />
      <div className="main-area">
        <div className="topbar">
          <div className="topbar-title">{title}</div>
          <span className="topbar-badge">Analis</span>
        </div>
        <div className="content-area">{children}</div>
      </div>
    </div>
  )
}
