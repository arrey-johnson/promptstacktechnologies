import type { Metadata } from "next";
import { LegalPageShell } from "@/components/company";
import { interimLegalNotice } from "@/content/company";
import { getLegalPageRobots } from "@/lib/legal/legal-indexing";
import { createPageMetadata } from "@/lib/seo/page-metadata";

/**
 * Interim Privacy Policy.
 * Remains noindex until lawyer-approved final content replaces this notice.
 */
export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How Promptstack Technologies handles information submitted through the website.",
  path: "/privacy",
  robots: getLegalPageRobots("privacy"),
});

export default function PrivacyPage() {
  const { heading, status } = interimLegalNotice.privacy;

  return (
    <LegalPageShell title={heading} lead={status}>
      <section aria-labelledby="privacy-forms-heading">
        <h2
          id="privacy-forms-heading"
          className="text-xl font-medium text-text-primary md:text-2xl"
        >
          Information submitted through website forms
        </h2>
        <p className="mt-4">
          When you submit a project inquiry through Start a Project, Promptstack
          uses the information you provide to review and respond to that inquiry.
          Personal information submitted through that form is stored as a
          business lead record and may be used to contact you about the request.
        </p>
        <p className="mt-4">
          When Academy applications are enabled and you submit an Academy
          application, Promptstack uses the information you provide for
          admissions review and related communication. Application records are
          stored separately from commercial project leads.
        </p>
      </section>

      <section aria-labelledby="privacy-analytics-heading">
        <h2
          id="privacy-analytics-heading"
          className="text-xl font-medium text-text-primary md:text-2xl"
        >
          Analytics
        </h2>
        <p className="mt-4">
          When Google Tag Manager is configured on the deployment, optional
          analytics may run only after you accept analytics cookies. Rejecting
          analytics keeps measurement scripts unloaded. Analytics events use
          controlled context values and must not include form free-text or
          contact details. See the Cookies page for the current storage
          inventory and preference controls.
        </p>
      </section>

      <section aria-labelledby="privacy-interim-heading">
        <h2
          id="privacy-interim-heading"
          className="text-xl font-medium text-text-primary md:text-2xl"
        >
          Interim notice
        </h2>
        <p className="mt-4">
          This page is an interim notice so visitors can understand the
          immediate purpose of form collection. It is not a final legal policy
          and should be replaced with approved legal content before relying on
          it as a complete Privacy Policy.
        </p>
        <p className="mt-4">
          For privacy questions related to a submitted inquiry or application,
          use the verified contact details published on the Contact page when
          available.
        </p>
      </section>
    </LegalPageShell>
  );
}
