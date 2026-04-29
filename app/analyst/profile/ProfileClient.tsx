'use client'
import { useState, useCallback } from 'react'
import Toast from '@/components/Toast'

interface User { id: string; name: string | null; email: string | null; company: string | null; title: string | null }
interface Stats { comparisons: number; explored: number; topWinner: string; topWinRate: string; joined: string }
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
          <div className="profile-section-title">Personal Information</div>
          <div className="profile-field"><label>Full Name</label><input value={name} onChange={e => setName(e.target.value)} /></div>
          <div className="profile-field"><label>Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} /></div>
          <div className="profile-field"><label>Company</label><input value={company} onChange={e => setCompany(e.target.value)} /></div>
          <div className="profile-field"><label>Role / Title</label><input value={title} onChange={e => setTitle(e.target.value)} /></div>
          <button className="btn-save" onClick={() => setToast({ msg: 'Profile updated successfully', type: 'green' })}>
            Save Profile
          </button>
        </div>

        <div className="card">
          <div className="profile-section-title">Comparison Preferences</div>
          <div className="profile-field">
            <label>Default Market Focus</label>
            <select>
              <option>Indonesia</option><option>Philippines</option>
              <option>Malaysia</option><option>Singapore</option><option>All SEA</option>
            </select>
          </div>
          <div className="profile-field">
            <label>Business Type</label>
            <select>
              <option>E-Commerce / Retail</option><option>B2B / Enterprise</option>
              <option>SaaS / Subscription</option><option>Marketplace</option><option>MSME / SMB</option>
            </select>
          </div>
          <div className="profile-field">
            <label>Preferred Settlement Speed</label>
            <select>
              <option>Same-day or Real-time</option><option>D+1 (next day)</option>
              <option>D+2 is acceptable</option><option>Any</option>
            </select>
          </div>

          <div className="profile-section-title" style={{ marginTop: 20 }}>Notifications</div>
          {[
            'Email me when weights are updated',
            'Alert me when new providers are added',
            'Weekly MOORA ranking digest',
          ].map(n => (
            <label key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-2)', cursor: 'pointer', marginBottom: 10 }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} /> {n}
            </label>
          ))}
          <button className="btn-save" onClick={() => setToast({ msg: 'Preferences saved', type: 'green' })}>
            Save Preferences
          </button>
        </div>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div className="profile-section-title">Account Stats</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))', gap: 12 }}>
          {[
            { val: stats.comparisons, label: 'Analyses', color: 'var(--primary-light)' },
            { val: stats.explored,    label: 'Providers Tested', color: 'var(--gold)' },
            { val: `${stats.topWinRate}%`, label: `${stats.topWinner} Win Rate`, color: 'var(--green)' },
            { val: stats.joined,      label: 'Member Since', color: 'var(--accent)', small: true },
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
