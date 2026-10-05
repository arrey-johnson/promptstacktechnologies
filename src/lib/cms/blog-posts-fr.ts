import type { BlogPost } from "./types";

export const blogPostsFr: BlogPost[] = [
  {
    id: "post-diagnose-first",
    slug: "diagnose-before-you-build",
    title: "Diagnostiquer avant de construire : pourquoi tant de projets numériques échouent dès la semaine 1",
    excerpt:
      "Acheter un logiciel ou une refonte sans nommer le goulot, c’est financer de l’activité au lieu de résultats. Voici la discipline de diagnostic que Promptstack utilise avant tout build.",
    category: "Livraison",
    publishedAt: "2026-09-15",
    published: true,
    body: `Ils n’échouent pas dans le code. Ils échouent dans le brief.

Une entreprise décide qu’elle « a besoin d’un site », « d’un CRM » ou « d’automatisation ». Un prestataire chiffre. Des écrans apparaissent. Trois mois plus tard, l’équipe travaille encore sur WhatsApp et Excel — et le nouveau système devient un onglet que personne n’ouvre.

L’étape manquante : le diagnostic.

Ce que nous entendons par diagnostiquer
Avant de proposer des outils, nous travaillons avec les gens qui font le travail et répondons à quatre questions en langage clair :

1. Où disparaît vraiment le temps chaque semaine ?
2. Quel handoff crée le plus de reprises ou de blâme ?
3. À quoi ressemble « mieux » en 30–60 jours — pas dans une roadmap de trois ans ?
4. Qui possédera le système après le go-live ?

Si les réponses sont floues, le build le sera aussi.

Un premier gain utile bat une architecture fantaisiste
Les acheteurs corporate demandent parfois une plateforme complète dès le jour 1. L’ambition est bonne — mais la première livraison doit protéger un gain mesurable : moins de relances manquées, renouvellements plus fluides, facturation plus claire, un site qui qualifie vraiment les leads.

Le modèle Promptstack est volontaire : diagnostiquer → définir → livrer → transférer la propriété. La première phase existe pour éviter de payer le mauvais système.

Pour votre prochain appel d’offres
Demandez à chaque prestataire — y compris nous — comment il découvrira le goulot avant de vendre des écrans. Si la proposition saute directement aux fonctionnalités, vous achetez un catalogue, pas une transformation.`,
  },
  {
    id: "post-ownership-transfer",
    slug: "transfer-ownership-after-go-live",
    title: "Le go-live n’est pas la ligne d’arrivée : transférer une propriété qui tient",
    excerpt:
      "Les systèmes les plus coûteux sont ceux que seul le prestataire peut toucher. Cartes de propriété, formation et design admin décident si l’investissement compose ou se dégrade.",
    category: "Opérations",
    publishedAt: "2026-09-22",
    published: true,
    body: `Le jour du lancement ressemble à un succès. Des captures circulent. La direction souffle. Puis quelqu’un part, un mot de passe disparaît, et le « nouveau système » revient tranquillement à Excel.

Ce n’est pas d’abord un problème de personnes. C’est un problème de conception de la livraison.

La propriété est un livrable
Chez Promptstack, le handover fait partie du produit :

• Propriétaires nommés pour contenu, opérations et accès technique
• Chemins admin alignés sur la façon dont votre équipe met vraiment à jour le travail
• Formation courte centrée sur les tâches hebdomadaires — pas un PDF de 40 pages
• Documentation qui répond à « qu’est-ce qui casse si je change ceci ? »

Pourquoi les entreprises devraient s’en soucier
Quand vous achetez un engagement à ₣2M–₣10M, vous achetez de la continuité. Un portail ou une automatisation que seule l’agence peut modifier devient une prise d’otage — ou un échec silencieux.

Questions avant de signer
• Qui, de notre côté, pourra publier, valider et rapporter sans appeler le prestataire ?
• Que se passe-t-il au mois 4 quand une campagne exige une nouvelle landing ?
• Quels accès et environnements sont documentés ?

Si la proposition ne répond pas, vous louez une démo — vous n’achetez pas une capacité opérationnelle.`,
  },
  {
    id: "post-beyond-brochure",
    slug: "beyond-the-brochure-website",
    title: "Au-delà du site brochure : quand votre site doit devenir une surface d’exploitation",
    excerpt:
      "Une jolie homepage n’est pas un système de croissance. Comment savoir si vous avez besoin d’une brochure, d’un portail ou d’une stack connectée — et budgéter en conséquence.",
    category: "Stratégie",
    publishedAt: "2026-09-29",
    published: true,
    body: `Beaucoup d’organisations achètent encore des sites comme des brochures avec un formulaire. Cela peut suffire — jusqu’à ce que renouvellements, inscriptions, facturation, portails partenaires ou suivi commercial deviennent la vraie contrainte.

Trois niveaux de maturité
1. Présence brochure — marque, services, preuves, contact.
2. Site opérationnel — candidatures, réservations, workflows contenu, handoff CRM basique.
3. Stack connectée — site + CRM + e-mail automation + admin + intégrations.

La plupart des demandes « on a besoin d’un nouveau site » sont des problèmes de niveau 2 ou 3 déguisés en niveau 1.

Comment Promptstack cadre
Nous partons du goulot, pas du template. Si votre équipe perd des renouvellements dans les boîtes mail, une refonte seule ne suffira pas.

Honnêteté budgétaire
Le niveau 1 se joue sur le goût et la vitesse. Les niveaux 2–3 se jouent sur le design de process, les intégrations et la propriété. C’est pourquoi les engagements corporate ne ressemblent pas aux projets brochure ₣100k–₣300k — et pourquoi le brief doit le dire clairement.`,
  },
  {
    id: "post-automation-roi",
    slug: "automation-that-pays-for-itself",
    title: "Une automatisation qui se rentabilise : commencez par les goulots ennuyeux",
    excerpt:
      "Les démos d’IA sont excitantes. Les handoffs répétables, relances et saisies sont là où l’automatisation rend souvent de l’argent. Une façon pratique de prioriser.",
    category: "Automatisation",
    publishedAt: "2026-10-01",
    published: true,
    body: `Chaque comité a un slide sur l’IA. Moins en ont une liste des cinq tâches hebdomadaires qui brûlent le plus d’heures.

Partir du volume et de la douleur
Les bons candidats à l’automatisation :

• Fréquents (hebdo ou quotidien)
• Plus règles que jugement
• Erreurs coûteuses ou gênantes
• Déjà « portés » de façon bricolée (héros du tableur)

Exemples fréquents : routage de leads, relances d’adhésion, statut de factures, compilation de rapports, checklists d’onboarding, validations de contenu.

Résister au théâtre
Un chatbot qui ne met pas à jour le CRM, c’est du théâtre. Un workflow qui mène une demande qualifiée du formulaire → propriétaire → suivi avec piste d’audit, c’est de l’opérationnel.

Comment nous menons ces missions
1. Cartographier le chemin actuel avec ceux qui le vivent
2. Mesurer temps / coût d’erreur sur les deux pires étapes
3. Livrer une fine tranche d’automatisation avec propriétaires et monitoring
4. Ensuite seulement élargir

Si un prestataire vend une visite de plateforme avant de nommer votre goulot en une phrase, pause.`,
  },
  {
    id: "post-marketing-pipeline",
    slug: "marketing-that-connects-to-pipeline",
    title: "Un marketing branché sur le pipeline — pas seulement sur les impressions",
    excerpt:
      "Le marketing digital gagne la confiance lorsque campagnes, contenu et suivi CRM partagent un même chemin. La stack minimale que Promptstack exige avant d’augmenter les dépenses.",
    category: "Marketing",
    publishedAt: "2026-10-03",
    published: true,
    body: `Dépenser en pubs ou en contenu sans chemin clair vers la conversation, c’est faire évaporer un budget.

Le chemin connecté minimum
Avant de scaler l’acquisition, nous voulons :

• Un site (ou landing) qui pose offre, preuves et prochaine étape
• Des formulaires avec assez de contexte pour la vente
• Un routage vers un propriétaire nommé avec SLA de réponse
• Une attribution de base : quelle campagne / page a démarré l’échange
• Une séquence de suivi qui ne dépend pas de la mémoire d’une personne

Le contenu est un actif commercial
Un blog vide affaiblit une entreprise qui vend du marketing digital. Quelques excellents articles qui montrent comment vous pensez — diagnostic, propriété, mesure — font plus pour la crédibilité corporate que vingt posts minces.

À quoi ressemble « bien » en 90 jours
Pas seulement des vanity metrics. Visez : conversations qualifiées réservées, réponses plus rapides, ROI campagne plus lisible, et un feedback sales qui dit que les leads arrivent déjà orientés.

Promptstack construit les systèmes marketing comme le logiciel : diagnostiquer la contrainte, livrer une tranche utile, transférer la propriété, puis scaler ce qui marche.`,
  },
];
