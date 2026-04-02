import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // domains: ['res.cloudinary.com'],
    unoptimized: true,
  },

  cacheComponents:true,


  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
