import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol:'https', hostname:'pl.ausomstore.com',  pathname:'/cdn/shop/**' },
      { protocol:'https', hostname:'ausomstore.com',     pathname:'/cdn/shop/**' },
      { protocol:'https', hostname:'ausomstore.eu',      pathname:'/cdn/shop/**' },
      { protocol:'https', hostname:'cdn.shopify.com',    pathname:'/**' },
    ],
  },
};

export default nextConfig;
