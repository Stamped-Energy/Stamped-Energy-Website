import type { PrescriptionEmbedConfig } from "@/lib/content/types";
import { cn } from "@/lib/utils";

type DashboardEmbedProps = {
  embed: PrescriptionEmbedConfig;
  className?: string;
};

function isVideoSrc(src: string): boolean {
  return /\.(webm|mp4|ogg)$/i.test(src);
}

export function DashboardEmbed({ embed, className }: DashboardEmbedProps) {
  const frameClassName = cn(
    "aspect-[16/10] w-full overflow-hidden rounded-xl border bg-surface-lowest",
    className,
  );

  if (embed.iframeSrc) {
    return (
      <div className={cn(frameClassName, "border-outline-variant/50 shadow-lg")}>
        <iframe
          src={embed.iframeSrc}
          title={embed.iframeTitle}
          className="h-full w-full border-0"
          loading="lazy"
          allow="fullscreen"
        />
      </div>
    );
  }

  if (embed.videoSrc) {
    return (
      <div className={cn(frameClassName, "border-outline-variant/50 shadow-lg")}>
        <video
          className="h-full w-full object-cover"
          controls
          playsInline
          aria-label={embed.iframeTitle}
        >
          <source
            src={embed.videoSrc}
            type={isVideoSrc(embed.videoSrc) ? undefined : "video/mp4"}
          />
        </video>
      </div>
    );
  }

  return (
    <div
      className={cn(
        frameClassName,
        "relative border-dashed border-primary/35 bg-surface-container-low",
      )}
    >
      <iframe
        src="about:blank"
        title={embed.iframeTitle}
        className="h-full w-full border-0 opacity-0"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span
          aria-hidden="true"
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-2xl text-primary"
        >
          ▣
        </span>
        <h3 className="max-w-sm text-base font-bold text-on-surface md:text-lg">
          {embed.placeholderTitle}
        </h3>
        <p className="mt-1.5 max-w-xs text-xs leading-5 text-on-surface-variant md:text-sm">
          {embed.placeholderDescription}
        </p>
      </div>
    </div>
  );
}
