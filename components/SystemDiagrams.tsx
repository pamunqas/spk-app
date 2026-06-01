'use client'

/* ───────────────────────────────────────────
   DATA: 5 flowcharts with source annotations
   ─────────────────────────────────────────── */

type FlowNode = {
  type: 'node' | 'arrow' | 'branch'
  label: string
  badge?: string
  color?: string
  source?: string
  items?: { label: string; source?: string }[]
}

/* ─── 1. SITEMAP ─── */
const sitemap: FlowNode[] = [
  { type: 'node', label: 'SPK Ecofarming', color: 'start' },
  { type: 'arrow', label: '' },
  { type: 'branch', label: '🌐 PUBLIC', color: 'green', items: [
    { label: 'Landing Page', source: 'app/page.tsx' },
    { label: 'Login', source: 'app/login/page.tsx' },
    { label: 'Register', source: 'app/register/page.tsx' },
    { label: 'Kriteria Pupuk', source: 'app/criteria/page.tsx' },
    { label: 'Dokumentasi', source: 'app/documentation/page.tsx' },
    { label: 'Developer', source: 'app/developer/page.tsx' },
    { label: 'Flowchart', source: 'app/flowchart/page.tsx' },
    { label: 'Privacy / Terms', source: 'app/privacy/page.tsx / app/terms/page.tsx' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: '🔐 AUTH (auth.ts + proxy.ts)', color: 'blue', items: [
    { label: 'JWT Strategy', source: 'auth.config.ts:6' },
    { label: 'Credentials Provider', source: 'auth.ts:23-47' },
    { label: 'bcrypt compare', source: 'auth.ts:38' },
    { label: 'Audit: LOGIN / LOGIN_FAILED', source: 'auth.ts:35,43' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: '👤 ANALYST (role = analyst)', color: 'analyst', items: [
    { label: 'Dashboard', source: 'app/analyst/dashboard/page.tsx' },
    { label: 'Compare (MOORA)', source: 'app/analyst/compare/page.tsx' },
    { label: 'History', source: 'app/analyst/history/page.tsx' },
    { label: 'Profile', source: 'app/analyst/profile/page.tsx' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: '⚙️ ADMIN (role = admin)', color: 'admin', items: [
    { label: 'Dashboard', source: 'app/admin/dashboard/page.tsx' },
    { label: 'Analytics', source: 'app/admin/analytics/page.tsx' },
    { label: 'Providers (CRUD)', source: 'app/admin/providers/page.tsx' },
    { label: 'Criteria Weights', source: 'app/admin/weights/page.tsx' },
    { label: 'Users', source: 'app/admin/users/page.tsx' },
    { label: 'Audit Trail', source: 'app/admin/audit/page.tsx' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: '📦 DATABASE (Prisma)', color: 'purple', items: [
    { label: 'User', source: 'prisma/schema.prisma:9' },
    { label: 'Provider', source: 'prisma/schema.prisma:23' },
    { label: 'Criterion', source: 'prisma/schema.prisma:41' },
    { label: 'Comparison', source: 'prisma/schema.prisma:51' },
    { label: 'AuditLog', source: 'prisma/schema.prisma:61' },
  ]},
]

/* ─── 2. SYSTEM FLOWCHART ─── */
const systemFlow: FlowNode[] = [
  { type: 'node', label: 'VISIT', color: 'start', source: 'app/page.tsx' },
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'PUBLIC PAGES', color: 'green', items: [
    { label: 'Landing /', source: 'app/page.tsx:6' },
    { label: 'Kriteria /criteria', source: 'app/criteria/page.tsx:6' },
    { label: 'Dokumentasi /documentation', source: 'app/documentation/page.tsx:6' },
    { label: 'Developer /developer', source: 'app/developer/page.tsx:6' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Register?', color: 'diamond', source: 'app/register/page.tsx' },
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'REGISTER FORM', color: 'blue', items: [
    { label: 'name, email, password', source: 'app/register/page.tsx:30-36' },
    { label: 'company, title (optional)', source: 'app/register/page.tsx:38-39' },
    { label: 'POST /api/register', source: 'app/api/register/route.ts:11-50' },
    { label: 'bcrypt → User (role=analyst)', source: 'app/api/register/route.ts:44' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Login', color: 'diamond', source: 'app/login/page.tsx' },
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'LOGIN FLOW', color: 'blue', items: [
    { label: 'POST credentials', source: 'auth.ts:23-47' },
    { label: 'bcrypt compare', source: 'auth.ts:38' },
    { label: 'JWT token (id + role)', source: 'auth.config.ts:9-11' },
    { label: 'Audit: LOGIN', source: 'auth.ts:43' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Middleware: Check Role', color: 'diamond', source: 'proxy.ts:7-28' },
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'ROLE = ADMIN', color: 'admin', items: [
    { label: '→ /admin/dashboard', source: 'proxy.ts:20' },
    { label: 'Server guard: auth() role check', source: 'app/admin/layout.tsx:5-12' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'ROLE = ANALYST', color: 'analyst', items: [
    { label: '→ /analyst/compare', source: 'proxy.ts:20' },
    { label: 'Server guard: auth() only', source: 'app/analyst/layout.tsx:5-12' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'MOORA COMPARISON', color: 'purple', items: [
    { label: 'Pilih Provider', source: 'app/analyst/compare/page.tsx:8-15' },
    { label: 'Input Fuzzy Values', source: 'app/analyst/compare/page.tsx:18-30' },
    { label: 'POST /api/comparisons', source: 'app/api/comparisons/route.ts:20-50' },
    { label: 'computeMoora()', source: 'lib/moora.ts:10-80' },
    { label: 'Save to DB → Audit', source: 'app/api/comparisons/route.ts:48' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'node', label: 'END', color: 'end' },
]

/* ─── 3. ADMIN FLOWCHART ─── */
const adminFlow: FlowNode[] = [
  { type: 'node', label: 'START /admin/', color: 'start' },
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Middleware Guard', color: 'diamond', source: 'proxy.ts:23-24' },
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Layout: auth() check', color: 'diamond', source: 'app/admin/layout.tsx:5-12' },
  { type: 'arrow', label: '' },
  { type: 'node', label: 'AdminShell + Sidebar', color: 'blue', source: 'app/admin/AdminShell.tsx:6-30' },
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'DASHBOARD /admin/dashboard', color: 'green', items: [
    { label: 'Stat: Total Provider', source: 'app/admin/dashboard/page.tsx:15-20' },
    { label: 'Stat: Active Users', source: 'app/admin/dashboard/page.tsx:22-25' },
    { label: 'Stat: Total Comparisons', source: 'app/admin/dashboard/page.tsx:27-30' },
    { label: 'MOORA Ranklist (all providers)', source: 'app/admin/dashboard/page.tsx:35-50' },
    { label: 'Recent 5 comparisons', source: 'app/admin/dashboard/page.tsx:18' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'ANALYTICS /admin/analytics', color: 'gold', items: [
    { label: 'Win frequency bar chart', source: 'app/admin/analytics/page.tsx:15-30' },
    { label: 'Win rate percentages', source: 'app/admin/analytics/page.tsx:32-40' },
    { label: 'Criteria weight impact', source: 'app/admin/analytics/page.tsx:42-50' },
    { label: 'Data: last 100 comparisons', source: 'app/admin/analytics/page.tsx:12' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'PROVIDERS /admin/providers', color: 'green', items: [
    { label: 'List all providers', source: 'app/admin/providers/page.tsx | GET /api/providers' },
    { label: 'POST: Create new provider', source: 'app/api/providers/route.ts:8-30' },
    { label: 'PUT: Edit scores & color', source: 'app/api/providers/[id]/route.ts:10-35' },
    { label: 'PATCH: Toggle active/inactive', source: 'app/api/providers/[id]/route.ts:40-55' },
    { label: 'DELETE: Remove provider', source: 'app/api/providers/[id]/route.ts:58-70' },
    { label: 'Audit: all mutations logged', source: 'app/api/providers/route.ts:28' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'WEIGHTS /admin/weights', color: 'purple', items: [
    { label: 'List 6 criteria + current weight', source: 'app/admin/weights/page.tsx | GET /api/weights' },
    { label: 'Slider UI per criterion', source: 'app/admin/weights/page.tsx:10-25' },
    { label: 'Validation: sum = 100%', source: 'app/api/weights/route.ts:20-35' },
    { label: 'PUT: Bulk-update weights', source: 'app/api/weights/route.ts:12-40' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'USERS /admin/users', color: 'blue', items: [
    { label: 'List all analysts', source: 'app/admin/users/page.tsx | GET /api/users' },
    { label: 'Comparison count per user', source: 'app/admin/users/page.tsx:12-18' },
    { label: 'User detail /admin/users/[id]', source: 'app/admin/users/[id]/page.tsx:8-30' },
    { label: 'User comparison history', source: 'app/admin/users/[id]/page.tsx:14-25' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'AUDIT /admin/audit', color: 'gold', items: [
    { label: 'Last 50 activity logs', source: 'app/admin/audit/page.tsx:10-15' },
    { label: 'Columns: Waktu, User, Aksi, Entitas, Detail', source: 'app/admin/audit/page.tsx:17-30' },
    { label: 'Actions: LOGIN, LOGOUT, CREATE, UPDATE, DELETE', source: 'app/admin/audit/page.tsx:20-26' },
    { label: 'GET /api/audit (admin only)', source: 'app/api/audit/route.ts:8-15' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Logout', color: 'end', source: 'components/Sidebar.tsx:45-55' },
  { type: 'arrow', label: '' },
  { type: 'node', label: 'END', color: 'end' },
]

/* ─── 4. ANALYST FLOWCHART ─── */
const analystFlow: FlowNode[] = [
  { type: 'node', label: 'START /analyst/', color: 'start' },
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Middleware: auth check', color: 'diamond', source: 'proxy.ts:14-16' },
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Layout: auth() guard', color: 'diamond', source: 'app/analyst/layout.tsx:5-12' },
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'DASHBOARD /analyst/dashboard', color: 'green', items: [
    { label: 'Stat: Total comparisons', source: 'app/analyst/dashboard/page.tsx:15-20' },
    { label: 'Stat: This month count', source: 'app/analyst/dashboard/page.tsx:22-25' },
    { label: 'Stat: Most chosen provider', source: 'app/analyst/dashboard/page.tsx:27-30' },
    { label: 'Last ranking + medal', source: 'app/analyst/dashboard/page.tsx:32-40' },
    { label: 'Trending providers list', source: 'app/analyst/dashboard/page.tsx:42-48' },
    { label: '4-month activity chart (BarChart)', source: 'app/analyst/dashboard/page.tsx:50-60' },
    { label: 'PATCH /api/comparisons (aggregate)', source: 'app/analyst/dashboard/page.tsx:12' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'COMPARE /analyst/compare', color: 'purple', items: [
    { label: 'Server: fetch active providers + criteria', source: 'app/analyst/compare/page.tsx:8-12' },
    { label: 'Step 1: Select 2+ providers', source: 'app/analyst/compare/page.tsx-client' },
    { label: 'Step 2: Input fuzzy values (1/3/5)', source: 'app/analyst/compare/page.tsx-client' },
    { label: 'Step 3: Compute MOORA', source: 'app/api/comparisons/route.ts:20-50' },
    { label: 'Show: ranked results + strengths', source: 'app/analyst/compare/page.tsx-client' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'HISTORY /analyst/history', color: 'blue', items: [
    { label: 'Stat: total analyses', source: 'app/analyst/history/page.tsx:10-15' },
    { label: 'Stat: favorite provider', source: 'app/analyst/history/page.tsx:12-18' },
    { label: 'Last 30 comparisons list', source: 'app/analyst/history/page.tsx:20-30' },
    { label: 'Expandable rank details', source: 'app/analyst/history/page.tsx-client' },
    { label: 'Own userId scope', source: 'app/api/comparisons/route.ts:10-15' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'PROFILE /analyst/profile', color: 'gold', items: [
    { label: 'Server: fetch user + stats', source: 'app/analyst/profile/page.tsx:8-20' },
    { label: 'Edit: name, email, company, title', source: 'app/analyst/profile/page.tsx-client' },
    { label: 'Preferences: market, business type', source: 'app/analyst/profile/page.tsx-client' },
    { label: 'Stats: join date, win rate', source: 'app/analyst/profile/page.tsx-client' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'SIDEBAR NAV (AnalystShell)', color: 'green', items: [
    { label: '3 nav items', source: 'app/analyst/AnalystShell.tsx:8-12' },
    { label: 'Dokumentasi link', source: 'components/Sidebar.tsx:42' },
    { label: 'Logout: POST /api/auth/logout', source: 'components/Sidebar.tsx:45-55' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'node', label: 'END', color: 'end' },
]

/* ─── 5. MOORA CALCULATION FLOWCHART ─── */
const mooraFlow: FlowNode[] = [
  { type: 'node', label: 'START: User submits comparison', color: 'start', source: 'app/analyst/compare/page.tsx-client' },
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'INPUT', color: 'green', items: [
    { label: 'providerInputs[]: selected IDs + fuzzy scores', source: 'app/api/comparisons/route.ts:30-35' },
    { label: 'Fetch providers from DB', source: 'app/api/comparisons/route.ts:36' },
    { label: 'Fetch criteria + weights from DB', source: 'app/api/comparisons/route.ts:37' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'STEP 1: BUILD MATRIX', color: 'blue', items: [
    { label: 'Extract raw values per criterion', source: 'lib/moora.ts:25' },
    { label: 'Map provider → [harga, nutrisi, kualitas, ...]', source: 'lib/moora.ts:28-35' },
    { label: 'Split: benefit cols vs cost cols', source: 'lib/moora.ts:38-42' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'STEP 2: VECTOR NORMALIZATION', color: 'purple', items: [
    { label: 'For each column j:', source: 'lib/moora.ts:45' },
    { label: 'sqrt_sum = √(Σ x²j)', source: 'lib/moora.ts:47' },
    { label: 'Nij = xij / sqrt_sum', source: 'lib/moora.ts:49' },
    { label: 'Result: normalized matrix [0..1]', source: 'lib/moora.ts:52' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'STEP 3: APPLY WEIGHTS', color: 'gold', items: [
    { label: 'For each cell: Vij = Nij × Wj', source: 'lib/moora.ts:55' },
    { label: 'Wj from admin-config /api/weights', source: 'app/api/weights/route.ts' },
    { label: 'Default: Harga=20%, Nutrisi=25%, ...', source: 'prisma/seed.ts:20-30' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'STEP 4: YI SCORE', color: 'green', items: [
    { label: 'For each provider i:', source: 'lib/moora.ts:58' },
    { label: 'Yi = ΣV(benefit) − ΣV(cost)', source: 'lib/moora.ts:60' },
    { label: 'Benefit (+): nutrisi, kualitas, dampak, ...', source: 'lib/moora.ts:62' },
    { label: 'Cost (−): harga', source: 'lib/moora.ts:64' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'STEP 5: RANKING', color: 'purple', items: [
    { label: 'Sort providers by Yi desc', source: 'lib/moora.ts:67' },
    { label: 'Rank 1 = highest Yi score', source: 'lib/moora.ts:69' },
    { label: 'Compute percentile 0–100', source: 'lib/moora.ts:71' },
    { label: 'Identify strengths & weaknesses', source: 'lib/moora.ts:74-80' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'branch', label: 'OUTPUT', color: 'gold', items: [
    { label: 'Ranked provider list', source: 'app/analyst/compare/page.tsx-client' },
    { label: 'Normalized matrix table', source: 'app/analyst/compare/page.tsx-client' },
    { label: 'Weighted scores', source: 'app/analyst/compare/page.tsx-client' },
    { label: 'Winner + crown badge', source: 'app/analyst/compare/page.tsx-client' },
    { label: 'Strength / weakness tags', source: 'app/analyst/compare/page.tsx-client' },
  ]},
  { type: 'arrow', label: '' },
  { type: 'node', label: 'SAVE Comparison → DB', color: 'blue', source: 'app/api/comparisons/route.ts:42-48' },
  { type: 'arrow', label: '' },
  { type: 'node', label: 'Audit Log: COMPARISON', color: 'diamond', source: 'app/api/comparisons/route.ts:49' },
  { type: 'arrow', label: '' },
  { type: 'node', label: 'END', color: 'end' },
]

/* ───────────────────────────────────────────
   COMPONENT
   ─────────────────────────────────────────── */

function Source({ path }: { path: string }) {
  return <span style={{ fontSize: 11, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{path}</span>
}

function DiagramBlock({ title, nodes }: { title: string; nodes: FlowNode[] }) {
  return (
    <div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text)' }}>{title}</h3>
      <div className="system-flow">
        {nodes.map((n, i) => {
          if (n.type === 'arrow') {
            return <div key={i} className="flow-arrow">↓</div>
          }
          if (n.type === 'branch') {
            return (
              <div key={i} className="flow-row" style={{ justifyContent: 'center' }}>
                <div className="flow-node-col">
                  <span className={`branch-badge ${n.color ?? 'green'}`} style={{ fontSize: 12 }}>{n.label}</span>
                  <div className="flow-node-box" style={{ minWidth: 280, textAlign: 'left' }}>
                    {n.items?.map((item, j) => (
                      <span key={j}>
                        {item.label}
                        {item.source && <span style={{ float: 'right', fontSize: 10, color: 'var(--text-3)', fontFamily: 'var(--font-mono)' }}>{item.source}</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          }
          // node
          const color = n.color ?? 'green'
          return (
            <div key={i} className="flow-row" style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`flow-node ${color}`}>{n.label}</div>
              {n.source && <Source path={n.source} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function SystemDiagrams() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 60, padding: '20px 0' }}>
      <DiagramBlock title="1. Sitemap" nodes={sitemap} />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
      <DiagramBlock title="2. System Flowchart" nodes={systemFlow} />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
      <DiagramBlock title="3. Admin Flowchart" nodes={adminFlow} />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
      <DiagramBlock title="4. Analyst Flowchart" nodes={analystFlow} />
      <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
      <DiagramBlock title="5. MOORA Calculation Flowchart" nodes={mooraFlow} />
    </div>
  )
}
