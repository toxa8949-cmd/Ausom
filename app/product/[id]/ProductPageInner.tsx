'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronRight, Loader2 } from 'lucide-react'
import { fetchProductBySlug, fetchAllProducts } from '@/lib/data'
import { Product } from '@/lib/types'
import { useCart } from '@/lib/cart'

const specsMap: Record<string, { wheels:string; charging:string; brakes:string; suspension:string; waterproof:string; display:string }> = {
  l1:           { wheels:'10"', charging:'6-7 год', brakes:'Дискові', suspension:'Передня + задня', waterproof:'IP54', display:'LCD' },
  'l2-dual':    { wheels:'10"', charging:'7-8 год', brakes:'Гідравлічні', suspension:'Подвійна', waterproof:'IP54', display:'LCD' },
  'l2-max-dual':{ wheels:'11"', charging:'8-9 год', brakes:'Гідравлічні', suspension:'Подвійна', waterproof:'IP54', display:'LCD' },
  'dt2-pro':    { wheels:'11"', charging:'9-10 год', brakes:'Гідравлічні Zoom', suspension:'Подвійна регульована', waterproof:'IP55', display:'LCD кольоровий' },
}
const defaultSpecs = { wheels:'10"', charging:'7-8 год', brakes:'Дискові', suspension:'Передня + задня', waterproof:'IP54', display:'LCD' }

export default function ProductPageInner({ id }: { id: string }) {
  const [product,   setProduct]   = useState<Product | null>(null)
  const [related,   setRelated]   = useState<Product[]>([])
  const [loading,   setLoading]   = useState(true)
  const [notFoundFlag, setNotFoundFlag] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [tab,       setTab]       = useState<'features'|'specs'>('features')
  const { addItem } = useCart()

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const p = await fetchProductBySlug(id)
        if (cancelled) return
        if (!p) { setNotFoundFlag(true); setLoading(false); return }
        setProduct(p)
        const all = await fetchAllProducts()
        if (cancelled) return
        setRelated(all.filter(x => x.slug !== p.slug).slice(0, 3))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [id])

  if (notFoundFlag) notFound()

  if (loading || !product) {
    return (
      <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-3)' }}>
        <Loader2 size={22} style={{ animation:'spin 1s linear infinite' }}/>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  const extra    = specsMap[product.slug] || defaultSpecs
  const discount = product.old_price ? product.old_price - product.price : 0

  const specs = [
    { label:'Макс. швидкість', value:`${product.max_speed} км/год` },
    { label:'Запас ходу', value:`${product.range_km} км` },
    { label:'Батарея', value:`${product.voltage.toUpperCase()}, ${product.battery_wh} Wh` },
    { label:'Мотор', value: product.motor === 'dual' ? 'Подвійний' : 'Одиночний' },
    { label:'Вага', value:`${product.weight_kg} кг` },
    { label:'Макс. навантаження', value:`${product.max_load_kg} кг` },
    { label:'Колеса', value: extra.wheels },
    { label:'Час заряджання', value: extra.charging },
    { label:'Гальма', value: extra.brakes },
    { label:'Підвіска', value: extra.suspension },
    { label:'Захист від вологи', value: extra.waterproof },
    { label:'Дисплей', value: extra.display },
  ]

  const tabBtn = (active: boolean): React.CSSProperties => ({
    flex:1, padding:'12px 24px', fontSize:14, fontWeight:600,
    borderRadius:8, border:'none', cursor:'pointer', transition:'all .15s',
    background: active ? '#111' : 'transparent',
    color: active ? '#fff' : 'var(--text-3)',
  })

  // Be defensive: a DB row may have an empty images[] and the renderer
  // would crash on images[0]. Show a colored placeholder instead.
  const hasImages = product.images && product.images.length > 0
  const mainImage = hasImages ? product.images[activeImg] : null

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)', flexWrap:'wrap' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/>
            <Link href="/catalog" style={{ color:'var(--text-3)', textDecoration:'none' }}>Каталог</Link>
            <ChevronRight size={13}/>
            <span style={{ color:'var(--text)', fontWeight:500 }}>{product.name}</span>
          </div>
        </div>
      </div>

      <div className="section-py" style={{ padding:'48px 0 64px' }}>
        <div className="w-container">
          <div className="grid-product-detail" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:56, alignItems:'start' }}>
            {/* Images */}
            <div>
              <div style={{ position:'relative', aspectRatio:'1', borderRadius:'var(--radius-lg)', overflow:'hidden', border:'1.5px solid var(--border)', background:'var(--bg-soft)', marginBottom:12 }}>
                {product.tag && <span style={{ position:'absolute', top:16, left:16, zIndex:2, background:'#F5C200', color:'#111', fontSize:11, fontWeight:700, padding:'4px 12px', borderRadius:4 }}>{product.tag}</span>}
                {discount > 0 && <span style={{ position:'absolute', top:16, right:16, zIndex:2, background:'#EF4444', color:'#fff', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:4 }}>−{Math.round(discount / (product.old_price || 1) * 100)}%</span>}
                {mainImage
                  ? <Image src={mainImage} alt={product.name} fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectFit:'cover' }} priority />
                  : <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-4)', fontSize:48 }}>🛴</div>
                }
              </div>
              {hasImages && product.images.length > 1 && (
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {product.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} aria-label={`Фото ${i+1}`} style={{ position:'relative', width:72, height:72, borderRadius:8, overflow:'hidden', cursor:'pointer', border: activeImg===i ? '2px solid #F5C200' : '2px solid var(--border)', background:'var(--bg-soft)', padding:0 }}>
                      <Image src={img} alt="" fill sizes="72px" style={{ objectFit:'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <div className="s-label" style={{ marginBottom:12 }}>{product.category==='offroad' ? 'Позашляховий' : 'Міський'}</div>
              <h1 className="product-title" style={{ fontSize:'clamp(28px,4vw,48px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.05, marginBottom:12 }}>{product.name}</h1>
              <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.7, marginBottom:28 }}>{product.description}</p>

              <div className="grid-quick-specs" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:28 }}>
                {[
                  { icon:'⚡', label:'Швидкість', value:`${product.max_speed} км/г` },
                  { icon:'🔋', label:'Запас ходу', value:`${product.range_km} км` },
                  { icon:'🔌', label:'Батарея', value:`${product.battery_wh} Wh` },
                  { icon:'⚖️', label:'Вага', value:`${product.weight_kg} кг` },
                ].map(s => (
                  <div key={s.label} style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:10, padding:'16px 12px', textAlign:'center' }}>
                    <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
                    <div style={{ fontSize:11, color:'var(--text-3)', fontWeight:500 }}>{s.label}</div>
                    <div style={{ fontSize:14, color:'var(--text)', fontWeight:700 }}>{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="product-price-block" style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:'var(--radius-lg)', padding:28, marginBottom:16 }}>
                <div style={{ display:'flex', alignItems:'baseline', gap:12, marginBottom:20, flexWrap:'wrap' }}>
                  <span style={{ fontSize:36, fontWeight:800, letterSpacing:'-.02em', color:'var(--text)' }}>₴{product.price.toLocaleString('uk-UA')}</span>
                  {product.old_price && <span style={{ fontSize:18, color:'var(--text-4)', textDecoration:'line-through' }}>₴{product.old_price.toLocaleString('uk-UA')}</span>}
                  {discount > 0 && <span style={{ background:'rgba(239,68,68,.12)', color:'#EF4444', fontSize:13, fontWeight:700, padding:'3px 10px', borderRadius:6 }}>−₴{discount.toLocaleString('uk-UA')}</span>}
                </div>
                {product.in_stock ? (
                  <button onClick={() => addItem(product)} className="btn btn-yellow btn-lg" style={{ width:'100%' }}>Додати до кошика</button>
                ) : (
                  <button disabled className="btn btn-lg" style={{ width:'100%', background:'var(--bg-subtle)', color:'var(--text-4)', border:'1.5px solid var(--border)', cursor:'not-allowed' }}>Немає в наявності</button>
                )}
                <div className="flex-col-mobile" style={{ display:'flex', gap:20, marginTop:16, fontSize:13, color:'var(--text-3)', flexWrap:'wrap' }}>
                  <span>✓ Безкоштовна доставка</span><span>✓ Гарантія 2 роки</span><span>✓ 14 днів повернення</span>
                </div>
              </div>
              {product.in_stock && <Link href="/checkout" className="btn btn-black btn-lg" style={{ width:'100%', textAlign:'center', justifyContent:'center' }}>Купити зараз</Link>}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="section-py" style={{ background:'var(--bg-soft)', borderTop:'1px solid var(--border)', padding:'48px 0 64px' }}>
        <div className="w-container">
          <div style={{ display:'flex', gap:4, background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12, padding:4, maxWidth:360, marginBottom:32 }}>
            <button onClick={() => setTab('features')} style={tabBtn(tab==='features')}>Переваги</button>
            <button onClick={() => setTab('specs')} style={tabBtn(tab==='specs')}>Характеристики</button>
          </div>
          {tab === 'features' && (
            <div className="grid-features-2" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {product.features.map((f, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:16, background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12, padding:'20px 22px' }}>
                  <span style={{ flexShrink:0, width:32, height:32, background:'rgba(245,194,0,.15)', color:'var(--yellow-dark)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13 }}>{i+1}</span>
                  <p style={{ fontSize:14, color:'var(--text-2)', lineHeight:1.6 }}>{f}</p>
                </div>
              ))}
            </div>
          )}
          {tab === 'specs' && (
            <div style={{ background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:12, overflow:'hidden' }}>
              {specs.map((s, i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'14px 24px', borderBottom: i !== specs.length-1 ? '1px solid var(--border)' : 'none' }}>
                  <span style={{ fontSize:14, color:'var(--text-3)' }}>{s.label}</span>
                  <span style={{ fontSize:14, color:'var(--text)', fontWeight:600 }}>{s.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="section-py" style={{ padding:'56px 0 72px', borderTop:'1px solid var(--border)' }}>
          <div className="w-container">
            <h2 style={{ fontSize:'clamp(22px,3vw,36px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:28 }}>Інші моделі</h2>
            <div className="grid-3" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {related.map(p => (
                <Link key={p.slug} href={`/product/${p.slug}`} style={{ textDecoration:'none' }}>
                  <div className="card" style={{ overflow:'hidden' }}>
                    <div style={{ position:'relative', aspectRatio:'1' }}>
                      {p.images?.[0]
                        ? <Image src={p.images[0]} alt={p.name} fill sizes="(max-width:640px) 100vw, 33vw" style={{ objectFit:'cover' }} />
                        : <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-4)', fontSize:40 }}>🛴</div>
                      }
                      {p.old_price && <span style={{ position:'absolute', top:12, right:12, background:'#EF4444', color:'#fff', fontSize:11, fontWeight:700, padding:'3px 8px', borderRadius:4 }}>−{Math.round((p.old_price-p.price)/p.old_price*100)}%</span>}
                    </div>
                    <div style={{ padding:'20px 18px' }}>
                      <h3 style={{ fontSize:16, fontWeight:700, color:'var(--text)', marginBottom:8 }}>{p.name}</h3>
                      <div className="hide-mobile" style={{ display:'flex', gap:8, fontSize:12, color:'var(--text-3)', marginBottom:12 }}><span>{p.max_speed} км/г</span><span>•</span><span>{p.range_km} км</span><span>•</span><span>{p.battery_wh} Wh</span></div>
                      <div style={{ display:'flex', alignItems:'baseline', gap:8 }}>
                        <span style={{ fontSize:20, fontWeight:800, color:'var(--text)' }}>₴{p.price.toLocaleString('uk-UA')}</span>
                        {p.old_price && <span style={{ fontSize:13, color:'var(--text-4)', textDecoration:'line-through' }}>₴{p.old_price.toLocaleString('uk-UA')}</span>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
