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
          <div className="sidebar-brand-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
              <line x1="12" y1="12" x2="12" y2="16"/>
            </svg>
          </div>
          <div>
            <div className="sidebar-brand-name">SPK Gateway</div>
            <div className="sidebar-brand-tag">Kecerdasan Pembayaran</div>
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
