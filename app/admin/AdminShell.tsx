'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Package, ShoppingBag, Users, FileText,
  Settings, LogOut, Bell, Search, Eye, Tag, BarChart2,
  ChevronRight,
} from 'lucide-react'

const NAV = [
  { group:'Основне', items:[
    { href:'/admin',           icon:LayoutDashboard, label:'Дашборд',    badge:null, red:false },
    { href:'/admin/orders',    icon:ShoppingBag,     label:'Замовлення', badge:12,   red:true  },
    { href:'/admin/products',  icon:Package,         label:'Товари',     badge:null, red:false },
    { href:'/admin/customers', icon:Users,           label:'Клієнти',    badge:null, red:false },
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

const B = '1.5px solid #EEEEEE'

export default function AdminShell({ children, title, subtitle, breadcrumb }: {
  children: React.ReactNode
  title: string
  subtitle?: string
  breadcrumb?: string
}) {
  const pathname = usePathname()

  return (
    <div style={{ display:'flex', minHeight:'100vh', background:'#F9F9F9', fontFamily:'Inter,sans-serif' }}>

      {/* Sidebar */}
      <aside style={{ width:220, background:'#fff', borderRight:B, display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', flexShrink:0 }}>
        <Link href="/admin" style={{ display:'flex', alignItems:'center', gap:8, padding:'20px 20px 16px', borderBottom:B, textDecoration:'none' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" fill="#F5C200"/>
          </svg>
          <span style={{ fontWeight:800, fontSize:16, letterSpacing:'-.02em', color:'#111' }}>AUSOM</span>
          <sup style={{ fontSize:8, fontWeight:700, color:'#D4A800', marginTop:-6 }}>UA</sup>
          <span style={{ marginLeft:'auto', fontSize:9, fontWeight:800, background:'#111', color:'#fff', padding:'2px 7px', borderRadius:4, letterSpacing:'.04em' }}>ADMIN</span>
        </Link>

        <nav style={{ flex:1, padding:'12px 10px', overflowY:'auto' }}>
          {NAV.map(section => (
            <div key={section.group}>
              <p style={{ fontSize:9, fontWeight:700, letterSpacing:'.12em', textTransform:'uppercase' as const, color:'#BBBBBB', padding:'12px 10px 6px' }}>{section.group}</p>
              {section.items.map(item => {
                const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                return (
                  <Link key={item.href} href={item.href} style={{
                    display:'flex', alignItems:'center', gap:10, padding:'9px 10px', borderRadius:8,
                    marginBottom:2, fontSize:13, fontWeight:500, textDecoration:'none',
                    background: active ? '#FFF8E6' : 'transparent',
                    color: active ? '#92600A' : '#444',
                    borderLeft: active ? '3px solid #F5C200' : '3px solid transparent',
                  }}>
                    <item.icon size={15} style={{ flexShrink:0, color: active ? '#D4A800' : '#888' }}/>
                    {item.label}
                    {item.badge && (
                      <span style={{ marginLeft:'auto', fontSize:10, fontWeight:800, background: item.red ? '#EF4444':'#F5C200', color: item.red?'#fff':'#111', padding:'1px 6px', borderRadius:10, minWidth:18, textAlign:'center' as const }}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        <div style={{ padding:'12px 10px', borderTop:B }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'8px 10px', borderRadius:8 }}>
            <div style={{ width:32, height:32, borderRadius:'50%', background:'#F5C200', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:800, color:'#111', flexShrink:0 }}>А</div>
            <div>
              <p style={{ fontSize:13, fontWeight:600, color:'#111' }}>Адмін</p>
              <p style={{ fontSize:11, color:'#888' }}>Адміністратор</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>

        {/* Topbar */}
        <header style={{ height:60, background:'#fff', borderBottom:B, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', position:'sticky', top:0, zIndex:40, gap:16 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, color:'#888' }}>
            <Link href="/admin" style={{ color:'#888', textDecoration:'none' }}>Адмінка</Link>
            {breadcrumb && <><ChevronRight size={12}/><span style={{ color:'#111', fontWeight:600 }}>{breadcrumb}</span></>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:4, background:'#F9F9F9', border:B, borderRadius:8, padding:'8px 14px', width:240 }}>
            <Search size={13} color="#BBB"/>
            <input placeholder="Пошук…" style={{ background:'none', border:'none', outline:'none', fontSize:13, color:'#111', width:'100%', fontFamily:'Inter,sans-serif' }}/>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginLeft:'auto' }}>
            <button style={{ position:'relative', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:B, borderRadius:8, cursor:'pointer', color:'#666' }}>
              <Bell size={15}/>
              <span style={{ position:'absolute', top:7, right:7, width:7, height:7, background:'#EF4444', borderRadius:'50%', border:'1.5px solid #fff' }}/>
            </button>
            <Link href="/" target="_blank" style={{ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:B, borderRadius:8, color:'#666', textDecoration:'none' }}>
              <Eye size={15}/>
            </Link>
            <button style={{ width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', background:'#F9F9F9', border:B, borderRadius:8, cursor:'pointer', color:'#666' }}>
              <LogOut size={15}/>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex:1, padding:28 }}>
          {(title || subtitle) && (
            <div style={{ marginBottom:24 }}>
              <h1 style={{ fontSize:28, fontWeight:800, letterSpacing:'-.03em', color:'#111', marginBottom:4 }}>{title}</h1>
              {subtitle && <p style={{ fontSize:13, color:'#888' }}>{subtitle}</p>}
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  )
}
