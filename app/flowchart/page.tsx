'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'

export default function FlowchartPage() {
  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <div className="landing-grid" />
      <LandingNav />

      <div className="doc-container">
        <div className="doc-header">
          <h1>System Flowchart</h1>
          <p>Alur sistem SPK Payment Gateway</p>
        </div>

        {/* USER FLOW */}
        <section className="flow-section">
          <h2>User Flow</h2>
          
          <div className="system-flow">
            <div className="flow-row"><div className="flow-node start">START</div></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row branch-row">
              <div className="flow-node-col">
                <div className="flow-node green">VISITOR</div>
                <div className="flow-node-box">
                  <span>Landing Page → /</span>
                  <span>Providers → /providers</span>
                  <span>Dokumentasi → /documentation</span>
                  <span>Login → /login</span>
                  <span>Register → /register</span>
                </div>
              </div>
              <div className="flow-node-col">
                <div className="flow-node blue">REGISTERED</div>
                <div className="flow-node-box auth">
                  <span>Login → /login</span>
                  <span>Logout</span>
                </div>
              </div>
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row"><div className="flow-node diamond">Check Role</div></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row branch-row">
              <div className="flow-node-col">
                <span className="branch-badge admin">ADMIN</span>
                <div className="flow-node-box">
                  <span>Dasbor → /admin/dashboard</span>
                  <span>Analitik → /admin/analytics</span>
                  <span>Providers → /admin/providers</span>
                  <span>Kriteria & Bobot → /admin/weights</span>
                  <span>Users → /admin/users</span>
                </div>
              </div>
              <div className="flow-node-col">
                <span className="branch-badge analyst">ANALIS</span>
                <div className="flow-node-box">
                  <span>Bandingkan → /analyst/compare</span>
                  <span>Riwayat → /analyst/history</span>
                  <span>Profil → /analyst/profile</span>
                </div>
              </div>
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row branch-row">
              <div className="flow-node-col" style={{flex:1}}>
                <div className="flow-node purple">MOORA COMPARISON</div>
                <div className="flow-node-box process">
                  <span>1. Select Providers (dari DB)</span>
                  <span>2. Fill Fuzzy Value per Criteria</span>
                  <span>3. Hitung Normalization</span>
                  <span>4. Apply Weights (dari Admin)</span>
                  <span>5. Calculate Ranking</span>
                  <span>6. View Result</span>
                </div>
              </div>
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row"><div className="flow-node gold">Save to History</div></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row"><div className="flow-node end">END</div></div>
          </div>
        </section>

        {/* TECHNICAL FLOW */}
        <section className="flow-section">
          <h2>Technical Flow</h2>
          
          <div className="system-flow">
            <div className="flow-row"><div className="flow-node start">CLIENT</div></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row branch-row">
              <div className="flow-node-col">
                <div className="flow-node green">FRONTEND</div>
                <div className="flow-node-box">
                  <span>Next.js 16 (React 19)</span>
                  <span>App Router</span>
                  <span>NextAuth v5</span>
                  <span>TypeScript</span>
                </div>
              </div>
              <div className="flow-node-col">
                <div className="flow-node blue">HTTP REQUESTS</div>
                <div className="flow-node-box auth">
                  <span>GET /api/providers</span>
                  <span>GET/PUT /api/weights</span>
                  <span>POST /api/comparisons</span>
                  <span>POST /api/auth</span>
                  <span>POST /api/register</span>
                </div>
              </div>
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row"><div className="flow-node diamond">API ROUTES</div></div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row branch-row">
              <div className="flow-node-col">
                <div className="flow-node purple">MOORA ALGORITHM</div>
                <div className="flow-node-box process">
                  <span>lib/moora.ts</span>
                  <span>Normalization</span>
                  <span>Weight Application</span>
                  <span>Ranking Calculation</span>
                </div>
              </div>
              <div className="flow-node-col">
                <div className="flow-node gold">DATABASE</div>
                <div className="flow-node-box result">
                  <span>PostgreSQL</span>
                  <span>Prisma ORM</span>
                  <span>Providers Table</span>
                  <span>Criteria Table</span>
                  <span>Comparisons Table</span>
                  <span>Users Table</span>
                </div>
              </div>
            </div>
            <div className="flow-arrow">↓</div>
            <div className="flow-row"><div className="flow-node end">RESPONSE</div></div>
          </div>

          <div className="tech-stack">
            <h3>Tech Stack</h3>
            <div className="stack-grid">
              <div className="stack-item">
                <span className="stack-title">Frontend</span>
                <span>Next.js 16, React 19, TypeScript</span>
              </div>
              <div className="stack-item">
                <span className="stack-title">Backend</span>
                <span>Next.js API Routes</span>
              </div>
              <div className="stack-item">
                <span className="stack-title">Database</span>
                <span>PostgreSQL (Neon)</span>
              </div>
              <div className="stack-item">
                <span className="stack-title">ORM</span>
                <span>Prisma 7</span>
              </div>
              <div className="stack-item">
                <span className="stack-title">Auth</span>
                <span>NextAuth v5 (beta)</span>
              </div>
              <div className="stack-item">
                <span className="stack-title">Algorithm</span>
                <span>MOORA Method</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="landing-footer">
        <p>&copy; 2026 Kelompok 8 SPK UJB</p>
        <div className="landing-footer-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  )
}