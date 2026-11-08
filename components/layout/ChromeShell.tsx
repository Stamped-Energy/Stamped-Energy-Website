import type { ReactNode } from "react";

import { SiteChrome } from "@/components/layout/SiteChrome";
import { MotionProvider } from "@/components/motion/MotionProvider";

export function ChromeShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SiteChrome>{children}</SiteChrome>
    </MotionProvider>
  );
}
