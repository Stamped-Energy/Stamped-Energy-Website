import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SolutionAreaPage } from "@/components/solutions/SolutionAreaPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { solutionsContent, type SolutionAreaSlug } from "@/lib/content/solutions";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO, getSolutionAreaSeo } from "@/lib/seo/pages";
import { buildFaqSchema, buildServiceSchema, buildWebPageSchema } from "@/lib/seo/schemas";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return solutionsContent.areas.map((area) => ({ slug: area.slug }));
}

function findArea(slug: string) {
  return solutionsContent.areas.find((area) => area.slug === (slug as SolutionAreaSlug));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = getSolutionAreaSeo(slug);
  return seo ? buildPageMetadataFromConfig(seo) : {};
}

export default async function SolutionAreaRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const area = findArea(slug);
  const seo = getSolutionAreaSeo(slug);

  if (!area || !seo) {
    notFound();
  }

  const breadcrumbSchema = generateBreadcrumbSchema([
    breadcrumbHome(),
    { name: "What we improve", url: PAGE_SEO.solutions.path },
    { name: area.title, url: seo.path },
  ]);

  return (
    <>
      <JsonLd
        data={[buildWebPageSchema(seo), buildServiceSchema(area, seo), buildFaqSchema(area.faq), breadcrumbSchema]}
      />
      <SolutionAreaPage area={area} />
    </>
  );
}
