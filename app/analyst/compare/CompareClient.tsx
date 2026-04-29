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
  const [matrix, setMatrix]     = useState(() => buildDefaultMatrix(providers, criteria))
  const [data, setData]         = useState<ComputationData | null>(null)
  const [computing, setComputing] = useState(false)
  const [toast, setToast]       = useState<ToastState>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const hideToast  = useCallback(() => setToast(null), [])

  const setScore = (providerId: string, criterionKey: string, val: number) => {
    const clamped = Math.min(5, Math.max(1, Math.round(val)))
    setMatrix(prev => ({ ...prev, [providerId]: { ...prev[providerId], [criterionKey]: clamped } }))
  }

  const resetMatrix = () => {
    setMatrix(buildDefaultMatrix(providers, criteria))
    setData(null)
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
      setToast({ msg: `Analysis complete — ${json.winner} wins`, type: 'green' })
    } catch (e: any) {
      setToast({ msg: e.message ?? 'Error running analysis', type: 'red' })
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
      {/* Step indicator — 2 steps only */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div className={`step-dot ${data ? 'done' : 'active'}`}>
            <div className="step-dot-num">{data ? '✓' : '1'}</div>
            <div className="step-dot-label">Fill Matrix</div>
          </div>
          <div className="step-line" />
          <div className={`step-dot ${data ? 'active' : ''}`}>
            <div className="step-dot-num">2</div>
            <div className="step-dot-label">View Results</div>
          </div>
        </div>
      </div>

      {/* Active weights */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Criteria Weights (set by admin)</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {criteria.map(c => (
            <div key={c.key} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, padding: '4px 11px', fontSize: 11, color: 'var(--text-2)' }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: CRITERION_COLORS[c.key], display: 'inline-block' }} />
              {c.label}
              <strong style={{ color: 'var(--text)', fontWeight: 500, marginLeft: 3 }}>{(c.weight * 100).toFixed(0)}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Decision Matrix */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: 16 }}>
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <div>
            <div className="card-title" style={{ marginBottom: 4 }}>Decision Matrix</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>
              Score each provider per criterion from <strong style={{ color: 'var(--text-2)' }}>1–5</strong>, where{' '}
              <strong style={{ color: 'var(--green)' }}>5 = best performance</strong> and{' '}
              <strong style={{ color: 'var(--red)' }}>1 = worst</strong>, for every criterion.
            </div>
          </div>
          <button className="btn-ghost" onClick={resetMatrix} style={{ fontSize: 11, flexShrink: 0 }}>
            Reset to defaults
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ minWidth: 600 }}>
            <thead>
              <tr>
                <th style={{ minWidth: 160 }}>Provider</th>
                {criteria.map(c => (
                  <th key={c.key} style={{ textAlign: 'center', minWidth: 110 }}>
                    <div style={{ color: CRITERION_COLORS[c.key] }}>{c.label}</div>
                    <div style={{ fontSize: 9, fontWeight: 400, textTransform: 'none', letterSpacing: 0, color: 'var(--text-3)', marginTop: 2 }}>
                      {c.type === 'benefit' ? '↑ higher = better' : '5 = lowest (best)'}
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
      </div>

      {/* Scale legend */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {[
          { score: 5, label: 'Excellent', color: 'var(--green)',   bg: 'rgba(16,185,129,0.12)' },
          { score: 4, label: 'Good',      color: 'var(--green)',   bg: 'rgba(16,185,129,0.06)' },
          { score: 3, label: 'Average',   color: 'var(--text-2)',  bg: 'var(--surface-2)' },
          { score: 2, label: 'Poor',      color: 'var(--red)',     bg: 'rgba(248,113,113,0.06)' },
          { score: 1, label: 'Very poor', color: 'var(--red)',     bg: 'rgba(248,113,113,0.12)' },
        ].map(s => (
          <div key={s.score} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 6, background: s.bg, border: '1px solid var(--border)', fontSize: 11, color: s.color }}>
            <strong style={{ fontFamily: 'var(--font-mono)' }}>{s.score}</strong> — {s.label}
          </div>
        ))}
      </div>

      {/* Run button */}
      <button
        className={`btn-compare ready${computing ? ' computing' : ''}`}
        onClick={runMoora}
        disabled={computing}
      >
        <span>{computing ? 'Computing…' : 'Run Analysis'}</span>
        <div className="spinner" />
      </button>

      {/* ==================== RESULTS ==================== */}
      {data && winner && (
        <div style={{ marginTop: 28 }} ref={resultsRef}>
          <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,var(--border-2),transparent)', marginBottom: 24 }} />

          <div className="recalc-bar">
            <div className="recalc-info">
              Ranked <strong>{data.results.length}</strong> providers across <strong>{criteria.length}</strong> criteria
            </div>
            <button className="btn-recalc" onClick={resetMatrix}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
              </svg>
              New Analysis
            </button>
          </div>

          {/* Top 3 */}
          <div className="results-bento">
            <div className="bento-card winner-card">
              <div className="winner-crown">🏆</div>
              <div className="winner-badge">Optimal Choice</div>
              <div className="winner-name">{winner.provider.name}</div>
              <div className="winner-desc">{winner.provider.description}</div>
              <div className="winner-score-row">
                <span className="winner-score-num">{winner.yiScore.toFixed(4)}</span>
                <span className="winner-score-label">yi score</span>
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
                          Rank #{r.rank}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{r.provider.name}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-3)', lineHeight: 1.5, marginBottom: 10 }}>{r.provider.description}</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: r.strengths.length > 0 ? 10 : 0 }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: accentColor }}>{r.yiScore.toFixed(4)}</span>
                      <span style={{ fontSize: 10, color: 'var(--text-3)' }}>yi score</span>
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
          <div className="card-title" style={{ marginBottom: 4 }}>Step 2 — Normalised Decision Matrix</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>x*ij = xij / √(Σ xij²) — each value divided by its column Euclidean norm</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Provider</th>
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
          <div className="card-title" style={{ marginBottom: 4 }}>Step 3 — Weighted Normalised Matrix</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>v*ij = wj × x*ij — normalised values multiplied by each criterion's weight</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Provider</th>
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
          <div className="card-title" style={{ marginBottom: 4 }}>Step 4 — Yi Score & Final Ranking</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)' }}>yi = Σ weighted values — the provider with the highest yi score is the optimal choice</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Provider</th>
                {criteria.map(c => (
                  <th key={c.key} style={{ textAlign: 'right', color: CRITERION_COLORS[c.key] }}>{c.label}</th>
                ))}
                <th style={{ textAlign: 'right', color: 'var(--gold)' }}>Yi Score</th>
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
        💡 <strong style={{ color: 'var(--text-2)' }}>How to read this:</strong> The Yi Score is the sum of all weighted normalised values. Since all criteria use 5 = best, a higher Yi always means better overall performance given the system weights.
      </div>
    </div>
  )
}
