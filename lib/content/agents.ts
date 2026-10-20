import type { SolutionAreaSlug } from "./solutions";

/**
 * Agent jobs by area, grouped by the three steps (plan PR #18, revised 20 Oct 10:33 PM).
 * Public copy carries no build-status tags by decision. Autonomous execution appears on process and quality only.
 */

export type AgentStep = "monitoring" | "decision" | "autonomous";

export type AgentJob = { id: string; name: string; line: string };

export type AgentJobGroup = { step: AgentStep; jobs: AgentJob[] };

export type SampleFinding = {
  tag: string;
  headline: string;
  found: string;
  opportunity: string;
  capture: string;
  actions: string[];
};

export type AgentArea = {
  slug: SolutionAreaSlug;
  label: string;
  comingSoon?: boolean;
  href?: string;
  groups: AgentJobGroup[];
  /** One plain line on what stays with people, or how far Stamped goes. */
  ownership: string;
  /** Sample card on the homepage picker. */
  homeSample: SampleFinding;
  /** A different sample card on the solution page. */
  pageSample?: SampleFinding;
};

export const agentStepLabels: Record<AgentStep, string> = {
  monitoring: "Monitoring",
  decision: "Decision making",
  autonomous: "Autonomous execution",
};

export const agentsSection = {
  badge: "Agents",
  title: "Agents for every part of the plant.",
  intro:
    "Each agent does one job, from the records your plant already keeps. In process and quality, a change that has proved itself is applied on its own, inside limits set beforehand.",
  sampleLabel: "Sample finding",
  sampleCaption: "Illustrative. Written from the kind of records a plant already keeps.",
  findLabels: { found: "What we found", opportunity: "The opportunity", capture: "How we capture it" },
  areaLinkLabel: "More on",
  comingSoonLabel: "Coming soon",
  pageHeading: "What Stamped's agents do here",
  /** Autoplay interval in seconds. Autoplay stops for good on the first click, tap or key press. */
  autoplaySeconds: 7,
};

export const agentAreas: AgentArea[] = [
  {
    slug: "process",
    label: "Process",
    href: "/solutions/process",
    groups: [
      {
        step: "monitoring",
        jobs: [
          {
            id: "watch-runs",
            name: "Watches every run",
            line: "Each run is compared with your best ones, and a drift is flagged while there is still time to act.",
          },
          {
            id: "sensors",
            name: "Checks the sensors first",
            line: "A reading that is stuck or out of range is flagged before anyone trusts it.",
          },
        ],
      },
      {
        step: "decision",
        jobs: [
          {
            id: "best-runs",
            name: "Finds what your best runs did differently",
            line: "The settings behind your best runs are pulled out, so the next run can repeat them.",
          },
          {
            id: "model-first",
            name: "Tries the next setting on a model first",
            line: "A better setting is tested on a model of that line before the line sees it.",
          },
          {
            id: "fair-test",
            name: "Measures every change fairly",
            line: "A change is compared with matched runs from your own line, so its effect shows in your numbers.",
          },
        ],
      },
      {
        step: "autonomous",
        jobs: [
          {
            id: "apply",
            name: "Applies proven changes on its own",
            line: "Once a change has proved itself, Stamped applies it to the process settings by itself, inside limits set beforehand.",
          },
          {
            id: "product-settings",
            name: "Keeps the settings right for each product",
            line: "When the product changes, the settings from its last good run are loaded, inside the same limits.",
          },
        ],
      },
    ],
    ownership: "Your plant head sets the limits, and every change Stamped makes is logged.",
    homeSample: {
      tag: "Process · A run drifting from its best",
      headline: "This run is drifting from your best ones. It can still be brought back.",
      found: "The settings on this run have moved away from where your best runs held them.",
      opportunity: "Brought back now, the rest of the run stays in spec and uses less energy per good part.",
      capture:
        "You approve once. After that, Stamped applies this change on its own whenever the run drifts this way, inside limits set beforehand.",
      actions: ["Evidence", "Approve", "Comment"],
    },
    pageSample: {
      tag: "Process · Settings left from the last product",
      headline: "This product is next. The line is still set for the last one.",
      found: "The settings from this product's last good run differ from what the line is running now.",
      opportunity: "Started on the right settings, the first parts of the run are good parts.",
      capture:
        "You approve once. After that, Stamped loads the right settings on its own each time this product comes up, inside limits set beforehand.",
      actions: ["Evidence", "Approve", "Comment"],
    },
  },
  {
    slug: "quality",
    label: "Quality",
    href: "/solutions/quality",
    groups: [
      {
        step: "monitoring",
        jobs: [
          {
            id: "warn",
            name: "Warns while the batch can still be saved",
            line: "A batch drifting toward the conditions seen before past rejections is flagged to the person who can act.",
          },
          {
            id: "records",
            name: "Reads the records you keep on paper",
            line: "Lab sheets, batch cards and logbooks become one record for every lot.",
          },
          {
            id: "lab",
            name: "Estimates the lab result before the lab",
            line: "A property is estimated between lab tests, so a sample can be taken early.",
          },
        ],
      },
      {
        step: "decision",
        jobs: [
          {
            id: "trace",
            name: "Traces a reject to its cause",
            line: "A rejected lot is traced back through every machine and setting it passed, with the record behind each link.",
          },
          {
            id: "next-risk",
            name: "Spots the next lot at risk",
            line: "When another lot runs under the same conditions as a failed one, your team hears before it ships.",
          },
          {
            id: "reject-cost",
            name: "Counts what a reject really cost",
            line: "The energy and material in parts that never ship sit next to your rejections.",
          },
        ],
      },
      {
        step: "autonomous",
        jobs: [
          {
            id: "correct",
            name: "Corrects the run that is drifting",
            line: "Where a process setting is the cause, Stamped brings it back on its own, inside limits set beforehand.",
          },
        ],
      },
    ],
    ownership: "Holding and releasing lots stays with your quality team.",
    homeSample: {
      tag: "Quality · A batch heading for rejection",
      headline: "This batch looks like the ones that failed. It has not left the line yet.",
      found: "The signals on this batch are following the pattern seen before past rejections.",
      opportunity: "Fixed now, the material and energy already in it go into parts you can ship.",
      capture:
        "The shift lead gets the warning with the evidence. Where a process setting is the cause, Stamped corrects it inside limits set beforehand.",
      actions: ["Evidence", "Approve", "Comment"],
    },
    pageSample: {
      tag: "Quality · Rejects with a shared cause",
      headline: "Last week's rejects share one cause. Parts from the same run are still in the plant.",
      found: "The rejected parts trace back to the same material lot and the same shift.",
      opportunity: "The parts from that run still in the plant can be checked before they ship.",
      capture:
        "The quality head gets the trace with the record behind it. Holding or releasing those parts stays with your quality team.",
      actions: ["Evidence", "Comment"],
    },
  },
  {
    slug: "planning",
    label: "Planning",
    href: "/solutions/planning",
    groups: [
      {
        step: "monitoring",
        jobs: [
          {
            id: "line-state",
            name: "Knows what each line is really doing",
            line: "Running, stopped and changeover time is read from the records each line already writes.",
          },
          {
            id: "slip",
            name: "Warns when the plan is about to slip",
            line: "When a machine runs slower than the plan assumes, your planner hears while the shift can still be saved.",
          },
        ],
      },
      {
        step: "decision",
        jobs: [
          {
            id: "replan",
            name: "Re-plans after a stop",
            line: "When a line goes down, a workable order for the rest of the shift is ready to accept.",
          },
          {
            id: "group",
            name: "Groups similar work",
            line: "Jobs that share a setting or a clean-down are put back to back, so less time goes to set-ups.",
          },
          {
            id: "handover",
            name: "Writes the shift handover",
            line: "What changed this shift is written up for the next one.",
          },
          {
            id: "orders",
            name: "Answers where an order is",
            line: "Ask where an order is and when it will ship, and the answer comes from your plant's own records.",
          },
        ],
      },
    ],
    ownership: "Promise dates, customer priority and dispatch order stay with your planner.",
    homeSample: {
      tag: "Planning · Time lost to set-ups",
      headline: "Two similar jobs sit far apart in the plan. Run together, they need one set-up.",
      found: "Two jobs that share a setting are split by a job that needs a full change.",
      opportunity: "Run back to back, the line saves a set-up this shift and gets that time back.",
      capture: "Your planner sees the new order and accepts it. Promise dates stay with your planner.",
      actions: ["Evidence", "Accept", "Comment"],
    },
    pageSample: {
      tag: "Planning · A plan that broke",
      headline: "A line has stopped. The rest of the shift can still be saved.",
      found: "The stop leaves jobs waiting on one line while another line has room.",
      opportunity: "Moved now, today's dispatches can still leave on time.",
      capture:
        "Your planner sees the new order and accepts it. Promise dates and customer priority stay with your planner.",
      actions: ["Evidence", "Accept", "Comment"],
    },
  },
  {
    slug: "maintenance",
    label: "Maintenance",
    comingSoon: true,
    href: "/solutions/maintenance",
    groups: [
      {
        step: "monitoring",
        jobs: [
          {
            id: "strain",
            name: "Will notice a machine starting to strain",
            line: "Power, run time or temperature creeping up under the same load will be flagged early.",
          },
        ],
      },
      {
        step: "decision",
        jobs: [
          {
            id: "rank",
            name: "Will rank the stops that cost most",
            line: "Stops will be ranked by the output they cost, so the first fix is the one that matters.",
          },
          {
            id: "window",
            name: "Will plan the fix around production",
            line: "The repair will be suggested for the window that moves the least work.",
          },
        ],
      },
    ],
    ownership: "Authorising the work will stay with your maintenance team.",
    homeSample: {
      tag: "Maintenance · Early wear",
      headline: "This machine is working harder for the same job. There is a gap in the plan this week.",
      found: "It is drawing more power under the same load, week on week.",
      opportunity: "Fixed in the planned gap, the repair will move no work.",
      capture: "Your maintenance team will get the warning and the best window. Authorising the work will stay with them.",
      actions: ["Evidence", "Comment"],
    },
  },
];

export function getAgentArea(slug: SolutionAreaSlug): AgentArea | undefined {
  return agentAreas.find((area) => area.slug === slug);
}
