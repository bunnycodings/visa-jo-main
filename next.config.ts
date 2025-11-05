import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'], // Use modern image formats
  },
  
  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console logs in production
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // experimental: {
  //   optimizeCss: true, // Optimize CSS - disabled to avoid critters conflicts
  // },
  
  // External packages for server components
  serverExternalPackages: ['mysql2'],
  
  webpack: (config, { isServer }) => {
    // Ensure critters is properly resolved
    config.resolve.alias = {
      ...config.resolve.alias,
      critters: require.resolve('critters'),
    };
    
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        path: false,
        crypto: false,
      };
    }
    
    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
        },
      },
    };
    
    return config;
  },
};

export default withNextIntl(nextConfig);
