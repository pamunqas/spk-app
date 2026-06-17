import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SPK Penentuan Pupuk Organik Terbaik pada Ecofarming',
  description: 'Sistem Pendukung Keputusan Penentuan Pupuk Organik Terbaik pada Ecofarming',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
