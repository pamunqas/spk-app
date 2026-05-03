'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'
import PaymentIllustration from '@/components/PaymentIllustration'

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <PaymentIllustration />
      <div className="landing-grid" />

      <LandingNav />

      <div className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">Sistem Pendukung Keputusan</div>
          <h1>Pemilihan Payment Gateway<br/>untuk Startup di Sleman Dengan Metode MOORA</h1>
          <p>
            Membantu Anda memilih payment gateway yang paling tepat untuk startup di wilayah Sleman 
            menggunakan metode MOORA (Multi-Objective Optimization on the basis of Ratio Analysis).
          </p>
          <div className="landing-hero-btns">
            <Link href="/login" className="btn-primary-landing">
              Mulai Sekarang →
            </Link>
            <Link href="/documentation" className="btn-ghost-landing">
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        <div className="landing-hero-visual">
          <svg className="hero-illustration" viewBox="0 0 300 200" fill="none">
            <rect x="40" y="60" width="220" height="120" rx="12" fill="var(--surface)" stroke="var(--border-2)"/>
            <rect x="40" y="60" width="220" height="120" rx="12" stroke="var(--border)" strokeDasharray="4 4"/>
            <circle cx="70" cy="90" r="12" fill="var(--primary)" opacity="0.8"/>
            <circle cx="95" cy="90" r="12" fill="var(--accent)" opacity="0.6"/>
            <rect x="60" y="120" width="180" height="8" rx="4" fill="var(--border-2)"/>
            <rect x="60" y="135" width="100" height="8" rx="4" fill="var(--border)" opacity="0.5"/>
            <circle cx="250" cy="80" r="24" fill="var(--green)" opacity="0.2"/>
            <path d="M242 80l4 4 8-8" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="landing-features">
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <h3>Perbandingan Objektif</h3>
          <p>Bandingkan berbagai payment gateway berdasarkan kriteria bisnis Anda secara objektif.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20V10"/>
              <path d="M18 20V4"/>
              <path d="M6 20v-4"/>
            </svg>
          </div>
          <h3>Kriteria Customizable</h3>
          <p>Tentukan bobot kriteria sesuai kebutuhan dan prioritas startup Anda.</p>
        </div>
        <div className="feature">
          <div className="feature-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3>Hasil Cepat</h3>
          <p>Dapatkan rekomendasi payment gateway terbaik dalam hitungan detik.</p>
        </div>
      </div>

      <div className="landing-footer">
        <p>&copy; 2026 Kelompok 8 SPK UJB</p>
        <div className="landing-footer-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>
    </div>
  )
}