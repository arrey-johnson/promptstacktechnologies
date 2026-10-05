import type { PortfolioItem } from "./types";

type CaseStudy = Pick<
  PortfolioItem,
  "summary" | "client" | "challenge" | "role" | "outcome" | "scope" | "technologies" | "featured"
>;

/** Case-study copy keyed by portfolio item id. Prefer sector/confidential labels until named clients are approved for publication. */
export const portfolioCaseStudiesEn: Record<string, CaseStudy> = {
  "pf-finance": {
    featured: true,
    client: "Confidential — financial services provider (Central Africa)",
    summary:
      "A trust-first web presence for a finance brand that needed to look institutional online without slowing day-to-day content updates.",
    challenge:
      "The previous site felt dated, buried key products, and gave little confidence to first-time visitors comparing providers. Leadership needed a clearer story, stronger visual hierarchy, and a structure marketing could maintain.",
    role:
      "Promptstack led discovery, information architecture, UI design, and front-end build — then handed over an editable structure with training so the client team could publish without breaking the layout.",
    scope: [
      "Brand-aligned website redesign",
      "Service and product page structure",
      "Lead / enquiry paths",
      "Responsive build and performance basics",
      "Content handover and editor training",
    ],
    technologies: ["Next-ready static/marketing stack", "Responsive UI", "CMS-friendly content blocks", "Analytics-ready events"],
    outcome:
      "A clearer finance narrative on first scroll, faster paths to contact, and an owned publishing workflow — so the website supports sales conversations instead of apologising for itself.",
  },
  "pf-photography": {
    featured: true,
    client: "Independent photography studio",
    summary:
      "A portfolio site built to sell bookings — not just display pretty pictures.",
    challenge:
      "Strong imagery was trapped in a weak layout: slow galleries, unclear packages, and no confident path from admiration to enquiry.",
    role:
      "We redesigned the visual system, curated project storytelling, and wired booking/enquiry flows so the studio’s best work does commercial work.",
    scope: [
      "Portfolio information architecture",
      "Project case layouts",
      "Packages / services framing",
      "Enquiry and booking CTAs",
      "Mobile gallery performance",
    ],
    technologies: ["Responsive image strategy", "Portfolio UI patterns", "Form / CTA flows"],
    outcome:
      "Visitors understand the offer in seconds, galleries feel premium on mobile, and enquiries arrive with clearer intent.",
  },
  "pf-company": {
    featured: true,
    client: "Confidential — multi-service company group",
    summary:
      "A corporate website that explains who the organisation is, what it sells, and how to start a serious conversation.",
    challenge:
      "Outdated digital infrastructure made the company look smaller than its operations. Membership-style workflows, events, and admin processes lived in spreadsheets and inboxes — the public site could not carry that weight.",
    role:
      "Promptstack delivered website redesign, structured service pages, enquiry routing, and the foundations for membership/event communications — with a path toward CRM and email automation where the organisation was ready.",
    scope: [
      "Corporate site redesign",
      "Services and proof architecture",
      "Enquiry and contact workflows",
      "Content model for news / events",
      "Admin-friendly publishing",
      "Migration plan from legacy pages",
    ],
    technologies: ["Modern marketing stack", "CRM-ready forms", "Email automation hooks", "Hosting / DNS migration support"],
    outcome:
      "A public site that matches the company’s real scale, with cleaner handoffs from web interest into internal follow-up — ready to grow into membership and event operations.",
  },
  "pf-business": {
    featured: true,
    client: "Confidential — B2B professional services firm",
    summary:
      "A business site designed for credibility with procurement-minded buyers.",
    challenge:
      "Generic brochure pages failed to explain process, proof, or next steps. Sales still had to re-explain the company on every first call.",
    role:
      "We rebuilt the narrative around diagnose → define → deliver, added proof sections, and made CTAs match how their sales team actually qualifies leads.",
    scope: [
      "Positioning and page architecture",
      "Service detail pages",
      "Proof / case-style sections",
      "Discovery-call and contact paths",
    ],
    technologies: ["Responsive web", "CMS content model", "Lead capture"],
    outcome:
      "Prospects arrive on calls already oriented — less time spent defending the brand, more time scoping the engagement.",
  },
  "pf-ngo": {
    featured: true,
    client: "Confidential — regional NGO / development programme",
    summary:
      "A public-facing site for programmes, partners, and donors that need clarity — not clutter.",
    challenge:
      "Programme information was scattered across PDFs and outdated pages. Partners and applicants could not find current calls, impact stories, or contact owners.",
    role:
      "Promptstack structured programmes, stories, and calls-to-action, then built a maintainable site so non-technical staff can publish updates safely.",
    scope: [
      "Programme and impact storytelling",
      "Calls / opportunities pages",
      "Partner and contact routing",
      "Editor training",
    ],
    technologies: ["Accessible responsive UI", "Content blocks", "Forms"],
    outcome:
      "A single source of truth for programmes and outreach — easier for staff to update and for partners to trust.",
  },
  "pf-academia": {
    featured: true,
    client: "Confidential — education / training provider",
    summary:
      "An education web experience that turns programmes into enrolments.",
    challenge:
      "Course information was dense, fees were unclear, and mobile users bounced before understanding outcomes.",
    role:
      "We redesigned programme pages around curriculum, fees, outcomes, and a clear enquire/enrol path — aligned with how Academy-style buyers decide.",
    scope: [
      "Programme catalogue UX",
      "Fee and duration clarity",
      "Enquiry flows",
      "Mobile-first layouts",
    ],
    technologies: ["Responsive web", "Structured content", "Lead forms"],
    outcome:
      "Prospects can compare programmes quickly and reach the right enrolment conversation without chasing staff for basics.",
  },
  "pf-research": {
    featured: true,
    client: "Confidential — research / knowledge organisation",
    summary:
      "A research site that surfaces publications and expertise without looking like a document dump.",
    challenge:
      "Valuable research was hard to navigate. Visitors could not tell what the organisation stood for or how to engage.",
    role:
      "Promptstack designed taxonomy, publication listing patterns, and a credible institutional presence.",
    scope: [
      "Information architecture for publications",
      "Expertise / team framing",
      "Searchable listing patterns",
      "Contact / collaboration CTAs",
    ],
    technologies: ["Content-heavy responsive UI", "Listing filters (where needed)", "SEO fundamentals"],
    outcome:
      "Research is discoverable, the institution looks current, and collaboration enquiries have a clear entry point.",
  },
  "pf-ecommerce": {
    featured: true,
    client: "Confidential — retail / e-commerce brand",
    summary:
      "An e-commerce storefront focused on conversion and mobile checkout clarity.",
    challenge:
      "Product pages underperformed on mobile; trust signals and purchase paths were inconsistent across categories.",
    role:
      "We redesigned product and category flows, strengthened trust UI, and tightened the path from browse to purchase / enquiry.",
    scope: [
      "Category and product UX",
      "Mobile conversion path",
      "Trust and policy surfaces",
      "Promo / campaign landing patterns",
    ],
    technologies: ["E-commerce UI patterns", "Responsive performance", "Analytics events"],
    outcome:
      "A cleaner buying journey with fewer dead ends — especially on phone — and clearer campaign landing pages.",
  },
  "pf-hosting": {
    featured: true,
    client: "Confidential — hosting / infrastructure provider",
    summary:
      "A hosting marketing site that explains plans without drowning buyers in jargon.",
    challenge:
      "Technical packaging confused non-technical buyers. Support and plan comparison lived in chat threads instead of the site.",
    role:
      "Promptstack clarified plan comparison, trust signals, and support entry points so sales can qualify faster.",
    scope: [
      "Plan comparison UX",
      "Feature explainers",
      "Support / sales CTAs",
      "Technical credibility sections",
    ],
    technologies: ["Marketing site stack", "Comparison tables", "Lead capture"],
    outcome:
      "Buyers self-select the right plan more often, and sales conversations start from a shared page instead of a blank slate.",
  },
  "pf-agency": {
    featured: true,
    client: "Confidential — creative / digital agency",
    summary:
      "An agency site that sells process and outcomes — not just a moodboard.",
    challenge:
      "The previous site looked stylish but did not explain how engagements run or what clients should expect after kickoff.",
    role:
      "We rebuilt the narrative around services, process, and selected work, with CTAs matched to discovery conversations.",
    scope: [
      "Services architecture",
      "Process storytelling",
      "Selected work presentation",
      "Discovery CTAs",
    ],
    technologies: ["Responsive portfolio UI", "Case-style layouts", "Forms"],
    outcome:
      "Prospects understand working style before the first meeting — fewer mismatched leads, stronger first calls.",
  },
  "pf-tempnumber": {
    featured: true,
    client: "Promptstack product exploration — Temporary Number",
    summary:
      "A product-facing web experience for a temporary-number concept: clear value proposition, trust, and signup intent.",
    challenge:
      "Privacy and utility products fail when the landing page cannot explain the offer in one screen or build enough trust to try.",
    role:
      "Promptstack designed and built the product narrative, feature explanation, and conversion path as a showcase of product marketing craft.",
    scope: [
      "Product landing architecture",
      "Feature and trust sections",
      "CTA / waitlist patterns",
      "Mobile-first UI",
    ],
    technologies: ["Product marketing UI", "Responsive web", "Conversion-focused layout"],
    outcome:
      "A crisp product story that demonstrates how Promptstack ships product interfaces — not only brochure sites.",
  },
  "pf-makeup": {
    client: "Beauty / makeup brand engagement",
    summary: "A beauty brand site centred on lookbooks, services, and booking interest.",
    challenge: "Visual brand strength was not translating into clear service packages or enquiries.",
    role: "Design and build of a conversion-oriented beauty web presence with gallery and CTA structure.",
    scope: ["Brand web design", "Services presentation", "Enquiry CTAs"],
    technologies: ["Responsive UI", "Image-led layouts"],
    outcome: "Clearer packaging online and a more confident path from inspiration to contact.",
  },
  "pf-crypto": {
    client: "Confidential — digital assets / fintech concept",
    summary: "A crypto/fintech marketing UI that balances energy with enough structure for serious visitors.",
    challenge: "Hype-heavy visuals without explainer hierarchy made the offer feel risky rather than credible.",
    role: "UI/UX design for product story, feature blocks, and trust-oriented CTAs.",
    scope: ["Product story UI", "Feature sections", "Trust cues"],
    technologies: ["Modern marketing UI", "Responsive web"],
    outcome: "A more institutional first impression while keeping the category’s visual energy.",
  },
  "pf-beauty": {
    client: "Beauty services brand",
    summary: "A beauty services website focused on treatments, proof, and bookings.",
    challenge: "Service menus were hard to scan; mobile users struggled to find how to book.",
    role: "Redesign of service taxonomy, proof modules, and booking CTAs.",
    scope: ["Service menu UX", "Gallery / proof", "Booking path"],
    technologies: ["Responsive web", "Form CTAs"],
    outcome: "Faster understanding of offerings and a shorter path to book or enquire.",
  },
  "pf-homecare": {
    client: "Home care / domestic services provider",
    summary: "A home-care web presence that explains services, coverage, and how to request help.",
    challenge: "Families needed reassurance and clarity; the old site looked informal and incomplete.",
    role: "Trust-led redesign with service clarity and request flows.",
    scope: ["Service pages", "Trust content", "Request / contact flows"],
    technologies: ["Responsive web", "Lead forms"],
    outcome: "A calmer, more trustworthy first visit — especially on mobile.",
  },
  "pf-homecare-2": {
    client: "Home care brand (variant engagement)",
    summary: "A second home-care design direction exploring clearer packaging and visual trust.",
    challenge: "Need for a stronger visual system and simpler request path.",
    role: "Alternate design system and page structure for home-care conversion.",
    scope: ["Visual system", "Service framing", "CTA hierarchy"],
    technologies: ["UI design", "Responsive layouts"],
    outcome: "A refined option set for choosing the direction that best matched brand voice.",
  },
  "pf-fashion-portfolio": {
    client: "Fashion / creative portfolio client",
    summary: "A fashion portfolio site for showcasing collections with editorial pacing.",
    challenge: "Imagery needed space to breathe without losing navigation or contact access.",
    role: "Editorial web design and portfolio storytelling.",
    scope: ["Lookbook layouts", "Project navigation", "Contact CTAs"],
    technologies: ["Image-led responsive UI"],
    outcome: "A portfolio that feels like a lookbook and still drives professional enquiries.",
  },
  "pf-lady-care": {
    client: "Women’s care / wellness brand",
    summary: "A wellness brand site with calm hierarchy and clear next steps.",
    challenge: "Soft branding without structure left visitors unsure what to do next.",
    role: "Design of brand web pages balancing care aesthetics with conversion.",
    scope: ["Brand pages", "Offer framing", "Enquiry path"],
    technologies: ["Responsive UI"],
    outcome: "A composed digital presence that invites contact without visual noise.",
  },
  "pf-body-trimmer": {
    client: "Consumer product brand",
    summary: "Product marketing pages for a body-care device with benefit-led storytelling.",
    challenge: "Specs alone did not sell; benefits and trust needed a clearer narrative.",
    role: "Product landing design emphasising benefits, proof, and purchase/interest CTAs.",
    scope: ["Product landing", "Benefit sections", "CTA design"],
    technologies: ["Product marketing UI"],
    outcome: "A landing pattern ready for campaigns and retailer handoff.",
  },
  "pf-fashion-brand": {
    client: "Fashion brand",
    summary: "Brand website for a fashion label needing stronger identity online.",
    challenge: "Inconsistent presentation across drops and campaigns.",
    role: "Brand web system and collection presentation.",
    scope: ["Brand identity on web", "Collection pages", "Contact / store CTAs"],
    technologies: ["Responsive brand UI"],
    outcome: "A more coherent brand story across pages and devices.",
  },
  "pf-fashion-brand-2": {
    client: "Fashion brand (alternate direction)",
    summary: "Second fashion brand direction exploring a bolder commercial layout.",
    challenge: "Need to test a more campaign-driven composition.",
    role: "Alternate UI direction for brand and campaign pages.",
    scope: ["Campaign layouts", "Brand pages"],
    technologies: ["UI design"],
    outcome: "A viable second option for seasonal campaign use.",
  },
  "pf-food": {
    client: "Food / hospitality brand",
    summary: "Food brand web design for menus, story, and reservations or orders.",
    challenge: "Appetite appeal was strong offline but weak in digital structure.",
    role: "Menu/story architecture and conversion CTAs.",
    scope: ["Menu presentation", "Story pages", "Reservation / order CTAs"],
    technologies: ["Responsive web", "Image optimisation patterns"],
    outcome: "A hungrier first impression with clearer ways to act.",
  },
  "pf-brand": {
    client: "Multi-product brand",
    summary: "Brand website unifying products under one credible umbrella.",
    challenge: "Product pages felt disconnected from the parent brand.",
    role: "Umbrella brand architecture and product linking.",
    scope: ["Brand home", "Product links", "About / contact"],
    technologies: ["Marketing site UI"],
    outcome: "A single brand home that routes visitors into the right product story.",
  },
  "pf-fx": {
    client: "Confidential — FX / trading education or services brand",
    summary: "FX-oriented web design with risk-aware messaging and clearer offer packaging.",
    challenge: "Aggressive visuals without education hierarchy reduced trust.",
    role: "Structured marketing UI for offers, education blocks, and enquiries.",
    scope: ["Offer pages", "Education modules", "Lead CTAs"],
    technologies: ["Responsive marketing UI"],
    outcome: "A more measured first visit that still supports acquisition.",
  },
  "pf-crypto-2": {
    client: "Crypto product (alternate design)",
    summary: "Alternate crypto UI exploring denser dashboards and marketing hybrids.",
    challenge: "Need a second visual language for product marketing tests.",
    role: "UI exploration for crypto marketing surfaces.",
    scope: ["Marketing UI variants", "Feature blocks"],
    technologies: ["UI design"],
    outcome: "Additional creative direction for future product launches.",
  },
  "pf-church": {
    client: "Faith community / church organisation",
    summary: "Church website for sermons, events, and visitor welcome paths.",
    challenge: "New visitors could not find service times, ministries, or how to connect.",
    role: "Welcoming information architecture and content patterns for church communications.",
    scope: ["Service times", "Ministries", "Events", "Connect CTAs"],
    technologies: ["Responsive web", "Content blocks"],
    outcome: "First-time visitors find what matters in one visit; staff can update without fear.",
  },
  "pf-jewelry": {
    client: "Jewelry brand",
    summary: "Jewelry e-commerce style presentation with luxury pacing and product focus.",
    challenge: "Product beauty was lost in cluttered templates.",
    role: "Luxury-oriented product and collection web design.",
    scope: ["Collection pages", "Product focus UI", "Enquiry / purchase CTAs"],
    technologies: ["Image-led responsive UI"],
    outcome: "A quieter, more premium browse experience.",
  },
  "pf-hair": {
    client: "Hair vendor / beauty supply brand",
    summary: "Hair vendor site for catalogue clarity and wholesale/retail enquiries.",
    challenge: "Catalogue confusion and weak wholesale messaging.",
    role: "Catalogue UX and enquiry segmentation (retail vs wholesale).",
    scope: ["Catalogue structure", "Product cards", "Enquiry paths"],
    technologies: ["Responsive catalogue UI", "Forms"],
    outcome: "Buyers find products faster; wholesale leads arrive better labelled.",
  },
  "pf-abstract": {
    client: "Creative / experimental brand",
    summary: "Abstract creative web design showcasing motion-friendly layouts and art direction.",
    challenge: "Need a distinctive digital signature without sacrificing usability.",
    role: "Art-directed web composition with usable navigation and CTAs.",
    scope: ["Art direction", "Layout system", "Contact path"],
    technologies: ["Creative responsive UI"],
    outcome: "A memorable creative presence that still converts curiosity into contact.",
  },
};

export const portfolioCaseStudiesFr: Record<string, CaseStudy> = {
  "pf-finance": {
    featured: true,
    client: "Confidentiel — prestataire de services financiers (Afrique centrale)",
    summary:
      "Une présence web institutionnelle pour une marque finance qui devait inspirer confiance sans freiner les mises à jour contenu.",
    challenge:
      "L’ancien site paraissait daté, enterrait les offres clés et rassurait peu les nouveaux visiteurs. Il fallait une histoire claire, une hiérarchie visuelle forte et une structure maintenable par le marketing.",
    role:
      "Promptstack a mené discovery, architecture de l’information, UI et build front — puis a transféré une structure éditable avec formation.",
    scope: [
      "Refonte de site alignée marque",
      "Structure pages services / produits",
      "Parcours de contact / leads",
      "Build responsive et perf de base",
      "Formation éditeurs",
    ],
    technologies: ["Stack marketing moderne", "UI responsive", "Blocs CMS", "Événements analytics"],
    outcome:
      "Un récit finance lisible au premier scroll, des chemins vers le contact plus courts, et un workflow de publication maîtrisé par le client.",
  },
  "pf-photography": {
    featured: true,
    client: "Studio photo indépendant",
    summary: "Un portfolio conçu pour générer des réservations — pas seulement admirer des images.",
    challenge: "De belles images dans une structure faible : galeries lentes, formules floues, peu de passage à la demande.",
    role: "Système visuel, storytelling projets et parcours de demande/réservation.",
    scope: ["Architecture portfolio", "Layouts projets", "Formules / services", "CTA demande", "Perf mobile"],
    technologies: ["Stratégie d’images", "Patterns portfolio", "Formulaires"],
    outcome: "Offre comprise en quelques secondes, galeries premium sur mobile, demandes plus intentionnées.",
  },
  "pf-company": {
    featured: true,
    client: "Confidentiel — groupe multi-activités",
    summary: "Un site corporate qui explique qui est l’organisation, ce qu’elle vend, et comment engager une conversation sérieuse.",
    challenge:
      "Une infra digitale datée faisait paraître l’entreprise plus petite que ses opérations. Process adhésion / événements / admin vivaient dans tableurs et mails.",
    role:
      "Refonte site, pages services, routage des demandes, bases pour communications adhésion/événements — avec trajectoire CRM / e-mail automation.",
    scope: [
      "Refonte corporate",
      "Architecture services et preuves",
      "Workflows de contact",
      "Modèle contenu news / événements",
      "Publication admin-friendly",
      "Plan de migration",
    ],
    technologies: ["Stack marketing", "Formulaires CRM-ready", "Hooks e-mail", "Migration hébergement / DNS"],
    outcome: "Un site public à l’échelle réelle de l’entreprise, avec de meilleurs handoffs vers le suivi interne.",
  },
  "pf-business": {
    featured: true,
    client: "Confidentiel — cabinet B2B",
    summary: "Un site business pensé pour des acheteurs exigeants.",
    challenge: "Des pages génériques n’expliquaient ni process ni preuves ; chaque premier appel recommençait à zéro.",
    role: "Narratif diagnose → define → deliver, sections de preuve, CTA alignés sur la qualification commerciale.",
    scope: ["Positionnement", "Pages services", "Preuves", "Parcours appel découverte"],
    technologies: ["Web responsive", "Modèle CMS", "Capture de leads"],
    outcome: "Des prospects déjà orientés en appel — moins de défense de marque, plus de cadrage de mission.",
  },
  "pf-ngo": {
    featured: true,
    client: "Confidentiel — ONG / programme de développement",
    summary: "Un site public pour programmes, partenaires et donateurs qui ont besoin de clarté.",
    challenge: "Infos dispersées entre PDF et pages obsolètes.",
    role: "Structuration programmes / histoires / CTA, site maintenable par des non-techniciens.",
    scope: ["Storytelling impact", "Appels / opportunités", "Routage partenaires", "Formation"],
    technologies: ["UI accessible", "Blocs contenu", "Formulaires"],
    outcome: "Une source unique de vérité pour programmes et outreach.",
  },
  "pf-academia": {
    featured: true,
    client: "Confidentiel — acteur formation / éducation",
    summary: "Une expérience web éducative qui transforme les programmes en inscriptions.",
    challenge: "Catalogues denses, frais flous, rebond mobile.",
    role: "Pages programmes autour curriculum, frais, résultats et parcours d’inscription.",
    scope: ["Catalogue programmes", "Clarté frais", "Demandes", "Mobile-first"],
    technologies: ["Web responsive", "Contenu structuré", "Formulaires"],
    outcome: "Comparaison rapide des programmes et contact inscription sans relances inutiles.",
  },
  "pf-research": {
    featured: true,
    client: "Confidentiel — organisation de recherche",
    summary: "Un site recherche qui met en avant publications et expertise sans dump documentaire.",
    challenge: "Travaux difficiles à naviguer ; positionnement flou.",
    role: "Taxonomie, listes de publications, présence institutionnelle crédible.",
    scope: ["Architecture publications", "Expertise", "Listings", "CTA collaboration"],
    technologies: ["UI contenu dense", "Filtres si besoin", "SEO de base"],
    outcome: "Recherche trouvable, institution à jour, porte d’entrée claire pour collaborer.",
  },
  "pf-ecommerce": {
    featured: true,
    client: "Confidentiel — marque retail / e-commerce",
    summary: "Une boutique orientée conversion et clarté du parcours mobile.",
    challenge: "Pages produit faibles sur mobile ; signaux de confiance irréguliers.",
    role: "Flux catégories/produits, confiance UI, chemin vers achat / demande.",
    scope: ["UX catalogue", "Conversion mobile", "Confiance / politiques", "Landings campagne"],
    technologies: ["Patterns e-commerce", "Perf responsive", "Analytics"],
    outcome: "Parcours d’achat plus net, surtout sur téléphone.",
  },
  "pf-hosting": {
    featured: true,
    client: "Confidentiel — hébergeur / infra",
    summary: "Un site hébergement qui explique les offres sans noyer l’acheteur.",
    challenge: "Packaging technique illisible pour non-initiés.",
    role: "Comparaison d’offres, confiance, points d’entrée support/vente.",
    scope: ["Comparaison plans", "Explainers", "CTA support/vente", "Crédibilité technique"],
    technologies: ["Site marketing", "Tableaux comparatifs", "Leads"],
    outcome: "Meilleure auto-sélection des plans ; ventes démarrent sur une page partagée.",
  },
  "pf-agency": {
    featured: true,
    client: "Confidentiel — agence créative / digitale",
    summary: "Un site agence qui vend process et résultats — pas seulement un moodboard.",
    challenge: "Style sans explication du mode d’engagement.",
    role: "Services, process, travaux sélectionnés, CTA découverte.",
    scope: ["Architecture services", "Story process", "Travaux", "CTA"],
    technologies: ["UI portfolio", "Layouts cas", "Formulaires"],
    outcome: "Prospects comprennent le mode de travail avant le premier meeting.",
  },
  "pf-tempnumber": {
    featured: true,
    client: "Exploration produit Promptstack — Temporary Number",
    summary: "Une expérience produit pour une offre de numéro temporaire : proposition claire et confiance.",
    challenge: "Les produits privacy échouent si la landing n’explique pas l’offre en un écran.",
    role: "Narratif produit, features et chemin de conversion.",
    scope: ["Landing produit", "Features / confiance", "CTA / waitlist", "UI mobile-first"],
    technologies: ["UI product marketing", "Web responsive"],
    outcome: "Une histoire produit nette qui montre aussi notre craft interfaces — pas seulement des sites brochure.",
  },
};
