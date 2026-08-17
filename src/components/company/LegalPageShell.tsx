import type { ReactNode } from "react";
import { Container, Eyebrow, Heading, Section, Text } from "@/components/ui";

type LegalPageShellProps = {
  eyebrow?: string;
  title: string;
  lead: string;
  children: ReactNode;
};

export function LegalPageShell({
  eyebrow = "Legal",
  title,
  lead,
  children,
}: LegalPageShellProps) {
  return (
    <main id="main-content">
      <Section tone="primary" spacious>
        <Container>
          <div className="mx-auto max-w-3xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <Heading level={1} className="mt-5 text-text-primary">
              {title}
            </Heading>
            <Text size="lead" muted className="mt-5">
              {lead}
            </Text>
            <div className="mt-10 space-y-6 text-[1.0625rem] leading-relaxed text-text-secondary md:text-lg">
              {children}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
