import Link from "next/link";
import { footerNav, getFooterAcademyLinks } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui";
import { getSiteSettings } from "@/lib/site/get-site-settings";
import { SiteLogo } from "./SiteLogo";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h2 className="text-sm font-medium uppercase tracking-[0.11em] text-text-primary">
        {title}
      </h2>
      <ul className="mt-4 space-y-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-[0.95rem] text-text-secondary transition-colors duration-200 hover:text-accent"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Light corporate footer so the official colored logo sits naturally
 * (no white badge, no inventing a white logo variant).
 * Contact/social come from verified Site Settings when present.
 */
export async function Footer() {
  const year = new Date().getFullYear();
  const settings = await getSiteSettings();
  const contact = settings.contact ?? footerNav.contact;
  const social =
    settings.social.length > 0 ? settings.social : footerNav.social;
  const descriptor =
    settings.footerDescriptor ?? footerNav.descriptor;
  const hasContact = Boolean(
    contact?.email || contact?.phone || contact?.address,
  );

  return (
    <footer className="mt-auto border-t border-border-soft bg-surface-primary text-text-primary">
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_repeat(3,1fr)] lg:gap-10">
          <div className="max-w-sm">
            <SiteLogo />
            <p className="mt-5 text-[1.0625rem] font-medium text-text-primary">
              {settings.organizationLegalName || siteConfig.name}
            </p>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-text-secondary">
              {descriptor}
            </p>
            {hasContact && contact ? (
              <div className="mt-5 space-y-1 text-[0.95rem] text-text-secondary">
                {contact.email ? <p>{contact.email}</p> : null}
                {contact.phone ? <p>{contact.phone}</p> : null}
                {contact.address ? <p>{contact.address}</p> : null}
              </div>
            ) : null}
          </div>

          <FooterColumn title="Solutions" links={footerNav.solutions} />
          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Academy" links={getFooterAcademyLinks()} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border-soft pt-6 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="text-sm text-text-muted">
            © {year} {siteConfig.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {social.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}

            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
