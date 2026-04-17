import { supabase } from './supabase'
import { Product, BlogPost, Order, ProductFAQ } from './types'

// ─── PRODUCTS ────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Product[]
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products').select('*').eq('slug', slug).single()
  if (error) return null
  return data as Product
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  let query = supabase.from('products').select('*')
  if (category === 'new') query = query.eq('is_new', true)
  else if (category === 'offroad') query = query.eq('category', 'offroad')
  else if (category === 'commuter') query = query.eq('category', 'commuter')
  const { data, error } = await query.order('created_at', { ascending: false }).limit(8)
  if (error) throw error
  return data as Product[]
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products').select('*').eq('is_featured', true).limit(8)
  if (error) throw error
  return data as Product[]
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products').insert(product).select().single()
  if (error) throw error
  return data as Product
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase
    .from('products').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Product
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

// ─── PRODUCT FAQs ────────────────────────────────────────

/** Повертає FAQ для товару в правильному порядку (за sort_order). */
export async function getProductFAQs(productId: string): Promise<ProductFAQ[]> {
  const { data, error } = await supabase
    .from('product_faqs')
    .select('*')
    .eq('product_id', productId)
    .order('sort_order', { ascending: true })
  if (error) throw error
  return (data ?? []) as ProductFAQ[]
}

export async function createProductFAQ(
  faq: Omit<ProductFAQ, 'id' | 'created_at'>
): Promise<ProductFAQ> {
  const { data, error } = await supabase
    .from('product_faqs').insert(faq).select().single()
  if (error) throw error
  return data as ProductFAQ
}

export async function updateProductFAQ(
  id: string,
  updates: Partial<ProductFAQ>
): Promise<ProductFAQ> {
  const { data, error } = await supabase
    .from('product_faqs').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as ProductFAQ
}

export async function deleteProductFAQ(id: string): Promise<void> {
  const { error } = await supabase.from('product_faqs').delete().eq('id', id)
  if (error) throw error
}

/** Масове оновлення sort_order — використовується під час reorder у адмінці. */
export async function reorderProductFAQs(
  items: { id: string; sort_order: number }[]
): Promise<void> {
  // Робимо послідовні update — на 6-10 FAQ це швидко, немає сенсу в bulk
  for (const { id, sort_order } of items) {
    const { error } = await supabase
      .from('product_faqs').update({ sort_order }).eq('id', id)
    if (error) throw error
  }
}

// ─── BLOG POSTS ──────────────────────────────────────────

export async function getAllPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts').select('*').order('published_at', { ascending: false })
  if (error) throw error
  return data as BlogPost[]
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts').select('*').eq('slug', slug).single()
  if (error) return null
  return data as BlogPost
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('blog_posts').select('*').eq('id', id).single()
  if (error) return null
  return data as BlogPost
}

export async function createPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts').insert(post).select().single()
  if (error) throw error
  return data as BlogPost
}

export async function updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
  const { data, error } = await supabase
    .from('blog_posts').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as BlogPost
}

export async function deletePost(id: string): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id)
  if (error) throw error
}

// ─── BANNERS ─────────────────────────────────────────────
// Extended to match the Hero slider contract:
// - title/subtitle: big headline + descriptive line on the banner
// - eyebrow: small yellow label above the title ("Флагман 2026")
// - image + banner_position: the full-bleed background photo + object-position
// - link + cta_label: where the primary CTA goes and what it says
// - product_slug: OPTIONAL — when set, Hero renders a strip below the
//   banner with this product's thumbnail, specs and price (fetched live)
// - position: display order (0-based)
// - active: hide a banner without deleting it
export interface Banner {
  id: string
  title: string
  subtitle: string
  link: string
  image: string
  eyebrow: string              // NEW
  product_slug: string | null  // NEW — slug FK by convention, not enforced
  banner_position: string      // NEW — e.g. "center 30%"
  cta_label: string            // NEW
  position: number
  active: boolean
  created_at: string
}

export async function getAllBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from('banners').select('*').order('position', { ascending: true })
  if (error) throw error
  return (data ?? []) as Banner[]
}

/** Active banners only — for the public Hero on the homepage. */
export async function getActiveBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from('banners').select('*').eq('active', true).order('position', { ascending: true })
  if (error) throw error
  return (data ?? []) as Banner[]
}

export async function createBanner(banner: Omit<Banner, 'id' | 'created_at'>): Promise<Banner> {
  const { data, error } = await supabase
    .from('banners').insert(banner).select().single()
  if (error) throw error
  return data as Banner
}

export async function updateBanner(id: string, updates: Partial<Banner>): Promise<Banner> {
  const { data, error } = await supabase
    .from('banners').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Banner
}

export async function deleteBanner(id: string): Promise<void> {
  const { error } = await supabase.from('banners').delete().eq('id', id)
  if (error) throw error
}

// ─── ORDERS ──────────────────────────────────────────────

export async function createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
  const { data, error } = await supabase
    .from('orders').insert(order).select().single()
  if (error) throw error
  return data as Order
}

export async function getAllOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Order[]
}

export async function updateOrderStatus(id: string, status: Order['status']): Promise<void> {
  const { error } = await supabase.from('orders').update({ status }).eq('id', id)
  if (error) throw error
}

// ─── IMAGE UPLOAD ────────────────────────────────────────

export async function uploadImage(file: File, folder: string = 'images'): Promise<string> {
  const ext = file.name.split('.').pop()
  const name = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`
  const { error } = await supabase.storage
    .from('media')
    .upload(name, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from('media').getPublicUrl(name)
  return data.publicUrl
}

export async function deleteImage(url: string): Promise<void> {
  const path = url.split('/media/')[1]
  if (!path) return
  await supabase.storage.from('media').remove([path])
}
