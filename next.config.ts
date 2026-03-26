import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "anagrammatically-nonderogative-bibi.ngrok-free.dev",
    "*.ngrok-free.dev"
  ],
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/:path*', // Proxy to Backend
      },
    ]
  },
};

export default nextConfig;
