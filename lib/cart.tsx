'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { CartItem, Product } from './types'

interface CartContextType {
  items: CartItem[]
  count: number
  total: number
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  /** True once the cart has been read from localStorage. Use to avoid
      showing "empty cart" UI during hydration. */
  ready: boolean
}

const CartContext = createContext<CartContextType | null>(null)
const STORAGE_KEY = 'ausom_cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [ready, setReady] = useState(false)
  // Guard: only persist AFTER first hydration load. Without this, the empty
  // initial state would overwrite localStorage on mount.
  const hydrated = useRef(false)

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) setItems(parsed)
      }
    } catch {
      // corrupted storage → ignore
    }
    hydrated.current = true
    setReady(true)
  }, [])

  // Persist on change (skips the initial render before hydration)
  useEffect(() => {
    if (!hydrated.current) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // quota exceeded / private mode → silently ignore
    }
  }, [items])

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return
      try {
        const parsed = e.newValue ? JSON.parse(e.newValue) : []
        if (Array.isArray(parsed)) setItems(parsed)
      } catch { /* ignore */ }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const addItem = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.product.id !== id))
  }

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return removeItem(id)
    setItems(prev =>
      prev.map(i => (i.product.id === id ? { ...i, quantity: qty } : i))
    )
  }

  const clearCart = () => setItems([])

  const count = items.reduce((s, i) => s + i.quantity, 0)
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, count, total, addItem, removeItem, updateQty, clearCart, ready }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
