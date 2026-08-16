import type { Metadata } from "next";
import { Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo/page-metadata";

/**
 * Interim privacy page for form linking.
 * TODO_CONTENT / legal review: replace with approved Privacy Policy before launch.
 * Until then: noindex, follow. Become normally indexable only after legal approval.
 */
export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Promptstack Technologies handles information submitted through the website.",
  path: "/privacy",
  robots: {
    index: false,
    follow: true,
  },
});

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <Section tone="primary" spacious>
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Legal</Eyebrow>
            <Heading level={1} as="h1" className="mt-5 text-text-primary">
              Privacy Policy
            </Heading>
            <Text size="lead" muted className="mt-5">
              Promptstack Technologies is preparing a complete Privacy Policy for
              legal review.
            </Text>
            <Text muted className="mt-6">
              When you submit a project inquiry through this website, we use the
              information you provide to review and respond to that inquiry.
              Personal information submitted through the Start a Project form is
              stored as a business lead record and may be used to contact you
              about the request.
            </Text>
            <Text muted className="mt-4">
              This page is an interim notice so visitors can understand the
              immediate purpose of form collection. It is not a final legal
              policy and should be replaced with approved legal content before
              public launch.
            </Text>
            <Text muted className="mt-4">
              For privacy questions related to a submitted inquiry, use the
              contact details published by Promptstack once verified contact
              information is available on this website.
            </Text>
          </div>
        </Container>
      </Section>
    </main>
  );
}
