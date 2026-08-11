import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {},
  allowedDevOrigins: ['192.168.56.1'],
  webpack: (config) => {
    // Force webpack to resolve modules from the project root,
    // not from the parent directory (/Users/osmann/projects)
    // which has a tsconfig.json that confuses the resolver.
    config.resolve.modules = [
      path.resolve(__dirname, 'node_modules'),
      'node_modules',
    ];
    return config;
  },
};

export default nextConfig;
