import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  const provider = await prisma.provider.findUnique({ where: { id } })
  if (!provider) {
    return NextResponse.json({ error: 'Provider not found' }, { status: 404 })
  }
  return NextResponse.json(provider)
}

const ALLOWED_COLOR = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

function validateProviderUpdate(body: Record<string, unknown>): string | null {
  if (body.color !== undefined && typeof body.color !== 'string') {
    return 'Warna harus berupa string'
  }
  if (body.color && !ALLOWED_COLOR.test(body.color as string)) {
    return 'Warna harus berupa kode hex yang valid'
  }
  if (body.description !== undefined && typeof body.description !== 'string') {
    return 'Deskripsi harus berupa string'
  }
  const numericFields = ['mdrFee', 'settlementTime', 'successRate', 'setupFee', 'supportQuality']
  for (const field of numericFields) {
    if (body[field] !== undefined) {
      const val = parseFloat(body[field] as string)
      if (isNaN(val) || val < 0) {
        return `${field} harus berupa angka positif`
      }
    }
  }
  return null
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const validationError = validateProviderUpdate(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const existing = await prisma.provider.findUnique({ where: { id } })
  if (!existing) {
    return NextResponse.json({ error: 'Provider tidak ditemukan' }, { status: 404 })
  }

  const provider = await prisma.provider.update({
    where: { id },
    data: {
      color: (body.color as string)?.trim() || existing.color,
      description: (body.description as string)?.trim() ?? existing.description,
      mdrFee: parseFloat(body.mdrFee as string) || existing.mdrFee,
      settlementTime: parseFloat(body.settlementTime as string) || existing.settlementTime,
      successRate: parseFloat(body.successRate as string) || existing.successRate,
      setupFee: parseFloat(body.setupFee as string) || existing.setupFee,
      supportQuality: parseFloat(body.supportQuality as string) || existing.supportQuality,
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
  
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { status: newStatus } = body as { status?: string }
  if (newStatus !== undefined) {
    if (!['active', 'inactive'].includes(newStatus)) {
      return NextResponse.json({ error: 'Status harus active atau inactive' }, { status: 400 })
    }
  }

  const provider = await prisma.provider.update({ where: { id }, data: { status: newStatus } })
  return NextResponse.json(provider)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  const { id } = await params
  
  const existing = await prisma.provider.findUnique({ where: { id } })
  if (!existing) {
    return NextResponse.json({ error: 'Provider tidak ditemukan' }, { status: 404 })
  }
  
  await prisma.provider.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
