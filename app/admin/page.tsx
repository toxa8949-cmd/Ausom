'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProducts, getAllOrders } from '@/lib/queries'
import { Order } from '@/lib/types'
import { ShoppingBag, Package, TrendingUp, TrendingDown, Edit, Eye, Plus } from 'lucide-react'
import AdminShell from './AdminShell'

const STATUS: Record<string,{label:string;bg:string;color:string;dot:string}> = {
  pending:   {label:'Очікує',      bg:'#FFF8E6',color:'#92600A',dot:'#F59E0B'},
  confirmed: {label:'Підтверджено',bg:'#EFF6FF',color:'#1E40AF',dot:'#3B82F6'},
  shipped:   {label:'Відправлено', bg:'#F5F3FF',color:'#5B21B6',dot:'#8B5CF6'},
  delivered: {label:'Доставлено',  bg:'#F0FDF4',color:'#166534',dot:'#22C55E'},
  cancelled: {label:'Скасовано',   bg:'#FEF2F2',color:'#991B1B',dot:'#EF4444'},
}

const MONTHS = ['Жов','Лис','Гру','Січ','Лют','Бер','Квіт']
const BARS   = [42,68,95,74,53,88,100]

const B = '1.5px solid #EEEEEE'

// Formats a UUID as a short display ID consistent with /checkout/success.
const shortOrderId = (id: string) => `#AU-${id.replace(/-/g, '').slice(0, 8).toUpperCase()}`

// Extract a human-readable product list from an order's items JSONB.
const orderProductSummary = (order: Order): string => {
  if (!Array.isArray(order.items) || order.items.length === 0) return '—'
  const names = order.items.map(i => i?.product?.name).filter(Boolean)
  if (names.length === 0) return '—'
  if (names.length === 1) return names[0]
  return `${names[0]} +${names.length - 1}`
}

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso)
    return `${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`
  } catch { return '' }
}

export default function AdminDashboard() {
  const [prodCount,setProdCount]=useState(0)
  const [orders,   setOrders]   =useState<Order[]>([])
  const [loading,  setLoading]  =useState(true)
  const [activeBar,setActiveBar]=useState(6)

  useEffect(()=>{
    Promise.all([getAllProducts(),getAllOrders()])
      .then(([p,o])=>{
        setProdCount(p.length)
        setOrders(o)
      })
      .catch(err => console.error('[admin] dashboard load failed', err))
      .finally(()=>setLoading(false))
  },[])

  const revenue = orders.reduce((s,x)=>s+x.total,0)
  const pending = orders.filter(x=>x.status==='pending').length
  const recentOrders = orders.slice(0, 5) // newest first (queries sort DESC by created_at)

  const STATS=[
    {label:'Загальна виручка', val:loading?'...': `₴${revenue.toLocaleString('uk-UA')}`, bg:'#FFF8E6',color:'#D4A800',Icon:TrendingUp},
    {label:'Замовлень всього', val:loading?'...': String(orders.length),                 bg:'#F0FDF4',color:'#22C55E',Icon:ShoppingBag},
    {label:'Товарів',          val:loading?'...': String(prodCount),                     bg:'#EFF6FF',color:'#3B82F6',Icon:Package},
    {label:'Очікують обробки', val:loading?'...': String(pending),                       bg:'#FEF2F2',color:'#EF4444',Icon:TrendingDown},
  ]

  return (
    <AdminShell title="Дашборд" subtitle={new Date().toLocaleDateString('uk-UA', { weekday:'long', day:'numeric', month:'long', year:'numeric' })} breadcrumb="Дашборд">

      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
        <Link href="/admin/products/new" style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#111',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' as const,padding:'10px 20px',borderRadius:7,textDecoration:'none' }}>
          <Plus size={13}/> Новий товар
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:20 }} className="grid-4">
        {STATS.map((s,i)=>(
          <div key={i} style={{ background:'#fff',border:B,borderRadius:12,padding:'20px',display:'flex',flexDirection:'column',gap:14 }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              <span style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888' }}>{s.label}</span>
              <div style={{ width:34,height:34,borderRadius:8,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>
                <s.Icon size={15} color={s.color}/>
              </div>
            </div>
            <span style={{ fontSize:30,fontWeight:800,letterSpacing:'-.03em',color:'#111',lineHeight:1 }}>{s.val}</span>
          </div>
        ))}
      </div>

      {/* Charts (still cosmetic — real analytics would need time-bucketing in SQL) */}
      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:20 }} className="grid-2-1">
        <div style={{ background:'#fff',border:B,borderRadius:12,padding:'20px 24px' }}>
          <p style={{ fontSize:14,fontWeight:700,color:'#111',marginBottom:24 }}>Продажі за місяць</p>
          <div style={{ display:'flex',alignItems:'flex-end',gap:8,height:100 }}>
            {MONTHS.map((m,i)=>(
              <div key={m} onClick={()=>setActiveBar(i)} style={{ flex:1,borderRadius:'4px 4px 0 0',cursor:'pointer',transition:'all .2s',background:i===activeBar?'#111':'#F5F5F5',height:`${BARS[i]}%`,position:'relative' }}>
                <span style={{ position:'absolute',bottom:-18,left:'50%',transform:'translateX(-50%)',fontSize:9,fontWeight:600,color:i===activeBar?'#111':'#BBB',whiteSpace:'nowrap' }}>{m}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:'#fff',border:B,borderRadius:12,padding:'20px 24px' }}>
          <p style={{ fontSize:14,fontWeight:700,color:'#111',marginBottom:16 }}>Статуси замовлень</p>
          <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
            {(['pending','confirmed','shipped','delivered','cancelled'] as const).map(statusKey => {
              const count = orders.filter(o => o.status === statusKey).length
              const st = STATUS[statusKey]
              return (
                <div key={statusKey} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:12 }}>
                  <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                    <span style={{ width:8,height:8,borderRadius:'50%',background:st.dot,display:'inline-block' }}/>
                    <span style={{ color:'#555' }}>{st.label}</span>
                  </div>
                  <span style={{ fontWeight:700,color:'#111',fontFamily:'monospace' }}>{count}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Recent orders — REAL data from Supabase */}
      <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden' }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:B }}>
          <p style={{ fontSize:14,fontWeight:700,color:'#111' }}>Останні замовлення</p>
          <Link href="/admin/orders" style={{ fontSize:12,fontWeight:600,color:'#111',textDecoration:'none',background:'#F9F9F9',border:B,padding:'7px 14px',borderRadius:6 }}>Всі замовлення</Link>
        </div>
        {loading ? (
          <div style={{ padding:48, textAlign:'center', color:'#888', fontSize:13 }}>Завантаження…</div>
        ) : recentOrders.length === 0 ? (
          <div style={{ padding:48, textAlign:'center', color:'#888', fontSize:13 }}>Замовлень ще немає</div>
        ) : (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%',borderCollapse:'collapse', minWidth: 720 }}>
              <thead>
                <tr style={{ background:'#FAFAFA',borderBottom:B }}>
                  {['№','Клієнт','Товар','Сума','Статус','Дата',''].map(h=>(
                    <th key={h} style={{ padding:'10px 16px',textAlign:'left',fontSize:10,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase' as const,color:'#AAA' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o,i)=>{
                  const st = STATUS[o.status] || STATUS.pending
                  return(
                    <tr key={o.id} style={{ borderBottom:i<recentOrders.length-1?B:'none' }}>
                      <td style={{ padding:'14px 16px',fontSize:12,fontWeight:700,color:'#D4A800',fontFamily:'monospace' }}>{shortOrderId(o.id)}</td>
                      <td style={{ padding:'14px 16px',fontSize:13,fontWeight:600,color:'#111' }}>{o.name}</td>
                      <td style={{ padding:'14px 16px',fontSize:13,color:'#555' }}>{orderProductSummary(o)}</td>
                      <td style={{ padding:'14px 16px',fontSize:15,fontWeight:800,color:'#111',letterSpacing:'-.01em' }}>₴{o.total.toLocaleString('uk-UA')}</td>
                      <td style={{ padding:'14px 16px' }}>
                        <span style={{ display:'inline-flex',alignItems:'center',gap:6,fontSize:11,fontWeight:700,background:st.bg,color:st.color,padding:'4px 10px',borderRadius:20 }}>
                          <span style={{ width:6,height:6,borderRadius:'50%',background:st.dot }}/>{st.label}
                        </span>
                      </td>
                      <td style={{ padding:'14px 16px',fontSize:12,color:'#888' }}>{formatDate(o.created_at)}</td>
                      <td style={{ padding:'14px 16px' }}>
                        <Link href="/admin/orders" style={{ width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',background:'#F9F9F9',border:B,borderRadius:6,color:'#666',textDecoration:'none' }}>
                          <Eye size={12}/>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
