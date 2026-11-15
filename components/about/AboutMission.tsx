import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";

export function AboutMission() {
  return (
    <Section tone="dark">
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow tone="dark" className="justify-center">
          Mission
        </Eyebrow>
        <p className="mt-5 font-display text-[length:var(--type-display-l)] font-semibold tracking-[-0.03em] text-balance">
          {productsContent.mission}
        </p>
      </div>
    </Section>
  );
}
