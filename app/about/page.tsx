'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'
import { SUBCRITERIA } from '@/lib/subcriteria'
import EcofarmingBg from '@/components/EcofarmingBg'

const CRITERION_COLORS: Record<string, string> = {
  harga: '#F87171', kandunganNutrisi: '#10B981',
  kualitas: '#818CF8', dampak: '#A78BFA', ramahLingkungan: '#34D399', ketersediaan: '#F59E0B',
}

const CRITERION_ICONS: Record<string, string> = {
  harga: '💰',
  kandunganNutrisi: '🧪',
  kualitas: '⭐',
  dampak: '🌱',
  ramahLingkungan: '🌍',
  ketersediaan: '📦',
}

const CRITERION_DETAILS: Record<string, { description: string; bestPractice: string; common: string }> = {
  harga: {
    description: 'Biaya yang diperlukan untuk membeli pupuk organik per satuan (kg/liter). Kriteria ini bersifat cost, artinya semakin murah harga pupuk maka semakin baik nilainya.',
    bestPractice: 'Pilih pupuk dengan harga yang terjangkau namun tetap berkualitas. Bandingkan harga per kg/liter antar merek. Pertimbangkan biaya pengiriman jika membeli dari luar daerah.',
    common: 'Kisaran harga pupuk organik bervariasi tergantung jenis dan kemasan. Pupuk kandang umumnya lebih murah (Rp15.000–35.000/kg), sementara vermikompos lebih mahal (Rp40.000–75.000/kg).',
  },
  kandunganNutrisi: {
    description: 'Kandungan unsur hara makro (NPK) dan mikro yang terdapat dalam pupuk organik. Kriteria ini bersifat benefit, semakin tinggi kandungan nutrisi semakin baik.',
    bestPractice: 'Sesuaikan kebutuhan nutrisi dengan jenis tanaman yang dibudidayakan. Gunakan pupuk dengan kandungan NPK >5% untuk hasil optimal. Lakukan uji tanah terlebih dahulu untuk mengetahui kebutuhan nutrisi spesifik.',
    common: 'Pupuk kompos dan vermikompos umumnya memiliki kandungan nutrisi yang lebih lengkap. Vermikompos unggul karena mengandung hormon pertumbuhan alami dan mikroba tanah yang aktif.',
  },
  kualitas: {
    description: 'Kondisi fisik pupuk organik meliputi tekstur, warna, dan aroma. Kriteria benefit — kualitas yang baik menandakan proses pengomposan yang sempurna.',
    bestPractice: 'Gunakan pupuk dengan tekstur halus, warna coklat kehitaman, dan tidak berbau menyengat. Hindari pupuk yang masih kasar, belum matang sempurna, atau berbau busuk karena dapat merusak tanaman.',
    common: 'Kualitas pupuk organik sangat dipengaruhi oleh proses produksi. Pupuk yang matang sempurna memiliki C/N ratio 10-20. Bokashi yang difermentasi dengan EM4 umumnya memiliki kualitas yang konsisten.',
  },
  dampak: {
    description: 'Efektivitas pupuk organik dalam meningkatkan pertumbuhan dan hasil panen tanaman. Kriteria benefit — semakin besar dampak positifnya semakin baik.',
    bestPractice: 'Amati respons tanaman setelah 2-4 minggu aplikasi. Pupuk berkualitas akan menunjukkan pertumbuhan yang pesat, daun lebih hijau, dan batang lebih kokoh. Catat hasil panen untuk membandingkan efektivitas.',
    common: 'Pupuk kompos dan vermikompos memberikan dampak jangka panjang yang lebih baik dibanding pupuk kimia. Pupuk organik cair lebih cepat diserap tanaman namun efeknya tidak selama pupuk padat.',
  },
  ramahLingkungan: {
    description: 'Tingkat keamanan pupuk terhadap lingkungan sekitar. Kriteria benefit — semakin ramah lingkungan semakin baik.',
    bestPractice: 'Pilih pupuk yang tidak mengandung bahan kimia berbahaya. Pastikan pupuk telah melalui proses pengomposan yang benar agar tidak menghasilkan gas metana berlebih. Hindari pupuk yang berpotensi mencemari sumber air tanah.',
    common: 'Semua pupuk organik pada dasarnya lebih ramah lingkungan dibanding pupuk kimia. Vermikompos dan pupuk kompos memiliki jejak karbon yang rendah. Bokashi yang difermentasi dengan EM4 juga ramah lingkungan karena menggunakan mikroorganisme alami.',
  },
  ketersediaan: {
    description: 'Kemudahan mendapatkan pupuk organik di pasaran. Kriteria benefit — semakin mudah didapatkan semakin baik.',
    bestPractice: 'Pilih pupuk yang tersedia secara konsisten sepanjang musim tanam. Jalin hubungan dengan beberapa pemasok untuk mengantisipasi kelangkaan. Pertimbangkan membuat pupuk sendiri (kompos/bokashi) untuk kemandirian.',
    common: 'Pupuk kandang dan kompos biasanya paling mudah didapat di daerah pedesaan. Vermikompos masih relatif terbatas distribusinya. Bokashi mudah dibuat sendiri dengan bahan-bahan sederhana dan EM4 yang tersedia di toko pertanian.',
  },
}

export default function AboutPage() {
  return (
    <div className="landing-page">
      <EcofarmingBg />

      <LandingNav />

      <div className="doc-container">
        <div className="doc-header">
          <h1>Tentang Proyek</h1>
          <p>Sistem Pendukung Keputusan Penentuan Pupuk Organik Terbaik pada Ecofarming</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <section className="doc-section-card">
            <h2><span className="doc-icon">🎯</span> Latar Belakang</h2>
            <p>
              Ecofarming merupakan pendekatan pertanian yang mengedepankan keseimbangan ekosistem dengan memanfaatkan
              sumber daya alami secara optimal. Salah satu aspek penting dalam ecofarming adalah pemilihan pupuk organik
              yang tepat untuk meningkatkan kesuburan tanah tanpa merusak lingkungan.
            </p>
            <p>
              Namun, banyak petani dan pelaku ecofarming kesulitan dalam menentukan pupuk organik mana yang paling sesuai
              dengan kebutuhan mereka karena banyaknya alternatif pupuk dan kriteria yang harus dipertimbangkan.
            </p>
          </section>

          <section className="doc-section-card">
            <h2><span className="doc-icon">💡</span> Tujuan</h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>Membangun sistem pendukung keputusan untuk menentukan pupuk organik terbaik pada ecofarming</li>
              <li>Menerapkan sistem pendukung keputusan dalam proses pemilihan pupuk</li>
              <li>Membantu petani dan pelaku ecofarming dalam memilih pupuk organik yang sesuai</li>
              <li>Menyediakan platform yang mudah digunakan untuk analisis perbandingan pupuk organik</li>
            </ul>
          </section>

          <section className="doc-section-card">
            <h2><span className="doc-icon">📊</span> Kriteria Penilaian</h2>
            <p>
              Enam kriteria yang digunakan untuk menilai dan membandingkan pupuk organik terbaik dalam sistem ini.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 20 }}>
              {Object.entries(SUBCRITERIA).map(([key, sc]) => {
                const d = CRITERION_DETAILS[key]
                return (
                  <div key={key} className="criterion-card">
                    <div className="criterion-header">
                      <span className="criterion-icon" style={{ background: `${CRITERION_COLORS[key]}18` }}>
                        {CRITERION_ICONS[key]}
                      </span>
                      <div>
                        <div className="criterion-name">
                          {sc.label}
                          <span className={`criterion-type ${sc.type}`}>{sc.type === 'benefit' ? 'Benefit' : 'Cost'}</span>
                        </div>
                        <div className="criterion-levels">
                          {sc.levels.map(l => (
                            <span key={l.score} className="criterion-level">
                              <span className="level-dot" style={{ background: CRITERION_COLORS[key] }} />
                              {l.label} ({l.condition})
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="criterion-body">
                      <div className="criterion-section">
                        <p>{d.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="doc-section-card">
            <h2><span className="doc-icon">📚</span> Metode Pengambilan Keputusan</h2>
            <p>
              Sistem ini menggunakan metode pengambilan keputusan multikriteria yang bekerja dengan menghitung rasio
              antara nilai alternatif terhadap nilai normalisasi vektor, sehingga menghasilkan peringkat yang objektif.
            </p>
            <p>Tahapan metode:</p>
            <ol style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><strong>Normalisasi Vektor</strong> — Mengubah nilai kriteria ke dalam skala yang sebanding</li>
              <li><strong>Pembobotan</strong> — Memberikan bobot pada setiap kriteria sesuai prioritas</li>
              <li><strong>Perhitungan Yi</strong> — Menghitung nilai optimasi (yi) untuk setiap alternatif</li>
              <li><strong>Perankingan</strong> — Mengurutkan alternatif berdasarkan nilai yi tertinggi</li>
            </ol>
          </section>
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
