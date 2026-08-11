import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";

export function HomeIndustries() {
  const { industries } = landingContent;

  return (
    <section className="section-y bg-surface-low">
      <Container>
        <Reveal>
          <SectionBadge label={industries.badge} />
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {industries.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-on-surface/75 md:text-lg">
            {industries.description}
          </p>
        </Reveal>

        <div className="mt-12 divide-y divide-outline-variant/40 border-y border-outline-variant/40 md:mt-16">
          {industries.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.03}>
              <Link
                href={`/industries/${item.id}`}
                className="group grid gap-3 py-7 transition-colors hover:bg-surface/60 md:grid-cols-[minmax(0,0.35fr)_minmax(0,1fr)_auto] md:items-center md:gap-8 md:py-8"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                  {item.name}
                </h3>
                <p className="text-sm leading-7 text-on-surface/75 md:text-base">{item.description}</p>
                <span className="text-sm font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100 md:justify-self-end">
                  Learn more »
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href={industries.cta.href}
            className="inline-flex text-sm font-semibold text-primary transition-opacity hover:opacity-80"
          >
            {industries.cta.label} »
          </Link>
        </div>
      </Container>
    </section>
  );
}
