'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { fetchAllProducts } from '@/lib/data'
import { Product } from '@/lib/types'
import { ArrowRight, Loader2 } from 'lucide-react'

const TABS = [
  { id:'new',      label:'Новинки' },
  { id:'all',      label:'Всі моделі' },
  { id:'offroad',  label:'Позашляхові' },
  { id:'commuter', label:'Міські' },
]

export default function CatalogTabs() {
  const [active, setActive] = useState('all')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  // Filter on client — no separate DB round-trip per tab
  const filtered = (() => {
    if (active === 'all')      return products
    if (active === 'new')      return products.filter(p => p.is_new)
    if (active === 'offroad')  return products.filter(p => p.category === 'offroad')
    if (active === 'commuter') return products.filter(p => p.category === 'commuter')
    return products
  })().slice(0, 4)

  return (
    <section className="home-section" style={{ padding:'88px 0', background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="w-container">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:28 }}>
          <div>
            <div className="s-label">Каталог 2026</div>
            <h2 style={{ fontSize:'clamp(24px,3.5vw,46px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', lineHeight:1.1 }}>
              Обери свій <span style={{ color:'var(--yellow-dark)' }}>Ride</span>
            </h2>
          </div>
          <Link href="/catalog" style={{ display:'flex', alignItems:'center', gap:6, fontSize:14, fontWeight:600, color:'var(--text-2)', textDecoration:'none' }}
          onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
          onMouseLeave={e=>(e.currentTarget.style.color='var(--text-2)')}>
            Весь каталог <ArrowRight size={15}/>
          </Link>
        </div>

        <div className="home-tabs">
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setActive(t.id)} style={{
              padding:'10px 20px', fontSize:13, fontWeight:600,
              letterSpacing:'-.01em', whiteSpace:'nowrap',
              background:'none', border:'none', cursor:'pointer',
              color: active===t.id ? 'var(--text)' : 'var(--text-3)',
              borderBottom: active===t.id ? '2px solid #F5C200' : '2px solid transparent',
              marginBottom:-1, transition:'color .15s',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'60px 0', color:'var(--text-3)' }}>
            <Loader2 size={22} style={{ animation:'spin 1s linear infinite' }}/>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : filtered.length > 0 ? (
          <div className="home-products-grid">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} featured={p.slug==='dt2-pro'}/>
            ))}
          </div>
        ) : (
          <div style={{ padding:'48px 0', textAlign:'center', color:'var(--text-3)', fontSize:14 }}>
            У цій категорії поки немає товарів
          </div>
        )}
      </div>
    </section>
  )
}
