import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";

export function HomeImproveLoop() {
  const { workflow } = landingContent;

  return (
    <section className="bg-surface section-y">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {workflow.eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            {workflow.title}
          </h2>
        </Reveal>

        {/* Mobile: vertical list */}
        <Reveal className="mt-8 md:hidden">
          <ol className="divide-y divide-outline-variant/40 border-y border-outline-variant/40">
            {workflow.steps.map((step, index) => (
              <li key={step.id} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4">
                <p className="font-display text-xs font-extrabold text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-on-surface">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-on-surface-variant">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* Desktop: horizontal flow */}
        <Reveal className="mt-10 hidden md:block">
          <ol className="flex flex-nowrap items-stretch gap-0">
            {workflow.steps.map((step, index) => {
              const isLast = index === workflow.steps.length - 1;
              return (
                <li key={step.id} className="flex min-w-0 flex-1 items-stretch">
                  <div className="flex flex-1 flex-col border border-outline-variant/40 px-4 py-4">
                    <p className="font-display text-xs font-extrabold text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-sm font-bold text-on-surface">{step.title}</h3>
                    <p className="mt-1.5 text-xs leading-5 text-on-surface-variant">
                      {step.description}
                    </p>
                  </div>
                  {!isLast ? (
                    <span aria-hidden className="flex items-center px-1 text-primary">
                      →
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </Reveal>

        <Reveal className="mt-8">
          <p className="text-sm text-on-surface-variant">
            Improve based on decisions taken and verified outcomes.{" "}
            <Link
              href="/platform"
              className="font-semibold text-primary underline-offset-2 hover:underline"
            >
              Full Platform walkthrough
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
