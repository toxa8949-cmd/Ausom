-- ═══════════════════════════════════════════════════════════════
-- AUSOM UKRAINE — Admin-gated RLS
-- ═══════════════════════════════════════════════════════════════
-- Міграція безпечна для повторного виконання (IF NOT EXISTS / DROP IF EXISTS).
--
-- Контекст:
--   schema.sql використовує політики виду
--     USING (auth.role() = 'authenticated')
--   що означає "будь-який зареєстрований Supabase Auth юзер". Якщо в проекті
--   увімкнені публічні signup'и, це = будь-хто в світі може писати в БД.
--
-- Що робимо:
--   1) Створюємо таблицю `admins(user_id uuid)` — одна рядок на admin-акаунт.
--   2) Створюємо SECURITY DEFINER функцію `is_admin()` — щоб політики
--      не тригерили рекурсивні RLS-перевірки на самій таблиці admins.
--   3) Заміняємо old policies на admin-only для записуючих операцій.
--   4) Orders: анонім може INSERT (checkout), але читати/оновлювати
--      може тільки admin.
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. admins registry ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  user_id    UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email      TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  note       TEXT
);

-- Сама таблиця під RLS: нехай ніхто, крім service_role, її не читає/не пише.
-- (Це штатний спосіб "сховати" список адмінів від анон-клієнтів.)
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
-- Жодних policy'єв для role 'anon'/'authenticated' — за замовчуванням
-- всі запити від них провалюються. service_role оминає RLS автоматично.

-- ─── 2. is_admin() helper ──────────────────────────────────────
-- SECURITY DEFINER з SEARCH_PATH дає функції право читати admins,
-- не прокидуючи RLS далі. Це стандартний патерн Supabase.
CREATE OR REPLACE FUNCTION public.is_admin()
  RETURNS BOOLEAN
  LANGUAGE sql
  SECURITY DEFINER
  SET search_path = public, pg_temp
  STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admins WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, anon;

-- ─── 3. Products ───────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can read products" ON products;
DROP POLICY IF EXISTS "Auth can manage products" ON products;

CREATE POLICY "products_public_read"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "products_admin_insert"
  ON products FOR INSERT
  WITH CHECK (public.is_admin());

CREATE POLICY "products_admin_update"
  ON products FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "products_admin_delete"
  ON products FOR DELETE
  USING (public.is_admin());

-- ─── 4. Blog posts ─────────────────────────────────────────────
DROP POLICY IF EXISTS "Public can read posts" ON blog_posts;
DROP POLICY IF EXISTS "Auth can manage posts" ON blog_posts;

CREATE POLICY "blog_posts_public_read"
  ON blog_posts FOR SELECT
  USING (true);

CREATE POLICY "blog_posts_admin_write"
  ON blog_posts FOR ALL
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ─── 5. Orders ─────────────────────────────────────────────────
-- Анонім може створити замовлення (публічний checkout), але читати і
-- змінювати — тільки admin. notes з особистими даними не витікають.
DROP POLICY IF EXISTS "Anyone can create order" ON orders;
DROP POLICY IF EXISTS "Auth can read orders" ON orders;
DROP POLICY IF EXISTS "Auth can update orders" ON orders;

CREATE POLICY "orders_anon_insert"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "orders_admin_select"
  ON orders FOR SELECT
  USING (public.is_admin());

CREATE POLICY "orders_admin_update"
  ON orders FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "orders_admin_delete"
  ON orders FOR DELETE
  USING (public.is_admin());

-- ─── 6. Banners ────────────────────────────────────────────────
-- (таблиця створюється іншою міграцією; політики ставимо тут, якщо вона вже існує)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'banners') THEN
    EXECUTE 'ALTER TABLE banners ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "banners_public_read" ON banners';
    EXECUTE 'DROP POLICY IF EXISTS "banners_admin_write" ON banners';
    EXECUTE 'DROP POLICY IF EXISTS "Public can read banners" ON banners';
    EXECUTE 'DROP POLICY IF EXISTS "Auth can manage banners" ON banners';

    EXECUTE 'CREATE POLICY "banners_public_read" ON banners FOR SELECT USING (active = true OR public.is_admin())';
    EXECUTE 'CREATE POLICY "banners_admin_write" ON banners FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin())';
  END IF;
END $$;

-- ─── 7. Product FAQs ───────────────────────────────────────────
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'product_faqs') THEN
    EXECUTE 'ALTER TABLE product_faqs ENABLE ROW LEVEL SECURITY';
    EXECUTE 'DROP POLICY IF EXISTS "product_faqs_public_read" ON product_faqs';
    EXECUTE 'DROP POLICY IF EXISTS "product_faqs_admin_write" ON product_faqs';

    EXECUTE 'CREATE POLICY "product_faqs_public_read" ON product_faqs FOR SELECT USING (true)';
    EXECUTE 'CREATE POLICY "product_faqs_admin_write" ON product_faqs FOR ALL USING (public.is_admin()) WITH CHECK (public.is_admin())';
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════
-- MANUAL STEP після виконання міграції:
-- ═══════════════════════════════════════════════════════════════
-- 1. Створи admin-акаунт через Supabase Dashboard → Authentication → Users
--    (або через свою існуючу /admin/login сторінку з вимкненими signup'ами).
-- 2. Скопіюй його user_id (UUID).
-- 3. Додай рядок у admins:
--
--    INSERT INTO admins (user_id, email, note)
--    VALUES ('<твій-uuid>', 'admin@ausom.in.ua', 'Primary admin');
--
-- 4. В Supabase Dashboard → Authentication → Providers → Email:
--    ВИМКНИ "Enable Signups". Залиш увімкненими тільки Sign In.
--    Це закриє публічну реєстрацію.
-- ═══════════════════════════════════════════════════════════════
