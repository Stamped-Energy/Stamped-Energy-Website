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
      {
        source: "/resources",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/resources/:path*",
        destination: "/case-studies",
        permanent: true,
      },
      // Copy v3 (ADR-033): old solution pillars map to the new improvement areas.
      { source: "/solutions/load-energy", destination: "/solutions/process", permanent: true },
      {
        source: "/solutions/equipment-intelligence",
        destination: "/solutions/maintenance",
        permanent: true,
      },
      // Copy v3 (ADR-033): retired vertical pages fold back into the industries hub.
      { source: "/industries/cement", destination: "/industries", permanent: true },
      { source: "/industries/steel", destination: "/industries", permanent: true },
      { source: "/industries/pharma", destination: "/industries", permanent: true },
      { source: "/industries/chemical", destination: "/industries", permanent: true },
    ];
  },
};

export default nextConfig;
