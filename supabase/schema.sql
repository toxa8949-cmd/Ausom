-- ============================================================
-- AUSOM UKRAINE — Supabase Database Schema
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  price       INTEGER NOT NULL,
  old_price   INTEGER,
  category    TEXT NOT NULL CHECK (category IN ('offroad', 'commuter')),
  voltage     TEXT NOT NULL CHECK (voltage IN ('48v', '52v', '60v')),
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
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

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

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read products"  ON products FOR SELECT USING (true);
CREATE POLICY "Auth can manage products"  ON products FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read posts"     ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Auth can manage posts"     ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create order"   ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can read orders"      ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can update orders"    ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- SEED: 4 реальні моделі в гривнях
INSERT INTO products (name, slug, price, old_price, category, voltage, motor, range_km, max_speed, weight_kg, max_load_kg, battery_wh, description, features, in_stock, is_new, is_featured, tag) VALUES

('Ausom L1', 'l1', 27050, 33800, 'commuter', '48v', 'single', 50, 45, 20, 100, 468,
 'Ausom L1 — ідеальний старт у світ електросамокатів. Легкий, надійний та доступний міський самокат для щоденних поїздок.',
 ARRAY['Мотор 500W', 'Запас ходу 50 км', 'Швидкість до 45 км/год', 'Вага лише 20 кг', 'Складається за 3 секунди', 'Підходить для початківців'],
 true, false, true, NULL),

('Ausom L2 Dual Motor', 'l2-dual', 32200, 40250, 'commuter', '48v', 'dual', 70, 55, 28, 120, 768,
 'Ausom L2 Dual Motor — потужний міський самокат з подвійним мотором. Чудовий баланс між міськими їздами та підвищеною продуктивністю.',
 ARRAY['Подвійний мотор 2×600W', 'Запас ходу 70 км', 'Швидкість до 55 км/год', 'Пневматичні шини', 'Вилочна підвіска', 'Складна конструкція'],
 true, false, true, NULL),

('Ausom L2 Max Dual Motor', 'l2-max-dual', 40800, 51000, 'commuter', '48v', 'dual', 85, 55, 30, 120, 960,
 'Ausom L2 Max Dual Motor — найпотужніша модель серії L. Збільшений акумулятор та подвійний мотор для максимального запасу ходу.',
 ARRAY['Подвійний мотор 2×800W', 'Запас ходу 85 км', 'Швидкість до 55 км/год', 'Акумулятор 960 Wh', 'Пневматичні шини', 'Вилочна підвіска'],
 true, false, true, 'Хіт'),

('Ausom DT2 Pro', 'dt2-pro', 44250, 55300, 'offroad', '52v', 'dual', 70, 65, 34, 150, 1066,
 'Ausom DT2 Pro — позашляховий самокат преміум класу для бездоріжжя та екстремальних умов.',
 ARRAY['Мотор 2×1000W', 'Позашляхова підвіска', 'Запас ходу 70 км', 'Швидкість до 65 км/год', 'Гідравлічні гальма Zoom', 'Навантаження до 150 кг'],
 true, false, true, 'Топ');
