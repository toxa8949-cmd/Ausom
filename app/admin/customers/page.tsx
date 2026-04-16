'use client'

import { useEffect, useState } from 'react'
import { getAllOrders } from '@/lib/queries'
import { Order } from '@/lib/types'
import { Users, Search, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react'
import AdminShell from '../AdminShell'

const B = '1.5px solid #EEEEEE'

interface Customer {
  name: string; email: string; phone: string; city: string
  orders: number; total: number; lastOrder: string
}

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getAllOrders().then(orders => {
      const map = new Map<string, Customer>()
      orders.forEach(o => {
        const key = o.email || o.phone || o.name
        if (!key) return
        const existing = map.get(key)
        if (existing) {
          existing.orders++
          existing.total += o.total
          if (o.created_at > existing.lastOrder) existing.lastOrder = o.created_at
        } else {
          map.set(key, {
            name: o.name, email: o.email, phone: o.phone, city: o.city || '',
            orders: 1, total: o.total, lastOrder: o.created_at
          })
        }
      })
      setCustomers(Array.from(map.values()).sort((a, b) => b.total - a.total))
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  return (
    <AdminShell title="Клієнти" subtitle={`${customers.length} клієнтів`} breadcrumb="Клієнти">
      <div style={{ display:'flex',alignItems:'center',gap:12,marginBottom:20 }}>
        <div style={{ position:'relative',flex:1,maxWidth:360 }}>
          <Search size={14} style={{ position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'#BBB',pointerEvents:'none' }} />
          <input type="text" placeholder="Пошук клієнтів..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width:'100%',padding:'10px 14px 10px 38px',background:'#fff',border:B,borderRadius:8,fontSize:13,color:'#111',outline:'none',fontFamily:'Inter,sans-serif' }}
            onFocus={e => (e.target.style.borderColor = '#F5C200')}
            onBlur={e => (e.target.style.borderColor = '#EEEEEE')} />
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16,marginBottom:20 }}>
        {[
          { label:'Всього клієнтів', val: customers.length, icon: Users, bg:'#EFF6FF', color:'#3B82F6' },
          { label:'Замовлень', val: customers.reduce((s, c) => s + c.orders, 0), icon: ShoppingBag, bg:'#F0FDF4', color:'#22C55E' },
          { label:'Загальний дохід', val: `₴${customers.reduce((s, c) => s + c.total, 0).toLocaleString('uk-UA')}`, icon: ShoppingBag, bg:'#FFF8E6', color:'#D4A800' },
        ].map((s, i) => (
          <div key={i} style={{ background:'#fff',border:B,borderRadius:12,padding:20,display:'flex',alignItems:'center',gap:14 }}>
            <div style={{ width:40,height:40,borderRadius:10,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>
              <s.icon size={18} color={s.color} />
            </div>
            <div>
              <div style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888' }}>{s.label}</div>
              <div style={{ fontSize:24,fontWeight:800,letterSpacing:'-.02em',color:'#111' }}>{s.val}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden' }}>
        {loading ? (
          <div style={{ padding:48,textAlign:'center' }}>
            <div style={{ width:32,height:32,border:'2.5px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto 12px' }} />
            <p style={{ color:'#888',fontSize:13 }}>Завантаження...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding:48,textAlign:'center' }}>
            <Users size={32} color="#DDD" style={{ margin:'0 auto 12px' }} />
            <p style={{ color:'#888',fontSize:14,fontWeight:600 }}>Клієнтів поки немає</p>
            <p style={{ color:'#BBB',fontSize:13,marginTop:4 }}>Клієнти з&apos;являться після першого замовлення</p>
          </div>
        ) : (
          <table style={{ width:'100%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#FAFAFA',borderBottom:B }}>
                {['Клієнт','Контакти','Місто','Замовлень','Сума'].map(h => (
                  <th key={h} style={{ padding:'10px 16px',textAlign:'left',fontSize:10,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase' as const,color:'#AAA' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i} style={{ borderBottom:i < filtered.length - 1 ? B : 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                      <div style={{ width:36,height:36,borderRadius:'50%',background:'#F5C200',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:800,color:'#111',flexShrink:0 }}>
                        {c.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ fontWeight:600,fontSize:14,color:'#111' }}>{c.name}</div>
                    </div>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex',flexDirection:'column',gap:2 }}>
                      {c.email && <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#555' }}><Mail size={11} color="#BBB" />{c.email}</div>}
                      {c.phone && <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:12,color:'#555' }}><Phone size={11} color="#BBB" />{c.phone}</div>}
                    </div>
                  </td>
                  <td style={{ padding:'14px 16px' }}>
                    {c.city && <div style={{ display:'flex',alignItems:'center',gap:6,fontSize:13,color:'#555' }}><MapPin size={11} color="#BBB" />{c.city}</div>}
                  </td>
                  <td style={{ padding:'14px 16px',fontSize:14,fontWeight:700,color:'#111' }}>{c.orders}</td>
                  <td style={{ padding:'14px 16px',fontSize:15,fontWeight:800,color:'#111',letterSpacing:'-.01em' }}>₴{c.total.toLocaleString('uk-UA')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </AdminShell>
  )
}
