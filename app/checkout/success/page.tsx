'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, Package, Mail } from 'lucide-react'

interface CachedOrder {
  id: string
  total: number
  name: string
  email: string
  createdAt: string
}

function SuccessInner() {
  const params = useSearchParams()
  const idFromUrl = params.get('id')
  const [cached, setCached] = useState<CachedOrder | null>(null)
  const [ready,  setReady]  = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ausom_last_order')
      if (raw) {
        const parsed = JSON.parse(raw) as CachedOrder
        // Only show cached copy if it matches the id in the URL —
        // avoids showing someone else's order if two tabs are open.
        if (!idFromUrl || parsed.id === idFromUrl) setCached(parsed)
      }
    } catch { /* ignore */ }
    setReady(true)
  }, [idFromUrl])

  // Show a short order number to the user. Full UUID is ugly but kept in URL
  // and localStorage for support/lookup.
  const shortId = (idFromUrl || cached?.id || '').replace(/-/g, '').slice(0, 8).toUpperCase()

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', padding:'clamp(40px,8vw,80px) 0' }}>
      <div className="w-container" style={{ maxWidth:640 }}>
        <div style={{
          background:'var(--bg-soft)', border:'1.5px solid var(--border)', borderRadius:16,
          padding:'clamp(32px,5vw,56px) clamp(24px,4vw,40px)', textAlign:'center',
        }}>
          <div style={{
            width:72, height:72, borderRadius:'50%',
            background:'rgba(34,197,94,.12)', color:'#22C55E',
            display:'flex', alignItems:'center', justifyContent:'center',
            margin:'0 auto 24px',
          }}>
            <CheckCircle2 size={40} strokeWidth={2}/>
          </div>

          <h1 style={{ fontSize:'clamp(24px,4vw,32px)', fontWeight:800, letterSpacing:'-.025em', color:'var(--text)', marginBottom:12 }}>
            Замовлення оформлено!
          </h1>

          {ready && shortId && (
            <p style={{ fontSize:13, color:'var(--text-3)', marginBottom:6 }}>Номер замовлення</p>
          )}
          {ready && shortId && (
            <p style={{ fontSize:'clamp(18px,3vw,22px)', fontWeight:800, color:'var(--yellow-dark)', letterSpacing:'.06em', marginBottom:24, fontFamily:'ui-monospace, SFMono-Regular, monospace' }}>
              #AU-{shortId}
            </p>
          )}

          <p style={{ fontSize:15, color:'var(--text-2)', lineHeight:1.6, marginBottom:8 }}>
            Дякуємо за замовлення!
          </p>
          <p style={{ fontSize:14, color:'var(--text-3)', lineHeight:1.6, marginBottom:32, maxWidth:400, margin:'0 auto 32px' }}>
            Наш менеджер зв&apos;яжеться з вами найближчим часом{cached?.email && <> на <strong style={{ color:'var(--text-2)' }}>{cached.email}</strong></>} для підтвердження деталей.
          </p>

          {/* Info tiles */}
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))',
            gap:12, marginBottom:32, textAlign:'left',
          }}>
            <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:10, padding:'16px' }}>
              <Mail size={18} style={{ color:'var(--yellow-dark)', marginBottom:8 }}/>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text)', marginBottom:4 }}>Email з деталями</div>
              <div style={{ fontSize:11, color:'var(--text-3)' }}>Надішлемо після підтвердження</div>
            </div>
            <div style={{ background:'var(--bg)', border:'1px solid var(--border)', borderRadius:10, padding:'16px' }}>
              <Package size={18} style={{ color:'var(--yellow-dark)', marginBottom:8 }}/>
              <div style={{ fontSize:12, fontWeight:600, color:'var(--text)', marginBottom:4 }}>Відправка</div>
              <div style={{ fontSize:11, color:'var(--text-3)' }}>Протягом 1-2 робочих днів</div>
            </div>
          </div>

          {cached?.total && (
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              fontSize:14, color:'var(--text-2)',
              background:'var(--bg)', border:'1px solid var(--border)',
              borderRadius:8, padding:'8px 14px', marginBottom:24,
            }}>
              Сума замовлення: <strong style={{ fontSize:16, color:'var(--text)' }}>₴{cached.total.toLocaleString('uk-UA')}</strong>
            </div>
          )}

          <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/" className="btn btn-black">На головну</Link>
            <Link href="/catalog" className="btn btn-white">До каталогу</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessInner/>
    </Suspense>
  )
}
