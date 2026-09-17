/** Public launch instant: 1 October 2026, 00:00 Africa/Douala (WAT, UTC+1). */
export const LAUNCH_AT_ISO = "2026-10-01T00:00:00+01:00";
export const LAUNCH_AT_MS = Date.parse(LAUNCH_AT_ISO);

export type TimeRemaining = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

export function getTimeRemaining(
  nowMs: number,
  launchAtMs = LAUNCH_AT_MS,
): TimeRemaining {
  const totalMs = Math.max(0, launchAtMs - nowMs);
  const expired = totalMs <= 0;
  const totalSeconds = Math.floor(totalMs / 1000);

  return {
    totalMs,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired,
  };
}

export function padUnit(value: number, minDigits = 2): string {
  return String(value).padStart(minDigits, "0");
}

const STATIC_FILE =
  /\.(?:avif|css|gif|ico|jpe?g|js|json|map|mp4|png|svg|txt|webm|webp|woff2?|xml)$/i;

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

/**
 * Public lock is on until 1 October 2026 unless COMING_SOON=false.
 * Set COMING_SOON=true to keep the lock after launch (preview the gate).
 */
export function isComingSoonLockActive({
  nowMs = Date.now(),
  env = process.env.COMING_SOON,
}: {
  nowMs?: number;
  env?: string;
} = {}): boolean {
  if (env === "false") return false;
  if (env === "true") return true;
  return nowMs < LAUNCH_AT_MS;
}

/** Routes that stay reachable while the public site is locked. */
export function isComingSoonBypassPath(pathname: string): boolean {
  const path = normalizePathname(pathname);

  if (path === "/") return true;
  if (path.startsWith("/_next/")) return true;
  if (path === "/studio" || path.startsWith("/studio/")) return true;
  if (path === "/api" || path.startsWith("/api/")) return true;
  if (STATIC_FILE.test(path)) return true;

  return false;
}
