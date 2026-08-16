"use client";

import { useId, useState } from "react";
import { Container, Heading, Section, Text } from "@/components/ui";
import type { FaqItem } from "@/content/solutions/types";
import { cn } from "@/lib/cn";

type FAQSectionProps = {
  heading?: string;
  intro?: string;
  items: readonly FaqItem[];
};

export function FAQSection({
  heading = "Frequently asked questions",
  intro = "Practical answers to common questions. Project-specific details such as scope and commercial terms are defined during discovery.",
  items,
}: FAQSectionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section
      tone="muted"
      spacious
      data-section="faq"
      aria-labelledby="faq-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Heading id="faq-heading" level={2} className="text-text-primary">
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5">
            {intro}
          </Text>
        </div>

        <div className="mt-10 divide-y divide-border-soft border-y border-border-soft">
          {items.map((item, index) => {
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;
            const isOpen = openIndex === index;

            return (
              <div key={item.question} className="py-1">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index,
                      )
                    }
                  >
                    <span className="text-lg font-medium text-text-primary md:text-xl">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-border-soft text-lg leading-none text-text-primary transition-transform duration-200",
                        isOpen && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="pb-5 pr-12"
                >
                  <Text muted>{item.answer}</Text>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
