'use client'
import BarChart from '@/components/BarChart'

interface Props {
  stats: {
    totalComparisons: number
    avgProviders: string
    mostCompared: string
    winLeader: string
    winRate: string
  }
  popLabels: string[]
  popData: number[]
  criteria: { key: string; label: string; weight: number; type: string; color: string }[]
}

const PROVIDER_COLORS: Record<string, string> = {
  Xendit:'#0057FF88', Midtrans:'#003D7A88', Durianpay:'#F39C1288',
  'OY! Indonesia':'#00AA5B88', HitPay:'#6C5CE788', DOKU:'#00529B88',
  Faspay:'#E8461A88', Nicepay:'#FF660088', Prismalink:'#7B2FBE88',
  Winpay:'#27AE6088', iPaymu:'#2D9CDB88', Espay:'#E67E2288',
}

export default function AnalyticsClient({ stats, popLabels, popData, criteria }: Props) {
  const colors = popLabels.map(l => PROVIDER_COLORS[l] ?? '#55557788')

  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total Comparisons</div>
          <div className="stat-card-num" style={{ color: 'var(--primary-light)' }}>
            {stats.totalComparisons}
          </div>
          <div className="stat-card-delta up">All time</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Avg. Providers Compared</div>
          <div className="stat-card-num" style={{ color: 'var(--cyan)' }}>{stats.avgProviders}</div>
          <div className="stat-card-delta">per session</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Most Compared</div>
          <div className="stat-card-num" style={{ color: 'var(--gold)', fontSize: '1.2rem', paddingTop: 6 }}>
            {stats.mostCompared}
          </div>
          <div className="stat-card-delta">{stats.winRate}% of sessions</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Win Rate Leader</div>
          <div className="stat-card-num" style={{ color: 'var(--green)', fontSize: '1.2rem', paddingTop: 6 }}>
            {stats.winLeader}
          </div>
          <div className="stat-card-delta up">↑ {stats.winRate}% win rate</div>
        </div>
      </div>

      <div className="card-row">
        <div className="card">
          <div className="card-title">Provider Win Frequency</div>
          <div className="analytics-chart-wrap">
            <BarChart
              labels={popLabels}
              data={popData}
              colors={colors}
              tooltipLabel={(v) => `${v}% of comparisons`}
            />
          </div>
        </div>

        <div className="card">
          <div className="card-title">Provider Win Rates</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
            {popLabels.slice(0, 6).map((name, i) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 100, fontSize: 12, color: 'var(--text-2)' }}>{name}</div>
                <div style={{ flex: 1, height: 5, background: 'var(--surface-2)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${popData[i]}%`, height: '100%', background: colors[i]?.replace('88', ''), borderRadius: 3 }} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, width: 36, textAlign: 'right' }}>
                  {popData[i]}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title">Criteria Weight Impact</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))', gap: 12 }}>
          {criteria.map(c => (
            <div key={c.key} style={{ background: 'var(--bg-3)', border: '1px solid var(--border)', borderRadius: 'var(--r)', padding: 14 }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-3)', marginBottom: 6 }}>
                {c.label}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontWeight: 500, color: c.color }}>
                {(c.weight * 100).toFixed(0)}%
              </div>
              <div style={{ fontSize: 11, marginTop: 4, color: c.type === 'benefit' ? 'var(--green)' : 'var(--red)' }}>
                {c.type === 'benefit' ? 'Benefit criterion' : 'Cost criterion'}
              </div>
              <div style={{ marginTop: 8, height: 3, background: 'var(--surface-2)', borderRadius: 2 }}>
                <div style={{ width: `${(c.weight * 100).toFixed(0)}%`, height: '100%', background: c.color, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
