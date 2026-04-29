import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter } as any)

async function main() {
  // Criteria
  const criteria = [
    { key: 'mdrFee',        label: 'MDR Fee',        weight: 0.30, type: 'cost',    unit: '%',    position: 0 },
    { key: 'settlementTime',label: 'Settlement Time', weight: 0.25, type: 'cost',    unit: 'days', position: 1 },
    { key: 'successRate',   label: 'Success Rate',    weight: 0.25, type: 'benefit', unit: '%',    position: 2 },
    { key: 'setupFee',      label: 'Setup Fee',       weight: 0.10, type: 'cost',    unit: 'USD',  position: 3 },
    { key: 'supportQuality',label: 'Support Quality', weight: 0.10, type: 'benefit', unit: '/10',  position: 4 },
  ]
  for (const c of criteria) {
    await prisma.criterion.upsert({ where: { key: c.key }, update: c, create: c })
  }

  // Providers
  const providers = [
    { slug:'midtrans',   name:'Midtrans',      initials:'MT', color:'#003D7A', status:'active', description:'Industry standard for enterprise & startups. Backed by GoTo Group.',     mdrFee:2.0,  settlementTime:1.5, successRate:99.9, setupFee:0, supportQuality:8.5 },
    { slug:'xendit',     name:'Xendit',        initials:'XD', color:'#0057FF', status:'active', description:'Developer-first gateway with modern APIs and rapid real-time settlement.', mdrFee:1.5,  settlementTime:1.0, successRate:99.9, setupFee:0, supportQuality:9.0 },
    { slug:'doku',       name:'DOKU',          initials:'DK', color:'#00529B', status:'active', description:'Pioneer in Indonesia, complete BI licenses, deep retail integrations.',    mdrFee:1.75, settlementTime:2.0, successRate:98.5, setupFee:0, supportQuality:8.0 },
    { slug:'faspay',     name:'Faspay',        initials:'FP', color:'#E8461A', status:'active', description:'Strong B2B player excelling in Virtual Account aggregation.',              mdrFee:1.5,  settlementTime:1.0, successRate:98.0, setupFee:0, supportQuality:7.5 },
    { slug:'oy',         name:'OY! Indonesia', initials:'OY', color:'#00AA5B', status:'active', description:'B2B gateway specializing in disbursements and flat-rate routing.',         mdrFee:1.5,  settlementTime:1.0, successRate:99.0, setupFee:0, supportQuality:8.0 },
    { slug:'prismalink', name:'Prismalink',    initials:'PL', color:'#7B2FBE', status:'active', description:'Custom enterprise integrations, white-labeling, healthcare/education.',    mdrFee:1.5,  settlementTime:1.0, successRate:98.0, setupFee:0, supportQuality:7.0 },
    { slug:'espay',      name:'Espay',         initials:'EP', color:'#E67E22', status:'active', description:'Mid-market e-commerce with unique B2C2B model.',                           mdrFee:1.75, settlementTime:1.0, successRate:98.0, setupFee:0, supportQuality:7.5 },
    { slug:'winpay',     name:'Winpay',        initials:'WP', color:'#27AE60', status:'active', description:'Social commerce and MSMEs needing instant checkout links.',                mdrFee:1.5,  settlementTime:1.0, successRate:98.0, setupFee:0, supportQuality:7.0 },
    { slug:'nicepay',    name:'Nicepay',       initials:'NP', color:'#FF6600', status:'active', description:'South Korean JV with highly stable infrastructure for enterprise.',        mdrFee:1.5,  settlementTime:2.5, successRate:99.0, setupFee:0, supportQuality:7.5 },
    { slug:'ipaymu',     name:'iPaymu',        initials:'IP', color:'#2D9CDB', status:'active', description:'Ease-of-use focus for small merchants, escrow, instant plugins.',          mdrFee:1.5,  settlementTime:1.0, successRate:98.0, setupFee:0, supportQuality:7.5 },
    { slug:'durianpay',  name:'Durianpay',     initials:'DP', color:'#F39C12', status:'active', description:'Aggregator-of-aggregators, dynamic routing for best success rates.',       mdrFee:1.5,  settlementTime:1.0, successRate:99.5, setupFee:0, supportQuality:8.5 },
    { slug:'hitpay',     name:'HitPay',        initials:'HP', color:'#6C5CE7', status:'active', description:'SMEs with omni-channel needs, seamless POS + online, no coding.',          mdrFee:1.5,  settlementTime:1.0, successRate:99.0, setupFee:0, supportQuality:8.0 },
  ]
  for (const p of providers) {
    await prisma.provider.upsert({ where: { slug: p.slug }, update: p, create: p })
  }

  // Users
  const hash = await bcrypt.hash('password', 10)
  const users = [
    { email:'admin@spkgateway.com', name:'Admin User',      role:'admin',    company:'SPK Platform',       title:'Platform Administrator', avatarColor:'#1a1a2e' },
    { email:'user@spkgateway.com',  name:'Sarah Analyst',   role:'analyst',  company:'FinTech Ventures ID', title:'Payments Analyst',       avatarColor:'#1a2a3e' },
    { email:'m.chen@fintech.id',    name:'Marcus Chen',     role:'analyst',  company:'Fintech.id',          title:'Senior Analyst',         avatarColor:'#1a3a2a' },
    { email:'rini.w@startup.co',    name:'Rini Wulandari',  role:'analyst',  company:'Startup.co',          title:'Payment Specialist',     avatarColor:'#2a1a3a' },
    { email:'budi.s@commerce.id',   name:'Budi Santoso',    role:'analyst',  company:'Commerce.id',         title:'Business Analyst',       avatarColor:'#3a1a1a' },
    { email:'dewi.r@payments.io',   name:'Dewi Rahayu',     role:'analyst',  company:'Payments.io',         title:'Lead Analyst',           avatarColor:'#3a2a1a' },
  ]
  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: { ...u, password: hash },
    })
  }

  console.log('✓ Seed complete — 12 providers, 5 criteria, 6 users')
}

main().catch(console.error).finally(() => prisma.$disconnect())
