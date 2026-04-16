'use client'

import { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '@/lib/queries'
import { Order } from '@/lib/types'
import { ChevronDown, ChevronUp } from 'lucide-react'
import AdminShell from '../AdminShell'

const STATUS: Record<Order['status'], { label:string; bg:string; color:string; dot:string }> = {
  pending:   { label:'Очікує',       bg:'#FFF8E6', color:'#92600A', dot:'#F59E0B' },
  confirmed: { label:'Підтверджено', bg:'#EFF6FF', color:'#1E40AF', dot:'#3B82F6' },
  shipped:   { label:'Відправлено',  bg:'#F5F3FF', color:'#5B21B6', dot:'#8B5CF6' },
  delivered: { label:'Доставлено',   bg:'#F0FDF4', color:'#166534', dot:'#22C55E' },
  cancelled: { label:'Скасовано',    bg:'#FEF2F2', color:'#991B1B', dot:'#EF4444' },
}

const B = '1.5px solid #EEEEEE'

export default function AdminOrders() {
  const [orders,   setOrders]   = useState<Order[]>([])
  const [loading,  setLoading]  = useState(true)
  const [expanded, setExpanded] = useState<string|null>(null)

  useEffect(() => { getAllOrders().then(setOrders).finally(()=>setLoading(false)) }, [])

  const changeStatus = async (id: string, status: Order['status']) => {
    await updateOrderStatus(id, status)
    setOrders(prev => prev.map(o => o.id===id ? {...o, status} : o))
  }

  return (
    <AdminShell title="Замовлення" subtitle={`${orders.length} замовлень всього`} breadcrumb="Замовлення">
      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
          <div style={{ width:32, height:32, border:'2.5px solid #F5C200', borderTopColor:'transparent', borderRadius:'50%', animation:'spin .8s linear infinite' }}/>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      ) : orders.length === 0 ? (
        <div style={{ background:'#fff', border:B, borderRadius:12, padding:48, textAlign:'center', color:'#888', fontSize:14 }}>
          Замовлень ще немає
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {orders.map(order => {
            const st = STATUS[order.status] || STATUS.pending
            const isOpen = expanded === order.id
            return (
              <div key={order.id} style={{ background:'#fff', border:B, borderRadius:12, overflow:'hidden' }}>
                <div onClick={() => setExpanded(isOpen ? null : order.id)}
                  style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 20px', cursor:'pointer', flexWrap:'wrap' as const, transition:'background .15s' }}
                  onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='#FAFAFA'}
                  onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='#fff'}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:600, fontSize:14, color:'#111' }}>{order.name}</div>
                    <div style={{ fontSize:12, color:'#888', marginTop:2 }}>{order.email} · {order.phone}</div>
                  </div>
                  <div style={{ fontSize:15, fontWeight:800, color:'#111', letterSpacing:'-.01em' }}>
                    ₴{order.total.toLocaleString('uk-UA')}
                  </div>
                  <div style={{ fontSize:12, color:'#888' }}>
                    {new Date(order.created_at).toLocaleDateString('uk-UA')}
                  </div>
                  <span style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, background:st.bg, color:st.color, padding:'4px 10px', borderRadius:20 }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:st.dot }}/>
                    {st.label}
                  </span>
                  {isOpen ? <ChevronUp size={14} color="#888"/> : <ChevronDown size={14} color="#888"/>}
                </div>

                {isOpen && (
                  <div style={{ borderTop:B, padding:'20px', background:'#FAFAFA' }}>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginBottom:20 }}>
                      <div>
                        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#888', marginBottom:8 }}>Доставка</p>
                        <p style={{ fontSize:13, color:'#111' }}>{order.city}, {order.address}</p>
                        {order.notes && <p style={{ fontSize:12, color:'#888', marginTop:4 }}>{order.notes}</p>}
                      </div>
                      <div>
                        <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#888', marginBottom:8 }}>Товари</p>
                        {(order.items as any[]).map((item:any,i:number) => (
                          <div key={i} style={{ display:'flex', justifyContent:'space-between', fontSize:13, color:'#111', marginBottom:4 }}>
                            <span>{item.product?.name} × {item.quantity}</span>
                            <span style={{ fontWeight:600 }}>₴{(item.product?.price*item.quantity).toLocaleString('uk-UA')}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p style={{ fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase' as const, color:'#888', marginBottom:10 }}>Змінити статус</p>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                        {(Object.keys(STATUS) as Order['status'][]).map(s => (
                          <button key={s} onClick={() => changeStatus(order.id, s)} style={{
                            fontSize:12, fontWeight:600, padding:'7px 14px', borderRadius:7,
                            border: order.status===s ? 'none' : B,
                            background: order.status===s ? '#111' : '#fff',
                            color: order.status===s ? '#fff' : '#444',
                            cursor:'pointer', transition:'all .15s',
                          }}>
                            {STATUS[s].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </AdminShell>
  )
}
