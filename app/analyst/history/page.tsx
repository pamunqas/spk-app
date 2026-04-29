import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export default async function HistoryPage() {
  const session = await auth()
  const userId  = (session?.user as any)?.id

  const comparisons = await prisma.comparison.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 30,
  })

  const providerSet = new Set<string>()
  comparisons.forEach(c => c.providerIds.forEach(id => providerSet.add(id)))

  const winnerCounts: Record<string, number> = {}
  comparisons.forEach(c => { winnerCounts[c.winner] = (winnerCounts[c.winner] || 0) + 1 })
  const favourite = Object.entries(winnerCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

  // Get provider names for display
  const providerMap: Record<string, string> = {}
  if (comparisons.length > 0) {
    const allIds = Array.from(new Set(comparisons.flatMap(c => c.providerIds)))
    const pList = await prisma.provider.findMany({ where: { id: { in: allIds } }, select: { id: true, name: true } })
    pList.forEach(p => { providerMap[p.id] = p.name })
  }

  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Analyses Run</div>
          <div className="stat-card-num" style={{ color: 'var(--primary-light)' }}>{comparisons.length}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Favourite Provider</div>
          <div className="stat-card-num" style={{ color: 'var(--gold)', fontSize: '1.2rem', paddingTop: 6 }}>{favourite}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Providers Explored</div>
          <div className="stat-card-num" style={{ color: 'var(--green)' }}>{providerSet.size}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Past Comparisons</div>
        {comparisons.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-title">No comparisons yet</div>
            <div className="empty-state-sub">Run your first analysis in the Compare tab</div>
          </div>
        ) : comparisons.map(c => (
          <div key={c.id} className="history-card">
            <div className="history-date">
              {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
            <div className="history-providers">
              {c.providerIds.map(id => (
                <span key={id} className="history-chip">{providerMap[id] ?? id}</span>
              ))}
            </div>
            <div className="history-winner">
              <span className="history-winner-dot" />
              {c.winner}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
