import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeadingLevel = 1 | 2 | 3 | 4;

const levelClasses: Record<HeadingLevel, string> = {
  1: "text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight font-bold",
  2: "text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-tight font-bold",
  3: "text-2xl md:text-[1.75rem] lg:text-3xl leading-snug font-medium",
  4: "text-xl md:text-2xl leading-snug font-medium",
};

type HeadingProps<T extends ElementType = "h2"> = {
  as?: T;
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className" | "level">;

export function Heading<T extends ElementType = "h2">({
  as,
  level = 2,
  children,
  className,
  ...props
}: HeadingProps<T>) {
  const Component = as ?? (`h${level}` as ElementType);

  return (
    <Component
      className={cn(
        /*
          Inherit section tone by default so dark surfaces (Final CTA) receive
          inverse text. Explicit text-* utilities in className still override.
        */
        "text-balance text-inherit",
        levelClasses[level],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

type TextProps = {
  children: ReactNode;
  className?: string;
  size?: "base" | "lg" | "lead";
  muted?: boolean;
} & ComponentPropsWithoutRef<"p">;

const textSizeClasses = {
  base: "text-[1.0625rem] leading-relaxed md:text-lg",
  lg: "text-lg leading-relaxed md:text-xl",
  lead: "text-lg leading-relaxed md:text-xl lg:text-[1.35rem]",
} as const;

export function Text({
  children,
  className,
  size = "base",
  muted = false,
  ...props
}: TextProps) {
  return (
    <p
      className={cn(
        "max-w-prose",
        textSizeClasses[size],
        muted ? "text-text-secondary" : "text-inherit",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
