'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const CDN = 'https://pl.ausomstore.com/cdn/shop/files'
const CATS = ['Всі','Огляди','Гід покупця','Порівняння','Поради']

const POSTS = [
  {
    slug:'best-scooters-heavy-adults-2026', cat:'Огляди', date:'30 берез. 2026', read:6, featured:true,
    title:'Найкращі електросамокати для важких дорослих у 2026',
    excerpt:'Шукаєш самокат з великим навантаженням? Гід по топ-моделях з подвійним мотором та посиленою рамою.',
    image:`${CDN}/DT2_Pro.jpg?v=1767606498`,
  },
  {
    slug:'10-features-buying-scooter', cat:'Гід покупця', date:'30 берез. 2026', read:8, featured:false,
    title:'10 ключових характеристик при виборі електросамоката',
    excerpt:'Від потужності мотора до системи безпеки — все що потрібно знати перед покупкою.',
    image:`${CDN}/l2-max-dual-detail-page-mobile.jpg?v=1765511614`,
  },
  {
    slug:'best-adult-scooter-2026-guide', cat:'Порівняння', date:'30 берез. 2026', read:10, featured:false,
    title:'Найкращий електросамокат для дорослих 2026: повний гід',
    excerpt:'Порівнюємо потужність, запас ходу та портативність. Чому Ausom — вибір №1.',
    image:`${CDN}/800_1200-wuzi.jpg?v=1772768149`,
  },
  {
    slug:'dt2-pro-review', cat:'Огляди', date:'15 берез. 2026', read:12, featured:false,
    title:'DT2 Pro: детальний огляд позашляхового самоката',
    excerpt:'Тестуємо флагман позашляхової лінійки — реальний запас ходу та підвіска.',
    image:`${CDN}/DT2_Pro.jpg?v=1767606498`,
  },
  {
    slug:'city-commuter-guide', cat:'Поради', date:'10 берез. 2026', read:7, featured:false,
    title:'Як обрати міський самокат для щоденних поїздок',
    excerpt:'Всі нюанси вибору міського самоката для роботи та навчання.',
    image:`${CDN}/k20_pro_listing_800_1000_m.jpg?v=1774004078`,
  },
  {
    slug:'e-scooter-maintenance-tips', cat:'Поради', date:'5 берез. 2026', read:5, featured:false,
    title:'Догляд за електросамокатом: 8 важливих порад',
    excerpt:'Як продовжити термін служби акумулятора та зберегти самокат у відмінному стані.',
    image:`${CDN}/l1-max-page-mobile.jpg?v=1765511227`,
  },
]

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState('Всі')
  const featured  = POSTS.find(p => p.featured)!
  const secondary = POSTS.filter(p => !p.featured && (activeCat === 'Всі' || p.cat === activeCat))

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      {/* Header */}
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'clamp(28px,4vw,48px) 0 clamp(24px,3vw,36px)', textAlign:'center' }}>
        <div className="w-container">
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'var(--yellow-dark)', marginBottom:14 }}>Блог</div>
          <h1 style={{ fontSize:'clamp(28px,5vw,58px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', marginBottom:10, lineHeight:1.05 }}>
            Поради та <span style={{ color:'var(--yellow-dark)' }}>огляди</span>
          </h1>
          <p style={{ fontSize:'clamp(13px,1.5vw,15px)', color:'var(--text-3)' }}>Все про електросамокати — від вибору до обслуговування</p>
        </div>
      </div>

      <div className="w-container blog-inner">
        {/* Category pills — horizontally scrollable on mobile via .blog-cats */}
        <div className="blog-cats" style={{ marginBottom:32 }}>
          {CATS.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{
              padding:'8px 20px', fontSize:13, fontWeight:600,
              borderRadius:20, border:'1.5px solid', cursor:'pointer', transition:'all .15s',
              background: activeCat===c ? '#F5C200' : 'transparent',
              borderColor: activeCat===c ? '#F5C200' : 'var(--border-md)',
              color: activeCat===c ? '#111' : 'var(--text-3)',
              whiteSpace:'nowrap',
            }}>{c}</button>
          ))}
        </div>

        {/* Featured post */}
        {(activeCat === 'Всі' || activeCat === featured.cat) && (
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration:'none', display:'block', marginBottom:28 }}>
            <div
              className="blog-featured-grid"
              style={{
                background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:16, overflow:'hidden',
                transition:'transform .2s, box-shadow .2s',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-3px)';(e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-xl)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='none';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
              {/* Image */}
              <div style={{ position:'relative', minHeight:320, background:'var(--bg-subtle)', overflow:'hidden' }}>
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width:900px) 100vw, 50vw"
                  style={{ objectFit:'cover', objectPosition:'center' }}
                />
              </div>
              {/* Text */}
              <div style={{ padding:'clamp(24px,4vw,40px)', display:'flex', flexDirection:'column', justifyContent:'center', gap:14 }}>
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--yellow-dark)', background:'#FFF3CC', border:'1px solid #F5C200', padding:'4px 10px', borderRadius:4, width:'fit-content' }}>
                  {featured.cat}
                </span>
                <h2 style={{ fontSize:'clamp(20px,2.5vw,32px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', lineHeight:1.2 }}>
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
        <div className="blog-grid" style={{ marginBottom:48 }}>
          {secondary.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration:'none' }}>
              <div style={{
                background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12,
                overflow:'hidden', display:'flex', flexDirection:'column',
                transition:'transform .2s, box-shadow .2s', height:'100%',
              }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.transform='translateY(-4px)';(e.currentTarget as HTMLElement).style.boxShadow='var(--shadow-lg)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.transform='none';(e.currentTarget as HTMLElement).style.boxShadow='none'}}>
                {/* Real photo */}
                <div style={{ position:'relative', height:200, background:'var(--bg-subtle)', overflow:'hidden' }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    style={{ objectFit:'cover', objectPosition:'center' }}
                  />
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

        {/* Newsletter */}
        <div
          className="blog-newsletter"
          style={{
            background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:16,
            padding:'40px 48px', position:'relative',
          }}>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:3, background:'#F5C200', borderRadius:'8px 0 0 8px' }}/>
          <div>
            <h3 style={{ fontSize:'clamp(20px,3vw,26px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)', marginBottom:6 }}>Будь у курсі</h3>
            <p style={{ fontSize:14, color:'var(--text-3)' }}>Нові статті, огляди та знижки — першим.</p>
          </div>
          <form style={{ display:'flex', gap:10 }} onSubmit={e=>e.preventDefault()}>
            <input type="email" required placeholder="твій@email.com" aria-label="Email для розсилки" style={{
              flex:1, minWidth:0, padding:'12px 16px', background:'var(--bg)', border:'1.5px solid var(--border)',
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
