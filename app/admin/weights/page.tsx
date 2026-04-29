import { prisma } from '@/lib/prisma'
import WeightsClient from './WeightsClient'

const CRITERION_COLORS: Record<string, string> = {
  mdrFee: '#F87171', settlementTime: '#F59E0B',
  successRate: '#10B981', setupFee: '#A78BFA', supportQuality: '#818CF8',
}

const CRITERION_DESC: Record<string, string> = {
  mdrFee:         'Biaya transaksi yang dikenakan per pembayaran. Lebih rendah lebih baik untuk merchant berskala besar.',
  settlementTime: 'Hari kerja untuk dana sampai ke akun Anda. Lebih cepat meningkatkan arus kas.',
  successRate:    '% transaksi yang berhasil diselesaikan. Setiap 1% penting pada volume tinggi.',
  setupFee:       'Biaya integrasi satu kali. Bobot lebih rendah karena cepat teramortisasi.',
  supportQuality: 'Responsivitas dan cakupan dukungan teknis dalam skala 10 poin.',
}

export default async function AdminWeights() {
  const criteria = await prisma.criterion.findMany({ orderBy: { position: 'asc' } })
  return (
    <WeightsClient
      initialCriteria={criteria.map(c => ({
        ...c,
        color: CRITERION_COLORS[c.key],
        desc: CRITERION_DESC[c.key] ?? '',
      }))}
    />
  )
}
