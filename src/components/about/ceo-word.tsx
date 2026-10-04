import Image from "next/image";
import type { AboutContent } from "@/lib/cms/types";

export function CeoWord({ content }: { content: AboutContent["ceoWord"] }) {
  return (
    <section className="bg-brand-navy text-white">
      <div className="site-container section-space">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-(--radius-media) bg-white/10 ring-1 ring-white/15 lg:mx-0">
            {content.imageSrc ? (
              <Image
                src={content.imageSrc}
                alt={content.imageAlt || content.name}
                fill
                unoptimized
                quality={100}
                className="origin-top object-cover object-top scale-[1.55]"
                sizes="(max-width: 1024px) 80vw, 28vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-white/60">
                Photo
              </div>
            )}
          </div>

          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-brand-lavender uppercase">
              {content.eyebrow}
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
              {content.heading}
            </h2>
            <blockquote className="mt-6 text-lg leading-relaxed text-white/92 sm:text-xl">
              “{content.quote}”
            </blockquote>
            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-lg font-bold">{content.name}</p>
              <p className="mt-1 text-sm font-semibold text-brand-lavender">{content.role}</p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                {content.credentials}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
