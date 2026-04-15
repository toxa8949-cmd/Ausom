'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createProduct, updateProduct, getProductBySlug } from '@/lib/queries'
import { getAllProducts } from '@/lib/queries'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'

interface FormData {
  name: string
  slug: string
  price: string
  old_price: string
  category: 'offroad' | 'commuter'
  voltage: '48v' | '52v' | '60v'
  motor: 'single' | 'dual'
  range_km: string
  max_speed: string
  weight_kg: string
  max_load_kg: string
  battery_wh: string
  description: string
  tag: string
  in_stock: boolean
  is_new: boolean
  is_featured: boolean
  features: string[]
}

const EMPTY: FormData = {
  name: '', slug: '', price: '', old_price: '',
  category: 'commuter', voltage: '48v', motor: 'single',
  range_km: '', max_speed: '', weight_kg: '', max_load_kg: '', battery_wh: '',
  description: '', tag: '', in_stock: true, is_new: false, is_featured: false,
  features: [''],
}

export default function ProductForm({ params }: { params: { id: string } }) {
  const router = useRouter()
  const isNew = params.id === 'new'
  const [form, setForm] = useState<FormData>(EMPTY)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isNew) {
      // Load by id
      getAllProducts().then(products => {
        const p = products.find(p => p.id === params.id)
        if (p) {
          setForm({
            name: p.name, slug: p.slug,
            price: String(p.price), old_price: String(p.old_price || ''),
            category: p.category, voltage: p.voltage, motor: p.motor,
            range_km: String(p.range_km), max_speed: String(p.max_speed),
            weight_kg: String(p.weight_kg), max_load_kg: String(p.max_load_kg),
            battery_wh: String(p.battery_wh),
            description: p.description, tag: p.tag || '',
            in_stock: p.in_stock, is_new: p.is_new, is_featured: p.is_featured,
            features: p.features.length ? p.features : [''],
          })
        }
      }).finally(() => setLoading(false))
    }
  }, [isNew, params.id])

  const set = (key: keyof FormData, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const autoSlug = (name: string) => name.toLowerCase()
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const payload = {
        name: form.name, slug: form.slug,
        price: Number(form.price), old_price: form.old_price ? Number(form.old_price) : null,
        category: form.category, voltage: form.voltage, motor: form.motor,
        range_km: Number(form.range_km), max_speed: Number(form.max_speed),
        weight_kg: Number(form.weight_kg), max_load_kg: Number(form.max_load_kg),
        battery_wh: Number(form.battery_wh),
        description: form.description, tag: form.tag || null,
        in_stock: form.in_stock, is_new: form.is_new, is_featured: form.is_featured,
        features: form.features.filter(Boolean), images: [],
      }
      if (isNew) {
        await createProduct(payload)
      } else {
        await updateProduct(params.id, payload)
      }
      router.push('/admin/products')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Помилка збереження')
    } finally {
      setSaving(false)
    }
  }

  const inputCls = "w-full bg-[#1A1A1A] border border-transparent rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F5C200] transition-colors"
  const labelCls = "block text-sm font-medium mb-1.5"

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-[#F5C200] border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="w-9 h-9 flex items-center justify-center text-[#666] hover:text-[#F5F5F0] bg-white border border-[#2A2A2A] rounded-xl transition-all">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">{isNew ? 'Новий товар' : 'Редагувати товар'}</h1>
          <p className="text-[#666] text-sm mt-0.5">{isNew ? 'Додай новий самокат до каталогу' : form.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic info */}
        <div className="bg-white rounded-2xl p-6 border border-[#2A2A2A]">
          <h2 className="font-bold mb-5">Основна інформація</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelCls}>Назва *</label>
              <input
                value={form.name}
                onChange={e => {
                  set('name', e.target.value)
                  if (isNew) set('slug', autoSlug(e.target.value))
                }}
                placeholder="Gosoul 2 Pro Dual Motor"
                required className={inputCls}
              />
            </div>
            <div>
              <label className={labelCls}>Slug (URL) *</label>
              <input value={form.slug} onChange={e => set('slug', e.target.value)} placeholder="gosoul-2-pro" required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Тег (бейдж)</label>
              <input value={form.tag} onChange={e => set('tag', e.target.value)} placeholder="Новинка / Хіт / Флагман" className={inputCls} />
            </div>
          </div>
          <div className="mt-4">
            <label className={labelCls}>Опис</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              rows={4} placeholder="Детальний опис моделі..."
              className={inputCls + ' resize-none'}
            />
          </div>
        </div>

        {/* Price */}
        <div className="bg-white rounded-2xl p-6 border border-[#2A2A2A]">
          <h2 className="font-bold mb-5">Ціна</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Ціна (€) *</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} placeholder="569" required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Стара ціна (€)</label>
              <input type="number" value={form.old_price} onChange={e => set('old_price', e.target.value)} placeholder="749" className={inputCls} />
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-white rounded-2xl p-6 border border-[#2A2A2A]">
          <h2 className="font-bold mb-5">Характеристики</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Категорія</label>
              <select value={form.category} onChange={e => set('category', e.target.value as 'offroad' | 'commuter')} className={inputCls}>
                <option value="commuter">Міський</option>
                <option value="offroad">Позашляховий</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Напруга</label>
              <select value={form.voltage} onChange={e => set('voltage', e.target.value as '48v' | '52v' | '60v')} className={inputCls}>
                <option value="48v">48V</option>
                <option value="52v">52V</option>
                <option value="60v">60V</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Мотор</label>
              <select value={form.motor} onChange={e => set('motor', e.target.value as 'single' | 'dual')} className={inputCls}>
                <option value="single">Одиночний</option>
                <option value="dual">Подвійний</option>
              </select>
            </div>
            {[
              { key: 'range_km', label: 'Запас ходу (км)' },
              { key: 'max_speed', label: 'Макс. швидкість (км/г)' },
              { key: 'battery_wh', label: 'Акумулятор (Wh)' },
              { key: 'weight_kg', label: 'Вага (кг)' },
              { key: 'max_load_kg', label: 'Макс. вага (кг)' },
            ].map(f => (
              <div key={f.key}>
                <label className={labelCls}>{f.label}</label>
                <input
                  type="number"
                  value={form[f.key as keyof FormData] as string}
                  onChange={e => set(f.key as keyof FormData, e.target.value)}
                  className={inputCls}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-2xl p-6 border border-[#2A2A2A]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold">Особливості</h2>
            <button
              type="button"
              onClick={() => set('features', [...form.features, ''])}
              className="text-sm font-medium text-[#F5C200] flex items-center gap-1 hover:opacity-80"
            >
              <Plus size={14} /> Додати
            </button>
          </div>
          <div className="space-y-3">
            {form.features.map((feat, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={feat}
                  onChange={e => {
                    const newFeats = [...form.features]
                    newFeats[i] = e.target.value
                    set('features', newFeats)
                  }}
                  placeholder={`Особливість ${i + 1}`}
                  className={inputCls + ' flex-1'}
                />
                {form.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => set('features', form.features.filter((_, j) => j !== i))}
                    className="w-11 h-11 flex items-center justify-center text-[#666] hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shrink-0"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Flags */}
        <div className="bg-white rounded-2xl p-6 border border-[#2A2A2A]">
          <h2 className="font-bold mb-5">Статус</h2>
          <div className="flex flex-wrap gap-6">
            {[
              { key: 'in_stock', label: 'В наявності' },
              { key: 'is_new', label: 'Новинка' },
              { key: 'is_featured', label: 'Рекомендований' },
            ].map(f => (
              <label key={f.key} className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => set(f.key as keyof FormData, !form[f.key as keyof FormData])}
                  className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer
                    ${form[f.key as keyof FormData] ? 'bg-[#F5C200]' : 'bg-[#e8e8e5]'}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform
                    ${form[f.key as keyof FormData] ? 'translate-x-6' : 'translate-x-0.5'}`}
                  />
                </div>
                <span className="text-sm font-medium">{f.label}</span>
              </label>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                Збереження...
              </span>
            ) : (
              <><Save size={16} /> {isNew ? 'Створити товар' : 'Зберегти зміни'}</>
            )}
          </button>
          <Link href="/admin/products" className="btn-outline">
            Скасувати
          </Link>
        </div>
      </form>
    </div>
  )
}
