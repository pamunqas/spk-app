'use client'
import { useState } from 'react'
import type { Provider, Criterion } from '@prisma/client'
import { SUBCRITERIA } from '@/lib/subcriteria'
import type { MooraComputation } from '@/lib/moora'
import { getProviderIcon } from '@/lib/icons'
import Toast from '@/components/Toast'

interface Props {
  providers: Provider[]
  criteria: Criterion[]
}

type ToastState = { msg: string; type: 'green' | 'blue' | 'red' } | null

interface InputValues {
  harga: number | null
  kandunganNutrisi: number | null
  kualitas: number | null
  dampak: number | null
  ramahLingkungan: number | null
  ketersediaan: number | null
}

type Step = 'select' | 'input' | 'results'

const CRITERION_COLORS: Record<string, string> = {
  harga: '#F87171', kandunganNutrisi: '#10B981',
  kualitas: '#818CF8', dampak: '#A78BFA', ramahLingkungan: '#34D399', ketersediaan: '#F59E0B',
}

function emptyInputValues(): InputValues {
  return { harga: null, kandunganNutrisi: null, kualitas: null, dampak: null, ramahLingkungan: null, ketersediaan: null }
}

export default function CompareClient({ providers, criteria }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [inputs, setInputs] = useState<Record<string, InputValues>>({})
  const [results, setResults] = useState<MooraComputation | null>(null)
  const [step, setStep] = useState<Step>('select')
  const [computing, setComputing] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)
  const hideToast = () => setToast(null)

  const toggleProvider = (id: string) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        const next = prev.filter(x => x !== id)
        return next
      }
      const next = [...prev, id]
      return next
    })
  }

  const goToInput = () => {
    const ids = selectedIds
    const init: Record<string, InputValues> = {}
    ids.forEach(id => {
      init[id] = inputs[id] ?? emptyInputValues()
    })
    setInputs(init)
    setStep('input')
  }

  const updateInput = (providerId: string, key: keyof InputValues, value: number) => {
    setInputs(prev => ({
      ...prev,
      [providerId]: { ...(prev[providerId] ?? emptyInputValues()), [key]: value },
    }))
  }

  const allInputsFilled = () => {
    return selectedIds.every(id => {
      const v = inputs[id]
      if (!v) return false
      return criteria.every(c => {
        const val = v[c.key as keyof InputValues]
        return val != null && !isNaN(val)
      })
    })
  }

  const runAnalysis = async () => {
    setComputing(true)
    try {
      const providerInputs = selectedIds.map(id => {
        const v = inputs[id] ?? emptyInputValues()
        return {
          id,
          harga: v.harga ?? 0,
          kandunganNutrisi: v.kandunganNutrisi ?? 0,
          kualitas: v.kualitas ?? 0,
          dampak: v.dampak ?? 0,
          ramahLingkungan: v.ramahLingkungan ?? 0,
          ketersediaan: v.ketersediaan ?? 0,
        }
      })
      const res = await fetch('/api/comparisons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ providerInputs }),
      })
      const json: MooraComputation & { error?: string } = await res.json()
      if (!res.ok) throw new Error(json.error)
      setResults(json)
      setStep('results')
      setToast({ msg: `Analisis MOORA selesai — ${json.results[0].provider.name} peringkat pertama`, type: 'green' })
    } catch (e: unknown) {
      setToast({ msg: e instanceof Error ? e.message : 'Gagal menjalankan analisis', type: 'red' })
    } finally {
      setComputing(false)
    }
  }

  const resetAll = () => {
    setSelectedIds([])
    setInputs({})
    setResults(null)
    setStep('select')
  }

  const selectedProviders = providers.filter(p => selectedIds.includes(p.id))

  return (
    <>

      {/* Step 1 — Select Providers */}
      {step === 'select' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <div className="card-title" style={{ marginBottom: 4 }}>LANGKAH 1 — Pilih Provider</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Pilih minimal 2 provider untuk dibandingkan menggunakan metode MOORA.</div>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div className="providers-grid">
              {providers.map(p => {
                const selected = selectedIds.includes(p.id)
                return (
                  <div
                    key={p.id}
                    className={`provider-card${selected ? ' selected' : ''}`}
                    onClick={() => toggleProvider(p.id)}
                  >
                    <div className="pcheck">
                      <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg>
                    </div>
                    <div className="provider-card-header">
                      <div className="provider-avatar" style={{ background: p.color }}><span style={{ fontSize: 18 }}>{getProviderIcon(p.name)}</span></div>
                      <div>
                        <div className="provider-name">{p.name}</div>
                        <div className="provider-desc">{p.description}</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 4, gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>
                {selectedIds.length < 2
                  ? `Pilih minimal ${2 - selectedIds.length} provider lagi.`
                  : `${selectedIds.length} provider dipilih.`}
              </div>
              <button
                onClick={goToInput}
                disabled={selectedIds.length < 2}
                className={`btn-compare${selectedIds.length >= 2 ? ' ready' : ''}`}
                style={{ width: 'auto', padding: '10px 24px' }}
              >
                Lanjutkan ke Input Data
                <div className="spinner" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2 — Input Matrix */}
      {step === 'input' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
            <div className="card-title" style={{ marginBottom: 4 }}>LANGKAH 2 — Input Data Provider</div>
            <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Masukkan nilai untuk setiap kriteria dari provider yang dipilih.</div>
          </div>
          <div style={{ overflowX: 'auto', padding: '16px 20px' }}>
            <table className="data-table" style={{ minWidth: selectedProviders.length * 160 + 200 }}>
              <thead>
                <tr>
                  <th style={{ minWidth: 160 }}>Kriteria</th>
                  {selectedProviders.map(p => (
                    <th key={p.id} style={{ textAlign: 'center', minWidth: 160 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
                        <span style={{ fontSize: 16 }}>{getProviderIcon(p.name)}</span>
                        <span style={{ fontSize: 12 }}>{p.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {criteria.map(c => {
                  const sub = SUBCRITERIA[c.key]
                  return (
                    <tr key={c.key}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: CRITERION_COLORS[c.key], flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 500 }}>{c.label}</div>
                          </div>
                        </div>
                      </td>
                      {selectedProviders.map(p => {
                        const currentVal = (inputs[p.id] ?? emptyInputValues())[c.key as keyof InputValues]
                        return (
                          <td key={p.id} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'stretch' }}>
                              {sub.levels.map(l => {
                                const selected = currentVal === l.score
                                return (
                                  <button
                                    key={l.score}
                                    type="button"
                                    onClick={() => updateInput(p.id, c.key as keyof InputValues, l.score)}
                                    style={{
                                      display: 'flex', alignItems: 'center', gap: 6,
                                      padding: '6px 10px',
                                      borderRadius: 'var(--r-sm)',
                                      border: selected ? `1.5px solid ${CRITERION_COLORS[c.key]}` : '1px solid var(--border)',
                                      background: selected ? `${CRITERION_COLORS[c.key]}11` : 'var(--surface)',
                                      cursor: 'pointer',
                                      fontSize: 11, textAlign: 'left',
                                      color: 'var(--text)',
                                      fontFamily: 'var(--font-body)',
                                      transition: 'all 0.15s',
                                    }}
                                  >
                                    <span style={{
                                      width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                                      border: selected ? `2px solid ${CRITERION_COLORS[c.key]}` : '2px solid var(--border-2)',
                                      fontSize: 8, fontWeight: 700,
                                      color: selected ? CRITERION_COLORS[c.key] : 'transparent',
                                    }}>
                                      {selected ? '✓' : ''}
                                    </span>
                                    <div>
                                      <div style={{ fontWeight: 600, fontSize: 11 }}>{l.label}</div>
                                      <div style={{ fontSize: 9, color: 'var(--text-3)', lineHeight: 1.3 }}>{l.condition}</div>
                                    </div>
                                  </button>
                                )
                              })}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px', borderTop: '1px solid var(--border)', gap: 12, flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setStep('select')}
              className="btn-ghost"
              style={{ fontSize: 12 }}
            >
              Kembali
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={resetAll}
                className="btn-ghost"
                style={{ fontSize: 12 }}
              >
                Reset
              </button>
              <button
                onClick={runAnalysis}
                disabled={!allInputsFilled() || computing}
                className={`btn-compare${allInputsFilled() ? ' ready' : ''}${computing ? ' computing' : ''}`}
                style={{ width: 'auto', padding: '10px 24px' }}
              >
                {computing ? 'Menghitung…' : 'Hitung dengan MOORA'}
                <div className="spinner" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 3 — Results */}
      {step === 'results' && results && (
        <div style={{ marginTop: 24 }}>
          <div className="recalc-bar">
            <div className="recalc-info">
              Peringkat <strong>{results.results.length}</strong> provider berdasarkan perhitungan MOORA
            </div>
            <button
              onClick={resetAll}
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
              Analisis Baru
            </button>
          </div>

          {/* Winner Card */}
          <div className="bento-card winner-card" style={{ maxWidth: 420, margin: '0 auto' }}>
            <div className="winner-crown">🏆</div>
            <div className="winner-badge">Peringkat Pertama</div>
            <div className="winner-name">{results.results[0].provider.name}</div>
            <div className="winner-desc">{results.results[0].provider.description}</div>
            <div className="winner-score-row">
              <span className="winner-score-num">{results.results[0].yiScore.toFixed(2)}</span>
              <span className="winner-score-label">yiScore</span>
            </div>
          </div>

          {/* Detail Table — Normalized Values */}
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)' }}>
              <div className="card-title" style={{ marginBottom: 4 }}>Detail Nilai Ternormalisasi</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Nilai setelah normalisasi vektor untuk setiap kriteria.</div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Peringkat</th>
                    <th>Provider</th>
                    {criteria.map(c => (
                      <th key={c.key} style={{ textAlign: 'center', color: CRITERION_COLORS[c.key] }}>{c.label}</th>
                    ))}
                    <th style={{ textAlign: 'center', color: 'var(--gold)' }}>yiScore</th>
                  </tr>
                </thead>
                <tbody>
                  {results.results.map(r => {
                    const normalized = results.normalized[r.provider.id] ?? {}
                    return (
                      <tr key={r.provider.id} style={r.rank === 1 ? { background: 'rgba(245,158,11,0.04)' } : {}}>
                        <td>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 600, color: r.rank === 1 ? 'var(--gold)' : 'var(--text-3)' }}>
                            #{r.rank}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontSize: 18 }}>{getProviderIcon(r.provider.name)}</span>
                            <span style={{ fontSize: 12, fontWeight: r.rank === 1 ? 600 : 400 }}>{r.provider.name}</span>
                            {r.rank === 1 && <span style={{ fontSize: 10 }}>🏆</span>}
                          </div>
                        </td>
                        {criteria.map(c => {
                          const val = normalized[c.key]
                          return (
                            <td key={c.key} style={{ textAlign: 'center' }}>
                              <span className="cell-mono" style={{ fontWeight: 500 }}>
                                {val != null ? val.toFixed(4) : '-'}
                              </span>
                            </td>
                          )
                        })}
                        <td style={{ textAlign: 'center' }}>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: r.rank === 1 ? 'var(--gold)' : 'var(--text)' }}>
                            {r.yiScore.toFixed(4)}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div style={{ padding: 14, background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 'var(--r)', fontSize: 12, color: 'var(--text-3)', lineHeight: 1.7, marginTop: 16 }}>
            💡 <strong style={{ color: 'var(--text-2)' }}>Cara membaca ini:</strong> Hasil dihitung menggunakan Metode MOORA (Multi-Objective Optimization by Ratio Analysis). Nilai yiScore yang lebih tinggi menandakan performa yang lebih baik secara keseluruhan.
          </div>
        </div>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </>
  )
}
