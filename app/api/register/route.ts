import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const { name, email, password, company, title } = await req.json()

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Nama, email, dan kata sandi wajib diisi' }, { status: 400 })
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Kata sandi minimal 6 karakter' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json({ error: 'Email sudah terdaftar' }, { status: 409 })
  }

  const hashed = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: 'analyst',
      company: company || null,
      title:   title   || null,
    },
    select: { id: true, name: true, email: true, role: true },
  })

  return NextResponse.json(user, { status: 201 })
}
