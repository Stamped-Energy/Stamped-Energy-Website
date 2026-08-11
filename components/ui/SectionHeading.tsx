import { SectionBadge } from "@/components/ui/SectionBadge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div className={cn(align === "center" && "flex justify-center")}>
          <SectionBadge label={eyebrow} alternate={dark} />
        </div>
      ) : null}
      <h2
        className={cn(
          "font-display text-[1.65rem] font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl",
          eyebrow ? "mt-5" : null,
          dark ? "text-on-secondary" : "text-on-surface",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 text-sm leading-6 sm:mt-4 sm:text-base sm:leading-7 md:text-lg",
            dark ? "text-on-secondary/80" : "text-on-surface-variant",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
