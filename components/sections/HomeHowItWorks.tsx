"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";
import { MotionSlot } from "@/components/ui/MotionSlot";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export function HomeHowItWorks() {
  const { homeHowItWorks } = landingContent;
  const [activeId, setActiveId] = useState(homeHowItWorks.steps[0]?.id ?? "data");
  const active =
    homeHowItWorks.steps.find((step) => step.id === activeId) ?? homeHowItWorks.steps[0];

  return (
    <section id="hiw" className="section-y scroll-mt-24 bg-surface-low">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex justify-center">
              <SectionBadge label={homeHowItWorks.badge} />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
              {homeHowItWorks.title}
            </h2>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)] lg:gap-14">
          <nav aria-label="How it works steps" className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-0 lg:overflow-visible">
            {homeHowItWorks.steps.map((step) => {
              const isActive = step.id === active.id;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveId(step.id)}
                  className={cn(
                    "flex min-w-[7.5rem] items-center gap-3 rounded-md px-3 py-3 text-left transition-colors lg:min-w-0 lg:rounded-none lg:border-b lg:border-outline-variant/35 lg:px-0 lg:py-5",
                    isActive
                      ? "bg-surface text-on-surface lg:bg-transparent"
                      : "text-on-surface/55 hover:text-on-surface",
                  )}
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-xs font-bold",
                      isActive ? "bg-primary text-on-primary" : "bg-on-surface/8 text-on-surface/70",
                    )}
                  >
                    {step.step}
                  </span>
                  <span className="text-sm font-semibold tracking-tight md:text-base">{step.label}</span>
                </button>
              );
            })}
          </nav>

          <Reveal key={active.id}>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-10">
              <div>
                <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-on-surface/80">{active.description}</p>
                <ul className="mt-6 space-y-3">
                  {active.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm leading-6 text-on-surface/75 md:text-base">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <MotionSlot label={`${active.label} visual`} aspectClassName="aspect-[4/3]" />
            </div>
          </Reveal>
        </div>

        {/* Mobile-friendly stacked fallback for SEO / no-JS: all steps listed below on small screens via sr-only? Keep interactive only; content is in landingContent for crawl via initial HTML of first step. */}
      </Container>
    </section>
  );
}
