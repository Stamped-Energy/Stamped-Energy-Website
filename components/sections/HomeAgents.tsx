import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";

/** Optional compact agents strip (plan PR #16, section 15.5, Layout B). Toggle with landingContent.agents.enabled. */
export function HomeAgents() {
  const { agents } = landingContent;
  if (!agents.enabled) return null;

  return (
    <section className="border-t border-outline-variant/40 bg-surface-low py-16 md:py-20">
      <Container>
        <Reveal>
          <SectionBadge label={agents.badge} />
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {agents.title}
          </h2>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {agents.cards.map((card, index) => (
            <li key={card.id} className="min-w-0">
              <Reveal delay={index * 0.04} className="h-full">
                <article className="flex h-full flex-col rounded-lg border border-outline-variant/50 bg-surface p-5">
                  <span className="self-start rounded-full border border-primary/40 px-2.5 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.12em] text-primary">
                    {agents.statusLabel}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold leading-snug tracking-tight">{card.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-on-surface/75">{card.text}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <p className="mt-8 max-w-3xl text-base leading-7 text-on-surface/80">{agents.moreLine}</p>
        </Reveal>
      </Container>
    </section>
  );
}
