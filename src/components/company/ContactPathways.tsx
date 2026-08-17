import Link from "next/link";
import { Button, Container, Eyebrow, Heading, Section, Text } from "@/components/ui";
import { getAcademyApplyHref } from "@/config/academy";
import { contactPageCopy, contactPathways } from "@/content/company";
import type { SiteSettingsView } from "@/sanity/lib/mappers/siteSettings";

type ContactPageViewProps = {
  settings: SiteSettingsView;
};

export function ContactHero() {
  const { eyebrow, heading, supporting } = contactPageCopy;
  return (
    <Section
      tone="primary"
      className="pt-10 md:pt-14 lg:pt-16"
      data-section="contact-hero"
      aria-labelledby="contact-hero-heading"
    >
      <Container>
        <div className="max-w-3xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading
            id="contact-hero-heading"
            level={1}
            className="mt-5 text-text-primary"
          >
            {heading}
          </Heading>
          <Text size="lead" muted className="mt-5 max-w-2xl">
            {supporting}
          </Text>
        </div>
      </Container>
    </Section>
  );
}

export function ContactPathways({ settings }: ContactPageViewProps) {
  const applyHref = getAcademyApplyHref();
  const contact = settings.contact;
  const social = settings.social;
  const hasGeneral =
    Boolean(contact?.email || contact?.phone || contact?.address) ||
    social.length > 0;

  return (
    <Section
      tone="soft"
      spacious
      data-section="contact-pathways"
      aria-labelledby="contact-pathways-heading"
    >
      <Container>
        <Heading
          id="contact-pathways-heading"
          level={2}
          className="sr-only"
        >
          Contact pathways
        </Heading>
        <ul className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          <li className="border-t border-border-soft pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0">
            <h3 className="text-xl font-medium text-text-primary">
              {contactPathways.project.title}
            </h3>
            <Text muted className="mt-3">
              {contactPathways.project.body}
            </Text>
            <div className="mt-6">
              <Button
                href={contactPathways.project.cta.href}
                data-analytics="cta_contact_start_project"
              >
                {contactPathways.project.cta.label}
              </Button>
            </div>
          </li>

          <li className="border-t border-border-soft pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <h3 className="text-xl font-medium text-text-primary">
              {contactPathways.academy.title}
            </h3>
            <Text muted className="mt-3">
              {contactPathways.academy.body}
            </Text>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                href={contactPathways.academy.cta.href}
                variant="secondary"
                data-analytics="cta_contact_academy"
              >
                {contactPathways.academy.cta.label}
              </Button>
              {applyHref ? (
                <Button
                  href={applyHref}
                  data-analytics="cta_contact_academy_apply"
                >
                  Apply to Academy
                </Button>
              ) : null}
            </div>
          </li>

          <li className="border-t border-border-soft pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
            <h3 className="text-xl font-medium text-text-primary">
              {contactPathways.general.title}
            </h3>
            <Text muted className="mt-3">
              {contactPathways.general.body}
            </Text>
            {hasGeneral ? (
              <div className="mt-6 space-y-3 text-[1.0625rem] text-text-primary">
                {contact?.email ? (
                  <p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-medium text-accent transition-colors hover:text-brand-navy"
                    >
                      {contact.email}
                    </a>
                  </p>
                ) : null}
                {contact?.phone ? (
                  <p>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="font-medium text-accent transition-colors hover:text-brand-navy"
                    >
                      {contact.phone}
                    </a>
                  </p>
                ) : null}
                {contact?.address ? (
                  <p className="text-text-secondary">{contact.address}</p>
                ) : null}
                {social.length > 0 ? (
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                    {social.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-accent transition-colors hover:text-brand-navy"
                          rel="noopener noreferrer"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : (
              <Text muted className="mt-6">
                Verified company contact details will appear here once published
                in Site Settings.
              </Text>
            )}
          </li>
        </ul>
      </Container>
    </Section>
  );
}
