import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { IndustryVerticalPage } from "@/components/industries/IndustryVerticalPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getIndustryVertical, getVerticalPage, VERTICAL_SLUGS, type VerticalSlug } from "@/lib/content";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { getVerticalPageSeo } from "@/lib/seo/pages";
import { buildWebPageSchema, verticalFaqSchema } from "@/lib/seo/schemas";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return VERTICAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = getVerticalPageSeo(slug);
  if (!seo) {
    return {};
  }
  return buildPageMetadataFromConfig(seo);
}

export default async function IndustryVerticalRoutePage({ params }: PageProps) {
  const { slug } = await params;

  if (!VERTICAL_SLUGS.includes(slug as VerticalSlug)) {
    notFound();
  }

  const vertical = getIndustryVertical(slug);
  const page = getVerticalPage(slug);

  if (!vertical || !page) {
    notFound();
  }

  const seo = getVerticalPageSeo(slug)!;
  const breadcrumbSchema = generateBreadcrumbSchema([
    breadcrumbHome(),
    { name: "Industries", url: "/industries" },
    { name: vertical.name, url: seo.path },
  ]);

  return (
    <>
      <JsonLd data={[buildWebPageSchema(seo), verticalFaqSchema(slug as VerticalSlug), breadcrumbSchema]} />
      <IndustryVerticalPage slug={slug as VerticalSlug} />
    </>
  );
}
