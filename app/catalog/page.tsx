'use client'

import { useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ui/ProductCard'
import { PRODUCTS } from '@/lib/data'
import { SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react'

const CATS   = [{ id:'all',label:'Всі' },{ id:'commuter',label:'Міські' },{ id:'offroad',label:'Позашляхові' }]
const VOLTS  = ['Всі','48V','52V','60V']
const MOTORS = [{ id:'all',label:'Всі мотори' },{ id:'dual',label:'Подвійний' },{ id:'single',label:'Одиночний' }]
const SORTS  = [{ id:'default',label:'За замовчуванням' },{ id:'price_asc',label:'Ціна ↑' },{ id:'price_desc',label:'Ціна ↓' },{ id:'new',label:'Новинки' }]

export default function CatalogPage() {
  const [cat,  setCat]  = useState('all')
  const [volt, setVolt] = useState('Всі')
  const [mot,  setMot]  = useState('all')
  const [sort, setSort] = useState('default')
  const [grid, setGrid] = useState(true)

  let list = PRODUCTS.filter(p => {
    if (cat  !== 'all' && p.category !== cat)                 return false
    if (volt !== 'Всі' && p.voltage  !== volt.toLowerCase())  return false
    if (mot  === 'dual'   && p.motor !== 'dual')              return false
    if (mot  === 'single' && p.motor !== 'single')            return false
    return true
  })
  if (sort === 'price_asc')  list = [...list].sort((a,b) => a.price - b.price)
  if (sort === 'price_desc') list = [...list].sort((a,b) => b.price - a.price)
  if (sort === 'new')        list = [...list].sort((a,b) => (b.is_new?1:0)-(a.is_new?1:0))

  const hasFilters = cat !== 'all' || volt !== 'Всі' || mot !== 'all'
  const reset = () => { setCat('all'); setVolt('Всі'); setMot('all') }

  return (
    <div className="min-h-screen bg-[var(--black)]">

      {/* Page header */}
      <div className="bg-[var(--mid)] border-b border-[var(--border)] py-14">
        <div className="container-wide">
          <div className="flex items-center gap-2 text-[12px] text-[var(--muted)] mb-4">
            <Link href="/" className="hover:text-white transition-colors">Головна</Link>
            <span className="text-[var(--border)]">/</span>
            <span className="text-white">Каталог</span>
          </div>
          <span className="section-label">Каталог 2026</span>
          <h1 className="section-heading text-white">
            Всі <span className="text-[var(--brand)]">Самокати</span>
          </h1>
          <p className="text-[var(--muted)] text-[14px] mt-2">{list.length} моделей</p>
        </div>
      </div>

      <div className="container-wide py-10">

        {/* Filters toolbar */}
        <div className="bg-[var(--mid)] border border-[var(--border)] rounded-xl p-4 mb-8 flex flex-wrap items-center gap-3">
          <SlidersHorizontal size={15} className="text-[var(--muted)] shrink-0" />

          {/* Category */}
          <div className="flex gap-1">
            {CATS.map(f => (
              <button key={f.id} onClick={() => setCat(f.id)}
                className={`px-3.5 py-2 text-[12px] font-bold uppercase tracking-wide rounded-lg transition-all ${cat===f.id ? 'bg-white text-[var(--black)]' : 'text-[var(--muted)] hover:text-white hover:bg-white/6'}`}>
                {f.label}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-[var(--border)]" />

          {/* Voltage */}
          <div className="flex gap-1">
            {VOLTS.map(v => (
              <button key={v} onClick={() => setVolt(v)}
                className={`px-3.5 py-2 text-[12px] font-bold uppercase tracking-wide rounded-lg transition-all ${volt===v ? 'bg-[var(--brand)] text-[var(--black)]' : 'text-[var(--muted)] hover:text-white hover:bg-white/6'}`}>
                {v}
              </button>
            ))}
          </div>

          <div className="w-px h-5 bg-[var(--border)]" />

          {/* Motor */}
          <div className="flex gap-1">
            {MOTORS.map(m => (
              <button key={m.id} onClick={() => setMot(m.id)}
                className={`px-3.5 py-2 text-[12px] font-bold uppercase tracking-wide rounded-lg transition-all ${mot===m.id ? 'bg-white text-[var(--black)]' : 'text-[var(--muted)] hover:text-white hover:bg-white/6'}`}>
                {m.label}
              </button>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Sort */}
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="bg-[var(--surface)] border border-[var(--border)] text-[var(--light)] text-[12px] font-medium rounded-lg px-3 py-2 outline-none focus:border-[var(--brand)] cursor-pointer transition-colors">
              {SORTS.map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </select>

            {/* View toggle */}
            <div className="flex gap-1">
              <button onClick={() => setGrid(true)}  className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${grid  ? 'bg-[var(--surface)] border-[var(--brand)]/30 text-[var(--brand)]' : 'border-[var(--border)] text-[var(--muted)] hover:text-white'}`}><LayoutGrid size={14}/></button>
              <button onClick={() => setGrid(false)} className={`w-8 h-8 flex items-center justify-center rounded-lg border transition-all ${!grid ? 'bg-[var(--surface)] border-[var(--brand)]/30 text-[var(--brand)]' : 'border-[var(--border)] text-[var(--muted)] hover:text-white'}`}><List size={14}/></button>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-6">
            {cat  !== 'all' && <span className="flex items-center gap-1.5 bg-[var(--brand)]/8 border border-[var(--brand)]/20 text-[var(--brand)] text-[11px] font-bold px-3 py-1.5 rounded-full">{CATS.find(c=>c.id===cat)?.label}<button onClick={() => setCat('all')}><X size={11}/></button></span>}
            {volt !== 'Всі' && <span className="flex items-center gap-1.5 bg-[var(--brand)]/8 border border-[var(--brand)]/20 text-[var(--brand)] text-[11px] font-bold px-3 py-1.5 rounded-full">{volt}<button onClick={() => setVolt('Всі')}><X size={11}/></button></span>}
            {mot  !== 'all' && <span className="flex items-center gap-1.5 bg-[var(--brand)]/8 border border-[var(--brand)]/20 text-[var(--brand)] text-[11px] font-bold px-3 py-1.5 rounded-full">{MOTORS.find(m=>m.id===mot)?.label}<button onClick={() => setMot('all')}><X size={11}/></button></span>}
            <button onClick={reset} className="text-[11px] font-medium text-[var(--muted)] hover:text-white transition-colors px-2">Скинути всі</button>
          </div>
        )}

        {/* Results count */}
        <p className="text-[13px] text-[var(--muted)] mb-6">
          Знайдено <strong className="text-white">{list.length}</strong> моделей
        </p>

        {/* Grid */}
        {list.length > 0 ? (
          <div className={grid
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'
            : 'flex flex-col gap-4'
          }>
            {list.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
            <span className="text-6xl opacity-20">🛴</span>
            <h2 className="font-display text-[32px] text-white">Нічого не знайдено</h2>
            <p className="text-[var(--muted)] max-w-xs">Спробуй змінити або скинути фільтри</p>
            <button onClick={reset} className="btn-primary btn-sm mt-2">Скинути фільтри</button>
          </div>
        )}
      </div>
    </div>
  )
}
