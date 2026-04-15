-- ============================================================
-- AUSOM UKRAINE — Supabase Database Schema
-- Запусти цей SQL у Supabase → SQL Editor → New Query
-- ============================================================

-- Products table
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

-- Blog posts table
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

-- Orders table
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

-- Admin users (simple email+password via Supabase Auth)
-- No extra table needed — use Supabase Auth built-in

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Products: public read, only auth write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read products"  ON products FOR SELECT USING (true);
CREATE POLICY "Auth can manage products"  ON products FOR ALL USING (auth.role() = 'authenticated');

-- Blog: public read, only auth write
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read posts"     ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Auth can manage posts"     ON blog_posts FOR ALL USING (auth.role() = 'authenticated');

-- Orders: only auth read, anyone insert
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can create order"   ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Auth can read orders"      ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth can update orders"    ON orders FOR UPDATE USING (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA — всі 8 моделей
-- ============================================================

INSERT INTO products (name, slug, price, old_price, category, voltage, motor, range_km, max_speed, weight_kg, max_load_kg, battery_wh, description, features, in_stock, is_new, is_featured, tag) VALUES
('Gosoul 2 Pro Dual Motor', 'gosoul-2-pro', 569, 749, 'commuter', '52v', 'dual', 80, 60, 28, 120, 936,
 'Gosoul 2 Pro — потужний міський самокат з подвійним мотором 2×800W. Ідеальний для тих, хто хоче більше швидкості та запасу ходу без компромісів.',
 ARRAY['Подвійний мотор 2×800W', 'Запас ходу 80 км', 'Максимальна швидкість 60 км/год', 'Гідравлічні гальма', 'Підсвітка 360°', 'Мобільний додаток'],
 true, true, true, 'Новинка'),

('K20 Pro Dual Motor', 'k20-pro', 529, 679, 'commuter', '48v', 'dual', 65, 55, 26, 120, 768,
 'K20 Pro — новинка 2026 року. Подвійний мотор, міцна рама та сучасний дизайн роблять його ідеальним вибором для міста.',
 ARRAY['Подвійний мотор 2×600W', 'Запас ходу 65 км', 'Швидкість 55 км/год', 'Складна конструкція', 'LED фари', 'Електронне гальмування'],
 true, true, true, 'Новинка'),

('DT2 Pro E-Scooter', 'dt2-pro', 949, 1029, 'offroad', '52v', 'dual', 70, 65, 34, 150, 1066,
 'DT2 Pro — позашляховий самокат преміум класу. Розроблений для бездоріжжя та екстремальних умов.',
 ARRAY['Мотор 2×1000W', 'Позашляхова підвіска', 'Запас ходу 70 км', 'Швидкість 65 км/год', 'Гідравлічні гальма Zoom', 'Навантаження до 150 кг'],
 true, false, true, 'Хіт'),

('F1 Max Electric Scooter', 'f1-max', 1299, 1479, 'offroad', '60v', 'dual', 90, 75, 38, 150, 1440,
 'F1 Max — абсолютний флагман лінійки Ausom. 60V акумулятор, 90 км пробіг та швидкість до 75 км/год.',
 ARRAY['Мотор 2×1500W', '60V акумулятор 1440Wh', 'Запас ходу 90 км', 'Швидкість 75 км/год', 'TFT-дисплей', 'Bluetooth + App'],
 true, false, true, 'Флагман'),

('SR1 Electric Scooter', 'sr1', 759, 1159, 'offroad', '52v', 'single', 75, 70, 32, 130, 1066,
 'SR1 — потужний позашляховий самокат з величезною знижкою цього сезону.',
 ARRAY['Мотор 1200W', 'Запас ходу 75 км', 'Швидкість 70 км/год', 'Пневматичні шини 10"', 'Подвійне гальмування', 'IPX4 захист'],
 true, false, false, NULL),

('L2 Max Dual Motor', 'l2-max-dual', 749, 949, 'commuter', '48v', 'dual', 85, 55, 30, 120, 960,
 'L2 Max з подвійним мотором — найпопулярніша модель серії L.',
 ARRAY['Подвійний мотор 2×800W', 'Запас ходу 85 км', 'Швидкість 55 км/год', 'Пневматичні шини', 'Передня вилочна підвіска', 'Складна конструкція'],
 true, false, true, NULL),

('L1 Electric Scooter', 'l1', 499, 629, 'commuter', '48v', 'single', 50, 45, 20, 100, 468,
 'L1 — ідеальний старт у світ Ausom. Легкий, надійний та доступний міський самокат.',
 ARRAY['Мотор 500W', 'Запас ходу 50 км', 'Швидкість 45 км/год', 'Вага лише 20 кг', 'Складний за 3 секунди', 'Підходить для початківців'],
 true, false, false, NULL),

('Gosoul 2', 'gosoul-2', 499, 699, 'commuter', '48v', 'single', 60, 50, 22, 110, 614,
 'Gosoul 2 — оновлена версія популярного міського самоката. Більше запасу ходу та покращена підвіска.',
 ARRAY['Мотор 800W', 'Запас ходу 60 км', 'Швидкість 50 км/год', 'Оновлена підвіска', 'USB зарядка', 'Круїз-контроль'],
 true, false, false, NULL);
