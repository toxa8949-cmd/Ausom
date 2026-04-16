'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { fetchAllProducts } from '@/lib/data'
import { Product } from '@/lib/types'
import { SlidersHorizontal, LayoutGrid, List, X, ChevronRight, Loader2 } from 'lucide-react'

const CATS   = [{ id:'all',label:'Всі' }, { id:'commuter',label:'Міські' }, { id:'offroad',label:'Позашляхові' }]
const BRANDS = [{ id:'all',label:'Всі бренди' }, { id:'ausom',label:'Ausom' }, { id:'kukirin',label:'Kukirin' }]
const VOLTS  = ['Всі','48V','52V','60V']
const MOTORS = [{ id:'all',label:'Всі' }, { id:'dual',label:'Подвійний' }, { id:'single',label:'Одиночний' }]
const SORTS  = [{ id:'default',label:'За замовчуванням' }, { id:'price_asc',label:'Ціна ↑' }, { id:'price_desc',label:'Ціна ↓' }, { id:'new',label:'Новинки' }]

function CatalogContent() {
  const params = useSearchParams()
  const router = useRouter()

  // DB state
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)

  // Read initial filters from URL so deep-links from menu land correctly.
  const initialBrand = params.get('brand') ?? 'all'
  const initialCat   = params.get('category') ?? 'all'

  const [brand, setBrand] = useState(initialBrand)
  const [cat,   setCat]   = useState(initialCat)
  const [volt,  setVolt]  = useState('Всі')
  const [mot,   setMot]   = useState('all')
  const [sort,  setSort]  = useState('default')
  const [grid,  setGrid]  = useState(true)

  // Sync state back to URL when filters change (so a user can share the URL).
  // We only replace, not push, so back button stays useful.
  useEffect(() => {
    const q = new URLSearchParams()
    if (brand !== 'all') q.set('brand', brand)
    if (cat   !== 'all') q.set('category', cat)
    const qs = q.toString()
    const url = qs ? `/catalog?${qs}` : '/catalog'
    router.replace(url, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, cat])

  // Re-sync state if URL changes via header menu click (different brand link)
  useEffect(() => {
    const nextBrand = params.get('brand') ?? 'all'
    const nextCat   = params.get('category') ?? 'all'
    if (nextBrand !== brand) setBrand(nextBrand)
    if (nextCat   !== cat)   setCat(nextCat)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  // Load products once
  useEffect(() => {
    let cancelled = false
    fetchAllProducts()
      .then(list => { if (!cancelled) setProducts(list) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  let list = products.filter(p => {
    if (brand !== 'all' && p.brand    !== brand) return false
    if (cat   !== 'all' && p.category !== cat)   return false
    if (volt  !== 'Всі' && p.voltage  !== volt.toLowerCase()) return false
    if (mot   === 'dual'   && p.motor !== 'dual')   return false
    if (mot   === 'single' && p.motor !== 'single') return false
    return true
  })
  if (sort === 'price_asc')  list = [...list].sort((a,b) => a.price - b.price)
  if (sort === 'price_desc') list = [...list].sort((a,b) => b.price - a.price)
  if (sort === 'new')        list = [...list].sort((a,b) => (b.is_new?1:0)-(a.is_new?1:0))

  const hasFilters = brand !== 'all' || cat !== 'all' || volt !== 'Всі' || mot !== 'all'
  const reset = () => { setBrand('all'); setCat('all'); setVolt('Всі'); setMot('all') }

  // Dynamic page title based on brand filter
  const pageTitle = brand === 'ausom'
    ? <>Самокати <span style={{ color:'var(--yellow-dark)' }}>Ausom</span></>
    : brand === 'kukirin'
      ? <>Самокати <span style={{ color:'var(--yellow-dark)' }}>Kukirin</span></>
      : <>Всі <span style={{ color:'var(--yellow-dark)' }}>самокати</span></>

  const btnFilter = (active: boolean) => ({
    padding: '7px 16px', fontSize: 12, fontWeight: 600,
    letterSpacing: '-.01em', borderRadius: 6, border: 'none',
    cursor: 'pointer' as const, transition: 'all .15s',
    background: active ? '#111' : 'transparent',
    color: active ? '#fff' : 'var(--text-3)',
    whiteSpace: 'nowrap' as const,
  })
  const btnFilterYellow = (active: boolean) => ({
    ...btnFilter(active),
    background: active ? '#F5C200' : 'transparent',
    color: active ? '#111' : 'var(--text-3)',
  })

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Page header */}
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'40px 0 32px' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:13, color:'var(--text-3)', marginBottom:16 }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={13}/>
            <span style={{ color:'var(--text)', fontWeight:500 }}>Каталог</span>
            {brand !== 'all' && (
              <>
                <ChevronRight size={13}/>
                <span style={{ color:'var(--text)', fontWeight:500 }}>{brand === 'ausom' ? 'Ausom' : 'Kukirin'}</span>
              </>
            )}
          </div>
          <div className="s-label">Каталог 2026</div>
          <h1 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.05 }}>
            {pageTitle}
          </h1>
          <p style={{ fontSize:14, color:'var(--text-3)', marginTop:8 }}>
            {loading ? 'Завантаження…' : `${list.length} моделей`}
          </p>
        </div>
      </div>

      <div className="w-container catalog-inner">

        {/* Filter bar */}
        <div
          className="catalog-filters"
          style={{
            background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:10,
            padding:'12px 16px', marginBottom:20,
          }}>
          <SlidersHorizontal size={14} style={{ color:'var(--text-3)', flexShrink:0 }}/>

          {/* Brand filter — new */}
          <div style={{ display:'flex', gap:4, background:'var(--bg)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
            {BRANDS.map(b => (
              <button key={b.id} onClick={() => setBrand(b.id)} style={btnFilter(brand===b.id)}>{b.label}</button>
            ))}
          </div>

          <div className="catalog-filters-divider" style={{ width:1, height:20, background:'var(--border)' }}/>

          <div style={{ display:'flex', gap:4, background:'var(--bg)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
            {CATS.map(f => (
              <button key={f.id} onClick={() => setCat(f.id)} style={btnFilter(cat===f.id)}>{f.label}</button>
            ))}
          </div>

          <div className="catalog-filters-divider" style={{ width:1, height:20, background:'var(--border)' }}/>

          <div style={{ display:'flex', gap:4, background:'var(--bg)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
            {VOLTS.map(v => (
              <button key={v} onClick={() => setVolt(v)} style={btnFilterYellow(volt===v)}>{v}</button>
            ))}
          </div>

          <div className="catalog-filters-divider" style={{ width:1, height:20, background:'var(--border)' }}/>

          <div style={{ display:'flex', gap:4, background:'var(--bg)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
            {MOTORS.map(m => (
              <button key={m.id} onClick={() => setMot(m.id)} style={btnFilter(mot===m.id)}>{m.label}</button>
            ))}
          </div>

          <div className="catalog-filters-right" style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
            <select value={sort} onChange={e => setSort(e.target.value)} aria-label="Сортування" style={{
              background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:6,
              padding:'7px 14px', fontSize:12, fontWeight:500, color:'var(--text-2)',
              outline:'none', cursor:'pointer', fontFamily:'Inter,sans-serif',
            }}>
              {SORTS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
            <div className="catalog-view-toggle" style={{ display:'flex', gap:4 }}>
              <button onClick={() => setGrid(true)} aria-label="Сітка" style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background: grid ? '#111' : 'var(--bg)', border:'1.5px solid var(--border)', borderRadius:6, cursor:'pointer', color: grid ? '#fff' : 'var(--text-3)' }}>
                <LayoutGrid size={14}/>
              </button>
              <button onClick={() => setGrid(false)} aria-label="Список" style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background: !grid ? '#111' : 'var(--bg)', border:'1.5px solid var(--border)', borderRadius:6, cursor:'pointer', color: !grid ? '#fff' : 'var(--text-3)' }}>
                <List size={14}/>
              </button>
            </div>
          </div>
        </div>

        {/* Active chips */}
        {hasFilters && (
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:20 }}>
            {brand !== 'all' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FFF3CC', border:'1px solid #F5C200', color:'#8B6800', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>{BRANDS.find(b=>b.id===brand)?.label}<button onClick={() => setBrand('all')} aria-label="Зняти фільтр" style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', display:'flex' }}><X size={10}/></button></span>}
            {cat   !== 'all' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FFF3CC', border:'1px solid #F5C200', color:'#8B6800', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>{CATS.find(c=>c.id===cat)?.label}<button onClick={() => setCat('all')} aria-label="Зняти фільтр" style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', display:'flex' }}><X size={10}/></button></span>}
            {volt  !== 'Всі' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FFF3CC', border:'1px solid #F5C200', color:'#8B6800', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>{volt}<button onClick={() => setVolt('Всі')} aria-label="Зняти фільтр" style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', display:'flex' }}><X size={10}/></button></span>}
            {mot   !== 'all' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FFF3CC', border:'1px solid #F5C200', color:'#8B6800', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>{MOTORS.find(m=>m.id===mot)?.label}<button onClick={() => setMot('all')} aria-label="Зняти фільтр" style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', display:'flex' }}><X size={10}/></button></span>}
            <button onClick={reset} style={{ fontSize:11, fontWeight:600, color:'var(--text-3)', background:'none', border:'none', cursor:'pointer', padding:'4px 8px' }}>Скинути все</button>
          </div>
        )}

        {loading && (
          <div style={{ display:'flex', justifyContent:'center', alignItems:'center', padding:'80px 0', color:'var(--text-3)' }}>
            <Loader2 size={22} style={{ animation:'spin 1s linear infinite' }}/>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {!loading && (
          <>
            <p style={{ fontSize:13, color:'var(--text-3)', marginBottom:20 }}>
              Знайдено <strong style={{ color:'var(--text)', fontWeight:700 }}>{list.length}</strong> моделей
            </p>

            {list.length > 0 ? (
              <div
                className={grid ? 'catalog-grid' : ''}
                style={grid ? undefined : { display:'grid', gridTemplateColumns:'1fr', gap:20 }}>
                {list.map(p => <ProductCard key={p.id} product={p} featured={p.slug==='dt2-pro'}/>)}
              </div>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 0', textAlign:'center', gap:16 }}>
                <span style={{ fontSize:48, opacity:.3 }}>🛴</span>
                <h2 style={{ fontSize:'clamp(22px,3vw,28px)', fontWeight:800, color:'var(--text)' }}>
                  {products.length === 0 ? 'Каталог порожній' : 'Нічого не знайдено'}
                </h2>
                <p style={{ fontSize:14, color:'var(--text-3)' }}>
                  {brand === 'kukirin' && products.filter(p => p.brand === 'kukirin').length === 0
                    ? 'Моделі Kukirin з\'являться найближчим часом'
                    : products.length === 0 ? 'Товари з\'являться найближчим часом' : 'Спробуй змінити або скинути фільтри'
                  }
                </p>
                {hasFilters && <button onClick={reset} className="btn btn-black btn-sm" style={{ marginTop:8 }}>Скинути фільтри</button>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// useSearchParams requires a Suspense boundary in Next 15.
export default function CatalogPage() {
  return (
    <Suspense fallback={<div style={{ minHeight:'60vh' }}/>}>
      <CatalogContent/>
    </Suspense>
  )
}
