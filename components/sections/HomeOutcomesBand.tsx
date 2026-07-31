import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";

const HOME_OUTCOME_IDS = ["bill-reduction", "md-reduction"] as const;

export function HomeOutcomesBand() {
  const { outcomes } = landingContent;
  const stats = outcomes.stats.filter((stat) =>
    (HOME_OUTCOME_IDS as readonly string[]).includes(stat.id),
  );

  return (
    <section className="border-b border-outline-variant/30 bg-surface section-y">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {outcomes.eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            Indicative outcomes plants care about
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-on-surface-variant md:text-base">
            {outcomes.disclaimer}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
          {stats.map((stat) => (
            <Reveal key={stat.id}>
              <p className="font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm font-semibold text-on-surface md:text-base">{stat.label}</p>
              {stat.detail ? (
                <p className="mt-2 text-sm leading-6 text-on-surface-variant">{stat.detail}</p>
              ) : null}
            </Reveal>
          ))}
          <Reveal>
            <p className="font-display text-4xl font-extrabold tracking-tight text-on-surface md:text-5xl">
              Weeks
            </p>
            <p className="mt-3 text-sm font-semibold text-on-surface md:text-base">
              First prescriptions on your plant
            </p>
            <p className="mt-2 text-sm leading-6 text-on-surface-variant">
              Real-time intelligence on meters and SCADA you already run. No hardware retrofit.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
