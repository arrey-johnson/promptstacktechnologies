import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type AiTrainingRegistration = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  notes?: string;
  amountXaf: number;
  paymentLink: string;
  fapshiTransId?: string;
  paymentStatus: "pending_payment" | "redirected" | "unknown";
  receivedAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "training");
const FILE = path.join(DATA_DIR, "ai-training-registrations.json");

async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    /* read-only hosts */
  }
}

async function readAll(): Promise<AiTrainingRegistration[]> {
  try {
    await ensureDir();
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as AiTrainingRegistration[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(items: AiTrainingRegistration[]) {
  await ensureDir();
  await fs.writeFile(FILE, JSON.stringify(items, null, 2), "utf8");
}

export async function saveAiTrainingRegistration(input: {
  fullName: string;
  email: string;
  phone: string;
  organization?: string;
  notes?: string;
  amountXaf: number;
  paymentLink: string;
  fapshiTransId?: string;
}): Promise<AiTrainingRegistration> {
  const record: AiTrainingRegistration = {
    id: randomUUID(),
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    organization: input.organization?.trim() || undefined,
    notes: input.notes?.trim() || undefined,
    amountXaf: input.amountXaf,
    paymentLink: input.paymentLink,
    fapshiTransId: input.fapshiTransId,
    paymentStatus: "redirected",
    receivedAt: new Date().toISOString(),
  };

  try {
    const all = await readAll();
    all.unshift(record);
    await writeAll(all.slice(0, 2000));
  } catch (error) {
    console.error("[training] could not persist registration", error);
  }

  return record;
}
