import { portfolioItemsFr } from "./portfolio-items";
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
      body: "Des updates courts sur les produits, les cohortes Academy et des leçons de livraison — sans spam.",
      consent:
        "Oui, envoyez-moi occasionnellement des updates Promptstack sur les produits, l'Academy et les événements.",
    },
    seo: {
      title: "Promptstack Technologies",
      description:
        "Promptstack Technologies aide les entreprises à résoudre leurs défis opérationnels et de croissance grâce au logiciel, à l'IA & l'automatisation, au marketing digital et à l'Academy.",
    },
  },
  home: {
    hero: {
      eyebrow: "Promptstack Technologies",
      heading: "Construisez de meilleurs systèmes. Automatisez ce qui vous ralentit.",
      accentWords: ["meilleurs", "Automatisez"],
      supporting:
        "Logiciel, IA & automatisation, marketing digital et Promptstack Academy — pour des processus plus clairs, des décisions plus rapides et une croissance mesurable.",
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
      eyebrow: "La stack Promptstack",
      heading: "Un partenaire. Quatre leviers reliés.",
      body: "Choisissez le point d'entrée qui fait le plus mal aujourd'hui — sites web & logiciel, IA & automatisation, marketing digital ou Academy — puis élargissez sans changer de prestataire en cours de route.",
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
          body: "Le go-live inclut formation, docs et carte des responsables. Des parcours Academy sont dispo quand vous voulez garder les compétences en interne.",
        },
      ],
    },
    productsTeaser: {
      eyebrow: "En labo",
      heading: "Des ventures que nous façonnons",
      body: "Cartes placeholder pour les idées que Promptstack explore. Renommez, changez le statut ou remplacez-les dans Admin → Produits.",
    },
    aboutTeaser: {
      eyebrow: "Qui nous sommes",
      heading: "Construit autour de services qui font avancer le travail réel.",
      body: [
        "Promptstack est une entreprise techno centrée sur le logiciel, l'IA & l'automatisation, le marketing digital et l'Academy — pour livrer des systèmes que les équipes peuvent faire tourner, et des compétences qui restent.",
        "Nous concevons pour des équipes lean, des contraintes concrètes, et des dirigeants qui veulent des preuves plus vite qu'un long deck stratégique.",
      ],
    },
    whyUs: {
      eyebrow: "Ce que vous gagnez avec Promptstack",
      heading: "Livraison plus capacité — pas seulement des slides.",
      items: [
        {
          title: "Une stack reliée, pas des silos",
          body: "Logiciel, automatisation, marketing et Academy peuvent se renforcer au lieu de se battre pour le budget chez quatre prestataires différents.",
        },
        {
          title: "Design orienté opérateurs",
          body: "Interfaces et flux sont jugés par ceux qui cliquent chaque jour — pas seulement par le comité de pilotage.",
        },
        {
          title: "Progrès par démos",
          body: "Vous voyez assez souvent du logiciel et des artefacts de campagne pour corriger le cap. Les surprises restent petites et corrigeables.",
        },
        {
          title: "Des compétences qui restent",
          body: "Quand vous le voulez, l'Academy transforme la livraison en capacité interne — pour que le gain ne soit pas loué pour toujours.",
        },
      ],
    },
    finalCta: {
      heading: "Envie d'une prochaine étape plus claire ?",
      body: "Réservez un appel découverte. Nous trancherons s'il vous faut un système, une automatisation, une poussée growth, l'Academy, ou un mix — et quoi faire en premier.",
      cta: { label: "Réserver un appel découverte", href: "#book-discovery" },
      imageSrc: "/brand/cta-next-step.jpg",
    },
  },
  about: {
    hero: {
      eyebrow: "Promptstack Technologies",
      heading: "À propos de Promptstack",
      body: "Nous construisons logiciels, automatisations, systèmes de marketing digital et programmes Academy — pour des opérations plus claires et des compétences qui restent.",
    },
    story: {
      eyebrow: "Comment nous en sommes arrivés là",
      heading: "Concentrés sur la stack qui fait vraiment avancer le travail.",
      body: [
        "Promptstack part d'une frustration simple : trop d'organisations jonglent avec des outils qui ne se parlent pas, des campagnes illisibles, et des formations qui n'arrivent jamais en production.",
        "Nous nous sommes recentrés sur quatre leviers reliés — logiciel, IA & automatisation, marketing digital et Academy — pour que livraison et capacité grandissent ensemble.",
      ],
    },
    values: {
      eyebrow: "Notre façon de travailler",
      heading: "Les exigences que nous nous fixons",
      items: [
        {
          title: "Les services d'abord, esprit opérateur",
          body: "Notre identité, c'est le travail que nous livrons — logiciel, automatisation, systèmes de croissance et Academy — conçu pour des équipes lean et des dirigeants qui veulent des preuves vite.",
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
          title: "Laisser de la capacité derrière",
          body: "Quand c'est pertinent, l'Academy transforme le projet en muscle interne — pas une location permanente.",
        },
      ],
    },
    teamIntro: {
      heading: "Les personnes derrière Promptstack",
      body: "Ajoutez vrais noms, rôles et bios dans l'Admin quand vous êtes prêts à publier l'équipe.",
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
          title: "Parcours Academy",
          body: "Apprendre en livrant du travail fini — des preuves plutôt que des slides.",
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
      body: "Quatre leviers reliés : sites web & logiciel sur mesure, IA & automatisation, marketing digital et Academy. Commencez là où la contrainte est la plus nette.",
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
      heading: "Travailler chez Promptstack",
      body: "Rejoignez une équipe qui livre logiciel, automatisation, systèmes de croissance et Academy — avec craft, clarté, et de la place pour monter en niveau.",
    },
    whyJoin: {
      heading: "Pourquoi on nous rejoint",
      body: "Des contraintes clients réelles, une stack reliée, et des pairs qui visent des résultats utilisables.",
      items: [
        "Livrer des systèmes que les opérateurs peuvent vraiment faire tourner",
        "Travailler entre logiciel, automatisation, marketing et Academy",
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
      body: "Dites-nous la contrainte — système, automatisation, croissance, Academy ou autre — et nous répondrons avec une prochaine étape claire.",
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
  serviceItems: [
    {
      id: "software",
      name: "Logiciel & sites web",
      summary: "Sites web, apps et outils calés sur votre façon de travailler.",
      body: "Nous construisons des sites d'entreprise, des portails clients et des apps web sur mesure que votre équipe peut faire tourner au quotidien — alignés sur le travail réel, pas un template qui « presque » convient.",
      detailBody:
        "Besoin d'un site d'entreprise clair, d'un portail client, ou d'un logiciel qui remplace des tableurs confus ? Nous le concevons et le livrons pour que votre équipe puisse vraiment s'en servir. Pages et flux clairs, permissions sensées, releases revoyables avant le go-live — pas une passation boîte noire.",
      problem:
        "Votre marque est floue en ligne, ou votre équipe fait encore tourner le travail critique dans des tableurs et des fils de chat parce qu'aucun outil ne convient vraiment. Les logiciels génériques imposent des bricolages. Un site faible fait perdre la confiance avant la première conversation.",
      details: [
        "Sites d'entreprise et pages d'atterrissage qui expliquent ce que vous faites et convertissent l'intérêt",
        "Apps web, portails clients et tableaux de bord ops calés sur votre vrai process",
        "Ateliers de découverte pour cartographier le travail avant de proposer des écrans",
        "Builds itératifs avec démos, puis passation et formation pour que la propriété reste chez vous",
      ],
      outcomes: [
        "Un site ou un produit que clients et équipe comprennent tout de suite",
        "Moins de rustines manuelles entre outils et personnes",
        "Une propriété claire après le lancement — pas un système que seul le prestataire peut toucher",
      ],
      audience:
        "Les entreprises qui ont besoin d'un site professionnel, d'un portail client, ou d'un logiciel interne aligné sur le travail réel.",
      href: "/services/software",
      imageSrc: "/brand/services/software.jpg",
      imageAlt: "Développeur travaillant tard devant plusieurs écrans de code",
    },
    {
      id: "ai-automation",
      name: "IA & Automatisation",
      summary: "Automatisez les étapes répétitives qui mangent votre semaine.",
      body: "Nous repérons les handoffs, copier-coller et piles de validation à corriger — puis nous les automatisons avec des flux maintenables, pas du théâtre de démo.",
      detailBody:
        "Nous ciblons la corvée qui brûle des heures sans jugement — ressaisie, relances, mises à jour de statut, routage de documents — et la remplaçons par des automatisations que votre équipe comprend et peut maintenir. L'IA là où elle aide ; des flux fiables là où ils suffisent.",
      problem:
        "Les gens recopient des données entre outils, relancent des validations dans le chat, et retapent les mêmes mises à jour chaque jour. Des heures disparaissent dans un travail qui n'avait pas besoin d'un humain — et les erreurs arrivent quand quelqu'un est fatigué.",
      details: [
        "Audit de process pour repérer les automatisations à fort ROI",
        "Automatisation des formulaires, validations, notifications et handoffs",
        "Assistants IA pratiques quand ils réduisent l'erreur ou accélèrent les décisions",
        "Suivi et playbooks pour que les automatisations ne deviennent pas une dette obscure",
      ],
      outcomes: [
        "Des heures récupérées chaque semaine sur les tâches qui traînaient",
        "Moins de handoffs ratés et moins d'erreurs de copier-coller",
        "Des automatisations que votre équipe peut expliquer et faire tenir",
      ],
      audience:
        "Les équipes ops, admin et growth noyées sous des tâches répétables qui devraient déjà tourner seules.",
      href: "/services/ai-automation",
      imageSrc: "/brand/services/ai-automation.jpg",
      imageAlt: "Poignée de main entre une main humaine et une main robotique",
    },
    {
      id: "digital-marketing",
      name: "Marketing digital",
      summary: "Acquisition et contenu reliés à des chiffres défendables.",
      body: "SEO, médias payants, contenu et analytics connectés pour transformer l'attention en pipeline — avec un reporting fiable pour les opérateurs.",
      detailBody:
        "Nous construisons des systèmes de croissance, pas des campagnes déconnectées. Canaux, pages et reporting restent reliés pour voir ce qui a coûté, ce qui a converti, et quoi faire ensuite — sans tableau de bord illisible.",
      problem:
        "Pubs, contenu et SEO tournent en silos. L'argent sort, les leads arrivent de façon inégale, et personne ne peut clairement dire ce qui a marché. Le reporting a l'air chargé mais n'aide pas les décisions de la semaine suivante.",
      details: [
        "Stratégie de canaux (SEO, paid, contenu) avec des priorités claires",
        "Pages et tunnels alignés sur l'offre et l'audience",
        "Tracking et analytics qui relient dépenses, leads et conversion",
        "Reporting utilisable semaine après semaine — pas seulement des vanity metrics",
      ],
      outcomes: [
        "Des canaux qui soutiennent un plan de croissance clair",
        "Des dépenses reliées à des leads et conversions que vous pouvez suivre",
        "Un reporting hebdo actionnable sans traducteur",
      ],
      audience:
        "Fondateurs et responsables marketing qui veulent une croissance mesurable — pas des campagnes occupées et opaques.",
      href: "/services/digital-marketing",
      imageSrc: "/brand/services/digital-marketing.jpg",
      imageAlt: "Professionnelle souriante en appel vidéo sur smartphone à son bureau",
    },
    {
      id: "academy",
      name: "Academy",
      summary: "Apprendre en construisant. Partir avec des preuves, pas seulement des slides.",
      body: "Promptstack Academy forme à livrer du travail fini — des projets qui démontrent la compétence, pas des certificats sans preuve.",
      detailBody:
        "Promptstack Academy s'adresse aux personnes et équipes qui veulent une capacité démontrable. Les apprenants construisent vers des projets finis — avec coaching, critique, et un parcours proche de notre livraison client — pour que les compétences survivent à la salle de classe.",
      problem:
        "La formation se termine par des slides et des certificats, mais l'équipe ne sait toujours pas livrer. Les compétences s'effacent parce que la pratique ne ressemblait jamais à une vraie livraison — et la capacité part quand le prestataire part.",
      details: [
        "Parcours par projets en logiciel, IA et compétences digitales associées",
        "Cycles de build mentorés avec revues, pas seulement des cours enregistrés",
        "Livrables portfolio qui prouvent ce que quelqu'un peut shipper",
        "Options d'upselling d'équipe quand vous voulez la capacité en interne",
      ],
      outcomes: [
        "Des personnes qui montrent du travail fini, pas seulement une attestation",
        "Des compétences calées sur la façon dont les vrais projets se livrent",
        "Plus de capacité qui reste dans votre équipe après l'engagement",
      ],
      audience:
        "Les personnes qui construisent un portfolio et les entreprises qui veulent que leur équipe livre — pas seulement qu'elle assiste à une formation.",
      href: "/services/academy",
      imageSrc: "/brand/services/academy.jpg",
      imageAlt: "Intervenante présentant devant des participants en atelier de formation",
    },
  ],
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
  jobs: [],
  team: [],
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
