import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";

export function HomeOutcomesBand() {
  const { outcomes } = landingContent;

  return (
    <section className="border-b border-outline-variant/30 bg-surface section-y">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {outcomes.eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            {outcomes.title}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
            {outcomes.disclaimer}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
          {outcomes.homeStats.map((stat) => (
            <Reveal key={stat.id} className="h-full">
              <div className="flex h-full flex-col border border-outline-variant/50 bg-surface-lowest p-6 md:p-8">
                <p className="font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-3 text-sm font-semibold text-on-surface md:text-base">{stat.label}</p>
                {stat.detail ? (
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">{stat.detail}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
