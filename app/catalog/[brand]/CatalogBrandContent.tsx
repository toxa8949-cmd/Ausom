'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { fetchAllProducts } from '@/lib/data'
import { Product } from '@/lib/types'
import { ChevronRight, Loader2 } from 'lucide-react'

interface BrandCfg {
    name: string
    nameUA: string
    h1: string
    title: string
    description: string
    intro: string
}

interface Props {
    brand: string
    cfg: BrandCfg
}

export default function CatalogBrandContent({ brand, cfg }: Props) {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

  useEffect(() => {
        let cancelled = false
        fetchAllProducts()
          .then(list => {
                    if (!cancelled) setProducts(list.filter(p => p.brand === brand && p.in_stock))
          })
          .finally(() => { if (!cancelled) setLoading(false) })
        return () => { cancelled = true }
  }, [brand])

  return (
        <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
          {/* Page header */}
                <div style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border)', padding: '40px 0 32px' }}>
                          <div className="w-container">
                            {/* Breadcrumb (visual) */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-3)', marginBottom: 16 }}>
                                                <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Головна</Link>Link>
                                                <ChevronRight size={13} />
                                                <Link href="/catalog" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Каталог</Link>Link>
                                                <ChevronRight size={13} />
                                                <span style={{ color: 'var(--text)', fontWeight: 500 }}>{cfg.nameUA}</span>span>
                                    </div>div>
                          
                                    <div className="s-label">Каталог 2026</div>div>
                                    <h1 style={{ fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--text)', lineHeight: 1.05 }}>
                                      {cfg.h1}
                                    </h1>h1>
                                    <p style={{ fontSize: 14, color: 'var(--text-3)', marginTop: 12, maxWidth: 640 }}>
                                      {cfg.intro}
                                    </p>p>
                                    <p style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 8 }}>
                                      {loading ? 'Завантаження…' : `${products.length} моделей`}
                                    </p>p>
                          </div>div>
                </div>div>
        
              <div className="w-container" style={{ paddingTop: 32, paddingBottom: 64 }}>
                {loading && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0', color: 'var(--text-3)' }}>
                                <Loader2 size={22} style={{ animation: 'spin 1s linear infinite' }} />
                                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>style>
                    </div>div>
                      )}
              
                {!loading && products.length > 0 && (
                    <div className="catalog-grid">
                      {products.map(p => <ProductCard key={p.id} product={p} featured={p.slug === 'dt2-pro'} />)}
                    </div>div>
                      )}
              
                {!loading && products.length === 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 0', textAlign: 'center', gap: 16 }}>
                                <span style={{ fontSize: 48, opacity: .3 }}>🛴</span>span>
                                <h2 style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>Немає моделей у наявності</h2>h2>
                                <p style={{ fontSize: 14, color: 'var(--text-3)' }}>Моделі {cfg.nameUA} з&apos;являться найближчим часом</p>p>
                                <Link href="/catalog" className="btn btn-black btn-sm" style={{ marginTop: 8 }}>Переглянути весь каталог</Link>Link>
                    </div>div>
                      )}
              </div>div>
        </div>div>
      )
}</div>
