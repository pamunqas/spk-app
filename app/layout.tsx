import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SPK Payment Gateway',
  description: 'MOORA-Powered Payment Gateway Intelligence',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
