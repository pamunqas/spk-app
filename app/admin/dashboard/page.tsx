import { prisma } from '@/lib/prisma'
import { computeMoora } from '@/lib/moora'
import RankList from './RankList'

const CRITERION_COLORS: Record<string, string> = {
  harga: '#F87171', kandunganNutrisi: '#10B981',
  kualitas: '#818CF8', dampak: '#A78BFA', ramahLingkungan: '#34D399', ketersediaan: '#F59E0B',
}

export default async function AdminDashboard() {
  const [providers, criteria, users, comparisons] = await Promise.all([
    prisma.provider.findMany({ orderBy: { createdAt: 'asc' } }),
    prisma.criterion.findMany({ orderBy: { position: 'asc' } }),
    prisma.user.findMany({ where: { role: 'analyst' } }),
    prisma.comparison.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ])

  const inputs = providers.filter(p => p.status === 'active').map(p => ({
    id: p.id, slug: p.slug, name: p.name, initials: p.initials, color: p.color,
    description: p.description, harga: p.harga, kandunganNutrisi: p.kandunganNutrisi,
    kualitas: p.kualitas, dampak: p.dampak, ramahLingkungan: p.ramahLingkungan, ketersediaan: p.ketersediaan,
  }))
  const crit = criteria.map(c => ({
    key: c.key, label: c.label, weight: c.weight,
    type: c.type as 'benefit' | 'cost', unit: c.unit, position: c.position,
  }))
  const computation = inputs.length >= 2 ? computeMoora(inputs, crit) : null
  const results = computation?.results ?? []
  const topProvider = results[0]?.provider.name ?? '—'
  const totalComparisons = await prisma.comparison.count()

  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total Penyedia</div>
          <div className="stat-card-num" style={{ color: 'var(--primary-light)' }}>{providers.length}</div>
          <div className="stat-card-delta">
            {providers.filter(p => p.status === 'active').length} aktif
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Pengguna Aktif</div>
          <div className="stat-card-num" style={{ color: 'var(--green)' }}>{users.length}</div>
          <div className="stat-card-delta up">Akun analis</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Analisis Dijalankan</div>
          <div className="stat-card-num" style={{ color: 'var(--gold)' }}>{totalComparisons}</div>
          <div className="stat-card-delta up">Sepanjang masa</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Peringkat Teratas</div>
          <div className="stat-card-num" style={{ color: 'var(--accent)', paddingTop: 4 }}>
            {topProvider}
          </div>
          <div className="stat-card-delta">Pemenang semua penyedia</div>
        </div>
      </div>

      <div className="card-row">
        <div className="card">
          <div className="card-title">Perbandingan Terbaru</div>
          {comparisons.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📊</div>
              <div className="empty-state-title">Belum ada perbandingan</div>
            </div>
          ) : comparisons.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-3)', width: 80, flexShrink: 0 }}>
                {new Date(c.createdAt).toLocaleDateString('id-ID', { month: 'short', day: 'numeric' })}
              </div>
              <div style={{ flex: 1, color: 'var(--text-2)' }}>
                {c.providerIds.length} penyedia dibandingkan
              </div>
              <div style={{ fontWeight: 500, color: 'var(--gold)' }}>🏆 {c.winner}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Distribusi Bobot</div>
          <div className="criteria-mini">
            {criteria.map(c => (
              <div key={c.key} className="criteria-mini-row">
                <div className="criteria-mini-label">{c.label}</div>
                <div className="criteria-mini-bar-bg">
                  <div
                    className="criteria-mini-bar"
                    style={{ width: `${c.weight * 100}%`, background: CRITERION_COLORS[c.key] }}
                  />
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
        </div>
      </div>

      <div className="card">
        <div className="card-title">Peringkat Penuh — Semua Penyedia Aktif</div>
        <RankList results={results} />
      </div>
    </>
  )
}
