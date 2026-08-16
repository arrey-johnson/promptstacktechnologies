import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type SiteLogoProps = {
  className?: string;
  /** Use the compact icon mark in tight contexts (e.g. very small viewports). */
  variant?: "full" | "icon";
  /** Progressive sizing for the sticky header across desktop densities. */
  density?: "default" | "header";
  priority?: boolean;
};

/**
 * Official logo aspect ≈ 357×79 (~4.52:1).
 * Always size through a constrained box so the SVG intrinsic width (357px)
 * cannot dominate mobile layout.
 */
export function SiteLogo({
  className,
  variant = "full",
  density = "default",
  priority = false,
}: SiteLogoProps) {
  const isIcon = variant === "icon";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center rounded-[var(--radius-button)]",
        className,
      )}
      aria-label="Promptstack Technologies home"
    >
      {isIcon ? (
        <Image
          src="/brand/promptstack-icon.svg"
          alt="Promptstack Technologies"
          width={40}
          height={40}
          priority={priority}
          className="h-9 w-9"
        />
      ) : (
        <span
          className={cn(
            "relative block overflow-hidden",
            density === "default" &&
              "h-[32px] w-[148px] sm:h-[36px] sm:w-[168px]",
            density === "header" &&
              // Mobile/tablet (< nav): ~150–158px — calm header balance.
              // Desktop (nav+): subtle ~5–10% presence increase vs Epic 2.
              [
                "h-[33px] w-[150px] max-w-[min(150px,calc(100vw-7.5rem))]",
                "min-[400px]:h-[34px] min-[400px]:w-[158px] min-[400px]:max-w-[158px]",
                "nav:h-[34px] nav:w-[150px] nav:max-w-[150px]",
                "nav-md:h-9 nav-md:w-[164px] nav-md:max-w-[164px]",
                "xl:h-10 xl:w-[180px] xl:max-w-[180px]",
              ].join(" "),
          )}
        >
          <Image
            src="/brand/promptstack-logo.svg"
            alt="Promptstack Technologies"
            fill
            priority={priority}
            sizes="(max-width: 1023px) 158px, 168px"
            className="object-contain object-left"
          />
        </span>
      )}
    </Link>
  );
}
