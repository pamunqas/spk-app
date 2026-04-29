'use client'
import { useState, useCallback } from 'react'
import type { Provider } from '@prisma/client'
import Modal from '@/components/Modal'
import Toast from '@/components/Toast'

interface Props { initialProviders: Provider[] }

type ToastState = { msg: string; type: 'green' | 'blue' | 'red' } | null

export default function ProvidersClient({ initialProviders }: Props) {
  const [providers, setProviders] = useState(initialProviders)
  const [toast, setToast]     = useState<ToastState>(null)
  const [modal, setModal]     = useState<'add' | 'edit' | null>(null)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [form, setForm]       = useState<Record<string, string>>({})

  const showToast = (msg: string, type: 'green' | 'blue' | 'red' = 'green') => setToast({ msg, type })
  const hideToast = useCallback(() => setToast(null), [])

  const openAdd = () => {
    setForm({ color: '#6366F1', mdrFee: '1.5', settlementTime: '1.0', successRate: '98.0', setupFee: '0', supportQuality: '7.5' })
    setModal('add')
  }
  const openEdit = (idx: number) => {
    const p = providers[idx]
    setForm({
      color: p.color, description: p.description,
      mdrFee: String(p.mdrFee), settlementTime: String(p.settlementTime),
      successRate: String(p.successRate), setupFee: String(p.setupFee),
      supportQuality: String(p.supportQuality),
    })
    setEditIdx(idx)
    setModal('edit')
  }

  const handleAdd = async () => {
    if (!form.name || !form.initials) { showToast('Nama dan inisial diperlukan', 'blue'); return }
    const res = await fetch('/api/providers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    if (!res.ok) { showToast('Gagal menambahkan penyedia', 'red'); return }
    const p = await res.json()
    setProviders(prev => [...prev, p])
    setModal(null)
    showToast(`${p.name} berhasil ditambahkan`)
  }

  const handleEdit = async () => {
    if (editIdx === null) return
    const p = providers[editIdx]
    const res = await fetch(`/api/providers/${p.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    if (!res.ok) { showToast('Gagal memperbarui penyedia', 'red'); return }
    const updated = await res.json()
    setProviders(prev => prev.map((x, i) => (i === editIdx ? updated : x)))
    setModal(null)
    showToast(`${updated.name} diperbarui`)
  }

  const toggleStatus = async (idx: number) => {
    const p = providers[idx]
    const newStatus = p.status === 'active' ? 'inactive' : 'active'
    const res = await fetch(`/api/providers/${p.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (!res.ok) { showToast('Gagal memperbarui status', 'red'); return }
    setProviders(prev => prev.map((x, i) => (i === idx ? { ...x, status: newStatus } : x)))
    showToast(`${p.name} ${newStatus === 'active' ? 'diaktifkan' : 'dinonaktifkan'}`, 'blue')
  }

  const f = (k: string) => form[k] ?? ''
  const sf = (k: string) => (v: string) => setForm(prev => ({ ...prev, [k]: v }))

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
          <strong style={{ color: 'var(--text)' }}>{providers.length}</strong> penyedia dalam database
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Tambah Penyedia</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Penyedia</th><th>Biaya MDR</th><th>Penyelesaian</th>
              <th>Tingkat Keberhasilan</th><th>Dukungan</th><th>Status</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p, i) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 7, background: p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 500, color: 'white', flexShrink: 0 }}>
                      {p.initials}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)' }}>/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="cell-mono">{p.mdrFee}%</td>
                <td className="cell-mono">{p.settlementTime}d</td>
                <td className="cell-mono" style={{ color: 'var(--green)' }}>{p.successRate}%</td>
                <td className="cell-mono">{p.supportQuality}/10</td>
                <td><span className={`badge ${p.status}`}>{p.status}</span></td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button className="action-btn" onClick={() => openEdit(i)}>Edit</button>
                    <button className="action-btn danger" onClick={() => toggleStatus(i)}>
                      {p.status === 'active' ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal === 'add' && (
        <Modal
          title="Tambah Penyedia Baru"
          subtitle="Isi detail penyedia di bawah ini."
          onClose={() => setModal(null)}
          actions={<>
            <button className="btn-cancel" onClick={() => setModal(null)}>Batal</button>
            <button className="btn-primary" onClick={handleAdd}>Tambah Penyedia</button>
          </>}
        >
          <div className="provider-form">
            <div><label>Nama Penyedia</label><input placeholder="mis. PayGate Pro" value={f('name')} onChange={e => sf('name')(e.target.value)} /></div>
            <div><label>Inisial (2 karakter)</label><input maxLength={2} placeholder="PG" value={f('initials')} onChange={e => sf('initials')(e.target.value)} /></div>
            <div><label>Biaya MDR (%)</label><input type="number" step="0.1" placeholder="1.5" value={f('mdrFee')} onChange={e => sf('mdrFee')(e.target.value)} /></div>
            <div><label>Penyelesaian (hari)</label><input type="number" step="0.5" placeholder="1.0" value={f('settlementTime')} onChange={e => sf('settlementTime')(e.target.value)} /></div>
            <div><label>Tingkat Keberhasilan (%)</label><input type="number" step="0.1" placeholder="99.0" value={f('successRate')} onChange={e => sf('successRate')(e.target.value)} /></div>
            <div><label>Biaya Pengaturan (USD)</label><input type="number" placeholder="0" value={f('setupFee')} onChange={e => sf('setupFee')(e.target.value)} /></div>
            <div><label>Kualitas Dukungan (/10)</label><input type="number" step="0.5" placeholder="8.0" value={f('supportQuality')} onChange={e => sf('supportQuality')(e.target.value)} /></div>
            <div><label>Warna Merek</label><input placeholder="#6366F1" value={f('color')} onChange={e => sf('color')(e.target.value)} /></div>
            <div className="full"><label>Deskripsi</label><input placeholder="Deskripsi singkat..." value={f('description')} onChange={e => sf('description')(e.target.value)} /></div>
          </div>
        </Modal>
      )}

      {modal === 'edit' && editIdx !== null && (
        <Modal
          title={`Edit ${providers[editIdx].name}`}
          subtitle="Perbarui nilai data penyedia ini."
          onClose={() => setModal(null)}
          actions={<>
            <button className="btn-cancel" onClick={() => setModal(null)}>Batal</button>
            <button className="btn-primary" onClick={handleEdit}>Simpan Perubahan</button>
          </>}
        >
          <div className="provider-form">
            <div><label>Biaya MDR (%)</label><input type="number" step="0.1" value={f('mdrFee')} onChange={e => sf('mdrFee')(e.target.value)} /></div>
            <div><label>Penyelesaian (hari)</label><input type="number" step="0.5" value={f('settlementTime')} onChange={e => sf('settlementTime')(e.target.value)} /></div>
            <div><label>Tingkat Keberhasilan (%)</label><input type="number" step="0.1" value={f('successRate')} onChange={e => sf('successRate')(e.target.value)} /></div>
            <div><label>Biaya Pengaturan (USD)</label><input type="number" value={f('setupFee')} onChange={e => sf('setupFee')(e.target.value)} /></div>
            <div><label>Kualitas Dukungan (/10)</label><input type="number" step="0.5" value={f('supportQuality')} onChange={e => sf('supportQuality')(e.target.value)} /></div>
            <div><label>Warna Merek</label><input value={f('color')} onChange={e => sf('color')(e.target.value)} /></div>
            <div className="full"><label>Deskripsi</label><input value={f('description')} onChange={e => sf('description')(e.target.value)} /></div>
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </>
  )
}
