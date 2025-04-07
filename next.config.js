/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force dynamic rendering for certain routes
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  // Configure allowed image domains for next/image
  images: {
    domains: [
      'imgur.com',
      'i.imgur.com',
      'placehold.co',
      'picsum.photos',
      'cloudinary.com',
      'res.cloudinary.com',
      'images.unsplash.com'
    ],
  },
};

module.exports = nextConfig; 