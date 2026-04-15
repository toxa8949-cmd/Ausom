'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Gauge, Battery, Weight } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'

const ScooterSVG = ({ color = '#F5C200' }: { color?: string }) => (
  <svg viewBox="0 0 400 340" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
    {/* Rear wheel */}
    <circle cx="90" cy="268" r="62" stroke={color} strokeWidth="12"/>
    <circle cx="90" cy="268" r="42" stroke={color} strokeWidth="3" opacity=".3"/>
    <circle cx="90" cy="268" r="8" fill={color}/>
    {/* Front wheel */}
    <circle cx="310" cy="268" r="62" stroke={color} strokeWidth="12"/>
    <circle cx="310" cy="268" r="42" stroke={color} strokeWidth="3" opacity=".3"/>
    <circle cx="310" cy="268" r="8" fill={color}/>
    {/* Frame */}
    <path d="M90 268 L140 120 L260 95 L310 268" stroke="var(--text)" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
    {/* Stem */}
    <path d="M140 120 L180 42" stroke={color} strokeWidth="11" strokeLinecap="round"/>
    {/* Handlebar */}
    <rect x="165" y="24" width="66" height="32" rx="9" fill={color}/>
    <rect x="178" y="32" width="40" height="16" rx="4" fill="#111" opacity=".25"/>
    {/* Rear arm */}
    <path d="M260 95 L318 148" stroke="var(--text-3)" strokeWidth="9" strokeLinecap="round"/>
    <rect x="307" y="136" width="46" height="24" rx="6" fill="var(--bg-subtle)" stroke="var(--border-md)" strokeWidth="2"/>
    {/* Footboard */}
    <rect x="100" y="258" width="200" height="18" rx="6" fill="var(--text)" opacity=".15"/>
    {/* Spokes */}
    {[0,60,120,180,240,300].map(a => (
      <line key={a} x1={90} y1={268}
        x2={90 + 52*Math.cos(a*Math.PI/180)}
        y2={268 + 52*Math.sin(a*Math.PI/180)}
        stroke={color} strokeWidth="2" opacity=".4"/>
    ))}
    {[0,60,120,180,240,300].map(a => (
      <line key={a+'f'} x1={310} y1={268}
        x2={310 + 52*Math.cos(a*Math.PI/180)}
        y2={268 + 52*Math.sin(a*Math.PI/180)}
        stroke={color} strokeWidth="2" opacity=".4"/>
    ))}
  </svg>
)

export default function Hero() {
  const products = PRODUCTS.filter(p => p.is_featured)
  const [idx,  setIdx]  = useState(0)
  const [anim, setAnim] = useState(false)

  const go = useCallback((n: number) => {
    if (anim) return
    setAnim(true)
    setTimeout(() => { setIdx((n + products.length) % products.length); setAnim(false) }, 200)
  }, [anim, products.length])

  useEffect(() => {
    const t = setInterval(() => go(idx + 1), 6000)
    return () => clearInterval(t)
  }, [idx, go])

  const p    = products[idx]
  const disc = p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0

  return (
    <section style={{ background:'var(--bg)', borderBottom:'1px solid var(--border)' }}>
      <div className="w-container">
        <div className="hero-main-grid">

          {/* LEFT */}
          <div style={{
            opacity: anim ? 0 : 1,
            transform: anim ? 'translateX(-12px)' : 'translateX(0)',
            transition:'opacity .2s, transform .2s',
          }}>
            {/* Label */}
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
              <span style={{
                background: p.category === 'offroad' ? '#111' : '#F5F5F5',
                color:       p.category === 'offroad' ? '#F5C200' : '#444',
                fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase',
                padding:'5px 12px', borderRadius:4,
              }}>
                {p.category === 'offroad' ? '⚡ Позашляховий' : '🏙 Міський'}
              </span>
              {p.tag && (
                <span style={{ background:'#F5C200', color:'#111', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', padding:'5px 12px', borderRadius:4 }}>
                  {p.tag}
                </span>
              )}
            </div>

            {/* Name */}
            <h1 style={{ fontSize:'clamp(52px,6vw,80px)', fontWeight:800, lineHeight:1.0, letterSpacing:'-.03em', color:'var(--text)', marginBottom:16 }}>
              {p.name}
            </h1>

            <p style={{ fontSize:16, color:'var(--text-3)', lineHeight:1.7, maxWidth:440, marginBottom:32 }}>
              {p.description.slice(0, 120)}...
            </p>

            {/* Specs row */}
            <div style={{ display:'flex', gap:0, marginBottom:36, border:'1.5px solid var(--border)', borderRadius:10, overflow:'hidden' }}>
              {[
                { Icon: Gauge,   val: `${p.max_speed} км/г`, label: 'Швидкість' },
                { Icon: Zap,     val: `${p.range_km} км`,    label: 'Запас ходу' },
                { Icon: Battery, val: `${p.battery_wh} Wh`,  label: 'Акумулятор' },
                { Icon: Weight,  val: `${p.weight_kg} кг`,   label: 'Вага' },
              ].map(({ Icon, val, label }, i) => (
                <div key={label} style={{
                  flex:1, padding:'16px 12px', textAlign:'center',
                  borderRight: i < 3 ? '1.5px solid var(--border)' : 'none',
                  background:'var(--bg-soft)',
                }}>
                  <Icon size={16} style={{ color:'var(--yellow-dark)', marginBottom:6, display:'block', margin:'0 auto 6px' }}/>
                  <div style={{ fontSize:15, fontWeight:700, color:'var(--text)', letterSpacing:'-.01em' }}>{val}</div>
                  <div style={{ fontSize:10, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--text-4)', marginTop:2 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Price */}
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:32, flexWrap:'wrap' }}>
              {disc > 0 && (
                <span style={{ background:'#F5C200', color:'#111', fontSize:12, fontWeight:800, padding:'4px 10px', borderRadius:4 }}>
                  −{disc}%
                </span>
              )}
              <span style={{ fontSize:38, fontWeight:800, color:'var(--text)', letterSpacing:'-.025em', lineHeight:1 }}>
                ₴{p.price.toLocaleString('uk-UA')}
              </span>
              {p.old_price && (
                <span style={{ fontSize:18, color:'var(--text-4)', textDecoration:'line-through', fontWeight:400 }}>
                  ₴{p.old_price.toLocaleString('uk-UA')}
                </span>
              )}
            </div>

            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link href={`/product/${p.slug}`} className="btn btn-black btn-lg">
                Купити зараз <ArrowRight size={16}/>
              </Link>
              <Link href="/catalog" className="btn btn-white btn-lg">Всі моделі</Link>
            </div>
          </div>

          {/* RIGHT — scooter illustration */}
          <div className="hidden lg:flex" style={{
            alignItems:'center', justifyContent:'center',
            opacity: anim ? 0 : 1,
            transform: anim ? 'translateX(12px) scale(.97)' : 'translateX(0) scale(1)',
            transition:'opacity .2s, transform .2s',
            position:'relative',
          }}>
            {/* BG circle */}
            <div style={{
              position:'absolute', inset:0, borderRadius:'50%',
              background:'var(--bg-soft)',
              margin:'5%',
            }}/>
            <div style={{ position:'relative', width:'100%', maxWidth:480, aspectRatio:'1', padding:'8%' }}>
              <ScooterSVG color="#F5C200"/>
            </div>
            {/* Floating card */}
            <div style={{
              position:'absolute', bottom:'12%', left:'-4%',
              background:'var(--bg)', border:'1.5px solid var(--border)',
              borderRadius:12, padding:'14px 18px',
              boxShadow:'var(--shadow-lg)',
              animation:'float 4s ease-in-out infinite',
            }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'var(--text-3)', marginBottom:4 }}>від</div>
              <div style={{ fontSize:22, fontWeight:800, color:'var(--text)', letterSpacing:'-.02em', lineHeight:1 }}>
                ₴{p.price.toLocaleString('uk-UA')}
              </div>
            </div>
          </div>
        </div>

        {/* Slider controls */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12, paddingBottom:32 }}>
          <button onClick={() => go(idx-1)} style={{
            width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
            background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:6,
            cursor:'pointer', color:'var(--text-3)', transition:'all .15s',
          }}>
            <ChevronLeft size={15}/>
          </button>
          <div style={{ display:'flex', gap:6 }}>
            {products.map((_,i) => (
              <button key={i} onClick={() => go(i)} style={{
                height:4, borderRadius:2, border:'none', cursor:'pointer', transition:'all .3s',
                width: i===idx ? 28 : 8,
                background: i===idx ? '#F5C200' : 'var(--border-md)',
              }}/>
            ))}
          </div>
          <button onClick={() => go(idx+1)} style={{
            width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center',
            background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:6,
            cursor:'pointer', color:'var(--text-3)', transition:'all .15s',
          }}>
            <ChevronRight size={15}/>
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ borderTop:'1px solid var(--border)', background:'var(--bg-soft)' }}>
        <div className="w-container" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)' }}>
          {[['50K+','Задоволених клієнтів'],['#1','Бренд для дорослих'],['2Y','Офіційна гарантія'],['4.9★','Середній рейтинг']].map(([v,l],i) => (
            <div key={i} style={{
              display:'flex', flexDirection:'column', alignItems:'center', gap:4, padding:'20px 16px',
              borderRight: i<3 ? '1px solid var(--border)' : 'none',
            }}>
              <span style={{ fontSize:26, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>{v}</span>
              <span style={{ fontSize:11, color:'var(--text-3)', textAlign:'center' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
