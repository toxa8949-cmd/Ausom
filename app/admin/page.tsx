'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProducts } from '@/lib/queries'
import { getAllOrders } from '@/lib/queries'
import { Package, ShoppingCart, TrendingUp, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [products, setProducts] = useState<number>(0)
  const [orders, setOrders] = useState<number>(0)
  const [revenue, setRevenue] = useState<number>(0)
  const [pending, setPending] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllProducts(), getAllOrders()])
      .then(([prods, ords]) => {
        setProducts(prods.length)
        setOrders(ords.length)
        setRevenue(ords.reduce((s, o) => s + o.total, 0))
        setPending(ords.filter(o => o.status === 'pending').length)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const stats = [
    { label: 'Товарів', value: products, icon: Package, color: 'bg-blue-50 text-blue-600', href: '/admin/products' },
    { label: 'Замовлень', value: orders, icon: ShoppingCart, color: 'bg-green-50 text-green-600', href: '/admin/orders' },
    { label: 'Дохід (€)', value: revenue, icon: TrendingUp, color: 'bg-orange-50 text-orange-600', href: '/admin/orders' },
    { label: 'Очікують', value: pending, icon: AlertCircle, color: 'bg-red-50 text-red-500', href: '/admin/orders' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Дашборд</h1>
        <p className="text-[#888884] text-sm mt-1">Загальний огляд магазину</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(s => {
          const Icon = s.icon
          return (
            <Link key={s.label} href={s.href} className="bg-white rounded-2xl p-6 border border-[#e8e8e5] hover:shadow-lg transition-all hover:-translate-y-0.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color}`}>
                <Icon size={18} />
              </div>
              <div className="text-2xl font-bold mb-1">
                {loading ? <span className="inline-block w-12 h-6 bg-[#f4f4f2] rounded animate-pulse" /> : s.value}
              </div>
              <div className="text-sm text-[#888884]">{s.label}</div>
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-[#e8e8e5]">
          <h2 className="font-bold mb-4">Швидкі дії</h2>
          <div className="space-y-2">
            <Link href="/admin/products/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f4f4f2] transition-colors text-sm font-medium">
              <span className="w-8 h-8 bg-[#ff5c00] text-white rounded-lg flex items-center justify-center text-lg font-bold">+</span>
              Додати новий товар
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f4f4f2] transition-colors text-sm font-medium">
              <span className="w-8 h-8 bg-[#0b0b0b] text-white rounded-lg flex items-center justify-center">
                <ShoppingCart size={14} />
              </span>
              Переглянути замовлення
            </Link>
            <Link href="/admin/blog/new" className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f4f4f2] transition-colors text-sm font-medium">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-lg font-bold">+</span>
              Написати статтю в блог
            </Link>
          </div>
        </div>

        <div className="bg-[#0b0b0b] rounded-2xl p-6">
          <h2 className="font-bold text-white mb-4">Налаштування Supabase</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4">
            Щоб адмін-панель працювала з реальною базою даних, потрібно:
          </p>
          <ol className="space-y-2 text-sm text-white/60">
            <li className="flex gap-2"><span className="text-[#ff5c00] font-bold shrink-0">1.</span> Зайди на supabase.com і створи проєкт</li>
            <li className="flex gap-2"><span className="text-[#ff5c00] font-bold shrink-0">2.</span> Запусти <code className="text-[#ff5c00]">supabase/schema.sql</code> в SQL Editor</li>
            <li className="flex gap-2"><span className="text-[#ff5c00] font-bold shrink-0">3.</span> Скопіюй ключі в <code className="text-[#ff5c00]">.env.local</code></li>
            <li className="flex gap-2"><span className="text-[#ff5c00] font-bold shrink-0">4.</span> Створи admin-користувача в Authentication</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
