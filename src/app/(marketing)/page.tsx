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
import { ComingSoonView } from "@/components/coming-soon";
import { siteConfig } from "@/config/site";
import { comingSoonCopy } from "@/content/coming-soon";
import { isComingSoonLockActive } from "@/lib/launch";

const comingSoonActive = isComingSoonLockActive();

export const metadata: Metadata = comingSoonActive
  ? {
      title: {
        absolute: `Coming Soon | ${siteConfig.name}`,
      },
      description: comingSoonCopy.supporting,
      openGraph: {
        title: `Coming Soon | ${siteConfig.name}`,
        description: comingSoonCopy.supporting,
      },
    }
  : {
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
 * While COMING_SOON lock is active (until 1 October 2026 by default),
 * the public homepage shows the launch countdown instead.
 */
export default function HomePage() {
  if (comingSoonActive) {
    return <ComingSoonView />;
  }

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
