import Image from "next/image";
import { cn } from "@/lib/cn";

export type HomeSectionVisualId =
  | "software"
  | "automation"
  | "marketing"
  | "academy";

const VISUALS: Record<
  HomeSectionVisualId,
  {
    src: string;
    /** Atmospheric brand support — meaning lives in adjacent copy. */
    decorative: boolean;
    aspectClass: string;
    objectPosition: string;
  }
> = {
  software: {
    src: "/images/home/home-software-solutions.webp",
    decorative: true,
    aspectClass: "aspect-[4/3] lg:aspect-[5/4]",
    objectPosition: "object-[50%_40%]",
  },
  automation: {
    src: "/images/home/home-ai-automation.webp",
    decorative: true,
    aspectClass: "aspect-[4/3] lg:aspect-[5/4]",
    objectPosition: "object-[52%_38%]",
  },
  marketing: {
    src: "/images/home/home-digital-marketing.webp",
    decorative: true,
    aspectClass: "aspect-[4/3] lg:aspect-[5/4]",
    objectPosition: "object-[48%_35%]",
  },
  academy: {
    src: "/images/home/home-academy.webp",
    decorative: true,
    aspectClass:
      "aspect-[5/4] max-h-[18rem] sm:max-h-[22rem] sm:aspect-[5/4] lg:max-h-none lg:aspect-auto lg:min-h-[22rem] lg:h-full",
    objectPosition: "object-[50%_35%]",
  },
};

type HomeSectionVisualProps = {
  id: HomeSectionVisualId;
  className?: string;
};

/**
 * Homepage section photography from the approved hero visual campaign.
 * Below-the-fold: lazy by default (no priority).
 */
export function HomeSectionVisual({ id, className }: HomeSectionVisualProps) {
  const visual = VISUALS[id];

  return (
    <div
      aria-hidden={visual.decorative ? true : undefined}
      className={cn(
        "relative w-full overflow-hidden rounded-[var(--radius-visual)]",
        visual.aspectClass,
        className,
      )}
    >
      <Image
        src={visual.src}
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className={cn("object-cover", visual.objectPosition)}
      />
    </div>
  );
}
