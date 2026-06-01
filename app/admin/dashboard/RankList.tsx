'use client'
import { useEffect, useRef } from 'react'
import type { MooraResult } from '@/lib/moora'
import { getProviderIcon } from '@/lib/icons'

export default function RankList({ results }: { results: MooraResult[] }) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const barRefs = useRef<(HTMLDivElement | null)[]>([])
  const maxYi = Math.max(...results.map(r => r.yiScore))

  useEffect(() => {
    results.forEach((_, i) => {
      const el = refs.current[i]
      if (el) { el.style.transform = 'translateY(0)'; el.style.opacity = '1' }
      const bar = barRefs.current[i]
      const pct = ((results[i].yiScore / maxYi) * 100).toFixed(1)
      if (bar) bar.style.width = pct + '%'
    })
  }, [results, maxYi])

  if (results.length === 0) {
    return <div className="empty-state"><div className="empty-state-icon">⚙️</div><div className="empty-state-title">Tambahkan minimal 2 penyedia aktif untuk melihat peringkat</div></div>
  }

  return (
    <div className="rank-list">
      {results.map((r, i) => (
        <div
          key={r.provider.id}
          className={`rank-item r${r.rank}`}
          ref={el => { refs.current[i] = el }}
        >
          <div className="rank-num">{r.rank}</div>
          <div className="rank-info">
            <span style={{ fontSize: 22 }}>{getProviderIcon(r.provider.name)}</span>
            <div>
              <div className="rank-name">{r.provider.name}</div>
              <div className="rank-tags">
                {r.strengths.slice(0, 2).map(s => (
                  <span key={s} className="tag s">{s.replace('Best ', '')}</span>
                ))}
                {r.weaknesses.slice(0, 1).map(w => (
                  <span key={w} className="tag w">{w.replace('Worst ', '')}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="rank-score-col">
            <div className="rank-yi">{r.yiScore.toFixed(4)}</div>
            <div className="rank-bar-wrap">
              <div
                className="rank-bar"
                ref={el => { barRefs.current[i] = el }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
