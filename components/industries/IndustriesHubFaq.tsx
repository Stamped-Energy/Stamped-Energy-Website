import { Container } from "@/components/ui/Container";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { industriesContent } from "@/lib/content";

export function IndustriesHubFaq() {
  const { faq } = industriesContent.hub;

  return (
    <section className="bg-surface section-y">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <SectionBadge label={faq.eyebrow} />
          </div>
          <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
            {faq.title}
          </h2>
        </div>
        <div className="mx-auto mt-8 max-w-3xl divide-y divide-outline-variant/40 border-y border-outline-variant/40 md:mt-12">
          {faq.items.map((item) => (
            <details
              key={item.id}
              className="group px-1 py-4 text-left md:px-2 md:py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-on-surface outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:text-lg">
                {item.question}
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 shrink-0 items-center justify-center text-lg leading-none text-primary transition-transform duration-300 group-open:rotate-45"
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
