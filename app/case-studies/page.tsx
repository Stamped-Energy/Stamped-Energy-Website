import type { Metadata } from "next";

import { BlogCatalog } from "@/components/blog/BlogCatalog";
import { BlogFeatured } from "@/components/blog/BlogFeatured";
import { BlogHero } from "@/components/blog/BlogHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { listPublishedPosts } from "@/lib/blog/posts";
import { caseStudiesContent } from "@/lib/content/caseStudies";
import { safeDbQuery } from "@/lib/db/safe-query";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildWebPageSchema } from "@/lib/seo/schemas";
import type { WebPage } from "schema-dts";

export const revalidate = 60;

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.caseStudies);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Resources", url: PAGE_SEO.caseStudies.path },
]);

const collectionSchema = buildWebPageSchema(PAGE_SEO.caseStudies, {
  "@type": "CollectionPage",
} as Partial<WebPage>);

type CaseStudiesRouteProps = {
  searchParams: Promise<{ search?: string }>;
};

/** Public Case Studies & Blogs listing. CRM BlogPost data; CaseStudy admin untouched. */
export default async function CaseStudiesRoute({ searchParams }: CaseStudiesRouteProps) {
  const { search } = await searchParams;
  const initialSearch = typeof search === "string" ? search : "";

  const emptyPosts = {
    posts: [],
    pagination: { page: 1, limit: 6, total: 0, totalPages: 0, hasMore: false },
  };

  const [featuredResult, catalogResult] = await Promise.all([
    safeDbQuery(() => listPublishedPosts({ featured: true, limit: 3 }), emptyPosts),
    safeDbQuery(
      () =>
        listPublishedPosts({
          page: 1,
          limit: 6,
          ...(initialSearch.trim() ? { search: initialSearch } : {}),
        }),
      emptyPosts,
    ),
  ]);

  const databaseError = featuredResult.databaseError || catalogResult.databaseError;

  return (
    <>
      <JsonLd data={[collectionSchema, breadcrumbSchema]} />
      <BlogHero
        eyebrow={caseStudiesContent.hero.eyebrow}
        title={caseStudiesContent.hero.title}
        description={caseStudiesContent.hero.description}
        heroImageSrc={caseStudiesContent.hero.heroImageSrc}
        heroImageAlt={caseStudiesContent.hero.heroImageAlt}
      />
      <BlogFeatured posts={featuredResult.data.posts} databaseError={databaseError} />
      <BlogCatalog
        initialPosts={catalogResult.data.posts}
        initialHasMore={catalogResult.data.pagination.hasMore}
        initialPage={catalogResult.data.pagination.page}
        initialSearch={initialSearch}
      />
    </>
  );
}
