'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'

const providers = [
  { name: 'Midtrans', initials: 'MT', color: '#003D7A', description: 'Industry standard for enterprise & startups. Backed by GoTo Group.', mdr: '2.0%', settlement: '1-2 hari' },
  { name: 'Xendit', initials: 'XD', color: '#0057FF', description: 'Developer-first gateway with modern APIs and rapid real-time settlement.', mdr: '1.5%', settlement: '1 hari' },
  { name: 'DOKU', initials: 'DK', color: '#00529B', description: 'Pioneer in Indonesia, complete BI licenses, deep retail integrations.', mdr: '1.75%', settlement: '2 hari' },
  { name: 'Faspay', initials: 'FP', color: '#E8461A', description: 'Strong B2B player excelling in Virtual Account aggregation.', mdr: '1.5%', settlement: '1 hari' },
  { name: 'OY! Indonesia', initials: 'OY', color: '#00AA5B', description: 'B2B gateway specializing in disbursements and flat-rate routing.', mdr: '1.5%', settlement: '1 hari' },
  { name: 'Prismalink', initials: 'PL', color: '#7B2FBE', description: 'Custom enterprise integrations, white-labeling, healthcare/education.', mdr: '1.5%', settlement: '1 hari' },
  { name: 'Espay', initials: 'EP', color: '#E67E22', description: 'Mid-market e-commerce with unique B2C2B model.', mdr: '1.75%', settlement: '1 hari' },
  { name: 'Winpay', initials: 'WP', color: '#27AE60', description: 'Social commerce and MSMEs needing instant checkout links.', mdr: '1.5%', settlement: '1 hari' },
  { name: 'Nicepay', initials: 'NP', color: '#FF6600', description: 'South Korean JV with highly stable infrastructure for enterprise.', mdr: '1.5%', settlement: '2-3 hari' },
  { name: 'iPaymu', initials: 'IP', color: '#2D9CDB', description: 'Ease-of-use focus for small merchants, escrow, instant plugins.', mdr: '1.5%', settlement: '1 hari' },
  { name: 'Durianpay', initials: 'DP', color: '#F39C12', description: 'Aggregator-of-aggregators, dynamic routing for best success rates.', mdr: '1.5%', settlement: '1 hari' },
  { name: 'HitPay', initials: 'HP', color: '#6C5CE7', description: 'SMEs with omni-channel needs, seamless POS + online, no coding.', mdr: '1.5%', settlement: '1 hari' },
]

export default function ProvidersPage() {
  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <div className="landing-grid" />
      <LandingNav />

      <div className="doc-container">
        <div className="doc-header">
          <h1>Payment Gateway</h1>
          <p>Daftar payment gateway yang tersedia di platform SPK untuk membantu pemilihan terbaik bagi startup di Sleman.</p>
        </div>

        <div className="providers-grid">
          {providers.map((p) => (
            <div key={p.name} className="provider-card">
              <div className="provider-header">
                <div className="provider-avatar" style={{ background: p.color }}>{p.initials}</div>
                <div className="provider-name">{p.name}</div>
              </div>
              <p className="provider-desc">{p.description}</p>
              <div className="provider-stats">
                <div className="provider-stat">
                  <span className="stat-label">MDR</span>
                  <span className="stat-value">{p.mdr}</span>
                </div>
                <div className="provider-stat">
                  <span className="stat-label">Settlement</span>
                  <span className="stat-value">{p.settlement}</span>
                </div>
              </div>
            </div>
          ))}
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