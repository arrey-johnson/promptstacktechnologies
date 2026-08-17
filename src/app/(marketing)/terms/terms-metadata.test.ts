import { describe, expect, it } from "vitest";
import { metadata } from "./page";

describe("interim terms indexing", () => {
  it("sets noindex, follow until legal content is approved", () => {
    expect(metadata.robots).toEqual({
      index: false,
      follow: true,
    });
  });
});
