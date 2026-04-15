'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, ArrowLeft, Check, Zap, Gauge, Battery, Weight, ChevronRight } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductView({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [added,    setAdded]   = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  const saving  = product.old_price ? product.old_price - product.price : 0
  const discPct = product.old_price ? Math.round(saving / product.old_price * 100) : 0
  const related = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const specs = [
    { Icon: Gauge,   label: 'Макс. швидкість', value: `${product.max_speed} км/год` },
    { Icon: Zap,     label: 'Запас ходу',       value: `${product.range_km} км` },
    { Icon: Battery, label: 'Акумулятор',       value: `${product.battery_wh} Wh` },
    { Icon: Weight,  label: 'Вага',             value: `${product.weight_kg} кг` },
  ]

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Breadcrumb */}
      <div style={{ borderBottom:'1px solid var(--border)', padding:'14px 0', background:'var(--bg-soft)' }}>
        <div className="w-container" style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'var(--text-3)' }}>
          <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
          <ChevronRight size={12}/>
          <Link href="/catalog" style={{ color:'var(--text-3)', textDecoration:'none' }}>Каталог</Link>
          <ChevronRight size={12}/>
          <span style={{ color:'var(--text)', fontWeight:500 }}>{product.name}</span>
        </div>
      </div>

      <div className="w-container" style={{ padding:'40px 40px' }}>
        <Link href="/catalog" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, fontWeight:500, color:'var(--text-3)', textDecoration:'none', marginBottom:32 }}>
          <ArrowLeft size={14}/> Назад до каталогу
        </Link>

        {/* Main grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, marginBottom:72 }}>

          {/* Image */}
          <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:20, aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center', position:'relative' }}>
            {discPct > 0 && (
              <span style={{ position:'absolute', top:20, left:20, background:'#F5C200', color:'#111', fontSize:12, fontWeight:800, padding:'5px 12px', borderRadius:6 }}>
                −{discPct}%
              </span>
            )}
            {product.tag && (
              <span style={{ position:'absolute', top:20, right:20, background:'#111', color:'#fff', fontSize:11, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase' as const, padding:'5px 12px', borderRadius:6 }}>
                {product.tag}
              </span>
            )}
            {product.images?.[activeImg] ? (
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                priority
                sizes="(max-width:768px) 100vw, 50vw"
                style={{ objectFit:'contain', padding:24 }}
              />
            ) : (
              <svg viewBox="0 0 300 260" fill="none" style={{ width:'72%', height:'72%' }}>
                <circle cx="60"  cy="208" r="42" stroke="#F5C200" strokeWidth="8"/>
                <circle cx="240" cy="208" r="42" stroke="#F5C200" strokeWidth="8"/>
                <path d="M60 208 L96 92 L188 72 L240 208" stroke="var(--text)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" opacity=".85"/>
                <path d="M96 92 L132 34" stroke="#F5C200" strokeWidth="9" strokeLinecap="round"/>
                <rect x="118" y="20" width="48" height="26" rx="7" fill="#F5C200"/>
              </svg>
            )}
          </div>

          {/* Info */}
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            {/* Badges */}
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--text-3)', background:'var(--bg-subtle)', border:'1px solid var(--border)', padding:'4px 10px', borderRadius:4 }}>
                {product.voltage.toUpperCase()}
              </span>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--text-3)', background:'var(--bg-subtle)', border:'1px solid var(--border)', padding:'4px 10px', borderRadius:4 }}>
                {product.category === 'offroad' ? 'Позашляховий' : 'Міський'}
              </span>
              {product.motor === 'dual' && (
                <span style={{ fontSize:10, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'#8B6800', background:'#FFF3CC', border:'1px solid #F5C200', padding:'4px 10px', borderRadius:4 }}>
                  Dual Motor
                </span>
              )}
            </div>

            <h1 style={{ fontSize:'clamp(28px,3vw,44px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', lineHeight:1.05 }}>
              {product.name}
            </h1>

            <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.7 }}>{product.description}</p>

            {/* Price */}
            <div style={{ display:'flex', alignItems:'baseline', gap:12, flexWrap:'wrap' }}>
              <span style={{ fontSize:40, fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1 }}>
                ₴{product.price.toLocaleString('uk-UA')}
              </span>
              {product.old_price && (
                <span style={{ fontSize:20, color:'var(--text-4)', textDecoration:'line-through', fontWeight:400 }}>
                  ₴{product.old_price.toLocaleString('uk-UA')}
                </span>
              )}
              {saving > 0 && (
                <span style={{ fontSize:13, fontWeight:700, color:'#8B6800', background:'#FFF3CC', border:'1px solid #F5C200', padding:'4px 12px', borderRadius:4 }}>
                  Економія ₴{saving.toLocaleString('uk-UA')}
                </span>
              )}
            </div>

            {/* Spec grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              {specs.map(({ Icon, label, value }) => (
                <div key={label} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:10, padding:'14px 16px', display:'flex', alignItems:'center', gap:12 }}>
                  <div style={{ width:36, height:36, background:'#F5C200', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={16} color="#111"/>
                  </div>
                  <div>
                    <div style={{ fontSize:10, fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--text-3)', marginBottom:2 }}>{label}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', letterSpacing:'-.01em' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <button onClick={handleAdd} className={`btn ${added ? '' : 'btn-black'}`} style={{
                flex:1, justifyContent:'center',
                background: added ? '#22C55E' : '#111',
                color: '#fff', borderColor: added ? '#22C55E' : '#111',
              }}>
                {added ? <><Check size={16}/> Додано до кошика</> : <><ShoppingBag size={16}/> До кошика</>}
              </button>
              <Link href="/cart" className="btn btn-white">Оформити зараз</Link>
            </div>

            {/* Trust */}
            <div style={{ display:'flex', gap:16, flexWrap:'wrap', borderTop:'1px solid var(--border)', paddingTop:16 }}>
              {['🚚 Безкоштовна доставка', '🛡 Гарантія 2 роки', '🔄 14 днів повернення'].map(b => (
                <span key={b} style={{ fontSize:12, color:'var(--text-3)', fontWeight:500 }}>{b}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:48, paddingTop:48, borderTop:'1px solid var(--border)', marginBottom:64 }}>
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-.02em', marginBottom:16 }}>Опис</h2>
            <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.75 }}>{product.description}</p>
          </div>
          <div>
            <h2 style={{ fontSize:20, fontWeight:800, color:'var(--text)', letterSpacing:'-.02em', marginBottom:16 }}>Особливості</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {product.features.map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:12, fontSize:14, color:'var(--text-2)' }}>
                  <span style={{ width:20, height:20, background:'#F5C200', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Check size={10} color="#111" strokeWidth={3}/>
                  </span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ paddingTop:40, borderTop:'1px solid var(--border)' }}>
            <h2 style={{ fontSize:24, fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:28 }}>Схожі моделі</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
              {related.map(p => <ProductCard key={p.id} product={p}/>)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
