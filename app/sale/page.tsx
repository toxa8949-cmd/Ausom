'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'
import { PRODUCTS } from '@/lib/data'

export default function SalePage() {
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
      <div style={{ background:'linear-gradient(135deg, rgba(245,194,0,.1) 0%, var(--bg) 50%, rgba(239,68,68,.05) 100%)', border:'none', padding:'56px 0', borderBottom:'1px solid var(--border)' }}>
        <div className="w-container" style={{ textAlign:'center' }}>
          <span style={{ display:'inline-block', background:'#EF4444', color:'#fff', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, padding:'6px 16px', borderRadius:4, marginBottom:20 }}>
            🔥 ВЕСНЯНИЙ РОЗПРОДАЖ
          </span>
          <h1 style={{ fontSize:'clamp(40px,6vw,72px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.05, marginBottom:16 }}>
            Знижки до <span style={{ color:'var(--yellow-dark)' }}>₴11 050</span>
          </h1>
          <p style={{ fontSize:16, color:'var(--text-2)', lineHeight:1.7, maxWidth:520, margin:'0 auto 20px' }}>
            Всі моделі Ausom зі знижкою −20%. Безкоштовна доставка та офіційна гарантія 2 роки.
          </p>
          <div style={{ display:'flex', justifyContent:'center', gap:20, fontSize:13, color:'var(--text-3)' }}>
            <span>✓ Безкоштовна доставка</span>
            <span>✓ Гарантія 2 роки</span>
            <span>✓ 14 днів повернення</span>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="w-container" style={{ padding:'40px 40px 72px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:20 }}>
          {PRODUCTS.map(p => <ProductCard key={p.id} product={p} featured={p.slug === 'dt2-pro'} />)}
        </div>
      </div>
    </div>
  )
}
