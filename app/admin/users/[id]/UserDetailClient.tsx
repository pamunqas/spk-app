'use client'
import { useState } from 'react'
import Link from 'next/link'

interface MooraResult {
  rank: number
  yiScore: number
  provider: { id: string; name: string; initials: string; color: string }
}

interface ComparisonRow {
  id: string
  createdAt: string
  winner: string
  results: MooraResult[]
}

interface UserProfile {
  id: string
  name: string
  email: string
  role: string
  company: string | null
  title: string | null
  avatarColor: string
  createdAt: string
  comparisons: ComparisonRow[]
}

const PLACE = [
  { medal: '🥇', color: 'var(--gold)',  border: 'rgba(245,158,11,0.25)',   bg: 'rgba(245,158,11,0.06)' },
  { medal: '🥈', color: '#94A3B8',      border: 'rgba(148,163,184,0.2)',   bg: 'rgba(148,163,184,0.04)' },
  { medal: '🥉', color: '#B4836B',      border: 'rgba(180,131,107,0.2)',   bg: 'rgba(180,131,107,0.04)' },
]

export default function UserDetailClient({ user }: { user: UserProfile }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const toggle = (id: string) => setExpanded(prev => (prev === id ? null : id))

  const initials = user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Back link */}
      <div>
        <Link href="/admin/users" style={{ color: 'var(--text-3)', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Kembali ke Manajemen Pengguna
        </Link>
      </div>

      {/* Profile card */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{
            width: 64, height: 64, borderRadius: 16, background: user.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'white', flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>{user.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 6 }}>{user.email}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {user.company && (
                <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: 'var(--bg-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}>
                  🏢 {user.company}
                </span>
              )}
              {user.title && (
                <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: 'var(--bg-3)', color: 'var(--text-2)', border: '1px solid var(--border)' }}>
                  💼 {user.title}
                </span>
              )}
              <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 20, background: 'rgba(99,102,241,0.1)', color: 'var(--primary-light)', border: '1px solid rgba(99,102,241,0.2)' }}>
                {user.role === 'analyst' ? 'Analis' : 'Admin'}
              </span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, textAlign: 'center' }}>
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 700, color: 'var(--primary-light)' }}>
                {user.comparisons.length}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Analisis</div>
            </div>
            <div style={{ padding: '12px 16px', borderRadius: 10, background: 'var(--bg-3)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)' }}>
                {new Date(user.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Bergabung</div>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison history */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
          <div className="card-title">Riwayat Analisis</div>
        </div>

        {user.comparisons.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-title">Belum ada analisis</div>
            <div className="empty-state-sub">Pengguna ini belum menjalankan perbandingan apapun</div>
          </div>
        ) : (
          <div>
            {user.comparisons.map(c => {
              const isOpen = expanded === c.id
              const sorted = [...c.results].sort((a, b) => a.rank - b.rank)
              const top3   = [sorted[0], sorted[1], sorted[2]]

              return (
                <div key={c.id}>
                  <div
                    onClick={() => toggle(c.id)}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '80px 1fr 1fr 1fr 32px',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 20px',
                      cursor: 'pointer',
                      borderBottom: isOpen ? 'none' : '1px solid var(--border)',
                      background: isOpen ? 'rgba(99,102,241,0.03)' : 'transparent',
                      transition: 'background 0.15s',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
                      {new Date(c.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>

                    {top3.map((r, i) => {
                      const p = PLACE[i]
                      if (!r) return <div key={i} />
                      return (
                        <div key={i} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '7px 11px', borderRadius: 9,
                          border: `1px solid ${p.border}`, background: p.bg,
                          overflow: 'hidden', minWidth: 0,
                        }}>
                          <span style={{ fontSize: 15, flexShrink: 0 }}>{p.medal}</span>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{
                              fontSize: 12, fontWeight: 600, color: p.color,
                              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}>
                              {r.provider.name}
                            </div>
                            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-3)', marginTop: 1 }}>
                              {Number(r.yiScore).toFixed(4)}
                            </div>
                          </div>
                        </div>
                      )
                    })}

                    <svg
                      width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round"
                      style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  {isOpen && (
                    <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-3)', padding: '12px 20px 16px' }}>
                      <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                        Peringkat Skor Yi — {sorted.length} Penyedia
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {top3.filter(Boolean).map(r => {
                          const isWinner  = r.rank === 1
                          const rankColor = isWinner ? 'var(--gold)' : r.rank === 2 ? '#94A3B8' : '#B4836B'
                          const barColor  = isWinner ? 'var(--gold)' : r.rank === 2 ? '#94A3B8' : '#B4836B'
                          const maxScore  = top3[0]?.yiScore ?? 1
                          const minScore  = top3[top3.length - 1]?.yiScore ?? 0
                          const range     = maxScore - minScore || 1
                          const pct       = ((r.yiScore - minScore) / range) * 100
                          return (
                            <div key={r.provider.id} style={{
                              display: 'grid',
                              gridTemplateColumns: '28px 1fr 80px 140px',
                              alignItems: 'center',
                              gap: 14,
                              padding: '9px 14px',
                              borderRadius: 9,
                              background: isWinner ? 'rgba(245,158,11,0.06)' : 'var(--surface)',
                              border: `1px solid ${isWinner ? 'rgba(245,158,11,0.2)' : 'var(--border)'}`,
                            }}>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, color: rankColor }}>
                                #{r.rank}
                              </span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                                <div style={{
                                  width: 24, height: 24, borderRadius: 6, background: r.provider.color, flexShrink: 0,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  fontFamily: 'var(--font-mono)', fontSize: 9, color: 'white',
                                }}>
                                  {r.provider.initials}
                                </div>
                                <span style={{ fontSize: 13, fontWeight: isWinner ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {r.provider.name}
                                </span>
                                {isWinner && <span style={{ fontSize: 10, flexShrink: 0 }}>🏆</span>}
                              </div>
                              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: isWinner ? 'var(--gold)' : 'var(--text)', textAlign: 'right' }}>
                                {Number(r.yiScore).toFixed(4)}
                              </span>
                              <div style={{ height: 5, background: 'var(--surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ width: `${pct}%`, height: '100%', borderRadius: 3, background: barColor }} />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
