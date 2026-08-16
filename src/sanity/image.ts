import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { dataset, getStudioProjectId } from "./env";

const builder = createImageUrlBuilder({
  projectId: getStudioProjectId(),
  dataset,
});

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

export type SanityImageFields = {
  asset?: { _ref?: string; _id?: string } | null;
  alt?: string | null;
  hotspot?: unknown;
  crop?: unknown;
} | null;

export function resolveSanityImage(
  image: SanityImageFields,
  options?: { width?: number; height?: number },
): { src: string; alt: string } | null {
  if (!image?.asset) return null;
  let imageBuilder = urlForImage(image as SanityImageSource)
    .auto("format")
    .fit("max");
  if (options?.width) imageBuilder = imageBuilder.width(options.width);
  if (options?.height) imageBuilder = imageBuilder.height(options.height);
  const src = imageBuilder.url();
  if (!src) return null;
  return {
    src,
    alt: image.alt?.trim() || "",
  };
}
