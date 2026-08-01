import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        // Exact match only: do not redirect /blog/[slug] or /blog/admin
        source: "/blog",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/how-it-works",
        destination: "/platform",
        permanent: true,
      },
      {
        source: "/how-it-works/:path*",
        destination: "/platform",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
