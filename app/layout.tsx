import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/content";
import { siteMetadataBase } from "@/lib/seo/metadata";
import { organizationSchema } from "@/lib/seo/schemas";
import { cn } from "@/lib/utils";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
    <html
      lang="en-IN"
      className={cn(spaceGrotesk.variable, inter.variable, ibmPlexMono.variable)}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-surface font-sans text-on-surface antialiased"
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
