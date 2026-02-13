import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'go-skill-icons.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'my-readme-stats.vercel.app',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gitroll.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
