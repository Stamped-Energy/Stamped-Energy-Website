import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { solutionsContent } from "@/lib/content/solutions";

export function SolutionsHub() {
  const { hub } = solutionsContent;

  return (
    <>
      <section className="page-hero border-b border-outline-variant/40 bg-surface">
        <Container>
          <div className="max-w-3xl pt-4 pb-2 md:pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {hub.eyebrow}
            </p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight text-on-surface md:text-4xl lg:text-[2.75rem]">
              {hub.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant md:text-base">
              {hub.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={hub.primaryCta.href} variant="primary">
                {hub.primaryCta.label}
              </Button>
              <Button href={hub.secondaryCta.href} variant="outline">
                {hub.secondaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-outline-variant/30 bg-surface py-10 md:py-14">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-start md:gap-14">
            {hub.valueProps.map((prop, index) => (
              <div
                key={prop.id}
                className={index === 1 ? "md:border-l md:border-outline-variant/40 md:pl-14" : ""}
              >
                <h2 className="font-display text-xl font-bold text-on-surface md:text-2xl">
                  {prop.title}
                </h2>
                <p className="mt-2 max-w-md text-sm leading-7 text-on-surface-variant md:text-base">
                  {prop.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-y bg-surface">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Two pillars
          </p>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            Choose the outcome. Same Stamped Intelligence stack.
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
            {hub.pillars.map((pillar, index) => (
              <Link
                key={pillar.slug}
                href={pillar.href}
                className={[
                  "group block border border-outline-variant/50 p-6 transition-colors md:p-8",
                  "hover:border-primary/50 hover:bg-surface-low",
                  index === 0 ? "md:min-h-[22rem]" : "md:translate-y-8 md:min-h-[20rem]",
                ].join(" ")}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {pillar.shortTitle}
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold text-on-surface md:text-3xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-on-surface-variant md:text-base">
                  {pillar.description}
                </p>
                <p className="mt-4 text-sm font-medium text-on-surface">{pillar.outcome}</p>
                <span className="mt-6 inline-block text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                  Open pillar
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-12 max-w-2xl text-sm text-on-surface-variant md:mt-16">
            {hub.sharedNote}
          </p>
        </Container>
      </section>
    </>
  );
}
