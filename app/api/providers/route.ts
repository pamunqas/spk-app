import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

function createAudit(userId: string, action: string, entity: string, entityId?: string, details?: Record<string, unknown>) {
  prisma.auditLog.create({
    data: {
      userId,
      action,
      entity,
      entityId,
      details: details as any,
    },
  }).catch(console.error)
}

const ALLOWED_COLOR = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

function validateProvider(body: Record<string, unknown>): string | null {
  if (!body.name || typeof body.name !== 'string' || body.name.trim().length === 0) {
    return 'Nama provider wajib diisi'
  }
  if (body.name.trim().length > 100) {
    return 'Nama maksimal 100 karakter'
  }
  if (!body.initials || typeof body.initials !== 'string' || body.initials.trim().length === 0) {
    return 'Inisial wajib diisi'
  }
  if (body.initials.trim().length > 2) {
    return 'Inisial maksimal 2 karakter'
  }
  if (body.color && typeof body.color !== 'string') {
    return 'Warna harus berupa kode hex'
  }
  if (body.color) {
    const colorStr = body.color as string
    if (!ALLOWED_COLOR.test(colorStr)) {
      return 'Warna harus berupa kode hex yang valid'
    }
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

export async function GET() {
  const providers = await prisma.provider.findMany({ orderBy: { createdAt: 'asc' } })
  return NextResponse.json(providers)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const validationError = validateProvider(body)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

const name = (body.name as string).trim()
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const initials = (body.initials as string).trim().toUpperCase().slice(0, 2)

  const existing = await prisma.provider.findFirst({ where: { OR: [{ slug }, { name }] } })
  if (existing) {
    return NextResponse.json({ error: 'Provider dengan nama yang sama sudah ada' }, { status: 409 })
  }

  const provider = await prisma.provider.create({
    data: {
      slug,
      name,
      initials,
      color: ((body.color as string)?.trim() || '#6366F1'),
      status: 'active',
      description: ((body.description as string)?.trim() || ''),
      mdrFee: parseFloat(body.mdrFee as string) || 1.5,
      settlementTime: parseFloat(body.settlementTime as string) || 1.0,
      successRate: parseFloat(body.successRate as string) || 98.0,
      setupFee: parseFloat(body.setupFee as string) || 0,
      supportQuality: parseFloat(body.supportQuality as string) || 7.5,
    },
  })
  createAudit((session.user as any).id, 'CREATE', 'provider', provider.id, { name: provider.name })
  return NextResponse.json(provider, { status: 201 })
}
