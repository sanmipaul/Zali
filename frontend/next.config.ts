import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: false, // Disable Turbopack to fix JSX runtime issues
  },
  webpack: (config) => {
    config.resolve.fallback = { 
      fs: false, 
      net: false, 
      tls: false,
      tap: false,
      tape: false,
      'why-is-node-running': false
    };
    
    // Completely ignore problematic modules
    const originalResolve = config.resolve.plugins || [];
    config.resolve.plugins = [
      ...originalResolve,
      {
        apply: (resolver) => {
          resolver.hooks.resolve.tapAsync('IgnoreTestFiles', (request, resolveContext, callback) => {
            if (
              request.request === 'tap' ||
              request.request === 'tape' ||
              request.request === 'why-is-node-running' ||
              (request.path && request.path.includes('/test/')) ||
              (request.request && request.request.includes('.test.')) ||
              (request.request && request.request.includes('.spec.'))
            ) {
              return callback();
            }
            callback();
          });
        }
      }
    ];
    
    return config;
  },
};

export default nextConfig;
