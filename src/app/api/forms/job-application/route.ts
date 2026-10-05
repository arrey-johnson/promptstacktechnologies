import { NextResponse } from "next/server";
import { saveJobApplication } from "@/lib/applications/store";
import { getCmsData } from "@/lib/cms/store";
import { getNotifyToEmail, sendMail } from "@/lib/email/mailer";
import { jobApplicationAdminEmail } from "@/lib/email/templates";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const jobSlug = String(form.get("jobSlug") || "").trim();
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const linkedin = String(form.get("linkedin") || "").trim();
    const portfolioUrl = String(form.get("portfolioUrl") || "").trim();
    const coverLetter = String(form.get("coverLetter") || "").trim();
    const resume = form.get("resume");

    if (!jobSlug || !fullName || !email || !phone || !coverLetter) {
      return NextResponse.json(
        { message: "Please complete all required fields." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 });
    }

    const { jobs } = await getCmsData();
    const job = jobs.find((item) => item.slug === jobSlug && item.published);
    if (!job) {
      return NextResponse.json({ message: "This role is no longer open." }, { status: 404 });
    }

    let resumePayload: { fileName: string; bytes: Buffer } | undefined;
    if (resume && typeof resume !== "string") {
      if (resume.size > MAX_RESUME_BYTES) {
        return NextResponse.json(
          { message: "Resume must be 5MB or smaller." },
          { status: 400 },
        );
      }
      if (resume.type && !ALLOWED_RESUME_TYPES.has(resume.type)) {
        return NextResponse.json(
          { message: "Resume must be a PDF or Word document." },
          { status: 400 },
        );
      }
      const bytes = Buffer.from(await resume.arrayBuffer());
      resumePayload = { fileName: resume.name || "resume.pdf", bytes };
    }

    const application = await saveJobApplication({
      jobId: job.id,
      jobSlug: job.slug,
      jobTitle: job.title,
      fullName,
      email,
      phone,
      linkedin: linkedin || undefined,
      portfolioUrl: portfolioUrl || undefined,
      coverLetter,
      resume: resumePayload,
    });

    console.info("[job-application]", {
      id: application.id,
      job: application.jobTitle,
      email: application.email,
      receivedAt: application.receivedAt,
    });

    const admin = jobApplicationAdminEmail({
      fullName,
      email,
      phone,
      jobTitle: job.title,
      linkedin: linkedin || undefined,
      portfolioUrl: portfolioUrl || undefined,
      coverLetter,
      hasResume: Boolean(resumePayload),
    });
    await sendMail({
      to: getNotifyToEmail(),
      subject: admin.subject,
      text: admin.text,
      html: admin.html,
      replyTo: admin.replyTo,
    });

    return NextResponse.json({
      message: `Thanks ${fullName}. Your application for ${job.title} was received. We'll review it and follow up at ${email}.`,
      id: application.id,
    });
  } catch (error) {
    console.error("[job-application]", error);
    return NextResponse.json(
      { message: "We couldn't submit your application. Please try again." },
      { status: 500 },
    );
  }
}
