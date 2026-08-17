import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageShell } from "@/components/company";
import { interimLegalNotice } from "@/content/company";
import { getLegalPageRobots } from "@/lib/legal/legal-indexing";
import { createPageMetadata } from "@/lib/seo/page-metadata";

/**
 * Interim Terms of Use route.
 * No fabricated binding legal document — professional interim state only.
 */
export const metadata: Metadata = createPageMetadata({
  title: "Terms of Use",
  description:
    "Interim information about Promptstack Technologies website terms.",
  path: "/terms",
  robots: getLegalPageRobots("terms"),
});

export default function TermsPage() {
  const { heading, status } = interimLegalNotice.terms;

  return (
    <LegalPageShell title={heading} lead={status}>
      <p>
        Until lawyer-approved Terms of Use are published, this page exists so
        visitors and partners have a stable legal route in the site structure.
        It is not a substitute for a complete Terms document.
      </p>
      <p>
        For project work, use{" "}
        <Link
          href="/start-a-project"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Start a Project
        </Link>
        . For general company contact, use{" "}
        <Link
          href="/contact"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Contact
        </Link>
        .
      </p>
      <p>
        Related interim notices:{" "}
        <Link
          href="/privacy"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Privacy
        </Link>{" "}
        and{" "}
        <Link
          href="/cookies"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Cookies
        </Link>
        .
      </p>
    </LegalPageShell>
  );
}
