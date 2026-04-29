'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole]       = useState<'admin' | 'analyst'>('admin')
  const [email, setEmail]     = useState('admin@spkgateway.com')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleRoleChange = (r: 'admin' | 'analyst') => {
    setRole(r)
    setEmail(r === 'admin' ? 'admin@spkgateway.com' : 'user@spkgateway.com')
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Email atau kata sandi tidak valid.')
      return
    }
    // fetch session to know role
    const s = await fetch('/api/auth/session').then(r => r.json())
    const userRole = s?.user?.role
    router.replace(userRole === 'admin' ? '/admin/dashboard' : '/analyst/compare')
  }

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-grid" />
      <div className="login-wrap">
        <div className="login-brand">
          <div className="login-logo">
            <div className="login-logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-4 0v2"/>
              </svg>
            </div>
            SPK Payment Gateway
          </div>
          <div className="login-tagline">Kecerdasan Payment Gateway Berbasis MOORA</div>
        </div>

        <div className="login-card">
          <h2>Selamat datang kembali</h2>
          <p>Masuk untuk mengakses platform.</p>

          <div className="role-tabs">
            <div
              className={`role-tab${role === 'admin' ? ' active' : ''}`}
              onClick={() => handleRoleChange('admin')}
            >
              <div className="role-tab-icon">⚙️</div>
              <div className="role-tab-label">Admin</div>
              <div className="role-tab-sub">Kendali penuh platform</div>
            </div>
            <div
              className={`role-tab${role === 'analyst' ? ' active' : ''}`}
              onClick={() => handleRoleChange('analyst')}
            >
              <div className="role-tab-icon">🔍</div>
              <div className="role-tab-label">Analis</div>
              <div className="role-tab-sub">Bandingkan & analisis</div>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@anda.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Kata Sandi</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="login-hint">
                Admin: admin@spkgateway.com &nbsp;·&nbsp; Analis: user@spkgateway.com &nbsp;·&nbsp; Kata sandi: <strong>password</strong>
              </div>
            </div>
            {error && <div className="login-error">{error}</div>}
            <button className="btn-login" type="submit" disabled={loading}>
              {loading ? 'Masuk…' : 'Masuk →'}
            </button>
          </form>
          <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: 'var(--text-3)' }}>
            Belum punya akun?{' '}
            <Link href="/register" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>
              Daftar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
