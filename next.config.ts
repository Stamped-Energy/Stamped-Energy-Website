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
      // Legacy blog slugs (GSC / old links) → current published posts
      {
        source: "/blog/prescriptive-energy-forging-heat-treatment-plants",
        destination: "/blog/weekend-furnace-holding-silent-cost",
        permanent: true,
      },
      {
        source: "/blog/shift-start-die-casting-margins",
        destination: "/blog/why-shift-start-kills-die-casting-margins",
        permanent: true,
      },
      {
        source: "/blog/weekend-furnace-holding-heat-treatment-cost",
        destination: "/blog/weekend-furnace-holding-silent-cost",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
