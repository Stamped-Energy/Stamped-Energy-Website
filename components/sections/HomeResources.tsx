import Link from "next/link";

import { ContentImage } from "@/components/ui/ContentImage";
import { Container } from "@/components/ui/Container";
import { DatabaseFetchNotice } from "@/components/ui/DatabaseFetchNotice";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";
import { getHomepageResourceContent } from "@/lib/content/homepage-spotlight";

export async function HomeResources() {
  const { resourcesSection } = landingContent;
  const { content, databaseError } = await getHomepageResourceContent();

  return (
    <section className="section-y bg-surface">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionBadge label={resourcesSection.badge} />
              <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
                {resourcesSection.title}
              </h2>
            </div>
            <Link
              href={resourcesSection.viewAllHref}
              className="text-sm font-semibold text-primary transition-opacity hover:opacity-80"
            >
              {resourcesSection.viewAllLabel} »
            </Link>
          </div>
        </Reveal>

        {databaseError ? <DatabaseFetchNotice className="mt-6 max-w-md" /> : null}

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3">
          {content.items.slice(0, 3).map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <Link
                href={item.href}
                className="group block border-t border-outline-variant/45 pt-6 transition-opacity hover:opacity-90"
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-md bg-surface-low">
                  <ContentImage
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                {item.tag ? (
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                    {item.tag}
                  </p>
                ) : null}
                <h3 className="mt-2 font-display text-lg font-semibold tracking-tight md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 hidden text-sm leading-6 text-on-surface/70 md:block">{item.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
