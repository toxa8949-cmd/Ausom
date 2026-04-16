'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProducts, getAllOrders } from '@/lib/queries'
import {
  LayoutDashboard, Package, ShoppingBag, Users, FileText,
  Settings, LogOut, Bell, Search, TrendingUp, TrendingDown,
  Edit, Eye, Plus, Zap, BarChart2, Tag, ChevronRight,
} from 'lucide-react'

const NAV = [
  { group:'Основне', items:[
    { href:'/admin',            icon:LayoutDashboard, label:'Дашборд',    badge:null,  red:false },
    { href:'/admin/orders',     icon:ShoppingBag,     label:'Замовлення', badge:12,    red:true  },
    { href:'/admin/products',   icon:Package,         label:'Товари',     badge:null,  red:false },
    { href:'/admin/customers',  icon:Users,           label:'Клієнти',    badge:null,  red:false },
  ]},
  { group:'Контент', items:[
    { href:'/admin/blog',    icon:FileText, label:'Блог',   badge:null, red:false },
    { href:'/admin/banners', icon:Tag,      label:'Банери', badge:null, red:false },
  ]},
  { group:'Система', items:[
    { href:'/admin/analytics', icon:BarChart2, label:'Аналітика',    badge:null, red:false },
    { href:'/admin/settings',  icon:Settings,  label:'Налаштування', badge:null, red:false },
  ]},
]

const ORDERS = [
  { id:'#AU-2061', customer:'Олексій Ткаченко',  product:'Ausom DT2 Pro',         total:'₴44 250', status:'paid',      date:'15.04.2026' },
  { id:'#AU-2060', customer:'Марина Коваль',      product:'Ausom L2 Max Dual',     total:'₴40 800', status:'shipped',   date:'15.04.2026' },
  { id:'#AU-2059', customer:'Дмитро Пилипенко',  product:'Ausom L2 Dual Motor',   total:'₴32 200', status:'pending',   date:'14.04.2026' },
  { id:'#AU-2058', customer:'Анна Савченко',      product:'Ausom L1',               total:'₴27 050', status:'delivered', date:'14.04.2026' },
  { id:'#AU-2057', customer:'Ігор Мельник',       product:'Ausom DT2 Pro',         total:'₴44 250', status:'cancelled', date:'13.04.2026' },
]

const STATUS: Record<string, { label:string; bg:string; color:string; dot:string }> = {
  pending:   { label:'Очікує',      bg:'#FFF8E6', color:'#92600A', dot:'#F59E0B' },
  paid:      { label:'Оплачено',    bg:'#F0FDF4', color:'#166534', dot:'#22C55E' },
  shipped:   { label:'Відправлено', bg:'#EFF6FF', color:'#1E40AF', dot:'#3B82F6' },
  delivered: { label:'Доставлено',  bg:'#F5F3FF', color:'#5B21B6', dot:'#8B5CF6' },
  cancelled: { label:'Скасовано',   bg:'#FEF2F2', color:'#991B1B', dot:'#EF4444' },
}

const MONTHS = ['Жов','Лис','Гру','Січ','Лют','Бер','Квіт']
const BARS   = [42,68,95,74,53,88,100]

const s = (obj: React.CSSProperties) => obj

export default function AdminDashboard() {
  const [prodCount, setProdCount] = useState(0)
  const [ordCount,  setOrdCount]  = useState(0)
  const [revenue,   setRevenue]   = useState(0)
  const [pending,   setPending]   = useState(0)
  const [loading,   setLoading]   = useState(true)
  const [activeBar, setActiveBar] = useState(6)

  useEffect(() => {
    Promise.all([getAllProducts(), getAllOrders()])
      .then(([prods, ords]) => {
        setProdCount(prods.length)
        setOrdCount(ords.length)
        setRevenue(ords.reduce((s,o) => s + o.total, 0))
        setPending(ords.filter(o => o.status === 'pending').length)
      }).catch(()=>{}).finally(()=>setLoading(false))
  }, [])

  const STATS = [
    { label:'Продажі сьогодні', val: loading?'...': `₴${revenue.toLocaleString('uk-UA')}`, trend:'+18%', up:true,  color:'#F5C200', bg:'#FFF8E6', Icon:TrendingUp },
    { label:'Нові замовлення',  val: loading?'...': String(ordCount),                       trend:'+5',   up:true,  color:'#22C55E', bg:'#F0FDF4', Icon:ShoppingBag },
    { label:'Товарів',          val: loading?'...': String(prodCount),                      trend:'',     up:true,  color:'#3B82F6', bg:'#EFF6FF', Icon:Package },
    { label:'Очікують',         val: loading?'...': String(pending),                        trend:'',     up:false, color:'#EF4444', bg:'#FEF2F2', Icon:TrendingDown },
  ]

  const border = '1.5px solid #EEEEEE'
  const radius = 12

  return (
    <div style={s({ display:'flex', minHeight:'100vh', background:'#F9F9F9', fontFamily:'Inter,sans-serif' })}>

      {/* ── Sidebar ── */}
      <aside style={s({ width:220, background:'#fff', borderRight:border, display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', flexShrink:0 })}>
        <Link href="/admin" style={s({ display:'flex', alignItems:'center', gap:8, padding:'20px 20px 16px', borderBottom:border, textDecoration:'none' })}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="#F5C200"/>
          </svg>
          <span style={s({ fontWeight:800, fontSize:16, letterSpacing:'-.02em', color:'#111' })}>AUSOM</span>
          <sup style={s({ fontSize:8, fontWeight:700, color:'#D4A800', marginTop:-6 })}>UA</sup>
          <span style={s({ marginLeft:'auto', fontSize:9, fontWeight:800, background:'#111', color:'#fff', padding:'2px 7px', borderRadius:4, letterSpacing:'.04em' })}>ADMIN</span>
        </Link>

        <nav style={s({ flex:1, padding:'12px 10px', overflowY:'auto' })}>
          {NAV.map(section => (
            <div key={section.group}>
              <p style={s({ fontSize:9, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase', color:'#BBBBBB', padding:'12px 10px 6px' })}>{section.group}</p>
              {section.items.map(item => {
                const active = item.href === '/admin'
                return (
                  <Link key={item.href} href={item.href} style={s({
                    display:'flex', alignItems:'center', gap:10,
                    padding:'9px 10px', borderRadius:8, marginBottom:2,
                    fontSize:13, fontWeight:500, textDecoration:'none',
                    background: active ? '#FFF8E6' : 'transparent',
                    color: active ? '#92600A' : '#444',
                    borderLeft: active ? '3px solid #F5C200' : '3px solid transparent',
                    transition:'background .15s',
                  })}>
                    <item.icon size={15} style={{ flexShrink:0, color: active ? '#D4A800' : '#888' }}/>
                    {item.label}
                    {item.badge && (
                      <span style={s({ marginLeft:'auto', fontSize:10, fontWeight:800, background: item.red ? '#EF4444':'#F5C200', color: item.red?'#fff':'#111', padding:'1px 6px', borderRadius:10, minWidth:18, textAlign:'center' })}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div style={s({ padding:'12px 10px', borderTop:border })}>
          <div style={s({ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8, cursor:'pointer' })}>
            <div style={s({ width:32, height:32, borderRadius:'50%', background:'#F5C200', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:'#111', flexShrink:0 })}>А</div>
            <div>
              <p style={s({ fontSize:13, fontWeight:600, color:'#111' })}>Адмін</p>
              <p style={s({ fontSize:11, color:'#888' })}>Адміністратор</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={s({ flex:1, display:'flex', flexDirection:'column', minWidth:0 })}>

        {/* Topbar */}
        <header style={s({ height:60, background:'#fff', borderBottom:border, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:40, gap:16 })}>
          <div style={s({ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'#888' })}>
            <Link href="/admin" style={{ color:'#888', textDecoration:'none' }}>Адмінка</Link>
            <ChevronRight size={12}/>
            <strong style={{ color:'#111', fontWeight:600 }}>Дашборд</strong>
          </div>
          <div style={s({ display:'flex', alignItems:'center', gap:4, background:'#F9F9F9', border:'1.5px solid #EEE', borderRadius:8, padding:'8px 14px', width:240 })}>
            <Search size={13} color="#BBB"/>
            <input placeholder="Пошук…" style={s({ background:'none', border:'none', outline:'none', fontSize:13, color:'#111', width:'100%', fontFamily:'Inter,sans-serif' })}/>
          </div>
          <div style={s({ display:'flex', alignItems:'center', gap:8, marginLeft:'auto' })}>
            <button style={s({ position:'relative', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:'1.5px solid #EEE', borderRadius:8, cursor:'pointer', color:'#666' })}>
              <Bell size={15}/>
              <span style={s({ position:'absolute', top:7, right:7, width:7, height:7, background:'#EF4444', borderRadius:'50%', border:'1.5px solid #fff' })}/>
            </button>
            <Link href="/" target="_blank" style={s({ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:'1.5px solid #EEE', borderRadius:8, color:'#666', textDecoration:'none' })}>
              <Eye size={15}/>
            </Link>
            <button style={s({ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:'1.5px solid #EEE', borderRadius:8, cursor:'pointer', color:'#666' })}>
              <LogOut size={15}/>
            </button>
          </div>
        </header>

        {/* Content */}
        <main style={s({ flex:1, padding:'28px 28px' })}>

          {/* Page header */}
          <div style={s({ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24, flexWrap:'wrap', gap:12 })}>
            <div>
              <h1 style={s({ fontSize:28, fontWeight:800, letterSpacing:'-.03em', color:'#111', marginBottom:4 })}>Дашборд</h1>
              <p style={s({ fontSize:13, color:'#888' })}>Середа, 15 квітня 2026</p>
            </div>
            <Link href="/admin/products/new" style={s({ display:'inline-flex', alignItems:'center', gap:6, background:'#111', color:'#fff', fontSize:12, fontWeight:700, letterSpacing:'.06em', textTransform:'uppercase', padding:'10px 20px', borderRadius:7, textDecoration:'none' })}>
              <Plus size={13}/> Новий товар
            </Link>
          </div>

          {/* Stats grid */}
          <div style={s({ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 })}>
            {STATS.map((stat, i) => (
              <div key={i} style={s({ background:'#fff', border:border, borderRadius:radius, padding:'20px 20px', display:'flex', flexDirection:'column', gap:14 })}>
                <div style={s({ display:'flex', alignItems:'center', justifyContent:'space-between' })}>
                  <span style={s({ fontSize:11, fontWeight:700, letterSpacing:'.08em', textTransform:'uppercase', color:'#888' })}>{stat.label}</span>
                  <div style={s({ width:34, height:34, borderRadius:8, background:stat.bg, display:'flex', alignItems:'center', justifyContent:'center', color:stat.color })}>
                    <stat.Icon size={15}/>
                  </div>
                </div>
                <span style={s({ fontSize:30, fontWeight:800, letterSpacing:'-.03em', color:'#111', lineHeight:1 })}>{stat.val}</span>
                {stat.trend && (
                  <div style={s({ display:'flex', alignItems:'center', gap:4, fontSize:12, fontWeight:600, color: stat.up ? '#22C55E':'#EF4444' })}>
                    {stat.up ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {stat.trend} vs вчора
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div style={s({ display:'grid', gridTemplateColumns:'2fr 1fr', gap:16, marginBottom:24 })}>
            {/* Bar chart */}
            <div style={s({ background:'#fff', border:border, borderRadius:radius, padding:'20px 24px' })}>
              <p style={s({ fontSize:14, fontWeight:700, color:'#111', marginBottom:24 })}>Продажі за місяць</p>
              <div style={s({ display:'flex', alignItems:'flex-end', gap:8, height:100 })}>
                {MONTHS.map((m,i) => (
                  <div key={m} onClick={() => setActiveBar(i)} style={s({ flex:1, borderRadius:'4px 4px 0 0', cursor:'pointer', position:'relative', transition:'all .2s', background: i===activeBar ? '#111':'#F5F5F5', height:`${BARS[i]}%` })}>
                    <span style={s({ position:'absolute', bottom:-18, left:'50%', transform:'translateX(-50%)', fontSize:9, fontWeight:600, color: i===activeBar?'#111':'#BBB', whiteSpace:'nowrap' })}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Donut */}
            <div style={s({ background:'#fff', border:border, borderRadius:radius, padding:'20px 24px' })}>
              <p style={s({ fontSize:14, fontWeight:700, color:'#111', marginBottom:16 })}>По товарах</p>
              <div style={s({ display:'flex', justifyContent:'center', marginBottom:16 })}>
                <div style={s({ width:96, height:96, borderRadius:'50%', position:'relative' })} 
                     dangerouslySetInnerHTML={{ __html:`<svg width="96" height="96" viewBox="0 0 96 96"><circle r="38" cx="48" cy="48" fill="none" stroke="#F5F5F5" stroke-width="16"/><circle r="38" cx="48" cy="48" fill="none" stroke="#F5C200" stroke-width="16" stroke-dasharray="${0.29*239} ${239}" stroke-dashoffset="0"/><circle r="38" cx="48" cy="48" fill="none" stroke="#3B82F6" stroke-width="16" stroke-dasharray="${0.34*239} ${239}" stroke-dashoffset="${-0.29*239}"/><circle r="38" cx="48" cy="48" fill="none" stroke="#8B5CF6" stroke-width="16" stroke-dasharray="${0.21*239} ${239}" stroke-dashoffset="${-(0.29+0.34)*239}"/><text x="48" y="52" text-anchor="middle" font-size="18" font-weight="800" font-family="Inter" fill="#111">101</text></svg>` }}/>
              </div>
              <div style={s({ display:'flex', flexDirection:'column', gap:8 })}>
                {[['#F5C200','DT2 Pro','29'],['#3B82F6','L1','34'],['#8B5CF6','L2 Dual','21'],['#EEE','L2 Max','17']].map(([col,name,val]) => (
                  <div key={name} style={s({ display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:12 })}>
                    <div style={s({ display:'flex', alignItems:'center', gap:8 })}><span style={s({ width:8, height:8, borderRadius:2, background:col, display:'inline-block' })}/><span style={{ color:'#555' }}>{name}</span></div>
                    <span style={{ fontWeight:700, color:'#111', fontFamily:'monospace' }}>{val} шт</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders table */}
          <div style={s({ background:'#fff', border:border, borderRadius:radius, overflow:'hidden' })}>
            <div style={s({ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px 20px', borderBottom:border })}>
              <p style={s({ fontSize:14, fontWeight:700, color:'#111' })}>Останні замовлення</p>
              <Link href="/admin/orders" style={s({ fontSize:12, fontWeight:600, color:'#111', textDecoration:'none', background:'#F9F9F9', border:'1.5px solid #EEE', padding:'7px 14px', borderRadius:6 })}>Всі замовлення</Link>
            </div>
            <table style={s({ width:'100%', borderCollapse:'collapse' })}>
              <thead>
                <tr style={{ background:'#FAFAFA' }}>
                  {['№','Клієнт','Товар','Сума','Статус','Дата',''].map(h => (
                    <th key={h} style={s({ padding:'10px 16px', textAlign:'left', fontSize:10, fontWeight:700, letterSpacing:'.1em', textTransform:'uppercase', color:'#AAA', borderBottom:border })}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((o, i) => {
                  const st = STATUS[o.status] || STATUS.pending
                  return (
                    <tr key={o.id} style={{ borderBottom: i < ORDERS.length-1 ? border : 'none' }}>
                      <td style={s({ padding:'14px 16px', fontSize:12, fontWeight:700, color:'#D4A800', fontFamily:'monospace' })}>{o.id}</td>
                      <td style={s({ padding:'14px 16px', fontSize:13, fontWeight:600, color:'#111' })}>{o.customer}</td>
                      <td style={s({ padding:'14px 16px', fontSize:13, color:'#555' })}>{o.product}</td>
                      <td style={s({ padding:'14px 16px', fontSize:15, fontWeight:800, color:'#111', letterSpacing:'-.01em' })}>{o.total}</td>
                      <td style={s({ padding:'14px 16px' })}>
                        <span style={s({ display:'inline-flex', alignItems:'center', gap:6, fontSize:11, fontWeight:700, background:st.bg, color:st.color, padding:'4px 10px', borderRadius:20 })}>
                          <span style={s({ width:6, height:6, borderRadius:'50%', background:st.dot, flexShrink:0 })}/>
                          {st.label}
                        </span>
                      </td>
                      <td style={s({ padding:'14px 16px', fontSize:12, color:'#888' })}>{o.date}</td>
                      <td style={s({ padding:'14px 16px' })}>
                        <div style={s({ display:'flex', gap:4, justifyContent:'flex-end' })}>
                          <button style={s({ width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:'1.5px solid #EEE', borderRadius:6, cursor:'pointer', color:'#666' })}><Eye size={12}/></button>
                          <button style={s({ width:30, height:30, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:'1.5px solid #EEE', borderRadius:6, cursor:'pointer', color:'#666' })}><Edit size={12}/></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  )
}
