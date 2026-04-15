'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Gauge, Battery, Weight } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'

const CDN = 'https://pl.ausomstore.com/cdn/shop/files'

// Hero banner slides — full-width lifestyle photos from official site
const SLIDES = [
  {
    slug:     'dt2-pro',
    eyebrow:  'Флагман 2026',
    headline: 'Ausom DT2 Pro',
    sub:      'Для міста та бездоріжжя. Подвійний мотор 2×800W, 70 км, 65 км/год.',
    banner:   `${CDN}/DT2_Pro.jpg?v=1767606498`,
    cta:      '/product/dt2-pro',
  },
  {
    slug:     'l2-max-dual',
    eyebrow:  'Хіт продажів',
    headline: 'Ausom L2 Max',
    sub:      '85 км на одному заряді — найдальший у класі. Dual Motor.',
    banner:   `${CDN}/l2-max-dual-detail-page-mobile.jpg?v=1765511614`,
    cta:      '/product/l2-max-dual',
  },
  {
    slug:     'l2-dual',
    eyebrow:  'Популярний вибір',
    headline: 'Ausom L2 Dual',
    sub:      'Баланс потужності та автономності для щоденних поїздок.',
    banner:   `${CDN}/800_1200-wuzi.jpg?v=1772768149`,
    cta:      '/product/l2-dual',
  },
]

export default function Hero() {
  const [cur,  setCur]  = useState(0)
  const [anim, setAnim] = useState(false)

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
  const product = PRODUCTS.find(p => p.slug === slide.slug)!
  const disc    = product.old_price ? Math.round((product.old_price - product.price) / product.old_price * 100) : 0

  return (
    <section style={{ background:'var(--bg)', borderBottom:'1px solid var(--border)' }}>

      {/* ── Full-width banner ── */}
      <div style={{ position:'relative', width:'100%', aspectRatio:'16/6', overflow:'hidden', minHeight:320 }}>
        {SLIDES.map((s, i) => (
          <div key={i} style={{
            position:'absolute', inset:0,
            opacity: i === cur ? 1 : 0,
            transition: 'opacity .6s ease',
            pointerEvents: i === cur ? 'auto' : 'none',
          }}>
            <Image
              src={s.banner}
              alt={s.headline}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectFit:'cover', objectPosition:'center' }}
            />
            {/* Gradient overlay */}
            <div style={{
              position:'absolute', inset:0,
              background:'linear-gradient(to right, rgba(0,0,0,.65) 0%, rgba(0,0,0,.25) 55%, transparent 100%)',
            }}/>
            {/* Text overlay */}
            <div style={{
              position:'absolute', inset:0, display:'flex', flexDirection:'column',
              justifyContent:'center', padding:'0 6%',
              opacity: i === cur && !anim ? 1 : 0,
              transform: i === cur && !anim ? 'translateX(0)' : 'translateX(-20px)',
              transition: 'opacity .5s .15s ease, transform .5s .15s ease',
            }}>
              <span style={{ fontSize:12, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#F5C200', marginBottom:12, display:'block' }}>
                {s.eyebrow}
              </span>
              <h2 style={{ fontSize:'clamp(36px,5vw,72px)', fontWeight:800, color:'#fff', letterSpacing:'-.03em', lineHeight:1.0, marginBottom:12 }}>
                {s.headline}
              </h2>
              <p style={{ fontSize:'clamp(14px,1.5vw,17px)', color:'rgba(255,255,255,.8)', maxWidth:440, lineHeight:1.6, marginBottom:24 }}>
                {s.sub}
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <Link href={s.cta} style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'#F5C200', color:'#111',
                  fontSize:13, fontWeight:800, letterSpacing:'.05em', textTransform:'uppercase' as const,
                  padding:'13px 28px', borderRadius:6, textDecoration:'none',
                  transition:'background .15s',
                }}>
                  Купити зараз <ArrowRight size={15}/>
                </Link>
                <Link href="/catalog" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  background:'rgba(255,255,255,.15)', color:'#fff',
                  fontSize:13, fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase' as const,
                  padding:'13px 28px', borderRadius:6, textDecoration:'none',
                  border:'1.5px solid rgba(255,255,255,.4)',
                  backdropFilter:'blur(4px)',
                }}>
                  Всі моделі
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Slider controls overlay */}
        <div style={{ position:'absolute', bottom:16, left:'50%', transform:'translateX(-50%)', display:'flex', alignItems:'center', gap:10, zIndex:10 }}>
          <button onClick={() => go(cur-1)} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,.4)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.2)', borderRadius:6, cursor:'pointer', color:'#fff' }}>
            <ChevronLeft size={14}/>
          </button>
          {SLIDES.map((_,i) => (
            <button key={i} onClick={() => go(i)} style={{ height:3, borderRadius:2, border:'none', cursor:'pointer', transition:'all .3s', width: i===cur ? 28 : 8, background: i===cur ? '#F5C200' : 'rgba(255,255,255,.5)' }}/>
          ))}
          <button onClick={() => go(cur+1)} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(0,0,0,.4)', backdropFilter:'blur(8px)', border:'1px solid rgba(255,255,255,.2)', borderRadius:6, cursor:'pointer', color:'#fff' }}>
            <ChevronRight size={14}/>
          </button>
        </div>
      </div>

      {/* ── Product detail strip below banner ── */}
      <div className="w-container" style={{ padding:'40px 40px 48px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'auto 1fr auto', gap:40, alignItems:'center' }}>

          {/* Product thumbnail */}
          <div style={{ width:120, height:120, background:'#F8F8F8', borderRadius:14, border:'1.5px solid var(--border)', position:'relative', overflow:'hidden', flexShrink:0 }}>
            {product.images?.[0] && (
              <Image src={product.images[0]} alt={product.name} fill sizes="120px" style={{ objectFit:'contain', padding:8 }}/>
            )}
          </div>

          {/* Specs */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8, flexWrap:'wrap' }}>
              <span style={{ fontSize:18, fontWeight:800, color:'var(--text)', letterSpacing:'-.02em' }}>{product.name}</span>
              {product.tag && <span style={{ fontSize:10, fontWeight:800, background:'#F5C200', color:'#111', padding:'3px 8px', borderRadius:4, textTransform:'uppercase' as const, letterSpacing:'.06em' }}>{product.tag}</span>}
            </div>
            <div style={{ display:'flex', gap:20, flexWrap:'wrap' }}>
              {[
                { Icon:Gauge,   v:`${product.max_speed} км/год`, l:'Швидкість' },
                { Icon:Zap,     v:`${product.range_km} км`,       l:'Запас ходу' },
                { Icon:Battery, v:`${product.battery_wh} Wh`,     l:'Акумулятор' },
                { Icon:Weight,  v:`${product.weight_kg} кг`,      l:'Вага' },
              ].map(({Icon, v, l}) => (
                <div key={l} style={{ display:'flex', flexDirection:'column', gap:2 }}>
                  <span style={{ fontSize:15, fontWeight:700, color:'var(--text)', letterSpacing:'-.01em' }}>{v}</span>
                  <span style={{ fontSize:10, fontWeight:600, letterSpacing:'.07em', textTransform:'uppercase' as const, color:'var(--text-4)' }}>{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price + CTA */}
          <div style={{ textAlign:'right', flexShrink:0 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, justifyContent:'flex-end', marginBottom:12, flexWrap:'wrap' }}>
              {disc > 0 && <span style={{ background:'#F5C200', color:'#111', fontSize:11, fontWeight:800, padding:'3px 8px', borderRadius:4 }}>−{disc}%</span>}
              <span style={{ fontSize:28, fontWeight:800, color:'var(--text)', letterSpacing:'-.025em', lineHeight:1 }}>₴{product.price.toLocaleString('uk-UA')}</span>
              {product.old_price && <span style={{ fontSize:15, color:'var(--text-4)', textDecoration:'line-through', fontWeight:400 }}>₴{product.old_price.toLocaleString('uk-UA')}</span>}
            </div>
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end' }}>
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

      {/* Stats bar */}
      <div style={{ borderTop:'1px solid var(--border)', background:'var(--bg-soft)' }}>
        <div className="w-container" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[['50K+','Задоволених клієнтів'],['#1','Бренд для дорослих'],['2Y','Офіційна гарантія'],['4.9★','Середній рейтинг']].map(([v,l],i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'18px 16px', borderRight: i<3 ? '1px solid var(--border)' : 'none' }}>
              <span style={{ fontSize:24, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>{v}</span>
              <span style={{ fontSize:11, color:'var(--text-3)', textAlign:'center' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
