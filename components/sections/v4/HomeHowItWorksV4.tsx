"use client";

import { useState } from "react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProductFrame } from "@/components/ui/ProductFrame";
import { Section } from "@/components/ui/Section";
import { productsContent } from "@/lib/content/products";
import { cn } from "@/lib/utils";

const STAGE_IMAGES: Record<string, { src: string; alt: string }> = {
  connect: {
    src: "/images/product/v4/data-health.png",
    alt: "Data health view showing connected plant records",
  },
  watch: {
    src: "/images/product/v4/lot-at-risk.png",
    alt: "Lot at risk alert while a batch can still be saved",
  },
  explain: {
    src: "/images/product/v4/investigation.png",
    alt: "Investigation view ranking likely causes",
  },
  "test-approve": {
    src: "/images/product/v4/proposal.png",
    alt: "Proposal awaiting named-role approval",
  },
  prove: {
    src: "/images/product/v4/hero-owner.png",
    alt: "Owner view proving gains against matched batches",
  },
};

export function HomeHowItWorksV4() {
  const { howItWorks } = productsContent;
  const [activeId, setActiveId] = useState<string>(howItWorks.stages[0]?.id ?? "connect");
  const activeStage = howItWorks.stages.find((s) => s.id === activeId) ?? howItWorks.stages[0];
  const frame = STAGE_IMAGES[activeId] ?? STAGE_IMAGES.connect;

  return (
    <Section tone="dark" id="hiw">
      <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
        <Eyebrow tone="dark">How it works</Eyebrow>
        <h2 className="mt-4 font-display text-[length:var(--type-h2)] font-semibold tracking-[-0.025em] text-balance">
          {howItWorks.title}
        </h2>
      </div>

      <div className="mt-12 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
        <ol className="space-y-2 lg:col-span-5">
          {howItWorks.stages.map((stage) => {
            const isActive = stage.id === activeId;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(stage.id)}
                  aria-pressed={isActive}
                  className={cn(
                    "w-full rounded-[var(--radius-card)] border px-4 py-4 text-left transition-colors",
                    isActive
                      ? "border-white/20 bg-white/8"
                      : "border-transparent hover:bg-white/5",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold",
                        isActive ? "bg-primary text-white" : "bg-white/10 text-white/60",
                      )}
                    >
                      {stage.step}
                    </span>
                    <div>
                      <p
                        className={cn(
                          "font-semibold tracking-tight",
                          isActive ? "text-inverse-on-surface" : "text-white/70",
                        )}
                      >
                        {stage.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-white/55">{stage.description}</p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="lg:col-span-7">
          <ProductFrame
            src={frame.src}
            alt={frame.alt}
            title={activeStage ? `Stage ${activeStage.step} · ${activeStage.title}` : "How it works"}
            glow
          />
        </div>
      </div>

      <p className="mt-12 text-center text-sm font-medium text-white/60 lg:text-left">
        {howItWorks.close}
      </p>
    </Section>
  );
}
