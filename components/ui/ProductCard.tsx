'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingBag, Check, Battery, Gauge, Zap } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'

export default function ProductCard({ product: p, featured }: { product: Product; featured?: boolean }) {
  const { addItem } = useCart()
  const [added,   setAdded]   = useState(false)
  const [wish,    setWish]    = useState(false)
  const [hovered, setHovered] = useState(false)

  const disc   = p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0
  const imgMain   = p.images?.[0]  // product on white bg
  const imgHover  = p.images?.[1]  // lifestyle/action photo

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article
      style={{
        background: 'var(--bg)',
        border: featured ? '2px solid #F5C200' : '1.5px solid var(--border)',
        borderRadius: 14, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: featured ? '0 8px 32px rgba(245,194,0,.12)' : 'none',
        transition: 'border-color .25s, box-shadow .25s, transform .25s',
      }}
      onMouseEnter={e => {
        setHovered(true)
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = featured ? '0 20px 48px rgba(245,194,0,.2)' : '0 12px 40px rgba(0,0,0,.1)'
        if (!featured) el.style.borderColor = 'var(--border-md)'
      }}
      onMouseLeave={e => {
        setHovered(false)
        const el = e.currentTarget as HTMLElement
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = featured ? '0 8px 32px rgba(245,194,0,.12)' : 'none'
        if (!featured) el.style.borderColor = 'var(--border)'
      }}
    >
      {featured && (
        <div style={{ background:'#F5C200', color:'#111', fontSize:10, fontWeight:800, letterSpacing:'.1em', textTransform:'uppercase' as const, padding:'5px 0', textAlign:'center' as const }}>
          ★ Best Choice
        </div>
      )}

      <Link href={`/product/${p.slug}`} style={{ textDecoration:'none', display:'flex', flexDirection:'column', flex:1 }}>

        {/* Image area — transparent bg, hover switches to lifestyle photo */}
        <div style={{ position:'relative', aspectRatio:'1', overflow:'hidden', background: hovered && imgHover ? '#f0f0ee' : 'transparent' }}>

          {/* Main product image (white/transparent bg) */}
          {imgMain && (
            <div style={{
              position:'absolute', inset:0,
              opacity: hovered && imgHover ? 0 : 1,
              transition: 'opacity .35s ease',
            }}>
              <Image
                src={imgMain}
                alt={p.name}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                style={{ objectFit:'contain', padding:16 }}
              />
            </div>
          )}

          {/* Hover lifestyle image */}
          {imgHover && imgHover !== imgMain && (
            <div style={{
              position:'absolute', inset:0,
              opacity: hovered ? 1 : 0,
              transition: 'opacity .35s ease',
            }}>
              <Image
                src={imgHover}
                alt={`${p.name} lifestyle`}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                style={{ objectFit:'cover' }}
              />
            </div>
          )}

          {/* Fallback SVG if no images */}
          {!imgMain && (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:'var(--bg-soft)' }}>
              <svg viewBox="0 0 160 130" fill="none" style={{ width:'72%', height:'72%' }}>
                <circle cx="34" cy="100" r="24" stroke="#F5C200" strokeWidth="5"/>
                <circle cx="126" cy="100" r="24" stroke="#F5C200" strokeWidth="5"/>
                <path d="M34 100L54 44L102 35L126 100" stroke="var(--text)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
                <path d="M54 44L68 14" stroke="#F5C200" strokeWidth="5" strokeLinecap="round"/>
                <rect x="60" y="6" width="24" height="13" rx="3.5" fill="#F5C200"/>
              </svg>
            </div>
          )}

          {/* Badges */}
          <div style={{ position:'absolute', top:10, left:10, display:'flex', flexDirection:'column', gap:5, zIndex:2 }}>
            {disc > 0 && <span style={{ background:'#F5C200', color:'#111', fontSize:10, fontWeight:800, padding:'3px 8px', borderRadius:3 }}>−{disc}%</span>}
            {p.is_new && <span style={{ background:'#111', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:3 }}>Новинка</span>}
            {p.tag && !p.is_new && <span style={{ background:'#111', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:3 }}>{p.tag}</span>}
          </div>

          {/* Wishlist */}
          <button onClick={e => { e.preventDefault(); setWish(!wish) }} style={{
            position:'absolute', top:10, right:10, zIndex:2,
            width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(255,255,255,.92)', border:'1px solid #e8e8e5', borderRadius:6,
            cursor:'pointer', fontSize:16, color: wish ? '#EF4444' : '#aaa',
            opacity: hovered ? 1 : 0, transition:'opacity .2s, color .15s',
            boxShadow:'0 2px 8px rgba(0,0,0,.1)',
          }}>
            {wish ? '♥' : '♡'}
          </button>
        </div>

        {/* Body */}
        <div style={{ padding:'14px 16px 12px', borderTop:'1px solid var(--border)' }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:9 }}>
            {[
              { Icon: Zap,     v: p.voltage.toUpperCase(), accent: false },
              { Icon: Gauge,   v: `${p.range_km} км`,      accent: false },
              { Icon: Battery, v: `${p.battery_wh} Wh`,    accent: false },
              ...(p.motor === 'dual' ? [{ Icon: Zap, v: 'Dual Motor', accent: true }] : []),
            ].map(({ Icon, v, accent }, i) => (
              <span key={i} style={{
                display:'inline-flex', alignItems:'center', gap:3,
                fontSize:9, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase' as const,
                color: accent ? '#8B6800' : 'var(--text-3)',
                background: accent ? '#FFF3CC' : 'var(--bg-subtle)',
                border: `1px solid ${accent ? '#F5C200' : 'var(--border)'}`,
                padding:'2px 6px', borderRadius:3,
              }}>
                <Icon size={8}/> {v}
              </span>
            ))}
          </div>
          <h3 style={{ fontSize:14, fontWeight:700, color:'var(--text)', lineHeight:1.3, letterSpacing:'-.01em', marginBottom:8 }}>{p.name}</h3>
          <div style={{ display:'flex', alignItems:'baseline', gap:7 }}>
            <span style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-.02em', lineHeight:1 }}>₴{p.price.toLocaleString('uk-UA')}</span>
            {p.old_price && <span style={{ fontSize:12, color:'var(--text-4)', textDecoration:'line-through' }}>₴{p.old_price.toLocaleString('uk-UA')}</span>}
          </div>
        </div>
      </Link>

      <button onClick={handleAdd} style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:6,
        width:'100%', padding:'12px',
        background: added ? '#22C55E' : hovered ? '#F5C200' : '#111',
        color: added ? '#fff' : hovered ? '#111' : '#fff',
        fontSize:11, fontWeight:700, letterSpacing:'.07em', textTransform:'uppercase' as const,
        border:'none', cursor:'pointer', transition:'background .2s, color .2s',
      }}>
        {added ? <><Check size={12}/> Додано</> : <><ShoppingBag size={12}/> До кошика</>}
      </button>
    </article>
  )
}
