import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Redirects
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },

  // Image optimization for Docker
  images: {
    unoptimized: process.env.NODE_ENV === 'production',
    domains: ['localhost'],
  },

  // Environment variables
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },

  // Experimental features
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },

  // Enable SWC minification
  swcMinify: true,

  // Disable telemetry
  telemetry: false,
};

export default nextConfig;
