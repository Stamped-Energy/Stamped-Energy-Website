import { HeroShell } from "@/components/sections/hero/HeroCopy";
import { HeroDesktopMotionLazy } from "@/components/sections/hero/HeroDesktopMotionLazy";

export function Hero() {
  return (
    <HeroShell>
      <div
        id="hero-mobile-mount"
        data-hero-animate="visual"
        className="mt-6 min-h-[14rem] border-t border-outline-variant/40 pt-5 md:mt-8 md:pt-8 lg:hidden"
        aria-hidden
      />
      <div
        data-hero-animate="visual"
        className="mt-6 hidden border-t border-outline-variant/40 pt-5 md:mt-8 md:pt-8 lg:mt-8 lg:block lg:pt-10"
      >
        <HeroDesktopMotionLazy />
      </div>
    </HeroShell>
  );
}
