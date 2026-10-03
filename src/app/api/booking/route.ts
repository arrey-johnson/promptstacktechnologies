import { NextResponse } from "next/server";
import { z } from "zod";
import { isZoomBookingConfigured } from "@/lib/booking/config";
import { createDiscoveryZoomMeeting, getBusyBlocks } from "@/lib/booking/zoom";
import { filterAvailableSlots, listDaySlotStarts } from "@/lib/booking/slots";

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  notes: z.string().trim().max(1000).optional(),
  start: z.string().datetime(),
  end: z.string().datetime(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(request: Request) {
  if (!isZoomBookingConfigured()) {
    return NextResponse.json(
      {
        message:
          "Zoom booking is not connected yet. Add Zoom Server-to-Server credentials to .env.local.",
      },
      { status: 503 },
    );
  }

  let body: z.infer<typeof bookingSchema>;
  try {
    body = bookingSchema.parse(await request.json());
  } catch {
    return NextResponse.json({ message: "Invalid booking details." }, { status: 400 });
  }

  const daySlots = listDaySlotStarts(body.date);
  const match = daySlots.find(
    (slot) => slot.start === body.start && slot.end === body.end,
  );
  if (!match) {
    return NextResponse.json(
      { message: "That time slot is not bookable." },
      { status: 400 },
    );
  }

  try {
    const busy = await getBusyBlocks(body.start, body.end);
    const stillFree = filterAvailableSlots([match], busy);
    if (!stillFree.length) {
      return NextResponse.json(
        { message: "That slot was just taken. Please pick another time." },
        { status: 409 },
      );
    }

    const meeting = await createDiscoveryZoomMeeting({
      start: body.start,
      end: body.end,
      name: body.name,
      email: body.email,
      notes: body.notes,
    });

    console.info("[booking] zoom scheduled", {
      email: body.email,
      start: body.start,
      joinUrl: meeting.joinUrl,
      notify: process.env.BOOKING_NOTIFY_EMAIL || process.env.ZOOM_HOST_EMAIL,
    });

    return NextResponse.json({
      message:
        "You're booked. Check your email for the Zoom invitation and join link.",
      meetLink: meeting.joinUrl,
      joinUrl: meeting.joinUrl,
      startUrl: meeting.startUrl,
    });
  } catch (error) {
    console.error("[booking]", error);
    return NextResponse.json(
      { message: "Could not schedule the Zoom meeting. Please try again." },
      { status: 500 },
    );
  }
}
