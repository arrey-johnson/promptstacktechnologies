import { describe, expect, it } from "vitest";
import {
  getProjectRequestReceivedPath,
  PROJECT_REQUEST_RECEIVED_PATH,
} from "./confirmation";

describe("confirmation path", () => {
  it("does not expose internal lead IDs in the confirmation URL", () => {
    expect(PROJECT_REQUEST_RECEIVED_PATH).toBe("/project-request-received");
    expect(getProjectRequestReceivedPath()).toBe("/project-request-received");
    expect(getProjectRequestReceivedPath()).not.toContain("?");
    expect(getProjectRequestReceivedPath()).not.toContain("ref=");
  });
});
