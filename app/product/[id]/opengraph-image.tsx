import { ImageResponse } from 'next/og'
import { fetchProductBySlug } from '@/lib/data'

// Generates a 1200x630 social-card preview for each product page.
// Next.js automatically wires this file to <meta property="og:image">,
// <meta property="og:image:width">, <meta property="og:image:height">,
// and the Twitter equivalent. Because the image is produced at the
// declared size, it eliminates the previous mismatch between
// og:image:width=1200 / og:image:height=630 and the actual product
// photo dimensions, which is what was preventing Google and social
// platforms from rendering a thumbnail.
//
// We intentionally avoid embedding the remote product photo via <img>
// inside ImageResponse: next/og has to fetch and decode the URL inside
// a serverless function, which often hits 4–5s timeouts on Vercel and
// returns a 500. A clean text-based card with the brand badge, model
// name, key specs and price renders reliably and looks consistent.

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
  const brand = product ? (BRAND_UA[product.brand] ?? 'Ausom') : 'Ausom'
  const category = product ? (CATEGORY_UA[product.category] ?? '') : ''
  const title = product?.name ?? 'Ausom Ukraine'
  const price = product?.price ? fmtPrice(product.price) : ''
  const motor = product?.motor === 'dual' ? 'Dual Motor' : ''
  const range = product?.range_km ? `Запас ${product.range_km} км` : ''
  const speed = product?.max_speed ? `${product.max_speed} км/год` : ''
  const tagline = 'Офіційний дистрибʼютор Ausom та Kukirin в Україні'

  const chips = [motor, range, speed].filter(Boolean)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a0f1c 0%, #1a2238 50%, #0a0f1c 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
          padding: '64px 72px',
          position: 'relative',
        }}
      >
        {/* Top yellow accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: '#F5C200' }} />

        {/* Brand badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
          <div style={{ background: '#F5C200', color: '#0a0f1c', padding: '10px 20px', borderRadius: 8, fontSize: 22, fontWeight: 800, letterSpacing: 2 }}>
            {brand.toUpperCase()}
          </div>
          {category && (
            <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.6)', letterSpacing: 4, textTransform: 'uppercase' }}>
              {category}
            </div>
          )}
        </div>

        {/* Product name */}
        <div style={{ fontSize: 96, fontWeight: 900, lineHeight: 1.0, letterSpacing: -2, marginBottom: 36, maxWidth: 1050 }}>
          {title}
        </div>

        {/* Spec chips */}
        {chips.length > 0 && (
          <div style={{ display: 'flex', gap: 14, marginBottom: 36, flexWrap: 'wrap' }}>
            {chips.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.18)', padding: '12px 22px', borderRadius: 10, fontSize: 28, fontWeight: 600 }}>
                {c}
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        {price && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 'auto' }}>
            <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 3 }}>Ціна</div>
            <div style={{ fontSize: 80, fontWeight: 900, color: '#1DD05D' }}>{price}</div>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 22 }}>
          <div style={{ fontSize: 30, fontWeight: 800 }}>ausom.in.ua</div>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.55)' }}>{tagline}</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
