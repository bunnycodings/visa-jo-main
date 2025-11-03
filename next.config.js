/** @type {import('next').NextConfig} */
const nextConfig = {
  // Uncomment the line below when you want to build for static export:
  // output: 'export',
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'googleusercontent.com',
        pathname: '/**',
      },
    ],
  },
  env: {
    SITE_URL: process.env.SITE_URL || 'https://visa-jo.com',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://visa-jo.com',
    MONGODB_URI: 'mongodb+srv://e26afi_db_user:ciJkHLd75fXQPuOa@cluster0jalefb.ztvbxu8.mongodb.net/',
    GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyDtGagLe57lZB0QrLSknpyDhhjnF3lGVPs',
    NEXT_PUBLIC_GOOGLE_PLACE_ID: process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || 'ChIJdeupRGqhHBURVIFe6tsJobA',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-secret-key-here',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
  },
}

module.exports = nextConfig
