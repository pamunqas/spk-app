'use client'
import Link from 'next/link'
import Image from 'next/image'
import LandingNav from '@/components/LandingNav'

export default function DeveloperPage() {
  const team = [
    {
      name: 'Septian Wahyu Pamungkas',
      nim: '19330019',
      email: 'pamunqas@gmail.com',
      image: '/images/septian.png',
    },
    {
      name: 'Nayla Rahmawati',
      nim: '23330022',
      email: 'nylrhm18@gmail.com',
      image: '/images/nayla.jpg',
    },
    {
      name: 'Muhammad Gifari Fitryanor',
      nim: '23330043',
      email: 'mgifaaf7@gmail.com',
      image: '/images/gifari.jpg',
    },
    {
      name: 'Yumarlin MZ, S.Kom., M.Kom.',
      nim: '-',
      email: 'yumarlin@janabadra.ac.id',
      image: '/images/yumarlin.jpg',
    },
  ]

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
          {team.map((member) => (
            <div key={member.email} className="dev-card">
              <div className="dev-card-header">
                <span>{member.nim === '-' ? 'Dosen Pengampu' : 'Mahasiswa'}</span>
              </div>
              <div className="dev-card-content">
                <div className="dev-team-member">
                  <div className="dev-avatar-large">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={80}
                      height={80}
                      style={{ objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </div>
                  <div className="dev-member-info">
                    <h2>{member.name}</h2>
                    {member.nim !== '-' && <p>NIM: {member.nim}</p>}
                    <p>{member.email}</p>
                  </div>
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