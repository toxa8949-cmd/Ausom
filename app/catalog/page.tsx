'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { PRODUCTS } from '@/lib/data'
import { SlidersHorizontal, LayoutGrid, List, X, ChevronRight } from 'lucide-react'

const CATS   = [{ id:'all',label:'Всі' }, { id:'commuter',label:'Міські' }, { id:'offroad',label:'Позашляхові' }]
const VOLTS  = ['Всі','48V','52V','60V']
const MOTORS = [{ id:'all',label:'Всі' }, { id:'dual',label:'Подвійний' }, { id:'single',label:'Одиночний' }]
const SORTS  = [{ id:'default',label:'За замовчуванням' }, { id:'price_asc',label:'Ціна ↑' }, { id:'price_desc',label:'Ціна ↓' }, { id:'new',label:'Новинки' }]

export default function CatalogPage() {
  const [cat,  setCat]  = useState('all')
  const [volt, setVolt] = useState('Всі')
  const [mot,  setMot]  = useState('all')
  const [sort, setSort] = useState('default')
  const [grid, setGrid] = useState(true)

  let list = PRODUCTS.filter(p => {
    if (cat  !== 'all' && p.category !== cat) return false
    if (volt !== 'Всі' && p.voltage  !== volt.toLowerCase()) return false
    if (mot  === 'dual'   && p.motor !== 'dual')   return false
    if (mot  === 'single' && p.motor !== 'single') return false
    return true
  })
  if (sort === 'price_asc')  list = [...list].sort((a,b) => a.price - b.price)
  if (sort === 'price_desc') list = [...list].sort((a,b) => b.price - a.price)
  if (sort === 'new')        list = [...list].sort((a,b) => (b.is_new?1:0)-(a.is_new?1:0))

  const hasFilters = cat !== 'all' || volt !== 'Всі' || mot !== 'all'
  const reset = () => { setCat('all'); setVolt('Всі'); setMot('all') }

  const btnFilter = (active: boolean) => ({
    padding: '7px 16px', fontSize: 12, fontWeight: 600,
    letterSpacing: '-.01em', borderRadius: 6, border: 'none',
    cursor: 'pointer' as const, transition: 'all .15s',
    background: active ? '#111' : 'transparent',
    color: active ? '#fff' : 'var(--text-3)',
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
          </div>
          <div className="s-label">Каталог 2026</div>
          <h1 style={{ fontSize:'clamp(32px,4vw,52px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.05 }}>
            Всі <span style={{ color:'var(--yellow-dark)' }}>самокати</span>
          </h1>
          <p style={{ fontSize:14, color:'var(--text-3)', marginTop:8 }}>{list.length} моделей</p>
        </div>
      </div>

      <div className="w-container" style={{ padding:'32px 40px' }}>

        {/* Filters */}
        <div style={{ background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:10, padding:'12px 16px', marginBottom:24, display:'flex', flexWrap:'wrap', alignItems:'center', gap:8 }}>
          <SlidersHorizontal size={14} style={{ color:'var(--text-3)', flexShrink:0 }}/>

          <div style={{ display:'flex', gap:4, background:'var(--bg)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
            {CATS.map(f => (
              <button key={f.id} onClick={() => setCat(f.id)} style={btnFilter(cat===f.id)}>{f.label}</button>
            ))}
          </div>

          <div style={{ width:1, height:20, background:'var(--border)' }}/>

          <div style={{ display:'flex', gap:4, background:'var(--bg)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
            {VOLTS.map(v => (
              <button key={v} onClick={() => setVolt(v)} style={btnFilterYellow(volt===v)}>{v}</button>
            ))}
          </div>

          <div style={{ width:1, height:20, background:'var(--border)' }}/>

          <div style={{ display:'flex', gap:4, background:'var(--bg)', border:'1px solid var(--border)', borderRadius:8, padding:3 }}>
            {MOTORS.map(m => (
              <button key={m.id} onClick={() => setMot(m.id)} style={btnFilter(mot===m.id)}>{m.label}</button>
            ))}
          </div>

          <div style={{ marginLeft:'auto', display:'flex', alignItems:'center', gap:8 }}>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{
              background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:6,
              padding:'7px 14px', fontSize:12, fontWeight:500, color:'var(--text-2)',
              outline:'none', cursor:'pointer', fontFamily:'Inter,sans-serif',
            }}>
              {SORTS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>
            <div style={{ display:'flex', gap:4 }}>
              <button onClick={() => setGrid(true)} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background: grid ? '#111' : 'var(--bg)', border:'1.5px solid var(--border)', borderRadius:6, cursor:'pointer', color: grid ? '#fff' : 'var(--text-3)' }}>
                <LayoutGrid size={14}/>
              </button>
              <button onClick={() => setGrid(false)} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background: !grid ? '#111' : 'var(--bg)', border:'1.5px solid var(--border)', borderRadius:6, cursor:'pointer', color: !grid ? '#fff' : 'var(--text-3)' }}>
                <List size={14}/>
              </button>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div style={{ display:'flex', alignItems:'center', gap:8, flexWrap:'wrap', marginBottom:20 }}>
            {cat  !== 'all' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FFF3CC', border:'1px solid #F5C200', color:'#8B6800', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>{CATS.find(c=>c.id===cat)?.label}<button onClick={() => setCat('all')} style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', display:'flex' }}><X size={10}/></button></span>}
            {volt !== 'Всі' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FFF3CC', border:'1px solid #F5C200', color:'#8B6800', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>{volt}<button onClick={() => setVolt('Всі')} style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', display:'flex' }}><X size={10}/></button></span>}
            {mot  !== 'all' && <span style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#FFF3CC', border:'1px solid #F5C200', color:'#8B6800', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20 }}>{MOTORS.find(m=>m.id===mot)?.label}<button onClick={() => setMot('all')} style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', display:'flex' }}><X size={10}/></button></span>}
            <button onClick={reset} style={{ fontSize:11, fontWeight:600, color:'var(--text-3)', background:'none', border:'none', cursor:'pointer', padding:'4px 8px' }}>Скинути все</button>
          </div>
        )}

        <p style={{ fontSize:13, color:'var(--text-3)', marginBottom:20 }}>
          Знайдено <strong style={{ color:'var(--text)', fontWeight:700 }}>{list.length}</strong> моделей
        </p>

        {list.length > 0 ? (
          <div style={{ display:'grid', gridTemplateColumns: grid ? 'repeat(4,1fr)' : '1fr', gap:20 }}>
            {list.map(p => <ProductCard key={p.id} product={p} featured={p.slug==='dt2-pro'}/>)}
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'80px 0', textAlign:'center', gap:16 }}>
            <span style={{ fontSize:48, opacity:.3 }}>🛴</span>
            <h2 style={{ fontSize:28, fontWeight:800, color:'var(--text)' }}>Нічого не знайдено</h2>
            <p style={{ fontSize:14, color:'var(--text-3)' }}>Спробуй змінити або скинути фільтри</p>
            <button onClick={reset} className="btn btn-black btn-sm" style={{ marginTop:8 }}>Скинути фільтри</button>
          </div>
        )}
      </div>
    </div>
  )
}
