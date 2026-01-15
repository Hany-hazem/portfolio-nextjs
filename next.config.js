/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/admin-api/:path*',
        destination: 'https://notworthy.vip/admin-api/:path*',
      },
    ];
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
};

export default nextConfig;
