import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "anagrammatically-nonderogative-bibi.ngrok-free.dev",
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "21f9-210-245-36-176.ngrok-free.app"
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
