import { prisma } from '@/lib/prisma'

const CRITERION_COLORS: Record<string, string> = {
  mdrFee: '#F87171', settlementTime: '#F59E0B',
  successRate: '#10B981', setupFee: '#A78BFA', supportQuality: '#818CF8',
}

const STEPS = [
  {
    num: '1',
    title: 'Build the Decision Matrix',
    desc: "You score each payment gateway on each criterion from 1 to 5, where 5 = best performance. These scores form a matrix X[m×n] where m = providers and n = criteria.",
    formula: null,
  },
  {
    num: '2',
    title: 'Vector Normalization',
    desc: 'Each column is divided by its Euclidean norm. This makes all values unit-free and comparable across criteria.',
    formula: 'x*ij = xij / √(Σ xij²)',
  },
  {
    num: '3',
    title: 'Apply Importance Weights',
    desc: 'Normalized values are multiplied by the weight assigned to each criterion, reflecting its relative importance.',
    formula: 'v*ij = wj × x*ij',
  },
  {
    num: '4',
    title: 'Compute yi Score & Rank',
    desc: 'For benefit criteria (higher = better), values are added. For cost criteria (lower = better), values are subtracted. The provider with the highest yi wins.',
    formula: 'yi = Σ(benefit) − Σ(cost)',
  },
]

export default async function AlgorithmPage() {
  const criteria = await prisma.criterion.findMany({ orderBy: { position: 'asc' } })

  return (
    <>
      <div className="card">
        <div className="card-title">What is MOORA?</div>
        <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 16 }}>
          <strong style={{ color: 'var(--text)' }}>Multi-Objective Optimization on the Basis of Ratio Analysis</strong> is a
          decision-making method that lets you rank alternatives (payment gateways) across multiple conflicting criteria
          simultaneously — without arbitrary guesswork.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {STEPS.map((s, i) => (
            <div key={s.num} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative', paddingBottom: 20 }}>
              {i < 3 && (
                <div style={{ position: 'absolute', left: 13, top: 28, width: 1, height: 'calc(100% - 4px)', background: 'linear-gradient(to bottom, var(--primary-dim), transparent)' }} />
              )}
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-dim)', border: '1px solid rgba(99,102,241,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--primary-light)', position: 'relative', zIndex: 1 }}>
                {s.num}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.6 }}>{s.desc}</div>
                {s.formula && (
                  <code style={{ display: 'inline-block', marginTop: 6, fontFamily: 'var(--font-mono)', fontSize: 11, background: 'var(--surface-2)', color: 'var(--primary-light)', borderRadius: 5, padding: '3px 9px', border: '1px solid var(--border)' }}>
                    {s.formula}
                  </code>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">Current Criteria Weights</div>
        <div className="criteria-mini">
          {criteria.map(c => (
            <div key={c.key} className="criteria-mini-row">
              <div className="criteria-mini-label" style={{ color: CRITERION_COLORS[c.key] }}>{c.label}</div>
              <div className="criteria-mini-bar-bg">
                <div className="criteria-mini-bar" style={{ width: `${c.weight * 100}%`, background: CRITERION_COLORS[c.key] }} />
              </div>
              <div className="criteria-mini-pct" style={{ color: CRITERION_COLORS[c.key] }}>
                {(c.weight * 100).toFixed(0)}%
              </div>
              <div
                className="criteria-mini-type"
                style={c.type === 'benefit'
                  ? { background: 'var(--green-dim)', color: 'var(--green)' }
                  : { background: 'var(--red-dim)', color: 'var(--red)' }
                }
              >
                {c.type === 'benefit' ? '↑ max' : '↓ min'}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 14 }}>
          Weights are set by platform administrators. Contact your admin to request adjustments.
        </p>
      </div>
    </>
  )
}
