'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: string | number
}

interface SidebarProps {
  items: NavItem[]
  userName: string
  userRole: string
  initials: string
}

export default function Sidebar({ items, userName, userRole, initials }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/login')
  }

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <svg width="28" height="28" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <defs>
              <linearGradient id="sb-logo-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4F46E5"/>
                <stop offset="55%" stopColor="#7C3AED"/>
                <stop offset="100%" stopColor="#A78BFA"/>
              </linearGradient>
            </defs>
            <path d="M28 2.5 L51 15.25 L51 40.75 L28 53.5 L5 40.75 L5 15.25 Z" fill="url(#sb-logo-bg)"/>
            <rect x="13" y="31" width="7" height="12" rx="2.5" fill="rgba(255,255,255,0.65)"/>
            <rect x="25" y="19" width="7" height="24" rx="2.5" fill="white"/>
            <rect x="37" y="26" width="7" height="17" rx="2.5" fill="rgba(255,255,255,0.7)"/>
            <circle cx="16.5" cy="29" r="3"   fill="rgba(255,255,255,0.78)"/>
            <circle cx="28.5" cy="17" r="3.8" fill="white"/>
            <circle cx="40.5" cy="24" r="3"   fill="rgba(255,255,255,0.82)"/>
            <polyline points="16.5,29 28.5,17 40.5,24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
          <div>
            <div className="sidebar-brand-name"><span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--primary-light)' }}>SPK</span><span style={{ fontStyle: 'italic' }}> Gateway</span></div>
            <div className="sidebar-brand-tag">Startup · Sleman</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`sidebar-nav-item${pathname === item.href ? ' active' : ''}`}
          >
            {item.icon}
            {item.label}
            {item.badge !== undefined && (
              <span className="nav-badge">{item.badge}</span>
            )}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{initials}</div>
          <div>
            <div className="sidebar-user-name">{userName}</div>
            <div className="sidebar-user-role">{userRole}</div>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Keluar
        </button>
      </div>
    </div>
  )
}
