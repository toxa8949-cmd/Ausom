import { Product } from './types'

const CDN = 'https://pl.ausomstore.com/cdn/shop/files'

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ausom L1',
    slug: 'l1',
    price: 27050,
    old_price: 33800,
    category: 'commuter',
    voltage: '48v',
    motor: 'single',
    range_km: 50,
    max_speed: 45,
    weight_kg: 20,
    max_load_kg: 100,
    battery_wh: 468,
    description: 'Ausom L1 — ідеальний старт у світ електросамокатів. Легкий, надійний та доступний міський самокат для щоденних поїздок по місту.',
    features: ['Мотор 500W', 'Запас ходу 50 км', 'Швидкість до 45 км/год', 'Вага лише 20 кг', 'Складається за 3 секунди', 'Підходить для початківців'],
    images: [
      // [0] = product on white/transparent (card default)
      `${CDN}/l1-max-page-mobile.jpg?v=1765511227`,
      // [1] = lifestyle/action (hover)
      `${CDN}/l1-max-page-mobile.jpg?v=1765511227`,
    ],
    in_stock: true,
    is_new: false,
    is_featured: true,
    tag: null,
    created_at: '2026-01-01',
  },
  {
    id: '2',
    name: 'Ausom L2 Dual Motor',
    slug: 'l2-dual',
    price: 32200,
    old_price: 40250,
    category: 'commuter',
    voltage: '48v',
    motor: 'dual',
    range_km: 70,
    max_speed: 55,
    weight_kg: 28,
    max_load_kg: 120,
    battery_wh: 768,
    description: 'Ausom L2 Dual Motor — потужний міський самокат з подвійним мотором. Чудовий баланс між міськими їздами та підвищеною продуктивністю.',
    features: ['Подвійний мотор 2×600W', 'Запас ходу 70 км', 'Швидкість до 55 км/год', 'Пневматичні шини', 'Передня вилочна підвіска', 'Складна конструкція'],
    images: [
      `${CDN}/800x1000_0936ab86-a006-46f0-b540-fddd9d2028dc.jpg?v=1772504724`,
      `${CDN}/800_1200-wuzi.jpg?v=1772768149`,
    ],
    in_stock: true,
    is_new: false,
    is_featured: true,
    tag: null,
    created_at: '2026-01-01',
  },
  {
    id: '3',
    name: 'Ausom L2 Max Dual Motor',
    slug: 'l2-max-dual',
    price: 40800,
    old_price: 51000,
    category: 'commuter',
    voltage: '48v',
    motor: 'dual',
    range_km: 85,
    max_speed: 55,
    weight_kg: 30,
    max_load_kg: 120,
    battery_wh: 960,
    description: 'Ausom L2 Max Dual Motor — найпотужніша модель серії L. Збільшений акумулятор та подвійний мотор для максимального запасу ходу та тяги.',
    features: ['Подвійний мотор 2×800W', 'Запас ходу 85 км', 'Швидкість до 55 км/год', 'Акумулятор 960 Wh', 'Пневматичні шини', 'Вилочна підвіска'],
    images: [
      `${CDN}/l2-max-dual-detail-page-mobile.jpg?v=1765511614`,
      `${CDN}/l2-max-dual-detail-page-mobile.jpg?v=1765511614`,
    ],
    in_stock: true,
    is_new: false,
    is_featured: true,
    tag: 'Хіт',
    created_at: '2026-01-01',
  },
  {
    id: '4',
    name: 'Ausom DT2 Pro',
    slug: 'dt2-pro',
    price: 44250,
    old_price: 55300,
    category: 'offroad',
    voltage: '52v',
    motor: 'dual',
    range_km: 70,
    max_speed: 65,
    weight_kg: 34,
    max_load_kg: 150,
    battery_wh: 1066,
    description: 'Ausom DT2 Pro — позашляховий самокат преміум класу. Розроблений для бездоріжжя та екстремальних умов з власною архітектурою підвіски Ausom.',
    features: ['Мотор 2×1000W', 'Позашляхова підвіска', 'Запас ходу 70 км', 'Швидкість до 65 км/год', 'Гідравлічні гальма Zoom', 'Навантаження до 150 кг'],
    images: [
      // product shot (white bg)
      `${CDN}/dt2-pro-detail-page-mobile.jpg?v=1765510548`,
      // lifestyle/action shot (hover)
      `${CDN}/DT2_Pro.jpg?v=1767606498`,
    ],
    in_stock: true,
    is_new: false,
    is_featured: true,
    tag: 'Топ',
    created_at: '2026-01-01',
  },
]

// Hero banner images from official site
export const BANNERS = {
  dt2pro_action:  `${CDN}/DT2_Pro.jpg?v=1767606498`,
  l2max_mobile:   `${CDN}/l2-max-dual-detail-page-mobile.jpg?v=1765511614`,
  compare_banner: `${CDN}/Ausom_K20_Pro_Dual_banner.jpg?v=1774515143`,
  city_rider:     `https://ausomstore.com/cdn/shop/files/compare-page-banner.jpg`,
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug)
}
export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter(p => p.is_featured)
}
export function getProductsByCategory(category: string): Product[] {
  if (category === 'all' || category === 'hits') return PRODUCTS
  if (category === 'new') return PRODUCTS.filter(p => p.is_new)
  if (category === 'offroad') return PRODUCTS.filter(p => p.category === 'offroad')
  if (category === 'commuter') return PRODUCTS.filter(p => p.category === 'commuter')
  return PRODUCTS
}
