'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PaymentIllustration from '@/components/PaymentIllustration'
import AuthBrand from '@/components/AuthBrand'

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
      <PaymentIllustration />
      <div className="login-grid" />
      <div className="login-wrap">
        <AuthBrand />

        <div className="login-card">
          <div className="login-card-header">
            <h2>Selamat datang kembali</h2>
            <p>Masuk untuk mengakses platform SPK Gateway.</p>
          </div>

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
              {loading ? <span className="btn-loading"><span className="spinner-icon"></span>Masuk...</span> : 'Masuk →'}
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
