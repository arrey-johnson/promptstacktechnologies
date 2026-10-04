import { promises as fs } from "fs";
import path from "path";
import {
  BOOKING_EVENT_TITLE,
  BOOKING_SLOT_MINUTES,
  BOOKING_TIMEZONE,
  getBookingNotifyEmail,
  getZoomHostUser,
  isZoomBookingConfigured,
} from "./config";

type ZoomToken = { accessToken: string; expiresAt: number };
type LocalBooking = {
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

let cachedToken: ZoomToken | null = null;

const DATA_DIR = path.join(process.cwd(), "data", "booking");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");

async function readLocalBookings(): Promise<LocalBooking[]> {
  try {
    const raw = await fs.readFile(BOOKINGS_FILE, "utf8");
    return JSON.parse(raw) as LocalBooking[];
  } catch {
    return [];
  }
}

async function writeLocalBookings(bookings: LocalBooking[]) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf8");
  } catch (error) {
    console.error("[booking] could not persist local booking file", error);
  }
}

async function getZoomAccessToken() {
  if (!isZoomBookingConfigured()) {
    throw new Error("Zoom is not configured.");
  }

  if (cachedToken && cachedToken.expiresAt > Date.now() + 30_000) {
    return cachedToken.accessToken;
  }

  const credentials = Buffer.from(
    `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`,
  ).toString("base64");

  const res = await fetch(
    `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(
      process.env.ZOOM_ACCOUNT_ID || "",
    )}`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoom auth failed: ${text}`);
  }

  const data = (await res.json()) as {
    access_token: string;
    expires_in: number;
  };

  cachedToken = {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.accessToken;
}

async function zoomFetch(pathname: string, init?: RequestInit) {
  const token = await getZoomAccessToken();
  const res = await fetch(`https://api.zoom.us/v2${pathname}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  return res;
}

export async function getBusyBlocks(timeMin: string, timeMax: string) {
  const local = await readLocalBookings();
  const localBusy = local
    .filter((booking) => {
      const start = Date.parse(booking.start);
      const end = Date.parse(booking.end);
      return start < Date.parse(timeMax) && end > Date.parse(timeMin);
    })
    .map((booking) => ({ start: booking.start, end: booking.end }));

  if (!isZoomBookingConfigured()) {
    return localBusy;
  }

  const host = encodeURIComponent(getZoomHostUser());
  const from = timeMin.slice(0, 10);
  const to = timeMax.slice(0, 10);

  try {
    const res = await zoomFetch(
      `/users/${host}/meetings?type=scheduled&page_size=100&from=${from}&to=${to}`,
    );
    if (!res.ok) {
      console.error("[zoom] list meetings", await res.text());
      return localBusy;
    }

    const data = (await res.json()) as {
      meetings?: Array<{ start_time?: string; duration?: number }>;
    };

    const zoomBusy = (data.meetings || [])
      .filter((meeting) => meeting.start_time)
      .map((meeting) => {
        const start = meeting.start_time as string;
        const durationMs = (meeting.duration || BOOKING_SLOT_MINUTES) * 60_000;
        return {
          start,
          end: new Date(Date.parse(start) + durationMs).toISOString(),
        };
      })
      .filter(
        (block) =>
          Date.parse(block.start) < Date.parse(timeMax) &&
          Date.parse(block.end) > Date.parse(timeMin),
      );

    return [...localBusy, ...zoomBusy];
  } catch (error) {
    console.error("[zoom] busy lookup", error);
    return localBusy;
  }
}

export async function createDiscoveryZoomMeeting(input: {
  start: string;
  end: string;
  name: string;
  email: string;
  notes?: string;
}) {
  if (!isZoomBookingConfigured()) {
    throw new Error("Zoom is not configured.");
  }

  const host = encodeURIComponent(getZoomHostUser());
  const durationMinutes = Math.max(
    BOOKING_SLOT_MINUTES,
    Math.round((Date.parse(input.end) - Date.parse(input.start)) / 60_000),
  );

  const agenda = [
    `Discovery call with ${input.name}`,
    `Guest: ${input.email}`,
    `Notify host: ${getBookingNotifyEmail()}`,
    input.notes ? `Notes: ${input.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await zoomFetch(`/users/${host}/meetings`, {
    method: "POST",
    body: JSON.stringify({
      topic: `${BOOKING_EVENT_TITLE} — ${input.name}`,
      type: 2,
      start_time: input.start,
      duration: durationMinutes,
      timezone: BOOKING_TIMEZONE,
      agenda,
      default_password: false,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
        waiting_room: true,
        mute_upon_entry: true,
        email_notification: true,
        calendar_type: 1,
        meeting_invitees: [{ email: input.email }],
        private_meeting: true,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Zoom create meeting failed: ${text}`);
  }

  const meeting = (await res.json()) as {
    id?: number | string;
    join_url?: string;
    start_url?: string;
    password?: string;
  };

  const joinUrl = meeting.join_url || "";
  const bookings = await readLocalBookings();
  bookings.push({
    id: String(meeting.id || `${Date.now()}`),
    start: input.start,
    end: input.end,
    name: input.name,
    email: input.email,
    notes: input.notes || "",
    joinUrl,
    startUrl: meeting.start_url || null,
    createdAt: new Date().toISOString(),
  });
  await writeLocalBookings(bookings);

  return {
    meetingId: meeting.id ?? null,
    joinUrl,
    startUrl: meeting.start_url || null,
    password: meeting.password || null,
  };
}
