import { AI_TRAINING } from "./config";

type InitiatePayResult = {
  paymentUrl: string;
  transId?: string;
  mode: "api" | "payment_link";
};

function siteOrigin() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/$/, "")}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "https://promptstacktechnologies.com";
}

/**
 * Prefer Fapshi Initiate Pay when API credentials exist (prefill email + return URL).
 * Otherwise fall back to the fixed payment link the business already created.
 */
export async function resolveAiTrainingPayment(input: {
  email: string;
  registrationId: string;
}): Promise<InitiatePayResult> {
  const apiUser = process.env.FAPSHI_API_USER?.trim();
  const apiKey = process.env.FAPSHI_API_KEY?.trim();
  const base =
    process.env.FAPSHI_API_BASE?.replace(/\/$/, "") ||
    (process.env.FAPSHI_SANDBOX === "1" ? "https://sandbox.fapshi.com" : "https://live.fapshi.com");

  if (apiUser && apiKey) {
    try {
      const res = await fetch(`${base}/initiate-pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiuser: apiUser,
          apikey: apiKey,
        },
        body: JSON.stringify({
          amount: AI_TRAINING.priceXaf,
          email: input.email,
          externalId: input.registrationId.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 100),
          userId: input.registrationId.replace(/[^a-zA-Z0-9-_]/g, "").slice(0, 100),
          message: `${AI_TRAINING.title} — ${AI_TRAINING.dateLabel}`,
          redirectUrl: `${siteOrigin()}/ai-training/success`,
        }),
      });

      const data = (await res.json()) as { link?: string; transId?: string; message?: string };
      if (res.ok && data.link) {
        return { paymentUrl: data.link, transId: data.transId, mode: "api" };
      }
      console.error("[fapshi] initiate-pay failed", res.status, data);
    } catch (error) {
      console.error("[fapshi] initiate-pay error", error);
    }
  }

  return { paymentUrl: AI_TRAINING.paymentLink, mode: "payment_link" };
}
