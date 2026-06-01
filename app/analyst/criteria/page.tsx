import { prisma } from '@/lib/prisma'
import { SUBCRITERIA } from '@/lib/subcriteria'
import CriteriaClient from './CriteriaClient'

export default async function CriteriaPage() {
  const criteria = await prisma.criterion.findMany({ orderBy: { position: 'asc' } })
  return <CriteriaClient criteria={criteria} />
}
