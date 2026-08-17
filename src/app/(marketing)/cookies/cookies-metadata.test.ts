import { describe, expect, it } from "vitest";
import { metadata } from "./page";

describe("interim cookies indexing", () => {
  it("sets noindex, follow until legal review completes", () => {
    expect(metadata.robots).toEqual({
      index: false,
      follow: true,
    });
  });
});
