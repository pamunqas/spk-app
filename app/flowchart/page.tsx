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
                <div className="box-item">Landing Page</div>
                <div className="box-item">Providers</div>
                <div className="box-item">Dokumentasi</div>
                <div className="box-item">Tentang Kami</div>
                <div className="box-item">Login</div>
                <div className="box-item">Register</div>
              </div>
            </div>
            <div className="flow-arrow-right">→</div>
            <div className="flow-box-auth">
              <span className="box-title">AUTH</span>
              <div className="box-content">
                <div className="box-item">Login Page</div>
                <div className="box-item">Register Page</div>
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
                  <div className="box-item">Dasbor</div>
                  <div className="box-item">Analitik</div>
                  <div className="box-item">Providers</div>
                  <div className="box-item">Kriteria & Bobot</div>
                  <div className="box-item">Users</div>
                </div>
              </div>
            </div>
            <div className="flow-branch">
              <span className="branch-label analyst">ANALIS</span>
              <div className="flow-line-branch"></div>
              <div className="flow-analis">
                <span className="box-title">ANALIS DASHBOARD</span>
                <div className="box-content small">
                  <div className="box-item">Bandingkan</div>
                  <div className="box-item">Riwayat</div>
                  <div className="box-item">MOORA</div>
                  <div className="box-item">Profil</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flow-line-down"></div>
          <div className="flow-process">
            <span className="box-title">MOORA PROCESS</span>
            <div className="box-content">
              <div className="box-item">1. Select Providers</div>
              <div className="box-item">2. Select Criteria</div>
              <div className="box-item">3. Set Weights</div>
              <div className="box-item">4. Normalization</div>
              <div className="box-item">5. Ranking</div>
            </div>
          </div>
          
          <div className="flow-line-down"></div>
          <div className="flow-result">
            <span className="box-title">RESULT</span>
            <div className="box-content">
              <div className="box-item">Best Gateway</div>
              <div className="box-item">Score Ranking</div>
              <div className="box-item">Save History</div>
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