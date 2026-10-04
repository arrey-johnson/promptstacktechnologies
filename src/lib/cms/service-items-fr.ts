import type { ServiceItem } from "./types";

export const serviceItemsFr: ServiceItem[] = [
  {
    id: "software",
    name: "Logiciel & sites web",
    summary: "Sites, apps et outils calés sur le travail réel de votre équipe.",
    body: "Nous construisons sites d'entreprise, portails clients et apps web que votre équipe peut faire tourner au quotidien — adaptés à vos vrais flux, pas à un template qui « presque » convient.",
    detailBody:
      "Besoin d'un site clair, d'un portail client, ou d'un logiciel qui remplace des tableurs chaotiques ? Nous le concevons et le livrons pour une vraie adoption — pages et flux clairs, permissions sensées, et livraisons que vous pouvez valider avant le go-live.",
    problem:
      "Votre marque est floue en ligne, ou l'équipe fait encore tourner le travail critique dans Excel et le chat faute d'outil adapté. Les logiciels génériques forcent des contournements. Un site faible fait perdre la confiance avant la première conversation.",
    details: [
      "Sites d'entreprise et landing pages qui expliquent votre offre et convertissent",
      "Apps web, portails clients et tableaux de bord ops calés sur votre process",
      "Ateliers de découverte pour cartographier le travail avant les écrans",
      "Builds itératifs avec démos, puis passation et formation",
      "Design responsive, bases SEO et performance pour de vrais visiteurs",
      "Accès admin, documentation et formation pour ne pas dépendre de nous",
    ],
    process: [
      {
        title: "Découvrir",
        body: "Nous cartographions objectifs, audiences, contenus et flux que le site ou l'app doit supporter.",
      },
      {
        title: "Concevoir & planifier",
        body: "Architecture de l'information, écrans clés et séquence de build que vous validez avant le code.",
      },
      {
        title: "Construire par tranches",
        body: "Démos hebdomadaires de pages et fonctions réelles — feedback tant que le changement est peu coûteux.",
      },
      {
        title: "Lancer & transférer",
        body: "Checklist de go-live, formation, docs et responsables nommés de votre côté.",
      },
    ],
    modules: [
      {
        title: "Sites d'entreprise qui convertissent",
        body: "Histoire claire, services, preuves et chemins de contact — rapides sur mobile et desktop, formulaires et analytics branchés.",
      },
      {
        title: "Portails clients & apps web",
        body: "Espaces connectés, tableaux de bord et outils qui remplacent le chaos tableur — permissions, notifications et flux réels.",
      },
      {
        title: "Livraison maintenable",
        body: "Structure propre, CMS ou admin quand c'est utile, et documentation pour que les mises à jour ne deviennent pas une urgence.",
      },
    ],
    outcomes: [
      "Un site ou produit immédiatement compréhensible",
      "Moins de rustines manuelles entre outils et personnes",
      "Une propriété claire après le lancement",
      "Une base que vous pouvez faire grandir sans tout reconstruire",
    ],
    audience:
      "Entreprises qui ont besoin d'un site professionnel, d'un portail client, ou d'un logiciel interne calé sur le vrai travail.",
    faqs: [
      {
        title: "Vous reconstrisez tout ou vous améliorez l'existant ?",
        body: "Les deux. Nous recommandons le chemin le plus léger quand c'est possible ; on reconstruit quand la base ne peut plus porter le résultat voulu.",
      },
      {
        title: "Notre équipe pourra-t-elle mettre à jour le contenu ?",
        body: "Oui quand c'est important. Nous mettons en place des chemins d'édition et formons les personnes qui tiendront le quotidien.",
      },
      {
        title: "Combien de temps dure un projet typique ?",
        body: "Un site marketing focalisé peut avancer en semaines ; portails et apps sur mesure prennent plus longtemps selon les flux. Nous verrouillons tôt une première victoire utile.",
      },
    ],
    href: "/services/software",
    imageSrc: "/brand/services/software.jpg",
    imageAlt: "Développeur travaillant tard avec du code sur plusieurs écrans",
  },
  {
    id: "ai-automation",
    name: "IA & Automatisation",
    summary: "Automatisez les étapes répétitives qui mangent votre semaine.",
    body: "Nous repérons les handoffs, copier-coller et piles d'approbations à corriger — puis nous automatisons avec des flux maintenables, pas du théâtre de démo.",
    detailBody:
      "Nous ciblons le grind qui brûle des heures sans jugement — resaisie, relances, mises à jour de statut, routage de documents — et le remplaçons par des automatisations que votre équipe comprend et peut maintenir. L'IA intervient quand elle aide ; les flux fiables gagnent le reste.",
    problem:
      "Les gens recopient des données entre outils, relancent des validations dans le chat, et retapent les mêmes updates chaque jour. Les heures partent dans un travail qui n'avait pas besoin d'un humain — et les erreurs arrivent quand quelqu'un est fatigué.",
    details: [
      "Audit de process pour repérer les automatisations à fort ROI",
      "Automatisation de formulaires, validations, notifications et handoffs",
      "IA pratique là où elle réduit l'erreur ou accélère les décisions",
      "Intégrations entre les outils que vous utilisez déjà",
      "Monitoring et playbooks pour éviter la dette mystérieuse",
      "Formation pour que les opérateurs sachent quoi vérifier en cas d'échec",
    ],
    process: [
      {
        title: "Auditer le grind",
        body: "Nous nous asseyons avec ceux qui font le travail et listons les étapes répétables coûteuses ou sources d'erreurs.",
      },
      {
        title: "Prioriser le ROI",
        body: "Nous notons impact vs effort et choisissons une première automatisation digne d'être livrée vite.",
      },
      {
        title: "Construire & tester",
        body: "Implémentation, cas limites, et monitoring avant que vous en dépendiez au quotidien.",
      },
      {
        title: "Transférer avec playbooks",
        body: "Docs, owners et runbook simple — pour que l'automatisation reste la vôtre.",
      },
    ],
    modules: [
      {
        title: "Automatisation ops & admin",
        body: "Validations, rappels, sync de données, routage de documents et updates de statut qui vivaient dans le chat et Excel.",
      },
      {
        title: "Assistance IA pratique",
        body: "Rédaction, classification, extraction et aide à la décision — seulement quand précision et revue humaine ont du sens.",
      },
      {
        title: "Exploitation fiable",
        body: "Alertes, logs et repli pour qu'un échec ne casse pas la semaine en silence.",
      },
    ],
    outcomes: [
      "Des heures récupérées chaque semaine",
      "Moins de handoffs ratés et moins d'erreurs de copier-coller",
      "Des automatisations que l'équipe peut expliquer et maintenir",
      "Un chemin clair de « on devrait automatiser » à quelque chose de live",
    ],
    audience:
      "Équipes ops, admin et growth noyées sous des tâches répétables qui devraient déjà tourner seules.",
    faqs: [
      {
        title: "Vous n'utilisez que l'IA ?",
        body: "Non. Beaucoup de gains sont de solides automatisations de flux. L'IA s'ajoute quand elle réduit clairement l'effort ou l'erreur.",
      },
      {
        title: "Vous travaillez avec nos outils existants ?",
        body: "En général oui. Nous partons de ce que vous avez et n'introduisons de nouveaux outils que s'ils le méritent.",
      },
      {
        title: "Et si une automatisation casse ?",
        body: "Nous prévoyons monitoring et playbook simple — et un support après livraison si vous le souhaitez.",
      },
    ],
    href: "/services/ai-automation",
    imageSrc: "/brand/services/ai-automation.jpg",
    imageAlt: "Poignée de main humain-robot — partenariat personnes et automatisation",
  },
  {
    id: "digital-marketing",
    name: "Marketing digital",
    summary: "Acquisition et contenu reliés à des chiffres défendables.",
    body: "SEO, paid media, contenu et analytics connectés pour que l'attention devienne pipeline — avec un reporting que les opérateurs peuvent utiliser.",
    detailBody:
      "Nous construisons des systèmes de croissance, pas des campagnes déconnectées. Canaux, pages d'atterrissage et reporting restent reliés pour voir ce qui a coûté, ce qui a converti, et quoi faire ensuite.",
    problem:
      "Pubs, contenu et SEO vivent en silos. L'argent sort, les leads arrivent de façon inégale, et personne ne sait clairement ce qui a marché. Le reporting est occupé mais n'aide pas la semaine suivante.",
    details: [
      "Stratégie de canaux SEO, paid et contenu avec priorités claires",
      "Landing pages et tunnels alignés sur l'offre et l'audience",
      "Tracking et analytics qui relient dépense, leads et conversion",
      "Systèmes de contenu utiles au search et aux conversations sales",
      "Setup de campagnes, optimisation et itération créative",
      "Reporting actionnable semaine après semaine",
    ],
    process: [
      {
        title: "Diagnostiquer le tunnel",
        body: "Nous revoyons offre, audience, canaux, tracking et les points de chute des leads.",
      },
      {
        title: "Fixer le plan de croissance",
        body: "Priorités, logique de budget et métriques de succès pour la prochaine période utile.",
      },
      {
        title: "Livrer et mesurer",
        body: "Lancement de pages, campagnes et contenus avec tracking dès le premier jour.",
      },
      {
        title: "Optimiser chaque semaine",
        body: "Garder ce qui bouge, couper le reste, et doubler ce qui marche avec des actions claires.",
      },
    ],
    modules: [
      {
        title: "Systèmes d'acquisition",
        body: "Bases SEO, structure paid media et campagnes visant un intérêt qualifié — pas du bruit.",
      },
      {
        title: "Chemins de conversion",
        body: "Landing pages, offres et suivis qui transforment l'attention en conversations et leads.",
      },
      {
        title: "Mesure de confiance",
        body: "Tracking propre, tableaux de bord et reporting hebdo liés aux leads et signaux de revenu.",
      },
    ],
    outcomes: [
      "Des canaux au service d'un plan de croissance unique",
      "Une dépense reliée à des leads et conversions traçables",
      "Un reporting que l'équipe peut utiliser sans traducteur",
      "Une façon répétable de tester des offres au lieu de deviner",
    ],
    audience:
      "Fondateurs et responsables marketing qui veulent une croissance mesurable — pas des campagnes occupées et opaques.",
    faqs: [
      {
        title: "Vous ne gérez que les pubs ?",
        body: "Nous relions canaux, pages et tracking. Les pubs seules sans chemin de conversion gaspillent souvent le budget.",
      },
      {
        title: "Vous travaillez avec notre site actuel ?",
        body: "Oui. Nous améliorons ce qui convertit et ne recommandons une refonte que si le site bloque la croissance.",
      },
      {
        title: "Comment rapportez-vous les résultats ?",
        body: "Reporting clair hebdo ou bi-hebdo : dépense, résultats, changements, et prochaine action.",
      },
    ],
    href: "/services/digital-marketing",
    imageSrc: "/brand/services/digital-marketing.jpg",
    imageAlt: "Professionnelle souriante en appel vidéo sur smartphone",
  },
  {
    id: "academy",
    name: "Academy",
    summary: "Se former au développement web, au marketing digital et à l'IA.",
    body: "Promptstack Academy forme étudiants et aspirants professionnels tech au développement web, au marketing digital et à l'IA — par des projets concrets, pas seulement des slides.",
    detailBody:
      "Promptstack Academy est conçue pour les étudiants et aspirants professionnels tech qui veulent des compétences prêtes pour le terrain. Choisissez un parcours — Développement web, Marketing digital ou Formation IA — apprenez en construisant, recevez du feedback mentoré, et repartez avec des projets à montrer.",
    problem:
      "Beaucoup de formations s'arrêtent à la théorie et aux certificats. Les diplômés ne savent toujours pas construire un site, lancer une campagne, ou appliquer l'IA à de vraies tâches — donc les employeurs ne font pas confiance au CV.",
    details: [
      "Trois parcours : Développement web, Marketing digital et Formation IA",
      "Apprentissage par projets avec revues mentorées",
      "Livrables portfolio à montrer en entretien",
      "Outils et flux utilisés dans de vraies livraisons",
      "Frais clairs en FCFA — pas de « contactez-nous pour le prix »",
      "Environnement de cohorte pour étudiants et reconversions",
    ],
    process: [
      {
        title: "Choisir son parcours",
        body: "Développement web, Marketing digital ou Formation IA selon la trajectoire visée.",
      },
      {
        title: "Apprendre en construisant",
        body: "Cours reliés à des exercices et projets — pas de théorie sans sortie.",
      },
      {
        title: "Être reviewé",
        body: "Les mentors critiquent votre travail comme le font les vraies équipes : avec du feedback.",
      },
      {
        title: "Montrer vos preuves",
        body: "Pièces portfolio et un discours plus clair pour candidatures et entretiens.",
      },
    ],
    modules: [
      {
        title: "À qui s'adresse l'Academy",
        body: "Étudiants, jeunes diplômés et aspirants professionnels tech qui veulent des compétences pratiques en développement web, marketing digital ou IA.",
      },
      {
        title: "Comment se déroulent les cours",
        body: "Leçons structurées, pratique, jalons de projet et feedback mentoré. Vous repartez avec des livrables, pas seulement des notes.",
      },
      {
        title: "À quoi ressemble « terminé »",
        body: "Projets complétés, histoire de compétences plus claire pour le CV, et confiance dans les outils de votre parcours.",
      },
    ],
    courses: [
      {
        id: "web-development",
        name: "Développement web",
        fee: "250 000 FCFA",
        duration: "Parcours pratique complet",
        summary:
          "Apprenez à construire des sites et interfaces modernes que les employeurs peuvent évaluer — structure, style, interactivité et bases de mise en ligne.",
        curriculum: [
          "Internet, navigateurs et fonctionnement réel d'un site",
          "Structure HTML pour de vraies pages (pas des démos jouets)",
          "CSS : mise en page, responsive et hiérarchie visuelle",
          "Bases JavaScript pour des interfaces interactives",
          "Composants, formulaires et logique d'app simple",
          "Git pour le versioning et les habitudes de collaboration",
          "APIs et données : récupérer, afficher, gérer des réponses",
          "Hébergement, déploiement et mise en ligne d'un projet",
          "Debugging, bases d'accessibilité et hygiène performance",
          "Capstone : livrer un site ou une app web portfolio",
        ],
        outcomes: [
          "Un projet live ou déployable à montrer",
          "Confiance pour construire pages et interfaces from scratch",
          "Une voie plus claire vers des rôles web / frontend juniors",
        ],
      },
      {
        id: "digital-marketing",
        name: "Marketing digital",
        fee: "250 000 FCFA",
        duration: "Parcours pratique complet",
        summary:
          "Apprenez l'acquisition de bout en bout — contenu, campagnes, landing pages et mesure — pour piloter la croissance avec des preuves.",
        curriculum: [
          "Fondamentaux du marketing digital et parcours client",
          "Positionnement, offres et clarté d'audience",
          "Content marketing : planification, rédaction, distribution",
          "Stratégie social media et bases d'exécution de campagnes",
          "Fondamentaux SEO : intention, on-page et structure de contenu",
          "Bases paid media : structure de compte, ciblage, tests créa",
          "Landing pages et structure orientée conversion",
          "Email / suivis et bases de nurture de leads",
          "Analytics & tracking : quoi mesurer et comment le lire",
          "Capstone : planifier et présenter une campagne complète avec logique de reporting",
        ],
        outcomes: [
          "Un plan de campagne et des artefacts à montrer",
          "Savoir relier canaux, conversion et reporting",
          "Compétences pratiques pour des rôles assistant / coordinateur marketing",
        ],
      },
      {
        id: "ai-training",
        name: "Formation IA",
        fee: "100 000 FCFA",
        duration: "Parcours pratique focalisé",
        summary:
          "Apprenez à utiliser l'IA de façon productive — prompting, workflows, contrôle qualité et cas d'usage concrets — sans le hype.",
        curriculum: [
          "Ce que l'IA peut et ne peut pas faire de façon fiable aujourd'hui",
          "Fondamentaux du prompting pour des résultats clairs et réutilisables",
          "IA pour recherche, rédaction et synthèse",
          "Workflows de productivité (docs, email, planification)",
          "Cas d'usage image / médias (quand c'est pertinent)",
          "Contrôle qualité : vérification, biais et revue humaine",
          "Construire des workflows IA simples pour études ou travail",
          "Éthique, confidentialité et usage responsable",
          "Mini-projet portfolio : un workflow IA qui résout une vraie tâche",
          "Parler clairement de ses compétences IA sur un CV ou en entretien",
        ],
        outcomes: [
          "Des workflows IA pratiques réutilisables tout de suite",
          "Un meilleur jugement sur quand faire confiance à l'IA",
          "Un mini-projet qui prouve une compétence IA appliquée",
        ],
      },
    ],
    feeNote:
      "Les frais sont indiqués par parcours en FCFA. Demandez-nous les dates de cohorte, options de paiement, et le parcours le plus adapté à vos objectifs.",
    outcomes: [
      "Pratique job-ready en développement web, marketing digital ou IA",
      "Projets finis qui renforcent candidatures et entretiens",
      "Feedback mentoré au lieu d'apprendre seul en silence",
      "Une histoire plus claire de ce que vous savez vraiment faire",
    ],
    audience:
      "Étudiants et aspirants professionnels tech qui veulent une formation pratique en développement web, marketing digital ou IA.",
    faqs: [
      {
        title: "Qui peut rejoindre l'Academy ?",
        body: "Étudiants, jeunes diplômés et aspirants professionnels tech. Pas besoin d'être déjà en entreprise — motivation et régularité comptent le plus.",
      },
      {
        title: "Les frais sont-ils par parcours ?",
        body: "Oui. Développement web : 250 000 FCFA. Marketing digital : 250 000 FCFA. Formation IA : 100 000 FCFA.",
      },
      {
        title: "Y a-t-il un certificat ?",
        body: "Vous obtenez une reconnaissance de complétion — mais la priorité reste les preuves portfolio et les compétences démontrables, pas seulement un papier.",
      },
      {
        title: "Puis-je suivre plusieurs parcours ?",
        body: "Oui. Beaucoup commencent par un parcours puis en ajoutent un autre. Nous vous aidons à séquencer si besoin.",
      },
      {
        title: "C'est en ligne ou en présentiel ?",
        body: "Demandez-nous le format actuel de cohorte (présentiel, en ligne ou hybride) et le planning de votre parcours.",
      },
    ],
    href: "/services/academy",
    imageSrc: "/brand/services/academy.jpg",
    imageAlt: "Intervenante présentant devant des participants en atelier",
  },
];
