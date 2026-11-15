import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/content";
import { siteMetadataBase } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import { cn } from "@/lib/utils";

import "./globals.css";

export const metadata: Metadata = {
  ...siteMetadataBase,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: PAGE_SEO.home.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      data-motion-pending=""
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-surface font-sans text-on-surface antialiased"
        suppressHydrationWarning
      >
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <MotionProvider>
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
