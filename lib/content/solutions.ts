import type { CtaLink } from "./types";

export type SolutionPillarSlug = "load-energy" | "equipment-intelligence";

export type SolutionPillarSummary = {
  slug: SolutionPillarSlug;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  hubBrief: string;
  outcome: string;
  ctaLabel: string;
  highlights: string[];
};

export type SolutionOutcomeItem = {
  id: string;
  value: string;
  label: string;
  detail: string;
};

export type SolutionHowItWorksStep = {
  id: string;
  title: string;
  body: string;
  mediaLabel: string;
};

export type SolutionRxExample = {
  id: string;
  badge: string;
  title: string;
  talkTrack: string;
  what: string;
  why: string;
  who: string;
  impact: string;
  effort: string;
  evidence: string;
};

export type SolutionPillarPage = {
  slug: SolutionPillarSlug;
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  heroImageSrc: string;
  heroImageAlt: string;
  heroObjectPosition?: string;
  outcomes: {
    eyebrow: string;
    title: string;
    intro: string;
    disclaimer: string;
    items: SolutionOutcomeItem[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: SolutionHowItWorksStep[];
  };
  examples: {
    eyebrow: string;
    title: string;
    intro: string;
    items: SolutionRxExample[];
  };
  industriesStrip: {
    eyebrow: string;
    title: string;
    body: string;
  };
  platformLink: {
    title: string;
    body: string;
    cta: CtaLink;
  };
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  finalCta: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
};

export const solutionsContent = {
  hub: {
    eyebrow: "Solutions",
    title: "Two outcomes. One evidence trail.",
    description:
      "One product for energy-intensive plants in India. Pick the pillar that matches how you buy: same stack, real-time intelligence, verified with evidence.",
    heroImageSrc: "/industries/cement.png",
    heroImageAlt: "Cement plant with silos and kiln illuminated at twilight",
    primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
    secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    sectionEyebrow: "The intelligence",
    sectionTitle: "Two pillars. One operating loop.",
    sectionIntro:
      "Start here for the overview, then open the pillar that matches how your plant buys. Each page covers outcomes, how it works, and practical prescriptions.",
    finalCta: {
      eyebrow: "Start with your plant",
      title: "See which pillar fits how you buy",
      description:
        "Discovery call: we map your meters, main loads, and bill pattern, and say honestly if a pilot makes sense.",
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    },
    pillars: [
      {
        slug: "load-energy",
        href: "/solutions/load-energy",
        title: "Industry Energy Management",
        shortTitle: "Energy management",
        description:
          "Stamped analyzes energy use at the equipment level in the context of demand, price, and tariff windows. Predict and optimize consumption and rupee impact from demand charges, idle loads, and ramp profiles.",
        hubBrief:
          "Turn incomer, sub-meters, SCADA, and bills into ranked actions: what to change, who owns it, and monthly rupee impact. Built for MD peaks, idle loads, HVAC waste, and tariff windows without a hardware retrofit.",
        outcome: "Lower bill line items. No hardware retrofit.",
        ctaLabel: "Learn more",
        highlights: [
          "MD and demand charges",
          "Shift-start stagger",
          "Idle and HVAC loads",
          "Tariff-aware timing",
        ],
      },
      {
        slug: "equipment-intelligence",
        href: "/solutions/equipment-intelligence",
        title: "Asset Health Intelligence",
        shortTitle: "Asset health",
        description:
          "Stamped ₹-ranks anomalies and predictions tied to each asset and tracks operator decisions so plant expertise is captured and compounds with each shift.",
        hubBrief:
          "Catch mechanical and process-linked waste early using energy and operating context. Maintenance and utilities get assigned prescriptions before trips, scrap, and energy waste compound across the shift.",
        outcome: "Fewer surprise failures. Same evidence trail.",
        ctaLabel: "Learn more",
        highlights: [
          "Process-aware early warnings",
          "Assigned maintenance actions",
          "Energy-linked waste",
          "Verified with evidence",
        ],
      },
    ] satisfies SolutionPillarSummary[],
    sharedNote:
      "Orders and department context inform schedule-type actions. Stamped is not your MES, CMMS, or plant OS.",
  },

  pillars: {
    "load-energy": {
      slug: "load-energy",
      path: "/solutions/load-energy",
      eyebrow: "Industry Energy Management",
      title: "Industry Energy Management",
      description:
        "Incomer, sub-meters, SCADA, and bills become ranked actions: what to change, who owns it, monthly rupee impact. Real-time decisions on the loads that move your bill.",
      heroImageSrc: "/industries/die-casting.jpeg",
      heroImageAlt: "Molten metal pour in an energy-intensive manufacturing plant",
      heroObjectPosition: "center 35%",
      outcomes: {
        eyebrow: "Outcomes",
        title: "Measurable impact across the bill, demand, and wasted kWh",
        intro:
          "Each prescription is ₹-ranked so plant teams can see what each stagger, ToD shift, or idle cut is worth before they act.",
        disclaimer:
          "Indicative ranges from comparable plants. Your pilot replaces these with verified figures. Not a guaranteed outcome.",
        items: [
          {
            id: "bill",
            value: "15-20%",
            label: "Electricity cost recovery",
            detail: "Typical band on process-intensive mid-market plants when assigned actions close",
          },
          {
            id: "md",
            value: "15-25%",
            label: "MD / demand charge reduction",
            detail: "Often addressable from incomer meter and bill data alone",
          },
          {
            id: "idle",
            value: "10-20%",
            label: "Non-production energy flagged",
            detail: "Idle loads, holding, HVAC staging, and batch gaps",
          },
          {
            id: "evidence",
            value: "Verified",
            label: "With evidence",
            detail: "Ops-cleared ledger; DISCOM bill confirmation optional when the period closes",
          },
          {
            id: "speed",
            value: "2 weeks",
            label: "First prescriptions",
            detail: "No rip-and-replace. Start on meters and bills you already have",
          },
          {
            id: "control",
            value: "Human-gated",
            label: "Every recommendation",
            detail: "Accept, reject, or adjust. Plant expertise compounds in the loop",
          },
        ],
      },
      howItWorks: {
        eyebrow: "How it works",
        title: "Continuous analysis for equipment-level energy recommendations",
        intro:
          "Stamped maps equipment-level energy use and contextualizes it with production state, DISCOM tariff windows, and your bill pattern.",
        steps: [
          {
            id: "equipment-model",
            title: "Equipment-level energy modeling",
            body: "Energy use is mapped to compressors, furnaces, chillers, presses, and other major loads, with modeled target usage as the baseline against actual draw.",
            mediaLabel: "Equipment load model",
          },
          {
            id: "discom-analysis",
            title: "Continuous DISCOM, ToD, and MD analysis",
            body: "Live demand, tariff slabs, and bill pattern are evaluated continuously against shift and production context, so actions land before the billing window closes.",
            mediaLabel: "Tariff and MD context",
          },
          {
            id: "plant-control",
            title: "Plant teams remain in control",
            body: "Every stagger, ToD move, idle cut, or ramp recommendation is accepted, rejected, or adjusted by your team, so Stamped captures plant priorities and operator expertise over time.",
            mediaLabel: "Accept, adjust, reject",
          },
          {
            id: "rupee-ranked",
            title: "₹-ranked stagger, ToD, idle-holding, and ramp recommendations",
            body: "Plant teams see movable loads, timing, and rupee value, with a full evidence trail behind each recommendation. No battery-storage claim; thermal holding and ramp profiles where they apply.",
            mediaLabel: "₹-ranked moves",
          },
        ],
      },
      examples: {
        eyebrow: "Examples",
        title: "Practical prescriptions your floor can run",
        intro:
          "Sample numbers only. Live prescriptions use your plant tags, tariff, and a locked M&V baseline. Labelled illustrative until verified.",
        items: [
          {
            id: "md-feeder",
            badge: "MD · Load stagger",
            title: "Hold the second feeder start 10 minutes",
            talkTrack:
              "Two big loads hit your incomer in the same 15-minute MD window. The bill will not tell you which machines until it is too late. We see the overlap live and ask the second owner to wait about ten minutes.",
            what: "Hold the second large feeder start until the first load settles (for example under 95% of its ramp). Usual stagger: 8–12 minutes inside the open MD window.",
            why: "Two heavy feeders started in the same billing slot and stacked on the HT incomer. The monthly bill shows the peak later, not which machines overlapped while the window was still open.",
            who: "Electrical lead + area supervisor · active shift",
            impact: "Roughly ₹80k–₹1.2L/month on MD [illustrative]",
            effort: "Sequence change · no new equipment",
            evidence: "HT incomer MD window vs feeder restart tags; baseline peak week.",
          },
          {
            id: "idle-aux",
            badge: "Idle · Aux load",
            title: "Switch off packaging aux when nothing runs 20 min",
            talkTrack:
              "Conveyors and fans stay on when the line is empty. After 20 minutes with zero output, switch aux off per SOP; bring back when production returns.",
            what: "When packaging line output is zero for 20 minutes, switch off tagged auxiliaries (conveyors, idle fans, non-critical pumps). Restart when production pulse returns or supervisor overrides.",
            why: "Auxiliaries stay on during idle because production count and machine power are not watched together in time.",
            who: "Area supervisor · packaging + utilities lead",
            impact: "Roughly ₹50k–₹90k/month on energy [illustrative]",
            effort: "Idle SOP · safety loads on protect list",
            evidence: "Line output vs aux kW over idle windows; last five idle events.",
          },
          {
            id: "tod-warmup",
            badge: "ToD · Thermal",
            title: "Gravure dryer warm-up 25 min earlier",
            talkTrack:
              "Warm-up is eating peak ToD even when output is the same. Shift warm-up, not production start. Jobs still release on time.",
            what: "Start gravure dryer warm-up 25 minutes earlier into the lower ToD window before day-shift release, without changing job start time.",
            why: "Warm-up load overlaps the peak ToD band on three of five weekday runs, even when production volume is stable.",
            who: "Utilities lead + gravure shift supervisor",
            impact: "Roughly ₹35k–₹55k/month on ToD energy [illustrative]",
            effort: "Schedule change only · production sign-off",
            evidence: "Tariff block vs dryer kW vs release timestamp; last four gravure weeks.",
          },
        ],
      },
      industriesStrip: {
        eyebrow: "Industries",
        title: "Energy exposure, priced against operating flexibility",
        body: "Best fit for sites with high electricity spend, MD exposure, or flexible loads where operations can act before the bill locks.",
      },
      platformLink: {
        title: "Same Connect to Improve loop",
        body: "This pillar runs on the Platform operating loop: Connect, Observe, Decide, Execute, Verify, Improve. Improve based on decisions taken. No separate product to deploy.",
        cta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
      },
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform loop", href: "/platform" } satisfies CtaLink,
      finalCta: {
        eyebrow: "Start with one site",
        title: "See what Industry Energy Management would find in your plant",
        description:
          "First prescriptions in about two weeks. No rip-and-replace. Evidence trail from day one.",
        primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
        secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
      },
    },
    "equipment-intelligence": {
      slug: "equipment-intelligence",
      path: "/solutions/equipment-intelligence",
      eyebrow: "Asset Health Intelligence",
      title: "Asset Health Intelligence",
      description:
        "The stack that finds energy waste also flags equipment issues early, with owners and evidence. Real-time decisions before trips and waste compound.",
      heroImageSrc: "/industries/steel.png",
      heroImageAlt: "Steel rolling mill with glowing hot metal billets on the production line",
      heroObjectPosition: "center 45%",
      outcomes: {
        eyebrow: "Outcomes",
        title: "Measurable impact across downtime, emergency spend, and operator decisions",
        intro:
          "Recommendations are ₹-ranked, so operators see which energy-linked drift to act on first. Not a CMMS or full vibration PdM claim.",
        disclaimer:
          "Indicative ranges when teams act on early energy-linked drift. Your pilot replaces these with verified figures.",
        items: [
          {
            id: "downtime",
            value: "10-20%",
            label: "Unplanned downtime prevented",
            detail: "When early drift prescriptions close before a trip",
          },
          {
            id: "emergency",
            value: "15-25%",
            label: "Emergency maintenance cost reduction",
            detail: "Fewer rush repairs when issues surface on the energy graph first",
          },
          {
            id: "same-shift",
            value: "Same shift",
            label: "Energy-linked waste flagged",
            detail: "Load-shape and SEC drift routed with an owner, not another ignored alert",
          },
          {
            id: "ranked",
            value: "₹-ranked",
            label: "Anomaly prioritization",
            detail: "So utilities and maintenance see highest impact first",
          },
          {
            id: "shared",
            value: "One trail",
            label: "Shared utilities and maintenance context",
            detail: "Evidence-backed prescriptions, not two disconnected dashboards",
          },
          {
            id: "control",
            value: "Human-gated",
            label: "Every recommendation",
            detail: "Accept, reject, or adjust. Expertise compounds across shifts",
          },
        ],
      },
      howItWorks: {
        eyebrow: "How it works",
        title: "Continuous analysis for asset operating decisions",
        intro:
          "Stamped connects to existing meters and plant signals, contextualizing asset behavior with operating constraints and rupee exposure.",
        steps: [
          {
            id: "constraints",
            title: "Plant-specific constraint context",
            body: "Recommendations respect operating constraints, production windows, and economic exposure specific to your plant, not a generic alert threshold.",
            mediaLabel: "Constraint checks",
          },
          {
            id: "root-cause",
            title: "Root-cause identification with ₹ impact",
            body: "Root causes are identified from energy and process context, with related cost estimated before a ranked prescription is routed to the owner.",
            mediaLabel: "Root cause to ₹",
          },
          {
            id: "expected-behavior",
            title: "Expected-behavior and energy-linked drift",
            body: "Models compare observed load shape and specific energy against expected behavior so early drift shows up before a hard failure or MD surprise.",
            mediaLabel: "Modeled vs observed",
          },
          {
            id: "operators-control",
            title: "Operators remain in control",
            body: "Every recommendation is accepted, rejected, or adjusted so Stamped captures plant priorities and operator expertise over time.",
            mediaLabel: "Decision feedback",
          },
        ],
      },
      examples: {
        eyebrow: "Examples",
        title: "Practical prescriptions your floor can run",
        intro:
          "Sample numbers only. Live prescriptions use your plant tags and a locked baseline. Labelled illustrative until verified. Not vibration PdM.",
        items: [
          {
            id: "compressor-drift",
            badge: "Equipment · Drift",
            title: "Inspect Compressor 2 filter / unload valve",
            talkTrack:
              "Compressor 2 is using more power than usual for the same air pressure, nine days straight. Inspect before it becomes extra bill and a breakdown.",
            what: "Inspect Compressor 2 inlet filter and unload valve during the next approved low-load window. Use Compressor 1 as standby only if capacity is confirmed.",
            why: "Specific power is 14% above its eight-week baseline for matched header pressure, run hours, and shift load. The drift has persisted for nine days.",
            who: "Utilities lead + mechanical maintenance",
            impact: "₹45k–₹70k/month [illustrative]",
            effort: "~2 hours · subject to isolation and permit",
            evidence: "COMP2 specific power vs eight-week matched baseline; header pressure band.",
          },
          {
            id: "furnace-hold",
            badge: "Thermal · Idle holding",
            title: "Reduce furnace holding when the roll is delayed",
            talkTrack:
              "The furnace is holding heat for a roll that is already late. Cut holding when delay exceeds the agreed window; restart when production clears.",
            what: "Reduce furnace holding when the downstream roll is delayed 45+ minutes; confirm setback or shutdown with production before the next peak tariff block.",
            why: "Holding kWh continues with zero throughput while the delay sits outside the agreed production window.",
            who: "Heat treatment · production",
            impact: "Indicative cut to idle holding risk and energy waste. Plant-specific.",
            effort: "Setback SOP · production sign-off",
            evidence: "Holding kWh vs schedule delay tags; closed when decision logged.",
          },
          {
            id: "pump-recirc",
            badge: "Equipment · Pumps",
            title: "Check CW pump P-12 for stuck recirculation",
            talkTrack:
              "Cooling water pump power is high for the flow you are getting. Check the valve path before you burn another week of recirculation losses.",
            what: "Inspect CW pump P-12 and associated valves for stuck recirculation during the next approved isolation window.",
            why: "Pump electrical draw is elevated vs delivered flow against the plant baseline, consistent with recirculation rather than useful cooling.",
            who: "Utilities · mechanical maintenance",
            impact: "Indicative kWh recovery and reduced hidden wear. Plant-specific.",
            effort: "Inspect / tune · isolation permit",
            evidence: "Pump kW vs flow tags; baseline operating envelope.",
          },
        ],
      },
      industriesStrip: {
        eyebrow: "Industries",
        title: "Asset issues, ₹-ranked by cost and downtime at risk",
        body: "Best fit for plants with alert fatigue, repeated equipment drift, or energy-linked waste that maintenance and utilities need to own together.",
      },
      platformLink: {
        title: "Same Connect to Improve loop",
        body: "Equipment findings ride the same Platform loop as energy prescriptions. Improve based on decisions taken and verified outcomes.",
        cta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
      },
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform loop", href: "/platform" } satisfies CtaLink,
      finalCta: {
        eyebrow: "Start with one site",
        title: "See what Asset Health Intelligence would find in your plant",
        description:
          "First prescriptions in about two weeks. No rip-and-replace. Evidence trail from day one.",
        primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
        secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
      },
    },
  } satisfies Record<SolutionPillarSlug, SolutionPillarPage>,
};

export function getSolutionPillar(slug: SolutionPillarSlug): SolutionPillarPage {
  return solutionsContent.pillars[slug];
}
