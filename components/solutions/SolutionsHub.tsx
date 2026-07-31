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

      <section className="section-y bg-surface">
        <Container>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            Choose a pillar
          </p>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            Two separate solution pages. One product.
          </h2>

          <ul className="mt-10 divide-y divide-outline-variant/40 border-y border-outline-variant/40">
            {hub.pillars.map((pillar) => (
              <li key={pillar.slug}>
                <Link
                  href={pillar.href}
                  className="group flex flex-col gap-2 py-8 transition-colors hover:bg-surface-low md:flex-row md:items-baseline md:justify-between md:gap-10 md:px-2"
                >
                  <div className="max-w-xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                      {pillar.shortTitle}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-on-surface md:text-2xl">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-on-surface-variant md:text-base">
                      {pillar.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                    Open page
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-10 max-w-2xl text-sm text-on-surface-variant">{hub.sharedNote}</p>
        </Container>
      </section>
    </>
  );
}
