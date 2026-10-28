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
const STAGE_HOLD = 0.28;
const END_HOLD = 0.06;
/** Scroll length for the whole pinned timeline (was 170%, then 150%). */
const PIN_SCROLL_PERCENT = 140;
/** Card height as a fraction of card width (~16:10 to 4:3). */
const CARD_HEIGHT_RATIO = 0.7;
/** Soft rem ceiling so tall monitors do not stretch the visuals. */
const CARD_MAX_REM = 22;
const CARD_MIN_PX = 160;
/** Share of leftover viewport space placed above the block (rest goes below). */
const TOP_SPACE_SHARE = 0.4;
/** Cap on how far the heading may drift below the nav. */
const MAX_TOP_PAD_VH = 0.08;
const MAX_TOP_PAD_PX = 72;

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
        const slots = gsap.utils.toArray<HTMLElement>("[data-motion-slot]", section);
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

        // Pin length scaled to the animation, minus the long final hold after the last stage.
        const oldDuration = master.duration() - END_HOLD + STAGE_HOLD;
        const endPercent = Math.round((PIN_SCROLL_PERCENT * master.duration()) / oldDuration);

        // Nav clearance for the pinned heading. Extra top breathing room is applied by
        // shifting this target down (pinHeadingLift) so padding is not eaten by the pin.
        const pinTop = () => {
          const header = document.querySelector<HTMLElement>("header");
          return (header?.getBoundingClientRect().bottom ?? 72) + 12;
        };
        // How far below pinTop the heading should sit while pinned (leftover * 40%, capped).
        let pinHeadingLift = 0;

        const anchorOffset = () => {
          const pin = pinRef.current;
          const heading = headingRef.current;
          const stages = stagesRef.current;
          if (!pin || !heading || !stages) return 0;
          const pinRect = pin.getBoundingClientRect();
          const headingTop = heading.getBoundingClientRect().top;
          const stagesRect = stages.getBoundingClientRect();
          const available = window.innerHeight - pinTop() - pinHeadingLift;
          const fitsWithHeading = stagesRect.bottom - headingTop <= available - 8;
          return (fitsWithHeading ? headingTop : stagesRect.top) - pinRect.top;
        };

        /**
         * Moderate card growth (aspect + rem cap), then share leftover viewport
         * ~40% above / ~60% below by lifting the pin target — heading stays near
         * the nav on short screens (lift capped) and tall screens get breathing room
         * without over-stretching the cards.
         */
        const layoutPinnedBlock = () => {
          const heading = headingRef.current;
          const stages = stagesRef.current;
          const col = columns[0];
          if (!heading || !stages || !col || !slots.length) return;

          const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
          const cardMaxPx = CARD_MAX_REM * rem;
          const colWidth = col.getBoundingClientRect().width || slots[0].getBoundingClientRect().width;
          const cardH = Math.round(
            Math.max(CARD_MIN_PX, Math.min(cardMaxPx, colWidth * CARD_HEIGHT_RATIO)),
          );
          slots.forEach((slot) => {
            slot.style.height = `${cardH}px`;
          });

          const headerRow = heading.closest("div.flex");
          const headerEl = headerRow ?? heading;
          const headerH = Math.max(
            heading.getBoundingClientRect().height,
            headerEl.getBoundingClientRect().bottom - heading.getBoundingClientRect().top,
          );
          const headerBottom = headerEl.getBoundingClientRect().bottom;
          const label = col.querySelector<HTMLElement>(":scope > div.relative");
          const labelH = label?.getBoundingClientRect().height ?? 32;

          let below = 0;
          columns.forEach((column) => {
            const title = column.querySelector("h3");
            const body = title?.nextElementSibling as HTMLElement | null;
            const titleStyles = title ? getComputedStyle(title) : null;
            const bodyStyles = body ? getComputedStyle(body) : null;
            const colBelow =
              (title ? title.getBoundingClientRect().height + parseFloat(titleStyles?.marginTop || "0") : 40) +
              (body ? body.getBoundingClientRect().height + parseFloat(bodyStyles?.marginTop || "0") : 72);
            below = Math.max(below, colBelow);
          });

          const stagesMt = Math.max(0, stages.getBoundingClientRect().top - headerBottom);
          const slotMt = 16;
          const contentH = headerH + stagesMt + labelH + slotMt + cardH + below;
          const available = window.innerHeight - pinTop();
          const leftover = Math.max(0, available - contentH);
          const maxTopPad = Math.min(MAX_TOP_PAD_PX, window.innerHeight * MAX_TOP_PAD_VH);
          pinHeadingLift = Math.round(Math.min(leftover * TOP_SPACE_SHARE, maxTopPad));
        };

        layoutPinnedBlock();

        const trigger = ScrollTrigger.create({
          trigger: pinRef.current,
          // Pin when the heading (or stage row) reaches pinTop + lift.
          start: () =>
            `top+=${Math.round(anchorOffset())} top+=${Math.round(pinTop() + pinHeadingLift)}`,
          invalidateOnRefresh: true,
          end: `+=${endPercent}%`,
          pin: true,
          // Tight scrub so the green card starts moving as soon as the section pins.
          scrub: 0.2,
          animation: master,
          onRefreshInit: layoutPinnedBlock,
          onRefresh: layoutPinnedBlock,
        });

        const onResize = () => {
          layoutPinnedBlock();
          ScrollTrigger.refresh();
        };
        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
          slots.forEach((slot) => {
            slot.style.height = "";
          });
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
        <Container className="w-full py-16 md:py-20 lg:py-4">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div>
              <SectionBadge label={ladder.badge} />
              <h2
                ref={headingRef}
                className="mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance md:text-5xl lg:text-[clamp(2.15rem,5.5vh,2.85rem)]"
              >
                {ladder.title}
              </h2>
            </div>
            <p className="max-w-xs border-l-2 border-primary pl-4 text-base font-medium leading-7 text-on-surface lg:mb-2">
              {ladder.authorityLine}
            </p>
          </div>

          <div ref={stagesRef} className="relative mt-10 md:mt-12 lg:mt-[clamp(1rem,2.8vh,2rem)]">
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
                    <MotionSlot
                      label={`${step.label} visual`}
                      aspectClassName="aspect-[5/4] w-full lg:aspect-auto lg:h-[clamp(10rem,22vw,22rem)]"
                      className="mt-5 lg:mt-4"
                    >
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
