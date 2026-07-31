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
        // Exact match only — do not redirect /blog/[slug] or /blog/admin
        source: "/blog",
        destination: "/case-studies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
