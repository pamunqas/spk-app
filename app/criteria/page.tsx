'use client'
import Link from 'next/link'
import LandingNav from '@/components/LandingNav'
import { SUBCRITERIA } from '@/lib/subcriteria'

type PupukData = {
  name: string; initials: string; color: string; description: string
  harga: number; kandunganNutrisi: number; kualitas: number; dampak: number; ramahLingkungan: number; ketersediaan: number
}

const providers: PupukData[] = [
  { name:'Pupuk Kompos',     initials:'PK', color:'#4A7C3F', description:'Pupuk organik dari sisa tanaman dan limbah organik yang telah melalui dekomposisi. Kaya unsur hara dan memperbaiki struktur tanah.',     harga:25000, kandunganNutrisi:6.2, kualitas:9, dampak:8, ramahLingkungan:10, ketersediaan:9 },
  { name:'Pupuk Kandang',    initials:'PN', color:'#8B5E3C', description:'Pupuk organik dari kotoran hewan ternak. Mengandung unsur hara makro dan mikro yang lengkap.',                                             harga:35000, kandunganNutrisi:4.5, kualitas:7, dampak:7, ramahLingkungan:8,  ketersediaan:9 },
  { name:'Pupuk Organik Cair', initials:'PC', color:'#2E86AB', description:'Pupuk organik cair yang mudah diserap tanaman. Cocok untuk aplikasi daun dan media tanam.',                                             harga:75000, kandunganNutrisi:3.5, kualitas:6, dampak:6, ramahLingkungan:7,  ketersediaan:6 },
  { name:'Vermikompos',      initials:'VK', color:'#A23B72', description:'Hasil budidaya cacing tanah. Mengandung hormon pertumbuhan alami dan mikroba tanah.',                                                      harga:55000, kandunganNutrisi:7.5, kualitas:9, dampak:9, ramahLingkungan:10, ketersediaan:4 },
  { name:'Bokashi',          initials:'BK', color:'#F18F01', description:'Hasil fermentasi bahan organik dengan EM4. Proses cepat dan kaya mikroorganisme.',                                                         harga:15000, kandunganNutrisi:3.8, kualitas:7, dampak:7, ramahLingkungan:9,  ketersediaan:7 },
]

const CRITERION_KEYS = ['harga', 'kandunganNutrisi', 'kualitas', 'dampak', 'ramahLingkungan', 'ketersediaan'] as const

const CRITERION_COLORS: Record<string, string> = {
  harga: '#F87171', kandunganNutrisi: '#10B981',
  kualitas: '#818CF8', dampak: '#A78BFA', ramahLingkungan: '#34D399', ketersediaan: '#F59E0B',
}

function formatRaw(key: string, val: number): string {
  if (key === 'harga') return `Rp${val.toLocaleString('id-ID')}`
  if (key === 'kandunganNutrisi') return `${val}%`
  return `${val}/10`
}

export default function CriteriaPage() {
  return (
    <div className="landing-page">
      <div className="landing-bg" />
      <div className="landing-grid" />
      <LandingNav />

      <div className="doc-container-wide">
        <div className="doc-header">
          <h1>Daftar Alternatif Pupuk Organik</h1>
          <p>Berikut adalah 5 jenis pupuk organik yang tersedia sebagai alternatif dalam sistem pendukung keputusan penentuan pupuk organik terbaik untuk ecofarming.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 16,
        }}>
          {providers.map(p => (
              <div key={p.name} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 'var(--r)', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}>
                <div style={{
                  padding: '18px 16px', textAlign: 'center',
                  borderBottom: '1px solid var(--border)',
                  background: 'var(--bg-3)',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: p.color, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', margin: '0 auto 10px',
                    fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 600, color: 'white',
                  }}>{p.initials}</div>
                  <div style={{ fontSize: 15, fontWeight: 600 }}>{p.name}</div>
                </div>
                <div style={{ padding: '12px 16px', fontSize: 13, lineHeight: 1.5, color: 'var(--text-3)', height: 98 }}>
                  {p.description}
                </div>
                <div style={{ padding: '8px 16px 16px', flex: 1 }}>
                {CRITERION_KEYS.map(key => {
                  const sub = SUBCRITERIA[key]
                  if (!sub) return null
                  const rawVal = p[key] as number
                  return (
                      <div key={key} style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '6px 0', borderBottom: '1px solid var(--border)',
                      }}>
                        <span style={{
                          width: 8, height: 8, borderRadius: '50%',
                          background: CRITERION_COLORS[key], flexShrink: 0,
                        }} />
                        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', flex: 1 }}>{sub.label}</span>
                        <span style={{ fontSize: 12, color: 'var(--text-3)' }}>
                          {formatRaw(key, rawVal)}
                        </span>
                      </div>
                  )
                })}
              </div>
            </div>
          ))}
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
