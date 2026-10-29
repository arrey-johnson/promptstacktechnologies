export const AI_TRAINING = {
  slug: "ai-training",
  title: "Artificial Intelligence for Professionals",
  tagline: "Learn practical AI skills to work smarter, faster and get better results in your career or business.",
  slogan: "Same Work. Smarter Way.",
  format: "1-day practical training",
  mode: "Online",
  dateLabel: "21 November 2026 (Saturday)",
  dateIso: "2026-11-21",
  duration: "1 Day",
  priceXaf: 10_000,
  priceLabel: "10,000 XAF",
  seatsNote: "Limited seats available — early registration is strongly recommended.",
  whatsappPhone: "+237 674 047 453",
  whatsappHref: "https://wa.me/237674047453?text=Hi%20Promptstack%2C%20I%20want%20to%20register%20for%20AI%20Training",
  flyerSrc: "/brand/training/ai-professionals-flyer.jpg",
  paymentLink:
    process.env.FAPSHI_PAYMENT_LINK?.trim() || "https://pay.fapshi.com/86573688",
  learn: [
    "Write professional emails, reports, and proposals with AI",
    "Create impressive PowerPoint presentations in minutes",
    "Analyze Excel data and generate business insights",
    "Turn meetings into summaries, minutes, and action points",
    "Design professional graphics and create AI-powered videos",
    "Automate repetitive office tasks and workflows",
    "Use AI for marketing, sales, and customer service",
    "Research faster and make better-informed decisions",
    "Master ChatGPT and other AI tools for everyday productivity",
    "Best practices, limitations, and responsible AI use",
  ],
  audience: [
    "Business owners",
    "Professionals",
    "Entrepreneurs",
    "Freelancers",
    "Students",
    "Marketing professionals",
    "Managers",
    "Anyone who wants to become more productive using AI",
  ],
} as const;

export function formatXaf(amount: number) {
  return new Intl.NumberFormat("fr-FR").format(amount) + " XAF";
}
