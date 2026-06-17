'use client'
import { useState } from 'react'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'
import EcofarmingBg from '@/components/EcofarmingBg'

const sections = [
  {
    id: 'features',
    title: 'Fitur Utama',
    icon: '⚙️',
    content: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
        <div className="feature-card">
          <div className="feature-card-icon">📊</div>
          <h4>Analisis Multikriteria</h4>
          <p>Perhitungan multi-kriteria untuk hasil yang objektif dan terukur.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">⚖️</div>
          <h4>Kriteria Terukur</h4>
          <p>Enam kriteria penilaian: Harga, Kandungan Nutrisi, Kualitas, Dampak Lingkungan, Ramah Lingkungan, dan Ketersediaan.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">📈</div>
          <h4>Visualisasi Data</h4>
          <p>Hasil analisis ditampilkan dalam bentuk grafik dan peringkat yang mudah dipahami.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">📱</div>
          <h4>Mudah Digunakan</h4>
          <p>Antarmuka yang sederhana dan intuitif, dapat digunakan oleh siapa saja tanpa pelatihan khusus.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">📋</div>
          <h4>Riwayat Analisis</h4>
          <p>Semua hasil perbandingan tersimpan dan dapat dilihat kembali kapan saja.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">🔐</div>
          <h4>Manajemen Pengguna</h4>
          <p>Sistem login dan role-based access untuk pengalaman yang aman dan personal.</p>
        </div>
      </div>
    ),
  },
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
          <li>Lihat hasil ranking</li>
          <li>Simpan hasil jika diperlukan</li>
        </ol>
        <div style={{ marginTop: 16, padding: 12, background: 'var(--primary-dim)', borderRadius: 'var(--r-sm)', fontSize: 13, color: 'var(--text-2)' }}>
          <strong>Tips:</strong> Anda dapat menyesuaikan bobot kriteria sesuai kebutuhan ecofarming Anda.
        </div>
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
      <EcofarmingBg />
      <LandingNav />

      <div className="doc-container-wide">
        <div className="doc-header">
          <h1>Dokumentasi</h1>
          <p>Panduan lengkap penggunaan Sistem Pendukung Keputusan Penentuan Pupuk Organik Terbaik pada Ecofarming.</p>
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
