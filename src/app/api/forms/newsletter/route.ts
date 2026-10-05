import { NextResponse } from "next/server";
import { getNotifyToEmail, sendMail } from "@/lib/email/mailer";
import { newsletterAdminEmail } from "@/lib/email/templates";

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

  const admin = newsletterAdminEmail({
    email: body.email,
    source: body.source,
  });
  await sendMail({
    to: getNotifyToEmail(),
    subject: admin.subject,
    text: admin.text,
    html: admin.html,
  });

  return NextResponse.json({
    message: "You're on the list. Thanks for subscribing.",
  });
}
