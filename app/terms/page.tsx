'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'

export default function TermsPage() {
  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <div className="landing-grid" />

      <LandingNav />

      <div className="policy-container">
        <div className="policy-header">
          <h1>Ketentuan Layanan</h1>
          <p>Terakhir diperbarui: 2026</p>
        </div>

        <div className="policy-content">
          <section>
            <h2>1. Penerimaan Ketentuan</h2>
            <p>
              Dengan mengakses dan menggunakan SPK Payment Gateway untuk Startup di Sleman Dengan Metode MOORA, 
              Anda setuju untuk terikat oleh Ketentuan Layanan ini. Jika Anda tidak setuju dengan salah satu 
              bagian dari ketentuan ini, maka Anda tidak diperkenankan menggunakan layanan kami.
            </p>
          </section>

          <section>
            <h2>2. Eligibility</h2>
            <p>
              Anda harus berusia minimal 17 tahun atau memiliki izin dari wali/parents sah untuk menggunakan layanan ini. 
              Layanan ini disediakan untuk membantu startup dan UKM di wilayah Sleman dalam pemilihan payment gateway.
            </p>
          </section>

          <section>
            <h2>3. Akun Pengguna</h2>
            <p>Ketika membuat akun, Anda setuju untuk:</p>
            <ul>
              <li>Menyediakan informasi yang akurat dan lengkap</li>
              <li>Menjaga kerahasiaan kata sandi Anda</li>
              <li>Menanggung seluruh aktivitas yang terjadi di bawah akun Anda</li>
              <li>Menghubungi kami segera jika ada penggunaan tidak sah</li>
            </ul>
          </section>

          <section>
            <h2>4. Penggunaan yang Dilarang</h2>
            <p>Anda tidak diperkenankan untuk:</p>
            <ul>
              <li>Menggunakan layanan untuk tujuan ilegal</li>
              <li>Mencoba melemahkan sistem keamanan</li>
              <li>Mengumpulkan data pengguna lain tanpa izin</li>
              <li>Menggunakan layanan untuk aktivitas yang merugikan</li>
              <li>Memalsukan informasi atau mengklaim sebagai orang lain</li>
            </ul>
          </section>

          <section>
            <h2>5. Layanan dan Konten</h2>
            <p>
              Layanan ini menyediakan sistem pendukung keputusan berbasis metode MOORA untuk pemilihan payment gateway. 
              Kami tidak memberikan jaminan bahwa hasil rekomendasi akan selalu sesuai ekspektasi Anda. 
              Keputusan bisnis akhir tetap menjadi tanggung jawab Anda.
            </p>
          </section>

          <section>
            <h2>6.Batasan Tanggung Jawab</h2>
            <p>
              Layanan ini disediakan "sebagaimana adanya". Kami tidak bertanggung jawab atas 
              kerugian langsung, tidak langsung, insidental, atau konsekuensi yang timbul dari penggunaan layanan ini.
            </p>
          </section>

          <section>
            <h2>7. Penghentian Layanan</h2>
            <p>
              Kami dapat menghentikan atau menunda akses Anda kapan saja jika Anda melanggar 
              Ketentuan Layanan ini, tanpa pemberitahuan sebelumnya.
            </p>
          </section>

          <section>
            <h2>8. Perubahan Ketentuan</h2>
            <p>
              Kami berhak untuk mengubah ketentuan ini kapan saja. Perubahan signifikan 
              akan diberitahukan melalui sistem atau email.
            </p>
          </section>

          <section>
            <h2>9. Hukum yang Berlaku</h2>
            <p>
              Ketentuan ini diatur oleh hukum Indonesia. Setiap sengketa yang timbul 
              akan diselesaikan di pengadilan yang berwenang di Indonesia.
            </p>
          </section>
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