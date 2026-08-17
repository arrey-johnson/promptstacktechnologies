import {
  PortableText,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
} from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { resolveSanityImage } from "@/sanity/image";

type InsightPortableTextProps = {
  value: unknown[] | null | undefined;
};

function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function PortableLink({
  value,
  children,
}: PortableTextMarkComponentProps<{ _type: "link"; href?: string }>) {
  const href = value?.href?.trim();
  if (!href) return <>{children}</>;

  if (isInternalHref(href)) {
    return (
      <Link
        href={href}
        className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </a>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[1.0625rem] leading-[1.75] text-text-primary first:mt-0 md:text-lg md:leading-[1.8]">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-medium tracking-tight text-text-primary md:mt-14 md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-xl font-medium tracking-tight text-text-primary md:mt-10 md:text-2xl">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-2 border-brand-lavender pl-5 text-[1.0625rem] leading-relaxed text-text-secondary md:mt-10 md:pl-6 md:text-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-text-primary md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-5 text-[1.0625rem] leading-relaxed text-text-primary md:text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: PortableLink,
  },
  types: {
    image: ({ value }) => {
      const image = resolveSanityImage(value ?? null, { width: 1400 });
      if (!image?.src) return null;
      const alt = image.alt?.trim();
      if (!alt) return null;

      return (
        <figure className="mt-10 md:mt-12">
          <div className="relative aspect-[16/10] overflow-hidden bg-surface-muted">
            <Image
              src={image.src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 42rem"
              className="object-cover"
            />
          </div>
        </figure>
      );
    },
  },
};

/**
 * Production Portable Text renderer for Insight bodies.
 * Presentation is website-controlled; CMS supplies content only.
 * Blocks never render as H1 — article title owns the page H1.
 */
export function InsightPortableText({ value }: InsightPortableTextProps) {
  if (!value || value.length === 0) return null;

  return (
    <div className="insight-portable-text">
      <PortableText value={value} components={components} />
    </div>
  );
}
