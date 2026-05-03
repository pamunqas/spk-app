'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'

export default function PrivacyPage() {
  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <div className="landing-grid" />

      <LandingNav />

      <div className="policy-container">
        <div className="policy-header">
          <h1>Kebijakan Privasi</h1>
          <p>Terakhir diperbarui: 2026</p>
        </div>

        <div className="policy-content">
          <section>
            <h2>1. Pendahuluan</h2>
            <p>
              Kebijakan Privasi ini menjelaskan bagaimana SPK Payment Gateway untuk Startup di Sleman Dengan Metode MOORA 
              ("kami", "app", atau "sistem kami") mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda ketika 
              menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2>2. Informasi yang Kami Kumpulkan</h2>
            <p>Kami dapat mengumpulkan informasi berikut:</p>
            <ul>
              <li><strong>Informasi Akun:</strong> Nama, email, dan kata sandi yang Anda berikan saat mendaftar</li>
              <li><strong>Data Penggunaan:</strong> Riwayat perbandingan payment gateway yang Anda lakukan</li>
              <li><strong>Informasi Teknis:</strong> Alamat IP, jenis browser, dan perangkat yang digunakan</li>
            </ul>
          </section>

          <section>
            <h2>3. Penggunaan Informasi</h2>
            <p>Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul>
              <li>Menyediakan dan meningkatkan layanan sistem</li>
              <li>Mengirimkan notifikasi terkait akun Anda</li>
              <li>Menganalisis usage pattern untuk pengembangan produk</li>
            </ul>
          </section>

          <section>
            <h2>4. Perlindungan Data</h2>
            <p>
              Kami menggunakan langkah-langkah keamanan yang sesuai untuk melindungi informasi pribadi Anda. 
              Namun, tidak ada metode transmisi data melalui internet yang 100% aman, sehingga kami tidak dapat menjamin keamanan mutlak.
            </p>
          </section>

          <section>
            <h2>5. Berbagi Informasi</h2>
            <p>
              Kami tidak menjual, memperdagangkan, atau memindahtransfer informasi pribadi Anda kepada pihak ketiga 
              tanpa sepengetahuan Anda, kecuali jika diperlukan untuk menyediakan layanan kami.
            </p>
          </section>

          <section>
            <h2>6. Hak Pengguna</h2>
            <p>Anda memiliki hak untuk:</p>
            <ul>
              <li>Mengakses data pribadi yang kami miliki tentang Anda</li>
              <li>Memperbaiki data yang tidak akurat</li>
              <li>Meminta penghapusan data Anda</li>
              <li>MWithdraw persetujuan pemrosesan data</li>
            </ul>
          </section>

          <section>
            <h2>7. Perubahan Kebijakan</h2>
            <p>
              Kami dapat memperbarui kebijakan privasi ini kapan saja. Perubahan signifikan 
              akan diberitahukan melalui email atau pemberitahuan di sistem.
            </p>
          </section>

          <section>
            <h2>8. Hubungi Kami</h2>
            <p>
              Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami 
              melalui fitur dukungan di sistem.
            </p>
          </section>
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