'use client'

import { useEffect, useState } from 'react'
import { getAllOrders, updateOrderStatus } from '@/lib/queries'
import { Order } from '@/lib/types'

const STATUS_LABELS: Record<Order['status'], string> = {
  pending: 'Очікує',
  confirmed: 'Підтверджено',
  shipped: 'Відправлено',
  delivered: 'Доставлено',
  cancelled: 'Скасовано',
}

const STATUS_COLORS: Record<Order['status'], string> = {
  pending: 'bg-yellow-50 text-yellow-700',
  confirmed: 'bg-blue-50 text-blue-700',
  shipped: 'bg-purple-50 text-purple-700',
  delivered: 'bg-green-50 text-green-700',
  cancelled: 'bg-red-50 text-red-500',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  useEffect(() => {
    getAllOrders().then(setOrders).finally(() => setLoading(false))
  }, [])

  const handleStatus = async (id: string, status: Order['status']) => {
    await updateOrderStatus(id, status)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Замовлення</h1>
        <p className="text-[#888884] text-sm mt-1">{orders.length} замовлень всього</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#ff5c00] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#e8e8e5] p-16 text-center text-[#888884]">
          Замовлень ще немає
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-2xl border border-[#e8e8e5] overflow-hidden">
              {/* Row */}
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-[#fafaf8] transition-colors flex-wrap"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{order.name}</div>
                  <div className="text-xs text-[#888884] mt-0.5">{order.email} · {order.phone}</div>
                </div>
                <div className="text-sm font-bold">€{order.total}</div>
                <div className="text-xs text-[#888884]">
                  {new Date(order.created_at).toLocaleDateString('uk-UA')}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
                <span className="text-[#888884] text-xs">{expanded === order.id ? '▲' : '▼'}</span>
              </div>

              {/* Expanded */}
              {expanded === order.id && (
                <div className="border-t border-[#f4f4f2] px-6 py-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#888884] mb-2">Доставка</div>
                      <p className="text-sm">{order.city}, {order.address}</p>
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-[#888884] mb-2">Товари</div>
                      {(order.items as any[]).map((item: any, i: number) => (
                        <div key={i} className="text-sm flex justify-between">
                          <span>{item.product?.name} × {item.quantity}</span>
                          <span className="font-medium">€{item.product?.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status update */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#888884] mb-3">Змінити статус</div>
                    <div className="flex flex-wrap gap-2">
                      {(Object.keys(STATUS_LABELS) as Order['status'][]).map(s => (
                        <button
                          key={s}
                          onClick={() => handleStatus(order.id, s)}
                          className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all
                            ${order.status === s
                              ? 'bg-[#0b0b0b] text-white'
                              : 'bg-[#f4f4f2] text-[#888884] hover:text-[#0b0b0b]'
                            }`}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
