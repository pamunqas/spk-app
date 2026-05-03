import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SPK Payment Gateway untuk Startup di Sleman - Metode MOORA',
  description: 'Sistem Pendukung Keputusan Pemilihan Payment Gateway untuk Startup di Sleman Dengan Metode MOORA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
