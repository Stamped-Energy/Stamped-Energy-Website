import { cn } from "@/lib/utils";

type GifPlaceholderProps = {
  title: string;
  description: string;
  reason?: string;
  variant?: "card" | "hero";
  className?: string;
  /** When provided, renders the asset instead of the placeholder frame */
  src?: string | null;
  posterAlt?: string;
};

function isVideoSrc(src: string): boolean {
  return /\.(webm|mp4)$/i.test(src);
}

export function GifPlaceholder({
  title,
  description,
  reason,
  variant = "card",
  className,
  src,
  posterAlt,
}: GifPlaceholderProps) {
  if (src) {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-lowest",
          className,
        )}
      >
        {isVideoSrc(src) ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-label={posterAlt ?? title}
          >
            <source src={src} />
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={posterAlt ?? title}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-2xl border border-dashed border-primary/40 bg-surface-container-low",
          className,
        )}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            WebM / GIF loop - placeholder
          </p>
          <h3 className="mt-3 max-w-lg text-lg font-bold text-on-surface md:text-xl">{title}</h3>
          <p className="mt-2 max-w-md text-sm leading-6 text-on-surface-variant">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-primary/35 bg-primary/5 p-6 md:p-8",
        className,
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
        WebM / GIF - placeholder
      </p>
      <h3 className="mt-2 text-lg font-bold text-on-surface">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-on-surface-variant">{description}</p>
      {reason ? (
        <p className="mt-4 text-xs leading-5 text-on-surface-variant/80">
          <span className="font-semibold text-on-surface-variant">Why GIF: </span>
          {reason}
        </p>
      ) : null}
    </div>
  );
}
