'use client'
import { useState } from 'react'

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

const PLACE = [
  { medal: '🥇', color: 'var(--gold)',  border: 'rgba(245,158,11,0.25)',   bg: 'rgba(245,158,11,0.06)' },
  { medal: '🥈', color: '#94A3B8',      border: 'rgba(148,163,184,0.2)',   bg: 'rgba(148,163,184,0.04)' },
  { medal: '🥉', color: '#B4836B',      border: 'rgba(180,131,107,0.2)',   bg: 'rgba(180,131,107,0.04)' },
]

export default function HistoryClient({ comparisons }: { comparisons: ComparisonRow[] }) {
  const [expanded, setExpanded] = useState<string | null>(null)
  const toggle = (id: string) => setExpanded(prev => (prev === id ? null : id))

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="card-title">Perbandingan Sebelumnya</div>
      </div>

      {comparisons.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <div className="empty-state-title">Belum ada perbandingan</div>
          <div className="empty-state-sub">Jalankan analisis pertama Anda di tab Bandingkan</div>
        </div>
      ) : (
        <div>
          {comparisons.map(c => {
            const isOpen   = expanded === c.id
            const sorted   = [...c.results].sort((a, b) => a.rank - b.rank)
            const top3     = [sorted[0], sorted[1], sorted[2]]
            const maxScore = sorted[0]?.yiScore ?? 1
            const minScore = sorted[sorted.length - 1]?.yiScore ?? 0
            const range    = maxScore - minScore || 1

            return (
              <div key={c.id}>
                {/* ── Summary row ── */}
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
                  {/* Date */}
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>
                    {new Date(c.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                  </span>

                  {/* Podium slots — each takes 1fr */}
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

                  {/* Chevron */}
                  <svg
                    width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round"
                    style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {/* ── Expanded Yi scores ── */}
                {isOpen && (
                  <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-3)', padding: '12px 20px 16px' }}>
                    <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                      Peringkat Skor Yi — {sorted.length} Penyedia
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {sorted.map(r => {
                        const isWinner  = r.rank === 1
                        const pct       = ((r.yiScore - minScore) / range) * 100
                        const rankColor = isWinner ? 'var(--gold)' : r.rank === 2 ? '#94A3B8' : r.rank === 3 ? '#B4836B' : 'var(--text-3)'
                        const barColor  = isWinner ? 'var(--gold)' : r.rank === 2 ? '#94A3B8' : r.rank === 3 ? '#B4836B' : 'var(--primary)'
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
  )
}
