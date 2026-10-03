import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; source?: string };
  if (!body.email) {
    return NextResponse.json({ message: "Email is required." }, { status: 400 });
  }

  console.info("[newsletter]", {
    email: body.email,
    source: body.source || "newsletter",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    message: "You're on the list. Thanks for subscribing.",
  });
}
