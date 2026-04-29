'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import Toast from '@/components/Toast'

interface User {
  id: string; name: string; email: string; role: string
  company: string | null; title: string | null; avatarColor: string
  createdAt: Date; comparisons: number
}
interface Stats { total: number; totalComparisons: number; mostActive: string; avg: string }
type ToastState = { msg: string; type: 'green' | 'blue' | 'red' } | null

const AVATAR_COLORS = ['var(--primary-light)', 'var(--green)', 'var(--accent)', 'var(--red)', 'var(--gold)', 'var(--cyan)']

export default function UsersClient({ users, stats }: { users: User[]; stats: Stats }) {
  const [toast, setToast] = useState<ToastState>(null)
  const hideToast = useCallback(() => setToast(null), [])

  return (
    <>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-card-label">Total Pengguna</div>
          <div className="stat-card-num" style={{ color: 'var(--primary-light)' }}>{stats.total}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Total Perbandingan</div>
          <div className="stat-card-num" style={{ color: 'var(--gold)' }}>{stats.totalComparisons}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Paling Aktif</div>
          <div className="stat-card-num" style={{ color: 'var(--green)', fontSize: '1.2rem', paddingTop: 6 }}>
            {stats.mostActive}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Rata-rata per Pengguna</div>
          <div className="stat-card-num" style={{ color: 'var(--accent)' }}>{stats.avg}</div>
          <div className="stat-card-delta">perbandingan/pengguna</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div className="card-title" style={{ marginBottom: 0 }}>Semua Pengguna Analis</div>
          <button className="btn-primary" onClick={() => setToast({ msg: 'Fitur undang akan segera hadir', type: 'blue' })}>
            + Undang Pengguna
          </button>
        </div>
        {users.map((u, i) => (
          <div key={u.id} className="user-row">
            <div className="user-row-avatar" style={{ background: u.avatarColor, color: AVATAR_COLORS[i % AVATAR_COLORS.length] }}>
              {u.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div className="user-row-name">{u.name}</div>
              <div className="user-row-email">{u.email}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="user-row-stat">{u.comparisons} <span style={{ color: 'var(--text-3)', fontSize: 10 }}>analisis</span></div>
              <div className="user-row-last">
                Bergabung: {new Date(u.createdAt).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, marginLeft: 12 }}>
              <Link href={`/admin/users/${u.id}`} className="action-btn" style={{ textDecoration: 'none' }}>Lihat Detail</Link>
              <button className="action-btn" onClick={() => setToast({ msg: `Laporan penggunaan untuk ${u.name} diekspor`, type: 'green' })}>Ekspor</button>
              <button className="action-btn danger" onClick={() => setToast({ msg: `Sesi direset untuk ${u.name}`, type: 'blue' })}>Reset</button>
            </div>
          </div>
        ))}
      </div>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </>
  )
}
