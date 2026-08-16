import type { Metadata } from "next";
import {
  AcademyFeature,
  BusinessOutcomes,
  BusinessProblems,
  CapabilityStrip,
  FinalCTA,
  Hero,
  InsightsPreview,
  ProcessSection,
  SelectedWork,
  Solutions,
  WhyPromptstack,
} from "@/components/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteConfig.name} | Software, AI & Automation, Digital Marketing`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

/**
 * Production homepage — Epic 3.
 * Section order and copy follow docs/04-homepage-spec-and-copy.md.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <CapabilityStrip />
      <BusinessProblems />
      <Solutions />
      <BusinessOutcomes />
      <SelectedWork />
      <ProcessSection />
      <WhyPromptstack />
      <AcademyFeature />
      <InsightsPreview />
      <FinalCTA />
    </main>
  );
}
