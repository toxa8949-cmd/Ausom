'use client'

import { useEffect, useState } from 'react'
import { Plus, X, ChevronUp, ChevronDown, Save, Loader2 } from 'lucide-react'
import {
  getProductFAQs,
  createProductFAQ,
  updateProductFAQ,
  deleteProductFAQ,
  reorderProductFAQs,
} from '@/lib/queries'
import { ProductFAQ } from '@/lib/types'

const B = '1.5px solid #EEEEEE'

const inp: React.CSSProperties = {
  width: '100%',
  padding: '11px 14px',
  background: '#F9F9F9',
  border: B,
  borderRadius: 8,
  fontSize: 14,
  color: '#111',
  outline: 'none',
  fontFamily: 'Inter,sans-serif',
  transition: 'border-color .15s',
}

const lbl: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  color: '#888',
  marginBottom: 8,
}

type Draft = {
  id: string // реальний UUID якщо існує, або 'new-<Date.now()>' якщо ще не збережено
  product_id: string
  question: string
  answer: string
  sort_order: number
  _dirty: boolean
  _new: boolean
}

/**
 * Редактор FAQ для сторінки товару в адмінці.
 *
 * Поведінка:
 * - При завантаженні тягне існуючі FAQ з БД
 * - Зміни (add/edit/delete/reorder) зберігаються в локальному state
 * - "Зберегти FAQ" — єдина кнопка, яка синхронізує все з БД
 * - До натискання "Зберегти" зміни НЕ потрапляють у базу
 *
 * Важливо: цей редактор працює ТІЛЬКИ з існуючими товарами
 * (productId має бути UUID з БД). Якщо товар ще не створено
 * (productId === 'new'), компонент показує підказку.
 */
export default function ProductFAQEditor({ productId }: { productId: string }) {
  const isNewProduct = productId === 'new'

  const [items, setItems] = useState<Draft[]>([])
  const [loading, setLoading] = useState(!isNewProduct)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [deletedIds, setDeletedIds] = useState<string[]>([])

  useEffect(() => {
    if (isNewProduct) return

    let cancelled = false
    ;(async () => {
      try {
        const list = await getProductFAQs(productId)
        if (cancelled) return
        setItems(
          list.map<Draft>(f => ({
            id: f.id,
            product_id: f.product_id,
            question: f.question,
            answer: f.answer,
            sort_order: f.sort_order,
            _dirty: false,
            _new: false,
          }))
        )
      } catch (err: any) {
        if (!cancelled) setError(err?.message || 'Не вдалося завантажити FAQ')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [productId, isNewProduct])

  const update = (idx: number, patch: Partial<Draft>) => {
    setItems(prev => {
      const next = [...prev]
      next[idx] = { ...next[idx], ...patch, _dirty: true }
      return next
    })
    setSuccess('')
  }

  const addNew = () => {
    setItems(prev => [
      ...prev,
      {
        id: `new-${Date.now()}`,
        product_id: productId,
        question: '',
        answer: '',
        sort_order: prev.length,
        _dirty: true,
        _new: true,
      },
    ])
    setSuccess('')
  }

  const removeItem = (idx: number) => {
    const item = items[idx]
    // Якщо це існуючий FAQ з БД — запамʼятаємо id, видалимо при збереженні
    if (!item._new) {
      setDeletedIds(prev => [...prev, item.id])
    }
    setItems(prev => prev.filter((_, i) => i !== idx))
    setSuccess('')
  }

  const move = (idx: number, dir: -1 | 1) => {
    const target = idx + dir
    if (target < 0 || target >= items.length) return
    setItems(prev => {
      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      // Оновимо sort_order згідно з новим порядком
      return next.map((it, i) => ({ ...it, sort_order: i, _dirty: true }))
    })
    setSuccess('')
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')

    // Валідація: порожні питання/відповіді не пускаємо
    const invalid = items.find(it => !it.question.trim() || !it.answer.trim())
    if (invalid) {
      setError('Заповни всі питання і відповіді, або видали порожні FAQ')
      return
    }

    setSaving(true)
    try {
      // 1. Видалити те, що користувач видалив
      for (const id of deletedIds) {
        await deleteProductFAQ(id)
      }

      // 2. Створити нові (_new=true)
      const newCreated: { tempId: string; real: ProductFAQ }[] = []
      for (const it of items) {
        if (it._new) {
          const real = await createProductFAQ({
            product_id: it.product_id,
            question: it.question.trim(),
            answer: it.answer.trim(),
            sort_order: it.sort_order,
          })
          newCreated.push({ tempId: it.id, real })
        }
      }

      // 3. Оновити існуючі змінені (_dirty=true && _new=false)
      for (const it of items) {
        if (!it._new && it._dirty) {
          await updateProductFAQ(it.id, {
            question: it.question.trim(),
            answer: it.answer.trim(),
            sort_order: it.sort_order,
          })
        }
      }

      // 4. Після збереження — перечитати свіжий список з БД
      // (це простіше ніж синкати локальний стан з newCreated)
      const fresh = await getProductFAQs(productId)
      setItems(
        fresh.map<Draft>(f => ({
          id: f.id,
          product_id: f.product_id,
          question: f.question,
          answer: f.answer,
          sort_order: f.sort_order,
          _dirty: false,
          _new: false,
        }))
      )
      setDeletedIds([])
      setSuccess('FAQ збережено ✓')
    } catch (err: any) {
      setError(err?.message || 'Помилка збереження FAQ')
    } finally {
      setSaving(false)
    }
  }

  // ─── UI ──────────────────────────────────────────────────────

  if (isNewProduct) {
    return (
      <div style={{
        background: '#fff', border: B, borderRadius: 12,
        overflow: 'hidden', marginBottom: 16,
      }}>
        <div style={{
          padding: '14px 20px', borderBottom: B,
          fontSize: 13, fontWeight: 700, color: '#111',
        }}>
          FAQ (часті питання)
        </div>
        <div style={{ padding: 20, fontSize: 13, color: '#888', lineHeight: 1.6 }}>
          Спочатку збережи товар — потім зможеш додати FAQ.
          Вони зʼявляться на сторінці товару та у Google як rich snippet.
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{
        background: '#fff', border: B, borderRadius: 12,
        overflow: 'hidden', marginBottom: 16,
      }}>
        <div style={{
          padding: '14px 20px', borderBottom: B,
          fontSize: 13, fontWeight: 700, color: '#111',
        }}>
          FAQ (часті питання)
        </div>
        <div style={{
          padding: 30, display: 'flex', alignItems: 'center',
          justifyContent: 'center', color: '#888',
        }}>
          <Loader2 size={18} style={{ animation: 'spin 1s linear infinite', marginRight: 8 }}/>
          Завантаження…
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: '#fff', border: B, borderRadius: 12,
      overflow: 'hidden', marginBottom: 16,
    }}>
      <div style={{
        padding: '14px 20px', borderBottom: B,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, flexWrap: 'wrap',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#111' }}>
          FAQ (часті питання) <span style={{ color: '#BBB', fontWeight: 500 }}>— {items.length}</span>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#111', color: '#fff',
            fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
            textTransform: 'uppercase',
            padding: '8px 14px', borderRadius: 6, border: 'none',
            cursor: saving ? 'wait' : 'pointer',
            opacity: saving ? 0.6 : 1,
          }}
        >
          <Save size={12}/>
          {saving ? 'Збереження…' : 'Зберегти FAQ'}
        </button>
      </div>

      <div style={{ padding: 20 }}>
        <p style={{ fontSize: 12, color: '#888', marginBottom: 16, lineHeight: 1.6 }}>
          FAQ відображаються на сторінці товару як accordion і додаються у Google як
          структурована розмітка FAQPage — можуть показатись прямо у результатах пошуку.
        </p>

        {error && (
          <div style={{
            background: '#FEF2F2', border: '1.5px solid #FECACA',
            color: '#DC2626', padding: '10px 14px', borderRadius: 8,
            fontSize: 13, marginBottom: 14,
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            background: '#F0FDF4', border: '1.5px solid #BBF7D0',
            color: '#16A34A', padding: '10px 14px', borderRadius: 8,
            fontSize: 13, marginBottom: 14,
          }}>
            {success}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((it, i) => (
            <div
              key={it.id}
              style={{
                background: '#F9F9F9', border: B, borderRadius: 10,
                padding: 14,
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', marginBottom: 10, gap: 8,
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#888', letterSpacing: '.08em' }}>
                  FAQ #{i + 1}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button
                    type="button"
                    onClick={() => move(i, -1)}
                    disabled={i === 0}
                    aria-label="Вгору"
                    style={{
                      width: 30, height: 30, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      background: '#fff', border: B, borderRadius: 6,
                      cursor: i === 0 ? 'not-allowed' : 'pointer',
                      opacity: i === 0 ? 0.4 : 1, color: '#444',
                    }}
                  >
                    <ChevronUp size={14}/>
                  </button>
                  <button
                    type="button"
                    onClick={() => move(i, 1)}
                    disabled={i === items.length - 1}
                    aria-label="Вниз"
                    style={{
                      width: 30, height: 30, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      background: '#fff', border: B, borderRadius: 6,
                      cursor: i === items.length - 1 ? 'not-allowed' : 'pointer',
                      opacity: i === items.length - 1 ? 0.4 : 1, color: '#444',
                    }}
                  >
                    <ChevronDown size={14}/>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    aria-label="Видалити"
                    style={{
                      width: 30, height: 30, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      background: '#FEF2F2', border: '1.5px solid #FECACA',
                      borderRadius: 6, cursor: 'pointer', color: '#EF4444',
                    }}
                  >
                    <X size={14}/>
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: 10 }}>
                <div style={lbl}>Питання</div>
                <input
                  value={it.question}
                  onChange={e => update(i, { question: e.target.value })}
                  placeholder="Яка гарантія на самокат?"
                  style={{ ...inp, background: '#fff' }}
                  onFocus={e => (e.target.style.borderColor = '#F5C200')}
                  onBlur={e => (e.target.style.borderColor = '#EEEEEE')}
                />
              </div>

              <div>
                <div style={lbl}>Відповідь</div>
                <textarea
                  value={it.answer}
                  onChange={e => update(i, { answer: e.target.value })}
                  rows={3}
                  placeholder="Так, надається офіційна гарантія 2 роки..."
                  style={{ ...inp, background: '#fff', resize: 'vertical' }}
                  onFocus={e => (e.target.style.borderColor = '#F5C200')}
                  onBlur={e => (e.target.style.borderColor = '#EEEEEE')}
                />
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addNew}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 12, fontWeight: 600, color: '#666',
              background: '#F9F9F9', border: B,
              padding: '10px 16px', borderRadius: 7,
              cursor: 'pointer', width: 'fit-content',
            }}
          >
            <Plus size={12}/> Додати FAQ
          </button>
        </div>
      </div>
    </div>
  )
}
