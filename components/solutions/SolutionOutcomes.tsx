import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { SolutionPillarPage } from "@/lib/content/solutions";

type SolutionOutcomesProps = {
  outcomes: SolutionPillarPage["outcomes"];
};

export function SolutionOutcomes({ outcomes }: SolutionOutcomesProps) {
  return (
    <section className="bg-secondary section-y text-on-secondary">
      <Container>
        <Reveal>
          <SectionBadge label={outcomes.eyebrow} alternate />
          <h2 className="mt-5 max-w-3xl font-display text-2xl font-bold tracking-tight text-on-secondary md:text-4xl">
            {outcomes.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-on-secondary/75 md:text-base">
            {outcomes.intro}
          </p>
          <p className="mt-3 max-w-2xl text-xs leading-6 text-on-secondary/50 md:text-sm">
            {outcomes.disclaimer}
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-on-secondary/15 bg-on-secondary/10 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.items.map((item) => (
            <li
              key={item.id}
              className="bg-secondary p-6 sm:p-7 md:p-8"
            >
              <Reveal>
                <p className="font-display text-3xl font-extrabold tracking-tight text-on-secondary md:text-4xl">
                  {item.value}
                </p>
                <h3 className="mt-3 font-display text-base font-bold text-on-secondary md:text-lg">
                  {item.label}
                </h3>
                <p className="mt-2 text-sm leading-6 text-on-secondary/65">{item.detail}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
