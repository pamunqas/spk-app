'use client'
import { useState } from 'react'
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
      setError('Invalid email or password.')
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
          <div className="login-tagline">MOORA-Powered Payment Gateway Intelligence</div>
        </div>

        <div className="login-card">
          <h2>Welcome back</h2>
          <p>Sign in to access the platform.</p>

          <div className="role-tabs">
            <div
              className={`role-tab${role === 'admin' ? ' active' : ''}`}
              onClick={() => handleRoleChange('admin')}
            >
              <div className="role-tab-icon">⚙️</div>
              <div className="role-tab-label">Admin</div>
              <div className="role-tab-sub">Full platform control</div>
            </div>
            <div
              className={`role-tab${role === 'analyst' ? ' active' : ''}`}
              onClick={() => handleRoleChange('analyst')}
            >
              <div className="role-tab-icon">🔍</div>
              <div className="role-tab-label">Analyst</div>
              <div className="role-tab-sub">Compare & analyse</div>
            </div>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <div className="login-hint">
                Admin: admin@spkgateway.com &nbsp;·&nbsp; Analyst: user@spkgateway.com &nbsp;·&nbsp; Password: <strong>password</strong>
              </div>
            </div>
            {error && <div className="login-error">{error}</div>}
            <button className="btn-login" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
