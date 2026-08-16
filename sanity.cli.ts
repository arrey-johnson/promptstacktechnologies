import { defineCliConfig } from "sanity/cli";
import { dataset, getStudioProjectId } from "./src/sanity/env";

export default defineCliConfig({
  api: {
    projectId: getStudioProjectId(),
    dataset,
  },
  studioHost: "promptstack",
});
