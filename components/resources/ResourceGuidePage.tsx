import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { ResourceGuideContent } from "@/lib/content/resource-guides";
import { cn } from "@/lib/utils";

type ResourceGuidePageProps = {
  guide: ResourceGuideContent;
};

export function ResourceGuidePage({ guide }: ResourceGuidePageProps) {
  const primaryCta = cn(
    "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-primary bg-primary px-6 text-sm font-semibold uppercase tracking-[0.06em] text-on-primary",
    "transition-[transform,filter] duration-200 hover:-translate-y-0.5 hover:brightness-[1.04]",
  );
  const secondaryCta = cn(
    "inline-flex h-12 items-center justify-center rounded-md border border-on-surface/25 bg-transparent px-6 text-sm font-semibold text-on-surface",
    "transition-colors duration-200 hover:border-on-surface/45 hover:bg-on-surface/5",
  );

  return (
    <>
      <section className="page-hero relative overflow-hidden bg-secondary">
        <Container className="relative z-10 py-16 md:py-24">
          <Reveal>
            <SectionBadge label={guide.eyebrow} alternate />
            <h1 className="mt-5 max-w-3xl font-display text-3xl font-extrabold leading-tight tracking-tight text-on-secondary md:text-4xl lg:text-[2.5rem]">
              {guide.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-on-secondary/85 md:text-base">
              {guide.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={guide.primaryCta.href} className={primaryCta}>
                {guide.primaryCta.label}
                <span aria-hidden>»</span>
              </Link>
              <Link
                href={guide.secondaryCta.href}
                className={cn(secondaryCta, "border-on-secondary/30 text-on-secondary hover:bg-on-secondary/10")}
              >
                {guide.secondaryCta.label}
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface section-y">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12 md:space-y-16">
            {guide.sections.map((section) => (
              <Reveal key={section.id}>
                <h2 className="font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="text-sm leading-7 text-on-surface-variant md:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {guide.faq.length > 0 ? (
        <section className="bg-surface-low section-y">
          <Container>
            <Reveal className="mx-auto">
              <SectionBadge label="FAQ" />
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                Common questions
              </h2>
            </Reveal>
            <div className="mx-auto mt-8 max-w-3xl space-y-3 md:mt-12">
              {guide.faq.map((item) => (
                <details
                  key={item.id}
                  className="group border border-outline-variant/50 bg-surface-lowest px-5 py-4 text-left md:px-6 md:py-5 [&_summary::-webkit-details-marker]:hidden"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-on-surface outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:text-lg">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-outline-variant/60 text-primary transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.answer}</p>
                </details>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="border-t border-outline-variant/40 bg-surface section-y">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
              See whether a pilot is justified for your plant
            </h2>
            <p className="mt-3 text-sm leading-7 text-on-surface-variant">
              No rip-and-replace. Read-only on the stack you already run.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={guide.primaryCta.href} className={primaryCta}>
                {guide.primaryCta.label}
                <span aria-hidden>»</span>
              </Link>
              <Link href="/case-studies" className={secondaryCta}>
                Case studies & blogs
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
