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
          <div className="flow-start">
            <span>START</span>
          </div>
          <div className="flow-line-down"></div>
          
          <div className="flow-box-group">
            <div className="flow-box-public">
              <span className="box-title">PUBLIC</span>
              <div className="box-content">
                <div className="box-item">Landing Page → /</div>
                <div className="box-item">Providers → /providers</div>
                <div className="box-item">Dokumentasi → /documentation</div>
                <div className="box-item">Tentang Kami → /developer</div>
                <div className="box-item">Login → /login</div>
                <div className="box-item">Register → /register</div>
              </div>
            </div>
            <div className="flow-arrow-right">→</div>
            <div className="flow-box-auth">
              <span className="box-title">AUTH</span>
              <div className="box-content">
                <div className="box-item">Login Page → POST /api/auth</div>
                <div className="box-item">Register Page → POST /api/register</div>
              </div>
            </div>
          </div>
          
          <div className="flow-line-down"></div>
          <div className="flow-decision">
            <span>Check Role</span>
          </div>
          <div className="flow-split">
            <div className="flow-branch">
              <span className="branch-label admin">ADMIN</span>
              <div className="flow-line-branch"></div>
              <div className="flow-admin">
                <span className="box-title">ADMIN DASHBOARD</span>
                <div className="box-content small">
                  <div className="box-item">Dasbor → /admin/dashboard</div>
                  <div className="box-item">Analitik → /admin/analytics</div>
                  <div className="box-item">Providers → /admin/providers</div>
                  <div className="box-item">Kriteria & Bobot → /admin/weights</div>
                  <div className="box-item">Users → /admin/users</div>
                </div>
              </div>
            </div>
            <div className="flow-branch">
              <span className="branch-label analyst">ANALIS</span>
              <div className="flow-line-branch"></div>
              <div className="flow-analis">
                <span className="box-title">ANALIS DASHBOARD</span>
                <div className="box-content small">
                  <div className="box-item">Bandingkan → /analyst/compare</div>
                  <div className="box-item">Riwayat → /analyst/history</div>
                  <div className="box-item">MOORA → /analyst/algorithm</div>
                  <div className="box-item">Profil → /analyst/profile</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flow-line-down"></div>
          <div className="flow-process">
            <span className="box-title">MOORA PROCESS</span>
            <div className="box-content">
              <div className="box-item">1. Select Providers → GET /api/providers</div>
              <div className="box-item">2. Select Criteria → GET /api/weights</div>
              <div className="box-item">3. Set Weights → PUT /api/weights</div>
              <div className="box-item">4. Normalization → lib/moora.ts</div>
              <div className="box-item">5. Ranking → POST /api/comparisons</div>
            </div>
          </div>
          
          <div className="flow-line-down"></div>
          <div className="flow-result">
            <span className="box-title">RESULT</span>
            <div className="box-content">
              <div className="box-item">Best Gateway → Response</div>
              <div className="box-item">Score Ranking → JSON</div>
              <div className="box-item">Save History → POST /api/comparisons</div>
            </div>
          </div>
          
          <div className="flow-line-down"></div>
          <div className="flow-end">
            <span>END</span>
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