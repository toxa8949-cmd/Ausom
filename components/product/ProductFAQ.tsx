'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { getProductFAQs } from '@/lib/queries'
import { ProductFAQ } from '@/lib/types'

/**
 * Публічний accordion з FAQ на сторінці товару.
 *
 * Навмисно завантажує FAQ на клієнті (useEffect), щоб не блокувати
 * первинний рендер товару. SEO-критична частина (JSON-LD FAQPage)
 * рендериться окремо на сервері у app/product/[id]/page.tsx — Google
 * бачить її навіть якщо користувач нічого не відкрив.
 */
export default function ProductFAQ({ productId }: { productId: string }) {
  const [faqs, setFaqs] = useState<ProductFAQ[]>([])
  const [openIdx, setOpenIdx] = useState<number | null>(0) // перший відкритий за замовчуванням
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const list = await getProductFAQs(productId)
        if (!cancelled) setFaqs(list)
      } catch (err) {
        console.warn('[ProductFAQ] fetch failed', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [productId])

  // Поки вантажиться або просто немає FAQ — не показуємо секцію взагалі
  if (loading || faqs.length === 0) return null

  return (
    <div
      className="section-py"
      style={{
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '56px 0 72px',
      }}
    >
      <div className="w-container">
        <h2
          style={{
            fontSize: 'clamp(22px,3vw,36px)',
            fontWeight: 800,
            letterSpacing: '-.025em',
            color: 'var(--text)',
            marginBottom: 28,
          }}
        >
          Часті питання
        </h2>

        <div
          style={{
            maxWidth: 820,
            background: 'var(--bg)',
            border: '1.5px solid var(--border)',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i
            const isLast = i === faqs.length - 1

            return (
              <div
                key={faq.id}
                style={{
                  borderBottom: isLast ? 'none' : '1px solid var(--border)',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    padding: '20px 24px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text)',
                    fontSize: 16,
                    fontWeight: 600,
                    lineHeight: 1.4,
                  }}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={20}
                    style={{
                      flexShrink: 0,
                      transition: 'transform .2s',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                      color: 'var(--text-3)',
                    }}
                  />
                </button>

                {isOpen && (
                  <div
                    style={{
                      padding: '0 24px 22px',
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: 'var(--text-2)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
