import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // Disable Turbopack to fix JSX runtime issues
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
};

export default nextConfig;
