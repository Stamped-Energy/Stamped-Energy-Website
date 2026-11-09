import type { Metadata } from "next";
import { Suspense } from "react";

import { BlogCatalog } from "@/components/blog/BlogCatalog";
import { BlogFeatured } from "@/components/blog/BlogFeatured";
import { BlogHero } from "@/components/blog/BlogHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { listPublishedPosts, listPublishedPostsForSitemap } from "@/lib/blog/posts";
import { caseStudiesContent } from "@/lib/content/caseStudies";
import { safeDbQuery } from "@/lib/db/safe-query";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildBlogPostItemListSchema, buildWebPageSchema } from "@/lib/seo/schemas";
import type { WebPage } from "schema-dts";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.caseStudies);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Resources", url: PAGE_SEO.caseStudies.path },
]);

const collectionSchema = buildWebPageSchema(PAGE_SEO.caseStudies, {
  "@type": "CollectionPage",
} as Partial<WebPage>);

const emptyPosts = {
  posts: [],
  pagination: { page: 1, limit: 6, total: 0, totalPages: 0, hasMore: false },
};

/** Public Case Studies & Blogs listing. CRM BlogPost data; Case Study admin untouched. */
export default async function CaseStudiesRoute() {
  const [featuredResult, catalogResult, sitemapPostsResult] = await Promise.all([
    safeDbQuery(() => listPublishedPosts({ featured: true, limit: 3 }), emptyPosts),
    safeDbQuery(() => listPublishedPosts({ page: 1, limit: 6 }), emptyPosts),
    safeDbQuery(() => listPublishedPostsForSitemap(), []),
  ]);

  const databaseError = featuredResult.databaseError || catalogResult.databaseError;
  const itemListSchema = buildBlogPostItemListSchema(sitemapPostsResult.data, PAGE_SEO.caseStudies.path);

  return (
    <>
      <JsonLd
        data={[
          collectionSchema,
          breadcrumbSchema,
          ...(itemListSchema ? [itemListSchema] : []),
        ]}
      />
      <BlogHero
        eyebrow={caseStudiesContent.hero.eyebrow}
        title={caseStudiesContent.hero.title}
        description={caseStudiesContent.hero.description}
        heroImageSrc={caseStudiesContent.hero.heroImageSrc}
        heroImageAlt={caseStudiesContent.hero.heroImageAlt}
      />
      <BlogFeatured posts={featuredResult.data.posts} databaseError={databaseError} />
      <Suspense fallback={null}>
        <BlogCatalog
          initialPosts={catalogResult.data.posts}
          initialHasMore={catalogResult.data.pagination.hasMore}
          initialPage={catalogResult.data.pagination.page}
        />
      </Suspense>
    </>
  );
}
