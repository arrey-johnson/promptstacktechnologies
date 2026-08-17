import type { Metadata } from "next";
import { LegalPageShell } from "@/components/company";
import { ManageAnalyticsPreference } from "@/components/company/ManageAnalyticsPreference";
import { interimLegalNotice } from "@/content/company";
import { getLegalPageRobots } from "@/lib/legal/legal-indexing";
import {
  getEditorStorageInventory,
  getPublicStorageInventory,
  hasMarketingAnalyticsCookies,
} from "@/lib/legal/storage-inventory";
import { createPageMetadata } from "@/lib/seo/page-metadata";

/**
 * Cookies page describing CURRENT implementation only.
 * Consent UI appears when GTM is configured; interim legal review still required.
 */
export const metadata: Metadata = createPageMetadata({
  title: "Cookies",
  description:
    "How the Promptstack Technologies website currently uses cookies and browser storage.",
  path: "/cookies",
  robots: getLegalPageRobots("cookies"),
});

export default function CookiesPage() {
  const { heading, status } = interimLegalNotice.cookies;
  const publicItems = getPublicStorageInventory();
  const editorItems = getEditorStorageInventory();
  const hasAnalytics = hasMarketingAnalyticsCookies();

  return (
    <LegalPageShell title={heading} lead={status}>
      <section aria-labelledby="cookies-public-heading">
        <h2
          id="cookies-public-heading"
          className="text-xl font-medium text-text-primary md:text-2xl"
        >
          Public visitor behavior
        </h2>
        <p className="mt-4">
          {hasAnalytics
            ? "Essential and functional storage may be used for forms and security. Optional analytics loads only after you accept analytics cookies."
            : "For ordinary browsing of marketing pages, Promptstack does not currently load Google Tag Manager or Google Analytics on this deployment."}
        </p>
        <ul className="mt-6 space-y-5">
          {publicItems.map((item) => (
            <li key={item.id}>
              <h3 className="text-lg font-medium text-text-primary">
                {item.name}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.08em] text-text-muted">
                {item.mechanism} · {item.category}
                {item.lifetime ? ` · ${item.lifetime}` : ""}
              </p>
              <p className="mt-2">{item.purpose}</p>
            </li>
          ))}
        </ul>
        {!hasAnalytics ? (
          <p className="mt-6">
            When a GTM container ID is configured in the deployment environment,
            an analytics preference control and consent prompt will become
            available. Advertising pixels are not part of this website.
          </p>
        ) : null}
        <ManageAnalyticsPreference />
      </section>

      <section aria-labelledby="cookies-editor-heading" className="mt-12">
        <h2
          id="cookies-editor-heading"
          className="text-xl font-medium text-text-primary md:text-2xl"
        >
          Editor / Draft Mode behavior
        </h2>
        <p className="mt-4">
          The following applies to authorized editorial preview sessions, not to
          ordinary public visitors.
        </p>
        <ul className="mt-6 space-y-5">
          {editorItems.map((item) => (
            <li key={item.id}>
              <h3 className="text-lg font-medium text-text-primary">
                {item.name}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.08em] text-text-muted">
                {item.mechanism} · {item.category}
              </p>
              <p className="mt-2">{item.purpose}</p>
            </li>
          ))}
        </ul>
      </section>
    </LegalPageShell>
  );
}
