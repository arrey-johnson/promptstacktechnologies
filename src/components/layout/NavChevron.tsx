import { cn } from "@/lib/cn";

type NavChevronProps = {
  open?: boolean;
  className?: string;
};

export function NavChevron({ open = false, className }: NavChevronProps) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={cn(
        "h-3 w-3 shrink-0 text-current transition-transform duration-200",
        open && "rotate-180",
        className,
      )}
    >
      <path
        d="M2.5 4.25L6 7.75L9.5 4.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
