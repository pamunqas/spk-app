'use client'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'

const NAV = [
  {
    href: '/analyst/compare',
    label: 'Compare Gateways',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    href: '/analyst/history',
    label: 'My History',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    href: '/analyst/algorithm',
    label: 'How MOORA Works',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  },
  {
    href: '/analyst/profile',
    label: 'Profile',
    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  },
]

const TITLES: Record<string, string> = {
  '/analyst/compare':   'Compare Gateways',
  '/analyst/history':   'My Comparison History',
  '/analyst/algorithm': 'How MOORA Works',
  '/analyst/profile':   'Profile & Preferences',
}

interface Props {
  children: React.ReactNode
  user: { name?: string | null; email?: string | null; role?: string }
}

export default function AnalystShell({ children, user }: Props) {
  const pathname = usePathname()
  const title = TITLES[pathname] ?? 'Analyst'
  const initials = (user.name ?? 'A').split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="app-layout">
      <Sidebar
        items={NAV}
        userName={user.name ?? 'Analyst'}
        userRole="Analyst"
        initials={initials}
      />
      <div className="main-area">
        <div className="topbar">
          <div className="topbar-title">{title}</div>
          <span className="topbar-badge">Analyst</span>
        </div>
        <div className="content-area">{children}</div>
      </div>
    </div>
  )
}
