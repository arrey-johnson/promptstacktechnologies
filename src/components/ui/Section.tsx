import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionTone = "primary" | "soft" | "muted" | "dark";

const toneClasses: Record<SectionTone, string> = {
  primary: "bg-surface-primary text-text-primary",
  soft: "bg-surface-soft text-text-primary",
  muted: "bg-surface-muted text-text-primary",
  dark: "bg-surface-dark text-text-inverse",
};

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  tone?: SectionTone;
  /** Extra vertical padding for major editorial sections */
  spacious?: boolean;
} & Omit<
  ComponentPropsWithoutRef<T>,
  "as" | "children" | "className" | "tone" | "spacious"
>;

export function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  tone = "primary",
  spacious = false,
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";

  return (
    <Component
      className={cn(
        toneClasses[tone],
        spacious ? "py-16 md:py-20 lg:py-24" : "py-12 md:py-16 lg:py-20",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
