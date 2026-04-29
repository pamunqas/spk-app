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
    if (!form.name || !form.initials) { showToast('Name and initials required', 'blue'); return }
    const res = await fetch('/api/providers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    if (!res.ok) { showToast('Failed to add provider', 'red'); return }
    const p = await res.json()
    setProviders(prev => [...prev, p])
    setModal(null)
    showToast(`${p.name} added successfully`)
  }

  const handleEdit = async () => {
    if (editIdx === null) return
    const p = providers[editIdx]
    const res = await fetch(`/api/providers/${p.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    if (!res.ok) { showToast('Failed to update provider', 'red'); return }
    const updated = await res.json()
    setProviders(prev => prev.map((x, i) => (i === editIdx ? updated : x)))
    setModal(null)
    showToast(`${updated.name} updated`)
  }

  const toggleStatus = async (idx: number) => {
    const p = providers[idx]
    const newStatus = p.status === 'active' ? 'inactive' : 'active'
    const res = await fetch(`/api/providers/${p.id}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (!res.ok) { showToast('Failed to update status', 'red'); return }
    setProviders(prev => prev.map((x, i) => (i === idx ? { ...x, status: newStatus } : x)))
    showToast(`${p.name} ${newStatus}`, 'blue')
  }

  const f = (k: string) => form[k] ?? ''
  const sf = (k: string) => (v: string) => setForm(prev => ({ ...prev, [k]: v }))

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ fontSize: 13, color: 'var(--text-2)' }}>
          <strong style={{ color: 'var(--text)' }}>{providers.length}</strong> providers in the database
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Provider</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Provider</th><th>MDR Fee</th><th>Settlement</th>
              <th>Success Rate</th><th>Support</th><th>Status</th><th>Actions</th>
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
                      {p.status === 'active' ? 'Deactivate' : 'Activate'}
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
          title="Add New Provider"
          subtitle="Fill in the provider details below."
          onClose={() => setModal(null)}
          actions={<>
            <button className="btn-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn-primary" onClick={handleAdd}>Add Provider</button>
          </>}
        >
          <div className="provider-form">
            <div><label>Provider Name</label><input placeholder="e.g. PayGate Pro" value={f('name')} onChange={e => sf('name')(e.target.value)} /></div>
            <div><label>Initials (2 char)</label><input maxLength={2} placeholder="PG" value={f('initials')} onChange={e => sf('initials')(e.target.value)} /></div>
            <div><label>MDR Fee (%)</label><input type="number" step="0.1" placeholder="1.5" value={f('mdrFee')} onChange={e => sf('mdrFee')(e.target.value)} /></div>
            <div><label>Settlement (days)</label><input type="number" step="0.5" placeholder="1.0" value={f('settlementTime')} onChange={e => sf('settlementTime')(e.target.value)} /></div>
            <div><label>Success Rate (%)</label><input type="number" step="0.1" placeholder="99.0" value={f('successRate')} onChange={e => sf('successRate')(e.target.value)} /></div>
            <div><label>Setup Fee (USD)</label><input type="number" placeholder="0" value={f('setupFee')} onChange={e => sf('setupFee')(e.target.value)} /></div>
            <div><label>Support Quality (/10)</label><input type="number" step="0.5" placeholder="8.0" value={f('supportQuality')} onChange={e => sf('supportQuality')(e.target.value)} /></div>
            <div><label>Brand Color</label><input placeholder="#6366F1" value={f('color')} onChange={e => sf('color')(e.target.value)} /></div>
            <div className="full"><label>Description</label><input placeholder="Brief description..." value={f('description')} onChange={e => sf('description')(e.target.value)} /></div>
          </div>
        </Modal>
      )}

      {modal === 'edit' && editIdx !== null && (
        <Modal
          title={`Edit ${providers[editIdx].name}`}
          subtitle="Update this provider's data values."
          onClose={() => setModal(null)}
          actions={<>
            <button className="btn-cancel" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn-primary" onClick={handleEdit}>Save Changes</button>
          </>}
        >
          <div className="provider-form">
            <div><label>MDR Fee (%)</label><input type="number" step="0.1" value={f('mdrFee')} onChange={e => sf('mdrFee')(e.target.value)} /></div>
            <div><label>Settlement (days)</label><input type="number" step="0.5" value={f('settlementTime')} onChange={e => sf('settlementTime')(e.target.value)} /></div>
            <div><label>Success Rate (%)</label><input type="number" step="0.1" value={f('successRate')} onChange={e => sf('successRate')(e.target.value)} /></div>
            <div><label>Setup Fee (USD)</label><input type="number" value={f('setupFee')} onChange={e => sf('setupFee')(e.target.value)} /></div>
            <div><label>Support Quality (/10)</label><input type="number" step="0.5" value={f('supportQuality')} onChange={e => sf('supportQuality')(e.target.value)} /></div>
            <div><label>Brand Color</label><input value={f('color')} onChange={e => sf('color')(e.target.value)} /></div>
            <div className="full"><label>Description</label><input value={f('description')} onChange={e => sf('description')(e.target.value)} /></div>
          </div>
        </Modal>
      )}

      {toast && <Toast message={toast.msg} type={toast.type} onClose={hideToast} />}
    </>
  )
}
