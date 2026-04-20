import type { Metadata } from 'next'
import Link from 'next/link'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ausom.in.ua'

export const metadata: Metadata = {
  title: 'Про нас — Ausom Ukraine, офіційний дилер електросамокатів',
  description:
    "Ausom Ukraine — офіційний дистриб'ютор електросамокатів Ausom та Kukirin в Україні. Гарантія 2 роки, сервісний центр, швидка доставка по всій Україні.",
  keywords: ['ausom ukraine', 'ausom офіційний дилер', 'про ausom', 'дистриб ютор ausom україна'],
  alternates: { canonical: SITE_URL + '/about' },
  openGraph: {
    title: 'Про нас — Ausom Ukraine',
    description:
      "Офіційний дистриб'ютор електросамокатів Ausom та Kukirin в Україні з гарантією та сервісом.",
    url: SITE_URL + '/about',
    siteName: 'Ausom Ukraine',
    locale: 'uk_UA',
    type: 'website',
    images: [{ url: SITE_URL + '/og-image.jpg', width: 1200, height: 630, alt: 'Ausom Ukraine' }],
  },
}

export default function AboutPage() {
  const stats = [
    { num: '50K+', label: 'Клієнтів по світу' },
    { num: '2026', label: 'Рік заснування UA' },
    { num: '13', label: 'Моделей в каталозі' },
    { num: '4.9', label: 'Рейтинг клієнтів' },
  ]
  const values = [
    { emoji: 'quality', title:'Якість без компромісів', desc:'Кожна модель Ausom — результат сотень годин інженерної роботи та тестувань у реальних умовах.' },
    { emoji: 'support', title:'Повна підтримка', desc:'Офіційна гарантія 2 роки, сервісний центр в Україні та команда підтримки, яка відповідає швидко.' },
    { emoji: 'honest', title:'Чесно і прозоро', desc:'Ніяких прихованих умов. Ціна — це ціна. Гарантія — це гарантія. Повернення — без питань.' },
  ]
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'#111', padding:'72px 0' }}>
        <div className="w-container">
          <div style={{ display:'inline-block', fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#F5C200', background:'rgba(245,194,0,.12)', border:'1px solid rgba(245,194,0,.25)', padding:'5px 14px', borderRadius:4, marginBottom:24 }}>
            Про компанію
          </div>
          <h1 style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:800, letterSpacing:'-.03em', color:'#fff', lineHeight:1.05, maxWidth:700, marginBottom:20 }}>
            Ми веземо <span style={{ color:'#F5C200' }}>майбутнє</span> до тебе
          </h1>
          <p style={{ fontSize:16, color:'rgba(255,255,255,.6)', lineHeight:1.7, maxWidth:560 }}>
            Ausom Ukraine — офіційний дистриб&apos;ютор бренду Ausom в Україні. Ми віримо, що електромобільність — це не майбутнє, це вже сьогодення.
          </p>
        </div>
      </div>
      <div style={{ background:'var(--bg)', padding:'72px 0', borderBottom:'1px solid var(--border)' }}>
        <div className="w-container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'start' }}>
            <div>
              <div className="s-label">Наша місія</div>
              <h2 style={{ fontSize:'clamp(28px,3vw,40px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:20, lineHeight:1.1 }}>
                Чому ми <span style={{ color:'var(--yellow-dark)' }}>тут</span>
              </h2>
              <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.75, marginBottom:16 }}>
                Ausom Ukraine з&apos;явився, тому що ми самі були незадоволені тим, що є на ринку. Занадто дорого, занадто слабко, занадто ненадійно. Ми знайшли Ausom — і зрозуміли: ось воно.
              </p>
              <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.75, marginBottom:28 }}>
                Тепер ми приносимо ці самокати прямо в Україну з офіційною гарантією, сервісом та командою, яка сама їздить на цих самокатах щодня.
              </p>
              <Link href="/catalog" className="btn btn-black">Дивитись самокати</Link>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {stats.map(s => (
                <div key={s.label} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:12, padding:'28px 24px', textAlign:'center' }}>
                  <div style={{ fontSize:38, fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1, marginBottom:8 }}>{s.num}</div>
                  <div style={{ fontSize:12, color:'var(--text-3)', fontWeight:500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ background:'var(--bg-soft)', padding:'72px 0' }}>
        <div className="w-container">
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <div className="s-label" style={{ justifyContent:'center' }}>Наші цінності</div>
            <h2 style={{ fontSize:'clamp(28px,3vw,40px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)' }}>
              Що нас <span style={{ color:'var(--yellow-dark)' }}>відрізняє</span>
            </h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
            {values.map(v => (
              <div key={v.title} style={{ background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12, padding:'32px 28px' }}>
                <div style={{ fontSize:32, marginBottom:16 }}>{v.emoji}</div>
                <h3 style={{ fontSize:17, fontWeight:700, letterSpacing:'-.01em', color:'var(--text)', marginBottom:10 }}>{v.title}</h3>
                <p style={{ fontSize:14, color:'var(--text-3)', lineHeight:1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
