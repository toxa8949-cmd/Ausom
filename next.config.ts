import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve WebP and AVIF for supported browsers — reduces image size 30-50%
    formats: ['image/avif', 'image/webp'],
    // Device widths matching breakpoints used in the site
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    // Intermediate sizes for art-direction/srcset
    imageSizes: [64, 100, 200, 400, 600],
    // Minimum cache time for optimized images (1 week)
    minimumCacheTTL: 604800,
    remotePatterns: [
      // Ausom / Shopify CDN — for seed data and static banners
      { protocol: 'https', hostname: 'pl.ausomstore.com',  pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'ausomstore.com',     pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'ausomstore.eu',      pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com',    pathname: '/**' },
      // Supabase Storage — for images uploaded via admin
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
};

export default nextConfig;
