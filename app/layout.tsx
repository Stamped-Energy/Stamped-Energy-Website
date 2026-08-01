import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/content";
import { siteMetadataBase } from "@/lib/seo/metadata";
import { organizationSchema } from "@/lib/seo/schemas";

import "./globals.css";

export const metadata: Metadata = {
  ...siteMetadataBase,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <body
        className="min-h-screen bg-surface text-on-surface antialiased"
        suppressHydrationWarning
      >
        <JsonLd data={organizationSchema} />
        <MotionProvider>
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
