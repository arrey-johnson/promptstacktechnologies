import { describe, expect, it } from "vitest";
import { metadata } from "./page";

describe("confirmation indexing", () => {
  it("remains noindex, nofollow", () => {
    expect(metadata.robots).toEqual({
      index: false,
      follow: false,
    });
  });
});
