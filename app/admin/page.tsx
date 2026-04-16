'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProducts, getAllOrders } from '@/lib/queries'
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

const MOCK_ORDERS = [
  {id:'#AU-2061',customer:'Олексій Ткаченко', product:'Ausom DT2 Pro',       total:'₴44 250',status:'paid',      date:'15.04.2026'},
  {id:'#AU-2060',customer:'Марина Коваль',     product:'Ausom L2 Max Dual',   total:'₴40 800',status:'shipped',   date:'15.04.2026'},
  {id:'#AU-2059',customer:'Дмитро Пилипенко', product:'Ausom L2 Dual Motor', total:'₴32 200',status:'pending',   date:'14.04.2026'},
  {id:'#AU-2058',customer:'Анна Савченко',     product:'Ausom L1',            total:'₴27 050',status:'delivered', date:'14.04.2026'},
  {id:'#AU-2057',customer:'Ігор Мельник',      product:'Ausom DT2 Pro',       total:'₴44 250',status:'cancelled', date:'13.04.2026'},
]

const B = '1.5px solid #EEEEEE'

export default function AdminDashboard() {
  const [prodCount,setProdCount]=useState(0)
  const [ordCount, setOrdCount] =useState(0)
  const [revenue,  setRevenue]  =useState(0)
  const [pending,  setPending]  =useState(0)
  const [loading,  setLoading]  =useState(true)
  const [activeBar,setActiveBar]=useState(6)

  useEffect(()=>{
    Promise.all([getAllProducts(),getAllOrders()]).then(([p,o])=>{
      setProdCount(p.length); setOrdCount(o.length)
      setRevenue(o.reduce((s,x)=>s+x.total,0))
      setPending(o.filter(x=>x.status==='pending').length)
    }).catch(()=>{}).finally(()=>setLoading(false))
  },[])

  const STATS=[
    {label:'Продажі сьогодні',val:loading?'...': `₴${revenue.toLocaleString('uk-UA')}`,trend:'+18%',up:true, bg:'#FFF8E6',color:'#D4A800',Icon:TrendingUp},
    {label:'Нові замовлення', val:loading?'...': String(ordCount),                       trend:'+5',  up:true, bg:'#F0FDF4',color:'#22C55E',Icon:ShoppingBag},
    {label:'Товарів',         val:loading?'...': String(prodCount),                      trend:'',    up:true, bg:'#EFF6FF',color:'#3B82F6',Icon:Package},
    {label:'Очікують',        val:loading?'...': String(pending),                        trend:'',    up:false,bg:'#FEF2F2',color:'#EF4444',Icon:TrendingDown},
  ]

  return (
    <AdminShell title="Дашборд" subtitle="Середа, 15 квітня 2026" breadcrumb="Дашборд">

      {/* Top right action */}
      <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:20 }}>
        <Link href="/admin/products/new" style={{ display:'inline-flex',alignItems:'center',gap:6,background:'#111',color:'#fff',fontSize:12,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' as const,padding:'10px 20px',borderRadius:7,textDecoration:'none' }}>
          <Plus size={13}/> Новий товар
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:20 }}>
        {STATS.map((s,i)=>(
          <div key={i} style={{ background:'#fff',border:B,borderRadius:12,padding:'20px',display:'flex',flexDirection:'column',gap:14 }}>
            <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between' }}>
              <span style={{ fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase' as const,color:'#888' }}>{s.label}</span>
              <div style={{ width:34,height:34,borderRadius:8,background:s.bg,display:'flex',alignItems:'center',justifyContent:'center' }}>
                <s.Icon size={15} color={s.color}/>
              </div>
            </div>
            <span style={{ fontSize:30,fontWeight:800,letterSpacing:'-.03em',color:'#111',lineHeight:1 }}>{s.val}</span>
            {s.trend&&<span style={{ fontSize:12,fontWeight:600,color:s.up?'#22C55E':'#EF4444',display:'flex',alignItems:'center',gap:4 }}>{s.trend} vs вчора</span>}
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:'grid',gridTemplateColumns:'2fr 1fr',gap:16,marginBottom:20 }}>
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
          <p style={{ fontSize:14,fontWeight:700,color:'#111',marginBottom:16 }}>По товарах</p>
          <div style={{ display:'flex',justifyContent:'center',marginBottom:16 }}
            dangerouslySetInnerHTML={{ __html:`<svg width="96" height="96" viewBox="0 0 96 96"><circle r="38" cx="48" cy="48" fill="none" stroke="#F5F5F5" stroke-width="16"/><circle r="38" cx="48" cy="48" fill="none" stroke="#F5C200" stroke-width="16" stroke-dasharray="${0.29*239} ${239}" stroke-dashoffset="0"/><circle r="38" cx="48" cy="48" fill="none" stroke="#3B82F6" stroke-width="16" stroke-dasharray="${0.34*239} ${239}" stroke-dashoffset="${-0.29*239}"/><circle r="38" cx="48" cy="48" fill="none" stroke="#8B5CF6" stroke-width="16" stroke-dasharray="${0.21*239} ${239}" stroke-dashoffset="${-(0.29+0.34)*239}"/><text x="48" y="52" text-anchor="middle" font-size="18" font-weight="800" font-family="Inter" fill="#111">101</text></svg>` }}/>
          <div style={{ display:'flex',flexDirection:'column',gap:8 }}>
            {[['#F5C200','DT2 Pro','29'],['#3B82F6','L1','34'],['#8B5CF6','L2 Dual','21'],['#EEE','L2 Max','17']].map(([col,name,val])=>(
              <div key={name} style={{ display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:12 }}>
                <div style={{ display:'flex',alignItems:'center',gap:8 }}><span style={{ width:8,height:8,borderRadius:2,background:col,display:'inline-block' }}/><span style={{ color:'#555' }}>{name}</span></div>
                <span style={{ fontWeight:700,color:'#111',fontFamily:'monospace' }}>{val} шт</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Orders table */}
      <div style={{ background:'#fff',border:B,borderRadius:12,overflow:'hidden' }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 20px',borderBottom:B }}>
          <p style={{ fontSize:14,fontWeight:700,color:'#111' }}>Останні замовлення</p>
          <Link href="/admin/orders" style={{ fontSize:12,fontWeight:600,color:'#111',textDecoration:'none',background:'#F9F9F9',border:B,padding:'7px 14px',borderRadius:6 }}>Всі замовлення</Link>
        </div>
        <table style={{ width:'100%',borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#FAFAFA',borderBottom:B }}>
              {['№','Клієнт','Товар','Сума','Статус','Дата',''].map(h=>(
                <th key={h} style={{ padding:'10px 16px',textAlign:'left',fontSize:10,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase' as const,color:'#AAA' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_ORDERS.map((o,i)=>{
              const st=STATUS[o.status]||STATUS.pending
              return(
                <tr key={o.id} style={{ borderBottom:i<MOCK_ORDERS.length-1?B:'none' }}>
                  <td style={{ padding:'14px 16px',fontSize:12,fontWeight:700,color:'#D4A800',fontFamily:'monospace' }}>{o.id}</td>
                  <td style={{ padding:'14px 16px',fontSize:13,fontWeight:600,color:'#111' }}>{o.customer}</td>
                  <td style={{ padding:'14px 16px',fontSize:13,color:'#555' }}>{o.product}</td>
                  <td style={{ padding:'14px 16px',fontSize:15,fontWeight:800,color:'#111',letterSpacing:'-.01em' }}>{o.total}</td>
                  <td style={{ padding:'14px 16px' }}>
                    <span style={{ display:'inline-flex',alignItems:'center',gap:6,fontSize:11,fontWeight:700,background:st.bg,color:st.color,padding:'4px 10px',borderRadius:20 }}>
                      <span style={{ width:6,height:6,borderRadius:'50%',background:st.dot }}/>{st.label}
                    </span>
                  </td>
                  <td style={{ padding:'14px 16px',fontSize:12,color:'#888' }}>{o.date}</td>
                  <td style={{ padding:'14px 16px' }}>
                    <div style={{ display:'flex',gap:4,justifyContent:'flex-end' }}>
                      <button style={{ width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',background:'#F9F9F9',border:B,borderRadius:6,cursor:'pointer',color:'#666' }}><Eye size={12}/></button>
                      <button style={{ width:30,height:30,display:'flex',alignItems:'center',justifyContent:'center',background:'#F9F9F9',border:B,borderRadius:6,cursor:'pointer',color:'#666' }}><Edit size={12}/></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </AdminShell>
  )
}
