/**
 * Centralized interim legal-page indexing.
 * Interim / legally unapproved legal content remains noindex until approved.
 */

export type LegalPageKind = "privacy" | "terms" | "cookies";

/**
 * Whether a legal page may be indexed.
 * All current legal pages are interim until explicit approval flips these.
 */
export function isLegalPageIndexable(kind: LegalPageKind): boolean {
  void kind;
  return false;
}

export function getLegalPageRobots(kind: LegalPageKind) {
  return {
    index: isLegalPageIndexable(kind),
    follow: true,
  };
}

/** Sitemap should exclude interim noindex legal pages. */
export function shouldIncludeLegalPageInSitemap(kind: LegalPageKind): boolean {
  return isLegalPageIndexable(kind);
}
