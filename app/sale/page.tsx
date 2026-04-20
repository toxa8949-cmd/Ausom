'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Loader2 } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { fetchAllProducts } from '@/lib/data'
import { Product } from '@/lib/types'

export default function SalePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllProducts()
      .then(list => setProducts(list.filter(p => p.old_price)))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'16px 0' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)' }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/>
            <span style={{ color:'var(--text)', fontWeight:500 }}>Розпродаж</span>
          </div>
        </div>
      </div>

      {/* Hero banner */}
      <div className="sale-hero" style={{ background:'linear-gradient(135deg, rgba(245,194,0,.1) 0%, var(--bg) 50%, rgba(239,68,68,.05) 100%)', border:'none', padding:'56px 0', borderBottom:'1px solid var(--border)' }}>
        <div className="w-container" style={{ textAlign:'center' }}>
          <span style={{ display:'inline-block', background:'#EF4444', color:'#fff', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, padding:'6px 16px', borderRadius:4, marginBottom:20 }}>
            🔥 ВЕСНЯНИЙ РОЗПРОДАЖ
          </span>
          <h1 style={{ fontSize:'clamp(28px,6vw,72px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.05, marginBottom:16 }}>
            Знижки до <span style={{ color:'var(--yellow-dark)' }}>₴11 050</span>
          </h1>
          <p style={{ fontSize:'clamp(14px,1.6vw,16px)', color:'var(--text-2)', lineHeight:1.7, maxWidth:520, margin:'0 auto 20px' }}>
            Всі моделі Ausom зі знижкою.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:20, fontSize:13, color:'var(--text-3)', flexWrap:'wrap' }}>
            <span>✓ 14 днів повернення</span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-container" style={{ padding:'40px 40px 72px' }}>
        {loading ? (
          <div style={{ display:'flex', justifyContent:'center', padding:'60px 0', color:'var(--text-3)' }}>
            <Loader2 size={22} style={{ animation:'spin 1s linear infinite' }}/>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        ) : products.length > 0 ? (
          <div className="catalog-grid">
            {products.map(p => <ProductCard key={p.id} product={p} featured={p.slug === 'dt2-pro'} />)}
          </div>
        ) : (
          <div style={{ padding:'60px 0', textAlign:'center', color:'var(--text-3)', fontSize:14 }}>
            Зараз немає товарів зі знижкою
          </div>
        )}
      </div>
    </div>
  )
}
