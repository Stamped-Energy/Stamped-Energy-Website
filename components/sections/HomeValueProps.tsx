import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { landingContent } from "@/lib/content";

export function HomeValueProps() {
  const { valueProps } = landingContent;

  return (
    <section className="border-b border-outline-variant/30 bg-surface section-y">
      <Container>
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            {valueProps.eyebrow}
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-2xl font-bold text-on-surface md:text-3xl">
            {valueProps.title}
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-start md:gap-16">
          {valueProps.items.map((item, index) => (
            <Reveal key={item.id} className={index === 1 ? "md:pt-12" : undefined}>
              <h3 className="font-display text-xl font-bold text-on-surface md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-on-surface-variant md:text-base">
                {item.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
