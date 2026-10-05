import Link from "next/link";
import { PromptstackLogo } from "@/components/brand/promptstack-logo";
import { SocialIconLinks } from "@/components/layout/social-icons";
import type { SiteSettings } from "@/lib/cms/types";
import { NewsletterForm } from "@/components/forms/newsletter-form";

type SiteFooterProps = {
  settings: SiteSettings;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function FooterLink({ href, label }: { href: string; label: string }) {
  if (isExternalHref(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="text-sm text-text-muted hover:text-brand-purple">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="text-sm text-text-muted hover:text-brand-purple">
      {label}
    </Link>
  );
}

export function SiteFooter({ settings }: SiteFooterProps) {
  const socials = settings.socials.filter((social) => {
    const href = social.href.trim();
    if (!href || href === "#" || href === "https://x.com/" || href === "https://twitter.com/") return false;
    return true;
  });

  return (
    <footer className="border-t border-brand-navy/10 bg-surface-soft">
      <div className="site-container section-space">
        <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="pill">{settings.newsletter.heading}</p>
            <p className="mt-4 max-w-xl body-muted">{settings.newsletter.body}</p>
          </div>
          <NewsletterForm consent={settings.newsletter.consent} />
        </div>

        <div className="grid gap-8 border-t border-brand-navy/10 pt-10 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {settings.footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-bold text-brand-navy">{column.title}</h3>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.href}-${link.label}`}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-brand-navy/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <PromptstackLogo className="inline-flex items-center gap-3" />
          <SocialIconLinks socials={socials} tone="onLight" />
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} {settings.siteName}
          </p>
        </div>
      </div>
    </footer>
  );
}
