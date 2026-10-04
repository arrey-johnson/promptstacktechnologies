import { NextResponse } from "next/server";
import { z } from "zod";
import { recordPageView } from "@/lib/analytics/store";

const schema = z.object({
  path: z.string().min(1).max(300),
  referrer: z.string().max(400).optional(),
  visitorId: z.string().min(8).max(64),
  sessionId: z.string().min(8).max(64),
  locale: z.string().max(8).optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    await recordPageView({
      ...body,
      userAgent: request.headers.get("user-agent") || undefined,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
