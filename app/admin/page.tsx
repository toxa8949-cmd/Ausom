'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProducts, getAllOrders } from '@/lib/queries'
import {
  LayoutDashboard, Package, ShoppingBag, Users, FileText,
  Settings, LogOut, Bell, Search, TrendingUp, TrendingDown,
  Edit, Trash2, Eye, Plus, Zap, BarChart2, Tag,
} from 'lucide-react'

const STATUS: Record<string, { label: string; cls: string }> = {
  pending:   { label: 'Очікує',     cls: 'bg-amber-500/12 text-amber-300 border-amber-500/20' },
  paid:      { label: 'Оплачено',   cls: 'bg-green-500/12 text-green-300 border-green-500/20' },
  shipped:   { label: 'Відправлено',cls: 'bg-blue-500/12  text-blue-300  border-blue-500/20'  },
  delivered: { label: 'Доставлено', cls: 'bg-purple-500/12 text-purple-300 border-purple-500/20' },
  cancelled: { label: 'Скасовано',  cls: 'bg-red-500/12   text-red-300   border-red-500/20'   },
}

const NAV_ITEMS = [
  { group: 'Основне', items: [
    { href: '/admin',           icon: LayoutDashboard, label: 'Дашборд',      badge: null },
    { href: '/admin/orders',    icon: ShoppingBag,     label: 'Замовлення',   badge: 12, badgeRed: true },
    { href: '/admin/products',  icon: Package,         label: 'Товари',       badge: null },
    { href: '/admin/customers', icon: Users,           label: 'Клієнти',      badge: null },
  ]},
  { group: 'Контент', items: [
    { href: '/admin/blog',    icon: FileText, label: 'Блог',    badge: null },
    { href: '/admin/banners', icon: Tag,      label: 'Банери',  badge: null },
  ]},
  { group: 'Система', items: [
    { href: '/admin/analytics', icon: BarChart2, label: 'Аналітика', badge: null },
    { href: '/admin/settings',  icon: Settings,  label: 'Налаштування', badge: null },
  ]},
]

const MOCK_ORDERS = [
  { id:'#AU-2061', customer:'Олексій Ткаченко',  product:'Ausom DT2 Pro',     total:'₴44 250', status:'paid',      date:'15.04.2026' },
  { id:'#AU-2060', customer:'Марина Коваль',      product:'Ausom L2 Max Dual', total:'₴40 800', status:'shipped',   date:'15.04.2026' },
  { id:'#AU-2059', customer:'Дмитро Пилипенко',  product:'Ausom L2 Dual',     total:'₴32 200', status:'pending',   date:'14.04.2026' },
  { id:'#AU-2058', customer:'Анна Савченко',      product:'Ausom L1',          total:'₴27 050', status:'delivered', date:'14.04.2026' },
  { id:'#AU-2057', customer:'Ігор Мельник',       product:'Ausom DT2 Pro',     total:'₴44 250', status:'cancelled', date:'13.04.2026' },
]

const MONTHS = ['Жов','Лис','Гру','Січ','Лют','Бер','Квіт']
const BARS   = [42,68,95,74,53,88,100]

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
    { label:'Продажі сьогодні', val: loading ? '...' : `₴${revenue.toLocaleString('uk-UA')}`, trend:'+18%', up:true,  iconCls:'bg-[var(--brand)]/10 text-[var(--brand)]',  Icon: TrendingUp  },
    { label:'Нові замовлення',  val: loading ? '...' : String(ordCount),                       trend:'+5',   up:true,  iconCls:'bg-green-500/10 text-green-400',             Icon: ShoppingBag },
    { label:'Товарів',          val: loading ? '...' : String(prodCount),                      trend:'',     up:true,  iconCls:'bg-blue-500/10  text-blue-400',              Icon: Package     },
    { label:'Очікують',         val: loading ? '...' : String(pending),                        trend:'',     up:false, iconCls:'bg-red-500/10   text-red-400',               Icon: TrendingDown },
  ]

  const thCls = 'px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[.08em] text-[#666] border-b border-[var(--border)] bg-[#1A1A1A]'
  const tdCls = 'px-5 py-3.5 text-[13px] text-[var(--light)] border-b border-[var(--border)]'

  return (
    <div className="flex min-h-screen bg-[#0A0A0A]">

      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-[240px] bg-[#111111] border-r border-[var(--border)] sticky top-0 h-screen overflow-y-auto shrink-0">
        <Link href="/admin" className="flex items-center gap-2 px-5 py-4 border-b border-[var(--border)] font-display text-[20px] tracking-[.06em] text-white hover:text-[var(--brand)] transition-colors">
          <Zap size={17} className="text-[var(--brand)]" strokeWidth={2.5}/> AUSOM UA
          <span className="ml-auto text-[9px] font-bold font-sans bg-[var(--brand)] text-[#111] px-1.5 py-0.5 rounded">Admin</span>
        </Link>

        <nav className="flex-1 p-3">
          {NAV_ITEMS.map(section => (
            <div key={section.group}>
              <p className="text-[9px] font-bold uppercase tracking-[.12em] text-[#666] px-3 pt-4 pb-1.5">{section.group}</p>
              {section.items.map(item => (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all mb-0.5 ${item.href==='/admin' ? 'bg-[#F5C200]/8 text-white border-l-[3px] border-[var(--brand)]' : 'text-[#666] hover:text-white hover:bg-white/4'}`}>
                  <item.icon size={15} className="shrink-0"/>
                  {item.label}
                  {item.badge && (
                    <span className={`ml-auto text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center ${item.badgeRed ? 'bg-red-500/20 text-red-400' : 'bg-[var(--brand)]/20 text-[var(--brand)]'}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-[var(--border)]">
          <div className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/4 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-[var(--brand)] flex items-center justify-center text-[#111] text-[12px] font-black shrink-0">А</div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">Адмін</p>
              <p className="text-[11px] text-[#666] truncate">Головний адміністратор</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Topbar */}
        <header className="sticky top-0 z-50 h-[60px] bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[var(--border)] flex items-center justify-between px-6 gap-4">
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-[#666]">Адмінка / <strong className="text-white font-medium">Дашборд</strong></span>
            <div className="hidden sm:flex items-center gap-2 bg-[#111111] border border-[var(--border)] rounded-lg px-3 py-2 w-56 focus-within:border-[var(--brand)] transition-colors">
              <Search size={13} className="text-[#666] shrink-0"/>
              <input placeholder="Пошук…" className="bg-transparent text-[12px] text-white outline-none w-full placeholder:text-[#666]"/>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative w-8 h-8 flex items-center justify-center bg-[#111111] border border-[var(--border)] rounded-lg text-[#666] hover:text-white transition-colors">
              <Bell size={14}/>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#111]"/>
            </button>
            <Link href="/" target="_blank" className="w-8 h-8 flex items-center justify-center bg-[#111111] border border-[var(--border)] rounded-lg text-[#666] hover:text-white transition-colors">
              <Eye size={14}/>
            </Link>
            <button className="w-8 h-8 flex items-center justify-center bg-[#111111] border border-[var(--border)] rounded-lg text-[#666] hover:text-red-400 transition-colors">
              <LogOut size={14}/>
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">

          {/* Page header */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="font-display text-[36px] text-white tracking-wide leading-none mb-1">Дашборд</h1>
              <p className="text-[13px] text-[#666]">Середа, 15 квітня 2026</p>
            </div>
            <Link href="/admin/products/new" className="btn-primary btn-sm">
              <Plus size={13}/> Новий товар
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {STATS.map((s, i) => (
              <div key={i} className="bg-[#111111] border border-[var(--border)] rounded-xl p-5 flex flex-col gap-3 hover:border-[var(--brand)]/20 hover:-translate-y-0.5 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-[.08em] text-[#666]">{s.label}</span>
                  <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${s.iconCls}`}>
                    <s.Icon size={14}/>
                  </div>
                </div>
                <span className="font-display text-[32px] text-white tracking-wide leading-none">{s.val}</span>
                {s.trend && (
                  <div className={`flex items-center gap-1 text-[11px] font-semibold ${s.up ? 'text-green-400' : 'text-red-400'}`}>
                    {s.up ? <TrendingUp size={11}/> : <TrendingDown size={11}/>} {s.trend} vs вчора
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            {/* Bar chart */}
            <div className="lg:col-span-2 bg-[#111111] border border-[var(--border)] rounded-xl p-6">
              <p className="text-[14px] font-semibold text-white mb-6">Продажі за місяць</p>
              <div className="flex items-end gap-2 h-[110px]">
                {MONTHS.map((m, i) => (
                  <div key={m} onClick={() => setActiveBar(i)}
                    className={`flex-1 rounded-t-md cursor-pointer transition-all duration-200 relative group ${i===activeBar ? 'bg-[var(--brand)]' : 'bg-[var(--brand)]/15 hover:bg-[var(--brand)]/30'}`}
                    style={{ height: `${BARS[i]}%` }}>
                    <span className={`absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap ${i===activeBar ? 'text-[var(--brand)]' : 'text-[#666]'}`}>{m}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Donut */}
            <div className="bg-[#111111] border border-[var(--border)] rounded-xl p-6">
              <p className="text-[14px] font-semibold text-white mb-4">Продажі по товарах</p>
              <div className="flex items-center justify-center mb-4">
                <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{background:'conic-gradient(#F5C200 0% 29%,#3B82F6 29% 63%,#8B5CF6 63% 84%,#2A2A2A 84% 100%)'}}>
                  <div className="w-14 h-14 rounded-full bg-[#111111] flex flex-col items-center justify-center">
                    <span className="font-display text-[18px] text-white leading-none">101</span>
                    <span className="text-[8px] text-[#666]">шт</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {[['#F5C200','DT2 Pro','29'],['#3B82F6','L1','34'],['#8B5CF6','L2 Dual','21'],['#2A2A2A','L2 Max','17']].map(([col,name,val]) => (
                  <div key={name} className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-sm" style={{background:col}}/><span className="text-[var(--light)]">{name}</span></div>
                    <span className="font-mono font-medium text-white">{val} шт</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Orders table */}
          <div className="bg-[#111111] border border-[var(--border)] rounded-xl overflow-hidden mb-6">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
              <p className="text-[14px] font-semibold text-white">Останні замовлення</p>
              <Link href="/admin/orders" className="btn-outline btn-sm">Всі замовлення</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr>
                    {['№','Клієнт','Товар','Сума','Статус','Дата',''].map(h => <th key={h} className={thCls}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_ORDERS.map(o => {
                    const st = STATUS[o.status] || STATUS.pending
                    return (
                      <tr key={o.id} className="hover:bg-white/[.015] transition-colors">
                        <td className={tdCls}><span className="font-mono text-[12px] text-[var(--brand)]">{o.id}</span></td>
                        <td className={tdCls}><span className="font-medium text-white text-[13px]">{o.customer}</span></td>
                        <td className={tdCls}>{o.product}</td>
                        <td className={tdCls}><span className="font-display text-[16px] text-white">{o.total}</span></td>
                        <td className={tdCls}>
                          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide border px-2.5 py-1 rounded-full ${st.cls}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70"/>{st.label}
                          </span>
                        </td>
                        <td className={tdCls}>{o.date}</td>
                        <td className={tdCls}>
                          <div className="flex gap-1 justify-end">
                            <Link href={`/admin/orders/${o.id}`} className="w-7 h-7 flex items-center justify-center bg-[#1A1A1A] border border-[var(--border)] rounded text-[#666] hover:text-[var(--brand)] hover:border-[var(--brand)]/30 transition-all"><Eye size={12}/></Link>
                            <button className="w-7 h-7 flex items-center justify-center bg-[#1A1A1A] border border-[var(--border)] rounded text-[#666] hover:text-white transition-all"><Edit size={12}/></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
