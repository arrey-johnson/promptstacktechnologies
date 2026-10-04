import { portfolioItemsFr } from "./portfolio-items";
import { serviceItemsFr } from "./service-items-fr";
import { teamMembersFr } from "./team-members";
import type { CmsData } from "./types";

export const cmsSeedFr: CmsData = {
  settings: {
    siteName: "Promptstack Technologies",
    tagline: "Construisez de meilleurs systèmes. Automatisez ce qui vous ralentit.",
    contactEmail: "hello@promptstacktechnologies.com",
    phone: "+237 674 047 453",
    location: "Bonapriso, Douala",
    nav: [
      { label: "Accueil", href: "/" },
      { label: "À propos", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Carrières", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    cta: { label: "Réserver un appel", href: "#book-discovery" },
    footerColumns: [
      {
        title: "Promptstack",
        links: [
          { label: "À propos", href: "/about" },
          { label: "Carrières", href: "/careers" },
          { label: "Contact", href: "/contact" },
          { label: "Blog", href: "/blog" },
        ],
      },
      {
        title: "Ce que nous offrons",
        links: [
          { label: "Logiciel & sites web", href: "/services/software" },
          { label: "IA & Automatisation", href: "/services/ai-automation" },
          { label: "Marketing digital", href: "/services/digital-marketing" },
          { label: "Academy", href: "/services/academy" },
        ],
      },
      {
        title: "Academy",
        links: [
          { label: "Programmes", href: "/services/academy" },
          { label: "Nous écrire", href: "/contact?subject=Demande%20Academy" },
        ],
      },
      {
        title: "Plus",
        links: [
          { label: "Portfolio", href: "/portfolio" },
          { label: "Appel découverte", href: "#book-discovery" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Légal",
        links: [
          { label: "Politique de confidentialité", href: "/privacy-policy" },
          { label: "Conditions d'utilisation", href: "/terms-of-service" },
          { label: "Politique cookies", href: "/cookie-policy" },
        ],
      },
    ],
    socials: [
      { label: "LinkedIn", href: "https://www.linkedin.com/" },
      { label: "X", href: "https://x.com/" },
      { label: "TikTok", href: "https://www.tiktok.com/" },
    ],
    newsletter: {
      heading: "Notes Promptstack",
      body: "Des updates courts sur nos livraisons, les cohortes Academy (développement web, marketing digital, IA) et des leçons pratiques — sans spam.",
      consent:
        "Oui, envoyez-moi occasionnellement des updates Promptstack sur les produits, la formation Academy et les événements.",
    },
    seo: {
      title: "Promptstack Technologies",
      description:
        "Promptstack Technologies aide les entreprises avec le logiciel, l'IA & l'automatisation et le marketing digital — et forme étudiants et aspirants tech via l'Academy au développement web, au marketing digital et à l'IA.",
    },
  },
  home: {
    hero: {
      eyebrow: "Promptstack Technologies",
      heading: "Construisez de meilleurs systèmes. Automatisez ce qui vous ralentit.",
      accentWords: ["meilleurs", "Automatisez"],
      supporting:
        "Logiciel, IA & automatisation, marketing digital et Promptstack Academy — où étudiants et aspirants tech se forment au développement web, au marketing digital et à l'IA.",
      primaryCta: { label: "Réserver un appel découverte", href: "#book-discovery" },
      secondaryCta: { label: "Voir nos services", href: "/services" },
      videoSrc: "/brand/hero-background.mp4",
    },
    purpose: {
      eyebrow: "Le brief Promptstack",
      heading: "Arrêtez de combattre vos outils. Faites tourner l'entreprise.",
      body: [
        "Trop d'équipes perdent du temps chaque semaine à cause de passages de relais confus, de tableurs sans fin, et d'applis qui ne collent pas à la façon dont les gens travaillent vraiment. Le progrès ralentit — non pas par manque d'effort, mais parce que les outils gênent.",
        "Promptstack Technologies construit les logiciels, automatisations et systèmes digitaux qui corrigent ça. Nous créons des outils adaptés à votre façon de travailler, pour que votre équipe aille plus vite, avec moins de bricolages, et un responsable clair pour chaque partie.",
      ],
    },
    servicesIntro: {
      eyebrow: "Nos services",
      heading: "Des services conçus pour travailler ensemble.",
      body: "Commencez par le service dont vous avez le plus besoin — sites web & logiciel, IA & automatisation, marketing digital ou formation Academy — puis ajoutez-en d'autres sans changer de partenaire.",
    },
    portfolioTeaser: {
      eyebrow: "Travaux sélectionnés",
      heading: "Des sites récents que nous avons livrés.",
      body: "Un aperçu de sites clients et d’interfaces produit — survolez une carte pour faire défiler la page, ou ouvrez un projet pour le détail.",
      cta: { label: "Voir tout le portfolio", href: "/portfolio" },
    },
    partners: {
      eyebrow: "Partenaires techniques",
      heading: "Les plateformes avec lesquelles nous construisons",
      body: "Nous travaillons avec les outils et plateformes que les équipes utilisent déjà — pour livrer dans la stack que vous faites tourner aujourd'hui.",
      items: [
        { name: "Google", logoSrc: "/brand/partners/google.webp?v=4" },
        { name: "Odoo", logoSrc: "/brand/partners/odoo.webp?v=4" },
        { name: "Microsoft", logoSrc: "/brand/partners/microsoft.webp?v=4" },
        { name: "Zoho", logoSrc: "/brand/partners/zoho.webp?v=3" },
        { name: "cPanel", logoSrc: "/brand/partners/cpanel.png?v=4" },
      ],
    },
    process: {
      eyebrow: "Travailler avec Promptstack",
      heading: "Quatre phases. Démos hebdo. Responsables nommés.",
      body: "Nous gardons l'engagement assez compact pour le piloter : diagnostiquer la contrainte, verrouiller un premier gain utile, livrer par tranches revoyables, puis laisser le système avec des propriétaires clairs chez vous.",
      steps: [
        {
          title: "Diagnostiquer le goulot",
          body: "Nous travaillons avec les gens qui font le travail, nommons la friction en langage clair, et définissons ce que « mieux » doit signifier avant de proposer des outils.",
        },
        {
          title: "Verrouiller le premier gain utile",
          body: "Périmètre, séquence et critères de succès sont écrits tôt — pour protéger le résultat qui compte dans les prochaines semaines, pas une roadmap fantaisiste.",
        },
        {
          title: "Livrer, revoir, solidifier",
          body: "Vous voyez des tranches qui marchent à un rythme régulier. Le feedback arrive quand changer coûte peu ; les tests voyagent avec le build, pas en panique finale.",
        },
        {
          title: "Transférer la propriété",
          body: "Le go-live inclut formation, docs et carte des responsables pour que votre équipe fasse tourner ce que nous avons livré.",
        },
      ],
    },
    productsTeaser: {
      eyebrow: "En labo",
      heading: "Des ventures que nous façonnons",
      body: "Cartes placeholder pour les idées que Promptstack explore. Renommez, changez le statut ou remplacez-les dans Admin → Produits.",
    },
    aboutTeaser: {
      eyebrow: "Promptstack est-il adapté ?",
      heading: "Appelez-nous quand le travail est bloqué — pas pour une autre bio d’entreprise.",
      body: [
        "Si l’un de ces points est vrai, un appel découverte vaut 30 minutes. Sinon, nous ne sommes probablement pas la bonne équipe pour l’instant.",
      ],
    },
    whyUs: {
      eyebrow: "Vous êtes concernés si",
      heading: "Quatre signaux que nous pouvons aider ce mois-ci.",
      items: [
        {
          title: "Les outils ne collent pas au vrai process",
          body: "Tableurs, contournements et logiciels à moitié utilisés. Nous reconstruisons autour du travail réel pour que l’équipe arrête de se battre contre le système.",
        },
        {
          title: "Le manuel mange la semaine",
          body: "Des tâches répétitives qui devraient tourner seules. Nous ciblons les automatisations à fort ROI, les livrons, et nommons les responsables.",
        },
        {
          title: "Le marketing ne prouve pas ce qui a bougé",
          body: "Des campagnes sans chemin clair vers les leads ou le chiffre. Nous relions tracking, tunnels et suivi pour que vous puissiez piloter.",
        },
        {
          title: "Vous formez des talents pour la tech",
          body: "L’Academy forme étudiants et aspirants professionnels tech au développement web, au marketing digital et à l’IA — avec des projets concrets, pas seulement des slides.",
        },
      ],
    },
    finalCta: {
      heading: "Envie d'une prochaine étape plus claire ?",
      body: "Réservez un appel découverte. Nous trancherons s'il vous faut un système, une automatisation, une poussée growth, une formation Academy, ou un mix — et quoi faire en premier.",
      cta: { label: "Réserver un appel découverte", href: "#book-discovery" },
      imageSrc: "/brand/cta-next-step.jpg?v=3",
    },
  },
  about: {
    hero: {
      eyebrow: "Promptstack Technologies",
      heading: "À propos de Promptstack",
      body: "Nous construisons logiciels, automatisations et systèmes de marketing digital pour les entreprises — et animons l'Academy pour former étudiants et aspirants tech au développement web, au marketing digital et à l'IA.",
    },
    story: {
      eyebrow: "Comment nous en sommes arrivés là",
      heading: "Concentrés sur la stack qui fait vraiment avancer le travail.",
      body: [
        "Promptstack part d'une frustration simple : trop d'organisations jonglent avec des outils qui ne se parlent pas, des campagnes illisibles, et des talents sans compétences tech pratiques.",
        "Nous livrons logiciel, IA & automatisation et marketing digital pour les entreprises — et l'Academy forme la prochaine vague de talents au développement web, au marketing digital et à l'IA.",
      ],
    },
    values: {
      eyebrow: "Notre façon de travailler",
      heading: "Les exigences que nous nous fixons",
      items: [
        {
          title: "Les services d'abord, esprit opérateur",
          body: "Notre identité, c'est le travail que nous livrons — logiciel, automatisation et systèmes de croissance pour des équipes lean — plus la formation Academy pour ceux qui entrent dans la tech.",
        },
        {
          title: "Livrer ce que les gens peuvent faire tourner",
          body: "De beaux écrans sans propriétaires ne comptent pas. Nous optimisons pour des systèmes que votre équipe peut opérer après notre départ.",
        },
        {
          title: "Dire les arbitrages tôt",
          body: "Périmètre, risques et délais sont nommés clairement. Les surprises doivent rester rares et petites.",
        },
        {
          title: "Former des personnes qui savent livrer",
          body: "L'Academy s'adresse aux étudiants et aspirants professionnels tech — développement web, marketing digital et IA — avec des projets qu'ils peuvent montrer.",
        },
      ],
    },
    teamIntro: {
      heading: "L’équipe Promptstack",
      body: "Les personnes qui pilotent la livraison, la stratégie, le produit et le contenu qui raconte notre histoire.",
    },
    capabilities: {
      heading: "La boîte à outils Promptstack",
      body: "Quatre voies de livraison, plus les habitudes qui gardent les projets honnêtes du premier atelier à la passation.",
      items: [
        {
          title: "Cartographie des contraintes",
          body: "Nous partons du goulot — process, données, outils ou compétences — avant de proposer un build.",
        },
        {
          title: "Sites web & logiciel sur mesure",
          body: "Sites d'entreprise, portails et apps calés sur vos vrais flux — pas des templates génériques.",
        },
        {
          title: "IA & automatisation",
          body: "Des flux qui coupent le répétitif et réduisent l'erreur, sans cirque de démos.",
        },
        {
          title: "Systèmes de croissance",
          body: "Acquisition, contenu et analytics reliés pour que l'attention rejoigne le pipeline.",
        },
        {
          title: "Formation Academy",
          body: "Développement web, marketing digital et IA pour étudiants et aspirants professionnels tech — apprendre en construisant de vrais projets.",
        },
        {
          title: "Passation & suivi",
          body: "Formation, carte des responsables et support optionnel pour que le go-live ne soit pas la fin.",
        },
      ],
    },
    contactBand: {
      heading: "Envie de voir si ça matche ?",
      body: "Réservez un appel découverte ou écrivez-nous — nous tracerons la prochaine étape utile.",
    },
  },
  servicesPage: {
    hero: {
      heading: "Services",
      body: "Sites web & logiciel sur mesure, IA & automatisation, marketing digital, et Academy (formation en développement web, marketing digital et IA). Commencez là où vous avez le plus besoin de nous.",
    },
    cta: {
      heading: "Pas sûr du levier à tirer en premier ?",
      body: "Réservez un appel découverte et nous trancherons la séquence ensemble.",
      cta: { label: "Réserver un appel découverte", href: "#book-discovery" },
    },
  },
  productsPage: {
    hero: {
      eyebrow: "Produits Promptstack",
      heading: "Produits bientôt disponibles",
      body: "Nous façonnons des ventures et outils qui méritent d'être publiés. Cette page s'ouvrira quand les premiers seront prêts à partager.",
    },
    emptyState: "Revenez bientôt — ou réservez un appel découverte pour un aperçu anticipé.",
  },
  portfolioPage: {
    hero: {
      eyebrow: "Portfolio web",
      heading: "Travaux sélectionnés à travers marques et industries",
      body: "Nos meilleurs projets de design web — de la finance et l'e-commerce à la beauté, l'éducation et la tech.",
      primaryCta: { label: "Explorer les projets", href: "#portfolio-grid" },
      secondaryCta: { label: "Démarrer un projet", href: "#book-discovery" },
      imageSrc: "/brand/portfolio-hero.jpg?v=3",
    },
    grid: {
      eyebrow: "Quelques exemples de notre travail",
      heading: "Notre portfolio de design web",
      body: "Nous avons livré des projets dans des niches variées. Survolez un projet pour explorer.",
    },
    cta: {
      heading: "Créons un travail digne d'entrer dans ce portfolio.",
      body: "Parlez-nous de vos objectifs et nous recommanderons le bon chemin.",
      cta: { label: "Réserver un appel découverte", href: "#book-discovery" },
    },
    emptyState: "Les projets du portfolio apparaîtront ici une fois ajoutés dans Admin → Portfolio.",
  },
  careersPage: {
    hero: {
      heading: "Carrières chez Promptstack",
      body: "Construisez une carrière dans une entreprise techno qui livre sites, logiciels, automatisations et systèmes de croissance pour de vrais clients. Postulez directement sur ce site — chaque candidature arrive dans notre back-office.",
    },
    whyJoin: {
      heading: "Pourquoi on nous rejoint",
      body: "Des contraintes clients réelles, une stack reliée, et des pairs qui visent des résultats utilisables.",
      items: [
        "Livrer des systèmes que les opérateurs peuvent vraiment faire tourner",
        "Soutenir la formation Academy en développement web, marketing digital et IA",
        "Grandir par démos, revues et travail fini — pas par du remplissage",
      ],
    },
    openRolesHeading: "Postes ouverts",
    emptyState: "Aucun poste ouvert pour le moment. Laissez votre e-mail ci-dessous et nous vous préviendrons.",
    alert: {
      heading: "Envie d'être prévenu des nouveaux postes ?",
      body: "Laissez votre e-mail et nous vous écrirons quand quelque chose d'intéressant s'ouvre.",
    },
  },
  contact: {
    hero: {
      heading: "Contacter Promptstack",
      body: "Dites-nous ce dont vous avez besoin — un système, une automatisation, de la croissance, une formation Academy (développement web, marketing digital ou IA), ou autre — et nous répondrons avec une prochaine étape claire.",
      imageSrc: "/brand/contact-hero.jpg?v=2",
    },
    intents: [
      "Réserver un appel découverte",
      "Demande de projet",
      "Demande Academy",
      "Partenariat",
      "Carrières",
      "Intérêt produit",
      "Autre",
    ],
    formLabels: {
      name: "Nom complet",
      email: "E-mail",
      phone: "Téléphone (optionnel)",
      subject: "De quoi s'agit-il ?",
      message: "Message",
      consent: "J'ai lu et j'accepte la Politique de confidentialité.",
      submit: "Envoyer",
    },
  },
  serviceItems: serviceItemsFr,
  products: [
    {
      id: "prod-1",
      slug: "sample-product-one",
      name: "Produit exemple un",
      status: "Exploration précoce",
      summary: "Remplacez ceci par votre premier vrai produit.",
      body: "Carte produit exemple. Modifiez-la dans Admin → Produits quand vous êtes prêt.",
      ctaLabel: "Je suis intéressé",
    },
    {
      id: "prod-2",
      slug: "sample-product-two",
      name: "Produit exemple deux",
      status: "Design en cours",
      summary: "Remplacez ceci par votre deuxième vrai produit.",
      body: "Carte produit exemple. Modifiez-la dans Admin → Produits quand vous êtes prêt.",
      ctaLabel: "Demander un accès anticipé",
    },
  ],
  portfolioItems: portfolioItemsFr,
  jobs: [
    {
      id: "job-corporate-sales-manager",
      slug: "corporate-sales-manager",
      title: "Corporate Sales Manager",
      employmentType: "Temps plein",
      location: "Douala / Hybride",
      workType: "Hybride",
      summary:
        "Pilotez les ventes mid-market et entreprise pour les services Promptstack — sites, logiciels, automatisation et croissance digitale — de la prospection jusqu'à la signature.",
      body: "En tant que Corporate Sales Manager, vous construisez et animez un pipeline de vente professionnel pour Promptstack Technologies. Vous qualifiez les opportunités, menez les conversations de découverte, préparez les propositions et concluez des engagements que l'équipe de livraison peut exécuter clairement.\n\nVous travaillez avec les fondateurs et les leads delivery, représentez Promptstack avec crédibilité, et maintenez une hygiène CRM et une précision de forecast élevées.",
      responsibilities: [
        "Prospecter, qualifier et gérer un pipeline de ventes corporate sur des industries cibles",
        "Mener les appels de découverte et présenter les services Promptstack avec un cadrage commercial clair",
        "Préparer propositions, devis et relances qui transforment l'intérêt en travail signé",
        "Coordonner la passation vers la livraison avec des notes de périmètre précises",
        "Reporter chaque semaine sur le pipeline, les taux de closing et le forecast",
      ],
      requirements: [
        "Expérience prouvée en vente B2B ou corporate (techno, services ou digital de préférence)",
        "Excellente communication en anglais ; le français est un atout fort",
        "À l'aise avec les objectifs, le CRM et le suivi client professionnel",
        "Organisé(e), autonome, et à l'aise devant des décideurs",
        "Basé(e) à Douala ou capable d'y travailler en hybride",
      ],
      published: true,
    },
    {
      id: "job-digital-marketing-internship",
      slug: "digital-marketing-internship",
      title: "Stage — Digital Marketing",
      employmentType: "Stage",
      location: "Douala / Hybride",
      workType: "Hybride",
      summary:
        "Un stage structuré pour les marketeurs en devenir qui veulent une expérience concrète en contenu, campagnes, analytics et systèmes de croissance — pas des courses café.",
      body: "Le stage Digital Marketing chez Promptstack est conçu pour apprendre en livrant. Vous soutenez de vraies campagnes et workflows de contenu avec mentorat, tout en construisant un portfolio que vous pouvez montrer.\n\nC'est une voie de stage professionnelle : attentes claires, feedback hebdomadaire, et exposition à la façon dont les systèmes de croissance sont planifiés et mesurés.",
      responsibilities: [
        "Soutenir la rédaction de contenu, la planification et la coordination créative de base",
        "Aider à la mise en place de campagnes, aux contrôles de tracking et aux notes de performance",
        "Contribuer à la recherche d'audiences, de concurrents et d'opportunités de canaux",
        "Maintenir des assets de campagne et des feuilles de reporting organisés",
        "Participer aux revues et appliquer le feedback pour améliorer la qualité",
      ],
      requirements: [
        "Études en cours ou diplôme récent en marketing, communication ou domaine proche — ou un portfolio autodidacte solide",
        "Curiosité pour le SEO, le social, le paid media et l'analytics",
        "Écriture fiable et souci du détail",
        "À l'aise avec Docs/Sheets ; Meta/Google Ads ou Canva est un plus",
        "Disponible pour un planning de stage structuré (hybride à Douala de préférence)",
      ],
      published: true,
    },
  ],
  team: teamMembersFr,
  posts: [],
  legal: [
    {
      slug: "privacy-policy",
      title: "Politique de confidentialité",
      body: "Brouillon de politique de confidentialité — remplacez par votre texte légal final dans l'Admin.",
    },
    {
      slug: "terms-of-service",
      title: "Conditions d'utilisation",
      body: "Brouillon des conditions d'utilisation — remplacez par votre texte légal final dans l'Admin.",
    },
    {
      slug: "cookie-policy",
      title: "Politique cookies",
      body: "Brouillon de politique cookies — remplacez par votre texte légal final dans l'Admin.",
    },
  ],
};
