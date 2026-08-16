import { describe, expect, it } from "vitest";
import { areAcademyApplicationsEnabled } from "@/config/academy";
import {
  isPublicationWebhookConfigured,
  isSanityConfigured,
} from "@/sanity/env";
import { resolveRevalidateTags } from "@/sanity/lib/tags";

describe("CMS publication does not enable applications", () => {
  it("keeps admissions closed when Sanity publish tags resolve", () => {
    const tags = resolveRevalidateTags({
      _type: "academyProgram",
      slug: { current: "software-engineering" },
    });
    expect(tags).toContain("academy-program");

    expect(
      areAcademyApplicationsEnabled({
        ACADEMY_APPLICATIONS_ENABLED: "false",
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
        NEXT_PUBLIC_SANITY_DATASET: "production",
        SANITY_REVALIDATE_SECRET: "webhook-secret",
        ACADEMY_CONTENT_SOURCE: "sanity",
      }),
    ).toBe(false);
  });

  it("treats project configured and webhook configured as separate gates", () => {
    expect(
      isSanityConfigured({
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
        NEXT_PUBLIC_SANITY_DATASET: "production",
      }),
    ).toBe(true);

    expect(
      isPublicationWebhookConfigured({
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
        NEXT_PUBLIC_SANITY_DATASET: "production",
      }),
    ).toBe(false);

    expect(
      isPublicationWebhookConfigured({
        NEXT_PUBLIC_SANITY_PROJECT_ID: "abc123",
        NEXT_PUBLIC_SANITY_DATASET: "production",
        SANITY_REVALIDATE_SECRET: "webhook-secret",
      }),
    ).toBe(true);
  });
});
