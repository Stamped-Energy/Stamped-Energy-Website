"use client";

import { AssetHealthHiwSlot } from "@/components/motion-slots/AssetHealthHiwVisuals";
import {
  DataStageVisual,
  DecisionsStageVisual,
  PrescriptionsStageVisual,
} from "@/components/motion-slots/HiwStageVisuals";
import {
  EquipmentModelVisual,
  TariffMdVisual,
} from "@/components/motion-slots/LoadEnergyHiwVisuals";

export function PlatformZigZagVisual({ itemId }: { itemId: string }) {
  switch (itemId) {
    case "plant-graph":
      return <DataStageVisual />;
    case "alarms-prescriptions":
      return <PrescriptionsStageVisual />;
    case "agents":
      return <DecisionsStageVisual />;
    case "energy-markets":
      return <TariffMdVisual />;
    case "efficiency":
      return <EquipmentModelVisual />;
    case "equipment":
      return <AssetHealthHiwSlot stepId="expected-behavior" />;
    case "production-context":
      return <AssetHealthHiwSlot stepId="constraints" />;
    default:
      return null;
  }
}
