-- ============================================================
-- PRODUCTS: add brand column
-- ============================================================
-- Allows tagging products as 'ausom' or 'kukirin' (partner) without
-- restructuring the schema. Default is 'ausom' so existing rows
-- don't need to be updated manually.

ALTER TABLE products
  ADD COLUMN IF NOT EXISTS brand TEXT NOT NULL DEFAULT 'ausom'
    CHECK (brand IN ('ausom', 'kukirin'));

-- Optional index for faster filtering in the catalog
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);

-- Sanity check: all existing rows should now have brand = 'ausom'
-- SELECT slug, name, brand FROM products;
