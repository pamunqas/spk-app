'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'

export default function DocumentationPage() {
  const sections = [
    {
      id: 'register',
      title: 'Cara Daftar',
      icon: '📝',
      content: (
        <div className="doc-content">
          <ol>
            <li>Buka halaman <Link href="/register" className="doc-link">Daftar</Link></li>
            <li>Isi formulir pendaftaran:</li>
            <ul>
              <li>Nama Lengkap</li>
              <li>Email</li>
              <li>Kata Sandi</li>
              <li>Konfirmasi Kata Sandi</li>
            </ul>
            <li>Klik tombol "Daftar Sekarang"</li>
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
        <div className="doc-content">
          <ol>
            <li>Buka halaman <Link href="/login" className="doc-link">Login</Link></li>
            <li>Masukkan email dan kata sandi</li>
            <li>Klik tombol "Masuk"</li>
            <li>Anda akan dialihkan ke dashboard</li>
          </ol>
          <div className="doc-note">
            <strong>Catatan:</strong> Akun demo tersedia untuk mencoba sistem.
            <br />Email: user@spkgateway.com | Kata sandi: password
          </div>
        </div>
      ),
    },
    {
      id: 'compare',
      title: 'Membandingkan Payment Gateway',
      icon: '⚖️',
      content: (
        <div className="doc-content">
          <ol>
            <li>Login sebagai Analis</li>
            <li>Pilih menu "Bandingkan Gateway"</li>
            <li>Pilih kriteria yang ingin dibandingkan</li>
            <li>Klik "Bandingkan"</li>
            <li>Lihat hasil ranking dari metode MOORA</li>
            <li>Simpan hasil jika diperlukan</li>
          </ol>
          <div className="doc-note">
            <strong>Tips:</strong> Anda dapat menyesuaikan bobot kriteria sesuai kebutuhan bisnis startup Anda.
          </div>
        </div>
      ),
    },
    {
      id: 'algorithm',
      title: 'Tentang Metode MOORA',
      icon: '📊',
      content: (
        <div className="doc-content">
          <p>MOORA (Multi-Objective Optimization on the basis of Ratio Analysis) adalah metode pengambilan keputusan multikriteria yang dikembangkan oleh Brauers dan Zavadskas.</p>
          <ol>
            <li><strong>Normalisasi:</strong> Mengubah semua nilai kriteria ke skala comparable</li>
            <li><strong>Pembobotan:</strong> Memberikan bobot pada setiap kriteria berdasarkan prioritas</li>
            <li><strong>Perhitungan:</strong> Menghitung nilai optimasi untuk setiap alternatif</li>
            <li><strong>Ranking:</strong> Mengurutkan alternatif berdasarkan nilai optimasi</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'system',
      title: 'Tentang Sistem',
      icon: '🏢',
      content: (
        <div className="doc-content">
          <p>Sistem Pendukung Keputusan (SPK) Pemilihan Payment Gateway untuk Startup di Sleman adalah aplikasi berbasis web yang membantu startup di wilayah Sleman dalam memilih payment gateway yang paling sesuai dengan kebutuhan bisnis mereka.</p>
          <p>Sistem ini menggunakan metode MOORA untuk memberikan rekomendasi payment gateway berdasarkan kriteria yang ditentukan pengguna.</p>
          <ul>
            <li><strong>Tujuan:</strong> Membantu startup di Sleman memilih payment gateway yang tepat</li>
            <li><strong>Metode:</strong> MOORA (Multi-Objective Optimization on the basis of Ratio Analysis)</li>
            <li><strong>Target User:</strong> Startup dan UKM di wilayah Sleman</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'delete-account',
      title: 'Cara Hapus Akun',
      icon: '🗑️',
      content: (
        <div className="doc-content">
          <ol>
            <li>Login ke akun Anda</li>
            <li>Pergi ke menu "Profil"</li>
            <li>Gulir ke bagian bawah halaman</li>
            <li>Klik tombol "Hapus Akun"</li>
            <li>Konfirmasi penghapusan dengan mengetik username</li>
            <li>Akun akan dihapus secara permanen</li>
          </ol>
          <div className="doc-warning">
            <strong>Peringatan:</strong> Penghapusan akun bersifat permanen. Semua data dan riwayat analisis akan hilang secara permanen.
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <div className="landing-grid" />

      <LandingNav />

      <div className="doc-container">
        <div className="doc-header">
          <h1>Dokumentasi</h1>
          <p>Panduan lengkap penggunaan Sistem Pendukung Keputusan Pemilihan Payment Gateway untuk Startup di Sleman.</p>
        </div>

        <div className="doc-grid">
          {sections.map((section) => (
            <div key={section.id} className="doc-card">
              <div className="doc-card-header">
                <span className="doc-section-icon">{section.icon}</span>
                <span className="doc-card-title">{section.title}</span>
              </div>
              <div className="doc-card-content">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>

<div className="landing-footer">
        <p>&copy; 2026 SPK Payment Gateway untuk Startup di Sleman Dengan Metode MOORA</p>
        <div className="landing-footer-links">
          <Link href="/providers">Providers</Link>
          <Link href="/documentation">Dokumentasi</Link>
          <Link href="/developer">Tentang Kami</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </div>
  )
}