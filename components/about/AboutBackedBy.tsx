import { BadgeStrip } from "@/components/ui/BadgeStrip";
import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";

export function AboutBackedBy() {
  const { trustStripLabel, partners } = productsContent;

  return (
    <Section tone="muted">
      <BadgeStrip label={trustStripLabel} partners={partners} tone="light" />
    </Section>
  );
}
