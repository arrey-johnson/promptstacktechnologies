import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const textLinkClasses =
  "font-medium text-text-primary underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-accent hover:decoration-accent";

type InternalTextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "children" | "className">;

export function TextLink({
  href,
  children,
  className,
  ...props
}: InternalTextLinkProps) {
  return (
    <Link href={href} className={cn(textLinkClasses, className)} {...props}>
      {children}
    </Link>
  );
}

type ExternalTextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "children" | "className">;

export function ExternalTextLink({
  href,
  children,
  className,
  ...props
}: ExternalTextLinkProps) {
  return (
    <a
      href={href}
      className={cn(textLinkClasses, className)}
      rel="noopener noreferrer"
      {...props}
    >
      {children}
    </a>
  );
}
