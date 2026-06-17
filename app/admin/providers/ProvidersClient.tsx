'use client'
import { useState, useCallback } from 'react'
import type { Provider } from '@prisma/client'
import { getProviderIcon } from '@/lib/icons'
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
    setForm({ color: '#6366F1', harga: '25000', kandunganNutrisi: '80', kualitas: '8', dampak: '8', ramahLingkungan: '8', ketersediaan: '8' })
    setModal('add')
  }
  const openEdit = (idx: number) => {
    const p = providers[idx]
    setForm({
      color: p.color, description: p.description,
      harga: String(p.harga), kandunganNutrisi: String(p.kandunganNutrisi),
      kualitas: String(p.kualitas), dampak: String(p.dampak),
      ramahLingkungan: String(p.ramahLingkungan), ketersediaan: String(p.ketersediaan),
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
        <div style={{ color: 'var(--text-2)' }}>
          <strong style={{ color: 'var(--text)' }}>{providers.length}</strong> penyedia dalam database
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Tambah Penyedia</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Penyedia</th><th>Harga</th><th>Nutrisi</th>
              <th>Kualitas</th><th>Dampak</th><th>Ramah Lingk.</th><th>Ketersediaan</th><th>Status</th><th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((p, i) => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{getProviderIcon(p.name)}</span>
                    <div>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div style={{ color: 'var(--text-3)' }}>/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="cell-mono">Rp{p.harga.toLocaleString()}</td>
                <td className="cell-mono">{p.kandunganNutrisi}%</td>
                <td className="cell-mono">{p.kualitas}/10</td>
                <td className="cell-mono">{p.dampak}/10</td>
                <td className="cell-mono">{p.ramahLingkungan}/10</td>
                <td className="cell-mono">{p.ketersediaan}/10</td>
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
            <div><label>Harga (Rp)</label><input type="number" step="1000" placeholder="25000" value={f('harga')} onChange={e => sf('harga')(e.target.value)} /></div>
            <div><label>Kandungan Nutrisi (%)</label><input type="number" step="0.1" placeholder="80" value={f('kandunganNutrisi')} onChange={e => sf('kandunganNutrisi')(e.target.value)} /></div>
            <div><label>Kualitas (/10)</label><input type="number" step="0.5" placeholder="8.0" value={f('kualitas')} onChange={e => sf('kualitas')(e.target.value)} /></div>
            <div><label>Dampak (/10)</label><input type="number" step="0.5" placeholder="8.0" value={f('dampak')} onChange={e => sf('dampak')(e.target.value)} /></div>
            <div><label>Ramah Lingkungan (/10)</label><input type="number" step="0.5" placeholder="8.0" value={f('ramahLingkungan')} onChange={e => sf('ramahLingkungan')(e.target.value)} /></div>
            <div><label>Ketersediaan (/10)</label><input type="number" step="0.5" placeholder="8.0" value={f('ketersediaan')} onChange={e => sf('ketersediaan')(e.target.value)} /></div>
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
            <div><label>Harga (Rp)</label><input type="number" step="1000" value={f('harga')} onChange={e => sf('harga')(e.target.value)} /></div>
            <div><label>Kandungan Nutrisi (%)</label><input type="number" step="0.1" value={f('kandunganNutrisi')} onChange={e => sf('kandunganNutrisi')(e.target.value)} /></div>
            <div><label>Kualitas (/10)</label><input type="number" step="0.5" value={f('kualitas')} onChange={e => sf('kualitas')(e.target.value)} /></div>
            <div><label>Dampak (/10)</label><input type="number" step="0.5" value={f('dampak')} onChange={e => sf('dampak')(e.target.value)} /></div>
            <div><label>Ramah Lingkungan (/10)</label><input type="number" step="0.5" value={f('ramahLingkungan')} onChange={e => sf('ramahLingkungan')(e.target.value)} /></div>
            <div><label>Ketersediaan (/10)</label><input type="number" step="0.5" value={f('ketersediaan')} onChange={e => sf('ketersediaan')(e.target.value)} /></div>
            <div><label>Warna Merek</label><input value={f('color')} onChange={e => sf('color')(e.target.value)} /></div>
            <div className="full"><label>Deskripsi</label><input value={f('description')} onChange={e => sf('description')(e.target.value)} /></div>
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </>
  )
}
