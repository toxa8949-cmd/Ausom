export interface Product {
  id: string
  name: string
  slug: string
  price: number
  old_price: number | null
  category: 'offroad' | 'commuter'
  /** Brand — Ausom is our own, Kukirin is a partner-resold line. */
  brand: 'ausom' | 'kukirin'
  /** Voltage — expanded to include 36V (small commuters like Kukirin S1 Max)
      and 72V (flagships like Kukirin G4 Max). The DB CHECK constraint
      matches this union via seed-kukirin.sql migration. */
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
