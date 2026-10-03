import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";
import { IMPROVEMENT_AREA_LABELS } from "@/lib/content/industries";

type IndustryImprovementAreasProps = {
  slug: VerticalSlug;
};

/** The four improvement areas for one industry, with energy counted inside each. */
export function IndustryImprovementAreas({ slug }: IndustryImprovementAreasProps) {
  const page = getVerticalPage(slug);
  const areas = page?.improvementAreas;

  if (!areas) {
    return null;
  }

  return (
    <section id="four-areas" className="scroll-mt-28 border-b border-outline-variant/40 bg-surface-low section-y">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={areas.eyebrow} title={areas.title} description={areas.description} />
        </Reveal>

        <ol className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {areas.items.map((item, index) => {
            const meta = IMPROVEMENT_AREA_LABELS[item.area];
            return (
              <li key={item.area} className="h-full">
                <Reveal delay={index * 0.05} className="h-full">
                  <article className="flex h-full flex-col rounded-xl border border-outline-variant/50 bg-surface-lowest p-6 md:p-7">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                        {String(index + 1).padStart(2, "0")} · {meta.label}
                      </span>
                      <Link
                        href={meta.href}
                        className="text-xs font-semibold text-on-surface-variant transition-colors hover:text-primary"
                        aria-label={`Learn more about ${meta.label}`}
                      >
                        Learn more »
                      </Link>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-bold leading-snug tracking-tight text-on-surface md:text-[1.4rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-7 text-on-surface-variant md:text-[0.95rem]">
                      {item.description}
                    </p>
                    <p className="mt-5 flex gap-2 border-t border-outline-variant/40 pt-4 text-sm leading-6 text-on-surface">
                      <span className="shrink-0 font-semibold text-primary">Energy</span>
                      <span className="text-on-surface/80">{item.energy}</span>
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
