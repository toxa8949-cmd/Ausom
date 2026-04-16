'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProducts, deleteProduct } from '@/lib/queries'
import { Product } from '@/lib/types'
import { Pencil, Trash2, Plus, Search } from 'lucide-react'
import AdminShell from '../AdminShell'

const B = '1.5px solid #EEEEEE'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [deleting, setDeleting] = useState<string|null>(null)

  useEffect(() => { getAllProducts().then(setProducts).finally(()=>setLoading(false)) }, [])

  const handleDelete = async (id:string, name:string) => {
    if (!confirm(`Видалити "${name}"?`)) return
    setDeleting(id)
    try { await deleteProduct(id); setProducts(p=>p.filter(x=>x.id!==id)) }
    catch { alert('Помилка видалення') }
    finally { setDeleting(null) }
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <AdminShell title="Товари" subtitle={`${products.length} моделей в каталозі`} breadcrumb="Товари">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20, flexWrap:'wrap', gap:12 }}>
        <div style={{ position:'relative', flex:1, maxWidth:360 }}>
          <Search size={14} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#BBB', pointerEvents:'none' }}/>
          <input type="text" placeholder="Пошук товарів..." value={search} onChange={e=>setSearch(e.target.value)}
            style={{ width:'100%', padding:'10px 14px 10px 38px', background:'#fff', border:B, borderRadius:8, fontSize:13, color:'#111', outline:'none', fontFamily:'Inter,sans-serif' }}
            onFocus={e=>(e.target.style.borderColor='#F5C200')} onBlur={e=>(e.target.style.borderColor='#EEEEEE')}/>
        </div>
        <Link href="/admin/products/new" style={{ display:'inline-flex', alignItems:'center', gap:6, background:'#111', color:'#fff', fontSize:12, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase' as const, padding:'10px 20px', borderRadius:7, textDecoration:'none' }}>
          <Plus size={13}/> Додати товар
        </Link>
      </div>

      <div style={{ background:'#fff', border:B, borderRadius:12, overflow:'hidden' }}>
        {loading ? (
          <div style={{ padding:48, textAlign:'center' }}>
            <div style={{ width:32, height:32, border:'2.5px solid #F5C200', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .8s linear infinite', margin:'0 auto 12px' }}/>
            <p style={{ color:'#888', fontSize:13 }}>Завантаження...</p>
          </div>
        ) : (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#FAFAFA', borderBottom:B }}>
                {['Назва','Ціна','Категорія','Наявність',''].map(h=>(
                  <th key={h} style={{ padding:'10px 16px', textAlign:'left', fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#AAA' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p,i)=>(
                <tr key={p.id} style={{ borderBottom:i<filtered.length-1?B:'none', transition:'background .1s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='#FAFAFA'}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='#fff'}>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ fontWeight:600, fontSize:14, color:'#111' }}>{p.name}</div>
                    <div style={{ fontSize:11, color:'#888', marginTop:2, fontFamily:'monospace' }}>{p.slug}</div>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ fontWeight:800, fontSize:15, color:'#111', letterSpacing:'-.01em' }}>₴{p.price.toLocaleString('uk-UA')}</div>
                    {p.old_price&&<div style={{ fontSize:12, color:'#BBB', textDecoration:'line-through' }}>₴{p.old_price.toLocaleString('uk-UA')}</div>}
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20, background:p.category==='offroad'?'#FFF8E6':'#EFF6FF', color:p.category==='offroad'?'#92600A':'#1E40AF' }}>
                      {p.category==='offroad'?'Позашляховий':'Міський'}
                    </span>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:20, background:p.in_stock?'#F0FDF4':'#FEF2F2', color:p.in_stock?'#166534':'#991B1B' }}>
                      <span style={{ width:6, height:6, borderRadius:'50%', background:p.in_stock?'#22C55E':'#EF4444' }}/>
                      {p.in_stock?'В наявності':'Немає'}
                    </span>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex', gap:4, justifyContent:'flex-end' }}>
                      <Link href={`/admin/products/${p.id}`} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:B, borderRadius:7, color:'#666', textDecoration:'none' }}>
                        <Pencil size={13}/>
                      </Link>
                      <button onClick={()=>handleDelete(p.id,p.name)} disabled={deleting===p.id} style={{ width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:B, borderRadius:7, color:'#666', cursor:'pointer', opacity:deleting===p.id?.6:1 }}>
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length===0&&(
                <tr><td colSpan={5} style={{ padding:32, textAlign:'center', fontSize:13, color:'#888' }}>Нічого не знайдено</td></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </AdminShell>
  )
}
