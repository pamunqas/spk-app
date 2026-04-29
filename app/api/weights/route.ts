import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const criteria = await prisma.criterion.findMany({ orderBy: { position: 'asc' } })
  return NextResponse.json(criteria)
}

export async function PUT(req: Request) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const body: { id: string; weight: number }[] = await req.json()
  const total = body.reduce((s, c) => s + c.weight, 0)
  if (Math.abs(total - 1) > 0.001) {
    return NextResponse.json({ error: 'Weights must sum to 1.00' }, { status: 400 })
  }
  await Promise.all(
    body.map(c => prisma.criterion.update({ where: { id: c.id }, data: { weight: c.weight } }))
  )
  return NextResponse.json({ ok: true })
}
