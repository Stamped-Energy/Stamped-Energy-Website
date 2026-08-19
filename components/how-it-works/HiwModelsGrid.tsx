import type { ReactNode } from "react";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { howItWorksContent } from "@/lib/content";

function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" stroke="currentColor" strokeWidth="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function IconGauge() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
      <path
        d="M5 16.5a8 8 0 1 1 14 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M12 16.5 L16.5 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="16.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M12 3.8v2.2M12 18v2.2M3.8 12h2.2M18 12h2.2M6.2 6.2l1.6 1.6M16.2 16.2l1.6 1.6M17.8 6.2l-1.6 1.6M7.8 16.2l-1.6 1.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconPlant() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" aria-hidden>
      <path d="M5 20.5h14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7.5 20.5V12h4v8.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12.5 20.5V9h4.5v11.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.2 9.2h2.6M13.2 6.5h3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

const MODEL_ICONS: Record<string, ReactNode> = {
  "energy-markets": <IconGrid />,
  efficiency: <IconGauge />,
  equipment: <IconGear />,
  "production-context": <IconPlant />,
};

export function HiwModelsGrid() {
  const { models } = howItWorksContent;

  return (
    <section id="models" className="bg-secondary py-[3.6rem] text-on-secondary md:py-[5.4rem]">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={models.eyebrow}
            title={models.title}
            description={models.description}
            align="left"
            dark
          />
        </Reveal>

        <div className="mt-10 grid border-t border-l border-on-secondary/20 md:mt-12 md:grid-cols-2">
          {models.items.map((item) => (
            <article
              key={item.id}
              id={item.id}
              className="border-b border-r border-on-secondary/20 px-6 py-8 md:px-8 md:py-10"
            >
              <div className="text-on-secondary/90">{MODEL_ICONS[item.id]}</div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-7 text-on-secondary/80 md:text-[15px] md:leading-7">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
