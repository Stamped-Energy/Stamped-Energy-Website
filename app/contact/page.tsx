import type { Metadata } from "next";

import { ContactPageView } from "@/components/contact/ContactPageView";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";
import { contactPageSchema, engagementHowToSchema } from "@/lib/seo/schemas";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.contact);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Contact", url: PAGE_SEO.contact.path },
]);

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[contactPageSchema, engagementHowToSchema, breadcrumbSchema]} />
      <ContactPageView />
    </>
  );
}
