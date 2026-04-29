'use client'
import { useState, useCallback } from 'react'
import Toast from '@/components/Toast'

interface Crit {
  id: string; key: string; label: string; weight: number
  type: string; unit: string; color: string; desc: string
}
type ToastState = { msg: string; type: 'green' | 'blue' | 'red' } | null

export default function WeightsClient({ initialCriteria }: { initialCriteria: Crit[] }) {
  const [criteria, setCriteria] = useState(initialCriteria)
  const [toast, setToast]       = useState<ToastState>(null)
  const hideToast = useCallback(() => setToast(null), [])

  const total = criteria.reduce((s, c) => s + c.weight, 0)
  const ok    = Math.abs(total - 1) < 0.001

  const updateWeight = (idx: number, val: number) => {
    setCriteria(prev => prev.map((c, i) => (i === idx ? { ...c, weight: val / 100 } : c)))
  }

  const save = async () => {
    if (!ok) { setToast({ msg: 'Bobot harus berjumlah 1,00', type: 'blue' }); return }
    const res = await fetch('/api/weights', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(criteria.map(c => ({ id: c.id, weight: c.weight }))),
    })
    if (!res.ok) { setToast({ msg: 'Gagal menyimpan bobot', type: 'red' }); return }
    setToast({ msg: 'Bobot disimpan — analisis baru akan menggunakan nilai yang diperbarui', type: 'green' })
  }

  return (
    <>
      <div className="card-row">
        <div className="card">
          <div className="card-title">Sesuaikan Bobot Kriteria</div>
          <p style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 18, lineHeight: 1.6 }}>
            Bobot harus berjumlah 1,00 (100%). Perubahan akan mempengaruhi semua perhitungan MOORA ke depannya.
          </p>
          <div className="weight-editor">
            {criteria.map((c, i) => (
              <div key={c.id} className="weight-row">
                <div className="weight-row-label" style={{ color: c.color }}>{c.label}</div>
                <input
                  className="weight-slider"
                  type="range" min={0} max={100} step={1}
                  value={Math.round(c.weight * 100)}
                  style={{ accentColor: c.color }}
                  onChange={e => updateWeight(i, parseFloat(e.target.value))}
                />
                <div className="weight-val">{Math.round(c.weight * 100)}%</div>
              </div>
            ))}
          </div>
          <div className="weight-total" style={{ marginTop: 16 }}>
            <span style={{ fontSize: 13, color: 'var(--text-2)' }}>Total bobot</span>
            <span className={`weight-total-num ${ok ? 'ok' : 'err'}`}>{total.toFixed(2)}</span>
          </div>
          <button className="btn-primary" style={{ marginTop: 14, width: '100%', padding: 10 }} onClick={save}>
            Simpan Bobot
          </button>
        </div>

        <div className="card">
          <div className="card-title">Jenis & Deskripsi Kriteria</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {criteria.map(c => (
              <div key={c.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0, marginTop: 6 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>
                    {c.label} <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-3)' }}>{c.unit}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>{c.desc}</div>
                  <span className={`badge ${c.type}`} style={{ marginTop: 5, display: 'inline-block' }}>
                    {c.type === 'benefit' ? 'Maksimalkan' : 'Minimalkan'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </>
  )
}
