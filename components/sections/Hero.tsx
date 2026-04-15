'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ChevronLeft, ChevronRight, Gauge, Zap, Battery, Weight } from 'lucide-react'
import { PRODUCTS, BANNERS } from '@/lib/data'

const SLIDES = [
  {
    product: PRODUCTS[3], // DT2 Pro
    banner: BANNERS.hero3,
    dark: true,
    tagline: 'Флагман 2026',
  },
  {
    product: PRODUCTS[2], // L2 Max
    banner: BANNERS.lifestyle1,
    dark: true,
    tagline: 'Хіт продажів',
  },
  {
    product: PRODUCTS[1], // L2 Dual
    banner: BANNERS.lifestyle2,
    dark: false,
    tagline: 'Оптимальний вибір',
  },
]

export default function Hero() {
  const [idx,  setIdx]  = useState(0)
  const [anim, setAnim] = useState(false)

  const go = useCallback((n: number) => {
    if (anim) return
    setAnim(true)
    setTimeout(() => { setIdx((n + SLIDES.length) % SLIDES.length); setAnim(false) }, 220)
  }, [anim])

  useEffect(() => {
    const t = setInterval(() => go(idx + 1), 6500)
    return () => clearInterval(t)
  }, [idx, go])

  const slide = SLIDES[idx]
  const p     = slide.product
  const disc  = p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0

  const specs = [
    { Icon: Gauge,   val: `${p.max_speed} км/г`, label: 'Швидкість' },
    { Icon: Zap,     val: `${p.range_km} км`,    label: 'Запас ходу' },
    { Icon: Battery, val: `${p.battery_wh} Wh`,  label: 'Батарея' },
    { Icon: Weight,  val: `${p.weight_kg} кг`,   label: 'Вага' },
  ]

  return (
    <section style={{ position:'relative', overflow:'hidden', background:'#111' }}>

      {/* Background banner image */}
      <div style={{ position:'absolute', inset:0, opacity: anim ? 0 : 1, transition:'opacity .3s' }}>
        {slide.banner && (
          <Image
            src={slide.banner}
            alt="Ausom banner"
            fill
            priority
            sizes="100vw"
            style={{ objectFit:'cover', objectPosition:'center' }}
          />
        )}
        {/* Gradient overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,.85) 40%, rgba(0,0,0,.3) 100%)' }}/>
      </div>

      {/* Content */}
      <div className="w-container" style={{ position:'relative', zIndex:2 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:'calc(100vh - 100px)', alignItems:'center', gap:40, padding:'60px 0 40px' }}>

          {/* LEFT */}
          <div style={{ opacity: anim ? 0 : 1, transform: anim ? 'translateX(-12px)' : 'translateX(0)', transition:'opacity .22s, transform .22s' }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#F5C200', color:'#111', fontSize:11, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase' as const, padding:'5px 14px', borderRadius:4, marginBottom:20 }}>
              ⚡ {slide.tagline}
            </div>
            <h1 style={{ fontSize:'clamp(48px,6vw,80px)', fontWeight:800, lineHeight:1.0, letterSpacing:'-.03em', color:'#fff', marginBottom:16 }}>
              {p.name}
            </h1>
            <p style={{ fontSize:16, color:'rgba(255,255,255,.7)', lineHeight:1.7, maxWidth:440, marginBottom:28 }}>
              {p.description.slice(0, 110)}...
            </p>

            {/* Spec pills */}
            <div style={{ display:'flex', gap:0, marginBottom:28, border:'1px solid rgba(255,255,255,.15)', borderRadius:10, overflow:'hidden', width:'fit-content' }}>
              {specs.map(({ Icon, val, label }, i) => (
                <div key={label} style={{
                  padding:'14px 18px', textAlign:'center' as const,
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,.15)' : 'none',
                  background:'rgba(255,255,255,.06)',
                }}>
                  <Icon size={15} style={{ color:'#F5C200', display:'block', margin:'0 auto 5px' }}/>
                  <div style={{ fontSize:15, fontWeight:700, color:'#fff', lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:9, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'rgba(255,255,255,.45)', marginTop:3 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28, flexWrap:'wrap' }}>
              {disc > 0 && <span style={{ background:'#F5C200', color:'#111', fontSize:12, fontWeight:800, padding:'4px 10px', borderRadius:4 }}>−{disc}%</span>}
              <span style={{ fontSize:38, fontWeight:800, color:'#fff', letterSpacing:'-.025em', lineHeight:1 }}>₴{p.price.toLocaleString('uk-UA')}</span>
              {p.old_price && <span style={{ fontSize:18, color:'rgba(255,255,255,.4)', textDecoration:'line-through' }}>₴{p.old_price.toLocaleString('uk-UA')}</span>}
            </div>

            <div style={{ display:'flex', gap:12 }}>
              <Link href={`/product/${p.slug}`} className="btn btn-yellow btn-lg">Купити зараз <ArrowRight size={16}/></Link>
              <Link href="/catalog" className="btn" style={{ background:'transparent', border:'1.5px solid rgba(255,255,255,.35)', color:'#fff', padding:'17px 40px', fontSize:15 }}>Всі моделі</Link>
            </div>
          </div>

          {/* RIGHT — product image */}
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', opacity: anim ? 0 : 1, transform: anim ? 'scale(.96)' : 'scale(1)', transition:'opacity .22s, transform .22s' }}>
            {p.images?.[0] && (
              <div style={{ position:'relative', width:'100%', maxWidth:480, aspectRatio:'1' }}>
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  priority
                  sizes="50vw"
                  style={{ objectFit:'contain', filter:'drop-shadow(0 24px 48px rgba(0,0,0,.6))' }}
                />
                {/* Floating price card */}
                <div style={{
                  position:'absolute', bottom:'8%', left:'-6%',
                  background:'rgba(255,255,255,.95)', borderRadius:12,
                  padding:'12px 18px', boxShadow:'0 8px 32px rgba(0,0,0,.25)',
                  backdropFilter:'blur(12px)',
                  animation:'float 4s ease-in-out infinite',
                }}>
                  <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'#888', marginBottom:3 }}>від</div>
                  <div style={{ fontSize:22, fontWeight:800, color:'#111', letterSpacing:'-.02em', lineHeight:1 }}>₴{p.price.toLocaleString('uk-UA')}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Slider dots */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, paddingBottom:28, position:'relative', zIndex:2 }}>
          <button onClick={() => go(idx-1)} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)', borderRadius:6, cursor:'pointer', color:'#fff' }}><ChevronLeft size={14}/></button>
          <div style={{ display:'flex', gap:6 }}>
            {SLIDES.map((_,i) => (
              <button key={i} onClick={() => go(i)} style={{ height:3, borderRadius:2, border:'none', cursor:'pointer', transition:'all .3s', width: i===idx ? 28 : 8, background: i===idx ? '#F5C200' : 'rgba(255,255,255,.3)' }}/>
            ))}
          </div>
          <button onClick={() => go(idx+1)} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,.1)', border:'1px solid rgba(255,255,255,.2)', borderRadius:6, cursor:'pointer', color:'#fff' }}><ChevronRight size={14}/></button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ position:'relative', zIndex:2, borderTop:'1px solid rgba(255,255,255,.1)', background:'rgba(0,0,0,.5)', backdropFilter:'blur(12px)' }}>
        <div className="w-container" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[['50K+','Клієнтів'],['#1','Бренд'],['2Y','Гарантія'],['4.9★','Рейтинг']].map(([v,l],i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:3, padding:'18px 16px', borderRight: i<3 ? '1px solid rgba(255,255,255,.1)' : 'none' }}>
              <span style={{ fontSize:24, fontWeight:800, color:'#fff', letterSpacing:'-.02em' }}>{v}</span>
              <span style={{ fontSize:10, color:'rgba(255,255,255,.5)', textTransform:'uppercase' as const, letterSpacing:'.08em' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </section>
  )
}
