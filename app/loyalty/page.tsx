import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const tiers = [
  { name:'Bronze', icon:'🥉', req:'Перша покупка', gradient:'rgba(180,83,9,.12)', border:'rgba(180,83,9,.3)',
    perks:['3% кешбек бонусами','Знижка 5% на аксесуари','Пріоритетна підтримка'] },
  { name:'Silver', icon:'🥈', req:'Від 50 000 ₴', gradient:'rgba(156,163,175,.12)', border:'rgba(156,163,175,.3)',
    perks:['5% кешбек бонусами','Знижка 10% на аксесуари','Безкоштовне ТО 1 раз/рік','Ранній доступ до новинок'] },
  { name:'Gold', icon:'🥇', req:'Від 100 000 ₴', gradient:'rgba(245,194,0,.12)', border:'rgba(245,194,0,.3)',
    perks:['8% кешбек бонусами','Знижка 15% на аксесуари','Безкоштовне ТО 2 рази/рік','VIP підтримка 24/7','Ексклюзивні акції'] },
]

export default function LoyaltyPage() {
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/><span style={{ color:'var(--text)', fontWeight:500 }}>Програма лояльності</span>
          </div>
        </div>
      </div>

      <div style={{ background:'linear-gradient(135deg, rgba(245,194,0,.08), var(--bg))', padding:'56px 0', borderBottom:'1px solid var(--border)' }}>
        <div className="w-container" style={{ textAlign:'center' }}>
          <span style={{ display:'inline-block', background:'rgba(245,194,0,.12)', border:'1px solid rgba(245,194,0,.25)', color:'var(--yellow-dark)', fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, padding:'5px 14px', borderRadius:4, marginBottom:20 }}>⭐ Ausom Club</span>
          <h1 style={{ fontSize:'clamp(36px,5vw,56px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.05, marginBottom:16 }}>
            Програма <span style={{ color:'var(--yellow-dark)' }}>лояльності</span>
          </h1>
          <p style={{ fontSize:16, color:'var(--text-2)', maxWidth:520, margin:'0 auto' }}>Купуй, накопичуй бонуси та отримуй ексклюзивні привілеї.</p>
        </div>
      </div>

      <div className="w-container" style={{ padding:'48px 40px' }}>
        {/* Tiers */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20, marginBottom:40 }}>
          {tiers.map(t => (
            <div key={t.name} style={{ background:`linear-gradient(135deg, ${t.gradient}, var(--bg-soft))`, border:`1.5px solid ${t.border}`, borderRadius:12, padding:'28px 24px' }}>
              <div style={{ fontSize:28, marginBottom:8 }}>{t.icon}</div>
              <h3 style={{ fontSize:18, fontWeight:800, color:'var(--text)', marginBottom:4 }}>{t.name}</h3>
              <p style={{ fontSize:12, color:'var(--text-3)', marginBottom:16 }}>{t.req}</p>
              {t.perks.map(p => (
                <div key={p} style={{ fontSize:13, color:'var(--text-2)', display:'flex', alignItems:'center', gap:8, lineHeight:2 }}>
                  <span style={{ color:'var(--yellow-dark)' }}>✓</span>{p}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* How bonuses work */}
        <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'28px 32px', marginBottom:40 }}>
          <h2 style={{ fontSize:18, fontWeight:700, color:'var(--text)', marginBottom:14 }}>Як працюють бонуси?</h2>
          <p style={{ fontSize:14, color:'var(--text-2)', lineHeight:1.7, marginBottom:16 }}>
            За кожну покупку ви отримуєте бонуси відповідно до рівня. 1 бонус = 1 гривня. Можна оплатити до 30% наступної покупки.
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ background:'var(--bg)', borderRadius:8, padding:'16px 18px' }}>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:4 }}>Нарахування</div>
              <div style={{ fontSize:13, color:'var(--text-3)' }}>Автоматично після підтвердження отримання.</div>
            </div>
            <div style={{ background:'var(--bg)', borderRadius:8, padding:'16px 18px' }}>
              <div style={{ fontSize:14, fontWeight:600, color:'var(--text)', marginBottom:4 }}>Термін дії</div>
              <div style={{ fontSize:13, color:'var(--text-3)' }}>12 місяців з моменту нарахування.</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign:'center' }}>
          <p style={{ fontSize:14, color:'var(--text-3)', marginBottom:16 }}>Стаєте учасником автоматично з першою покупкою!</p>
          <Link href="/catalog" className="btn btn-yellow btn-lg">Перейти до каталогу</Link>
        </div>
      </div>
    </div>
  )
}
