import { describe, expect, it } from "vitest";
import {
  allowPlaceholderContent,
  filterPublishableContent,
  resolveEditorialSet,
} from "./content-integrity";

describe("allowPlaceholderContent", () => {
  it("allows placeholders in development", () => {
    expect(
      allowPlaceholderContent({ nodeEnv: "development", vercelEnv: "" }),
    ).toBe(true);
  });

  it("blocks placeholders in production", () => {
    expect(
      allowPlaceholderContent({ nodeEnv: "production", vercelEnv: "" }),
    ).toBe(false);
  });

  it("blocks placeholders on Vercel production even if NODE_ENV is odd", () => {
    expect(
      allowPlaceholderContent({
        nodeEnv: "development",
        vercelEnv: "production",
      }),
    ).toBe(false);
  });

  it("allows placeholders on Vercel preview", () => {
    expect(
      allowPlaceholderContent({
        nodeEnv: "production",
        vercelEnv: "preview",
      }),
    ).toBe(true);
  });
});

describe("resolveEditorialSet", () => {
  const featured = { id: "a", isPlaceholder: true };
  const secondary = [
    { id: "b", isPlaceholder: true },
    { id: "c", isPlaceholder: false },
  ];

  it("returns preview set in development", () => {
    const result = resolveEditorialSet(featured, secondary, {
      nodeEnv: "development",
      vercelEnv: "",
    });
    expect(result.mode).toBe("preview");
    expect(result.hasItems).toBe(true);
    expect(result.featured).toEqual(featured);
  });

  it("omits placeholders in production", () => {
    const result = resolveEditorialSet(featured, secondary, {
      nodeEnv: "production",
      vercelEnv: "",
    });
    expect(result.mode).toBe("publishable");
    expect(result.featured).toBeNull();
    expect(result.secondary).toEqual([{ id: "c", isPlaceholder: false }]);
    expect(result.hasItems).toBe(true);
  });

  it("reports empty when only placeholders exist in production", () => {
    const result = resolveEditorialSet(
      featured,
      [{ id: "b", isPlaceholder: true }],
      { nodeEnv: "production", vercelEnv: "" },
    );
    expect(result.hasItems).toBe(false);
  });
});

describe("filterPublishableContent", () => {
  it("keeps only non-placeholder records", () => {
    expect(
      filterPublishableContent([
        { isPlaceholder: true },
        { isPlaceholder: false },
      ]),
    ).toEqual([{ isPlaceholder: false }]);
  });
});
