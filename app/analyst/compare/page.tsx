import { prisma } from '@/lib/prisma'
import CompareClient from './CompareClient'

export default async function ComparePage() {
  const [providers, criteria] = await Promise.all([
    prisma.provider.findMany({ where: { status: 'active' }, orderBy: { name: 'asc' } }),
    prisma.criterion.findMany({ orderBy: { position: 'asc' } }),
  ])
  return <CompareClient providers={providers} criteria={criteria} />
}
