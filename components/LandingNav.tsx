'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LandingNav() {
  const pathname = usePathname()
  const [policyOpen, setPolicyOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <div className="landing-nav">
      <div className="landing-logo">
        <Link href="/" className="landing-logo-link">
          <svg width="32" height="32" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <defs>
              <linearGradient id="nav-logo-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4F46E5"/>
                <stop offset="55%" stopColor="#7C3AED"/>
                <stop offset="100%" stopColor="#A78BFA"/>
              </linearGradient>
            </defs>
            <path d="M28 2.5 L51 15.25 L51 40.75 L28 53.5 L5 40.75 L5 15.25 Z" fill="url(#nav-logo-bg)"/>
            <rect x="13" y="31" width="7" height="12" rx="2.5" fill="rgba(255,255,255,0.65)"/>
            <rect x="25" y="19" width="7" height="24" rx="2.5" fill="white"/>
            <rect x="37" y="26" width="7" height="17" rx="2.5" fill="rgba(255,255,255,0.7)"/>
            <circle cx="16.5" cy="29" r="3"   fill="rgba(255,255,255,0.78)"/>
            <circle cx="28.5" cy="17" r="3.8" fill="white"/>
            <circle cx="40.5" cy="24" r="3"   fill="rgba(255,255,255,0.82)"/>
            <polyline points="16.5,29 28.5,17 40.5,24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" fill="none" strokeLinejoin="round" strokeLinecap="round"/>
          </svg>
          <span><span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--primary-light)' }}>SPK</span><span style={{ fontStyle: 'italic' }}> Gateway</span></span>
        </Link>
      </div>
      <div className="landing-nav-links">
        <Link href="/documentation" className={isActive('/documentation') ? 'active' : ''}>Dokumentasi</Link>
        <Link href="/developer" className={isActive('/developer') ? 'active' : ''}>Tentang Kami</Link>
        <div className="nav-dropdown" onMouseLeave={() => setPolicyOpen(false)}>
          <button 
            className={`nav-dropdown-btn ${isActive('/privacy') || isActive('/terms') || isActive('/providers') ? 'active' : ''}`} 
            onClick={() => setPolicyOpen(!policyOpen)} 
            onMouseEnter={() => setPolicyOpen(true)}
          >
            others <span className="dropdown-arrow">▼</span>
          </button>
          {policyOpen && (
            <div className="nav-dropdown-menu">
              <Link href="/providers">Payment Gateway</Link>
              <Link href="/privacy">Kebijakan Privasi</Link>
              <Link href="/terms">Ketentuan Layanan</Link>
            </div>
          )}
        </div>
        <Link href="/login" className="btn-login-nav">Masuk</Link>
      </div>
    </div>
  )
}