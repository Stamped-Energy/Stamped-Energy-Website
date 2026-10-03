import { BeforeYouBook } from "@/components/engagement/BeforeYouBook";
import { SolutionExampleCards } from "@/components/solutions/SolutionExampleCards";
import { SolutionsHero } from "@/components/solutions/SolutionsHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { solutionsContent } from "@/lib/content/solutions";

export function SolutionsHub() {
  const { hub, areas, energy, examplesNote } = solutionsContent;

  return (
    <>
      <SolutionsHero
        eyebrow={hub.eyebrow}
        title={hub.title}
        description={hub.description}
        heroImageSrc={hub.heroImageSrc}
        heroImageAlt={hub.heroImageAlt}
        heroObjectPosition="center 40%"
        primaryCta={hub.primaryCta}
        secondaryCta={hub.secondaryCta}
      />

      {areas.map((area, index) => {
        const number = String(index + 1).padStart(2, "0");
        const isAlt = index % 2 === 1;

        return (
          <section
            key={area.slug}
            id={area.slug}
            className={
              isAlt
                ? "border-b border-outline-variant/30 bg-surface-low section-y"
                : "border-b border-outline-variant/30 bg-surface section-y"
            }
          >
            <Container>
              <Reveal>
                <div className="grid gap-8 md:grid-cols-[5rem_1fr] md:gap-12 lg:gap-16">
                  <span
                    aria-hidden="true"
                    className="hidden font-display text-5xl font-bold tracking-tight text-outline-variant md:block md:text-6xl"
                  >
                    {number}
                  </span>
                  <div className="min-w-0">
                    <SectionBadge label={area.title} />
                    <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
                      {area.heading}
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-on-surface-variant md:text-base md:leading-8">
                      {area.intro}
                    </p>
                    <div className="mt-8">
                      <Button href={area.href} variant="outline">
                        {hub.areaCtaLabel}
                        <span className="sr-only"> about {area.title.toLowerCase()}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </Container>
          </section>
        );
      })}

      <section id="energy" className="border-b border-outline-variant/30 bg-secondary section-y text-on-secondary">
        <Container>
          <Reveal>
            <SectionBadge label={energy.eyebrow} alternate />
            <h2 className="mt-5 max-w-2xl font-display text-2xl font-bold tracking-tight md:text-3xl">
              {energy.heading}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-on-secondary/80 md:text-base md:leading-8">
              {energy.intro}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface section-y">
        <Container>
          <SolutionExampleCards label="Example" items={energy.examples} />
          <p className="mt-4 max-w-3xl text-xs leading-6 text-on-surface-variant">{examplesNote}</p>
        </Container>
      </section>
      <BeforeYouBook />
    </>
  );
}
