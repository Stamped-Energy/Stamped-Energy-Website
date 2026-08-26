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
  description: string;
  impactRange: string;
  assignee: string;
  what: string;
  why: string;
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
    footnote: string;
    items: SolutionRxExample[];
  };
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
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
          "Stamped rupee-ranks anomalies and predictions tied to each asset and tracks operator decisions so plant expertise is captured and compounds with each shift.",
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
          "Each prescription is rupee-ranked so plant teams can see what each stagger, ToD shift, or idle cut is worth before they act.",
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
            title: "rupee-ranked stagger, ToD, idle-holding, and ramp recommendations",
            body: "Plant teams see movable loads, timing, and rupee value, with a full evidence trail behind each recommendation. No battery-storage claim; thermal holding and ramp profiles where they apply.",
            mediaLabel: "rupee-ranked moves",
          },
        ],
      },
      examples: {
        eyebrow: "Example prescriptions",
        title: "What operators receive",
        intro:
          "Illustrative actions from comparable plants. Your pilot writes these from your meters and bill.",
        footnote:
          "Impact ranges are samples until they are checked on your plant. Verified figures come with evidence.",
        items: [
          {
            id: "md-feeder",
            badge: "Demand peak",
            title: "Hold the second feeder start about 10 minutes",
            description:
              "Two heavy feeders ramped in the same window. Stagger the second start 8-12 minutes until the first load settles.",
            impactRange: "₹80k-1.2L/month",
            assignee: "Electrical lead / area supervisor",
            what: "Hold the second large feeder start until the first load settles. Typical stagger is 8-12 minutes inside the open demand window.",
            why: "Two heavy feeders started together and pushed the plant past the demand peak. The bill shows the spike, not which machines overlapped.",
            effort: "Sequence change. No new equipment.",
            evidence: "Compare the demand peak window with both feeder start times against a quiet baseline week.",
          },
          {
            id: "idle-aux",
            badge: "Idle load",
            title: "Cut packaging auxiliaries after 20 minutes idle",
            description:
              "Conveyors and fans stay on with no output. Switch tagged auxiliaries off per SOP; restart when production returns.",
            impactRange: "₹50k-90k/month",
            assignee: "Packaging supervisor / utilities lead",
            what: "When packaging output stays at zero for 20 minutes, switch off tagged auxiliaries such as conveyors, idle fans, and non-critical pumps. Restart when production returns.",
            why: "Auxiliaries keep running during idle because nobody is watching output and machine power together in real time.",
            effort: "Idle SOP. Keep safety loads on the protect list.",
            evidence: "Match line output against auxiliary power over the last few idle windows.",
          },
          {
            id: "tod-warmup",
            badge: "Tariff timing",
            title: "Move dryer warm-up into the cheaper window",
            description:
              "Warm-up sits in the peak tariff band. Start about 25 minutes earlier; job release stays the same.",
            impactRange: "₹35k-55k/month",
            assignee: "Utilities lead / shift supervisor",
            what: "Start dryer warm-up about 25 minutes earlier into the lower tariff window before day-shift release, without changing job start time.",
            why: "Warm-up load overlaps the peak tariff band on most weekday runs, even when production volume is stable.",
            effort: "Schedule change only. Production sign-off.",
            evidence: "Compare warm-up power against the tariff window and the unchanged job release time.",
          },
        ],
      },
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
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
          "Recommendations are rupee-ranked, so operators see which energy-linked drift to act on first. Not a CMMS or full vibration PdM claim.",
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
            value: "rupee-ranked",
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
        eyebrow: "Example prescriptions",
        title: "What operators receive",
        intro:
          "Illustrative actions from comparable plants. Your pilot writes these from your meters and signals.",
        footnote:
          "Impact ranges are samples until they are checked on your plant. Verified figures come with evidence.",
        items: [
          {
            id: "compressor-drift",
            badge: "Equipment drift",
            title: "Inspect Compressor 2 filter and unload valve",
            description:
              "Power is up for the same pressure, nine days running. Inspect in the next approved low-load window.",
            impactRange: "₹45k-70k/month",
            assignee: "Utilities lead / mechanical maintenance",
            what: "Inspect Compressor 2 inlet filter and unload valve in the next approved low-load window. Use Compressor 1 as standby only if capacity is confirmed.",
            why: "The compressor is drawing more power for the same pressure and run pattern than it did over the last several weeks. The drift has held for about nine days.",
            effort: "About two hours. Subject to isolation and permit.",
            evidence: "Compare compressor power against pressure and run hours for a quiet baseline period.",
          },
          {
            id: "micro-stop-clamp",
            badge: "Micro-stop",
            title: "Check fixture clamping on the repeating micro-stop",
            description:
              "Eight short stops in 35 minutes on the same machine. Setter checks clamping in the next 10 minutes.",
            impactRange: "Minutes recovered",
            assignee: "Setter on this shift",
            what: "Check fixture and clamping on the machine showing the repeated micro-stop cluster. Complete within 10 minutes of assignment.",
            why: "Identical short stops are clustering on one machine, which usually points to a fixture or clamp issue rather than a random process glitch.",
            effort: "Setter walk-down. No capital spend.",
            evidence: "Compare stop count and lost minutes before and after the clamp check against the same shift pattern.",
          },
          {
            id: "weekly-watchlist",
            badge: "Weekly watchlist",
            title: "Inspect the machine losing the most minutes this week",
            description:
              "Ranked by lost minutes, not alarm count. One bounded inspect with an owner before the week closes.",
            impactRange: "Downtime risk cut",
            assignee: "Maintenance lead / utilities",
            what: "Inspect the top machine on this week's watchlist with a bounded check from plant TPM text. Assign an owner and report back when complete.",
            why: "Micro-stops and lengthening downtime are compounding on one asset while the fleet average stays flat.",
            effort: "Bounded inspect. Subject to isolation and permit.",
            evidence: "Compare lost minutes and stop duration on the asset against its own baseline from the prior week.",
          },
        ],
      },
      primaryCta: { label: "Book a Discovery Call", href: "/contact" } satisfies CtaLink,
      secondaryCta: { label: "See the Platform", href: "/platform" } satisfies CtaLink,
    },
  } satisfies Record<SolutionPillarSlug, SolutionPillarPage>,
};

export function getSolutionPillar(slug: SolutionPillarSlug): SolutionPillarPage {
  return solutionsContent.pillars[slug];
}
