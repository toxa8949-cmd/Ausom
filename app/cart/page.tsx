'use client'

import Link from 'next/link'
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Truck, RotateCcw, Shield } from 'lucide-react'
import { useCart } from '@/lib/cart'

export default function CartPage() {
  const { items, count, total, removeItem, updateQty, clearCart } = useCart()

  if (count === 0) {
    return (
      <div style={{ minHeight:'100vh', background:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', gap:20, padding:24 }}>
        <ShoppingBag size={72} style={{ color:'var(--border-md)', strokeWidth:1 }}/>
        <h1 style={{ fontSize:40, fontWeight:800, letterSpacing:'-.03em', color:'var(--text)' }}>Кошик порожній</h1>
        <p style={{ fontSize:15, color:'var(--text-3)', maxWidth:320 }}>Додай самокати з каталогу, щоб оформити замовлення</p>
        <Link href="/catalog" className="btn btn-black" style={{ marginTop:8 }}>Перейти до каталогу</Link>
      </div>
    )
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'32px 0' }}>
        <div className="w-container">
          <h1 style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)' }}>
            Кошик <span style={{ color:'var(--yellow-dark)' }}>({count})</span>
          </h1>
        </div>
      </div>

      <div className="w-container" style={{ padding:'32px 40px' }}>
        <Link href="/catalog" style={{ display:'inline-flex', alignItems:'center', gap:8, fontSize:13, fontWeight:500, color:'var(--text-3)', textDecoration:'none', marginBottom:28 }}>
          <ArrowLeft size={14}/> Продовжити покупки
        </Link>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 360px', gap:32, alignItems:'start' }}>

          {/* Items */}
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {items.map(({ product: p, quantity }) => (
              <div key={p.id} style={{
                display:'grid', gridTemplateColumns:'88px 1fr auto',
                gap:20, alignItems:'center',
                background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12, padding:20,
                transition:'border-color .15s',
              }}>
                <div style={{ background:'var(--bg-soft)', borderRadius:8, aspectRatio:'1', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <svg viewBox="0 0 80 70" fill="none" width="52" height="46">
                    <circle cx="16" cy="56" r="12" stroke="#F5C200" strokeWidth="3"/>
                    <circle cx="64" cy="56" r="12" stroke="#F5C200" strokeWidth="3"/>
                    <path d="M16 56L26 24L52 18L64 56" stroke="var(--text)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
                    <path d="M26 24L34 8" stroke="#F5C200" strokeWidth="3" strokeLinecap="round"/>
                    <rect x="28" y="4" width="16" height="8" rx="2" fill="#F5C200"/>
                  </svg>
                </div>
                <div>
                  <Link href={`/product/${p.slug}`} style={{ fontSize:15, fontWeight:700, color:'var(--text)', textDecoration:'none', letterSpacing:'-.01em', display:'block', marginBottom:6 }}>
                    {p.name}
                  </Link>
                  <div style={{ display:'flex', gap:8, marginBottom:12, flexWrap:'wrap' }}>
                    {[p.voltage.toUpperCase(), `${p.range_km} км`].map(v => (
                      <span key={v} style={{ fontSize:10, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase' as const, color:'var(--text-3)', background:'var(--bg-subtle)', border:'1px solid var(--border)', padding:'3px 8px', borderRadius:4 }}>{v}</span>
                    ))}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ display:'flex', alignItems:'center', background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:8, overflow:'hidden' }}>
                      <button onClick={() => updateQty(p.id, quantity-1)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', color:'var(--text-3)' }}><Minus size={12}/></button>
                      <span style={{ width:36, textAlign:'center', fontSize:13, fontWeight:700, color:'var(--text)', borderLeft:'1px solid var(--border)', borderRight:'1px solid var(--border)' }}>{quantity}</span>
                      <button onClick={() => updateQty(p.id, quantity+1)} style={{ width:34, height:34, display:'flex', alignItems:'center', justifyContent:'center', background:'none', border:'none', cursor:'pointer', color:'var(--text-3)' }}><Plus size={12}/></button>
                    </div>
                    <button onClick={() => removeItem(p.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--text-4)', padding:6 }}><Trash2 size={14}/></button>
                  </div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontSize:22, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>₴{(p.price*quantity).toLocaleString('uk-UA')}</div>
                  {p.old_price && <div style={{ fontSize:12, color:'var(--text-4)', textDecoration:'line-through' }}>₴{(p.old_price*quantity).toLocaleString('uk-UA')}</div>}
                </div>
              </div>
            ))}
            <button onClick={clearCart} style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, fontWeight:500, color:'var(--text-4)', background:'none', border:'none', cursor:'pointer', padding:'4px 0' }}>
              <Trash2 size={13}/> Очистити кошик
            </button>
          </div>

          {/* Summary */}
          <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:14, padding:24, position:'sticky', top:84, display:'flex', flexDirection:'column', gap:18 }}>
            <h2 style={{ fontSize:20, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>Ваше замовлення</h2>

            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}>
                <span style={{ color:'var(--text-3)' }}>Товарів ({count})</span>
                <span style={{ fontWeight:600, color:'var(--text)' }}>₴{total.toLocaleString('uk-UA')}</span>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}>
                <span style={{ color:'var(--text-3)' }}>Доставка</span>
                <span style={{ fontWeight:600, color:'#22C55E' }}>Безкоштовно</span>
              </div>
            </div>

            <div style={{ borderTop:'1px solid var(--border)', paddingTop:16, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <span style={{ fontSize:15, fontWeight:700, color:'var(--text)' }}>Разом</span>
              <span style={{ fontSize:28, fontWeight:800, letterSpacing:'-.025em', color:'var(--text)' }}>₴{total.toLocaleString('uk-UA')}</span>
            </div>

            <div style={{ display:'flex', gap:8 }}>
              <input placeholder="Промокод" style={{ flex:1, padding:'10px 14px', background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:6, fontSize:12, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase' as const, color:'var(--text)', outline:'none', fontFamily:'Inter,sans-serif' }}/>
              <button className="btn btn-white btn-sm">OK</button>
            </div>

            <Link href="/checkout" className="btn btn-black btn-full" style={{ justifyContent:'center' }}>Оформити замовлення</Link>
            <p style={{ fontSize:11, color:'var(--text-4)', textAlign:'center' }}>🔒 Безпечна оплата · Гарантія 2 роки</p>

            <div style={{ borderTop:'1px solid var(--border)', paddingTop:16, display:'flex', flexDirection:'column', gap:10 }}>
              {[[Truck,'Безкоштовна доставка'],[RotateCcw,'14 днів повернення'],[Shield,'Гарантія 2 роки']].map(([Icon, text]: any) => (
                <div key={text} style={{ display:'flex', alignItems:'center', gap:10, fontSize:12, color:'var(--text-3)' }}>
                  <div style={{ width:28, height:28, background:'#F5C200', borderRadius:6, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon size={13} color="#111"/>
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
