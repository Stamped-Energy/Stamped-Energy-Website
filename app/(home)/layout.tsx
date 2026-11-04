import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { HomeNavEnhancer } from "@/components/layout/HomeNavEnhancer";
import { NavbarShell } from "@/components/layout/NavbarShell";
import { HOME_CANONICAL_URL } from "@/lib/seo/metadata";

/**
 * Lean home layout: server NavbarShell + post-LCP HomeNavEnhancer.
 * MotionProvider lives in HomeMotionIsland on the page (below hero).
 */
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="canonical" href={HOME_CANONICAL_URL} />
      <meta property="og:url" content={HOME_CANONICAL_URL} />
      <NavbarShell pathname="/" />
      <main className="min-w-0 overflow-x-clip">{children}</main>
      <Footer />
      <HomeNavEnhancer />
    </>
  );
}
