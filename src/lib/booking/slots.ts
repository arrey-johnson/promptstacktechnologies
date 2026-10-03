import {
  BOOKING_LAST_START_MINUTES,
  BOOKING_SLOT_MINUTES,
  BOOKING_START_HOUR,
  BOOKING_UTC_OFFSET,
} from "./config";

export type TimeSlot = {
  start: string;
  end: string;
  label: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

/** Calendar date YYYY-MM-DD interpreted in Africa/Douala. */
export function doualaToUtcIso(date: string, hour: number, minute: number) {
  return new Date(
    `${date}T${pad(hour)}:${pad(minute)}:00${BOOKING_UTC_OFFSET}`,
  ).toISOString();
}

export function isBookingWeekday(date: string) {
  const day = new Date(`${date}T12:00:00${BOOKING_UTC_OFFSET}`).getUTCDay();
  return day >= 1 && day <= 6;
}

export function formatSlotLabel(hour: number, minute: number) {
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${h12}:${pad(minute)} ${period}`;
}

export function listDaySlotStarts(date: string): TimeSlot[] {
  if (!isBookingWeekday(date)) return [];

  const slots: TimeSlot[] = [];
  for (
    let minutes = BOOKING_START_HOUR * 60;
    minutes <= BOOKING_LAST_START_MINUTES;
    minutes += BOOKING_SLOT_MINUTES
  ) {
    const hour = Math.floor(minutes / 60);
    const minute = minutes % 60;
    const endMinutes = minutes + BOOKING_SLOT_MINUTES;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;

    slots.push({
      start: doualaToUtcIso(date, hour, minute),
      end: doualaToUtcIso(date, endHour, endMinute),
      label: `${formatSlotLabel(hour, minute)} – ${formatSlotLabel(endHour, endMinute)}`,
    });
  }
  return slots;
}

export function overlaps(
  slotStart: string,
  slotEnd: string,
  busyStart: string,
  busyEnd: string,
) {
  const a = Date.parse(slotStart);
  const b = Date.parse(slotEnd);
  const c = Date.parse(busyStart);
  const d = Date.parse(busyEnd);
  return a < d && b > c;
}

export function filterAvailableSlots(
  slots: TimeSlot[],
  busy: Array<{ start?: string | null; end?: string | null }>,
  nowMs = Date.now(),
) {
  return slots.filter((slot) => {
    if (Date.parse(slot.start) <= nowMs) return false;
    return !busy.some(
      (block) =>
        block.start &&
        block.end &&
        overlaps(slot.start, slot.end, block.start, block.end),
    );
  });
}

export function listBookableDates(days = 60) {
  const dates: string[] = [];
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Africa/Douala",
  });
  let [year, month, day] = today.split("-").map(Number);

  for (let i = 0; i < days; i += 1) {
    const isoDate = `${year}-${pad(month)}-${pad(day)}`;
    if (isBookingWeekday(isoDate)) dates.push(isoDate);
    const next = new Date(Date.UTC(year, month - 1, day + 1));
    year = next.getUTCFullYear();
    month = next.getUTCMonth() + 1;
    day = next.getUTCDate();
  }
  return dates;
}
