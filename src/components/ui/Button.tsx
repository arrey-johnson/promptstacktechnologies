import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary" | "text";
type ButtonSize = "md" | "lg";
/** Inverse for navy/dark surfaces (Final CTA, etc.). */
type ButtonTone = "default" | "inverse";

const variantClasses: Record<ButtonVariant, Record<ButtonTone, string>> = {
  primary: {
    default:
      "bg-accent text-text-inverse hover:bg-accent-hover border border-transparent",
    inverse:
      "bg-accent text-text-inverse hover:bg-accent-hover border border-transparent",
  },
  secondary: {
    default:
      "bg-surface-primary text-text-primary border border-border-strong hover:bg-surface-muted",
    inverse:
      "bg-transparent text-text-inverse border border-white/40 hover:bg-white/10",
  },
  text: {
    default:
      "bg-transparent text-text-primary border border-transparent hover:text-accent px-0",
    inverse:
      "bg-transparent text-text-inverse border border-transparent hover:text-brand-lavender px-0",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-6 text-base",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius-button)] font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50";

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  tone?: ButtonTone;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  tone = "default",
  ...props
}: ButtonProps) {
  const classes = cn(
    baseClasses,
    variantClasses[variant][tone],
    variant === "text" ? "min-h-11" : sizeClasses[size],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

/** Alias matching the architecture component list. */
export function LinkButton(props: ButtonAsLink) {
  return <Button {...props} />;
}
