import nodemailer from "nodemailer";

export type SendMailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

export function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      (process.env.SMTP_HOST || "smtp.zoho.com"),
  );
}

export function getNotifyToEmail() {
  return (
    process.env.MAIL_NOTIFY_TO ||
    process.env.BOOKING_NOTIFY_EMAIL ||
    process.env.SMTP_USER ||
    "hello@promptstacktechnologies.com"
  );
}

export function getMailFrom() {
  return (
    process.env.MAIL_FROM ||
    `Promptstack Technologies <${process.env.SMTP_USER || "hello@promptstacktechnologies.com"}>`
  );
}

function createTransport() {
  const host = process.env.SMTP_HOST || "smtp.zoho.com";
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

/**
 * Send email via Zoho SMTP. Returns false (and logs) instead of throwing
 * so form submissions can still succeed if mail is temporarily down.
 */
export async function sendMail(input: SendMailInput): Promise<boolean> {
  if (!isEmailConfigured()) {
    console.warn("[email] skipped — SMTP is not configured", {
      to: input.to,
      subject: input.subject,
    });
    return false;
  }

  try {
    const transport = createTransport();
    await transport.sendMail({
      from: getMailFrom(),
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html || undefined,
      replyTo: input.replyTo || undefined,
    });
    return true;
  } catch (error) {
    console.error("[email] send failed", {
      to: input.to,
      subject: input.subject,
      error,
    });
    return false;
  }
}

export async function sendAdminAndUserMail(options: {
  admin: SendMailInput;
  user: SendMailInput;
}) {
  const [adminOk, userOk] = await Promise.all([
    sendMail(options.admin),
    sendMail(options.user),
  ]);
  return { adminOk, userOk };
}
