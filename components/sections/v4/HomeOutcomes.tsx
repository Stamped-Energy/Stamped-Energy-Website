import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { StatBand } from "@/components/ui/StatBand";
import { productsContent } from "@/lib/content/products";

export function HomeOutcomes() {
  const { outcomes } = productsContent;
  return (
    <Section tone="light">
      <Reveal>
        <StatBand
          stats={outcomes.items.map((s) => ({
            prefix: s.prefix,
            value: s.value,
            label: s.label,
          }))}
          caption={outcomes.caption}
          note={outcomes.note}
        />
      </Reveal>
    </Section>
  );
}
