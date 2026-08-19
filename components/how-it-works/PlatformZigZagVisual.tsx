"use client";

import {
  DataStageVisual,
  DecisionsStageVisual,
  PrescriptionsStageVisual,
} from "@/components/motion-slots/HiwStageVisuals";

export function PlatformZigZagVisual({ itemId }: { itemId: string }) {
  switch (itemId) {
    case "plant-graph":
      return <DataStageVisual />;
    case "alarms-prescriptions":
      return <PrescriptionsStageVisual />;
    case "agents":
      return <DecisionsStageVisual />;
    default:
      return null;
  }
}
