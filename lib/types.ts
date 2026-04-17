export interface Product {
  id: string
  name: string
  slug: string
  price: number
  old_price: number | null
  category: 'offroad' | 'commuter'
  brand: 'ausom' | 'kukirin'
  voltage: '36v' | '48v' | '52v' | '60v' | '72v'
  motor: 'single' | 'dual'
  range_km: number
  max_speed: number
  weight_kg: number
  max_load_kg: number
  battery_wh: number
  description: string
  features: string[]
  images: string[]
  in_stock: boolean
  is_new: boolean
  is_featured: boolean
  tag: string | null
  created_at: string
  /** Ручний SEO-заголовок. Якщо null/порожньо — використовується автогенерований. */
  meta_title?: string | null
  /** Ручний SEO-опис. Якщо null/порожньо — використовується автогенерований. */
  meta_description?: string | null
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  category: string
  published_at: string
  reading_time: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  name: string
  email: string
  phone: string
  address: string
  city: string
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  notes?: string
  created_at: string
}
