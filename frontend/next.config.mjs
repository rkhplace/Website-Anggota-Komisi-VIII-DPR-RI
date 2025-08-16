/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_STRAPI_HOSTNAME || 'localhost',
      },
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_STRAPI_HOSTNAME || 'localhost',
      }
    ]
  },
  experimental: {
    typedRoutes: true
  }
};

export default nextConfig;



