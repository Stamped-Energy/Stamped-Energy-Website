import type { PrescriptionField } from "./types";

export type ScenarioKey =
  | "homepagePrescription"
  | "howItWorksBeforeAfter"
  | "heroCallouts"
  | "heroVisual";

type HeroCallout = {
  id: string;
  label: string;
  value: string;
  x: string;
  y: string;
};

type BeforeAfterScenario = {
  afterHighlight: string;
  afterPrescription: string;
};

/** Homepage Rx: MD co-start stagger (agnostic). Sample numbers from prescriptions-examples. */
const cementPrescription: PrescriptionField[] = [
  {
    label: "What",
    value:
      "Hold Feeder B start until Feeder A settles under 95% of its ramp, then release. Stagger 8-12 min inside the open 15-min MD window.",
  },
  {
    label: "Why",
    value:
      "HT incomer MD hit 1,180 kVA at 07:14. Feeder A restart and Feeder B start stacked in the same billing slot while the window was still open.",
  },
  { label: "Who", value: "Electrical / area supervisor, active shift" },
  { label: "Effort", value: "Sequence change only. No capital spend." },
  { label: "Impact", value: "₹2.5-4.5L per month on MD charges" },
  { label: "When", value: "This week, ahead of the next peak period" },
];

const pharmaPrescription: PrescriptionField[] = [
  {
    label: "What",
    value: "Stagger chiller bank startup - unit 3 starts 12 minutes after units 1 and 2",
  },
  {
    label: "Why",
    value:
      "Incomer demand hit 980 kVA at 06:00 Monday. Three chillers ramped together with only 60% AHU load required.",
  },
  { label: "Who", value: "Utilities / engineering head" },
  { label: "Effort", value: "BMS schedule change. No HVAC redesign." },
  { label: "Impact", value: "₹3-10L/month at current tariff " },
  { label: "When", value: "Before next billing cycle." },
];

const steelPrescription: PrescriptionField[] = [
  {
    label: "What",
    value: "Reduce induction furnace holding power between heats - setback to 70% rated power",
  },
  {
    label: "Why",
    value:
      "Furnace F2 held at full power 45 minutes between heats with no pour scheduled. Holding load visible on sub-meter.",
  },
  { label: "Who", value: "Furnace operator / electrical" },
  { label: "Effort", value: "Schedule change only. No capital spend." },
  { label: "Impact", value: "₹3-8L/month at current tariff " },
  { label: "When", value: "Effective next shift. Verify on monthly bill." },
];

const chemicalPrescription: PrescriptionField[] = [
  {
    label: "What",
    value: "Stagger reactor R1, R2, R3 heating start - sequence over 25 minutes at batch change",
  },
  {
    label: "Why",
    value:
      "Three reactors heated simultaneously at 07:00 - incomer MD breached by 195 kVA with no production load yet.",
  },
  { label: "Who", value: "Batch supervisor / electrical" },
  { label: "Effort", value: "Batch schedule change only." },
  { label: "Impact", value: "₹3-10L/month at current tariff " },
  { label: "When", value: "Before next billing cycle." },
];

const autoPrescription: PrescriptionField[] = [
  {
    label: "What",
    value: "Stagger Compressor 1 and Press Line 3 startup by 10 minutes each shift",
  },
  {
    label: "Why",
    value:
      "Incomer demand hit 1,240 kVA at 07:15 Monday. Both assets ramped together with zero production load.",
  },
  { label: "Who", value: "Electrical maintenance / shift supervisor" },
  { label: "Effort", value: "Scheduling change only. No capital spend." },
  { label: "Impact", value: "₹38,000/month at current tariff and shift pattern" },
  { label: "When", value: "Before next billing cycle. MD resets monthly." },
];

const pharmaBeforeAfter: BeforeAfterScenario = {
  afterHighlight: "06:00 MD spike tied to Chiller 1 + 2 + 3 simultaneous start",
  afterPrescription: "₹3-10L/month chiller stagger prescription assigned",
};

const neutralCallouts: HeroCallout[] = [
  { id: "incomer", label: "INCOMER", value: "1,240 kVA", x: "8%", y: "18%" },
  { id: "kiln", label: "KILN DRIVE", value: "620 kW", x: "12%", y: "58%" },
  { id: "chiller", label: "CHILLER BANK", value: "385 kW", x: "62%", y: "8%" },
  { id: "raw-mill", label: "RAW MILL", value: "450 kW", x: "72%", y: "52%" },
];

const SCENARIO_MAP = {
  homepagePrescription: cementPrescription,
  howItWorksBeforeAfter: pharmaBeforeAfter,
  heroCallouts: neutralCallouts,
  heroVisual: {
    src: "/industries/cement.png",
    alt: "Cement manufacturing plant with silos and kiln at twilight - energy-intensive continuous process",
  },
} as const;

export function getScenarioPrescription(_key: "homepagePrescription") {
  return SCENARIO_MAP.homepagePrescription;
}

export function getBeforeAfterScenario() {
  return SCENARIO_MAP.howItWorksBeforeAfter;
}

export function getHeroCallouts() {
  return SCENARIO_MAP.heroCallouts;
}

export function getHeroVisual() {
  return SCENARIO_MAP.heroVisual;
}

/** Fixed assignment per surface - diverse verticals without client-side randomness. */
export const scenarioAssignments = {
  homepagePrescription: "cement" as const,
  howItWorksBeforeAfter: "pharma" as const,
  heroCallouts: "neutral" as const,
  heroVisual: "cement" as const,
};

export {
  autoPrescription,
  cementPrescription,
  pharmaPrescription,
  steelPrescription,
  chemicalPrescription,
};
