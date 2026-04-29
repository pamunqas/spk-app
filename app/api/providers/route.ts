import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const providers = await prisma.provider.findMany({ orderBy: { createdAt: 'asc' } })
  return NextResponse.json(providers)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const body = await req.json()
  const provider = await prisma.provider.create({
    data: {
      slug:          body.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      name:          body.name,
      initials:      body.initials.toUpperCase().slice(0, 2),
      color:         body.color || '#6366F1',
      status:        'active',
      description:   body.description || '',
      mdrFee:        parseFloat(body.mdrFee) || 1.5,
      settlementTime:parseFloat(body.settlementTime) || 1.0,
      successRate:   parseFloat(body.successRate) || 98.0,
      setupFee:      parseFloat(body.setupFee) || 0,
      supportQuality:parseFloat(body.supportQuality) || 7.5,
    },
  })
  return NextResponse.json(provider, { status: 201 })
}
