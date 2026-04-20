-- ═══════════════════════════════════════════════════════════════
-- AUSOM UKRAINE — Canonical Schema
-- ═══════════════════════════════════════════════════════════════
-- Об'єднує schema.sql + migration-banners.sql + migration-brand.sql
-- + нові поля (meta_title, meta_description, product_faqs).
-- Безпечно для повторного виконання (IF NOT EXISTS / ADD COLUMN IF NOT EXISTS).
--
-- ПІСЛЯ цієї міграції виконай:
--   supabase/migration-admin-rls.sql
-- ═══════════════════════════════════════════════════════════════

-- ─── PRODUCTS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  price       INTEGER NOT NULL,
  old_price   INTEGER,
  category    TEXT NOT NULL CHECK (category IN ('offroad', 'commuter')),
  brand       TEXT NOT NULL DEFAULT 'ausom' CHECK (brand IN ('ausom', 'kukirin')),
  voltage     TEXT NOT NULL,
  motor       TEXT NOT NULL CHECK (motor IN ('single', 'dual')),
  range_km    INTEGER NOT NULL,
  max_speed   INTEGER NOT NULL,
  weight_kg   NUMERIC(5,1) NOT NULL,
  max_load_kg INTEGER NOT NULL,
  battery_wh  INTEGER NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  features    TEXT[] NOT NULL DEFAULT '{}',
  images      TEXT[] NOT NULL DEFAULT '{}',
  in_stock    BOOLEAN NOT NULL DEFAULT true,
  is_new      BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  tag         TEXT,
  meta_title       TEXT,
  meta_description TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Для старих БД — додаємо колонки, які з'явилися пізніше
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand TEXT NOT NULL DEFAULT 'ausom';
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_title TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS meta_description TEXT;

-- ВАЖЛИВО: розширюємо CHECK на voltage з ('48v','52v','60v')
-- до повного списку, який приймає TS (`types.ts`).
-- Інакше адмінка впаде constraint violation при заведенні 36V/72V моделі.
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_voltage_check;
ALTER TABLE products ADD CONSTRAINT products_voltage_check
  CHECK (voltage IN ('36v','48v','52v','60v','72v'));

-- Те ж для brand (якщо CHECK уже був, перевіряємо що він правильний)
ALTER TABLE products DROP CONSTRAINT IF EXISTS products_brand_check;
ALTER TABLE products ADD CONSTRAINT products_brand_check
  CHECK (brand IN ('ausom','kukirin'));

CREATE INDEX IF NOT EXISTS idx_products_brand    ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(is_featured) WHERE is_featured = true;

-- ─── BLOG POSTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blog_posts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  slug         TEXT NOT NULL UNIQUE,
  excerpt      TEXT NOT NULL DEFAULT '',
  content      TEXT NOT NULL DEFAULT '',
  cover_image  TEXT NOT NULL DEFAULT '',
  category     TEXT NOT NULL DEFAULT 'Загальне',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reading_time INTEGER NOT NULL DEFAULT 5
);

CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published_at DESC);

-- ─── ORDERS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS orders (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  items      JSONB NOT NULL,
  total      INTEGER NOT NULL,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  phone      TEXT NOT NULL,
  address    TEXT NOT NULL,
  city       TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  notes      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_status  ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- ─── BANNERS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS banners (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  subtitle        TEXT NOT NULL DEFAULT '',
  link            TEXT NOT NULL DEFAULT '/',
  image           TEXT NOT NULL,
  eyebrow         TEXT NOT NULL DEFAULT '',
  product_slug    TEXT,
  banner_position TEXT NOT NULL DEFAULT 'center center',
  cta_label       TEXT NOT NULL DEFAULT 'Купити зараз',
  position        INTEGER NOT NULL DEFAULT 0,
  active          BOOLEAN NOT NULL DEFAULT true,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_banners_active_position
  ON banners(active, position) WHERE active = true;

-- ─── PRODUCT FAQs ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS product_faqs (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_faqs_product_sort
  ON product_faqs(product_id, sort_order);

-- ─── RLS toggle ────────────────────────────────────────────────
-- Вмикаємо RLS всюди. Самі політики визначені в migration-admin-rls.sql.
ALTER TABLE products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders       ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners      ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_faqs ENABLE ROW LEVEL SECURITY;

-- ═══════════════════════════════════════════════════════════════
-- Наступний крок: виконай supabase/migration-admin-rls.sql
-- ═══════════════════════════════════════════════════════════════
