import type { ReactNode } from "react";

import { ChromeShell } from "@/components/layout/ChromeShell";

export default function ChromeLayout({ children }: { children: ReactNode }) {
  return <ChromeShell>{children}</ChromeShell>;
}
