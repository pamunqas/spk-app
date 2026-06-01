'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'
import { PROVIDER_ICONS } from '@/lib/icons'
import EcofarmingBg from '@/components/EcofarmingBg'

const providers = [
  {
    name: 'Pupuk Kompos',
    initials: 'PK',
    color: '#4A7C3F',
    description: 'Pupuk organik dari sisa tanaman dan limbah organik yang telah melalui dekomposisi.',
    detail: 'Pupuk kompos dibuat melalui proses pengomposan bahan organik seperti sisa tanaman, dedaunan, jerami, dan limbah dapur. Proses dekomposisi dilakukan oleh mikroorganisme yang mengurai bahan organik menjadi humus yang kaya unsur hara. Pupuk kompos memperbaiki struktur tanah, meningkatkan kemampuan tanah menahan air, dan menyediakan nutrisi yang dilepaskan secara perlahan.',
    bahan: 'Sisa tanaman, dedaunan, jerami, limbah dapur, kotoran ternak',
    proses: 'Pengomposan aerobik selama 3-6 minggu dengan pengaturan suhu dan kelembaban',
    kelebihan: 'Memperbaiki struktur tanah, menyediakan nutrisi lengkap, ramah lingkungan, mudah dibuat sendiri',
    cocok: 'Semua jenis tanaman, terutama tanaman semusim dan tanaman pangan',
  },
  {
    name: 'Pupuk Kandang',
    initials: 'PN',
    color: '#8B5E3C',
    description: 'Pupuk organik dari kotoran hewan ternak yang telah difermentasi.',
    detail: 'Pupuk kandang berasal dari kotoran hewan ternak seperti sapi, kambing, ayam, atau kerbau. Kotoran hewan dicampur dengan sisa pakan dan alas kandang, kemudian difermentasi hingga matang. Pupuk kandang mengandung unsur hara makro dan mikro yang lengkap serta bahan organik yang memperbaiki sifat fisik tanah.',
    bahan: 'Kotoran sapi, kambing, ayam, kerbau, atau kuda',
    proses: 'Fermentasi anaerobik selama 2-4 bulan hingga matang sempurna',
    kelebihan: 'Mudah didapat, harga murah, kandungan NPK cukup, meningkatkan aktivitas mikroba tanah',
    cocok: 'Tanaman sayuran, tanaman buah, dan tanaman perkebunan',
  },
  {
    name: 'Pupuk Organik Cair',
    initials: 'PC',
    color: '#2E86AB',
    description: 'Pupuk organik dalam bentuk cair yang mudah diserap tanaman.',
    detail: 'Pupuk organik cair dibuat dari fermentasi bahan organik seperti sisa tanaman, urine hewan, atau limbah organik lainnya. Bentuk cair memungkinkan nutrisi lebih cepat diserap oleh tanaman melalui daun dan akar. Pupuk organik cair sangat cocok untuk aplikasi foliar (semprot daun) dan hidroponik organik.',
    bahan: 'Urine hewan, sisa tanaman, air cucian beras, molase',
    proses: 'Fermentasi anaerobik selama 7-14 hari dengan bantuan mikroorganisme',
    kelebihan: 'Cepat diserap, mudah diaplikasikan, efektif untuk tanaman yang stres, cocok untuk hidroponik',
    cocok: 'Tanaman hias, sayuran hidroponik, tanaman dalam pot, dan semaian',
  },
  {
    name: 'Vermikompos',
    initials: 'VK',
    color: '#A23B72',
    description: 'Hasil budidaya cacing tanah yang kaya hormon pertumbuhan alami.',
    detail: 'Vermikompos adalah hasil dekomposisi bahan organik oleh cacing tanah (biasanya Lumbricus rubellus atau Eisenia fetida). Cacing tanah mencerna bahan organik dan mengeluarkan kotoran (kascing) yang kaya akan unsur hara, hormon pertumbuhan, dan mikroba tanah. Vermikompos dianggap sebagai pupuk organik berkualitas terbaik.',
    bahan: 'Bahan organik (sisa sayuran, kotoran ternak) + cacing tanah',
    proses: 'Budidaya cacing tanah selama 2-3 bulan, bahan organik dicerna dan dikeluarkan sebagai kascing',
    kelebihan: 'Kandungan nutrisi tertinggi, mengandung hormon pertumbuhan, mikroba aktif, memperbaiki struktur tanah secara signifikan',
    cocok: 'Tanaman buah premium, tanaman organik, pembibitan, dan tanaman bernilai ekonomi tinggi',
  },
  {
    name: 'Bokashi',
    initials: 'BK',
    color: '#F18F01',
    description: 'Hasil fermentasi bahan organik dengan Effective Microorganisms (EM4).',
    detail: 'Bokashi adalah pupuk organik yang dibuat melalui fermentasi bahan organik dengan bantuan Effective Microorganisms 4 (EM4). Proses fermentasi berlangsung cepat (1-2 minggu) tanpa memerlukan pengadukan atau pengaturan suhu. Bokashi kaya akan mikroorganisme menguntungkan yang membantu menyuburkan tanah.',
    bahan: 'Sisa dapur, dedak, jerami, serbuk gergaji, kotoran ternak + EM4',
    proses: 'Fermentasi anaerobik dengan EM4 selama 7-14 hari dalam wadah tertutup',
    kelebihan: 'Proses cepat, mudah dibuat, kaya mikroorganisme, tidak berbau busuk, dapat dibuat dalam skala kecil',
    cocok: 'Semua jenis tanaman, terutama untuk perbaikan tanah secara cepat dan tanaman darurat',
  },
]

export default function CriteriaPage() {
  return (
    <div className="landing-page">
      <EcofarmingBg />
      <LandingNav />

      <div className="doc-container-wide">
        <div className="doc-header">
          <h1>Alternatif Pupuk Organik</h1>
          <p>Lima jenis pupuk organik yang tersedia sebagai alternatif dalam sistem pendukung keputusan penentuan pupuk organik terbaik untuk ecofarming.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {providers.map(p => (
            <div key={p.name} className="provider-detail-card">
              <div className="provider-detail-header">
                <div className="provider-detail-badge" style={{ background: p.color }}>
                  {PROVIDER_ICONS[p.name]}
                </div>
                <div>
                  <div className="provider-detail-name">{p.name}</div>
                  <div className="provider-detail-desc-short">{p.description}</div>
                </div>
              </div>
              <div className="provider-detail-body">
                <p className="provider-detail-text">{p.detail}</p>
                <div className="provider-detail-grid">
                  <div className="provider-detail-item">
                    <div className="provider-detail-label">Bahan Baku</div>
                    <div className="provider-detail-value">{p.bahan}</div>
                  </div>
                  <div className="provider-detail-item">
                    <div className="provider-detail-label">Proses Pembuatan</div>
                    <div className="provider-detail-value">{p.proses}</div>
                  </div>
                  <div className="provider-detail-item">
                    <div className="provider-detail-label">Kelebihan</div>
                    <div className="provider-detail-value">{p.kelebihan}</div>
                  </div>
                  <div className="provider-detail-item">
                    <div className="provider-detail-label">Cocok Untuk</div>
                    <div className="provider-detail-value">{p.cocok}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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
