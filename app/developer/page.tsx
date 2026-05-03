'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'

export default function DeveloperPage() {
  const team = [
    {
      name: 'Septian Wahyu Pamungkas',
      nim: '19330019',
      email: 'pamunqas@gmail.com',
    },
    {
      name: 'Nayla Rahmawati',
      nim: '23330022',
      email: 'nylrhm18@gmail.com',
    },
    {
      name: 'Muhammad Gifari Fitryanor',
      nim: '23330043',
      email: 'mgifaaf7@gmail.com',
    },
  ]

  const dosen = {
    name: 'Yumarlin MZ, S.Kom., M.Kom.',
    email: 'yumarlin@janabadra.ac.id',
  }

  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <div className="landing-grid" />

      <LandingNav />

      <div className="dev-container">
        <div className="doc-header">
          <h1>Tentang Kami</h1>
          <p>Tim pengembang Sistem Pendukung Keputusan Pemilihan Payment Gateway untuk Startup di Sleman.</p>
        </div>

        <div className="dev-grid">
          <div className="dev-card">
            <div className="dev-card-header">
              <span>Dosen Pengampu</span>
            </div>
            <div className="dev-card-content">
              <div className="dev-dosen">
                <div className="dev-avatar-large">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <h2>{dosen.name}</h2>
                <p>{dosen.email}</p>
              </div>
            </div>
          </div>

          <div className="dev-card">
            <div className="dev-card-header">
              <span>Kelompok 8</span>
            </div>
            <div className="dev-card-content">
              <div className="dev-team">
                {team.map((member) => (
                  <div key={member.nim} className="dev-team-member">
                    <div className="dev-avatar">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div className="dev-member-info">
                      <div style={{ fontWeight: 600, fontSize: '1rem' }}>{member.name}</div>
                      <div style={{ color: 'var(--text-3)', fontSize: 13 }}>NIM: {member.nim}</div>
                      <div style={{ color: 'var(--primary-light)', fontSize: 12, marginTop: 2 }}>{member.email}</div>
                    </div>
                  </div>
                ))}
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