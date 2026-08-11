import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";

export function HomeImpact() {
  const { impact } = landingContent;

  return (
    <section className="section-y bg-secondary text-on-secondary">
      <Container>
        <Reveal>
          <SectionBadge label={impact.badge} alternate />
          <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            {impact.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-on-secondary/75 md:text-lg">
            {impact.description}
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-6 text-on-secondary/50 md:text-sm">
            {impact.disclaimer}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-10">
          {impact.items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.04}>
              <article className="border-t border-on-secondary/15 pt-6">
                <p className="font-display text-4xl font-bold tracking-tight text-inverse-primary md:text-5xl">
                  {item.value}
                </p>
                <p className="mt-4 text-base font-semibold tracking-tight">{item.label}</p>
                {item.detail ? (
                  <p className="mt-2 text-sm leading-6 text-on-secondary/65">{item.detail}</p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
