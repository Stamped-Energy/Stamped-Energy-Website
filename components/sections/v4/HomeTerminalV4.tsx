import { Button } from "@/components/ui/Button";
import { FaqSection } from "@/components/ui/FaqSection";
import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";

export function HomeTerminalV4() {
  const { faq, closingCta } = productsContent;

  return (
    <>
      <FaqSection items={faq.items} title={faq.title} className="bg-surface" />
      <Section tone="dark" className="!py-16 md:!py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-balance">
            {closingCta.title}
          </h2>
          <div className="mt-9 flex justify-center">
            <Button href={closingCta.primaryCta.href} variant="on-dark" size="lg">
              {closingCta.primaryCta.label}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
