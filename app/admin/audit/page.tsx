import { prisma } from '@/lib/prisma'

export default async function AdminAudit() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
    include: {
      user: { select: { name: true, email: true } },
    },
  })

  const ACTION_LABELS: Record<string, string> = {
    'LOGIN': 'Masuk',
    'LOGIN_FAILED': 'Gagal Masuk',
    'LOGOUT': 'Keluar',
    'CREATE': 'Buat',
    'UPDATE': 'Edit',
    'DELETE': 'Hapus',
    'COMPARISON': 'Perbandingan',
  }

  const ENTITY_LABELS: Record<string, string> = {
    'user': 'User',
    'provider': 'Provider',
    'criterion': 'Kriteria',
    'weight': 'Bobot',
    'comparison': 'Perbandingan',
  }

  return (
    <div className="card" style={{ padding: 0 }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
        <div className="card-title">Riwayat Aktivitas</div>
      </div>

      {logs.length === 0 ? (
        <div className="empty-state">
          <p>Belum ada aktivitas</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>User</th>
              <th>Aktivitas</th>
              <th>Entitas</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td style={{ fontSize: 11, color: 'var(--text-3)', whiteSpace: 'nowrap' }}>
                  {new Date(log.createdAt).toLocaleString('id-ID', { 
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
                  })}
                </td>
                <td>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{log.user?.name || 'System'}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{log.user?.email}</div>
                </td>
                <td>
                  <span className={`badge ${log.action === 'LOGIN_FAILED' || log.action === 'DELETE' ? 'cost' : 'benefit'}`}>
                    {ACTION_LABELS[log.action] || log.action}
                  </span>
                </td>
                <td style={{ fontSize: 12 }}>{ENTITY_LABELS[log.entity] || log.entity}</td>
                <td style={{ fontSize: 11, color: 'var(--text-2)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {log.entityId ? `#${log.entityId.slice(-6)}` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}