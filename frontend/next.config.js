/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack configuration
  experimental: {
    webpackBuildWorker: true,
    serverComponentsExternalPackages: ['pino', 'pino-pretty', 'lokijs', 'encoding'],
    // Enable experimental features if needed
    // turbo: {}
  },

  // Configure webpack
  webpack: (config, { isServer, dev, webpack }) => {
    // Add IgnorePlugin for test files and problematic modules
    const { IgnorePlugin } = require('webpack');
    
    // List of modules to ignore
    const modulesToIgnore = [
      /^tap$/,  // Exact match for 'tap'
      /^tape$/, // Exact match for 'tape'
      /^why-is-node-running$/, // Exact match for 'why-is-node-running'
      /(^|\/)tests?\//,  // Ignore test directories
      /\.test\.(js|jsx|ts|tsx)$/,  // Ignore test files
      /(^|\/)__tests__\//, // Ignore __tests__ directories
      /\.(spec|test|e2e)\.[jt]sx?$/, // Common test file patterns
      /pino\/lib\/.*\.js$/, // Ignore pino test files
      /thread-stream\/test\//, // Ignore thread-stream test files
    ];
    
    // Add IgnorePlugin for each module to ignore
    config.plugins.push(
      new IgnorePlugin({
        checkResource: (resource) => {
          // Skip if in development mode and the file is local
          if (dev && !resource.includes('node_modules')) {
            return false;
          }
          return modulesToIgnore.some(pattern => 
            pattern.test(resource)
          );
        },
      })
    );

    // Add this to your webpack config in next.config.js
config.resolve.alias = {
  ...config.resolve.alias,
  'hoist-non-react-statics': require.resolve('hoist-non-react-statics')
};

    // Handle Node.js modules that might be required by dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
        worker_threads: false,
        // Add more Node.js built-ins as needed
        ...config.resolve.fallback,
      };
    }

    // Handle module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      'porto/internal': false, // Disable the porto module as it's not required in the browser
      '@react-native-async-storage/async-storage': false, // Disable async-storage for web
      'qrcode': require.resolve('qrcode/lib/browser'), // Use browser-compatible version of qrcode
      'zod': require.resolve('zod') // Ensure proper zod resolution
    };
    
    // Enable preferRelative to help with module resolution
    config.resolve.preferRelative = true;
    
    // Handle qrcode module
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /qrcode\/lib\/browser$/,
        require.resolve('qrcode/lib/browser')
      )
    );

    // Exclude problematic modules from being processed by Next.js
    if (!isServer) {
      config.externals.push({
        'pino-pretty': 'commonjs pino-pretty',
        'lokijs': 'commonjs lokijs',
        'encoding': 'commonjs encoding',
      });
    }

    return config;
  },
  
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: false, // Set to false to catch type errors
  },
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: false, // Set to false to catch lint errors
  },
  
  // Enable SWC minification
  swcMinify: true,
  
  // Configure module resolution
  modularizeImports: {
    // Add any problematic modules here
    '@walletconnect/ethereum-provider': {
      transform: '@walletconnect/ethereum-provider/dist/{{member}}',
    },
    '@reown/appkit': {
      transform: '@reown/appkit/dist/{{member}}',
    },
  },
  
  // Configure images
  images: {
    domains: [],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Configure headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;