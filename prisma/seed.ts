import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  // Criteria
  const criteria = [
    { key: 'harga',            label: 'Harga',           weight: 0.20, type: 'cost',    unit: 'Rp',      position: 0 },
    { key: 'kandunganNutrisi', label: 'Kandungan Nutrisi', weight: 0.25, type: 'benefit', unit: '%',     position: 1 },
    { key: 'kualitas',         label: 'Kualitas',        weight: 0.15, type: 'benefit', unit: '/10',    position: 2 },
    { key: 'dampak',           label: 'Dampak',          weight: 0.20, type: 'benefit', unit: '/10',    position: 3 },
    { key: 'ramahLingkungan',  label: 'Ramah Lingkungan', weight: 0.10, type: 'benefit', unit: '/10',   position: 4 },
    { key: 'ketersediaan',     label: 'Ketersediaan',    weight: 0.10, type: 'benefit', unit: '/10',    position: 5 },
  ]
  for (const c of criteria) {
    await prisma.criterion.upsert({ where: { key: c.key }, update: c, create: c })
  }

  // Providers
  const providers = [
    { slug:'kompos',       name:'Pupuk Kompos',      initials:'PK', color:'#4A7C3F', logo:'/images/providers/kompos.png',  status:'active', description:'Pupuk organik dari sisa tanaman dan limbah organik yang telah melalui dekomposisi.',  harga:25000, kandunganNutrisi:6.2, kualitas:9, dampak:8, ramahLingkungan:10, ketersediaan:9 },
    { slug:'kandang',      name:'Pupuk Kandang',     initials:'PN', color:'#8B5E3C', logo:'/images/providers/kandang.png', status:'active', description:'Pupuk organik dari kotoran hewan ternak. Mengandung unsur hara makro dan mikro.',  harga:35000, kandunganNutrisi:4.5, kualitas:7, dampak:7, ramahLingkungan:8, ketersediaan:9 },
    { slug:'cair',         name:'Pupuk Organik Cair', initials:'PC', color:'#2E86AB', logo:'/images/providers/cair.png',   status:'active', description:'Pupuk organik cair yang mudah diserap tanaman. Cocok untuk aplikasi daun.',       harga:75000, kandunganNutrisi:3.5, kualitas:6, dampak:6, ramahLingkungan:7, ketersediaan:6 },
    { slug:'vermikompos',  name:'Vermikompos',       initials:'VK', color:'#A23B72', logo:'/images/providers/vermikompos.png',status:'active', description:'Hasil budidaya cacing tanah. Mengandung hormon pertumbuhan alami dan mikroba.', harga:55000, kandunganNutrisi:7.5, kualitas:9, dampak:9, ramahLingkungan:10, ketersediaan:4 },
    { slug:'bokashi',      name:'Bokashi',           initials:'BK', color:'#F18F01', logo:'/images/providers/bokashi.png', status:'active', description:'Hasil fermentasi dengan EM4. Proses cepat dan kaya mikroorganisme.',              harga:15000, kandunganNutrisi:3.8, kualitas:7, dampak:7, ramahLingkungan:9, ketersediaan:7 },
  ]
  for (const p of providers) {
    await prisma.provider.upsert({ where: { slug: p.slug }, update: p, create: p })
  }

  // Users
  const hash = await bcrypt.hash('password', 10)
  const users = [
    { email:'admin@spkecofarming.com', name:'Admin User',      role:'admin',    company:'SPK Ecofarming',       title:'Platform Administrator', avatarColor:'#1a1a2e' },
    { email:'user@spkecofarming.com',  name:'Sarah Analyst',   role:'analyst',  company:'Ecofarming ID',         title:'Pupuk Analyst',          avatarColor:'#1a2a3e' },
    { email:'m.chen@ecofarm.id',       name:'Marcus Chen',     role:'analyst',  company:'Ecofarm.id',           title:'Senior Analyst',         avatarColor:'#1a3a2a' },
    { email:'rini.w@organic.co',       name:'Rini Wulandari',  role:'analyst',  company:'Organic.co',           title:'Kompos Specialist',      avatarColor:'#2a1a3a' },
    { email:'budi.s@farmers.id',       name:'Budi Santoso',    role:'analyst',  company:'Farmers.id',           title:'Agriculture Analyst',    avatarColor:'#3a1a1a' },
    { email:'dewi.r@ecofarming.io',    name:'Dewi Rahayu',     role:'analyst',  company:'Ecofarming.io',        title:'Lead Analyst',           avatarColor:'#3a2a1a' },
  ]
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: hash },
    })
  }

  // Dummy Comparison data
  const analysts = await prisma.user.findMany({ where: { role: 'analyst' }, select: { id: true } })
  const activeProviders = await prisma.provider.findMany({ where: { status: 'active' }, select: { id: true, name: true } })

  // Winners weighted toward top pupuk organik
  const topProviders = ['Pupuk Kompos', 'Vermikompos', 'Pupuk Kandang', 'Bokashi', 'Pupuk Organik Cair']

  const dummyComparisons = []
  const now = Date.now()

  for (let i = 0; i < 50; i++) {
    const user = analysts[Math.floor(Math.random() * analysts.length)]
    const shuffled = [...activeProviders].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, 3 + Math.floor(Math.random() * 3))

    // Generate ranking results
    const results = selected.map((p) => ({
      rank: 0,
      provider: { id: p.id, name: p.name },
      yiScore: (0.5 + Math.random() * 0.5).toFixed(4),
      strengths: [],
    })).sort((a, b) => parseFloat(b.yiScore) - parseFloat(a.yiScore)).map((r, idx) => ({ ...r, rank: idx + 1 }))

    const winner = results[0].provider.name

    // Spread over last 30 days
    const daysAgo = Math.floor(Math.random() * 30)
    const createdAt = new Date(now - daysAgo * 24 * 60 * 60 * 1000)

    dummyComparisons.push({
      userId: user.id,
      providerIds: selected.map(p => p.id),
      winner: winner,
      results: results,
      createdAt: createdAt,
    })
  }

  for (const c of dummyComparisons) {
    await prisma.comparison.create({ data: c })
  }

  console.log('✓ Seed complete — 5 providers, 6 criteria, 6 users, 50 comparison records')
}

main().catch(console.error).finally(() => prisma.$disconnect())
