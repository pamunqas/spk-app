'use client'
import { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PaymentIllustration from '@/components/PaymentIllustration'
import AuthBrand from '@/components/AuthBrand'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Email dan kata sandi wajib diisi.')
      return
    }
    setError('')
    setLoading(true)
    const res = await signIn('credentials', { email: email.toLowerCase().trim(), password, redirect: false })
    setLoading(false)
    if (res?.error) {
      setError('Email atau kata sandi tidak valid.')
      return
    }
    const sessionRes = await fetch('/api/auth/session')
    const sessionData = await sessionRes.json()
    const role = sessionData?.user?.role
    router.replace(role === 'admin' ? '/admin/dashboard' : '/analyst/dashboard')
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
            <p>Masuk untuk mengakses platform SPK Ecofarming.</p>
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

        {/* Demo credentials */}
        <div style={{
          marginTop: 12, padding: '10px 14px', borderRadius: 8,
          background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)',
          fontSize: 11, color: 'var(--text-3)', lineHeight: 1.6,
        }}>
          <strong style={{ color: '#F59E0B' }}>Akun Demo</strong><br />
          Admin: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 10, background: 'var(--surface)', padding: '1px 4px', borderRadius: 3 }}>admin@spkecofarming.com</code> / <code style={{ fontFamily: 'var(--font-mono)', fontSize: 10, background: 'var(--surface)', padding: '1px 4px', borderRadius: 3 }}>password</code><br />
          Analis: <code style={{ fontFamily: 'var(--font-mono)', fontSize: 10, background: 'var(--surface)', padding: '1px 4px', borderRadius: 3 }}>user@spkecofarming.com</code> / <code style={{ fontFamily: 'var(--font-mono)', fontSize: 10, background: 'var(--surface)', padding: '1px 4px', borderRadius: 3 }}>password</code>
        </div>
      </div>
    </div>
  )
}
