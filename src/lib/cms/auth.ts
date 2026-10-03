import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "pst_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 12;

function getSecret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || "dev-admin-secret";
}

function getPassword() {
  return process.env.ADMIN_PASSWORD || "promptstack-admin";
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function verifyAdminPassword(password: string) {
  const expected = getPassword();
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function createAdminSessionToken() {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `admin:${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminSessionToken(token: string | undefined) {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;
  const expected = sign(payload);
  try {
    const ok = timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!ok) return false;
  } catch {
    return false;
  }
  const exp = Number(payload.split(":")[1]);
  return Number.isFinite(exp) && Date.now() < exp;
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return isValidAdminSessionToken(jar.get(ADMIN_COOKIE)?.value);
}
