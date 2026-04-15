'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PRODUCTS } from '@/lib/data'
import { Check, X, ShoppingBag, GitCompare, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart'

const SPECS = [
  { key:'price',        label:'Ціна',               fmt:(v:any)=>`₴${Number(v).toLocaleString('uk-UA')}`,  higherBetter:false },
  { key:'voltage',      label:'Напруга',             fmt:(v:any)=>v.toUpperCase(),                           higherBetter:true  },
  { key:'range_km',     label:'Запас ходу',          fmt:(v:any)=>`${v} км`,                                 higherBetter:true  },
  { key:'max_speed',    label:'Макс. швидкість',     fmt:(v:any)=>`${v} км/год`,                             higherBetter:true  },
  { key:'battery_wh',   label:'Акумулятор',          fmt:(v:any)=>`${v} Wh`,                                 higherBetter:true  },
  { key:'weight_kg',    label:'Вага',                fmt:(v:any)=>`${v} кг`,                                 higherBetter:false },
  { key:'max_load_kg',  label:'Макс. навантаження',  fmt:(v:any)=>`${v} кг`,                                 higherBetter:true  },
  { key:'motor',        label:'Мотор',               fmt:(v:any)=>v==='dual'?'Подвійний':'Одиночний',        higherBetter:null  },
  { key:'category',     label:'Тип',                 fmt:(v:any)=>v==='offroad'?'Позашляховий':'Міський',    higherBetter:null  },
  { key:'in_stock',     label:'Наявність',           fmt:(v:any)=>v?'В наявності':'Немає',                   higherBetter:null  },
]

export default function ComparePage() {
  const { addItem } = useCart()
  const [selected, setSelected] = useState<string[]>(['l1','l2-dual','dt2-pro'])
  const [picking,  setPicking]  = useState(false)

  const toggle = (slug: string) => {
    if (selected.includes(slug)) {
      if (selected.length > 1) setSelected(s => s.filter(x => x !== slug))
    } else {
      if (selected.length < 4) setSelected(s => [...s, slug])
    }
  }

  const compared  = PRODUCTS.filter(p => selected.includes(p.slug))
  const available = PRODUCTS.filter(p => !selected.includes(p.slug))

  // Find best numeric value per row
  const getBest = (key: string, higherBetter: boolean | null) => {
    if (higherBetter === null) return null
    const vals = compared.map(p => parseFloat(String((p as any)[key]))).filter(v => !isNaN(v))
    if (vals.length < 2) return null
    return higherBetter ? Math.max(...vals) : Math.min(...vals)
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* Header */}
      <div className="bg-[var(--bg-mid)] border-b border-[var(--border)] py-14">
        <div className="w-container">
          <span className="s-label">Інструмент вибору</span>
          <h1 className="t-h1 text-[var(--text)]">Порівняй <span className="text-[var(--brand-dk)]">Моделі</span></h1>
          <p className="text-[var(--text-3)] text-[13px] mt-2">Обери до 4 моделей · жовтим виділено найкраще значення</p>
        </div>
      </div>

      <div className="w-container py-10">

        {/* Model selector chips */}
        <div className="mb-8">
          <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[var(--text-3)] mb-3">Обрані моделі ({selected.length}/4)</p>
          <div className="flex flex-wrap gap-2">
            {PRODUCTS.map(p => {
              const isSel = selected.includes(p.slug)
              const disabled = !isSel && selected.length >= 4
              return (
                <button key={p.slug} onClick={() => !disabled && toggle(p.slug)} disabled={disabled}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[12px] font-semibold transition-all ${
                    isSel    ? 'border-[var(--brand)] bg-[var(--brand)]/10 text-[var(--text)]' :
                    disabled ? 'border-[var(--border)] text-[var(--text-3)] opacity-40 cursor-not-allowed' :
                               'border-[var(--border)] text-[var(--text-3)] hover:border-white/30 hover:text-[var(--text)]'
                  }`}>
                  {isSel && <span className="w-4 h-4 bg-[var(--brand)] rounded-full flex items-center justify-center"><Check size={9} className="#111" strokeWidth={3}/></span>}
                  {p.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Comparison table */}
        <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
          <table className="w-full min-w-[600px]" style={{ borderCollapse:'collapse' }}>

            {/* Product headers */}
            <thead>
              <tr className="border-b border-[var(--border)]">
                <th className="bg-[var(--bg-surface)] w-44 p-4 text-left text-[11px] font-bold uppercase tracking-[.08em] text-[var(--text-3)]">Характеристика</th>
                {compared.map(p => (
                  <th key={p.slug} className="bg-[var(--bg-mid)] p-5 border-l border-[var(--border)]">
                    <div className="flex flex-col items-center gap-3">
                      {/* Mini scooter icon */}
                      <div className="w-16 h-16 bg-[var(--bg-surface)] rounded-xl flex items-center justify-center">
                        <svg viewBox="0 0 60 50" fill="none" width="40" height="32">
                          <circle cx="10" cy="40" r="8" stroke="#F5C200" strokeWidth="2.5"/>
                          <circle cx="50" cy="40" r="8" stroke="#F5C200" strokeWidth="2.5"/>
                          <path d="M10 40L18 16L40 11L50 40" stroke="#F5F5F0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
                          <path d="M18 16L24 4" stroke="#F5C200" strokeWidth="2.5" strokeLinecap="round"/>
                          <rect x="19" y="1" width="11" height="6" rx="1.5" fill="#F5C200"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-[var(--text)] text-center leading-tight mb-1">{p.name}</p>
                        <p className="font-bold text-[20px] text-[var(--brand-dk)] tracking-wide leading-none text-center">₴{p.price.toLocaleString('uk-UA')}</p>
                      </div>
                      <button onClick={() => toggle(p.slug)}
                        className="w-6 h-6 flex items-center justify-center bg-[var(--bg-surface)] border border-[var(--border)] rounded text-[var(--text-3)] hover:text-red-400 hover:border-red-400/30 transition-all">
                        <X size={11}/>
                      </button>
                    </div>
                  </th>
                ))}
                {/* Add slot */}
                {selected.length < 4 && (
                  <th className="bg-[var(--bg-mid)] p-5 border-l border-[var(--border)] border-dashed">
                    <div className="flex flex-col items-center gap-2 relative">
                      <button onClick={() => setPicking(!picking)}
                        className="w-16 h-16 bg-[var(--bg-surface)] border border-dashed border-[var(--border)] rounded-xl flex items-center justify-center text-[var(--text-3)] hover:border-[var(--brand)]/40 hover:text-[var(--brand-dk)] transition-all">
                        <Plus size={20}/>
                      </button>
                      <p className="text-[11px] text-[var(--text-3)]">Додати</p>
                      {picking && available.length > 0 && (
                        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-[var(--bg-surface)] border border-[var(--border)] rounded-xl p-1.5 min-w-[160px] z-20 shadow-xl">
                          {available.map(p => (
                            <button key={p.slug} onClick={() => { toggle(p.slug); setPicking(false) }}
                              className="block w-full text-left px-3 py-2 text-[12px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-white/5 rounded-lg transition-colors">
                              {p.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {SPECS.map(({ key, label, fmt, higherBetter }, i) => {
                const best = getBest(key, higherBetter)
                return (
                  <tr key={key} className={`border-b border-[var(--border)] ${i%2===0 ? 'bg-[var(--bg)]' : 'bg-[var(--bg-mid)]/40'} hover:bg-[var(--bg-surface)]/40 transition-colors`}>
                    <td className="bg-[var(--bg-surface)] px-5 py-3.5 text-[12px] font-medium text-[var(--text-3)]">{label}</td>
                    {compared.map(p => {
                      const val = (p as any)[key]
                      const num = parseFloat(String(val))
                      const isBest = best !== null && !isNaN(num) && num === best
                      return (
                        <td key={p.slug} className={`px-5 py-3.5 text-center text-[13px] border-l border-[var(--border)] font-medium ${isBest ? 'text-[var(--brand-dk)] font-bold' : 'text-[var(--text)]'}`}>
                          {val === true ? <Check size={16} className="text-green-400 mx-auto" /> :
                           val === false ? <X size={16} className="text-[var(--border)] mx-auto" /> :
                           fmt(val)}
                          {isBest && <span className="block text-[9px] text-[var(--brand-dk)]/60 font-normal mt-0.5">найкраще</span>}
                        </td>
                      )
                    })}
                    {selected.length < 4 && <td className="border-l border-dashed border-[var(--border)]" />}
                  </tr>
                )
              })}

              {/* CTA row */}
              <tr>
                <td className="bg-[var(--bg-surface)] px-5 py-4" />
                {compared.map(p => (
                  <td key={p.slug} className="px-4 py-4 border-l border-[var(--border)] bg-[var(--bg-mid)]">
                    <button onClick={() => addItem(p)} className="btn btn-black btn-sm w-full justify-center">
                      <ShoppingBag size={12}/> До кошика
                    </button>
                    <Link href={`/product/${p.slug}`} className="btn btn-white btn-sm w-full justify-center mt-1 text-[11px]">Детальніше</Link>
                  </td>
                ))}
                {selected.length < 4 && <td className="border-l border-dashed border-[var(--border)] bg-[var(--bg-mid)]" />}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tip */}
        <p className="text-[11px] text-[var(--text-3)] text-center mt-4 flex items-center justify-center gap-1">
          <GitCompare size={12}/> Можна порівняти до 4 моделей одночасно
        </p>
      </div>
    </div>
  )
}
