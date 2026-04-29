import { prisma } from '@/lib/prisma'

const CRITERION_COLORS: Record<string, string> = {
  mdrFee: '#F87171', settlementTime: '#F59E0B',
  successRate: '#10B981', setupFee: '#A78BFA', supportQuality: '#818CF8',
}

const STEPS = [
  {
    num: '1',
    title: 'Buat Matriks Keputusan',
    desc: "Anda memberi skor setiap payment gateway pada setiap kriteria dari 1 hingga 5, di mana 5 = performa terbaik. Skor-skor ini membentuk matriks X[m×n] dengan m = penyedia dan n = kriteria.",
    formula: null,
  },
  {
    num: '2',
    title: 'Normalisasi Vektor',
    desc: 'Setiap kolom dibagi dengan norma Euclidean-nya. Ini membuat semua nilai bebas satuan dan dapat dibandingkan antar kriteria.',
    formula: 'x*ij = xij / √(Σ xij²)',
  },
  {
    num: '3',
    title: 'Terapkan Bobot Kepentingan',
    desc: 'Nilai ternormalisasi dikalikan dengan bobot yang ditetapkan untuk setiap kriteria, mencerminkan kepentingan relatifnya.',
    formula: 'v*ij = wj × x*ij',
  },
  {
    num: '4',
    title: 'Hitung Skor yi & Peringkat',
    desc: 'Untuk kriteria keuntungan (lebih tinggi = lebih baik), nilai dijumlahkan. Untuk kriteria biaya (lebih rendah = lebih baik), nilai dikurangkan. Penyedia dengan yi tertinggi menang.',
    formula: 'yi = Σ(keuntungan) − Σ(biaya)',
  },
]

export default async function AlgorithmPage() {
  const criteria = await prisma.criterion.findMany({ orderBy: { position: 'asc' } })

  return (
    <>
      <div className="card">
        <div className="card-title">Apa itu MOORA?</div>
        <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.8, marginBottom: 16 }}>
          <strong style={{ color: 'var(--text)' }}>Multi-Objective Optimization on the Basis of Ratio Analysis</strong> adalah
          metode pengambilan keputusan yang memungkinkan Anda merangking alternatif (payment gateway) berdasarkan beberapa
          kriteria yang saling bertentangan secara bersamaan — tanpa tebakan sembarangan.
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
        <div className="card-title">Bobot Kriteria Saat Ini</div>
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
          Bobot ditetapkan oleh administrator platform. Hubungi admin Anda untuk meminta penyesuaian.
        </p>
      </div>
    </>
  )
}
