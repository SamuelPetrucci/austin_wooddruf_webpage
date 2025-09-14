import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build optimizations
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
