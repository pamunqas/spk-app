import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  const body = await req.json()
  const provider = await prisma.provider.update({
    where: { id },
    data: {
      color:          body.color,
      description:    body.description,
      mdrFee:         parseFloat(body.mdrFee),
      settlementTime: parseFloat(body.settlementTime),
      successRate:    parseFloat(body.successRate),
      setupFee:       parseFloat(body.setupFee),
      supportQuality: parseFloat(body.supportQuality),
    },
  })
  return NextResponse.json(provider)
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  const body = await req.json()
  const provider = await prisma.provider.update({ where: { id }, data: body })
  return NextResponse.json(provider)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  await prisma.provider.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
