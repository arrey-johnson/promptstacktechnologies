"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

/**
 * Embedded Sanity Studio — editorial only.
 * Not linked from public navigation. Auth via Sanity login.
 */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
