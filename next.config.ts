import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Ausom / Shopify CDN — для seed-даних і статичних банерів
      { protocol: 'https', hostname: 'pl.ausomstore.com', pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'ausomstore.com',    pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'ausomstore.eu',     pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com',   pathname: '/**' },
      // Supabase Storage — для фото, завантажених через адмінку
      { protocol: 'https', hostname: '*.supabase.co',     pathname: '/storage/v1/object/public/**' },
    ],
  },
};

export default nextConfig;
