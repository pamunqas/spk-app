import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import HistoryClient from './HistoryClient'

export default async function HistoryPage() {
  const session = await auth()
  const userId  = (session?.user as any)?.id

  const comparisons = await prisma.comparison.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 30,
  })

  const winnerCounts: Record<string, number> = {}
  comparisons.forEach(c => { winnerCounts[c.winner] = (winnerCounts[c.winner] || 0) + 1 })
  const favourite = Object.entries(winnerCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

  const rows = comparisons.map(c => ({
    id:        c.id,
    createdAt: c.createdAt.toISOString(),
    winner:    c.winner,
    results:   ((c.results as any)?.moora?.results ?? []).map((r: any) => ({
      rank:    Number(r.rank ?? 0),
      yiScore: Number(r.yiScore ?? 0),
      provider: {
        id:        r.provider.id,
        name:      r.provider.name,
        initials:  r.provider.initials,
        color:     r.provider.color,
      },
    })),
  }))

  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Analisis Dijalankan</div>
          <div className="stat-card-num" style={{ color: 'var(--primary-light)' }}>{comparisons.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Penyedia Favorit</div>
          <div className="stat-card-num" style={{ color: 'var(--gold)', fontSize: '1.2rem', paddingTop: 6 }}>{favourite}</div>
        </div>
      </div>

      <HistoryClient comparisons={rows} />
    </>
  )
}
