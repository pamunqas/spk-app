'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PaymentIllustration from '@/components/PaymentIllustration'
import AuthBrand from '@/components/AuthBrand'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', company: '', title: '' })
  const [acceptPolicy, setAcceptPolicy] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!acceptPolicy) { setError('Anda harus menyetujui Kebijakan Privasi dan Ketentuan Layanan'); return }
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
          <AuthBrand />
          <div className="login-card" style={{ textAlign: 'center' }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--green-dim)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2.2" width="24" height="24">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
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
      <PaymentIllustration />
      <div className="login-grid" />
      <div className="login-wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 460 }}>
        <AuthBrand />

        <div className="login-card">
          <div className="login-card-header">
            <h2>Buat Akun Baru</h2>
            <p>Daftar sebagai analis untuk mulai membandingkan gateway.</p>
          </div>

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

            <label className="policy-checkbox">
              <input 
                type="checkbox" 
                checked={acceptPolicy} 
                onChange={e => setAcceptPolicy(e.target.checked)} 
              />
              <span>
                Saya setuju dengan{' '}
                <Link href="/privacy" target="_blank" style={{ color: 'var(--primary-light)' }}>Kebijakan Privasi</Link>
                {' '}dan{' '}
                <Link href="/terms" target="_blank" style={{ color: 'var(--primary-light)' }}>Ketentuan Layanan</Link>
              </span>
            </label>

<button className="btn-login" type="submit" disabled={loading || !acceptPolicy}>
              {loading ? <span className="btn-loading"><span className="spinner-icon"></span>Mendaftar...</span> : 'Daftar Sekarang →'}
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
