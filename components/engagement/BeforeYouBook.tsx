import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { BEFORE_YOU_BOOK } from "@/lib/content/engagement";
import { siteConfig } from "@/lib/content/site";
import { cn } from "@/lib/utils";

type BeforeYouBookProps = {
  className?: string;
  /** Hide the CTA row when the page already ends on the form (contact). */
  showCta?: boolean;
};

/** Short, honest answers to the questions owners ask before booking a survey. */
export function BeforeYouBook({ className, showCta = true }: BeforeYouBookProps) {
  const { eyebrow, title, items } = BEFORE_YOU_BOOK;

  return (
    <section className={cn("border-t border-outline-variant/30 bg-surface-low section-y", className)}>
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <SectionBadge label={eyebrow} />
            <h2 className="mt-5 max-w-sm font-display text-2xl font-bold tracking-tight text-balance text-on-surface md:text-3xl">
              {title}
            </h2>
            {showCta ? (
              <div className="mt-6 hidden lg:block">
                <Button href={siteConfig.primaryCta.href} variant="primary">
                  {siteConfig.primaryCta.label}
                </Button>
              </div>
            ) : null}
          </Reveal>
          <dl className="grid gap-px overflow-hidden rounded-lg border border-outline-variant/50 bg-outline-variant/40 sm:grid-cols-2 lg:col-span-8">
            {items.map((item) => (
              <div key={item.id} className="bg-surface-lowest p-5 md:p-6">
                <dt className="font-display text-base font-bold text-on-surface">{item.question}</dt>
                <dd className="mt-2 text-sm leading-6 text-on-surface-variant">{item.answer}</dd>
              </div>
            ))}
          </dl>
          {showCta ? (
            <div className="lg:hidden">
              <Button href={siteConfig.primaryCta.href} variant="primary" className="w-full sm:w-auto">
                {siteConfig.primaryCta.label}
              </Button>
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
