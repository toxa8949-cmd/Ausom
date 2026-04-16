import { Product } from './types'
import { getAllProducts as getAllProductsDB, getProductBySlug as getProductBySlugDB } from './queries'

const CDN = 'https://pl.ausomstore.com/cdn/shop/files'

/**
 * Static fallback data. Used as a seed reference AND as a safety net when
 * Supabase is unreachable. Frontend components should prefer the async
 * `fetch*` helpers below — but keeping this array means a deploy with a
 * broken DB connection still renders *something* instead of an empty site.
 */
export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Ausom L1', slug: 'l1',
    price: 27050, old_price: 33800,
    category: 'commuter', voltage: '48v', motor: 'single',
    range_km: 50, max_speed: 45, weight_kg: 20, max_load_kg: 100, battery_wh: 468,
    description: 'Ausom L1 — ідеальний старт у світ електросамокатів. Легкий, надійний та доступний міський самокат для щоденних поїздок по місту.',
    features: ['Мотор 500W','Запас ходу 50 км','Швидкість до 45 км/год','Вага лише 20 кг','Складається за 3 секунди','Підходить для початківців'],
    images: [
      `${CDN}/l1-max-page-mobile.jpg?v=1765511227`,
      `${CDN}/k20_pro_listing_800_1000_m.jpg?v=1774004078`,
    ],
    in_stock: true, is_new: false, is_featured: true, tag: null, created_at: '2026-01-01',
  },
  {
    id: '2', name: 'Ausom L2 Dual Motor', slug: 'l2-dual',
    price: 32200, old_price: 40250,
    category: 'commuter', voltage: '48v', motor: 'dual',
    range_km: 70, max_speed: 55, weight_kg: 28, max_load_kg: 120, battery_wh: 768,
    description: 'Ausom L2 Dual Motor — потужний міський самокат з подвійним мотором.',
    features: ['Подвійний мотор 2×600W','Запас ходу 70 км','Швидкість до 55 км/год','Пневматичні шини','Передня вилочна підвіска','Складна конструкція'],
    images: [
      `${CDN}/800_1200-wuzi.jpg?v=1772768149`,
      `${CDN}/800x1000_0936ab86-a006-46f0-b540-fddd9d2028dc.jpg?v=1772504724`,
    ],
    in_stock: true, is_new: false, is_featured: true, tag: null, created_at: '2026-01-01',
  },
  {
    id: '3', name: 'Ausom L2 Max Dual Motor', slug: 'l2-max-dual',
    price: 40800, old_price: 51000,
    category: 'commuter', voltage: '48v', motor: 'dual',
    range_km: 85, max_speed: 55, weight_kg: 30, max_load_kg: 120, battery_wh: 960,
    description: 'Ausom L2 Max Dual Motor — найпотужніша модель серії L. Збільшений акумулятор та подвійний мотор для максимального запасу ходу та тяги.',
    features: ['Подвійний мотор 2×800W','Запас ходу 85 км','Швидкість до 55 км/год','Акумулятор 960 Wh','Пневматичні шини','Вилочна підвіска'],
    images: [
      `${CDN}/Gosoul_2_pro1800X1000_ad23b595-61fb-4c72-88cf-ec2be4688b74.jpg?v=1774003576`,
      `${CDN}/l2-max-dual-detail-page-mobile.jpg?v=1765511614`,
    ],
    in_stock: true, is_new: false, is_featured: true, tag: 'Хіт', created_at: '2026-01-01',
  },
  {
    id: '4', name: 'Ausom DT2 Pro', slug: 'dt2-pro',
    price: 44250, old_price: 55300,
    category: 'offroad', voltage: '52v', motor: 'dual',
    range_km: 70, max_speed: 65, weight_kg: 34, max_load_kg: 150, battery_wh: 1066,
    description: 'Ausom DT2 Pro — позашляховий самокат преміум класу. Розроблений для бездоріжжя та екстремальних умов.',
    features: ['Мотор 2×1000W','Позашляхова підвіска','Запас ходу 70 км','Швидкість до 65 км/год','Гідравлічні гальма Zoom','Навантаження до 150 кг'],
    images: [
      `${CDN}/DT2_Pro.jpg?v=1767606498`,
      `${CDN}/dt2-pro-detail-page-mobile.jpg?v=1765510548`,
    ],
    in_stock: true, is_new: false, is_featured: true, tag: 'Топ', created_at: '2026-01-01',
  },
]

// ─── Legacy sync accessors (kept for any non-migrated callers) ──────────
export function getProductBySlug(slug: string) {
  return PRODUCTS.find(p => p.slug === slug)
}
export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.is_featured)
}
export function getProductsByCategory(category: string) {
  if (category === 'all' || category === 'hits') return PRODUCTS
  if (category === 'new') return PRODUCTS.filter(p => p.is_new)
  return PRODUCTS.filter(p => p.category === category)
}

// ─── Supabase-first async fetchers with static fallback ─────────────────
// These are the ones new code should call. If the DB request fails
// (network, misconfigured env, RLS), the UI falls back to PRODUCTS above.

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const list = await getAllProductsDB()
    return list.length > 0 ? list : PRODUCTS
  } catch (err) {
    console.warn('[data] fetchAllProducts: DB failed, using static fallback', err)
    return PRODUCTS
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  try {
    const p = await getProductBySlugDB(slug)
    if (p) return p
    // slug exists in seed but not yet in DB? fall back
    return PRODUCTS.find(x => x.slug === slug) ?? null
  } catch (err) {
    console.warn('[data] fetchProductBySlug: DB failed, using static fallback', err)
    return PRODUCTS.find(x => x.slug === slug) ?? null
  }
}

export async function fetchProductsByCategory(category: string): Promise<Product[]> {
  const all = await fetchAllProducts()
  if (category === 'all' || category === 'hits') return all
  if (category === 'new')      return all.filter(p => p.is_new)
  if (category === 'offroad')  return all.filter(p => p.category === 'offroad')
  if (category === 'commuter') return all.filter(p => p.category === 'commuter')
  return all
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const all = await fetchAllProducts()
  return all.filter(p => p.is_featured)
}
