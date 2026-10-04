import { promises as fs } from "fs";
import path from "path";

export type StoredBooking = {
  id: string;
  start: string;
  end: string;
  name: string;
  email: string;
  notes?: string;
  joinUrl: string;
  startUrl?: string | null;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "booking");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

export async function listBookings(): Promise<StoredBooking[]> {
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredBooking[];
    if (!Array.isArray(parsed)) return [];
    return parsed.sort((a, b) => b.start.localeCompare(a.start));
  } catch {
    return [];
  }
}

export async function getBookingStats() {
  const bookings = await listBookings();
  const now = Date.now();
  const upcoming = bookings
    .filter((b) => Date.parse(b.start) >= now)
    .sort((a, b) => a.start.localeCompare(b.start));
  const past = bookings.filter((b) => Date.parse(b.start) < now);
  return {
    total: bookings.length,
    upcoming: upcoming.length,
    past: past.length,
    next: upcoming[0] || null,
  };
}
