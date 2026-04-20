import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.ausom.in.ua' }],
        destination: 'https://ausom.in.ua/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [64, 100, 200, 400, 600],
    minimumCacheTTL: 604800,
    remotePatterns: [
      { protocol: 'https', hostname: 'pl.ausomstore.com', pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'ausomstore.com', pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'ausomstore.eu', pathname: '/cdn/shop/**' },
      { protocol: 'https', hostname: 'cdn.shopify.com', pathname: '/**' },
      { protocol: 'https', hostname: '*.supabase.co', pathname: '/storage/v1/object/public/**' },
    ],
  },
};

export default nextConfig;
