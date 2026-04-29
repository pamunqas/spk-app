'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import type { Provider, Criterion } from '@prisma/client'
import type { MooraResult } from '@/lib/moora'
import Toast from '@/components/Toast'

interface Props {
  providers: Provider[]
  criteria: Criterion[]
}

interface ComputationData {
  results:    MooraResult[]
  normalized: Record<string, Record<string, number>>
  weighted:   Record<string, Record<string, number>>
  yiScores:   Record<string, number>
  winner:     string
}

type ToastState = { msg: string; type: 'green' | 'blue' | 'red' } | null

const CRITERION_COLORS: Record<string, string> = {
  mdrFee: '#F87171', settlementTime: '#F59E0B',
  successRate: '#10B981', setupFee: '#A78BFA', supportQuality: '#818CF8',
}

function buildDefaultMatrix(providers: Provider[], criteria: Criterion[]) {
  const m: Record<string, Record<string, number>> = {}
  providers.forEach(p => {
    m[p.id] = {}
    criteria.forEach(c => { m[p.id][c.key] = 3 })
  })
  return m
}

export default function CompareClient({ providers, criteria }: Props) {
  const [matrix, setMatrix]       = useState(() => buildDefaultMatrix(providers, criteria))
  const [data, setData]           = useState<ComputationData | null>(null)
  const [computing, setComputing] = useState(false)
  const [matrixOpen, setMatrixOpen] = useState(true)
  const [toast, setToast]         = useState<ToastState>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const hideToast  = useCallback(() => setToast(null), [])

  const setScore = (providerId: string, criterionKey: string, val: number) => {
    const clamped = Math.min(5, Math.max(1, Math.round(val)))
    setMatrix(prev => ({ ...prev, [providerId]: { ...prev[providerId], [criterionKey]: clamped } }))
  }

  const resetMatrix = () => {
    setMatrix(buildDefaultMatrix(providers, criteria))
    setData(null)
    setMatrixOpen(true)
  }

  const runMoora = async () => {
    setComputing(true)
    try {
      const res = await fetch('/api/comparisons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matrix }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      setData({ results: json.results, normalized: json.normalized, weighted: json.weighted, yiScores: json.yiScores, winner: json.winner })
      setMatrixOpen(false)
      setToast({ msg: `Analisis selesai — ${json.winner} menang`, type: 'green' })
    } catch (e: any) {
      setToast({ msg: e.message ?? 'Gagal menjalankan analisis', type: 'red' })
    } finally {
      setComputing(false)
    }
  }

  useEffect(() => {
    if (!data) return
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }, [data])

  const winner = data?.results[0]

  return (
    <>
      {/* Active weights */}
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)' }}>
          <div className="card-title">Bobot Kriteria</div>
        </div>
        <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {criteria.map(c => (
            <div key={c.key} style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: CRITERION_COLORS[c.key], flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-2)' }}>{c.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 600, color: CRITERION_COLORS[c.key] }}>{(c.weight * 100).toFixed(0)}%</span>
              </div>
              <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 2 }}>
                <div style={{ width: `${(c.weight * 100)}%`, height: '100%', background: CRITERION_COLORS[c.key], borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Matrix */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
        <div
          style={{ padding: '14px 20px', borderBottom: matrixOpen ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, cursor: 'pointer' }}
          onClick={() => setMatrixOpen(o => !o)}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round"
              style={{ transform: matrixOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            <div className="card-title" style={{ marginBottom: 0 }}>LANGKAH 1 — Matriks Keputusan</div>
          </div>
          {matrixOpen && (
            <button
              className="btn-ghost"
              onClick={e => { e.stopPropagation(); resetMatrix() }}
              style={{ fontSize: 11, flexShrink: 0 }}
            >
              Reset ke default
            </button>
          )}
        </div>

        {matrixOpen && (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ minWidth: 160 }}>Penyedia</th>
                  {criteria.map(c => (
                    <th key={c.key} style={{ textAlign: 'center', minWidth: 110 }}>
                      <div style={{ color: CRITERION_COLORS[c.key] }}>{c.label}</div>
                      <div style={{ fontSize: 9, fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--text-3)', marginTop: 2 }}>
                        {c.type === 'benefit' ? '↑ lebih tinggi = lebih baik' : '5 = terendah (terbaik)'}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {providers.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div style={{ width: 28, height: 28, borderRadius: 7, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 9, fontWeight: 500, color: 'white', flexShrink: 0 }}>
                          {p.initials}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</span>
                      </div>
                    </td>
                    {criteria.map(c => {
                      const val = matrix[p.id]?.[c.key] ?? 3
                      return (
                        <td key={c.key} style={{ textAlign: 'center', padding: '8px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                            <button onClick={() => setScore(p.id, c.key, val - 1)} disabled={val <= 1}
                              style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid var(--border-2)', background: 'var(--bg-3)', color: 'var(--text-2)', cursor: val <= 1 ? 'not-allowed' : 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: val <= 1 ? 0.3 : 1 }}>
                              −
                            </button>
                            <div style={{
                              width: 32, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600,
                              background: val === 5 ? 'rgba(16,185,129,0.15)' : val === 4 ? 'rgba(16,185,129,0.08)' : val === 3 ? 'var(--surface-2)' : val === 2 ? 'rgba(248,113,113,0.08)' : 'rgba(248,113,113,0.15)',
                              color: val >= 4 ? 'var(--green)' : val === 3 ? 'var(--text-2)' : 'var(--red)',
                              border: '1px solid',
                              borderColor: val >= 4 ? 'rgba(16,185,129,0.25)' : val === 3 ? 'var(--border)' : 'rgba(248,113,113,0.25)',
                            }}>
                              {val}
                            </div>
                            <button onClick={() => setScore(p.id, c.key, val + 1)} disabled={val >= 5}
                              style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid var(--border-2)', background: 'var(--bg-3)', color: 'var(--text-2)', cursor: val >= 5 ? 'not-allowed' : 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: val >= 5 ? 0.3 : 1 }}>
                              +
                            </button>
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Scale legend — only when matrix is visible */}
      {matrixOpen && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
          {[
            { score: 5, label: 'Sangat Baik',  color: 'var(--green)',   bg: 'rgba(16,185,129,0.12)' },
            { score: 4, label: 'Baik',         color: 'var(--green)',   bg: 'rgba(16,185,129,0.06)' },
            { score: 3, label: 'Rata-rata',    color: 'var(--text-2)',  bg: 'var(--surface-2)' },
            { score: 2, label: 'Buruk',        color: 'var(--red)',     bg: 'rgba(248,113,113,0.06)' },
            { score: 1, label: 'Sangat Buruk', color: 'var(--red)',     bg: 'rgba(248,113,113,0.12)' },
          ].map(s => (
            <div key={s.score} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6, background: s.bg, border: '1px solid var(--border)', fontSize: 11, color: s.color }}>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{s.score}</strong> — {s.label}
            </div>
          ))}
        </div>
      )}

      {/* Run button */}
      <button
        className={`btn-compare ready${computing ? ' computing' : ''}`}
        onClick={runMoora}
        disabled={computing}
      >
        <span>{computing ? 'Menghitung…' : 'Jalankan Analisis'}</span>
        <div className="spinner" />
      </button>

      {/* ==================== RESULTS ==================== */}
      {data && winner && (
        <div style={{ marginTop: 28 }} ref={resultsRef}>
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--border-2),transparent)', marginBottom: 24 }} />

          <div className="recalc-bar">
            <div className="recalc-info">
              Peringkat <strong>{data.results.length}</strong> penyedia berdasarkan <strong>{criteria.length}</strong> kriteria
            </div>
            <button
              onClick={resetMatrix}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 'var(--r-sm)',
                background: 'var(--primary)', color: 'white', border: 'none',
                fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
                cursor: 'pointer', transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--primary-light)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--primary)')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
              </svg>
              Analisis Baru
            </button>
          </div>

          {/* Top 3 */}
          <div className="results-bento">
            <div className="bento-card winner-card">
              <div className="winner-crown">🏆</div>
              <div className="winner-badge">Pilihan Optimal</div>
              <div className="winner-name">{winner.provider.name}</div>
              <div className="winner-desc">{winner.provider.description}</div>
              <div className="winner-score-row">
                <span className="winner-score-num">{winner.yiScore.toFixed(4)}</span>
                <span className="winner-score-label">skor yi</span>
              </div>
              {winner.strengths.length > 0 && (
                <ul className="strengths-list">
                  {winner.strengths.map(s => (
                    <li key={s} className="strength-item"><span className="strength-dot" />{s}</li>
                  ))}
                </ul>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {data.results.slice(1, 3).map(r => {
                const medal = r.rank === 2 ? '🥈' : '🥉'
                const accentColor = r.rank === 2 ? '#94A3B8' : '#B4836B'
                const borderColor = r.rank === 2 ? 'rgba(148,163,184,0.25)' : 'rgba(180,131,107,0.25)'
                const bgGradient = r.rank === 2
                  ? 'linear-gradient(135deg, rgba(148,163,184,0.06), var(--surface))'
                  : 'linear-gradient(135deg, rgba(180,131,107,0.06), var(--surface))'
                return (
                  <div key={r.provider.id} className="bento-card" style={{ flex: 1, borderColor, background: bgGradient }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 22 }}>{medal}</span>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: accentColor, marginBottom: 2 }}>
                          Peringkat #{r.rank}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{r.provider.name}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5, marginBottom: 10 }}>{r.provider.description}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: r.strengths.length > 0 ? 10 : 0 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: accentColor }}>{r.yiScore.toFixed(4)}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-3)' }}>skor yi</span>
                    </div>
                    {r.strengths.length > 0 && (
                      <ul className="strengths-list">
                        {r.strengths.slice(0, 2).map(s => (
                          <li key={s} className="strength-item">
                            <span className="strength-dot" style={{ background: accentColor }} />{s}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Computation tables ── */}
          <ComputationTables data={data} providers={providers} criteria={criteria} />
        </div>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </>
  )
}

/* ── Sub-component: three computation tables ── */
function ComputationTables({
  data, providers, criteria,
}: {
  data: ComputationData
  providers: Provider[]
  criteria: Criterion[]
}) {
  // sort providers by rank for display
  const ranked = [...providers].sort((a, b) => {
    const ra = data.results.find(r => r.provider.id === a.id)?.rank ?? 99
    const rb = data.results.find(r => r.provider.id === b.id)?.rank ?? 99
    return ra - rb
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>

      {/* 1 – Normalised matrix */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <div className="card-title" style={{ marginBottom: 4 }}>Langkah 2 — Matriks Keputusan Ternormalisasi</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>x*ij = xij / √(Σ xij²) — setiap nilai dibagi norma Euclidean kolomnya</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Penyedia</th>
                {criteria.map(c => (
                  <th key={c.key} style={{ textAlign: 'right', color: CRITERION_COLORS[c.key] }}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranked.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 5, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'white', flexShrink: 0 }}>{p.initials}</div>
                      <span style={{ fontSize: 12 }}>{p.name}</span>
                    </div>
                  </td>
                  {criteria.map(c => (
                    <td key={c.key} className="cell-mono" style={{ textAlign: 'right', color: 'var(--text-2)' }}>
                      {(data.normalized[p.id]?.[c.key] ?? 0).toFixed(4)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2 – Weighted matrix */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <div className="card-title" style={{ marginBottom: 4 }}>Langkah 3 — Matriks Ternormalisasi Berbobot</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>v*ij = wj × x*ij — nilai ternormalisasi dikalikan bobot setiap kriteria</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Penyedia</th>
                {criteria.map(c => (
                  <th key={c.key} style={{ textAlign: 'right' }}>
                    <span style={{ color: CRITERION_COLORS[c.key] }}>{c.label}</span>
                    <span style={{ color: 'var(--text-3)', fontWeight: 400, marginLeft: 4 }}>×{(c.weight * 100).toFixed(0)}%</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ranked.map(p => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 22, height: 22, borderRadius: 5, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'white', flexShrink: 0 }}>{p.initials}</div>
                      <span style={{ fontSize: 12 }}>{p.name}</span>
                    </div>
                  </td>
                  {criteria.map(c => (
                    <td key={c.key} className="cell-mono" style={{ textAlign: 'right', color: 'var(--text-2)' }}>
                      {(data.weighted[p.id]?.[c.key] ?? 0).toFixed(4)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 – Yi Score summary */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
          <div className="card-title" style={{ marginBottom: 4 }}>Langkah 4 — Skor Yi & Peringkat Akhir</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>yi = Σ nilai berbobot — penyedia dengan skor yi tertinggi adalah pilihan optimal</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Peringkat</th>
                <th>Penyedia</th>
                {criteria.map(c => (
                  <th key={c.key} style={{ textAlign: 'right', color: CRITERION_COLORS[c.key] }}>{c.label}</th>
                ))}
                <th style={{ textAlign: 'right', color: 'var(--gold)' }}>Skor Yi</th>
              </tr>
            </thead>
            <tbody>
              {ranked.map(p => {
                const result = data.results.find(r => r.provider.id === p.id)
                const isWinner = result?.rank === 1
                return (
                  <tr key={p.id} style={isWinner ? { background: 'rgba(245,158,11,0.04)' } : {}}>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: isWinner ? 'var(--gold)' : result?.rank === 2 ? '#94A3B8' : 'var(--text-3)' }}>
                        #{result?.rank}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 22, height: 22, borderRadius: 5, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 8, color: 'white', flexShrink: 0 }}>{p.initials}</div>
                        <span style={{ fontSize: 12, fontWeight: isWinner ? 600 : 400 }}>{p.name}</span>
                        {isWinner && <span style={{ fontSize: 10 }}>🏆</span>}
                      </div>
                    </td>
                    {criteria.map(c => (
                      <td key={c.key} className="cell-mono" style={{ textAlign: 'right', color: 'var(--text-2)', fontSize: 11 }}>
                        {(data.weighted[p.id]?.[c.key] ?? 0).toFixed(4)}
                      </td>
                    ))}
                    <td className="cell-mono" style={{ textAlign: 'right', fontWeight: 600, color: isWinner ? 'var(--gold)' : 'var(--text)' }}>
                      {(data.yiScores[p.id] ?? 0).toFixed(4)}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ padding: 14, background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 'var(--r)', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.7 }}>
        💡 <strong style={{ color: 'var(--text-2)' }}>Cara membaca ini:</strong> Skor Yi adalah jumlah semua nilai ternormalisasi berbobot. Karena semua kriteria menggunakan 5 = terbaik, Yi yang lebih tinggi selalu berarti performa keseluruhan yang lebih baik sesuai bobot sistem.
      </div>
    </div>
  )
}
