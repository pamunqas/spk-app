'use client'
import type { Criterion } from '@prisma/client'
import { SUBCRITERIA } from '@/lib/subcriteria'

const CRITERION_COLORS: Record<string, string> = {
  harga: '#F87171', kandunganNutrisi: '#10B981',
  kualitas: '#818CF8', dampak: '#A78BFA', ramahLingkungan: '#34D399', ketersediaan: '#F59E0B',
}

interface Props {
  criteria: Criterion[]
}

export default function CriteriaClient({ criteria }: Props) {
  return (
    <div>
      <div className="card" style={{ padding: 0 }}>
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)' }}>
          <div className="card-title">Bobot Kriteria</div>
        </div>
        <div style={{ padding: '16px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {criteria.map(c => {
            const sub = SUBCRITERIA[c.key]
            return (
              <div key={c.key} style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 10, padding: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: CRITERION_COLORS[c.key], flexShrink: 0 }} />
                  <span style={{ fontWeight: 500, color: 'var(--text-2)' }}>{c.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: CRITERION_COLORS[c.key] }}>{(c.weight * 100).toFixed(0)}%</span>
                  {sub && <span style={{ color: 'var(--text-3)' }}>({sub.type === 'cost' ? 'Cost' : 'Benefit'})</span>}
                </div>
                <div style={{ height: 4, background: 'var(--surface-2)', borderRadius: 2 }}>
                  <div style={{ width: `${(c.weight * 100)}%`, height: '100%', background: CRITERION_COLORS[c.key], borderRadius: 2 }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
