import { supabase } from './supabase'
import { Product, BlogPost, Order } from './types'

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
export interface Banner {
  id: string
  title: string
  subtitle: string
  link: string
  image: string
  position: number
  active: boolean
  created_at: string
}

export async function getAllBanners(): Promise<Banner[]> {
  const { data, error } = await supabase
    .from('banners').select('*').order('position', { ascending: true })
  if (error) throw error
  return data as Banner[]
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
