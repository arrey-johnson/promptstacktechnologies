export const BOOKING_TIMEZONE = "Africa/Douala";
/** Africa/Douala is permanently UTC+1 (no DST). */
export const BOOKING_UTC_OFFSET = "+01:00";

export const BOOKING_START_HOUR = 8;
export const BOOKING_END_HOUR = 17;
export const BOOKING_SLOT_MINUTES = 30;
/** Last slot must end by 17:00. */
export const BOOKING_LAST_START_MINUTES =
  BOOKING_END_HOUR * 60 - BOOKING_SLOT_MINUTES;

export const BOOKING_EVENT_TITLE = "Promptstack Discovery Call";
export const BOOKING_LOOKAHEAD_DAYS = 60;

export function isZoomBookingConfigured() {
  return Boolean(
    process.env.ZOOM_ACCOUNT_ID &&
      process.env.ZOOM_CLIENT_ID &&
      process.env.ZOOM_CLIENT_SECRET &&
      (process.env.ZOOM_HOST_EMAIL || process.env.ZOOM_USER_ID),
  );
}

export function getZoomHostUser() {
  return process.env.ZOOM_USER_ID || process.env.ZOOM_HOST_EMAIL || "";
}

export function getBookingNotifyEmail() {
  return (
    process.env.BOOKING_NOTIFY_EMAIL ||
    process.env.ZOOM_HOST_EMAIL ||
    "hello@promptstacktechnologies.com"
  );
}
