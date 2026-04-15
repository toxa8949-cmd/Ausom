'use client'
import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { getProductsByCategory } from '@/lib/data'
import { ArrowRight } from 'lucide-react'

const TABS = [
  { id:'new',      label:'Новинки' },
  { id:'all',      label:'Всі моделі' },
  { id:'offroad',  label:'Позашляхові' },
  { id:'commuter', label:'Міські' },
]

export default function CatalogTabs() {
  const [active, setActive] = useState('all')
  const products = getProductsByCategory(active)

  return (
    <section style={{ padding:'88px 0', background:'var(--bg)', borderTop:'1px solid var(--border)' }}>
      <div className="w-container">
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16, marginBottom:36 }}>
          <div>
            <div className="s-label">Каталог 2026</div>
            <h2 style={{ fontSize:'clamp(30px,3.5vw,46px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', lineHeight:1.1 }}>
              Обери свій <span style={{ color:'var(--yellow-dark)' }}>Ride</span>
            </h2>
          </div>
          <Link href="/catalog" style={{ display:'flex', alignItems:'center', gap:6, fontSize:14, fontWeight:600, color:'var(--text-2)', textDecoration:'none' }}
          onMouseEnter={e=>(e.currentTarget.style.color='var(--text)')}
          onMouseLeave={e=>(e.currentTarget.style.color='var(--text-2)')}>
            Весь каталог <ArrowRight size={15}/>
          </Link>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:6, marginBottom:28, borderBottom:'1px solid var(--border)', paddingBottom:0 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={()=>setActive(t.id)} style={{
              padding:'10px 20px', fontSize:13, fontWeight:600,
              letterSpacing:'-.01em',
              background:'none', border:'none', cursor:'pointer',
              color: active===t.id ? 'var(--text)' : 'var(--text-3)',
              borderBottom: active===t.id ? '2px solid #F5C200' : '2px solid transparent',
              marginBottom:-1, transition:'color .15s',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
          {products.slice(0,4).map(p => (
            <ProductCard key={p.id} product={p} featured={p.slug==='dt2-pro'}/>
          ))}
        </div>
      </div>
    </section>
  )
}
