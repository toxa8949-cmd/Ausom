'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, BookOpen } from 'lucide-react'

const CATS = ['Всі','Огляди','Гід покупця','Порівняння','Поради']

const POSTS = [
  { slug:'best-scooters-heavy-adults-2026', cat:'Огляди',     date:'30 берез. 2026', read:6,  featured:true,
    title:'Найкращі електросамокати для важких дорослих у 2026',
    excerpt:'Шукаєш самокат з великим навантаженням? Гід по топ-моделях з подвійним мотором та посиленою рамою.' },
  { slug:'10-features-buying-scooter', cat:'Гід покупця', date:'30 берез. 2026', read:8,  featured:false,
    title:'10 ключових характеристик при виборі електросамоката',
    excerpt:'Від потужності мотора до системи безпеки — все що потрібно знати перед покупкою.' },
  { slug:'best-adult-scooter-2026-guide', cat:'Порівняння', date:'30 берез. 2026', read:10, featured:false,
    title:'Найкращий електросамокат для дорослих 2026: повний гід',
    excerpt:'Порівнюємо потужність, запас ходу та портативність. Чому Ausom — вибір №1.' },
  { slug:'dt2-pro-review', cat:'Огляди', date:'15 берез. 2026', read:12, featured:false,
    title:'DT2 Pro: детальний огляд позашляхового самоката',
    excerpt:'Тестуємо флагман позашляхової лінійки — реальний запас ходу та підвіска.' },
  { slug:'city-commuter-guide', cat:'Поради', date:'10 берез. 2026', read:7, featured:false,
    title:'Як обрати міський самокат для щоденних поїздок',
    excerpt:'Всі нюанси вибору міського самоката для роботи та навчання.' },
  { slug:'e-scooter-maintenance-tips', cat:'Поради', date:'5 берез. 2026', read:5, featured:false,
    title:'Догляд за електросамокатом: 8 важливих порад',
    excerpt:'Як продовжити термін служби акумулятора та зберегти самокат у відмінному стані.' },
]

const ScooterThumb = () => (
  <svg viewBox="0 0 120 90" fill="none" width="60" height="45" style={{ opacity:.2 }}>
    <circle cx="22" cy="72" r="16" stroke="#F5C200" strokeWidth="4"/>
    <circle cx="98" cy="72" r="16" stroke="#F5C200" strokeWidth="4"/>
    <path d="M22 72L38 28L76 20L98 72" stroke="#111" strokeWidth="5" strokeLinecap="round"/>
    <path d="M38 28L48 8" stroke="#F5C200" strokeWidth="4" strokeLinecap="round"/>
    <rect x="42" y="2" width="20" height="10" rx="2.5" fill="#F5C200"/>
  </svg>
)

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('Всі')
  const featured  = POSTS.find(p => p.featured)!
  const secondary = POSTS.filter(p => !p.featured && (activeCat === 'Всі' || p.cat === activeCat))

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Header */}
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'48px 0 40px', textAlign:'center' }}>
        <div className="w-container">
          <div style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--yellow-dark)', marginBottom:16 }}>
            <BookOpen size={13}/> Блог
          </div>
          <h1 style={{ fontSize:'clamp(36px,5vw,60px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:10, lineHeight:1.05 }}>
            Поради та <span style={{ color:'var(--yellow-dark)' }}>огляди</span>
          </h1>
          <p style={{ fontSize:15, color:'var(--text-3)' }}>Все про електросамокати — від вибору до обслуговування</p>
        </div>
      </div>

      <div className="w-container" style={{ padding:'40px 40px 80px' }}>

        {/* Category filter */}
        <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', justifyContent:'center', marginBottom:40 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{
              padding:'8px 20px', fontSize:13, fontWeight:600, letterSpacing:'-.01em',
              borderRadius:20, border:'1.5px solid', cursor:'pointer', transition:'all .15s',
              background: activeCat===c ? '#F5C200' : 'transparent',
              borderColor: activeCat===c ? '#F5C200' : 'var(--border-md)',
              color: activeCat===c ? '#111' : 'var(--text-3)',
            }}>
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {(activeCat === 'Всі' || activeCat === featured.cat) && (
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration:'none', display:'block', marginBottom:32 }}>
            <div style={{
              display:'grid', gridTemplateColumns:'1fr 1fr',
              background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:16, overflow:'hidden',
              transition:'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-xl)'}}
            onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='none';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
              <div style={{ background:'var(--bg-subtle)', display:'flex', alignItems:'center', justifyContent:'center', minHeight:280 }}>
                <ScooterThumb/>
              </div>
              <div style={{ padding:'40px 40px', display:'flex', flexDirection:'column', justifyContent:'center', gap:14 }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--yellow-dark)', background:'#FFF3CC', border:'1px solid #F5C200', padding:'4px 10px', borderRadius:4, width:'fit-content' }}>
                  {featured.cat}
                </span>
                <h2 style={{ fontSize:'clamp(22px,2.5vw,32px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', lineHeight:1.2 }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize:14, color:'var(--text-3)', lineHeight:1.7 }}>{featured.excerpt}</p>
                <div style={{ fontSize:12, color:'var(--text-4)', display:'flex', gap:12 }}>
                  <span>{featured.date}</span><span>·</span><span>{featured.read} хв читання</span>
                </div>
                <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:13, fontWeight:700, color:'var(--text)' }}>
                  Читати статтю <ArrowRight size={14}/>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:48 }}>
          {secondary.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration:'none' }}>
              <div style={{
                background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12,
                overflow:'hidden', display:'flex', flexDirection:'column',
                transition:'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-lg)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='none';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
                <div style={{ background:'var(--bg-subtle)', height:160, display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
                  <ScooterThumb/>
                  <span style={{ position:'absolute', bottom:10, right:10, background:'#F5C200', color:'#111', fontSize:9, fontWeight:800, padding:'3px 7px', borderRadius:3 }}>{post.read} хв</span>
                </div>
                <div style={{ padding:'18px', flex:1, display:'flex', flexDirection:'column', gap:10 }}>
                  <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--yellow-dark)' }}>{post.cat}</span>
                  <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)', lineHeight:1.35, letterSpacing:'-.01em' }}>{post.title}</h3>
                  <p style={{ fontSize:13, color:'var(--text-3)', lineHeight:1.6, flex:1 }}>{post.excerpt}</p>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:12, borderTop:'1px solid var(--border)', fontSize:11, color:'var(--text-4)' }}>
                    <span>{post.date}</span>
                    <span style={{ color:'var(--yellow-dark)', fontWeight:700 }}>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter callout */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr', alignItems:'center', gap:40,
          background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:16,
          padding:'40px 48px', position:'relative',
        }}>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'#F5C200', borderRadius:'8px 0 0 8px' }}/>
          <div>
            <h3 style={{ fontSize:28, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', marginBottom:6 }}>Будь у курсі</h3>
            <p style={{ fontSize:14, color:'var(--text-3)' }}>Нові статті, огляди та знижки — першим.</p>
          </div>
          <form style={{ display:'flex', gap:10 }} onSubmit={e=>e.preventDefault()}>
            <input type="email" required placeholder="твій@email.com" style={{
              flex:1, padding:'12px 16px', background:'var(--bg)', border:'1.5px solid var(--border)',
              borderRadius:8, fontSize:14, color:'var(--text)', outline:'none', fontFamily:'Inter,sans-serif',
              transition:'border-color .15s',
            }}
            onFocus={e=>(e.target.style.borderColor='#F5C200')}
            onBlur={e=>(e.target.style.borderColor='var(--border)')}/>
            <button type="submit" className="btn btn-yellow">Підписатися</button>
          </form>
        </div>
      </div>
    </div>
  )
}
