'use client'
import { useState, useCallback } from 'react'
import Toast from '@/components/Toast'

interface User { id: string; name: string | null; email: string | null; company: string | null; title: string | null }
interface Stats { comparisons: number; topWinner: string; topWinRate: string; joined: string }
type ToastState = { msg: string; type: 'green' | 'blue' | 'red' } | null

export default function ProfileClient({ user, stats }: { user: User; stats: Stats }) {
  const [name,    setName]    = useState(user.name    ?? '')
  const [email,   setEmail]   = useState(user.email   ?? '')
  const [company, setCompany] = useState(user.company ?? '')
  const [title,   setTitle]   = useState(user.title   ?? '')
  const [toast,   setToast]   = useState<ToastState>(null)
  const hideToast = useCallback(() => setToast(null), [])

  return (
    <>
      <div className="card-row">
        <div className="card">
          <div className="profile-section-title">Informasi Pribadi</div>
          <div className="profile-field"><label>Nama Lengkap</label><input value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="profile-field"><label>Alamat Email</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="profile-field"><label>Perusahaan</label><input value={company} onChange={e => setCompany(e.target.value)} /></div>
          <div className="profile-field"><label>Jabatan / Gelar</label><input value={title} onChange={e => setTitle(e.target.value)} /></div>
          <button className="btn-save" onClick={() => setToast({ msg: 'Profil berhasil diperbarui', type: 'green' })}>
            Simpan Profil
          </button>
        </div>

        <div className="card">
          <div className="profile-section-title">Preferensi Perbandingan</div>
          <div className="profile-field">
            <label>Fokus Pasar Default</label>
            <select>
              <option>Indonesia</option><option>Filipina</option>
              <option>Malaysia</option><option>Singapura</option><option>Semua Asia Tenggara</option>
            </select>
          </div>
          <div className="profile-field">
            <label>Jenis Bisnis</label>
            <select>
              <option>E-Commerce / Ritel</option><option>B2B / Enterprise</option>
              <option>SaaS / Langganan</option><option>Marketplace</option><option>UMKM / UKM</option>
            </select>
          </div>
          <div className="profile-field">
            <label>Kecepatan Penyelesaian Pilihan</label>
            <select>
              <option>Hari yang sama atau Real-time</option><option>D+1 (hari berikutnya)</option>
              <option>D+2 dapat diterima</option><option>Apa saja</option>
            </select>
          </div>

          <div className="profile-section-title" style={{ marginTop: 20 }}>Notifikasi</div>
          {[
            'Kirim email saat bobot diperbarui',
            'Beri tahu saat penyedia baru ditambahkan',
            'Ringkasan peringkat MOORA mingguan',
          ].map(n => (
            <label key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-2)', cursor: 'pointer', marginBottom: 10 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> {n}
            </label>
          ))}
          <button className="btn-save" onClick={() => setToast({ msg: 'Preferensi disimpan', type: 'green' })}>
            Simpan Preferensi
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div className="profile-section-title">Statistik Akun</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { val: stats.comparisons, label: 'Analisis', color: 'var(--primary-light)' },
            { val: `${stats.topWinRate}%`, label: `Tingkat Menang ${stats.topWinner}`, color: 'var(--gold)' },
            { val: stats.joined,      label: 'Anggota Sejak', color: 'var(--accent)', small: true },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: 14, background: 'var(--bg-3)', borderRadius: 'var(--r)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: s.small ? '1.1rem' : '1.6rem', fontWeight: 500, color: s.color, paddingTop: s.small ? 4 : 0 }}>
                {s.val}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </>
  )
}
