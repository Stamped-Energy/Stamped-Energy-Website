import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ProductFrameProps = {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  float?: ReactNode;
  priority?: boolean;
  glow?: boolean;
};

export function ProductFrame({
  src,
  alt,
  title = "Stamped",
  className,
  float,
  priority,
  glow,
}: ProductFrameProps) {
  return (
    <div className={cn("relative", className)}>
      {glow ? (
        <div
          className="pointer-events-none absolute -inset-8 rounded-[2rem] opacity-100"
          style={{ background: "radial-gradient(ellipse at center, var(--brand-hero-glow), transparent 70%)" }}
          aria-hidden
        />
      ) : null}
      <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-outline-variant bg-surface-lowest shadow-[0_24px_48px_-24px_rgba(13,12,11,0.35)]">
        <div className="flex h-10 items-center gap-2 border-b border-outline-variant bg-surface-low px-3">
          <span className="size-2.5 rounded-full bg-neutral-300" aria-hidden />
          <span className="size-2.5 rounded-full bg-neutral-300" aria-hidden />
          <span className="size-2.5 rounded-full bg-neutral-300" aria-hidden />
          <span className="ml-2 truncate font-mono text-[11px] text-on-surface-variant">{title}</span>
        </div>
        <div className="relative aspect-[16/10] w-full bg-surface-low">
          <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(max-width: 1200px) 100vw, 1120px" priority={priority} />
        </div>
      </div>
      {float ? <div className="absolute -bottom-4 right-4 z-10 w-[min(100%,20rem)] sm:right-8">{float}</div> : null}
    </div>
  );
}
