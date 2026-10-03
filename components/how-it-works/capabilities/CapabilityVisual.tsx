"use client";

import { UNDER_THE_HOOD_VISUALS } from "@/components/how-it-works/capabilities/UnderTheHoodVisuals";
import type { HiwCapability } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type CapabilityVisualProps = {
  capability: HiwCapability;
  className?: string;
};

function isVideoSrc(src: string): boolean {
  return /\.(webm|mp4|ogg)$/i.test(src);
}

export function CapabilityVisual({ capability, className }: CapabilityVisualProps) {
  if (capability.mediaSrc) {
    if (isVideoSrc(capability.mediaSrc)) {
      return (
        <video
          className={cn("h-full w-full object-cover", className)}
          autoPlay
          muted
          loop
          playsInline
          aria-label={capability.mediaAlt ?? capability.title}
        >
          <source src={capability.mediaSrc} />
        </video>
      );
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={capability.mediaSrc}
        alt={capability.mediaAlt ?? capability.title}
        className={cn("h-full w-full object-cover", className)}
      />
    );
  }

  const Visual = UNDER_THE_HOOD_VISUALS[capability.id];
  if (!Visual) {
    return null;
  }

  return (
    <div className={cn("h-full w-full", className)}>
      <Visual />
    </div>
  );
}
