import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

import { DeferredAnalytics } from "@/components/analytics/DeferredAnalytics";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/content";
import { siteMetadataBase } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { organizationSchema, websiteSchema } from "@/lib/seo/schemas";
import { cn } from "@/lib/utils";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["700"],
  display: "optional",
  preload: false,
  adjustFontFallback: true,
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600", "700"],
  display: "optional",
  preload: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "600", "700"],
  display: "optional",
  preload: false,
});

export const metadata: Metadata = {
  ...siteMetadataBase,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: PAGE_SEO.home.description,
};

export function generateViewport(): Viewport {
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      data-motion-pending=""
      className={cn(spaceGrotesk.variable, inter.variable, ibmPlexMono.variable)}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(window.matchMedia("(max-width: 1023px)").matches){document.documentElement.removeAttribute("data-motion-pending");}}catch(e){}`,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-surface font-sans text-on-surface antialiased"
        suppressHydrationWarning
      >
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <MotionProvider>
          <SiteChrome>{children}</SiteChrome>
        </MotionProvider>
        <DeferredAnalytics />
      </body>
    </html>
  );
}
