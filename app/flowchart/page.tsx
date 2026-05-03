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
          <p>Alur sistem SPK Payment Gateway dari awal hingga akhir</p>
        </div>

        <div className="system-flow">
          <div className="flow-row">
            <div className="flow-node start">START</div>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-row">
            <div className="flow-node green">PUBLIC AREA</div>
          </div>
          <div className="flow-indent">
            <div className="flow-node-box">
              <span>Landing Page → /</span>
              <span>Providers → /providers</span>
              <span>Dokumentasi → /documentation</span>
              <span>Tentang Kami → /developer</span>
              <span>Login → /login</span>
              <span>Register → /register</span>
            </div>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-row">
            <div className="flow-node blue">AUTH AREA</div>
          </div>
          <div className="flow-indent">
            <div className="flow-node-box auth">
              <span>Login Page → POST /api/auth</span>
              <span>Register Page → POST /api/register</span>
            </div>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-row">
            <div className="flow-node diamond">Check Role</div>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-row branch-row">
            <div className="flow-branch-box">
              <span className="branch-badge admin">ADMIN</span>
              <div className="flow-node-box">
                <span>Dasbor → /admin/dashboard</span>
                <span>Analitik → /admin/analytics</span>
                <span>Providers → /admin/providers</span>
                <span>Kriteria & Bobot → /admin/weights</span>
                <span>Users → /admin/users</span>
              </div>
            </div>
            <div className="flow-branch-box">
              <span className="branch-badge analyst">ANALIS</span>
              <div className="flow-node-box">
                <span>Bandingkan → /analyst/compare</span>
                <span>Riwayat → /analyst/history</span>
                <span>MOORA → /analyst/algorithm</span>
                <span>Profil → /analyst/profile</span>
              </div>
            </div>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-row">
            <div className="flow-node purple">MOORA PROCESS</div>
          </div>
          <div className="flow-indent">
            <div className="flow-node-box process">
              <span>1. Select Providers → GET /api/providers</span>
              <span>2. Select Criteria → GET /api/weights</span>
              <span>3. Set Weights → PUT /api/weights</span>
              <span>4. Normalization → lib/moora.ts</span>
              <span>5. Ranking → POST /api/comparisons</span>
            </div>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-row">
            <div className="flow-node gold">RESULT</div>
          </div>
          <div className="flow-indent">
            <div className="flow-node-box result">
              <span>Best Gateway → Response JSON</span>
              <span>Score Ranking List</span>
              <span>Save to History</span>
            </div>
          </div>

          <div className="flow-arrow">↓</div>

          <div className="flow-row">
            <div className="flow-node end">END</div>
          </div>
        </div>
      </div>

      <div className="landing-footer">
        <p>&copy; 2026 SPK Payment Gateway untuk Startup di Sleman Dengan Metode MOORA</p>
        <div className="landing-footer-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  )
}