import { prisma } from '@/lib/prisma'
import ProvidersClient from './ProvidersClient'

export default async function AdminProviders() {
  const providers = await prisma.provider.findMany({ orderBy: { createdAt: 'asc' } })
  return <ProvidersClient initialProviders={providers} />
}
