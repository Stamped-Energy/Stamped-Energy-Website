import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { solutionsContent } from "@/lib/content/solutions";

export function HomeSolutionsEntry() {
  const { hub } = solutionsContent;

  return (
    <section className="bg-surface-low section-y">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Solutions</p>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            Two pillars. One Stamped Intelligence product.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-8">
          {hub.pillars.map((pillar, index) => (
            <Reveal key={pillar.slug}>
              <Link
                href={pillar.href}
                className={[
                  "group flex h-full flex-col border border-outline-variant/50 bg-surface p-6 transition-colors md:p-8",
                  "hover:border-primary/50",
                  index === 1 ? "md:mt-8" : "",
                ].join(" ")}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  {pillar.shortTitle}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-on-surface md:text-2xl">
                  {pillar.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-on-surface-variant">
                  {pillar.description}
                </p>
                <span className="mt-6 text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                  Explore
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <Link
            href="/solutions"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            All solutions
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
