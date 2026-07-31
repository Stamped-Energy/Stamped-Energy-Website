import type { Metadata } from "next";

import { BlogCatalog } from "@/components/blog/BlogCatalog";
import { BlogFeatured } from "@/components/blog/BlogFeatured";
import { BlogHero } from "@/components/blog/BlogHero";
import { IndustryPageCta } from "@/components/industries/shared/IndustryPageCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { listPublishedPosts } from "@/lib/blog/posts";
import { safeDbQuery } from "@/lib/db/safe-query";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildCollectionPageSchema } from "@/lib/seo/schemas";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.caseStudies);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Case Studies & Blogs", url: PAGE_SEO.caseStudies.path },
]);

const collectionSchema = buildCollectionPageSchema({
  name: PAGE_SEO.caseStudies.absoluteTitle,
  description: PAGE_SEO.caseStudies.description,
  path: PAGE_SEO.caseStudies.path,
});

const CASE_STUDIES_CTA = {
  eyebrow: "From reading to action",
  title: "See what your incomer meter is already telling you",
  description:
    "Connect existing meters and plant data. Assigned fixes in rupees, verified with evidence.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
};

/** Public Case Studies & Blogs listing — CRM BlogPost data; CaseStudy admin untouched. */
export default async function CaseStudiesRoute() {
  const emptyPosts = {
    posts: [],
    pagination: { page: 1, limit: 6, total: 0, totalPages: 0, hasMore: false },
  };

  const [featuredResult, catalogResult] = await Promise.all([
    safeDbQuery(() => listPublishedPosts({ featured: true, limit: 3 }), emptyPosts),
    safeDbQuery(() => listPublishedPosts({ page: 1, limit: 6 }), emptyPosts),
  ]);

  const databaseError = featuredResult.databaseError || catalogResult.databaseError;

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <BlogHero
        eyebrow="Case studies & blogs"
        title="Notes from the plant floor on electricity cost"
        description="Maximum demand, shift-start overlap, furnace holding, compressor waste, written for plant heads and electrical HODs, not software teams."
      />
      <BlogFeatured posts={featuredResult.data.posts} databaseError={databaseError} />
      <BlogCatalog
        initialPosts={catalogResult.data.posts}
        initialHasMore={catalogResult.data.pagination.hasMore}
        initialPage={catalogResult.data.pagination.page}
      />
      <IndustryPageCta content={CASE_STUDIES_CTA} />
    </>
  );
}
