import { prisma } from '@/lib/prisma'
import WeightsClient from './WeightsClient'

const CRITERION_COLORS: Record<string, string> = {
  harga: '#F87171', kandunganNutrisi: '#10B981',
  kualitas: '#818CF8', dampak: '#A78BFA', ramahLingkungan: '#34D399', ketersediaan: '#F59E0B',
}

const CRITERION_DESC: Record<string, string> = {
  harga:            'Biaya pembelian pupuk per satuan. Lebih rendah lebih baik untuk petani.',
  kandunganNutrisi: 'Persentase kandungan unsur hara esensial (N, P, K) dalam pupuk.',
  kualitas:        'Kualitas keseluruhan pupuk dalam skala 10 poin.',
  dampak:          'Dampak positif terhadap pertumbuhan tanaman dan kesuburan tanah.',
  ramahLingkungan: 'Tingkat keramahan terhadap lingkungan dalam proses produksi dan penggunaan.',
  ketersediaan:    'Ketersediaan pupuk di pasar dan kemudahan mendapatkannya.',
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
