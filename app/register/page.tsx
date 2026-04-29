'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', company: '', title: '' })
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Kata sandi tidak cocok'); return }
    setLoading(true)
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password, company: form.company, title: form.title }),
    })
    setLoading(false)
    if (!res.ok) {
      const json = await res.json()
      setError(json.error ?? 'Pendaftaran gagal')
      return
    }
    setDone(true)
  }

  if (done) {
    return (
      <div className="login-page">
        <div className="login-bg" />
        <div className="login-grid" />
        <div className="login-wrap" style={{ position: 'relative', zIndex: 1 }}>
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
          </div>
          <div className="login-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
            <h2 style={{ marginBottom: 8 }}>Akun berhasil dibuat!</h2>
            <p style={{ marginBottom: 24 }}>Selamat datang, <strong>{form.name}</strong>. Silakan masuk untuk mulai menggunakan platform.</p>
            <button className="btn-login" onClick={() => router.push('/login')}>
              Masuk Sekarang →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="login-page">
      <div className="login-bg" />
      <div className="login-grid" />
      <div className="login-wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
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
          <h2>Buat Akun Baru</h2>
          <p>Daftar sebagai analis untuk mulai membandingkan gateway.</p>

          <form className="login-form" onSubmit={handleSubmit} style={{ gap: 12 }}>
            <div className="form-group">
              <label>Nama Lengkap</label>
              <input value={form.name} onChange={f('name')} placeholder="Nama Anda" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={f('email')} placeholder="email@anda.com" required />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div className="form-group">
                <label>Kata Sandi</label>
                <input type="password" value={form.password} onChange={f('password')} placeholder="Min. 6 karakter" required />
              </div>
              <div className="form-group">
                <label>Konfirmasi</label>
                <input type="password" value={form.confirm} onChange={f('confirm')} placeholder="Ulangi kata sandi" required />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div className="form-group">
                <label>Perusahaan <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(opsional)</span></label>
                <input value={form.company} onChange={f('company')} placeholder="Nama perusahaan" />
              </div>
              <div className="form-group">
                <label>Jabatan <span style={{ color: 'var(--text-3)', fontWeight: 400 }}>(opsional)</span></label>
                <input value={form.title} onChange={f('title')} placeholder="Misal: Analis" />
              </div>
            </div>

            {error && <div className="login-error">{error}</div>}

            <button className="btn-login" type="submit" disabled={loading}>
              {loading ? 'Mendaftar…' : 'Daftar Sekarang →'}
            </button>
          </form>

          <div style={{ marginTop: 16, textAlign: 'center', fontSize: 13, color: 'var(--text-3)' }}>
            Sudah punya akun?{' '}
            <Link href="/login" style={{ color: 'var(--primary-light)', textDecoration: 'none' }}>
              Masuk
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
