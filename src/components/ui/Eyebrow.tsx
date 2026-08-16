import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"p">;

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-sm font-medium uppercase tracking-[0.11em] text-accent",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
