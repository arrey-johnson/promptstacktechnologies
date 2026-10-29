import { NextResponse } from "next/server";
import { z } from "zod";
import { getCollection } from "@/lib/cms/store";
import { getNotifyToEmail, sendAdminAndUserMail } from "@/lib/email/mailer";
import { aiTrainingAdminEmail, aiTrainingUserEmail } from "@/lib/email/templates";
import { AI_TRAINING, formatXaf } from "@/lib/training/config";
import { resolveAiTrainingPayment } from "@/lib/training/fapshi";
import { saveAiTrainingRegistration } from "@/lib/training/store";

const schema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(8).max(40),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
});

export async function POST(request: Request) {
  let body: z.infer<typeof schema>;
  try {
    body = schema.parse(await request.json());
  } catch {
    return NextResponse.json(
      { message: "Please provide your full name, email, and phone number." },
      { status: 400 },
    );
  }

  const settings = await getCollection("settings");
  const notifyTo = getNotifyToEmail() || settings.contactEmail;

  // Provisional id for Fapshi externalId; final record id may match after save.
  const provisionalId = `aitrain-${Date.now().toString(36)}`;
  const payment = await resolveAiTrainingPayment({
    email: body.email,
    registrationId: provisionalId,
  });

  const record = await saveAiTrainingRegistration({
    fullName: body.fullName,
    email: body.email,
    phone: body.phone,
    organization: body.organization || undefined,
    amountXaf: AI_TRAINING.priceXaf,
    paymentLink: payment.paymentUrl,
    fapshiTransId: payment.transId,
  });

  console.info("[ai-training]", {
    id: record.id,
    email: record.email,
    phone: record.phone,
    paymentMode: payment.mode,
    transId: payment.transId,
    receivedAt: record.receivedAt,
  });

  const admin = aiTrainingAdminEmail({
    fullName: record.fullName,
    email: record.email,
    phone: record.phone,
    organization: record.organization,
    amountXaf: record.amountXaf,
    paymentLink: record.paymentLink,
    registrationId: record.id,
    fapshiTransId: record.fapshiTransId,
  });
  const user = aiTrainingUserEmail({
    fullName: record.fullName,
    paymentLink: record.paymentLink,
    amountLabel: formatXaf(AI_TRAINING.priceXaf),
    dateLabel: AI_TRAINING.dateLabel,
    whatsappHref: AI_TRAINING.whatsappHref,
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
      to: record.email,
      subject: user.subject,
      text: user.text,
      html: user.html,
    },
  });

  return NextResponse.json({
    message: "Registration saved. Redirecting you to secure payment…",
    paymentUrl: payment.paymentUrl,
    registrationId: record.id,
  });
}
