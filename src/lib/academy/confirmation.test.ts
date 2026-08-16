import { describe, expect, it } from "vitest";
import {
  ACADEMY_APPLICATION_RECEIVED_PATH,
  getAcademyApplicationReceivedPath,
} from "./confirmation";

describe("academy confirmation path", () => {
  it("does not expose internal application IDs in the confirmation URL", () => {
    expect(ACADEMY_APPLICATION_RECEIVED_PATH).toBe(
      "/academy/application-received",
    );
    expect(getAcademyApplicationReceivedPath()).not.toContain("?");
    expect(getAcademyApplicationReceivedPath()).not.toContain("ref=");
  });
});
