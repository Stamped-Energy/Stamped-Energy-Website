import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { industriesContent } from "@/lib/content";

export function IndustriesHubThesis() {
  const { thesis } = industriesContent.hub;

  return (
    <Section tone="light">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Eyebrow>{thesis.eyebrow}</Eyebrow>
          <h2 className="mt-5 max-w-xl font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-balance">
            {thesis.title}
          </h2>
        </div>
        <p className="max-w-2xl text-base leading-7 text-on-surface-variant md:leading-8 lg:col-span-7 lg:pt-12">
          {thesis.body}
        </p>
      </div>
    </Section>
  );
}
