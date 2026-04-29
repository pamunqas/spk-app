import { prisma } from '@/lib/prisma'
import WeightsClient from './WeightsClient'

const CRITERION_COLORS: Record<string, string> = {
  mdrFee: '#F87171', settlementTime: '#F59E0B',
  successRate: '#10B981', setupFee: '#A78BFA', supportQuality: '#818CF8',
}

const CRITERION_DESC: Record<string, string> = {
  mdrFee:         'Transaction fee charged per payment. Lower is better for merchants at scale.',
  settlementTime: 'Business days for funds to reach your account. Faster improves cash flow.',
  successRate:    '% of transactions completed successfully. Every 1% matters at high volumes.',
  setupFee:       'One-time integration cost. Lower weight as it amortizes quickly.',
  supportQuality: 'Technical support responsiveness and coverage on a 10-point scale.',
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
