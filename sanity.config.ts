import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import {
  apiVersion,
  dataset,
  getStudioProjectId,
} from "./src/sanity/env";
import { presentationResolve } from "./src/sanity/presentation/resolve";
import { schemaTypes } from "./src/sanity/schemas";
import { structure } from "./src/sanity/structure";

const projectId = getStudioProjectId();

export default defineConfig({
  name: "promptstack",
  title: "Promptstack Technologies",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      resolve: presentationResolve,
      previewUrl: {
        initial: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
  },
});
