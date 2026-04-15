'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getAllProducts, deleteProduct } from '@/lib/queries'
import { Product } from '@/lib/types'
import { Pencil, Trash2, Plus, Search } from 'lucide-react'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    getAllProducts().then(setProducts).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Видалити "${name}"?`)) return
    setDeleting(id)
    try {
      await deleteProduct(id)
      setProducts(prev => prev.filter(p => p.id !== id))
    } catch (e) {
      alert('Помилка видалення')
    } finally {
      setDeleting(null)
    }
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Товари</h1>
          <p className="text-[#666] text-sm mt-1">{products.length} моделей в каталозі</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={16} />
          Додати товар
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
        <input
          type="text"
          placeholder="Пошук товарів..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white border border-[#2A2A2A] rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#F5C200] transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#2A2A2A] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-[#666]">
            <div className="w-8 h-8 border-2 border-[#F5C200] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            Завантаження...
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#2A2A2A]">
                {['Назва', 'Ціна', 'Категорія', 'Наявність', 'Дії'].map(h => (
                  <th key={h} className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#666]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} className="border-b border-[#f4f4f2] hover:bg-[#fafaf8] transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-sm">{p.name}</div>
                    <div className="text-xs text-[#666] mt-0.5">{p.slug}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm">€{p.price}</div>
                    {p.old_price && (
                      <div className="text-xs text-[#666] line-through">€{p.old_price}</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full
                      ${p.category === 'offroad'
                        ? 'bg-orange-50 text-orange-600'
                        : 'bg-blue-50 text-blue-600'
                      }`}>
                      {p.category === 'offroad' ? 'Позашляховий' : 'Міський'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full
                      ${p.in_stock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.in_stock ? 'bg-green-500' : 'bg-red-500'}`} />
                      {p.in_stock ? 'В наявності' : 'Немає'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/products/${p.id}`}
                        className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-[#F5F5F0] hover:bg-[#1A1A1A] rounded-lg transition-all"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.id, p.name)}
                        disabled={deleting === p.id}
                        className="w-8 h-8 flex items-center justify-center text-[#666] hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-40"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && filtered.length === 0 && (
          <div className="p-12 text-center text-[#666] text-sm">
            Нічого не знайдено
          </div>
        )}
      </div>
    </div>
  )
}
