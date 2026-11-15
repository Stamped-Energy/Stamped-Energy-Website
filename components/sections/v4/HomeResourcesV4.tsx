import Link from "next/link";

import { ContentImage } from "@/components/ui/ContentImage";
import { DatabaseFetchNotice } from "@/components/ui/DatabaseFetchNotice";
import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";
import { getHomepageResourceContent } from "@/lib/content/homepage-spotlight";

const PLACEHOLDERS = [
  {
    id: "ph-1",
    title: "How a forge caught drift before the lot left the line",
    description: "A short note on early warning from machine and lab records.",
    href: "/case-studies",
    tag: "Case study",
    imageSrc: "/industries/forging.jpg",
    imageAlt: "Forging press line",
  },
  {
    id: "ph-2",
    title: "What matched batches mean for proving a gain",
    description: "How Stamped measures improvement in the plant's own numbers.",
    href: "/case-studies",
    tag: "Note",
    imageSrc: "/industries/heat-treatment.webp",
    imageAlt: "Heat treatment line",
  },
  {
    id: "ph-3",
    title: "Site survey: what we look for on the floor",
    description: "The first days on site, and what the written read-out covers.",
    href: "/case-studies",
    tag: "Guide",
    imageSrc: "/industries/die-casting.jpeg",
    imageAlt: "Die casting plant floor",
  },
] as const;

export async function HomeResourcesV4() {
  const { resourcesHome } = productsContent;
  const { content, databaseError } = await getHomepageResourceContent();
  const items = content.items.length > 0 ? content.items.slice(0, 3) : PLACEHOLDERS;

  return (
    <Section tone="muted" id="resources">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="max-w-2xl font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-balance">
          {resourcesHome.title}
        </h2>
        <Link
          href={resourcesHome.cta.href}
          className="shrink-0 text-sm font-semibold text-[var(--brand-link)] hover:underline"
        >
          {resourcesHome.cta.label} →
        </Link>
      </div>

      {databaseError ? <DatabaseFetchNotice className="mt-6 max-w-md" /> : null}

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group block border-t border-outline-variant/45 pt-6 transition-opacity hover:opacity-90"
            {...(item.href.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] bg-surface-lowest">
              <ContentImage
                src={item.imageSrc}
                alt={item.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            {"tag" in item && item.tag ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-on-surface-variant">
                {item.tag}
              </p>
            ) : null}
            <h3 className="mt-2 font-display text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-3 hidden text-sm leading-6 text-on-surface-variant md:block">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
