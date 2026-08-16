/**
 * Content-fit layout breakpoints for Promptstack.
 * Keep in sync with `--breakpoint-*` tokens in `src/styles/globals.css`.
 */
export const breakpoints = {
  /** Full horizontal desktop navigation becomes available. */
  nav: 1024,
  /** Moderately roomier desktop header density. */
  navMd: 1180,
  /** Default Tailwind xl — normal desktop density. */
  xl: 1280,
  /** Spacious desktop header density. */
  wide: 1440,
} as const;

export const DESKTOP_NAV_MIN_WIDTH = breakpoints.nav;
