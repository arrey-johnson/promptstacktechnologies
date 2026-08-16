import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { homepageCapabilities } from "@/content/homepage";

export function CapabilityStrip() {
  return (
    <Section
      tone="muted"
      className="border-y border-border-soft py-4 md:py-5"
      data-section="capability-strip"
      aria-label="Promptstack capabilities"
    >
      <Container>
        <ul className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:justify-center lg:gap-x-0">
          {homepageCapabilities.map((item, index) => (
            <li
              key={item.href}
              className="flex items-center sm:gap-0 lg:px-2 xl:px-3"
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className="mx-4 hidden h-4 w-px bg-border-strong/50 sm:mx-5 sm:block lg:mx-7 xl:mx-9"
                />
              ) : null}
              <Link
                href={item.href}
                className="text-[0.95rem] font-medium tracking-wide text-text-primary transition-colors duration-200 hover:text-accent md:text-base"
                data-analytics={`nav_capability_${item.href.replace(/\//g, "_")}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
