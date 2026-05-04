import { ImageResponse } from 'next/og'
import { fetchProductBySlug } from '@/lib/data'

// Generates a 1200x630 social-card preview for each product page.
// Next.js automatically wires this file to <meta property="og:image">,
// <meta property="og:image:width">, <meta property="og:image:height">,
// and the Twitter equivalent — overriding any images we set in
// generateMetadata for the product route. This guarantees the dimensions
// we declare match the file Google/Facebook/Telegram fetch.

export const runtime = 'nodejs'
export const alt = 'Ausom UA'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const BRAND_UA: Record<string, string> = { ausom: 'Ausom', kukirin: 'Kukirin' }
const CATEGORY_UA: Record<string, string> = { offroad: 'позашляховий', commuter: 'міський' }

function fmtPrice(n: number): string {
  try { return n.toLocaleString('uk-UA') + ' ₴' } catch { return n + ' ₴' }
}

export default async function Image({ params }: { params: { id: string } }) {
  const product = await fetchProductBySlug(params.id).catch(() => null)
  const photo = product?.images?.[0]
  const brand = product ? (BRAND_UA[product.brand] ?? 'Ausom') : 'Ausom'
  const category = product ? (CATEGORY_UA[product.category] ?? '') : ''
  const title = product?.name ?? 'Ausom Ukraine'
  const price = product?.price ? fmtPrice(product.price) : ''
  const motor = product?.motor === 'dual' ? 'Dual Motor' : ''
  const range = product?.range_km ? `${product.range_km} км` : ''
  const speed = product?.max_speed ? `${product.max_speed} км/год` : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #0a0f1c 0%, #1a2238 60%, #0a0f1c 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
          padding: 64,
          position: 'relative',
        }}
      >
        {/* Subtle accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: '#F5C200' }} />

        {/* Left column: text */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: 1, paddingRight: 32 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#F5C200', fontWeight: 700, marginBottom: 18, textTransform: 'uppercase' }}>
            {brand}{category ? ' · ' + category : ''}
          </div>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, marginBottom: 22, letterSpacing: -1 }}>
            {title}
          </div>
          {(motor || range || speed) && (
            <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
              {motor && <div style={{ background: 'rgba(245,194,0,0.15)', border: '1px solid rgba(245,194,0,0.4)', color: '#F5C200', padding: '8px 16px', borderRadius: 8, fontSize: 22, fontWeight: 600 }}>{motor}</div>}
              {range && <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: 8, fontSize: 22, fontWeight: 600 }}>Запас {range}</div>}
              {speed && <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: 8, fontSize: 22, fontWeight: 600 }}>{speed}</div>}
            </div>
          )}
          {price && (
            <div style={{ fontSize: 56, fontWeight: 800, color: '#1DD05D' }}>{price}</div>
          )}
          <div style={{ marginTop: 'auto', fontSize: 22, color: 'rgba(255,255,255,0.55)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 800, color: '#fff' }}>ausom.in.ua</span>
            <span>· Офіційний дистрибʼютор в Україні</span>
          </div>
        </div>

        {/* Right column: product photo */}
        {photo && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 460, height: '100%' }}>
            <div style={{ width: 460, height: 460, background: '#fff', borderRadius: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt={title} width={420} height={420} style={{ objectFit: 'contain', maxWidth: 420, maxHeight: 420 }} />
            </div>
          </div>
        )}
      </div>
    ),
    { ...size }
  )
}
