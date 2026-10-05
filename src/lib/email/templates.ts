function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrapHtml(title: string, bodyHtml: string) {
  return `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f7f2f8;font-family:Segoe UI,Arial,sans-serif;color:#1b263b;">
    <div style="max-width:560px;margin:24px auto;background:#ffffff;border-radius:12px;padding:28px;border:1px solid #eadff0;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#a800e6;font-weight:700;">Promptstack Technologies</p>
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">${escapeHtml(title)}</h1>
      ${bodyHtml}
      <p style="margin:28px 0 0;font-size:12px;color:#919191;">Sent by Promptstack Technologies · promptstacktechnologies.com</p>
    </div>
  </body>
</html>`;
}

function formatBookingWhen(iso: string) {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Douala",
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function contactAdminEmail(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const subject = `New contact message from ${input.name}`;
  const text = [
    "New contact form message",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "—"}`,
    `Subject: ${input.subject || "—"}`,
    "",
    input.message,
  ].join("\n");

  const html = wrapHtml(
    "New contact message",
    `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
     <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
     <p><strong>Phone:</strong> ${escapeHtml(input.phone || "—")}</p>
     <p><strong>Subject:</strong> ${escapeHtml(input.subject || "—")}</p>
     <p style="margin-top:16px;white-space:pre-wrap;">${escapeHtml(input.message)}</p>`,
  );

  return { subject, text, html, replyTo: input.email };
}

export function contactUserEmail(input: { name: string; message: string }) {
  const subject = "We received your message — Promptstack Technologies";
  const text = [
    `Hi ${input.name},`,
    "",
    "Thanks for contacting Promptstack Technologies. We received your message and will reply soon.",
    "",
    "Your message:",
    input.message,
    "",
    "— Promptstack Technologies",
  ].join("\n");

  const html = wrapHtml(
    "We received your message",
    `<p>Hi ${escapeHtml(input.name)},</p>
     <p>Thanks for contacting Promptstack Technologies. We received your message and will reply soon.</p>
     <p style="margin-top:16px;"><strong>Your message</strong></p>
     <p style="white-space:pre-wrap;color:#445;">${escapeHtml(input.message)}</p>`,
  );

  return { subject, text, html };
}

export function bookingAdminEmail(input: {
  name: string;
  email: string;
  start: string;
  notes?: string;
  joinUrl?: string;
}) {
  const when = formatBookingWhen(input.start);
  const subject = `New discovery booking — ${input.name}`;
  const text = [
    "New Zoom discovery call booked",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `When (Africa/Douala): ${when}`,
    `Notes: ${input.notes || "—"}`,
    `Join link: ${input.joinUrl || "—"}`,
  ].join("\n");

  const html = wrapHtml(
    "New discovery booking",
    `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
     <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
     <p><strong>When (Africa/Douala):</strong> ${escapeHtml(when)}</p>
     <p><strong>Notes:</strong> ${escapeHtml(input.notes || "—")}</p>
     ${
       input.joinUrl
         ? `<p style="margin-top:16px;"><a href="${escapeHtml(input.joinUrl)}" style="color:#a800e6;font-weight:700;">Open Zoom join link</a></p>`
         : ""
     }`,
  );

  return { subject, text, html, replyTo: input.email };
}

export function bookingUserEmail(input: {
  name: string;
  start: string;
  joinUrl?: string;
}) {
  const when = formatBookingWhen(input.start);
  const subject = "Your Promptstack discovery call is booked";
  const text = [
    `Hi ${input.name},`,
    "",
    "Your discovery call with Promptstack Technologies is confirmed.",
    "",
    `When (Africa/Douala): ${when}`,
    input.joinUrl ? `Zoom join link: ${input.joinUrl}` : "",
    "",
    "You should also receive a Zoom calendar invitation shortly.",
    "",
    "— Promptstack Technologies",
  ]
    .filter(Boolean)
    .join("\n");

  const html = wrapHtml(
    "Your discovery call is booked",
    `<p>Hi ${escapeHtml(input.name)},</p>
     <p>Your discovery call with Promptstack Technologies is confirmed.</p>
     <p><strong>When (Africa/Douala):</strong> ${escapeHtml(when)}</p>
     ${
       input.joinUrl
         ? `<p style="margin-top:16px;"><a href="${escapeHtml(input.joinUrl)}" style="display:inline-block;background:#a800e6;color:#fff;text-decoration:none;padding:12px 18px;border-radius:8px;font-weight:700;">Join Zoom meeting</a></p>`
         : ""
     }
     <p style="margin-top:16px;color:#445;">You should also receive a Zoom calendar invitation shortly.</p>`,
  );

  return { subject, text, html };
}

export function newsletterAdminEmail(input: { email: string; source?: string }) {
  const subject = `Newsletter signup — ${input.email}`;
  const text = [
    "New newsletter signup",
    "",
    `Email: ${input.email}`,
    `Source: ${input.source || "newsletter"}`,
  ].join("\n");
  const html = wrapHtml(
    "Newsletter signup",
    `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
     <p><strong>Source:</strong> ${escapeHtml(input.source || "newsletter")}</p>`,
  );
  return { subject, text, html };
}

export function jobApplicationAdminEmail(input: {
  fullName: string;
  email: string;
  phone: string;
  jobTitle: string;
  linkedin?: string;
  portfolioUrl?: string;
  coverLetter: string;
  hasResume: boolean;
}) {
  const subject = `Job application — ${input.jobTitle} — ${input.fullName}`;
  const text = [
    "New job application",
    "",
    `Role: ${input.jobTitle}`,
    `Name: ${input.fullName}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone}`,
    `LinkedIn: ${input.linkedin || "—"}`,
    `Portfolio: ${input.portfolioUrl || "—"}`,
    `Resume attached in admin: ${input.hasResume ? "yes" : "no"}`,
    "",
    "Cover letter:",
    input.coverLetter,
  ].join("\n");

  const html = wrapHtml(
    "New job application",
    `<p><strong>Role:</strong> ${escapeHtml(input.jobTitle)}</p>
     <p><strong>Name:</strong> ${escapeHtml(input.fullName)}</p>
     <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
     <p><strong>Phone:</strong> ${escapeHtml(input.phone)}</p>
     <p><strong>LinkedIn:</strong> ${escapeHtml(input.linkedin || "—")}</p>
     <p><strong>Portfolio:</strong> ${escapeHtml(input.portfolioUrl || "—")}</p>
     <p><strong>Resume in admin:</strong> ${input.hasResume ? "Yes" : "No"}</p>
     <p style="margin-top:16px;"><strong>Cover letter</strong></p>
     <p style="white-space:pre-wrap;">${escapeHtml(input.coverLetter)}</p>`,
  );

  return { subject, text, html, replyTo: input.email };
}

export function interestAdminEmail(input: {
  name: string;
  email: string;
  product: string;
}) {
  const subject = `Product interest — ${input.product} — ${input.name}`;
  const text = [
    "New product interest",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Product: ${input.product}`,
  ].join("\n");
  const html = wrapHtml(
    "Product interest",
    `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
     <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
     <p><strong>Product:</strong> ${escapeHtml(input.product)}</p>`,
  );
  return { subject, text, html, replyTo: input.email };
}
