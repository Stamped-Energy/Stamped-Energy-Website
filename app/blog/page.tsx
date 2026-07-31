import { permanentRedirect } from "next/navigation";

/** Listing lives at /case-studies; article URLs stay under /blog/[slug]. */
export default function BlogPage() {
  permanentRedirect("/case-studies");
}
