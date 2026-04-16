'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { ShoppingBag, Check, Battery, Gauge, Zap } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'

export default function ProductCard({ product: p, featured }: { product: Product; featured?: boolean }) {
  const { addItem } = useCart()
  const [added,    setAdded]    = useState(false)
  const [wish,     setWish]     = useState(false)
  const [hovered,  setHovered]  = useState(false)

  const disc      = p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0
  const imgDefault = p.images?.[0]   // product shot (white/transparent bg)
  const imgHover   = p.images?.[1]   // lifestyle shot shown on hover

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg)',
        border: featured ? '2px solid #F5C200' : '1.5px solid var(--border)',
        borderRadius: 16, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: featured
          ? hovered ? '0 16px 48px rgba(245,194,0,.22)' : '0 8px 32px rgba(245,194,0,.12)'
          : hovered ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
        borderColor: hovered && !featured ? 'var(--border-md)' : undefined,
        transform: hovered ? 'translateY(-5px)' : 'none',
        transition: 'all .25s cubic-bezier(.16,1,.3,1)',
        position: 'relative',
      }}>

      {featured && (
        <div style={{ position:'absolute', top:14, right:14, zIndex:3, background:'#F5C200', color:'#111', fontSize:10, fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase' as const, padding:'4px 10px', borderRadius:4 }}>
          Best Choice
        </div>
      )}

      <Link href={`/product/${p.slug}`} style={{ textDecoration:'none', display:'flex', flexDirection:'column', flex:1 }}>

        {/* Image area — default shows product, hover shows lifestyle */}
        <div style={{ background:'#F8F8F8', aspectRatio:'1', position:'relative', overflow:'hidden' }}>

          {/* Default — product shot: contain + white bg */}
          {imgDefault && (
            <div style={{
              position:'absolute', inset:0,
              background:'#fff',
              opacity: (imgHover && imgHover !== imgDefault && hovered) ? 0 : 1,
              transition: 'opacity .35s ease',
            }}>
              <Image
                src={imgDefault}
                alt={p.name}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                style={{ objectFit:'contain', padding:'12px' }}
              />
            </div>
          )}

          {/* Hover — lifestyle shot: cover, full bleed */}
          {imgHover && imgHover !== imgDefault && (
            <div style={{
              position:'absolute', inset:0,
              opacity: hovered ? 1 : 0,
              transition: 'opacity .35s ease',
            }}>
              <Image
                src={imgHover}
                alt={`${p.name} в дії`}
                fill
                sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                style={{ objectFit:'cover', objectPosition:'center top' }}
              />
            </div>
          )}

          {/* Fallback SVG if no images */}
          {!imgDefault && (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg viewBox="0 0 160 130" fill="none" style={{ width:'68%', height:'68%' }}>
                <circle cx="34" cy="100" r="24" stroke="#F5C200" strokeWidth="5"/>
                <circle cx="126" cy="100" r="24" stroke="#F5C200" strokeWidth="5"/>
                <path d="M34 100L54 44L102 35L126 100" stroke="#333" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
                <path d="M54 44L68 14" stroke="#F5C200" strokeWidth="5" strokeLinecap="round"/>
                <rect x="60" y="6" width="24" height="13" rx="3.5" fill="#F5C200"/>
              </svg>
            </div>
          )}

          {/* Badges */}
          <div style={{ position:'absolute', top:12, left:12, display:'flex', flexDirection:'column', gap:5, zIndex:2 }}>
            {disc > 0 && <span style={{ background:'#F5C200', color:'#111', fontSize:10, fontWeight:800, letterSpacing:'.05em', padding:'3px 8px', borderRadius:3 }}>−{disc}%</span>}
            {p.is_new  && <span style={{ background:'#111', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:3 }}>Новинка</span>}
            {p.tag && !p.is_new && <span style={{ background:'#111', color:'#fff', fontSize:10, fontWeight:700, padding:'3px 8px', borderRadius:3 }}>{p.tag}</span>}
          </div>

          {/* Wishlist */}
          <button onClick={e => { e.preventDefault(); setWish(!wish) }} style={{
            position:'absolute', top:12, right:12, zIndex:2,
            width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center',
            background:'rgba(255,255,255,.92)', border:'1px solid #E8E8E8',
            borderRadius:8, cursor:'pointer', fontSize:17,
            color: wish ? '#EF4444' : '#AAA',
            boxShadow:'0 1px 4px rgba(0,0,0,.1)',
            opacity: hovered ? 1 : 0,
            transition:'opacity .2s, color .15s',
          }}>
            {wish ? '♥' : '♡'}
          </button>

          {/* Hover label */}
          {imgHover && imgHover !== imgDefault && (
            <div style={{
              position:'absolute', bottom:10, left:'50%', transform:'translateX(-50%)',
              background:'rgba(0,0,0,.55)', color:'#fff',
              fontSize:10, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase' as const,
              padding:'4px 10px', borderRadius:20,
              opacity: hovered ? 1 : 0, transition:'opacity .25s',
              whiteSpace:'nowrap' as const, zIndex:2,
            }}>
              В дії →
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding:'16px 16px 10px' }}>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:10 }}>
            {[
              { v: p.voltage.toUpperCase(), accent:false },
              { v: `${p.range_km} км`,      accent:false },
              { v: `${p.battery_wh} Wh`,    accent:false },
              ...(p.motor === 'dual' ? [{ v:'Dual Motor', accent:true }] : []),
            ].map(({ v, accent }, i) => (
              <span key={i} style={{
                fontSize:10, fontWeight:600, letterSpacing:'.05em', textTransform:'uppercase' as const,
                color: accent ? '#8B6800' : 'var(--text-3)',
                background: accent ? '#FFF3CC' : 'var(--bg-subtle)',
                border:`1px solid ${accent ? '#F5C200' : 'var(--border)'}`,
                padding:'3px 7px', borderRadius:4,
              }}>{v}</span>
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
        background: added ? '#22C55E' : '#111',
        color: '#fff', fontSize:12, fontWeight:700,
        letterSpacing:'.06em', textTransform:'uppercase' as const,
        border:'none', cursor:'pointer', transition:'background .15s',
      }}>
        {added ? <><Check size={13}/> Додано</> : <><ShoppingBag size={13}/> До кошика</>}
      </button>
    </article>
  )
}
