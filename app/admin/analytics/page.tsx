'use client'

import { useEffect, useState } from 'react'
import { getAllOrders, getAllProducts } from '@/lib/queries'
import { Order, Product } from '@/lib/types'
import { TrendingUp, ShoppingBag, Package, DollarSign, BarChart2 } from 'lucide-react'
import AdminShell from '../AdminShell'

const B = '1.5px solid #EEEEEE'
const MONTHS = ['Січ','Лют','Бер','Квіт','Трав','Черв','Лип','Серп','Вер','Жов','Лис','Гру']

export default function AdminAnalytics() {
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllOrders(), getAllProducts()])
      .then(([o, p]) => { setOrders(o); setProducts(p) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
  const avgOrder = orders.length ? Math.round(totalRevenue / orders.length) : 0
  const delivered = orders.filter(o => o.status === 'delivered').length
  const cancelled = orders.filter(o => o.status === 'cancelled').length
  const convRate = orders.length ? Math.round((delivered / orders.length) * 100) : 0

  // Revenue by month (current year)
  const monthlyRevenue = Array(12).fill(0)
  orders.forEach(o => {
    const d = new Date(o.created_at)
    if (d.getFullYear() === new Date().getFullYear()) {
      monthlyRevenue[d.getMonth()] += o.total
    }
  })
  const maxMonthly = Math.max(...monthlyRevenue, 1)

  // Top products
  const productSales: Record<string, { name: string; count: number; revenue: number }> = {}
  orders.forEach(o => {
    o.items?.forEach((item: any) => {
      const key = item.product?.name || item.product?.id || 'unknown'
      if (!productSales[key]) productSales[key] = { name: key, count:0, revenue:0 }
      productSales[key].count += item.quantity || 1
      productSales[key].revenue += (item.product?.price || 0) * (item.quantity || 1)
    })
  })
  const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5)

  // Orders by status
  const statusCounts = { pending:0, confirmed:0, shipped:0, delivered:0, cancelled:0 }
  orders.forEach(o => { if (o.status in statusCounts) (statusCounts as any)[o.status]++ })

  const statColors: Record<string,string> = { pending:'#F59E0B', confirmed:'#3B82F6', shipped:'#8B5CF6', delivered:'#22C55E', cancelled:'#EF4444' }
  const statLabels: Record<string,string> = { pending:'Очікують', confirmed:'Підтверджені', shipped:'Відправлені', delivered:'Доставлені', cancelled:'Скасовані' }

  if (loading) return (
    <AdminShell title="Аналітика" breadcrumb="Аналітика">
      <div style={{ padding:48,textAlign:'center' }}>
        <div style={{ width:32,height:32,border:'2.5px solid #F5C200',borderTopColor:'transparent',borderRadius:'50%',animation:'spin .8s linear infinite',margin:'0 auto' }} />
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </AdminShell>
  )

  return (
    <AdminShell title="Аналітика" subtitle="Статистика магазину" breadcrumb="Аналітика">
      {/* KPIs */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:20 }}>
        {[
          { label:'Загальний дохід', val:`₴${totalRevenue.toLocaleString('uk-UA')}`, Icon:DollarSign, bg:'#FFF8E6', color:'#D4A800' },
          { label:'Замовлень', val:String(orders.length), Icon:ShoppingBag, bg:'#F0FDF4', color:'#22C55E' },
          { label:'Середній чек', val:`₴${avgOrder.toLocaleString('uk-UA')}`, Icon:TrendingUp, bg:'#EFF6FF', color:'#3B82F6' },
          { label:'Конверсія', val:`${convRate}%`, Icon:BarChart2, bg:'#F5F3FF', color:'#8B5CF6' },
        ].map((s, i) => (
          <div key={i} style={{ background:'#fff',border:B,borderRadius:12,padding:20 }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12 }}>
              <span style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888' }}>{s.label}</span>
              <div style={{ width:34,height:34,borderRadius:8,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>
                <s.Icon size={15} color={s.color} />
              </div>
            </div>
            <span style={{ fontSize:28,fontWeight:800,letterSpacing:'-.03em',color:'#111' }}>{s.val}</span>
          </div>
        ))}
      </div>

      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:20 }}>
        {/* Monthly chart */}
        <div style={{ background:'#fff',border:B,borderRadius:12,padding:'20px 24px' }}>
          <p style={{ fontSize:14,fontWeight:700,color:'#111',marginBottom:24 }}>Дохід по місяцях ({new Date().getFullYear()})</p>
          <div style={{ display:'flex',alignItems:'flex-end',gap:6,height:140 }}>
            {MONTHS.map((m, i) => (
              <div key={m} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4 }}>
                <span style={{ fontSize:9,fontWeight:700,color: monthlyRevenue[i] > 0 ? '#111' : '#DDD' }}>
                  {monthlyRevenue[i] > 0 ? `₴${Math.round(monthlyRevenue[i]/1000)}k` : ''}
                </span>
                <div style={{
                  width:'100%',borderRadius:'4px 4px 0 0',transition:'all .3s',
                  background: monthlyRevenue[i] > 0 ? '#F5C200' : '#F5F5F5',
                  height:`${Math.max((monthlyRevenue[i] / maxMonthly) * 100, 4)}%`,
                  minHeight:4
                }} />
                <span style={{ fontSize:9,fontWeight:600,color:'#BBB' }}>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by status */}
        <div style={{ background:'#fff',border:B,borderRadius:12,padding:'20px 24px' }}>
          <p style={{ fontSize:14,fontWeight:700,color:'#111',marginBottom:20 }}>Замовлення по статусу</p>
          <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <span style={{ width:8,height:8,borderRadius:2,background:statColors[status] }} />
                  <span style={{ fontSize:13,color:'#555' }}>{statLabels[status]}</span>
                </div>
                <div style={{ display:'flex',alignItems:'center',gap:8 }}>
                  <div style={{ width:60,height:6,borderRadius:3,background:'#F5F5F5',overflow:'hidden' }}>
                    <div style={{ height:'100%',borderRadius:3,background:statColors[status],width:`${orders.length ? (count/orders.length)*100 : 0}%`,transition:'width .3s' }} />
                  </div>
                  <span style={{ fontSize:13,fontWeight:700,color:'#111',fontFamily:'monospace',minWidth:24,textAlign:'right' as const }}>{count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top products */}
      <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden' }}>
        <div style={{ padding:'16px 20px',borderBottom:B }}>
          <p style={{ fontSize:14,fontWeight:700,color:'#111' }}>Топ товарів по доходу</p>
        </div>
        {topProducts.length === 0 ? (
          <div style={{ padding:32,textAlign:'center',color:'#888',fontSize:13 }}>Немає даних про продажі</div>
        ) : (
          <table style={{ width:'100%',borderCollapse:'collapse' }}>
            <thead>
              <tr style={{ background:'#FAFAFA',borderBottom:B }}>
                {['#','Товар','Продано','Дохід'].map(h => (
                  <th key={h} style={{ padding:'10px 16px',textAlign:'left',fontSize:10,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase' as const,color:'#AAA' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i} style={{ borderBottom:i < topProducts.length - 1 ? B : 'none' }}>
                  <td style={{ padding:'12px 16px',fontSize:13,fontWeight:800,color:'#D4A800' }}>{i + 1}</td>
                  <td style={{ padding:'12px 16px',fontSize:14,fontWeight:600,color:'#111' }}>{p.name}</td>
                  <td style={{ padding:'12px 16px',fontSize:13,color:'#555' }}>{p.count} шт</td>
                  <td style={{ padding:'12px 16px',fontSize:15,fontWeight:800,color:'#111' }}>₴{p.revenue.toLocaleString('uk-UA')}</td>
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
