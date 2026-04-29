export type CriterionType = 'benefit' | 'cost'

export interface Criterion {
  key: string
  label: string
  weight: number
  type: CriterionType
  unit: string
  position: number
}

export interface ProviderInput {
  id: string
  slug: string
  name: string
  initials: string
  color: string
  description: string
  mdrFee: number
  settlementTime: number
  successRate: number
  setupFee: number
  supportQuality: number
}

export interface MooraResult {
  provider: ProviderInput
  yiScore: number
  scorePercentile: number
  rank: number
  strengths: string[]
  weaknesses: string[]
}

export interface MooraComputation {
  results: MooraResult[]
  // indexed by provider id
  normalized: Record<string, Record<string, number>>
  weighted:   Record<string, Record<string, number>>
  yiScores:   Record<string, number>
}

export function computeMoora(providers: ProviderInput[], criteria: Criterion[]): MooraComputation {
  const keys = criteria.map(c => c.key) as (keyof Pick<
    ProviderInput, 'mdrFee'|'settlementTime'|'successRate'|'setupFee'|'supportQuality'>)[]

  const raw = providers.map(p => keys.map(k => p[k] as number))

  // Step 1 – vector normalisation
  const colNorms = keys.map((_, j) => Math.sqrt(raw.reduce((s, r) => s + r[j] ** 2, 0)))
  const norm = raw.map(row => row.map((v, j) => (colNorms[j] === 0 ? 0 : v / colNorms[j])))

  // Step 2 – apply weights
  const weighted = norm.map(row => row.map((v, j) => criteria[j].weight * v))

  // Step 3 – yi score (benefit: add, cost: subtract)
  const scores = weighted.map(row =>
    row.reduce((a, v, j) => (criteria[j].type === 'benefit' ? a + v : a - v), 0)
  )

  const mn  = Math.min(...scores)
  const mx  = Math.max(...scores)
  const rng = mx - mn || 1

  const ranked  = scores.map((s, i) => ({ s, i })).sort((a, b) => b.s - a.s)
  const rankMap = new Map(ranked.map(({ i }, rank) => [i, rank + 1]))

  const results: MooraResult[] = providers
    .map((p, i) => {
      const strengths: string[]  = []
      const weaknesses: string[] = []
      criteria.forEach((c, j) => {
        const nv   = norm[i][j]
        const col  = norm.map(r => r[j])
        const best  = c.type === 'benefit' ? Math.max(...col) : Math.min(...col)
        const worst = c.type === 'benefit' ? Math.min(...col) : Math.max(...col)
        if (Math.abs(nv - best)  < 1e-9) strengths.push('Best ' + c.label)
        else if (Math.abs(nv - worst) < 1e-9) weaknesses.push('Worst ' + c.label)
      })
      return {
        provider:       p,
        yiScore:        scores[i],
        scorePercentile: ((scores[i] - mn) / rng) * 100,
        rank:           rankMap.get(i)!,
        strengths,
        weaknesses,
      }
    })
    .sort((a, b) => a.rank - b.rank)

  // Build lookup tables keyed by provider id
  const normalizedMap: Record<string, Record<string, number>> = {}
  const weightedMap:   Record<string, Record<string, number>> = {}
  const yiScoresMap:   Record<string, number>                 = {}

  providers.forEach((p, i) => {
    normalizedMap[p.id] = {}
    weightedMap[p.id]   = {}
    keys.forEach((k, j) => {
      normalizedMap[p.id][k] = norm[i][j]
      weightedMap[p.id][k]   = weighted[i][j]
    })
    yiScoresMap[p.id] = scores[i]
  })

  return { results, normalized: normalizedMap, weighted: weightedMap, yiScores: yiScoresMap }
}
