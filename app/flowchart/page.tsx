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
          <h1>Flowchart Sistem</h1>
          <p>Alur penggunaan sistem SPK Payment Gateway dari awal hingga akhir berdasarkan tipe pengguna.</p>
        </div>

        <div className="flowchart">
          <div className="flow-section">
            <h2>1. Halaman Umum (Public)</h2>
            <div className="flow-box blue">Landing Page</div>
            <div className="flow-arrows">↓</div>
            <div className="flow-links">
              <Link href="/providers" className="flow-link">Providers</Link>
              <Link href="/documentation" className="flow-link">Dokumentasi</Link>
              <Link href="/developer" className="flow-link">Tentang Kami</Link>
              <Link href="/login" className="flow-link">Login</Link>
              <Link href="/register" className="flow-link">Register</Link>
            </div>
          </div>

          <div className="flow-section">
            <h2>2. Authentication</h2>
            <div className="flow-box">Login / Register</div>
            <div className="flow-arrows">↓</div>
            <div className="flow-choices">
              <span className="flow-choice admin">Admin</span>
              <span className="flow-choice analyst">Analis</span>
            </div>
          </div>

          <div className="flow-section">
            <h2>3. Dashboard Admin</h2>
            <div className="flow-box admin">Admin Dashboard</div>
            <div className="flow-arrows">↓</div>
            <div className="flow-grid">
              <Link href="/admin/dashboard" className="flow-menu">Dasbor</Link>
              <Link href="/admin/analytics" className="flow-menu">Analitik</Link>
              <Link href="/admin/providers" className="flow-menu">Providers</Link>
              <Link href="/admin/weights" className="flow-menu">Kriteria & Bobot</Link>
              <Link href="/admin/users" className="flow-menu">Users</Link>
            </div>
            <div className="flow-logout">Logout → Login</div>
          </div>

          <div className="flow-section">
            <h2>4. Dashboard Analis</h2>
            <div className="flow-box analyst">Analis Dashboard</div>
            <div className="flow-arrows">↓</div>
            <div className="flow-grid">
              <Link href="/analyst/compare" className="flow-menu">Bandingkan</Link>
              <Link href="/analyst/history" className="flow-menu">Riwayat</Link>
              <Link href="/analyst/algorithm" className="flow-menu">MOORA</Link>
              <Link href="/analyst/profile" className="flow-menu">Profil</Link>
            </div>
            <div className="flow-logout">Logout → Login</div>
          </div>

          <div className="flow-section">
            <h2>Alur Penggunaan</h2>
            <div className="flow-steps">
              <div className="flow-step">
                <span className="step-num">1</span>
                <span>User login ke sistem</span>
              </div>
              <div className="flow-step">
                <span className="step-num">2</span>
                <span>Admin: kelola providers & kriteria</span>
              </div>
              <div className="flow-step">
                <span className="step-num">3</span>
                <span>Analis: pilih providers + kriteria</span>
              </div>
              <div className="flow-step">
                <span className="step-num">4</span>
                <span>Sistem hitung dengan MOORA</span>
              </div>
              <div className="flow-step">
                <span className="step-num">5</span>
                <span>Tampilkan ranking hasil</span>
              </div>
            </div>
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