import { NextResponse } from "next/server";
import { getCollection } from "@/lib/cms/store";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };

  if (!body.name || !body.email || !body.message) {
    return NextResponse.json({ message: "Name, email, and message are required." }, { status: 400 });
  }

  const settings = await getCollection("settings");
  console.info("[contact-form]", {
    to: settings.contactEmail,
    ...body,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({
    message: `Thanks ${body.name}. Your message was received. We'll reply to ${body.email}.`,
  });
}
