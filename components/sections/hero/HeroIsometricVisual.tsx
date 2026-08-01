import Image from "next/image";

const HERO_IMAGE_ALT =
  "Stamped Energy AI-powered prescriptive energy intelligence platform for plants in India";

export function HeroIsometricVisual() {
  return (
    <div
      data-hero-animate="visual"
      className="relative min-w-0 bg-surface lg:flex lg:items-center lg:justify-end"
    >
      <div className="relative mx-auto w-full max-w-[640px] translate-x-0 sm:max-w-[720px] lg:mx-0 lg:w-[112%] lg:max-w-none lg:translate-x-6 xl:w-[120%] xl:translate-x-10 2xl:translate-x-14">
        <Image
          src="/images/hero/energy-facility-isometric.png"
          alt={HERO_IMAGE_ALT}
          width={1024}
          height={575}
          priority
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="h-auto w-full bg-surface object-contain"
        />
      </div>
    </div>
  );
}
