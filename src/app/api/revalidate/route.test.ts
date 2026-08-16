import { beforeEach, describe, expect, it, vi } from "vitest";

const parseBody = vi.fn();
const applySanityPublicationRevalidation = vi.fn();
const isSanityConfigured = vi.fn(() => true);
const getRevalidateSecret = vi.fn(() => "test-secret");

vi.mock("next-sanity/webhook", () => ({
  parseBody: (...args: unknown[]) => parseBody(...args),
}));

vi.mock("@/sanity/lib/revalidate", () => ({
  applySanityPublicationRevalidation: (...args: unknown[]) =>
    applySanityPublicationRevalidation(...args),
}));

vi.mock("@/sanity/env", () => ({
  isSanityConfigured: () => isSanityConfigured(),
  getRevalidateSecret: () => getRevalidateSecret(),
}));

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isSanityConfigured.mockReturnValue(true);
    getRevalidateSecret.mockReturnValue("test-secret");
  });

  it("rejects invalid webhook signatures", async () => {
    parseBody.mockResolvedValue({
      isValidSignature: false,
      body: { _type: "caseStudy" },
    });

    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body: "{}",
      }) as never,
    );
    expect(res.status).toBe(401);
    expect(applySanityPublicationRevalidation).not.toHaveBeenCalled();
  });

  it("accepts a valid webhook and revalidates tags", async () => {
    parseBody.mockResolvedValue({
      isValidSignature: true,
      body: { _type: "caseStudy", slug: { current: "ops" } },
    });
    applySanityPublicationRevalidation.mockReturnValue({
      ok: true,
      tags: ["case-study", "sitemap", "case-study:ops"],
    });

    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body: "{}",
      }) as never,
    );
    const json = await res.json();
    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(json.tags).toContain("case-study");
    expect(applySanityPublicationRevalidation).toHaveBeenCalled();
  });

  it("fails closed when publication secret is missing", async () => {
    getRevalidateSecret.mockReturnValue(undefined as unknown as string);

    const { POST } = await import("./route");
    const res = await POST(
      new Request("http://localhost/api/revalidate", {
        method: "POST",
        body: "{}",
      }) as never,
    );
    expect(res.status).toBe(503);
    expect(parseBody).not.toHaveBeenCalled();
  });
});
