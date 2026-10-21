"use client";

import { useRef } from "react";

import { useMotion } from "@/components/motion/MotionProvider";
import { ladderStages } from "@/components/motion-slots/LadderVisuals";
import { Container } from "@/components/ui/Container";
import { MotionSlot } from "@/components/ui/MotionSlot";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { landingContent } from "@/lib/content";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/motion/gsap";

/**
 * Three-step capability ladder (plan PR #16, section 15.3, item 4).
 * Desktop: the row pins and one scrubbed timeline plays the three stages left to right.
 * Mobile: stages stack and each plays once as it enters the viewport.
 * Reduced motion or no JS: the markup already shows the end state of every stage.
 */
const STAGE_HOLD = 0.35;
const END_HOLD = 0.08;
/** Scroll length for the whole pinned timeline (was 170%). */
const PIN_SCROLL_PERCENT = 150;

export function HomeLadder() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stagesRef = useRef<HTMLDivElement>(null);
  const { ladder } = landingContent;
  const { isReady, prefersReducedMotion } = useMotion();

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion) return;
      const section = sectionRef.current;
      if (!section) return;

      const stageRoots = gsap.utils.toArray<HTMLElement>("[data-ladder-stage]", section);
      const columns = gsap.utils.toArray<HTMLElement>("[data-ladder-col]", section);
      if (stageRoots.length !== ladderStages.length) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const rail = section.querySelector<HTMLElement>("[data-ladder-rail]");
        const nums = gsap.utils.toArray<HTMLElement>("[data-ladder-num]", section);
        const master = gsap.timeline({ defaults: { ease: "power2.out" } });

        if (rail) master.set(rail, { scaleX: 0 }, 0);
        master.set(columns.slice(1), { autoAlpha: 0.35 }, 0);

        stageRoots.forEach((root, i) => {
          const label = `stage-${i}`;
          master.addLabel(label);
          if (i > 0) master.to(columns[i], { autoAlpha: 1, duration: 0.3 }, label);
          if (nums[i]) {
            master.fromTo(
              nums[i],
              { backgroundColor: "rgba(25,28,26,0.08)", color: "rgba(25,28,26,0.7)" },
              { backgroundColor: "#F75440", color: "#ffffff", duration: 0.2 },
              label,
            );
          }
          master.add(ladderStages[i].build(root), label);
          if (rail) master.to(rail, { scaleX: (i + 1) / stageRoots.length, duration: 0.5, ease: "none" }, label);
          // Hold between stages; only a short settle after the last one so the pin releases soon after it finishes.
          master.to({}, { duration: i < stageRoots.length - 1 ? STAGE_HOLD : END_HOLD });
        });

        // Pin length scaled to the animation , minus the long final hold after the last stage.
        const oldDuration = master.duration() - END_HOLD + STAGE_HOLD;
        const endPercent = Math.round((PIN_SCROLL_PERCENT * master.duration()) / oldDuration);

        // Pin so the heading sits just under the nav and the eyebrow has scrolled away. If heading plus
        // cards plus step text cannot fit on a short screen, pin at the stage row instead.
        const pinTop = () => {
          const header = document.querySelector<HTMLElement>("header");
          return (header?.getBoundingClientRect().bottom ?? 72) + 12;
        };
        const anchorOffset = () => {
          const pin = pinRef.current;
          const heading = headingRef.current;
          const stages = stagesRef.current;
          if (!pin || !heading || !stages) return 0;
          const pinRect = pin.getBoundingClientRect();
          const headingTop = heading.getBoundingClientRect().top;
          const stagesRect = stages.getBoundingClientRect();
          const fitsWithHeading = stagesRect.bottom - headingTop <= window.innerHeight - pinTop() - 8;
          return (fitsWithHeading ? headingTop : stagesRect.top) - pinRect.top;
        };

        const trigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: () => `top+=${Math.round(anchorOffset())} top+=${Math.round(pinTop())}`,
          invalidateOnRefresh: true,
          end: `+=${endPercent}%`,
          pin: true,
          scrub: 0.6,
          animation: master,
        });

        return () => {
          trigger.kill();
          master.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        const triggers = stageRoots.map((root, i) => {
          const tl = ladderStages[i].build(root).pause(0);
          return ScrollTrigger.create({
            trigger: columns[i] ?? root,
            start: "top 78%",
            once: true,
            onEnter: () => tl.play(),
          });
        });
        return () => triggers.forEach((trigger) => trigger.kill());
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [isReady, prefersReducedMotion] },
  );

  return (
    <section ref={sectionRef} id="ladder" className="overflow-x-clip bg-surface">
      <div ref={pinRef}>
        <Container className="w-full py-16 md:py-20 lg:py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <SectionBadge label={ladder.badge} />
              <h2 ref={headingRef} className="mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl lg:text-[clamp(2.25rem,6.5vh,3rem)]">
                {ladder.title}
              </h2>
            </div>
            <p className="max-w-xs border-l-2 border-primary pl-4 text-base font-medium leading-7 text-on-surface lg:mb-2">
              {ladder.authorityLine}
            </p>
          </div>

          <div ref={stagesRef} className="relative mt-10 md:mt-12 lg:mt-[clamp(1.5rem,4vh,3rem)]">
            <div className="absolute inset-x-0 top-4 hidden h-px bg-outline-variant/50 lg:block" aria-hidden />
            <div
              data-ladder-rail
              className="absolute inset-x-0 top-4 hidden h-px origin-left bg-primary lg:block"
              aria-hidden
            />
            <ol className="grid gap-12 lg:grid-cols-3 lg:gap-8 xl:gap-10">
              {ladder.steps.map((step, index) => {
                const { Visual } = ladderStages[index];
                return (
                  <li key={step.id} data-ladder-col className="relative min-w-0">
                    <div className="relative flex items-center gap-3 bg-surface pr-3 lg:inline-flex">
                      <span
                        data-ladder-num
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-sm bg-primary text-xs font-bold text-on-primary"
                      >
                        {step.step}
                      </span>
                      <span className="font-mono text-[0.68rem] font-medium uppercase tracking-[0.12em] text-on-surface">
                        {step.label}
                      </span>
                    </div>
                    <MotionSlot label={`${step.label} visual`} aspectClassName="aspect-[5/4] w-full lg:aspect-auto lg:h-[clamp(9rem,calc(100vh-24rem),20rem)]" className="mt-5 lg:mt-4">
                      <Visual />
                    </MotionSlot>
                    <h3 className="mt-6 lg:mt-4 font-display text-xl font-bold tracking-tight md:text-2xl">{step.title}</h3>
                    <p className="mt-3 max-w-md text-base leading-7 lg:mt-2 lg:leading-6 text-on-surface/80">{step.description}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
