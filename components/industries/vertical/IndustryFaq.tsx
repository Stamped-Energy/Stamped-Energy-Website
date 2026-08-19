import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVerticalPage, type VerticalSlug } from "@/lib/content";

type IndustryFaqProps = {
  slug: VerticalSlug;
};

export function IndustryFaq({ slug }: IndustryFaqProps) {
  const page = getVerticalPage(slug);

  if (!page || page.faq.length === 0) {
    return null;
  }

  return (
    <section className="bg-surface section-y">
      <Container>
        <Reveal className="mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Common questions"
            align="center"
            className="mx-auto"
          />
        </Reveal>

        <div className="mx-auto mt-8 max-w-3xl space-y-3 md:mt-12">
          {page.faq.map((item) => (
            <details
              key={item.id}
              className="group border border-outline-variant/50 bg-surface-lowest px-5 py-4 text-left md:px-6 md:py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-on-surface outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:text-lg">
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-outline-variant/60 text-primary transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-on-surface-variant">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
