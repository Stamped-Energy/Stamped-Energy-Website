"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

import { AgentJobGroups } from "@/components/agents/AgentJobGroups";
import { SampleFindingCard } from "@/components/agents/SampleFindingCard";
import { useMotion } from "@/components/motion/MotionProvider";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { agentAreas, agentsSection } from "@/lib/content/agents";
import { landingContent } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/motion/gsap";
import { cn } from "@/lib/utils";

/**
 * Homepage agents picker: one tab per area, jobs grouped by the three steps, and a sample finding card.
 * Autoplays while in view and stops for good on the first click, tap or key press. Toggle with landingContent.agents.enabled.
 */
export function HomeAgents() {
  const enabled = landingContent.agents.enabled;
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [inView, setInView] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const { isReady, prefersReducedMotion } = useMotion();
  // Autoplay only on desktop: on phones a tab switch mid-read swaps a tall panel and jumps the page.
  const canAutoplay = autoplay && isReady && !prefersReducedMotion && isDesktop;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const stopAutoplay = useCallback(() => setAutoplay(false), []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Progress underline doubles as the autoplay timer.
  useEffect(() => {
    const bars = progressRef.current;
    bars.forEach((bar, i) => bar && gsap.set(bar, { scaleX: i === active && !canAutoplay ? 1 : 0 }));
    const bar = bars[active];
    if (!bar || !canAutoplay || !inView) return;
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: agentsSection.autoplaySeconds,
        ease: "none",
        onComplete: () => setActive((current) => (current + 1) % agentAreas.length),
      },
    );
    return () => {
      tween.kill();
    };
  }, [active, canAutoplay, inView]);

  // Panel content builds in on each change.
  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;
      const tl = gsap.timeline();
      tl.fromTo("[data-agent-job]", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" });
      tl.fromTo(
        "[data-agent-card-row]",
        { autoAlpha: 0, y: 8 },
        { autoAlpha: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" },
        0.1,
      );
    },
    { scope: panelRef, dependencies: [active, isReady, prefersReducedMotion] },
  );

  const select = (index: number) => {
    stopAutoplay();
    setActive(index);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = agentAreas.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  if (!enabled) return null;
  const area = agentAreas[active];

  return (
    <section
      ref={sectionRef}
      id="agents"
      className="border-t border-outline-variant/40 bg-surface-low py-16 md:py-24"
      onPointerDown={stopAutoplay}
    >
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionBadge label={agentsSection.badge} />
              <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance md:text-[2.6rem] md:leading-[1.1]">
                {agentsSection.title}
              </h2>
            </div>
            <p className="max-w-xl text-base leading-7 text-on-surface-variant lg:col-span-5">{agentsSection.intro}</p>
          </div>
        </Reveal>

        <div
          role="tablist"
          aria-label={agentsSection.title}
          onKeyDown={onKeyDown}
          className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:mt-12 lg:pb-1 lg:grid lg:grid-cols-4 lg:gap-0 lg:overflow-visible lg:border-b lg:border-outline-variant/50"
        >
          {agentAreas.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.slug}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`agents-tab-${item.slug}`}
                aria-selected={selected}
                aria-controls={`agents-panel-${item.slug}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(index)}
                className={cn(
                  "relative flex min-h-12 min-w-0 flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-md border px-3 py-2 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:min-h-0 lg:flex-nowrap lg:justify-start lg:rounded-none lg:border-0 lg:px-1 lg:pb-4 lg:pt-1 lg:text-left",
                  selected
                    ? "border-primary bg-secondary text-on-secondary lg:border-0 lg:bg-transparent lg:text-on-surface"
                    : "border-outline-variant/60 text-on-surface-variant hover:text-on-surface",
                )}
              >
                <span className="font-display text-base font-bold tracking-tight lg:text-xl">{item.label}</span>
                {item.comingSoon ? (
                  <span
                    className={cn(
                      "whitespace-nowrap rounded-full border px-1.5 py-0.5 lg:px-2 font-mono text-[0.55rem] font-medium uppercase tracking-[0.12em]",
                      selected ? "border-current lg:border-outline-variant" : "border-outline-variant",
                    )}
                  >
                    {agentsSection.comingSoonLabel}
                  </span>
                ) : null}
                <span className={cn("absolute inset-x-0 -bottom-px hidden h-0.5 lg:block", selected ? "bg-on-surface/15" : "")} aria-hidden>
                  <span
                    ref={(node) => {
                      if (node) progressRef.current[index] = node;
                    }}
                    className="agent-tab-progress block h-full w-full bg-primary"
                    style={selected ? undefined : { transform: "scaleX(0)" }}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <div
          ref={panelRef}
          role="tabpanel"
          id={`agents-panel-${area.slug}`}
          aria-labelledby={`agents-tab-${area.slug}`}
          className="mt-6 grid gap-8 lg:mt-10 lg:grid-cols-12 lg:gap-12"
        >
          <SampleFindingCard
            sample={area.homeSample}
            palette={area.slug}
            className="lg:order-2 lg:col-span-5 lg:self-start"
          />
          <div className="lg:order-1 lg:col-span-7">
            <AgentJobGroups area={area} />
            {area.href && !area.comingSoon ? (
              <Link
                href={area.href}
                className="mt-6 inline-flex text-sm font-semibold text-primary hover:underline"
              >
                {agentsSection.areaLinkLabel} {area.label.toLowerCase()} »
              </Link>
            ) : null}
          </div>
        </div>

        {/* Every area stays in the markup for crawlers and no-JS readers. */}
        <div className="sr-only">
          {agentAreas
            .filter((_, index) => index !== active)
            .map((item) => (
              <div key={item.slug}>
                <h3>{item.label}</h3>
                <ul>
                  {item.groups.flatMap((group) => group.jobs).map((job) => (
                    <li key={job.id}>
                      {job.name}. {job.line}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
}
