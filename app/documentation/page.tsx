'use client'
import { useState } from 'react'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'

const sections = [
  {
    id: 'register',
    title: 'Cara Daftar',
    icon: '📝',
    content: (
      <div>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>Buka halaman <Link href="/register" className="doc-link">Daftar</Link></li>
          <li>Isi formulir pendaftaran:</li>
          <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4, margin: '8px 0 8px 16px' }}>
            <li>Nama Lengkap</li>
            <li>Email</li>
            <li>Kata Sandi</li>
            <li>Konfirmasi Kata Sandi</li>
          </ul>
          <li>Klik tombol &ldquo;Daftar Sekarang&rdquo;</li>
          <li>Setelah berhasil, silakan login dengan akun baru</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'login',
    title: 'Cara Login',
    icon: '🔑',
    content: (
      <div>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>Buka halaman <Link href="/login" className="doc-link">Login</Link></li>
          <li>Masukkan email dan kata sandi</li>
          <li>Klik tombol &ldquo;Masuk&rdquo;</li>
          <li>Anda akan dialihkan ke dashboard</li>
        </ol>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--primary-dim)', borderRadius: 'var(--r-sm)', fontSize: 13, color: 'var(--text-2)' }}>
          <strong>Catatan:</strong> Akun demo tersedia untuk mencoba sistem.
          <br />Email: user@spkecofarming.com | Kata sandi: password
        </div>
      </div>
    ),
  },
  {
    id: 'system',
    title: 'Tentang Sistem',
    icon: '🏢',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p>Sistem Pendukung Keputusan (SPK) Penentuan Pupuk Organik Terbaik pada Ecofarming adalah aplikasi berbasis web yang membantu dalam menentukan pupuk organik yang paling sesuai dengan kebutuhan ecofarming.</p>
        <p>Sistem ini menggunakan metode MOORA untuk memberikan rekomendasi pupuk organik berdasarkan kriteria yang ditentukan pengguna.</p>
        <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li><strong>Tujuan:</strong> Membantu menentukan pupuk organik terbaik untuk ecofarming</li>
          <li><strong>Metode:</strong> MOORA (Multi-Objective Optimization on the basis of Ratio Analysis)</li>
          <li><strong>Target User:</strong> Petani dan pelaku ecofarming</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'compare',
    title: 'Membandingkan Pupuk Organik',
    icon: '⚖️',
    content: (
      <div>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>Login sebagai Analis</li>
          <li>Pilih menu &ldquo;Bandingkan Pupuk&rdquo;</li>
          <li>Pilih kriteria yang ingin dibandingkan</li>
          <li>Klik &ldquo;Bandingkan&rdquo;</li>
          <li>Lihat hasil ranking dari metode MOORA</li>
          <li>Simpan hasil jika diperlukan</li>
        </ol>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--primary-dim)', borderRadius: 'var(--r-sm)', fontSize: 13, color: 'var(--text-2)' }}>
          <strong>Tips:</strong> Anda dapat menyesuaikan bobot kriteria sesuai kebutuhan ecofarming Anda.
        </div>
      </div>
    ),
  },
  {
    id: 'algorithm',
    title: 'Tentang Metode MOORA',
    icon: '📊',
    content: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <p>MOORA (Multi-Objective Optimization on the basis of Ratio Analysis) adalah metode pengambilan keputusan multikriteria yang dikembangkan oleh Brauers dan Zavadskas.</p>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li><strong>Normalisasi:</strong> Mengubah semua nilai kriteria ke skala comparable</li>
          <li><strong>Pembobotan:</strong> Memberikan bobot pada setiap kriteria berdasarkan prioritas</li>
          <li><strong>Perhitungan:</strong> Menghitung nilai optimasi untuk setiap alternatif</li>
          <li><strong>Ranking:</strong> Mengurutkan alternatif berdasarkan nilai optimasi</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'delete-account',
    title: 'Cara Hapus Akun',
    icon: '🗑️',
    content: (
      <div>
        <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <li>Login ke akun Anda</li>
          <li>Pergi ke menu &ldquo;Profil&rdquo;</li>
          <li>Gulir ke bagian bawah halaman</li>
          <li>Klik tombol &ldquo;Hapus Akun&rdquo;</li>
          <li>Konfirmasi penghapusan dengan mengetik username</li>
          <li>Akun akan dihapus secara permanen</li>
        </ol>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--red-dim)', borderRadius: 'var(--r-sm)', fontSize: 13, color: 'var(--red)' }}>
          <strong>Peringatan:</strong> Penghapusan akun bersifat permanen. Semua data dan riwayat analisis akan hilang secara permanen.
        </div>
      </div>
    ),
  },
]

export default function DocumentationPage() {
  const [idx, setIdx] = useState(0)
  const s = sections[idx]
  const isFirst = idx === 0
  const isLast = idx === sections.length - 1

  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <div className="landing-grid" />
      <LandingNav />

      <div className="doc-container-wide">
        <div className="doc-header">
          <h1>Dokumentasi</h1>
          <p>Panduan lengkap penggunaan Sistem Pendukung Keputusan Penentuan Pupuk Organik Terbaik pada Ecofarming Menggunakan Metode MOORA.</p>
        </div>

        <div className="doc-layout">
          <aside className="doc-sidebar">
            <div className="doc-sidebar-title">Daftar Isi</div>
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIdx(i)}
                className={`doc-sidebar-link ${i === idx ? 'active' : ''}`}
              >
                {s.icon} {s.title}
              </button>
            ))}
          </aside>

          <div className="doc-content-area">
            <section key={s.id} className="doc-section-card">
              <h2><span className="doc-icon">{s.icon}</span>{s.title}</h2>
              {s.content}
            </section>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              marginTop: 20,
            }}>
              <button
                onClick={() => setIdx(i => i - 1)}
                disabled={isFirst}
                style={{
                  padding: '10px 20px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-2)',
                  background: isFirst ? 'var(--bg-3)' : 'var(--surface)',
                  color: isFirst ? 'var(--text-3)' : 'var(--text)',
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, cursor: isFirst ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                Sebelumnya
              </button>

              <div style={{ fontSize: 13, color: 'var(--text-3)' }}>
                {idx + 1} / {sections.length}
              </div>

              <button
                onClick={() => setIdx(i => i + 1)}
                disabled={isLast}
                style={{
                  padding: '10px 20px', borderRadius: 'var(--r-sm)', border: '1px solid var(--border-2)',
                  background: isLast ? 'var(--bg-3)' : 'var(--surface)',
                  color: isLast ? 'var(--text-3)' : 'var(--text)',
                  fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, cursor: isLast ? 'default' : 'pointer',
                  display: 'flex', alignItems: 'center', gap: 6,
                }}
              >
                Selanjutnya
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>

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
