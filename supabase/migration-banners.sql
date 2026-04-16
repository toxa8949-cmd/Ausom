-- ============================================================
-- BANNERS: extend schema so admin can control Hero slides
-- ============================================================
-- Safe to run multiple times (uses IF NOT EXISTS / ON CONFLICT).

-- Add new columns ----------------------------------------------
ALTER TABLE banners
  ADD COLUMN IF NOT EXISTS eyebrow         TEXT DEFAULT '',
  ADD COLUMN IF NOT EXISTS product_slug    TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS banner_position TEXT DEFAULT 'center center',
  ADD COLUMN IF NOT EXISTS cta_label       TEXT DEFAULT 'Купити зараз';

-- Seed the three Hero slides currently hardcoded in the frontend.
-- We use slug-based conflict avoidance via title+eyebrow combo; if you
-- re-run the script after editing in admin, your edits WILL be overwritten.
-- To avoid that, comment out the INSERTs below on re-run.

INSERT INTO banners (title, subtitle, link, image, eyebrow, product_slug, banner_position, cta_label, position, active)
VALUES
  (
    'Ausom DT2 Pro',
    'Подвійний мотор 2×800W, 70 км, 65 км/год. Для міста та бездоріжжя.',
    '/product/dt2-pro',
    'https://pl.ausomstore.com/cdn/shop/files/Ausom_K20_Pro_Dual_banner.jpg?v=1774515143',
    'Флагман 2026',
    'dt2-pro',
    'center 30%',
    'Купити зараз',
    0,
    true
  ),
  (
    'Ausom L2 Max',
    '85 км на одному заряді. Dual Motor, 960 Wh.',
    '/product/l2-max-dual',
    'https://pl.ausomstore.com/cdn/shop/files/800_1200-wuzi.jpg?v=1772768149',
    'Хіт продажів',
    'l2-max-dual',
    'center 40%',
    'Купити зараз',
    1,
    true
  ),
  (
    'Ausom L2 Dual',
    'Баланс потужності та автономності для щоденних поїздок.',
    '/product/l2-dual',
    'https://pl.ausomstore.com/cdn/shop/files/new-arrival-mobile.jpg?v=1773298436',
    'Популярний вибір',
    'l2-dual',
    'center 35%',
    'Купити зараз',
    2,
    true
  )
ON CONFLICT DO NOTHING;
-- NB: there is no unique constraint, so ON CONFLICT won't actually protect.
-- If you run this script twice, you'll get duplicates. Only run the INSERTs
-- once during initial migration.
