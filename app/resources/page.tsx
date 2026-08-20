import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { listResourceGuides } from "@/lib/content/resource-guides";
import { breadcrumbHome, generateBreadcrumbSchema } from "@/lib/seo/breadcrumbs";
import { buildPageMetadataFromConfig } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/pages";

export const metadata: Metadata = buildPageMetadataFromConfig(PAGE_SEO.resources);

const breadcrumbSchema = generateBreadcrumbSchema([
  breadcrumbHome(),
  { name: "Resources", url: PAGE_SEO.resources.path },
]);

export default function ResourcesHubPage() {
  const guides = listResourceGuides();

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <section className="page-hero relative overflow-hidden bg-secondary">
        <Container className="relative z-10 py-16 md:py-24">
          <Reveal>
            <SectionBadge label="Resources" alternate />
            <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-on-secondary md:text-4xl lg:text-[2.5rem]">
              Guides for plant energy cost decisions
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-on-secondary/85 md:text-base">
              Maximum demand, DISCOM HT bills, and how Stamped differs from EMS or SCADA. Written for
              plant directors and electrical heads in India.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface section-y">
        <Container>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {guides.map((guide, index) => (
              <Reveal key={guide.slug} delay={index * 0.05}>
                <Link
                  href={`/resources/${guide.slug}`}
                  className="flex h-full flex-col border border-outline-variant/50 bg-surface-lowest p-6 transition-colors hover:border-primary/40 md:p-8"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    {guide.eyebrow}
                  </p>
                  <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-on-surface">
                    {guide.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-on-surface-variant">
                    {guide.description}
                  </p>
                  <span className="mt-6 text-sm font-semibold text-primary">Read guide »</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12 border-t border-outline-variant/40 pt-10">
            <p className="text-sm text-on-surface-variant">
              Looking for field notes and published write-ups?{" "}
              <Link href="/case-studies" className="font-semibold text-primary hover:opacity-80">
                Browse case studies & blogs »
              </Link>
            </p>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
