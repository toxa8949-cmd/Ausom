'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PRODUCTS } from '@/lib/data'
import { Check, X, ShoppingBag, Plus, ChevronRight } from 'lucide-react'
import { useCart } from '@/lib/cart'

const SPECS = [
  { key:'price',       label:'Ціна',               fmt:(v:any)=>`₴${Number(v).toLocaleString('uk-UA')}`,   higher:false },
  { key:'voltage',     label:'Напруга',             fmt:(v:any)=>v.toUpperCase(),                            higher:true  },
  { key:'range_km',    label:'Запас ходу',          fmt:(v:any)=>`${v} км`,                                  higher:true  },
  { key:'max_speed',   label:'Макс. швидкість',     fmt:(v:any)=>`${v} км/год`,                              higher:true  },
  { key:'battery_wh',  label:'Акумулятор',          fmt:(v:any)=>`${v} Wh`,                                  higher:true  },
  { key:'weight_kg',   label:'Вага',                fmt:(v:any)=>`${v} кг`,                                  higher:false },
  { key:'max_load_kg', label:'Макс. навантаження',  fmt:(v:any)=>`${v} кг`,                                  higher:true  },
  { key:'motor',       label:'Мотор',               fmt:(v:any)=>v==='dual'?'Подвійний':'Одиночний',         higher:null  },
  { key:'category',    label:'Тип',                 fmt:(v:any)=>v==='offroad'?'Позашляховий':'Міський',     higher:null  },
  { key:'in_stock',    label:'Наявність',           fmt:(v:any)=>v,                                          higher:null  },
]

const ScooterIcon = () => (
  <svg viewBox="0 0 100 80" fill="none" width="64" height="51">
    <circle cx="20" cy="64" r="14" stroke="#F5C200" strokeWidth="4"/>
    <circle cx="80" cy="64" r="14" stroke="#F5C200" strokeWidth="4"/>
    <path d="M20 64L32 24L62 17L80 64" stroke="var(--text)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" opacity=".7"/>
    <path d="M32 24L40 6" stroke="#F5C200" strokeWidth="4" strokeLinecap="round"/>
    <rect x="35" y="2" width="18" height="9" rx="2.5" fill="#F5C200"/>
    <path d="M62 17L78 30" stroke="var(--text-3)" strokeWidth="3.5" strokeLinecap="round"/>
  </svg>
)

export default function ComparePage() {
  const { addItem } = useCart()
  const [selected,  setSelected]  = useState<string[]>(['l1', 'l2-dual', 'dt2-pro'])
  const [showPicker, setShowPicker] = useState(false)

  const toggle = (slug: string) => {
    if (selected.includes(slug)) {
      if (selected.length > 1) setSelected(s => s.filter(x => x !== slug))
    } else {
      if (selected.length < 4) setSelected(s => [...s, slug])
    }
  }

  const compared  = PRODUCTS.filter(p => selected.includes(p.slug))
  const available = PRODUCTS.filter(p => !selected.includes(p.slug))

  const getBest = (key: string, higher: boolean | null) => {
    if (higher === null) return null
    const vals = compared.map(p => parseFloat(String((p as any)[key]))).filter(v => !isNaN(v))
    if (vals.length < 2) return null
    return higher ? Math.max(...vals) : Math.min(...vals)
  }

  const colW = 200
  const labelW = 180

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>

      {/* Header */}
      <div style={{ background:'var(--bg-soft)', borderBottom:'1px solid var(--border)', padding:'clamp(24px,4vw,40px) 0 clamp(20px,3vw,32px)' }}>
        <div className="w-container">
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'var(--text-3)', marginBottom:16 }}>
            <Link href="/" style={{ color:'var(--text-3)', textDecoration:'none' }}>Головна</Link>
            <ChevronRight size={12}/>
            <span style={{ color:'var(--text)', fontWeight:500 }}>Порівняння</span>
          </div>
          <div className="s-label">Інструмент вибору</div>
          <h1 style={{ fontSize:'clamp(26px,4vw,56px)', fontWeight:800, letterSpacing:'-.03em', color:'var(--text)', lineHeight:1.05, marginBottom:8 }}>
            Порівняй <span style={{ color:'var(--yellow-dark)' }}>моделі</span>
          </h1>
          <p style={{ fontSize:14, color:'var(--text-3)' }}>Обери до 4 моделей · жовтим виділено найкраще значення</p>
        </div>
      </div>

      <div className="w-container compare-inner">

        {/* Model selector chips */}
        <div style={{ marginBottom:24 }}>
          <p style={{ fontSize:11, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'var(--text-3)', marginBottom:12 }}>
            Обрані моделі ({selected.length}/4)
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {PRODUCTS.map(p => {
              const isSel    = selected.includes(p.slug)
              const disabled = !isSel && selected.length >= 4
              return (
                <button key={p.slug} onClick={() => !disabled && toggle(p.slug)} disabled={disabled} style={{
                  display:'flex', alignItems:'center', gap:8,
                  padding:'8px 16px', borderRadius:20,
                  border:'1.5px solid',
                  fontSize:13, fontWeight:600, cursor: disabled ? 'not-allowed' : 'pointer',
                  transition:'all .15s',
                  background: isSel ? '#FFF3CC' : 'var(--bg)',
                  borderColor: isSel ? '#F5C200' : 'var(--border-md)',
                  color: isSel ? '#8B6800' : 'var(--text-3)',
                  opacity: disabled ? .4 : 1,
                }}>
                  {isSel && <Check size={13} color="#8B6800" strokeWidth={3}/>}
                  {p.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Hint for mobile users that the table scrolls */}
        <p style={{ fontSize:12, color:'var(--text-4)', marginBottom:8 }}>
          <span className="hide-mobile">Порівняльна таблиця:</span>
          <span style={{ display:'inline' }}>↔ Таблиця прокручується горизонтально</span>
        </p>

        {/* Comparison table — .compare-table-wrap gives overflow-x auto */}
        <div className="compare-table-wrap">
          <table style={{ width:'100%', minWidth: labelW + colW * compared.length + (selected.length < 4 ? colW : 0), borderCollapse:'collapse' }}>

            {/* Product headers */}
            <thead>
              <tr style={{ borderBottom:'1.5px solid var(--border)' }}>
                <th style={{ width:labelW, minWidth:labelW, padding:'16px 20px', background:'var(--bg-soft)', textAlign:'left', fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--text-3)' }}>
                  Характеристика
                </th>
                {compared.map(p => {
                  const isBest = p.slug === 'dt2-pro'
                  const disc   = p.old_price ? Math.round((p.old_price - p.price) / p.old_price * 100) : 0
                  return (
                    <td key={p.slug} style={{
                      width:colW, minWidth:colW, padding:'20px 16px',
                      background: isBest ? '#FFFBEA' : 'var(--bg)',
                      borderLeft:'1px solid var(--border)',
                      borderTop: isBest ? '3px solid #F5C200' : '3px solid transparent',
                      textAlign:'center', verticalAlign:'top',
                      position:'relative',
                    }}>
                      {isBest && (
                        <div style={{ position:'absolute', top:-1, left:'50%', transform:'translateX(-50%)', background:'#F5C200', color:'#111', fontSize:9, fontWeight:800, letterSpacing:'.08em', textTransform:'uppercase' as const, padding:'3px 10px', borderRadius:'0 0 6px 6px', whiteSpace:'nowrap' as const }}>
                          Best Choice
                        </div>
                      )}
                      {/* Product image */}
                      <div style={{ display:'flex', justifyContent:'center', marginBottom:12, marginTop: isBest ? 12 : 0 }}>
                        <div style={{ background:'var(--bg-subtle)', border:'1px solid var(--border)', borderRadius:10, width:100, height:100, position:'relative', overflow:'hidden' }}>
                          {p.images?.[0] ? (
                            <Image src={p.images[0]} alt={p.name} fill sizes="100px" style={{ objectFit:'contain', padding:8 }}/>
                          ) : (
                            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                              <ScooterIcon/>
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ fontSize:14, fontWeight:700, color:'var(--text)', letterSpacing:'-.01em', marginBottom:6 }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize:18, fontWeight:800, color:'var(--text)', letterSpacing:'-.02em' }}>
                        ₴{p.price.toLocaleString('uk-UA')}
                      </div>
                      {p.old_price && (
                        <div style={{ fontSize:12, color:'var(--text-4)', textDecoration:'line-through', marginTop:4 }}>
                          ₴{p.old_price.toLocaleString('uk-UA')}
                        </div>
                      )}
                      <button onClick={() => toggle(p.slug)} aria-label="Прибрати з порівняння" style={{
                        position:'absolute', top:10, right:10,
                        width:24, height:24, display:'flex', alignItems:'center', justifyContent:'center',
                        background:'var(--bg)', border:'1px solid var(--border)', borderRadius:6,
                        cursor:'pointer', color:'var(--text-3)', transition:'all .15s',
                      }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#EF4444';(e.currentTarget as HTMLElement).style.color='#EF4444'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--border)';(e.currentTarget as HTMLElement).style.color='var(--text-3)'}}>
                        <X size={11}/>
                      </button>
                    </td>
                  )
                })}

                {/* Add slot */}
                {selected.length < 4 && (
                  <td style={{ width:colW, borderLeft:'1px solid var(--border)', background:'var(--bg-soft)', textAlign:'center', verticalAlign:'middle', padding:20, position:'relative' }}>
                    <button onClick={() => setShowPicker(!showPicker)} style={{
                      display:'flex', flexDirection:'column', alignItems:'center', gap:8,
                      background:'none', border:'none', cursor:'pointer', width:'100%',
                    }}>
                      <div style={{ width:48, height:48, borderRadius:12, border:'1.5px dashed var(--border-md)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-3)', transition:'all .15s' }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#F5C200';(e.currentTarget as HTMLElement).style.color='var(--yellow-dark)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--border-md)';(e.currentTarget as HTMLElement).style.color='var(--text-3)'}}>
                        <Plus size={20}/>
                      </div>
                      <span style={{ fontSize:12, fontWeight:600, color:'var(--text-3)' }}>Додати</span>
                    </button>
                    {showPicker && available.length > 0 && (
                      <div style={{ position:'absolute', top:'calc(100% + 4px)', left:'50%', transform:'translateX(-50%)', background:'var(--bg)', border:'1.5px solid var(--border)', borderRadius:10, padding:6, minWidth:180, zIndex:20, boxShadow:'var(--shadow-lg)' }}>
                        {available.map(p => (
                          <button key={p.slug} onClick={() => { toggle(p.slug); setShowPicker(false) }} style={{
                            display:'block', width:'100%', textAlign:'left',
                            padding:'10px 14px', fontSize:13, fontWeight:500,
                            color:'var(--text-2)', background:'none', border:'none', borderRadius:7,
                            cursor:'pointer', transition:'background .1s',
                          }}
                          onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.background='var(--bg-subtle)'}}
                          onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.background='none'}}>
                            {p.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </td>
                )}
              </tr>
            </thead>

            <tbody>
              {SPECS.map(({ key, label, fmt, higher }, rowIdx) => {
                const best = getBest(key, higher)
                const isLast = rowIdx === SPECS.length - 1
                return (
                  <tr key={key} style={{ borderBottom: isLast ? 'none' : '1px solid var(--border)' }}>
                    <td style={{
                      padding:'14px 20px', fontSize:13, fontWeight:500,
                      color:'var(--text-2)', background:'var(--bg-soft)',
                      borderRight:'1px solid var(--border)',
                    }}>
                      {label}
                    </td>
                    {compared.map(p => {
                      const val    = (p as any)[key]
                      const num    = parseFloat(String(val))
                      const isBest = best !== null && !isNaN(num) && num === best
                      const isFeat = p.slug === 'dt2-pro'

                      if (typeof val === 'boolean') {
                        return (
                          <td key={p.slug} style={{ padding:'14px 16px', textAlign:'center', borderLeft:'1px solid var(--border)', background: isFeat ? '#FFFBEA' : 'transparent' }}>
                            {val
                              ? <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:22, height:22, background:'#DCFCE7', borderRadius:'50%' }}><Check size={12} color="#22C55E" strokeWidth={3}/></span>
                              : <span style={{ display:'inline-flex', alignItems:'center', justifyContent:'center', width:22, height:22, background:'var(--bg-subtle)', borderRadius:'50%' }}><X size={12} color="var(--text-4)"/></span>
                            }
                          </td>
                        )
                      }

                      return (
                        <td key={p.slug} style={{
                          padding:'14px 16px', textAlign:'center',
                          borderLeft:'1px solid var(--border)',
                          background: isFeat ? '#FFFBEA' : 'transparent',
                        }}>
                          <span style={{
                            fontSize: isBest ? 15 : 14,
                            fontWeight: isBest ? 800 : 500,
                            color: isBest ? 'var(--yellow-dark)' : 'var(--text)',
                          }}>
                            {fmt(val)}
                          </span>
                          {isBest && (
                            <div style={{ fontSize:9, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase' as const, color:'var(--yellow-dark)', marginTop:2, opacity:.7 }}>
                              найкраще
                            </div>
                          )}
                        </td>
                      )
                    })}
                    {selected.length < 4 && <td style={{ borderLeft:'1px solid var(--border)', background:'var(--bg-soft)' }}/>}
                  </tr>
                )
              })}

              {/* CTA row */}
              <tr style={{ borderTop:'1.5px solid var(--border)' }}>
                <td style={{ padding:'16px 20px', background:'var(--bg-soft)' }}/>
                {compared.map(p => {
                  const isFeat = p.slug === 'dt2-pro'
                  return (
                    <td key={p.slug} style={{ padding:'16px', borderLeft:'1px solid var(--border)', background: isFeat ? '#FFFBEA' : 'var(--bg)' }}>
                      <button onClick={() => addItem(p)} className="btn btn-black btn-sm btn-full" style={{ justifyContent:'center', marginBottom:8 }}>
                        <ShoppingBag size={13}/> До кошика
                      </button>
                      <Link href={`/product/${p.slug}`} className="btn btn-white btn-sm btn-full" style={{ justifyContent:'center' }}>
                        Детальніше
                      </Link>
                    </td>
                  )
                })}
                {selected.length < 4 && <td style={{ borderLeft:'1px solid var(--border)', background:'var(--bg-soft)' }}/>}
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ fontSize:12, color:'var(--text-4)', textAlign:'center', marginTop:16, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
          Можна порівняти до 4 моделей одночасно
        </p>
      </div>
    </div>
  )
}
