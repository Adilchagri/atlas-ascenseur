import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import { atlasCoreGallery, commercialElevators, comoCabins, elevatorDetailGalleries, residentialElevators } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';
import ProductGallery from '../components/ui/ProductGallery.jsx';
import atlasCoreCataloguePdf from '../assets/pdfs-for-brochures/atlas-core-catalogue.pdf';
import atlasPanoramaHydraulicPdf from '../assets/pdfs-for-brochures/Atlas Panorama-Hydrauliquee.pdf';
import atlasPanoramaPdf from '../assets/pdfs-for-brochures/Atlas Panorama.pdf';

const noGalleryPages = new Set([
  'Hospital Lifts',
  'Car Lifts',
  'Escalators & Walkways',
  'COMO Commercial',
  'Atlas Core',
  'Cargo Lifts',
  'Dumbwaiter Lifts',
]);

const elevatorPages = {
  '/elevators/circular-elevators': { title: { en: 'Circular', fr: 'Ascenseurs' }, accent: { en: 'Elevators', fr: 'Circulaires' }, source: 'res', key: 'Circular Elevators' },
  '/elevators/exterior-elevators': { title: { en: 'Exterior', fr: 'Ascenseurs' }, accent: { en: 'Elevators', fr: 'Extérieurs' }, source: 'res', key: 'Exterior Elevators' },
  '/villa-glass-elevators-morocco': {
    title: {
      en: 'Panoramic Elevators for Villas in Morocco',
      fr: 'Ascenseurs Panoramiques pour Villas au Maroc'
    },
    accent: {
      en: 'Atlas Panorama',
      fr: 'Atlas Panorama'
    },
    source: 'res',
    key: 'Atlas Panorama'
  },
  '/residential-elevators-morocco': { title: { en: 'Residential Elevators for Villas & Buildings in Morocco', fr: 'Ascenseurs Résidentiels pour Villas & Immeubles au Maroc' }, accent: { en: 'Atlas Core', fr: 'Atlas Core' }, source: 'res', key: 'Atlas Core' },
  '/elevators/hospital-lifts': { title: { en: 'Hospital', fr: 'Ascenseurs' }, accent: { en: 'Lifts', fr: 'Hospitaliers' }, source: 'com', key: 'Hospital Lifts' },
  '/elevators/car-lifts': { title: { en: 'Car', fr: 'Monte' }, accent: { en: 'Lifts', fr: 'Voitures' }, source: 'com', key: 'Car Lifts' },
  '/elevators/escalators-walkways': { title: { en: 'Escalators', fr: 'Escalators' }, accent: { en: '& Walkways', fr: '& Trottoirs Roulants' }, source: 'com', key: 'Escalators & Walkways' },
  '/elevators/como-commercial': { title: { en: 'COMO', fr: 'COMO' }, accent: { en: 'Commercial', fr: 'Commercial' }, source: 'com', key: 'COMO Commercial' },
  '/elevators/cargo-lifts': { title: { en: 'Cargo', fr: 'Monte' }, accent: { en: 'Lifts', fr: 'Charges' }, source: 'com', key: 'Cargo Lifts' },
  '/elevators/dumbwaiter-lifts': { title: { en: 'Dumbwaiter', fr: 'Monte' }, accent: { en: 'Lifts', fr: 'Plats' }, source: 'com', key: 'Dumbwaiter Lifts' },
};

const productNotes = {
  'Atlas Panorama': {
    label: 'Panoramic Design Lift',
    headline: 'Panoramic Elevators for Villas in Morocco',
    body: 'Atlas Panorama is our premium range of panoramic glass elevators designed for modern villas in Morocco. Offering a glazed shaft, elegant styling, and extensive customization, it provides an exquisite residential addition with silent, safe, and comfortable operation. Each project is tailormade to meet our clients\' technical and aesthetic desires.',
    points: ['Glass panoramic structure', 'Smooth and quiet operation', 'Custom cabin, lighting, and doors', 'Ideal for Moroccan villas'],
  },
  'Atlas Core': {
    label: 'Atlas Core',
    headline: 'Residential Elevators for Villas & Buildings in Morocco',
    body: 'Atlas Core is our premium elevator range designed for concrete shaft installations. Adapted to villas, residential buildings, and professional spaces, it delivers a reliable, elegant, and durable solution with broad personalization options, quiet operation, and high-quality components.',
    points: ['Concrete shaft installation', 'Silent operation', 'Customizable cabins', 'High-quality components'],
  },
  'Circular Elevators': {
    label: 'Architectural lift',
    headline: 'A circular panoramic elevator designed as an architectural centerpiece.',
    body: 'Glass structures, sculptural design, and bespoke finishes come together in a panoramic experience created for the most prestigious residential spaces.',
    points: ['Panoramic glass effect', 'Custom railings and flooring', 'Statement architecture', 'High visibility and light'],
  },
  'Exterior Elevators': {
    label: 'Outdoor access',
    headline: 'An outdoor solution designed to combine accessibility and design.',
    body: 'Our exterior elevators integrate harmoniously with villas and contemporary buildings through an elegant, durable, and compact structure.',
    points: ['Weather-ready shaft', 'Anti-corrosion materials', 'Terrace and garden access', 'Compact outdoor footprint'],
  },
  'COMO Commercial': {
    label: 'Commercial passenger lift',
    headline: 'Traffic-ready vertical transport for professional buildings.',
    body: 'A commercial elevator solution for offices, hotels, public buildings, and mixed-use properties, with configurable load capacities, refined cabins, and uptime-focused components.',
    points: ['Gearless all-electric performance', 'Configurable capacity', 'UPS emergency release', 'Built for daily traffic'],
  },
  'Escalators & Walkways': {
    label: 'Continuous public flow',
    headline: 'Smooth movement for high-volume public spaces.',
    body: 'Designed for malls, airports, stations, supermarkets, and transport hubs, these systems focus on robust truss construction, anti-slip surfaces, reliable operation, and advanced safety.',
    points: ['High passenger flow', 'Anti-slip steps and surfaces', 'Robust truss materials', 'Low-maintenance movement'],
  },
  'Car Lifts': {
    label: 'Vehicle elevator',
    headline: 'Precise lifting for garages, showrooms, and parking buildings.',
    body: 'Car lifts support vehicle access where ramps are not practical, with heavy-load configurations, protective details, and smooth low-speed handling.',
    points: ['Heavy vehicle capacity', 'Garage and showroom access', 'Automatic door options', 'Low-speed precision'],
  },
  'Cargo Lifts': {
    label: 'Freight elevator',
    headline: 'A durable logistics lift for heavy goods.',
    body: 'Cargo and freight elevators are built for warehouses, factories, retail stockrooms, and back-of-house movement with reinforced cabins and practical loading access.',
    points: ['Reinforced cabin', 'Industrial loading access', 'Freight and stock movement', 'Reliable daily operation'],
  },
  'Hospital Lifts': {
    label: 'Healthcare circulation',
    headline: 'Safe, smooth movement for patients, beds, and staff.',
    body: 'Hospital lifts prioritize wide access, hygienic surfaces, smooth starts and stops, and dependable traffic handling for medical environments.',
    points: ['Bed-compatible cabins', 'Hygienic surfaces', 'Wide door openings', 'Smooth ride comfort'],
  },
  'Dumbwaiter Lifts': {
    label: 'Service lift',
    headline: 'Compact movement for kitchens, clinics, and back-office teams.',
    body: 'Dumbwaiters move meals, supplies, laundry, and documents between floors while improving staff efficiency in restaurants, hotels, clinics, and villas.',
    points: ['Compact footprint', 'Multi-stop service', 'Back-of-house efficiency', 'Simple daily operation'],
  },
};

const frProductNotes = {
  'Atlas Panorama': {
    label: 'Ascenseur résidentiel design',
    headline: 'Ascenseurs Panoramiques pour Villas au Maroc',
    body: 'Atlas Panorama est notre gamme d’ascenseurs panoramiques haut de gamme conçue pour les villas modernes au Maroc. Grâce à sa gaine vitrée, son design élégant et ses nombreuses possibilités de personnalisation, Atlas Panorama apporte une véritable valeur ajoutée à votre habitation. Nos ascenseurs offrent un déplacement silencieux, sécurisé et confortable tout en s’intégrant parfaitement à l’architecture de votre villa. Chaque projet est conçu sur mesure afin de répondre aux besoins esthétiques et techniques de nos clients.',
    points: ['Design panoramique en verre', 'Déplacement silencieux et sécurisé', 'Intégration architecturale sur mesure', 'Conçu pour les villas marocaines'],
  },
  'Atlas Core': {
    label: 'Atlas Core',
    headline: 'Ascenseurs Résidentiels pour Villas & Immeubles au Maroc',
    body: 'Atlas Core est notre gamme d’ascenseurs premium conçue pour les installations en gaine béton. Adaptée aux villas, immeubles résidentiels et bâtiments professionnels, cette gamme offre une solution fiable, élégante et durable. Grâce à ses nombreuses possibilités de personnalisation, son fonctionnement silencieux et ses composants de haute qualité, Atlas Core répond aux exigences des architectes, promoteurs et particuliers.',
    points: ['Installation en gaine béton', 'Fonctionnement silencieux', 'Cabines personnalisables', 'Composants haut de gamme'],
  },
  'Circular Elevators': {
    label: 'Ascenseur architectural',
    headline: 'L’ascenseur panoramique circulaire conçu comme une pièce maîtresse architecturale.',
    body: 'Structures vitrées, design sculptural et finitions sur mesure réunis dans une expérience panoramique pensée pour les espaces résidentiels les plus prestigieux.',
    points: ['Effet verre panoramique', 'Mains courantes et sols personnalisés', 'Présence architecturale', 'Lumière et visibilité'],
  },
  'Exterior Elevators': {
    label: 'Accès extérieur',
    headline: 'Une solution extérieure pensée pour conjuguer accessibilité et design.',
    body: 'Nos ascenseurs extérieurs s’intègrent harmonieusement aux villas et bâtiments contemporains grâce à une structure élégante, résistante et peu encombrante.',
    points: ['Gaine résistante aux intempéries', 'Matériaux anticorrosion', 'Accès terrasse et jardin', 'Empreinte extérieure compacte'],
  },
  'COMO Commercial': {
    label: 'Ascenseur commercial passagers',
    headline: 'Transport vertical prêt pour le trafic des bâtiments professionnels.',
    body: 'Une solution pour bureaux, hôtels, bâtiments publics et immeubles mixtes, avec capacités configurables, cabines raffinées et composants orientés disponibilité.',
    points: ['Performance gearless tout électrique', 'Capacité configurable', 'Secours UPS', 'Conçu pour le trafic quotidien'],
  },
  'Escalators & Walkways': {
    label: 'Flux public continu',
    headline: 'Mouvement fluide pour espaces publics à fort volume.',
    body: 'Pour centres commerciaux, aéroports, gares et supermarchés, ces systèmes privilégient robustesse, surfaces antidérapantes, fiabilité et sécurité avancée.',
    points: ['Flux passagers élevé', 'Marches et surfaces antidérapantes', 'Structure robuste', 'Mouvement à faible maintenance'],
  },
  'Car Lifts': {
    label: 'Monte-voitures',
    headline: 'Levage précis pour garages, showrooms et parkings.',
    body: 'Les monte-voitures facilitent l’accès véhicule lorsque les rampes ne sont pas pratiques, avec configurations lourdes et manipulation douce à basse vitesse.',
    points: ['Capacité véhicules lourds', 'Accès garage et showroom', 'Options de portes automatiques', 'Précision à basse vitesse'],
  },
  'Cargo Lifts': {
    label: 'Monte-charge',
    headline: 'Un ascenseur logistique durable pour charges lourdes.',
    body: 'Les monte-charges sont conçus pour entrepôts, usines, réserves et back-office avec cabines renforcées et accès de chargement pratique.',
    points: ['Cabine renforcée', 'Accès de chargement industriel', 'Mouvement de stock et fret', 'Fonctionnement quotidien fiable'],
  },
  'Hospital Lifts': {
    label: 'Circulation médicale',
    headline: 'Mouvement sûr et doux pour patients, lits et équipes.',
    body: 'Les ascenseurs hospitaliers privilégient larges accès, surfaces hygiéniques, démarrages et arrêts souples, et gestion fiable du trafic médical.',
    points: ['Cabines compatibles avec les lits', 'Surfaces hygiéniques', 'Ouvertures larges', 'Confort de trajet'],
  },
  'Dumbwaiter Lifts': {
    label: 'Monte-plats',
    headline: 'Transport compact pour cuisines, cliniques et équipes de service.',
    body: 'Les monte-plats déplacent repas, fournitures, linge et documents entre les étages pour améliorer l’efficacité du personnel.',
    points: ['Empreinte compacte', 'Service multi-étages', 'Efficacité back-office', 'Usage quotidien simple'],
  },
};

const atlasCoreApplications = [
  { icon: '🏡', en: 'Villas', fr: 'Villas' },
  { icon: '🏢', en: 'Residential buildings', fr: 'Immeubles résidentiels' },
  { icon: '💼', en: 'Offices', fr: 'Bureaux' },
  { icon: '🏨', en: 'Hotels', fr: 'Hôtels' },
  { icon: '🏥', en: 'Clinics', fr: 'Cliniques' },
  { icon: '🏬', en: 'Commercial buildings', fr: 'Bâtiments commerciaux' },
];

const atlasCoreReasons = [
  { en: 'Concrete shaft installation', fr: 'Installation en gaine béton' },
  { en: 'Silent operation', fr: 'Fonctionnement silencieux' },
  { en: 'Customizable cabins', fr: 'Cabines personnalisables' },
  { en: 'Low energy consumption', fr: 'Faible consommation d’énergie' },
  { en: 'High-end components', fr: 'Composants haut de gamme' },
  { en: 'Compliant with standards', fr: 'Conforme aux normes' },
  { en: 'Ideal for villas and buildings', fr: 'Idéal pour villas et immeubles' },
];

const atlasCoreComparison = {
  en: [
  ['Installation', 'Self-supporting panoramic structure', 'Concrete shaft'],
  ['Project fit', 'Design villas and visible architecture', 'Villas, buildings, offices, hotels, clinics'],
  ['Visual identity', 'Glass and panoramic presence', 'Premium cabin integrated in the building'],
  ['Customization', 'Structure, glass, lighting, cabin finishes', 'Cabin finishes, doors, lighting, controls'],
  ['Best choice', 'When the elevator is an architectural feature', 'When the project includes a masonry shaft'],
  ],
  fr: [
    ['Installation', 'Structure panoramique autoportante', 'Gaine béton'],
    ['Projet idéal', 'Villas design et architecture visible', 'Villas, immeubles, bureaux, hôtels, cliniques'],
    ['Identité visuelle', 'Présence vitrée et panoramique', 'Cabine premium intégrée au bâtiment'],
    ['Personnalisation', 'Structure, verre, éclairage, finitions cabine', 'Finitions cabine, portes, éclairage, commandes'],
    ['Meilleur choix', 'Quand l’ascenseur devient un élément architectural', 'Quand le projet prévoit une gaine maçonnée'],
  ],
};

const atlasCoreDownloads = [
  { label: 'Download Catalogue', note: 'Discover the Atlas Core range details', file: atlasCoreCataloguePdf },
];

const frAtlasCoreDownloads = [
  { label: 'Télécharger le Catalogue', note: 'Découvrez les détails de la gamme Atlas Core', file: atlasCoreCataloguePdf },
];

const atlasCoreFaqs = [
  ['What is the minimum shaft dimension?', 'Atlas Core can start from approximately 1.10 m depending on cabin configuration, load, doors, and site constraints.'],
  ['How long does installation take?', 'A complete Atlas Core project typically takes around 3 months, including technical validation, production, preparation, installation, and commissioning.'],
  ['Can Atlas Core be installed in an existing villa?', 'Yes, when a suitable concrete shaft can be created or adapted after a technical survey.'],
  ['Is Atlas Core adapted to apartment buildings?', 'Yes. It is designed for villas, residential buildings, and professional properties that use a concrete shaft.'],
  ['What is the electrical consumption?', 'Consumption remains low thanks to efficient components and project-specific drive selection.'],
  ['Can the cabin be personalized?', 'Yes. Cabin walls, flooring, doors, lighting, handrails, and control panels can be personalized.'],
  ['What capacity is available?', 'Capacity depends on the shaft and project requirements, from compact residential layouts to larger building configurations.'],
  ['What warranty is included?', 'Warranty terms are confirmed in the project offer and can be supported by an Atlas maintenance contract.'],
  ['Is maintenance available?', 'Yes. Atlas Ascenseurs provides preventive maintenance, inspections, and emergency support.'],
  ['Which safety standards apply?', 'Atlas Core is specified around applicable safety standards and certified components for the Moroccan market.'],
];

const frAtlasCoreFaqs = [
  ['Quelle est la dimension minimale ?', 'Atlas Core peut démarrer autour de 1,10 m selon la configuration cabine, la charge, les portes et les contraintes du site.'],
  ['Quelle est la durée du projet ?', 'Un projet Atlas Core complet prend généralement environ 3 mois, incluant validation technique, production, préparation, installation et mise en service.'],
  ['Peut-on l’installer dans une villa existante ?', 'Oui, si une gaine béton adaptée peut être créée ou ajustée après visite technique.'],
  ['Est-il adapté aux immeubles ?', 'Oui. Atlas Core est conçu pour les villas, immeubles résidentiels et bâtiments professionnels avec gaine béton.'],
  ['Quelle est la consommation électrique ?', 'La consommation reste faible grâce à des composants efficaces et une motorisation adaptée au projet.'],
  ['La cabine est-elle personnalisable ?', 'Oui. Parois, sol, portes, éclairage, main courante et panneau de commande peuvent être personnalisés.'],
  ['Quelle capacité est disponible ?', 'La capacité dépend de la gaine et des besoins du projet, des configurations résidentielles compactes aux formats pour immeubles.'],
  ['Quelle garantie est prévue ?', 'Les conditions de garantie sont confirmées dans l’offre projet et peuvent être accompagnées d’un contrat de maintenance Atlas.'],
  ['L’entretien est-il disponible ?', 'Oui. Atlas Ascenseurs assure maintenance préventive, inspections et support d’urgence.'],
  ['Quelles normes de sécurité ?', 'Atlas Core est spécifié selon les normes de sécurité applicables et des composants certifiés pour le marché marocain.'],
];

const atlasCoreTestimonials = [
  { source: 'WhatsApp', name: 'Client villa - Rabat', text: 'Installation propre, cabine silencieuse et finitions exactement comme validé avec l’architecte.' },
  { source: 'Facebook', name: 'Promoteur - Casablanca', text: 'Atlas Core a bien répondu au besoin de notre immeuble résidentiel. Suivi sérieux du début à la mise en service.' },
  { source: 'WhatsApp', name: 'Clinique - Marrakech', text: 'Solution fiable et confortable pour les patients. Les équipes ont été réactives pendant tout le projet.' },
];

const atlasPanoramaReasons = [
  { en: 'Panoramic glass design', fr: 'Design panoramique en verre', icon: '🔍' },
  { en: 'Silent operation', fr: 'Fonctionnement silencieux', icon: '🔇' },
  { en: 'Cabin personalization', fr: 'Personnalisation de la cabine', icon: '🛠️' },
  { en: 'Low energy consumption', fr: 'Faible consommation d’énergie', icon: '⚡' },
  { en: 'Compact footprint', fr: 'Installation compacte', icon: '📦' },
  { en: 'Certified safety compliance', fr: 'Sécurité conforme aux normes', icon: '🛡️' },
  { en: 'Designed for Moroccan villas', fr: 'Conçu pour les villas marocaines', icon: '🏡' },
];

const atlasPanoramaDownloads = [
  { label: 'Discover Panorama Brochure', note: 'Standard Panorama Edition', file: atlasPanoramaPdf },
  { label: 'Discover Hydraulic Brochure', note: 'Hydraulic System Details', file: atlasPanoramaHydraulicPdf },
];

const frAtlasPanoramaDownloads = [
  { label: 'Découvrir la Brochure Panorama', note: 'Édition Panorama Standard', file: atlasPanoramaPdf },
  { label: 'Découvrir la Brochure Hydraulique', note: 'Détails du Système Hydraulique', file: atlasPanoramaHydraulicPdf },
];

const atlasPanoramaFaqs = [
  ['What is the minimum shaft dimension required?', 'A minimum shaft dimension of 1.1 m is required for the installation of an Atlas Panorama elevator.'],
  ['How long does the installation process take?', 'The complete project (custom manufacturing and installation) takes approximately 3 months to ensure a precise and compliant setup.'],
  ['Can it be installed in an existing villa?', 'Yes, installing an Atlas Panorama glass lift in an existing villa is entirely possible after a positive technical site survey.'],
  ['Is a machine room required?', 'No, Atlas Panorama elevators are designed Machine-Room-Less (MRL), maximizing living space and simplifying architectural integration.'],
  ['What is the electrical consumption?', 'Thanks to state-of-the-art motorization, energy consumption is very low, comparable to a standard household appliance.'],
  ['Can the cabin be personalized?', 'Yes, you can fully customize the cabin: glass finishes, structure colors, LED lighting, flooring, and control panel styles.'],
  ['How does it work during a power outage?', 'The elevator features an automatic emergency battery rescue system (UPS) that safely brings the cabin to the nearest floor and opens the doors.'],
  ['What warranty is included?', 'Our equipment comes with a full manufacturer warranty, which can be extended through our tailor-made maintenance contracts.'],
  ['What maintenance is necessary?', 'Regular preventive maintenance is required to ensure long-term performance and safety. We offer scheduled visits and rapid support.'],
  ['Are the elevators compliant with safety standards?', 'Absolutely. All Atlas Panorama elevators are fully certified and compliant with the latest safety and engineering standards.']
];

const frAtlasPanoramaFaqs = [
  ['Dimension minimale requise ?', 'Une dimension de gaine minimale de 1,1 m (largeur ou profondeur) est requise pour l\'installation d\'un ascenseur Atlas Panorama.'],
  ['Quelle est la durée d\'installation ?', 'Le processus global (fabrication sur mesure et installation) prend environ 3 mois pour garantir une pose soignée et conforme.'],
  ['Peut-on installer dans une villa existante ?', 'Oui, l\'intégration d\'un ascenseur panoramique Atlas Panorama est tout à fait possible dans une villa existante, sous réserve d\'une étude technique préalable.'],
  ['Faut-il un local machine ?', 'Non, les ascenseurs Atlas Panorama sont conçus sans local machine (MRL), ce qui permet de maximiser l\'espace de vie et de simplifier l\'intégration architecturale.'],
  ['Consommation électrique ?', 'Grâce à une motorisation de dernière génération, la consommation électrique est très faible, similaire à celle d\'un appareil électroménager standard.'],
  ['Peut-on personnaliser la cabine ?', 'Oui, vous disposez d\'un large choix de personnalisation : types de parois vitrées, coloris de la structure, éclairages LED, sols et finitions des commandes.'],
  ['Fonctionnement en cas de coupure de courant ?', 'L\'ascenseur est équipé d\'un système de secours automatique (UPS) qui ramène la cabine à l\'étage le plus proche et ouvre les portes en toute sécurité.'],
  ['Quelle est la garantie ?', 'Nos équipements bénéficient d\'une garantie constructeur complète, extensible grâce à nos contrats d\'entretien personnalisés.'],
  ['Quel entretien est nécessaire ?', 'Un entretien périodique est indispensable pour assurer la longévité et la sécurité. Nos contrats incluent des visites préventives régulières et un support réactif.'],
  ['Les ascenseurs sont-ils conformes aux normes de sécurité ?', 'Absolument. Tous nos ascenseurs respectent rigoureusement les normes de sécurité en vigueur et sont dotés de composants certifiés.']
];

const atlasPanoramaTestimonials = [
  { source: 'WhatsApp', name: 'Client villa - Marrakech', text: 'Le rendu avec la gaine vitrée est incroyable. L\'ascenseur est silencieux et s\'intègre parfaitement dans notre patio.' },
  { source: 'Facebook', name: 'Architecte - Casablanca', text: 'Nous avons intégré la gamme Atlas Panorama sur plusieurs projets de villas contemporaines. Flexibilité technique et esthétique haut de gamme au rendez-vous.' },
  { source: 'WhatsApp', name: 'Propriétaire - Rabat', text: 'Très satisfait de l\'installation de notre ascenseur en verre. L\'équipe d\'Atlas a été très professionnelle du début à la fin.' }
];

function AtlasPanoramaSections({ language }) {
  const reasonsTitle = language === 'fr' ? 'Pourquoi choisir Atlas Panorama ?' : 'Why choose Atlas Panorama?';
  const downloads = language === 'fr' ? frAtlasPanoramaDownloads : atlasPanoramaDownloads;
  const comparisonRows = atlasCoreComparison[language] ?? atlasCoreComparison.en;

  return (
    <>
      <section className="atlas-core-block">
        <div className="gallery-head">
          <div>
            <div className="eyebrow">{language === 'fr' ? 'Avantages' : 'Benefits'}</div>
            <h2 className="section-title tight-title">{reasonsTitle}</h2>
          </div>
        </div>
        <div className="atlas-core-card-grid">
          {atlasPanoramaReasons.map((item) => (
            <article className="atlas-core-benefit-card panorama-benefit-card" key={item.en}>
              <span className="benefit-card-icon">{item.icon}</span>
              <span>{item[language] ?? item.en}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="atlas-core-block">
        <div className="eyebrow">{language === 'fr' ? 'Comparatif' : 'Comparison'}</div>
        <h2 className="section-title tight-title">Atlas Panorama vs Atlas Core</h2>
        <div className="atlas-core-table-wrap">
          <table className="atlas-core-table">
            <thead>
              <tr>
                <th>{language === 'fr' ? 'Critère' : 'Criteria'}</th>
                <th>Atlas Panorama</th>
                <th>Atlas Core</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([criterion, panorama, core]) => (
                <tr key={criterion}>
                  <td>{criterion}</td>
                  <td>{panorama}</td>
                  <td>{core}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </>
  );
}

function AtlasCoreSections({ language }) {
  const reasonsTitle = language === 'fr' ? 'Pourquoi choisir Atlas Core ?' : 'Why choose Atlas Core?';
  const downloads = language === 'fr' ? frAtlasCoreDownloads : atlasCoreDownloads;
  const comparisonRows = atlasCoreComparison[language] ?? atlasCoreComparison.en;

  return (
    <>
      <section className="atlas-core-block">
        <div className="gallery-head">
          <div>
            <div className="eyebrow">{language === 'fr' ? 'Applications' : 'Applications'}</div>
            <h2 className="section-title tight-title">{language === 'fr' ? 'Conçu pour plusieurs types de bâtiments' : 'Built for multiple building types'}</h2>
          </div>
        </div>
        <div className="atlas-core-icon-grid">
          {atlasCoreApplications.map((item) => (
            <article className="atlas-core-icon-card" key={item.en}>
              <span>{item.icon}</span>
              <h3>{item[language] ?? item.en}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="atlas-core-block">
        <div className="eyebrow">{language === 'fr' ? 'Avantages' : 'Benefits'}</div>
        <h2 className="section-title tight-title">{reasonsTitle}</h2>
        <div className="atlas-core-card-grid">
          {atlasCoreReasons.map((item) => <article className="atlas-core-benefit-card" key={item.en}>{item[language] ?? item.en}</article>)}
        </div>
      </section>

      <section className="atlas-core-block">
        <div className="eyebrow">{language === 'fr' ? 'Comparatif' : 'Comparison'}</div>
        <h2 className="section-title tight-title">Atlas Panorama vs Atlas Core</h2>
        <div className="atlas-core-table-wrap">
          <table className="atlas-core-table">
            <thead>
              <tr>
                <th>{language === 'fr' ? 'Critère' : 'Criteria'}</th>
                <th>Atlas Panorama</th>
                <th>Atlas Core</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([criterion, panorama, core]) => (
                <tr key={criterion}>
                  <td>{criterion}</td>
                  <td>{panorama}</td>
                  <td>{core}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </>
  );
}

export default function ElevatorDetail() {
  const { language } = useUI();
  const { pathname } = useLocation();
  const [openFaq, setOpenFaq] = useState(0);
  const page = elevatorPages[pathname] ?? elevatorPages['/villa-glass-elevators-morocco'];

  const item = useMemo(() => {
    const pool = page.source === 'res' ? residentialElevators : commercialElevators;
    return pool.find(([, title]) => title === page.key) ?? pool[0];
  }, [page.key, page.source]);

  const [, itemTitle, itemText, itemImage] = item;
  const gallery = elevatorDetailGalleries[itemTitle] ?? [itemImage];
  const notes = language === 'fr' ? frProductNotes : productNotes;
  const note = notes[itemTitle] ?? notes['Atlas Core'];
  const showGallery = !noGalleryPages.has(itemTitle);
  const phoneTallGalleryPages = new Set(['Atlas Panorama', 'Atlas Core', 'Circular Elevators', 'Exterior Elevators']);
  const usePhoneTallGallery = phoneTallGalleryPages.has(itemTitle);
  const showAtlasCoreSections = itemTitle === 'Atlas Core';
  const showAtlasPanoramaSections = itemTitle === 'Atlas Panorama';
  const pageTitle = page.title[language] ?? page.title.en;
  const pageAccent = page.accent[language] ?? page.accent.en;

  return (
    <>
      <PageHero current={language === 'fr' ? 'Nos Ascenseurs' : 'Our Elevators'} title={pageTitle} accent={pageAccent} separateAccent={showAtlasCoreSections || showAtlasPanoramaSections} />
      <section className="section">
        <div className="product-presentation">
          <div className="product-presentation-copy">
            <div className="eyebrow">{note.label}</div>
            <h2 className="section-title">{note.headline}</h2>
            <p>{note.body}</p>
            <ul className="product-feature-list">
              {note.points.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </div>
          <div
            className={`product-presentation-image ${itemTitle === 'COMO Commercial' ? 'product-presentation-image-clean' : ''} ${itemTitle === 'Atlas Core' ? 'product-presentation-image-como' : ''} ${itemTitle === 'Exterior Elevators' ? 'product-presentation-image-exterior' : ''}`}
          >
            <img src={itemImage} alt={itemTitle} />
          </div>
        </div>

        <div className="product-summary-band">
          <div>
            <span>{language === 'fr' ? 'Application' : 'Application'}</span>
            <strong>{page.source === 'res' ? (language === 'fr' ? 'Projets résidentiels' : 'Residential projects') : (language === 'fr' ? 'Projets commerciaux' : 'Commercial projects')}</strong>
          </div>
          <div>
            <span>{language === 'fr' ? 'Personnalisation' : 'Customization'}</span>
            <strong>{language === 'fr' ? 'Cabine, portes, gaine, éclairage' : 'Cabin, doors, shaft, lighting'}</strong>
          </div>
          <div>
            <span>{language === 'fr' ? 'Support' : 'Support'}</span>
            <strong>{language === 'fr' ? 'Installation et maintenance' : 'Installation and maintenance'}</strong>
          </div>
        </div>

        {showAtlasCoreSections && <AtlasCoreSections language={language} />}
        {showAtlasPanoramaSections && <AtlasPanoramaSections language={language} />}

        {showAtlasCoreSections && (
          <div className="como-cabin-section">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">{language === 'fr' ? 'Cabines Atlas Core' : 'Atlas Core Cabins'}</div>
                <h2 className="section-title tight-title">{language === 'fr' ? 'Choisir une cabine personnalisable' : 'Choose a customizable cabin'}</h2>
              </div>
            </div>
            <div className="como-cabin-grid">
              {comoCabins.map((cabin) => (
                <Link className="como-cabin-card" to={cabin.to} key={cabin.id}>
                  <img src={cabin.image} alt={cabin.title} loading="lazy" />
                  <div className="como-cabin-card-info">
                    <h3>
                      <span>{language === 'fr' ? 'Cabine' : 'Cabin'}</span>
                      <strong>{cabin.id}</strong>
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {showGallery && (
          <ProductGallery
            eyebrow={language === 'fr' ? 'Galerie Produit' : 'Product Gallery'}
            title={language === 'fr' ? 'Images de la Gamme' : `${itemTitle} Gallery`}
            images={gallery}
            className={usePhoneTallGallery ? 'product-gallery-phone-tall' : ''}
            getLabel={(index, image) => {
              if (itemTitle === 'Atlas Panorama') {
                return language === 'fr' ? `Ascenseur Panoramique Atlas Panorama ${index + 1}` : `Atlas Panorama Panoramic Elevator ${index + 1}`;
              }
              return `${language === 'fr' ? 'Image Produit' : itemTitle} ${String(index + 1).padStart(2, '0')}`;
            }}
            getAlt={(index, image) => {
              if (itemTitle === 'Atlas Panorama') {
                const altTags = {
                  fr: [
                    'Ascenseur panoramique en verre pour villa moderne à Rabat - Atlas Panorama',
                    'Ascenseur de villa en verre avec gaine vitrée à Marrakech - Atlas Panorama',
                    'Installation d’ascenseur panoramique privatif à Casablanca - Atlas Panorama',
                    'Ascenseur résidentiel de luxe avec structure en verre à Tanger - Atlas Panorama',
                    'Cabine d’ascenseur vitrée d’intérieur de maison au Maroc - Atlas Panorama'
                  ],
                  en: [
                    'Panoramic glass villa elevator in Rabat - Atlas Panorama',
                    'Glass home lift with glazed shaft in Marrakech - Atlas Panorama',
                    'Private panoramic residential elevator installation in Casablanca - Atlas Panorama',
                    'Luxury residential elevator with glass structure in Tangier - Atlas Panorama',
                    'Modern indoor panoramic lift cabin in Morocco - Atlas Panorama'
                  ]
                };
                return altTags[language]?.[index] ?? altTags.fr[index] ?? `Atlas Panorama ${index + 1}`;
              }
              return undefined;
            }}
          />
        )}

        {showAtlasCoreSections && (
          <section className="atlas-core-block">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">{language === 'fr' ? 'Téléchargements' : 'Downloads'}</div>
                <h2 className="section-title tight-title">{language === 'fr' ? 'Documents Atlas Core' : 'Atlas Core Documents'}</h2>
              </div>
            </div>
            <div className="centered-download-grid">
              {(language === 'fr' ? frAtlasCoreDownloads : atlasCoreDownloads).map((item) => (
                <a className="centered-download-box" href={item.file || "/contact"} download={item.file ? true : undefined} target={item.file ? "_blank" : undefined} rel={item.file ? "noreferrer" : undefined} key={item.label}>
                  <div className="download-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <div className="download-text">
                    <span>{item.label}</span>
                    <small>{item.note}</small>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {showAtlasPanoramaSections && (
          <section className="atlas-core-block">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">{language === 'fr' ? 'Téléchargements' : 'Downloads'}</div>
                <h2 className="section-title tight-title">{language === 'fr' ? 'Documents Atlas Panorama' : 'Atlas Panorama Documents'}</h2>
              </div>
            </div>
            <div className="centered-download-grid">
              {(language === 'fr' ? frAtlasPanoramaDownloads : atlasPanoramaDownloads).map((item) => (
                <a className="centered-download-box" href={item.file || "/contact"} download={item.file ? true : undefined} target={item.file ? "_blank" : undefined} rel={item.file ? "noreferrer" : undefined} key={item.label}>
                  <div className="download-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                  </div>
                  <div className="download-text">
                    <span>{item.label}</span>
                    <small>{item.note}</small>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {showAtlasCoreSections && (
          <section className="atlas-core-block">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">FAQ</div>
                <h2 className="section-title tight-title">
                  {language === 'fr' ? 'Questions fréquentes Atlas Core' : 'Atlas Core frequently asked questions'}
                </h2>
              </div>
            </div>
            <div className="faq-wrap atlas-core-faq">
              {(language === 'fr' ? frAtlasCoreFaqs : atlasCoreFaqs).map(([question, answer], index) => (
                <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}>
                  <button className="faq-q" type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    {question} <span className="faq-plus">+</span>
                  </button>
                  <div className="faq-a">{answer}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {showAtlasPanoramaSections && (
          <section className="atlas-core-block">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">FAQ</div>
                <h2 className="section-title tight-title">
                  {language === 'fr' ? 'Questions fréquentes Atlas Panorama' : 'Atlas Panorama frequently asked questions'}
                </h2>
              </div>
            </div>
            <div className="faq-wrap atlas-core-faq">
              {(language === 'fr' ? frAtlasPanoramaFaqs : atlasPanoramaFaqs).map(([question, answer], index) => (
                <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}>
                  <button className="faq-q" type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                    {question} <span className="faq-plus">+</span>
                  </button>
                  <div className="faq-a">{answer}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {showAtlasCoreSections && (
          <section className="atlas-core-block">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">{language === 'fr' ? 'Avis Clients' : 'Client Reviews'}</div>
                <h2 className="section-title tight-title">
                  {language === 'fr' ? 'Ce que disent nos clients' : 'What Our Clients Say'}
                </h2>
              </div>
            </div>
            <div className="atlas-core-testimonial-grid">
              {atlasCoreTestimonials.map((item) => (
                <article className={`atlas-core-testimonial ${item.source === 'WhatsApp' ? 'whatsapp' : 'facebook'}`} key={`${item.source}-${item.name}`}>
                  <span>{item.source}</span>
                  <p>{item.text}</p>
                  <strong>{item.name}</strong>
                </article>
              ))}
            </div>
          </section>
        )}

        {showAtlasPanoramaSections && (
          <section className="atlas-core-block">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">{language === 'fr' ? 'Avis Clients' : 'Client Reviews'}</div>
                <h2 className="section-title tight-title">
                  {language === 'fr' ? 'Ce que disent nos clients' : 'What Our Clients Say'}
                </h2>
              </div>
            </div>
            <div className="atlas-core-testimonial-grid">
              {atlasPanoramaTestimonials.map((item) => (
                <article className={`atlas-core-testimonial ${item.source === 'WhatsApp' ? 'whatsapp' : 'facebook'}`} key={`${item.source}-${item.name}`}>
                  <span>{item.source}</span>
                  <p>{item.text}</p>
                  <strong>{item.name}</strong>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </>
  );
}
