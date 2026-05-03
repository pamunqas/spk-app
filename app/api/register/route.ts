import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 255

function validateInput(data: { name?: string, email?: string, password?: string, company?: string, title?: string }): string | null {
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
    return 'Nama wajib diisi'
  }
  if (data.name.trim().length > MAX_NAME_LENGTH) {
    return `Nama maksimal ${MAX_NAME_LENGTH} karakter`
  }
  if (!data.email || typeof data.email !== 'string') {
    return 'Email wajib diisi'
  }
  if (data.email.length > MAX_EMAIL_LENGTH) {
    return `Email maksimal ${MAX_EMAIL_LENGTH} karakter`
  }
  if (!EMAIL_REGEX.test(data.email)) {
    return 'Format email tidak valid'
  }
  if (!data.password || typeof data.password !== 'string') {
    return 'Kata sandi wajib diisi'
  }
  if (data.password.length < MIN_PASSWORD_LENGTH) {
    return `Kata sandi minimal ${MIN_PASSWORD_LENGTH} karakter`
  }
  if (data.password.length > 72) {
    return 'Kata sandi maksimal 72 karakter'
  }
  if (data.company && typeof data.company !== 'string') {
    return 'Perusahaan harus berupa teks'
  }
  if (data.title && typeof data.title !== 'string') {
    return 'Jabatan harus berupa teks'
  }
  return null
}

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const data = body as { name: string, email: string, password: string, company?: string, title?: string }
  const validationError = validateInput(data)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 })
  }

  const name = data.name.trim()
  const email = data.email.trim().toLowerCase()
  const password = data.password!
  const company = data.company?.trim() || null
  const title = data.title?.trim() || null

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role: 'analyst', company, title },
      select: { id: true, name: true, email: true, role: true },
    })
    return NextResponse.json(user, { status: 201 })
  } catch (e: any) {
    if (e.code === 'P2002') {
      return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 })
    }
    console.error('Register error:', e)
    return NextResponse.json({ error: 'Terjadi kesalahan server' }, { status: 500 })
  }
}
