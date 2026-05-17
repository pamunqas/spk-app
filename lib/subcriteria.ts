export interface SubCriterionLevel {
  score: 1 | 3 | 5
  condition: string
  label: string
}

export interface SubCriterion {
  key: string
  label: string
  type: 'benefit' | 'cost'
  levels: SubCriterionLevel[]
}

export const SUBCRITERIA: Record<string, SubCriterion> = {
  harga: {
    key: 'harga',
    label: 'Harga',
    type: 'cost',
    levels: [
      { score: 5, condition: '< Rp. 50.000', label: 'Sangat Murah' },
      { score: 3, condition: 'Rp. 50.000 – Rp. 100.000', label: 'Standar' },
      { score: 1, condition: '> Rp. 100.000', label: 'Mahal' },
    ],
  },
  kandunganNutrisi: {
    key: 'kandunganNutrisi',
    label: 'Kandungan Nutrisi',
    type: 'benefit',
    levels: [
      { score: 5, condition: 'NPK >5%', label: 'Lengkap dan Tinggi' },
      { score: 3, condition: '3% - 5%', label: 'Cukup' },
      { score: 1, condition: '<3%', label: 'Rendah' },
    ],
  },
  kualitas: {
    key: 'kualitas',
    label: 'Kualitas',
    type: 'benefit',
    levels: [
      { score: 5, condition: 'Tekstur halus, warna coklat kehitaman, tidak berbau menyengat', label: 'Sangat Baik' },
      { score: 3, condition: 'Tekstur agak kasar, matang sebagian, sedikit berbau asam', label: 'Standar' },
      { score: 1, condition: 'Tekstur kasar, belum matang, bau busuk', label: 'Rendah' },
    ],
  },
  dampak: {
    key: 'dampak',
    label: 'Dampak',
    type: 'benefit',
    levels: [
      { score: 5, condition: 'Pertumbuhan sangat pesat dengan panen yang melimpah', label: 'Sangat Efektif' },
      { score: 3, condition: 'Pertumbuhan cukup baik', label: 'Efektif' },
      { score: 1, condition: 'Pertumbuhan lambat', label: 'Tidak Efektif' },
    ],
  },
  ramahLingkungan: {
    key: 'ramahLingkungan',
    label: 'Ramah Lingkungan',
    type: 'benefit',
    levels: [
      { score: 5, condition: 'Sangat aman dan tidak mencemari lingkungan', label: 'Sangat Ramah Lingkungan' },
      { score: 3, condition: 'Cukup aman digunakan', label: 'Ramah Lingkungan' },
      { score: 1, condition: 'Berpotensi mencemari lingkungan', label: 'Tidak Ramah Lingkungan' },
    ],
  },
  ketersediaan: {
    key: 'ketersediaan',
    label: 'Ketersediaan',
    type: 'benefit',
    levels: [
      { score: 5, condition: 'Sangat mudah didapat di pasaran', label: 'Distribusi Luas' },
      { score: 3, condition: 'Tersedia namun terbatas (stok tidak selalu ada)', label: 'Distribusi Terbatas' },
      { score: 1, condition: 'Sulit ditemukan atau jarang ada di pasaran', label: 'Distribusi Langka' },
    ],
  },
}

export function getCriterionSub(criterionKey: string): SubCriterion | undefined {
  return SUBCRITERIA[criterionKey]
}

export interface ProviderRawScores {
  id: string
  name: string
  initials: string
  color: string
  description: string
  scores: Record<string, number>
}

export interface IdealSelection {
  [criterionKey: string]: number
}

export function rawToCriterionScore(key: string, rawValue: number): number {
  switch (key) {
    case 'harga':
      if (rawValue > 100000) return 1
      if (rawValue >= 50000) return 3
      return 5
    case 'kandunganNutrisi':
      if (rawValue > 5) return 5
      if (rawValue >= 3) return 3
      return 1
    case 'kualitas':
    case 'dampak':
    case 'ramahLingkungan':
    case 'ketersediaan':
      if (rawValue >= 8) return 5
      if (rawValue >= 5) return 3
      return 1
    default:
      return 3
  }
}

export function mapProviderToScores(
  provider: { id: string; name: string; initials: string; color: string; description: string; [key: string]: any },
  criteria: { key: string }[]
): ProviderRawScores {
  const scores: Record<string, number> = {}
  
  for (const c of criteria) {
    const rawValue = provider[c.key] as number
    scores[c.key] = rawToCriterionScore(c.key, rawValue)
  }
  
  return {
    id: provider.id,
    name: provider.name,
    initials: provider.initials,
    color: provider.color,
    description: provider.description,
    scores,
  }
}

export function computeMatchResults(
  providers: ProviderRawScores[],
  ideal: IdealSelection,
  criteria: { key: string; label: string; weight: number; type: string }[]
) {
  const maxScore = criteria.reduce((s, c) => s + c.weight * 5, 0)

  const scored = providers.map(p => {
    let totalWeight = 0
    let matchSum = 0
    const details: Record<string, { providerScore: number; idealScore: number; match: number; weighted: number }> = {}

    for (const c of criteria) {
      const providerScore = p.scores[c.key] ?? 3
      const idealScore = ideal[c.key] ?? 3
      const diff = Math.abs(providerScore - idealScore)
      const match = 5 - diff
      const weighted = c.weight * match
      matchSum += weighted
      totalWeight += c.weight
      details[c.key] = { providerScore, idealScore, match, weighted }
    }

    const rawScore = totalWeight > 0 ? matchSum / totalWeight : 0
    const scorePercentile = maxScore > 0 ? (matchSum / maxScore) * 100 : 0

    return { providerId: p.id, provider: p, rawScore, scorePercentile, details }
  })

  const sorted = scored.sort((a, b) => b.rawScore - a.rawScore)
  const ranked = sorted.map((s, i) => ({ ...s, rank: i + 1 }))

  return { results: ranked, winner: ranked[0] }
}
