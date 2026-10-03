import type { Metadata } from "next";

import { AboutPageView } from "@/components/about/AboutPage";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { buildWebPageSchema, utsoPersonSchema, vinayakPersonSchema } from "@/lib/seo/schemas";
import type { WebPage } from "schema-dts";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.about);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "About", url: PAGE_SEO.about.path },
]);

export default function AboutRoute() {
  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema(PAGE_SEO.about, { "@type": "AboutPage" } as Partial<WebPage>),
          vinayakPersonSchema,
          utsoPersonSchema,
          breadcrumbSchema,
        ]}
      />
      <AboutPageView />
    </>
  );
}
