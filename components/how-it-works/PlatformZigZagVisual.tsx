"use client";

import {
  DataStageVisual,
  DecisionsStageVisual,
  PrescriptionsStageVisual,
} from "@/components/motion-slots/HiwStageVisuals";
import { AskPlantVisual } from "@/components/motion-slots/PlatformLearningVisuals";

export function PlatformZigZagVisual({ itemId }: { itemId: string }) {
  switch (itemId) {
    case "plant-graph":
      return <DataStageVisual />;
    case "alarms-prescriptions":
      return <PrescriptionsStageVisual />;
    case "agents":
      return <DecisionsStageVisual />;
    case "ask":
      return <AskPlantVisual />;
    default:
      return null;
  }
}
