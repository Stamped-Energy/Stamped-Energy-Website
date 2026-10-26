import type { ReactNode } from "react";

import { HOME_CANONICAL_URL } from "@/lib/seo/metadata";

/**
 * Next.js metadata resolution drops the trailing slash on the home canonical and og:url.
 * Hoisted <link> / <meta> tags keep https://stamped.work/ aligned with sitemap and JSON-LD.
 */
export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="canonical" href={HOME_CANONICAL_URL} />
      <meta property="og:url" content={HOME_CANONICAL_URL} />
      {children}
    </>
  );
}
