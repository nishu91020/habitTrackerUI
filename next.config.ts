/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    if (!isServer) {
      // Ignore 'tls' module in the browser environment
      config.resolve.fallback = {
        ...config.resolve.fallback,
        tls: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;