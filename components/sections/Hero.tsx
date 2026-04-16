'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Gauge, Battery, Weight } from 'lucide-react'
import { fetchAllProducts } from '@/lib/data'
import { Product } from '@/lib/types'

const CDN = 'https://pl.ausomstore.com/cdn/shop/files'

// Four hero slides — one for each Ausom model. Each slide uses a lifestyle
// landscape photo that we already ship in product.images, chosen because it
// crops well at 1920×520. If you want to replace any banner image later,
// swap the `banner` URL here (or migrate Hero to read from the `banners`
// table in Supabase, which the admin page already supports).
const SLIDES = [
  {
    slug:     'dt2-pro',
    eyebrow:  'Флагман 2026',
    headline: 'Ausom DT2 Pro',
    sub:      'Подвійний мотор 2×800W, 70 км, 65 км/год. Для міста та бездоріжжя.',
    // Real DT2 Pro lifestyle photo, no watermark
    banner:   `${CDN}/DT2_Pro.jpg?v=1767606498`,
    position: 'center 40%',
    cta:      '/product/dt2-pro',
  },
  {
    slug:     'l2-max-dual',
    eyebrow:  'Хіт продажів',
    headline: 'Ausom L2 Max',
    sub:      '85 км на одному заряді. Dual Motor, 960 Wh.',
    banner:   `${CDN}/Gosoul_2_pro1800X1000_ad23b595-61fb-4c72-88cf-ec2be4688b74.jpg?v=1774003576`,
    position: 'center 45%',
    cta:      '/product/l2-max-dual',
  },
  {
    slug:     'l2-dual',
    eyebrow:  'Популярний вибір',
    headline: 'Ausom L2 Dual',
    sub:      'Баланс потужності та автономності для щоденних поїздок.',
    banner:   `${CDN}/800_1200-wuzi.jpg?v=1772768149`,
    position: 'center 35%',
    cta:      '/product/l2-dual',
  },
  {
    slug:     'l1',
    eyebrow:  'Міський вибір',
    headline: 'Ausom L1',
    sub:      'Легкий 20-кг самокат для щоденних поїздок містом.',
    banner:   `${CDN}/l1-max-page-mobile.jpg?v=1765511227`,
    position: 'center 35%',
    cta:      '/product/l1',
  },
]

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([])
  const [cur,  setCur]  = useState(0)
  const [anim, setAnim] = useState(false)

  useEffect(() => {
    fetchAllProducts().then(setProducts).catch(() => {})
  }, [])

  const go = useCallback((n: number) => {
    if (anim) return
    setAnim(true)
    setTimeout(() => { setCur((n + SLIDES.length) % SLIDES.length); setAnim(false) }, 250)
  }, [anim])

  useEffect(() => {
    const t = setInterval(() => go(cur + 1), 6000)
    return () => clearInterval(t)
  }, [cur, go])

  const slide   = SLIDES[cur]
  const product = products.find(p => p.slug === slide.slug)
  const disc    = product?.old_price ? Math.round((product.old_price - product.price) / product.old_price * 100) : 0

  return (
    <section style={{ background:'var(--bg)', borderBottom:'1px solid var(--border)' }}>

      {/* Full-width banner */}
      <div className="hero-banner" style={{ position:'relative', width:'100%', overflow:'hidden' }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            position:'absolute', inset:0,
            opacity: i === cur ? 1 : 0,
            transition:'opacity .6s ease',
            pointerEvents: i === cur ? 'auto' : 'none',
          }}>
            {/* Layer 1: the lifestyle product photo */}
            <Image
              src={s.banner}
              alt={s.headline}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit:'cover', objectPosition: s.position }}
            />

            {/* Layer 2: premium SVG overlay — replaces the old plain linear gradient
                with a designed composition (dark gradient, yellow spark, grain, vignette,
                corner bracket, top accent bar). File lives in /public/banners/ so Next
                serves it as a static asset; no Image optimization needed. */}
            <div
              aria-hidden="true"
              style={{
                position:'absolute', inset:0,
                backgroundImage: 'url(/banners/hero-overlay.svg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                pointerEvents: 'none',
              }}
            />

            {/* Layer 3: text content, animated per slide */}
            <div style={{
              position:'absolute', inset:0, display:'flex', flexDirection:'column',
              justifyContent:'center', padding:'0 clamp(20px,6%,80px)',
              maxWidth:700,
              opacity: i === cur && !anim ? 1 : 0,
              transform: i === cur && !anim ? 'translateX(0)' : 'translateX(-24px)',
              transition:'opacity .5s .15s ease, transform .5s .15s ease',
            }}>
              <span style={{ fontSize:'clamp(10px,2vw,12px)', fontWeight:700, letterSpacing:'.14em', textTransform:'uppercase' as const, color:'#F5C200', marginBottom:14, display:'block' }}>
                {s.eyebrow}
              </span>
              <h1 style={{ fontSize:'clamp(32px,5.5vw,76px)', fontWeight:800, color:'#fff', letterSpacing:'-.03em', lineHeight:1.0, marginBottom:14, textShadow:'0 2px 12px rgba(0,0,0,.3)' }}>
                {s.headline}
              </h1>
              <p style={{ fontSize:'clamp(13px,1.6vw,17px)', color:'rgba(255,255,255,.82)', maxWidth:440, lineHeight:1.65, marginBottom:24 }}>
                {s.sub}
              </p>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <Link href={s.cta} style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'#F5C200', color:'#111',
                  fontSize:'clamp(12px,1.3vw,13px)', fontWeight:800, letterSpacing:'.06em', textTransform:'uppercase' as const,
                  padding:'13px 24px', borderRadius:7, textDecoration:'none',
                }}>
                  Купити зараз <ArrowRight size={15}/>
                </Link>
                <Link href="/catalog" style={{
                  display:'inline-flex', alignItems:'center',
                  background:'rgba(255,255,255,.12)', color:'#fff',
                  fontSize:'clamp(12px,1.3vw,13px)', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase' as const,
                  padding:'13px 22px', borderRadius:7, textDecoration:'none',
                  border:'1.5px solid rgba(255,255,255,.35)', backdropFilter:'blur(6px)',
                }}>
                  Всі моделі
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls */}
        <div style={{ position:'absolute', bottom:16, left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:8, zIndex:10 }}>
          <button onClick={() => go(cur-1)} aria-label="Попередній слайд" style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,.35)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.2)', borderRadius:7, cursor:'pointer', color:'#fff' }}>
            <ChevronLeft size={14}/>
          </button>
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Слайд ${i+1}`} style={{ height:3, borderRadius:2, border:'none', cursor:'pointer', transition:'all .3s', width: i===cur ? 28 : 8, background: i===cur ? '#F5C200' : 'rgba(255,255,255,.5)' }}/>
          ))}
          <button onClick={() => go(cur+1)} aria-label="Наступний слайд" style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,.35)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.2)', borderRadius:7, cursor:'pointer', color:'#fff' }}>
            <ChevronRight size={14}/>
          </button>
        </div>
      </div>

      {/* Product strip */}
      {product && (
        <div className="w-container hero-strip-wrap">
          <div className="hero-product-strip" style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:32, alignItems:'center' }}>

            <div className="hero-product-strip-top" style={{ display:'contents' }}>
              <div className="hero-product-thumb" style={{ width:100, height:100, background:'#F8F8F8', borderRadius:12, border:'1.5px solid var(--border)', position:'relative', overflow:'hidden', flexShrink:0 }}>
                {product.images?.[0] && (
                  <Image src={product.images[0]} alt={product.name} fill sizes="100px" style={{ objectFit:'contain', padding:8 }}/>
                )}
              </div>
              <div style={{ minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, flexWrap:'wrap' }}>
                  <span className="hero-product-name" style={{ fontSize:17, fontWeight:800, color:'var(--text)', letterSpacing:'-.02em' }}>{product.name}</span>
                  {product.tag && <span style={{ fontSize:10, fontWeight:800, background:'#F5C200', color:'#111', padding:'3px 8px', borderRadius:4, textTransform:'uppercase' as const, letterSpacing:'.06em' }}>{product.tag}</span>}
                </div>
                <div className="hero-product-specs" style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
                  {[
                    { Icon:Gauge,   v:`${product.max_speed} км/год`, l:'Швидкість' },
                    { Icon:Zap,     v:`${product.range_km} км`,       l:'Запас ходу' },
                    { Icon:Battery, v:`${product.battery_wh} Wh`,     l:'Акумулятор' },
                    { Icon:Weight,  v:`${product.weight_kg} кг`,      l:'Вага' },
                  ].map(({ v, l }) => (
                    <div key={l}>
                      <div style={{ fontSize:15, fontWeight:700, color:'var(--text)', letterSpacing:'-.01em' }}>{v}</div>
                      <div style={{ fontSize:10, fontWeight:600, letterSpacing:'.07em', textTransform:'uppercase' as const, color:'var(--text-4)' }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-product-price" style={{ textAlign:'right', flexShrink:0 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'flex-end', marginBottom:10, flexWrap:'wrap' }}>
                {disc > 0 && <span style={{ background:'#F5C200', color:'#111', fontSize:11, fontWeight:800, padding:'3px 8px', borderRadius:4 }}>−{disc}%</span>}
                <span className="price-amount" style={{ fontSize:28, fontWeight:800, color:'var(--text)', letterSpacing:'-.025em', lineHeight:1 }}>₴{product.price.toLocaleString('uk-UA')}</span>
                {product.old_price && <span className="price-old" style={{ fontSize:14, color:'var(--text-4)', textDecoration:'line-through' }}>₴{product.old_price.toLocaleString('uk-UA')}</span>}
              </div>
              <div className="hero-product-cta-row" style={{ display:'flex', gap:8, justifyContent:'flex-end', flexWrap:'wrap' }}>
                <Link href={slide.cta} style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#111', color:'#fff', fontSize:12, fontWeight:700, letterSpacing:'.05em', textTransform:'uppercase' as const, padding:'11px 22px', borderRadius:6, textDecoration:'none' }}>
                  <ArrowRight size={14}/> Купити
                </Link>
                <Link href="/catalog" style={{ display:'inline-flex', alignItems:'center', gap:6, background:'transparent', color:'var(--text)', fontSize:12, fontWeight:600, padding:'11px 18px', borderRadius:6, textDecoration:'none', border:'1.5px solid var(--border-md)' }}>
                  Каталог
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div style={{ borderTop:'1px solid var(--border)', background:'var(--bg-soft)' }}>
        <div className="w-container hero-stats">
          {[['50K+','Задоволених клієнтів'],['#1','Бренд для дорослих'],['2Y','Офіційна гарантія'],['4.9★','Середній рейтинг']].map(([v,l],i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'18px 12px', borderRight: i<3 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize:'clamp(20px,2.8vw,24px)', fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>{v}</span>
              <span style={{ fontSize:11, color:'var(--text-3)', textAlign:'center' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
