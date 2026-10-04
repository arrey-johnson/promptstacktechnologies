import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

export type JobApplication = {
  id: string;
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolioUrl?: string;
  coverLetter: string;
  resumeFileName?: string;
  resumeStoredAs?: string;
  receivedAt: string;
  status: "new" | "reviewed" | "archived";
};

const DATA_DIR = path.join(process.cwd(), "data", "applications");
const APPLICATIONS_FILE = path.join(DATA_DIR, "applications.json");
const RESUMES_DIR = path.join(DATA_DIR, "resumes");

async function ensureDirs() {
  await fs.mkdir(RESUMES_DIR, { recursive: true });
}

async function readAll(): Promise<JobApplication[]> {
  await ensureDirs();
  try {
    const raw = await fs.readFile(APPLICATIONS_FILE, "utf8");
    const parsed = JSON.parse(raw) as JobApplication[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(items: JobApplication[]) {
  await ensureDirs();
  await fs.writeFile(APPLICATIONS_FILE, JSON.stringify(items, null, 2), "utf8");
}

export async function listJobApplications(): Promise<JobApplication[]> {
  const items = await readAll();
  return items.sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
}

export async function saveJobApplication(input: {
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedin?: string;
  portfolioUrl?: string;
  coverLetter: string;
  resume?: { fileName: string; bytes: Buffer };
}): Promise<JobApplication> {
  await ensureDirs();

  let resumeFileName: string | undefined;
  let resumeStoredAs: string | undefined;

  if (input.resume) {
    const safeBase = input.resume.fileName.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
    resumeStoredAs = `${Date.now()}-${randomUUID().slice(0, 8)}-${safeBase}`;
    resumeFileName = input.resume.fileName;
    await fs.writeFile(path.join(RESUMES_DIR, resumeStoredAs), input.resume.bytes);
  }

  const application: JobApplication = {
    id: randomUUID(),
    jobId: input.jobId,
    jobSlug: input.jobSlug,
    jobTitle: input.jobTitle,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    linkedin: input.linkedin?.trim() || undefined,
    portfolioUrl: input.portfolioUrl?.trim() || undefined,
    coverLetter: input.coverLetter.trim(),
    resumeFileName,
    resumeStoredAs,
    receivedAt: new Date().toISOString(),
    status: "new",
  };

  const items = await readAll();
  items.unshift(application);
  await writeAll(items);
  return application;
}

export async function updateApplicationStatus(
  id: string,
  status: JobApplication["status"],
): Promise<JobApplication | null> {
  const items = await readAll();
  const index = items.findIndex((item) => item.id === id);
  if (index < 0) return null;
  items[index] = { ...items[index], status };
  await writeAll(items);
  return items[index];
}

export function resumeAbsolutePath(storedAs: string) {
  return path.join(RESUMES_DIR, storedAs);
}
