'use client'

type FlowArrowItem = { type: 'arrow' }
type FlowNodeItem = { type: 'node'; label: string; className: string; sub?: string[] }
type FlowBranchItem = { type: 'branch'; label: string; className: string; items: { label: string }[] }
type FlowBoxItem = { type: 'box'; label: string; className: string; steps: string[] }
type FlowSplitItem = {
  type: 'split'
  admin: { label: string; items: string[] }
  analyst: { label: string; items: string[] }
}
type FlowItem = FlowArrowItem | FlowNodeItem | FlowBranchItem | FlowBoxItem | FlowSplitItem

const flow: FlowItem[] = [
  { type: 'node', label: 'START', className: 'start' },
  { type: 'arrow' },
  { type: 'node', label: 'Register', className: 'green', sub: ['/register'] },
  { type: 'arrow' },
  { type: 'node', label: 'Login', className: 'blue', sub: ['/login'] },
  { type: 'arrow' },
  {
    type: 'branch', label: 'Public Access', className: 'green',
    items: [
      { label: 'Landing Page → /' },
      { label: 'Kriteria Pupuk → /criteria' },
      { label: 'Dokumentasi → /documentation' },
    ],
  },
  { type: 'arrow' },
  { type: 'node', label: 'Dashboard', className: 'diamond', sub: ['/admin/dashboard', '/analyst/dashboard'] },
  { type: 'arrow' },
  {
    type: 'split',
    admin: {
      label: 'ADMIN',
      items: ['Analitik → /admin/analytics', 'Audit Trail → /admin/audit'],
    },
    analyst: {
      label: 'ANALYST',
      items: ['Perbandingan → /analyst/compare', 'Riwayat → /analyst/history', 'Profil → /analyst/profile'],
    },
  },
  { type: 'arrow' },
  {
    type: 'split',
    admin: {
      label: 'ADMIN MANAGEMENT',
      items: ['CRUD Provider → /admin/providers', 'Bobot Kriteria → /admin/weights', 'Kelola Users → /admin/users'],
    },
    analyst: {
      label: 'MOORA COMPARISON',
      items: [
        '1. Pilih Provider (dari DB)',
        '2. Input Fuzzy Value per Kriteria',
        '3. Hitung Normalisasi',
        '4. Terapkan Bobot',
        '5. Hitung Ranking (Yi Score)',
        '6. Lihat Hasil',
      ],
    },
  },
  { type: 'arrow' },
  {
    type: 'split',
    admin: {
      label: 'ADMIN',
      items: ['Logout → /api/auth/logout'],
    },
    analyst: {
      label: 'ANALYST',
      items: ['Simpan ke Riwayat', 'Logout → /api/auth/logout'],
    },
  },
  { type: 'arrow' },
  { type: 'node', label: 'END', className: 'end' },
]

function FlowNode({ label, className, sub }: { label: string; className: string; sub?: string[] }) {
  return (
    <div className="flow-row" style={{ justifyContent: 'center' }}>
      <div className="flow-node-col">
        <div className={`flow-node ${className}`}>{label}</div>
        {sub && sub.length > 0 && (
          <div className="flow-node-box auth">
            {sub.map((s, i) => <span key={i}>{s}</span>)}
          </div>
        )}
      </div>
    </div>
  )
}

function FlowArrow() {
  return <div className="flow-arrow">↓</div>
}

function FlowBranch({ label, className, items }: { label: string; className: string; items: { label: string }[] }) {
  return (
    <div className="flow-row" style={{ justifyContent: 'center' }}>
      <div className="flow-node-col">
        <span className={`branch-badge ${className}`}>{label}</span>
        <div className="flow-node-box">
          {items.map((item, i) => <span key={i}>{item.label}</span>)}
        </div>
      </div>
    </div>
  )
}

function FlowSplit({ admin, analyst }: { admin: { label: string; items: string[] }; analyst: { label: string; items: string[] } }) {
  return (
    <div className="flow-row branch-row">
      <div className="flow-node-col">
        <span className="branch-badge admin">{admin.label}</span>
        <div className="flow-node-box">
          {admin.items.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>
      <div className="flow-node-col">
        <span className="branch-badge analyst">{analyst.label}</span>
        <div className="flow-node-box">
          {analyst.items.map((s, i) => <span key={i}>{s}</span>)}
        </div>
      </div>
    </div>
  )
}

function renderFlowItem(item: FlowItem, i: number) {
  switch (item.type) {
    case 'arrow':
      return <FlowArrow key={i} />
    case 'node':
      return <FlowNode key={i} label={item.label} className={item.className} sub={item.sub} />
    case 'branch':
      return <FlowBranch key={i} label={item.label} className={item.className} items={item.items} />
    case 'split':
      return <FlowSplit key={i} admin={item.admin} analyst={item.analyst} />
    case 'box':
      return <FlowBox key={i} label={item.label} className={item.className} steps={item.steps} />
  }
}

function FlowBox({ label, className, steps }: { label: string; className: string; steps: string[] }) {
  return (
    <div className="flow-row" style={{ justifyContent: 'center' }}>
      <div className="flow-node-col">
        <div className={`flow-node ${className}`}>{label}</div>
        <div className="flow-node-box process">
          {steps.map((step, i) => <span key={i}>{step}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function UseCaseDiagram() {
  return (
    <div style={{ padding: '20px 0' }}>
      <p style={{ fontSize: 14, color: 'var(--text-2)', marginBottom: 24, textAlign: 'center' }}>
        Alur use case <strong>Admin</strong> (kuning) dan <strong>Analyst</strong> (hijau) digabung dalam satu diagram.
        Percabangan menunjukkan perbedaan akses dan fitur masing-masing role.
      </p>
      <div className="system-flow">
        {flow.map((item, i) => renderFlowItem(item, i))}
      </div>
      <div style={{
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--r)', padding: 16, fontSize: 13, marginTop: 24,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 8, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 12 }}>
          Legend
        </div>
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <span className="branch-badge admin">ADMIN</span>
          <span className="branch-badge analyst">ANALYST</span>
          <span style={{ color: 'var(--text-3)' }}>include: Perbandingan membutuhkan data Kriteria & Bobot</span>
        </div>
      </div>
    </div>
  )
}
