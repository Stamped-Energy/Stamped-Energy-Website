import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";

type ButtonBaseProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
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

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    "relative isolate overflow-hidden",
    "border border-primary bg-primary text-on-primary",
    "shadow-[0_2px_10px_-4px_color-mix(in_srgb,var(--brand-primary)_45%,transparent)]",
    "transition-[transform,box-shadow,filter] duration-200 ease-out",
    "hover:-translate-y-0.5 hover:shadow-[0_14px_32px_-12px_color-mix(in_srgb,var(--brand-primary)_58%,transparent)] hover:brightness-[1.04]",
    "active:translate-y-0 active:shadow-[0_4px_14px_-6px_color-mix(in_srgb,var(--brand-primary)_42%,transparent)] active:brightness-100",
    "disabled:hover:translate-y-0 disabled:hover:shadow-[0_2px_10px_-4px_color-mix(in_srgb,var(--brand-primary)_45%,transparent)] disabled:hover:brightness-100",
  ),
  secondary: cn(
    "bg-secondary text-on-secondary border border-secondary transition-colors duration-200",
    "hover:opacity-90",
  ),
  ghost: cn(
    "bg-transparent text-on-surface border border-transparent transition-colors duration-200",
    "hover:bg-surface-low",
  ),
  outline: cn(
    "bg-transparent text-primary border-2 border-primary transition-colors duration-200",
    "hover:bg-primary/8",
  ),
};

const baseClasses =
  "inline-flex h-11 items-center justify-center rounded-md px-5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:h-12 sm:px-6";

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return "href" in props && Boolean(props.href);
}

function ButtonInner({ children }: { children: ReactNode }) {
  return <span className="relative z-10 inline-flex items-center gap-2">{children}</span>;
}

export function Button(props: ButtonProps) {
  const { children, className, variant = "primary" } = props;
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (isLinkProps(props)) {
    if (props.external) {
      return (
        <a
          href={props.href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonInner>{children}</ButtonInner>
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes}>
        <ButtonInner>{children}</ButtonInner>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;

  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
    >
      <ButtonInner>{children}</ButtonInner>
    </button>
  );
}
