import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SPK Penentuan Pupuk Organik Terbaik pada Ecofarming - Metode MOORA',
  description: 'Sistem Pendukung Keputusan Penentuan Pupuk Organik Terbaik pada Ecofarming Menggunakan Metode MOORA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
