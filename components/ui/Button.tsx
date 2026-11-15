import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline" | "on-dark";
type ButtonSize = "md" | "lg";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  "aria-label"?: string;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/** v4: primary = ink (AA). Coral is accent only, never button fill with white text. */
const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "border border-secondary bg-secondary text-on-secondary",
    "transition-[transform,opacity] duration-200 ease-out",
    "hover:-translate-y-px hover:opacity-90",
    "active:translate-y-0",
  ),
  secondary: cn(
    "border border-outline-variant bg-transparent text-on-surface",
    "transition-colors duration-200 hover:bg-surface-low",
  ),
  outline: cn(
    "border border-outline-variant bg-transparent text-on-surface",
    "transition-colors duration-200 hover:bg-surface-low",
  ),
  ghost: cn(
    "border border-transparent bg-transparent text-on-surface",
    "transition-colors duration-200 hover:bg-surface-low",
    "[&_svg]:transition-transform [&_svg]:duration-200 hover:[&_svg]:translate-x-0.5",
  ),
  "on-dark": cn(
    "border border-white/20 bg-white text-secondary",
    "transition-[transform,opacity] duration-200 ease-out",
    "hover:-translate-y-px hover:opacity-95",
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm sm:h-11",
  lg: "h-12 px-6 text-sm sm:h-[52px]",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50";

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return "href" in props && Boolean(props.href);
}

export function Button(props: ButtonProps) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
    "aria-label": ariaLabel,
  } = props;

  const classes = cn(baseClasses, sizeClasses[size], variantClasses[variant], className);

  if (isLinkProps(props)) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} aria-label={ariaLabel} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props;
  return (
    <button type={type} className={classes} aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
