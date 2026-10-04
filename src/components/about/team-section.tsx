import Image from "next/image";
import type { TeamMember } from "@/lib/cms/types";

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function initialsFor(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function TeamSection({
  eyebrow = "Experienced team",
  heading,
  body,
  members,
}: {
  eyebrow?: string;
  heading: string;
  body: string;
  members: TeamMember[];
}) {
  if (members.length === 0) return null;

  return (
    <section>
      <div className="site-container section-space">
        <p className="pill">{eyebrow}</p>
        <h2 className="mt-4 heading-lg">{heading}</h2>
        <p className="mt-3 max-w-2xl body-muted">{body}</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member) => {
            const linkedin = member.linkedinHref?.trim();

            return (
              <article key={member.id} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-(--radius-media) bg-brand-navy/5 ring-1 ring-brand-navy/10">
                  {member.imageSrc ? (
                    <Image
                      src={member.imageSrc}
                      alt={member.imageAlt || member.name}
                      fill
                      unoptimized
                      quality={100}
                      className={
                        member.id === "arrey-johnson"
                          ? "origin-top object-cover object-top scale-[1.55] transition-transform duration-500 group-hover:scale-[1.6]"
                          : "object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.03]"
                      }
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(160deg,rgb(203_174_211/0.35),rgb(168_0_230/0.12))]">
                      <span className="text-3xl font-bold tracking-wide text-brand-purple/70">
                        {initialsFor(member.name)}
                      </span>
                      <span className="text-xs font-medium tracking-wide text-brand-navy/45 uppercase">
                        Photo
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight text-brand-navy">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-semibold text-brand-purple">{member.role}</p>
                  </div>

                  {linkedin ? (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-navy/10 text-brand-navy transition-colors hover:border-brand-purple/40 hover:text-brand-purple"
                    >
                      <IconLinkedIn className="h-4 w-4" />
                    </a>
                  ) : (
                    <span
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-navy/10 text-brand-navy/35"
                      title="LinkedIn link coming soon"
                      aria-label={`${member.name} LinkedIn (coming soon)`}
                    >
                      <IconLinkedIn className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
