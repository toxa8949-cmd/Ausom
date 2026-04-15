'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingBag, Check, Battery, Gauge, Zap } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'

export default function ProductCard({ product: p, featured }: { product: Product; featured?: boolean }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [wish,  setWish]  = useState(false)
  const disc = p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0
  const img  = p.images?.[0]

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article style={{
      background: 'var(--bg)',
      border: featured ? '2px solid #F5C200' : '1.5px solid var(--border)',
      borderRadius: 16, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      boxShadow: featured ? '0 8px 32px rgba(245,194,0,.12)' : 'var(--shadow-sm)',
      transition: 'border-color .2s, box-shadow .2s, transform .2s',
      position: 'relative',
    }}
    onMouseEnter={e => {
      const el = e.currentTarget as HTMLElement
      el.style.transform = 'translateY(-4px)'
      el.style.boxShadow = featured ? '0 16px 48px rgba(245,194,0,.18)' : 'var(--shadow-xl)'
      if (!featured) el.style.borderColor = 'var(--border-md)'
    }}
    onMouseLeave={e => {
      const el = e.currentTarget as HTMLElement
      el.style.transform = 'translateY(0)'
      el.style.boxShadow = featured ? '0 8px 32px rgba(245,194,0,.12)' : 'var(--shadow-sm)'
      if (!featured) el.style.borderColor = 'var(--border)'
    }}>

      {featured && (
        <div style={{ position:'absolute', top:14, right:14, zIndex:3, background:'#F5C200', color:'#111', fontSize:10, fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase' as const, padding:'4px 10px', borderRadius:4 }}>
          Best Choice
        </div>
      )}

      <Link href={`/product/${p.slug}`} style={{ textDecoration:'none', display:'flex', flexDirection:'column', flex:1 }}>
        {/* Image */}
        <div style={{ background:'var(--bg-soft)', aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
          {img ? (
            <Image
              src={img}
              alt={p.name}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
              style={{ objectFit:'contain', padding:16 }}
            />
          ) : (
            <svg viewBox="0 0 160 130" fill="none" style={{ width:'72%', height:'72%' }}>
              <circle cx="34" cy="100" r="24" stroke="#F5C200" strokeWidth="5"/>
              <circle cx="126" cy="100" r="24" stroke="#F5C200" strokeWidth="5"/>
              <path d="M34 100L54 44L102 35L126 100" stroke="var(--text)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
              <path d="M54 44L68 14" stroke="#F5C200" strokeWidth="5" strokeLinecap="round"/>
              <rect x="60" y="6" width="24" height="13" rx="3.5" fill="#F5C200"/>
            </svg>
          )}

          {/* Badges */}
          <div style={{ position:'absolute', top:12, left:12, display:'flex', flexDirection:'column', gap:6, zIndex:2 }}>
            {disc > 0 && (
              <span style={{ background:'#F5C200', color:'#111', fontSize:10, fontWeight:800, letterSpacing:'.06em', padding:'3px 8px', borderRadius:3 }}>−{disc}%</span>
            )}
            {p.is_new && (
              <span style={{ background:'#111', color:'#fff', fontSize:10, fontWeight:700, letterSpacing:'.06em', padding:'3px 8px', borderRadius:3 }}>Новинка</span>
            )}
            {p.tag && !p.is_new && (
              <span style={{ background:'#111', color:'#fff', fontSize:10, fontWeight:700, letterSpacing:'.06em', padding:'3px 8px', borderRadius:3 }}>{p.tag}</span>
            )}
          </div>

          {/* Wishlist */}
          <button onClick={e => { e.preventDefault(); setWish(!wish) }} style={{
            position:'absolute', top:12, right:12, zIndex:2,
            width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(255,255,255,.9)', border:'1px solid var(--border)', borderRadius:6,
            cursor:'pointer', fontSize:16, color: wish ? '#EF4444' : 'var(--text-3)',
            boxShadow:'var(--shadow-sm)', transition:'color .15s',
          }}>
            {wish ? '♥' : '♡'}
          </button>
        </div>

        {/* Body */}
        <div style={{ padding:'16px 16px 12px' }}>
          {/* Spec pills */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:10 }}>
            {[
              { Icon: Zap,     v: p.voltage.toUpperCase(), accent: false },
              { Icon: Gauge,   v: `${p.range_km} км`,      accent: false },
              { Icon: Battery, v: `${p.battery_wh} Wh`,    accent: false },
              ...(p.motor === 'dual' ? [{ Icon: Zap, v: 'Dual Motor', accent: true }] : []),
            ].map(({ Icon, v, accent }, i) => (
              <span key={i} style={{
                display:'inline-flex', alignItems:'center', gap:4,
                fontSize:10, fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase' as const,
                color: accent ? '#8B6800' : 'var(--text-3)',
                background: accent ? '#FFF3CC' : 'var(--bg-subtle)',
                border: `1px solid ${accent ? '#F5C200' : 'var(--border)'}`,
                padding:'3px 7px', borderRadius:4,
              }}>
                <Icon size={9} style={{ color: accent ? '#D4A800' : undefined }}/>
                {v}
              </span>
            ))}
          </div>

          <h3 style={{ fontSize:15, fontWeight:700, color:'var(--text)', lineHeight:1.3, letterSpacing:'-.01em', marginBottom:10 }}>
            {p.name}
          </h3>

          <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
            <span style={{ fontSize:22, fontWeight:800, color:'var(--text)', letterSpacing:'-.02em', lineHeight:1 }}>
              ₴{p.price.toLocaleString('uk-UA')}
            </span>
            {p.old_price && (
              <span style={{ fontSize:13, color:'var(--text-4)', textDecoration:'line-through' }}>
                ₴{p.old_price.toLocaleString('uk-UA')}
              </span>
            )}
          </div>
        </div>
      </Link>

      <button onClick={handleAdd} style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:7,
        width:'100%', padding:'13px',
        background: added ? '#22C55E' : 'var(--text)',
        color: '#fff', fontSize:12, fontWeight:700,
        letterSpacing:'.06em', textTransform:'uppercase' as const,
        border:'none', cursor:'pointer', transition:'background .15s',
      }}>
        {added ? <><Check size={13}/> Додано</> : <><ShoppingBag size={13}/> До кошика</>}
      </button>
    </article>
  )
}
