'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import BarChart from '@/components/BarChart'
import Toast from '@/components/Toast'

interface DashboardData {
  totalComparisons: number
  lastComparison: string | null
  monthlyCount: number
  mostChosen: string | null
  mostChosenCount: number
  lastMonthCount: number
  prevMonthCount: number
  trendingProviders: { name: string; count: number }[]
  lastResult: { winner: string; providerIds: string[]; createdAt: string } | null
  providers: { id: string; name: string; initials: string; color: string }[]
}

type ToastState = { msg: string; type: 'green' | 'blue' | 'red' } | null

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<ToastState>(null)

  useEffect(() => {
    fetch('/api/comparisons', { method: 'PATCH' })
      .then(res => res.json())
      .then(setData)
      .catch(() => setToast({ msg: 'Gagal memuat data', type: 'red' }))
      .finally(() => setLoading(false))
  }, [])

  const hideToast = () => setToast(null)

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner" />
        <p>Memuat dasbor...</p>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="empty-state">
        <p>Terjadi kesalahan</p>
      </div>
    )
  }

  const {
    totalComparisons,
    lastComparison,
    monthlyCount,
    mostChosen,
    mostChosenCount,
    lastMonthCount,
    prevMonthCount,
    trendingProviders,
    lastResult,
  } = data

  const providers = data.providers || []
  const providerMap = new Map(providers.map(p => [p.name, p]))

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const monthlyChange = prevMonthCount > 0 ? ((lastMonthCount - prevMonthCount) / prevMonthCount) * 100 : lastMonthCount > 0 ? 100 : 0
  const isPositiveChange = monthlyChange >= 0

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <h1>Dasbor Analis</h1>
          <p>Ringkasan aktivitas perbandingan payment gateway Anda</p>
        </div>
        <Link href="/analyst/compare" className="btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Bandingkan Baru
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total Perbandingan</div>
          <div className="stat-card-value">{totalComparisons}</div>
          <div className="stat-card-desc">Semua waktu</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Bulan Ini</div>
          <div className="stat-card-value">{monthlyCount}</div>
          <div className={`stat-card-delta ${isPositiveChange ? 'positive' : 'negative'}`}>
            {isPositiveChange ? '↑' : '↓'} {Math.abs(monthlyChange).toFixed(0)}% vs bulan lalu
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Paling Sering Dipilih</div>
          <div className="stat-card-value">{mostChosen || '-'}</div>
          <div className="stat-card-desc">{mostChosen ? `${mostChosenCount}x dipilih` : 'Belum ada data'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Perbandingan Terakhir</div>
          <div className="stat-card-value">{formatDate(lastComparison)}</div>
          <div className="stat-card-desc">Tanggal analisis</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Hasil Terakhir</h2>
            <Link href="/analyst/history" className="dashboard-card-link">Lihat semua →</Link>
          </div>
          {lastResult ? (
            <div className="last-result">
              <div className="last-result-winner">
                <span className="last-result-label">Pemenang</span>
                <span className="last-result-name">🏆 {lastResult.winner}</span>
                <span className="last-result-date">{formatDate(lastResult.createdAt)}</span>
              </div>
              <div className="last-result-providers">
                {lastResult.providerIds.map((name: string) => {
                  const p = providerMap.get(name)
                  return p ? (
                    <div key={name} className="last-result-provider">
                      <div className="provider-badge" style={{ background: p.color }}>
                        {p.initials}
                      </div>
                      <span>{p.name}</span>
                    </div>
                  ) : (
                    <div key={name} className="last-result-provider">
                      <span>{name}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada perbandingan</p>
              <Link href="/analyst/compare" className="btn-ghost">Mulai Perbandingan</Link>
            </div>
          )}
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <h2>Trending di Sleman</h2>
          </div>
          {trendingProviders.length > 0 ? (
            <div className="trending-list">
              {trendingProviders.map((item, i) => (
                <div key={item.name} className="trending-item">
                  <span className={`trending-rank rank-${i + 1}`}>{i + 1}</span>
                  <span className="trending-name">{item.name}</span>
                  <span className="trending-count">{item.count}x</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>Belum ada data trending</p>
            </div>
          )}
        </div>
      </div>

      <div className="dashboard-card full-width">
        <div className="dashboard-card-header">
          <h2>Aktivitas Bulanan</h2>
        </div>
        <BarChart
          labels={['Bulan Lalu', 'Bulan Ini']}
          data={[prevMonthCount, lastMonthCount]}
        />
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </div>
  )
}