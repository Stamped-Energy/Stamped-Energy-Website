import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";

/** Listing lives at /case-studies; article URLs stay under /blog/[slug]. */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  permanentRedirect("/case-studies");
}
