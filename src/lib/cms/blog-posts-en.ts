import type { BlogPost } from "./types";

export const blogPostsEn: BlogPost[] = [
  {
    id: "post-diagnose-first",
    slug: "diagnose-before-you-build",
    title: "Diagnose before you build: why most digital projects fail in week one",
    excerpt:
      "Buying software or a redesign without naming the bottleneck is how companies fund activity instead of outcomes. Here is the diagnostic discipline Promptstack uses before any build.",
    category: "Delivery",
    publishedAt: "2026-09-15",
    published: true,
    body: `Most failed digital projects do not fail in the code. They fail in the brief.

A company decides it “needs a website”, “needs a CRM”, or “needs automation”. A vendor quotes. Screens appear. Three months later the team still works in WhatsApp and spreadsheets — and the new system becomes another tab nobody opens.

The missing step is diagnosis.

What we mean by diagnose
Before we propose tools, we sit with the people who do the work and answer four questions in plain language:

1. Where does time actually disappear each week?
2. Which handoff creates the most rework or blame?
3. What does “better” look like in 30–60 days — not in a three-year roadmap?
4. Who will own the system after go-live?

If those answers are vague, any build will be vague.

A useful first win beats a fantasy architecture
Corporate buyers sometimes ask for a full platform on day one. That ambition is fine — but the first release should still protect one measurable win: fewer missed follow-ups, faster membership renewals, cleaner invoicing, a site that qualifies leads properly.

Promptstack’s engagement model is deliberate: diagnose → define → deliver → transfer ownership. The first phase exists to stop you paying for the wrong system.

What this means for your next RFP
Ask every vendor — including us — to show how they will discover the bottleneck before they sell you screens. If the proposal jumps straight to features, you are buying a catalogue, not a transformation.`,
  },
  {
    id: "post-ownership-transfer",
    slug: "transfer-ownership-after-go-live",
    title: "Go-live is not the finish line: transferring ownership that sticks",
    excerpt:
      "The most expensive systems are the ones only the vendor can touch. Ownership maps, training, and admin design decide whether your investment compounds or decays.",
    category: "Operations",
    publishedAt: "2026-09-22",
    published: true,
    body: `Launch day feels like success. Screenshots go into the WhatsApp group. Leadership is relieved. Then someone leaves, a password is lost, and the “new system” quietly returns to Excel.

That pattern is not a people problem first. It is a delivery design problem.

Ownership is a deliverable
At Promptstack we treat handover as part of the product:

• Named owners for content, operations, and technical access
• Admin paths that match how your team actually updates work
• Short training focused on the weekly jobs — not a 40-page PDF nobody reads
• Documentation that answers “what breaks if I change this?”

Why corporates should care
When you buy a ₣2M–₣10M engagement, you are buying continuity. A portal, membership workflow, or automation stack that only the agency can modify becomes a hostage situation — or a silent failure.

Questions to ask before you sign
• Who on our side will be able to publish, approve, and report without calling the vendor?
• What happens in month four when a campaign needs a new landing page?
• Which access and environments are documented?

If the proposal cannot answer those, you are renting a demo, not buying an operating capability.`,
  },
  {
    id: "post-beyond-brochure",
    slug: "beyond-the-brochure-website",
    title: "Beyond the brochure website: when your site should become an operating surface",
    excerpt:
      "A pretty homepage is not a growth system. Here is how to tell whether you need a brochure, a portal, or a connected stack — and how to budget accordingly.",
    category: "Strategy",
    publishedAt: "2026-09-29",
    published: true,
    body: `Many organisations still buy websites as if they were printed brochures with a contact form. That can be enough — until membership renewals, event registration, invoicing, partner portals, or sales follow-up become the real constraint.

Three levels of digital maturity
1. Brochure presence — brand, services, proof, contact. Useful when buyers only need trust and a conversation starter.
2. Operating website — applications, bookings, content workflows, basic CRM handoff. Useful when the website is part of how work gets done.
3. Connected stack — website + CRM + email automation + admin + integrations. Useful when revenue or membership depends on reliable digital operations.

Most “we need a new website” requests are secretly level 2 or 3 problems wearing level 1 language.

How Promptstack scopes this
We start with the bottleneck, not the template. If your team loses renewals in inboxes, a redesign alone will not fix it. If your brand looks outdated but operations are fine, a strong marketing site may be the right first win.

Budget honesty
Level 1 work competes on taste and speed. Level 2–3 work competes on process design, integrations, and ownership. That is why corporate engagements look different from ₣100k–₣300k brochure projects — and why the brief should say so out loud.`,
  },
  {
    id: "post-automation-roi",
    slug: "automation-that-pays-for-itself",
    title: "Automation that pays for itself: pick the boring bottlenecks first",
    excerpt:
      "AI demos are exciting. Repeatable handoffs, reminders, and data entry are where automation usually returns money. A practical way to prioritise.",
    category: "Automation",
    publishedAt: "2026-10-01",
    published: true,
    body: `Every leadership meeting has a slide about AI. Fewer meetings have a list of the five weekly tasks that burn the most staff hours.

Start with volume and pain
Good automation candidates share traits:

• They happen often (weekly or daily)
• They follow rules more than judgement
• Errors are expensive or embarrassing
• Someone already “owns” them in a messy way (spreadsheet heroics)

Examples we see often: lead routing, membership reminders, invoice status updates, report compilation, onboarding checklists, content approvals.

Resist theatre
A chatbot that cannot update your CRM is theatre. A workflow that moves a qualified enquiry from form → owner → follow-up with an audit trail is operations.

How we run automation engagements
1. Map the current path with the people who live it
2. Measure time / error cost on the worst two steps
3. Ship a thin automation slice with owners and monitoring
4. Only then expand

If a vendor sells you a platform tour before they can name your bottleneck in one sentence, pause.`,
  },
  {
    id: "post-marketing-pipeline",
    slug: "marketing-that-connects-to-pipeline",
    title: "Marketing that connects to pipeline — not just impressions",
    excerpt:
      "Digital marketing earns trust when campaigns, content, and CRM follow-up share one path. Here is the minimum stack Promptstack insists on before scaling spend.",
    category: "Marketing",
    publishedAt: "2026-10-03",
    published: true,
    body: `Spending on ads or content without a clean path to conversation is how budgets evaporate.

The minimum connected path
Before scaling acquisition, we want:

• A site (or landing) that states offer, proof, and next step clearly
• Forms that capture enough context for sales — not just an email
• Routing to a named owner with a response SLA
• Basic attribution: which campaign or page started the conversation
• A follow-up sequence that does not depend on one person’s memory

Content is a sales asset
An empty blog undermines a company that sells digital marketing. A few excellent articles that teach how you think — diagnosis, ownership, measurement — do more for corporate credibility than twenty thin posts.

What “good” looks like in 90 days
Not vanity metrics alone. Look for: qualified conversations booked, faster response times, clearer campaign ROI, and sales feedback that leads arrive oriented.

Promptstack builds marketing systems the same way we build software: diagnose the constraint, ship a useful slice, transfer ownership, then scale what works.`,
  },
];
