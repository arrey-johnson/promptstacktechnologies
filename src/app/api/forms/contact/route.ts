import { NextResponse } from "next/server";
import { getCollection } from "@/lib/cms/store";
import { getNotifyToEmail, sendAdminAndUserMail } from "@/lib/email/mailer";
import { contactAdminEmail, contactUserEmail } from "@/lib/email/templates";

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
  const notifyTo = getNotifyToEmail() || settings.contactEmail;

  console.info("[contact-form]", {
    to: notifyTo,
    ...body,
    receivedAt: new Date().toISOString(),
  });

  const admin = contactAdminEmail({
    name: body.name,
    email: body.email,
    phone: body.phone,
    subject: body.subject,
    message: body.message,
  });
  const user = contactUserEmail({
    name: body.name,
    message: body.message,
  });

  await sendAdminAndUserMail({
    admin: {
      to: notifyTo,
      subject: admin.subject,
      text: admin.text,
      html: admin.html,
      replyTo: admin.replyTo,
    },
    user: {
      to: body.email,
      subject: user.subject,
      text: user.text,
      html: user.html,
    },
  });

  return NextResponse.json({
    message: `Thanks ${body.name}. Your message was received. We'll reply to ${body.email}.`,
  });
}
