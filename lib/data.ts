import { Product, BlogPost } from './types'
import {
  getAllProducts as getAllProductsDB,
  getProductBySlug as getProductBySlugDB,
  getAllPosts as getAllPostsDB,
  getPostBySlug as getPostBySlugDB,
} from './queries'

const CDN = 'https://pl.ausomstore.com/cdn/shop/files'

// ═══════════════════════════════════════════════════════════
// PRODUCTS
// ═══════════════════════════════════════════════════════════

/**
 * Static fallback product data. Used as a seed reference AND as a safety net
 * when Supabase is unreachable. Frontend components should prefer the async
 * `fetch*` helpers below. All fallback products are Ausom-branded.
 */
export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Ausom L1', slug: 'l1',
    price: 27050, old_price: 33800,
    brand: 'ausom',
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
    brand: 'ausom',
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
    brand: 'ausom',
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
    brand: 'ausom',
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

// ─── Legacy sync accessors ────────────────────────────────
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

// ─── Supabase-first async product fetchers ────────────────
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

// ═══════════════════════════════════════════════════════════
// BLOG POSTS
// ═══════════════════════════════════════════════════════════

/**
 * Fallback blog posts — shown only if the blog_posts table is empty or
 * unreachable. Kept in sync with supabase/seed-blog-posts.sql so that
 * deploying Hero without running the seed still renders meaningful content.
 */
const FALLBACK_POSTS: BlogPost[] = [
  {
    id: 'fb-1',
    title: 'Найкращі електросамокати для важких дорослих у 2026',
    slug: 'best-scooters-heavy-adults-2026',
    excerpt: 'Шукаєш самокат з великим навантаженням? Гід по топ-моделях з подвійним мотором та посиленою рамою.',
    content: 'Шукаєш самокат з великим навантаженням? Ця стаття для тебе. Ми зібрали найкращі моделі з подвійним мотором та посиленою рамою, які витримують навантаження до 150 кг.\n\nAusom DT2 Pro — абсолютний лідер у цій категорії. Завдяки подвійному мотору 2×800W та позашляховій підвісці, він справляється з будь-якими умовами. Максимальне навантаження — 150 кг, запас ходу — 70 км.\n\nAusom L2 Max Dual Motor — відмінний вибір для міських поїздок. Подвійний мотор 2×800W, 85 км запасу ходу та навантаження до 120 кг роблять його ідеальним для щоденних поїздок.\n\nПри виборі самоката для великого навантаження зверни увагу на: максимальне навантаження (має бути мінімум 120 кг), тип рами (посилена сталева або алюмінієва), наявність подвійного мотора для кращого розгону та тягу.\n\nПідсумок: для максимального комфорту обирай Ausom DT2 Pro — він поєднує потужність, надійність та позашляховий характер.',
    cover_image: `${CDN}/DT2_Pro.jpg?v=1767606498`,
    category: 'Огляди', published_at: '2026-03-30', reading_time: 6,
  },
  {
    id: 'fb-2',
    title: '10 ключових характеристик при виборі електросамоката',
    slug: '10-features-buying-scooter',
    excerpt: 'Від потужності мотора до системи безпеки — все що потрібно знати перед покупкою.',
    content: 'Вибір електросамоката може бути складним завданням. Ринок пропонує десятки моделей з різними характеристиками. Ми виділили 10 ключових параметрів, на які варто звернути увагу.\n\n1. Потужність мотора — визначає динаміку розгону та здатність долати підйоми. Для міста достатньо 500-800W, для бездоріжжя — 1000W+.\n\n2. Запас ходу — реальний діапазон зазвичай на 20-30% менший за заявлений. Обирай самокат із запасом.\n\n3. Акумулятор (Wh) — чим більше Wh, тим далі поїдеш. Для міста достатньо 400-600 Wh, для дальніх поїздок — 800+ Wh.\n\n4. Гальма — гідравлічні гальма Zoom забезпечують найкращу зупинку. Уникай моделей лише з електронним гальмуванням.\n\n5. Підвіска — подвійна підвіска критична для нерівних доріг та бездоріжжя.\n\n6. Максимальне навантаження — враховуй свою вагу плюс речі.\n\n7. Вага самоката — важливо якщо часто переносиш у транспорті.\n\n8. IP-рейтинг водостійкості — мінімум IPX4 для дощових умов.\n\n9. Тип шин — пневматичні значно комфортніші за суцільні.\n\n10. Сервісна підтримка — обирай офіційних дилерів з гарантією та сервісним центром.',
    cover_image: `${CDN}/l2-max-dual-detail-page-mobile.jpg?v=1765511614`,
    category: 'Гід покупця', published_at: '2026-03-30', reading_time: 8,
  },
  {
    id: 'fb-3',
    title: 'Найкращий електросамокат для дорослих 2026: повний гід',
    slug: 'best-adult-scooter-2026-guide',
    excerpt: 'Порівнюємо потужність, запас ходу та портативність. Чому Ausom — вибір №1.',
    content: 'У 2026 році ринок електросамокатів значно виріс. Ми порівняли всі моделі Ausom, щоб допомогти тобі зробити правильний вибір.\n\nAusom L1 — найдоступніша модель. Ідеальна для початківців та коротких міських поїздок. Вага 20 кг, запас ходу 50 км, швидкість до 45 км/год. Ціна: ₴27 050.\n\nAusom L2 Dual Motor — середній клас. Подвійний мотор дає кращу тягу та розгін. Запас ходу 70 км, швидкість до 55 км/год. Ціна: ₴32 200.\n\nAusom L2 Max Dual Motor — максимальний запас ходу в класі (85 км). Ідеальний для тих, хто часто їде далеко від розетки. Ціна: ₴40 800.\n\nAusom DT2 Pro — флагман для позашляхових пригод. 52V, 70 км, 65 км/год, гідравлічні гальма Zoom. Ціна: ₴44 250.\n\nНаш вибір: якщо потрібна максимальна універсальність — Ausom DT2 Pro. Для міста — L2 Dual Motor. Для бюджету — L1.',
    cover_image: `${CDN}/800_1200-wuzi.jpg?v=1772768149`,
    category: 'Порівняння', published_at: '2026-03-30', reading_time: 10,
  },
  {
    id: 'fb-4',
    title: 'DT2 Pro: детальний огляд позашляхового самоката',
    slug: 'dt2-pro-review',
    excerpt: 'Тестуємо флагман позашляхової лінійки — реальний запас ходу та підвіска.',
    content: 'Ausom DT2 Pro — позашляховий самокат преміум класу. Ми провели тижень тестувань у різних умовах: місто, бездоріжжя, підйоми, дощ.\n\nДизайн та збірка: масивна рама, широкі позашляхові шини 11", подвійна підвіска. Самокат виглядає потужно і так само відчувається під ногами.\n\nПродуктивність: двигун 2×800W дає відчутний розгін. 0-30 км/год приблизно за 4 секунди. Максимальна швидкість 65 км/год у тестових умовах.\n\nЗапас ходу: у змішаному режимі (місто + трохи бездоріжжя) отримали 58-62 км. Заявлені 70 км реальні при їзді по рівному асфальту.\n\nГальма: гідравлічні Zoom — найкраща система на ринку. Зупинка чітка та передбачувана навіть на швидкості 60+ км/год.\n\nПідвіска: подвійна подвіска чудово справляється з бруківкою та невеликими перешкодами. На справжньому бездоріжжі комфортно на швидкості до 30 км/год.\n\nВисновок: Ausom DT2 Pro — найкращий варіант якщо потрібен універсальний самокат для міста та бездоріжжя. Рекомендуємо.',
    cover_image: `${CDN}/DT2_Pro.jpg?v=1767606498`,
    category: 'Огляди', published_at: '2026-03-15', reading_time: 12,
  },
  {
    id: 'fb-5',
    title: 'Як обрати міський самокат для щоденних поїздок',
    slug: 'city-commuter-guide',
    excerpt: 'Всі нюанси вибору міського самоката для роботи та навчання.',
    content: 'Міський самокат — це інструмент для щоденних поїздок. Тут важлива не максимальна швидкість, а комфорт, надійність та практичність.\n\nДля міста рекомендуємо зосередитися на: запасі ходу (мінімум 40-50 км), вазі (до 25 кг), наявності підвіски для комфорту на бруківці, LED освітленні.\n\nAusom L1 — ідеальний старт. Легкий (20 кг), компактний, 50 км запасу ходу. Складається за 3 секунди — зручно в транспорті.\n\nAusom L2 Dual Motor — якщо потрібно більше потужності та запасу ходу. 70 км та подвійний мотор для впевненого розгону в потоці.\n\nПрактичні поради: заряджай щовечора, стеж за тиском шин, зберігай у приміщенні взимку. Регулярне обслуговування продовжить термін служби вдвічі.',
    cover_image: `${CDN}/l1-max-page-mobile.jpg?v=1765511227`,
    category: 'Поради', published_at: '2026-03-10', reading_time: 7,
  },
  {
    id: 'fb-6',
    title: 'Догляд за електросамокатом: 8 важливих порад',
    slug: 'e-scooter-maintenance-tips',
    excerpt: 'Як продовжити термін служби акумулятора та зберегти самокат у відмінному стані.',
    content: 'Правильний догляд продовжує термін служби самоката та зберігає гарантію. Ось 8 порад від нашої команди.\n\n1. Заряджай регулярно — не доводь акумулятор до 0%. Оптимальний діапазон зарядки: 20-90%.\n\n2. Зберігай у приміщенні — низькі температури шкодять акумулятору. Мінімальна температура зберігання: +5°C.\n\n3. Перевіряй тиск шин щотижня — правильний тиск покращує запас ходу та комфорт.\n\n4. Чисти після кожної поїздки по бруду — особливо гальмівні диски та підшипники.\n\n5. Перевіряй затягнення болтів раз на місяць — вібрація може послаблювати з\'єднання.\n\n6. Масти ланцюг (якщо є) раз на 200 км.\n\n7. Не мий водою під тиском — навіть IPX5 самокати не призначені для мийки Karcher.\n\n8. Звертайся до сервісу при перших ознаках проблем — дрібна поломка вчасно виявлена обходиться дешевше.',
    cover_image: `${CDN}/l2-max-dual-detail-page-mobile.jpg?v=1765511614`,
    category: 'Поради', published_at: '2026-03-05', reading_time: 5,
  },
]

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const list = await getAllPostsDB()
    return list.length > 0 ? list : FALLBACK_POSTS
  } catch (err) {
    console.warn('[data] fetchAllPosts: DB failed, using static fallback', err)
    return FALLBACK_POSTS
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const p = await getPostBySlugDB(slug)
    if (p) return p
    return FALLBACK_POSTS.find(x => x.slug === slug) ?? null
  } catch (err) {
    console.warn('[data] fetchPostBySlug: DB failed, using static fallback', err)
    return FALLBACK_POSTS.find(x => x.slug === slug) ?? null
  }
}
