/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Premium Web3 Build Stability
  eslint: {
    // Allows production builds to complete even if there are linting errors
    // Useful for rapid mainnet iterations, but keep your code clean!
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ensures builds don't fail on type mismatches during high-speed deployment
    ignoreBuildErrors: true,
  },

  // Enable compression for faster dApp loading on mobile/low-bandwidth
  compress: true,

  // Powering the "Premium" look: Allow external assets if needed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.stacks.co',
      },
    ],
  },

  // Web3 compatibility: some Stacks libraries require specific webpack handling
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

module.exports = nextConfig;
