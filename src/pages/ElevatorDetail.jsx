import { useMemo, useState } from 'react';
import atlasCoreCompareImg from '../assets/images/photos-of-comparaisons/Atlas Core.png';
import atlasPanoramaCompareImg from '../assets/images/photos-of-comparaisons/Atlas Panorama.png';
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
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ), 
    en: 'Villas', 
    fr: 'Villas' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <line x1="9" y1="22" x2="9" y2="16" />
        <line x1="15" y1="22" x2="15" y2="16" />
        <line x1="9" y1="16" x2="15" y2="16" />
        <path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01" />
      </svg>
    ), 
    en: 'Residential buildings', 
    fr: 'Immeubles résidentiels' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ), 
    en: 'Offices', 
    fr: 'Bureaux' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 21H2M18 21V10a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v11M12 11h.01" />
        <path d="M10 14h4v7h-4z" />
        <path d="M9 5l3-3 3 3" />
      </svg>
    ), 
    en: 'Hotels', 
    fr: 'Hôtels' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 21H2M18 21V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v15" />
        <path d="M10 10h4M12 8v4" />
        <path d="M10 16h4v5h-4z" />
      </svg>
    ), 
    en: 'Clinics', 
    fr: 'Cliniques' 
  },
  { 
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 7v14M21 7v14M16 21v-4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v4" />
        <path d="M12 3L3 7h18l-9-4z" />
      </svg>
    ), 
    en: 'Commercial buildings', 
    fr: 'Bâtiments commerciaux' 
  },
];

const atlasCoreReasons = [
  { 
    titlePart1: { en: "Concrete shaft", fr: "Installation" },
    titlePart2: { en: "installation", fr: "en gaine béton" },
    desc: { en: "Designed for perfect and durable integration.", fr: "Conçu pour une intégration parfaite et durable." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Silent", fr: "Fonctionnement" },
    titlePart2: { en: "operation", fr: "silencieux" },
    desc: { en: "Advanced technology for absolute comfort.", fr: "Technologie avancée pour un confort absolu." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "High-end", fr: "Finitions" },
    titlePart2: { en: "finishes", fr: "haut de gamme" },
    desc: { en: "Noble materials and customizable design.", fr: "Matériaux nobles et design personnalisable." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M11 3 8 9l4 12 4-12-3-6" />
        <path d="M2 9h20" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Low energy", fr: "Faible consommation" },
    titlePart2: { en: "consumption", fr: "d'énergie" },
    desc: { en: "Energy saving and respect for the environment.", fr: "Économie d'énergie et respect de l'environnement." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Quality", fr: "Composants" },
    titlePart2: { en: "components", fr: "de qualité" },
    desc: { en: "Reliable equipment tested to European standards.", fr: "Équipements fiables et testés selon les normes européennes." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z" />
        <polyline points="9 11 11 13 15 9" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Compliant with", fr: "Conforme aux normes" },
    titlePart2: { en: "safety standards", fr: "de sécurité" },
    desc: { en: "Compliance with the strictest European standards.", fr: "Respect des normes européennes les plus strictes." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z" />
        <polyline points="9 11 11 13 15 9" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Ideal for villas", fr: "Idéal pour villas" },
    titlePart2: { en: "& buildings", fr: "& immeubles" },
    desc: { en: "Adapted to all types of residential and professional buildings.", fr: "Adapté à tous types de bâtiments résidentiels et professionnels." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M19 21V9a2 2 0 0 0-2-2h-3a2 2 0 0 0-2 2v12" />
        <path d="M9 21V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16" />
        <path d="M14 11h2" />
        <path d="M14 15h2" />
        <path d="M4 7h2" />
        <path d="M4 11h2" />
        <path d="M4 15h2" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Total", fr: "Personnalisation" },
    titlePart2: { en: "personalization", fr: "totale" },
    desc: { en: "Custom cabins, doors, lighting, and finishes.", fr: "Cabines, portes, éclairages et finitions sur mesure." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="12" x2="23" y2="12" />
      </svg>
    ) 
  },
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
  { 
    titlePart1: { en: "Panoramic glass", fr: "Design" },
    titlePart2: { en: "design", fr: "panoramique en verre" },
    desc: { en: "Stunning glass structures that enhance architecture.", fr: "Structures en verre offrant une vue imprenable." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Silent", fr: "Fonctionnement" },
    titlePart2: { en: "operation", fr: "silencieux" },
    desc: { en: "Advanced technology for absolute comfort.", fr: "Technologie avancée pour un confort absolu." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" />
        <line x1="17" y1="9" x2="23" y2="15" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Cabin", fr: "Personnalisation" },
    titlePart2: { en: "personalization", fr: "de la cabine" },
    desc: { en: "Tailor-made finishes and luxury materials.", fr: "Finitions sur mesure et matériaux de luxe." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Low energy", fr: "Faible consommation" },
    titlePart2: { en: "consumption", fr: "d’énergie" },
    desc: { en: "Energy saving and respect for the environment.", fr: "Économie d’énergie et respect de l’environnement." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Compact", fr: "Installation" },
    titlePart2: { en: "footprint", fr: "compacte" },
    desc: { en: "Optimized space for a minimal footprint.", fr: "Optimisation de l’espace au sol." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Certified safety", fr: "Sécurité conforme" },
    titlePart2: { en: "compliance", fr: "aux normes" },
    desc: { en: "Compliance with the strictest European standards.", fr: "Respect des normes européennes les plus strictes." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7s0 6 8 10z" />
        <polyline points="9 11 11 13 15 9" />
      </svg>
    ) 
  },
  { 
    titlePart1: { en: "Designed for", fr: "Conçu pour" },
    titlePart2: { en: "Moroccan villas", fr: "les villas marocaines" },
    desc: { en: "Adapted to the architectural standards of Moroccan villas.", fr: "Adapté aux exigences des demeures marocaines." },
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ) 
  },
];

const atlasPanoramaDownloads = [
  { label: "Atlas Panorama Electric Brochure", note: "Electric Traction Edition", file: atlasPanoramaPdf },
  { label: "Atlas Panorama Hydraulic Brochure", note: "Hydraulic System Edition", file: atlasPanoramaHydraulicPdf },
];

const frAtlasPanoramaDownloads = [
  { label: "Brochure Électrique Atlas Panorama", note: "Édition Traction Électrique", file: atlasPanoramaPdf },
  { label: "Brochure Hydraulique Atlas Panorama", note: "Édition Système Hydraulique", file: atlasPanoramaHydraulicPdf },
];

const atlasPanoramaFaqs = [
  ["What is the minimum shaft dimension required?", "A minimum shaft dimension of 1.1 m is required for the installation of an Atlas Panorama elevator."],
  ["How long does the installation process take?", "The complete project (custom manufacturing and installation) takes approximately 3 months to ensure a precise and compliant setup."],
  ["Can it be installed in an existing villa?", "Yes, installing an Atlas Panorama glass lift in an existing villa is entirely possible after a positive technical site survey."],
  ["Is a machine room required?", "No, Atlas Panorama elevators are designed Machine-Room-Less (MRL), maximizing living space and simplifying architectural integration."],
  ["What is the electrical consumption?", "Thanks to state-of-the-art motorization, energy consumption is very low, comparable to a standard household appliance."],
  ["Can the cabin be personalized?", "Yes, you can fully customize the cabin: glass finishes, structure colors, LED lighting, flooring, and control panel styles."],
  ["How does it work during a power outage?", "The elevator features an automatic emergency battery rescue system (UPS) that safely brings the cabin to the nearest floor and opens the doors."],
  ["What warranty is included?", "Our equipment comes with a full manufacturer warranty, which can be extended through our tailor-made maintenance contracts."],
  ["What maintenance is necessary?", "Regular preventive maintenance is required to ensure long-term performance and safety. We offer scheduled visits and rapid support."],
  ["Are the elevators compliant with safety standards?", "Absolutely. All Atlas Panorama elevators are fully certified and compliant with the latest safety and engineering standards."]
];

const frAtlasPanoramaFaqs = [
  ["Dimension minimale requise ?", "Une dimension de gaine minimale de 1,1 m (largeur ou profondeur) est requise pour l'installation d'un ascenseur Atlas Panorama."],
  ["Quelle est la durée d'installation ?", "Le processus global (fabrication sur mesure et installation) prend environ 3 mois pour garantir une pose soignée et conforme."],
  ["Peut-on installer dans une villa existante ?", "Oui, l'intégration d'un ascenseur panoramique Atlas Panorama est tout à fait possible dans une villa existante, sous réserve d'une étude technique préalable."],
  ["Faut-il un local machine ?", "Non, les ascenseurs Atlas Panorama sont conçus sans local machine (MRL), ce qui permet de maximiser l'espace de vie et de simplifier l'intégration architecturale."],
  ["Consommation électrique ?", "Grâce à une motorisation de dernière génération, la consommation électrique est très faible, similaire à celle d'un appareil électroménager standard."],
  ["Peut-on personnaliser la cabine ?", "Oui, vous disposez d'un large choix de personnalisation : types de parois vitrées, coloris de la structure, éclairages LED, sols et finitions des commandes."],
  ["Fonctionnement en cas de coupure de courant ?", "L'ascenseur est équipé d'un système de secours automatique (UPS) qui ramène la cabine à l'étage le plus proche et ouvre les portes en toute sécurité."],
  ["Quelle est la garantie ?", "Nos équipements bénéficient d'une garantie constructeur complète, extensible grâce à nos contrats d'entretien personnalisés."],
  ["Quel entretien est nécessaire ?", "Un entretien périodique est indispensable pour assurer la longévité et la sécurité. Nos contrats incluent des visites préventives régulières et un support réactif."],
  ["Les ascenseurs sont-ils conformes aux normes de sécurité ?", "Absolument. Tous nos ascenseurs respectent rigoureusement les normes de sécurité en vigueur et sont dotés de composants certifiés."]
];

const atlasPanoramaTestimonials = [
  { source: "WhatsApp", name: "Client villa - Marrakech", text: "Le rendu avec la gaine vitrée est incroyable. L'ascenseur est silencieux et s'intègre parfaitement dans notre patio." },
  { source: "Facebook", name: "Architecte - Casablanca", text: "Nous avons intégré la gamme Atlas Panorama sur plusieurs projets de villas contemporaines. Flexibilité technique et esthétique haut de gamme au rendez-vous." },
  { source: "WhatsApp", name: "Propriétaire - Rabat", text: "Très satisfait de l'installation de notre ascenseur en verre. L'équipe d'Atlas a été très professionnelle du début à la fin." }
];

function PanoramaVsCoreComparison({ language }) {
  const comparisonRows = atlasCoreComparison[language] ?? atlasCoreComparison.en;
  
  return (
    <section className="comparison-split-section">
      <div className="comparison-container">
        <div className="comparison-info-side">
          <div className="eyebrow">{language === 'fr' ? 'Comparatif' : 'Comparison'}</div>
          <h2>PANORAMA VS CORE</h2>
          <p>{language === 'fr' ? 'Quel modèle est fait pour vous ?' : 'Which model is right for you?'}</p>

        </div>
        
        <div className="comparison-table-side">
          <div className="comparison-card">
            {/* Header */}
            <div className="comparison-card-header">
              <div className="comparison-col-criterion-header"></div>
              
              <div className="comparison-col-product">
                <img src={atlasPanoramaCompareImg} alt="Atlas Panorama" className="comparison-product-img" />
                <div className="comparison-product-title-wrap">
                  <h3>ATLAS PANORAMA</h3>
                  <span>{language === 'fr' ? 'Ascenseur panoramique (gaine verre)' : 'Panoramic glass shaft elevator'}</span>
                </div>
              </div>
              
              <div className="comparison-col-product">
                <img src={atlasCoreCompareImg} alt="Atlas Core" className="comparison-product-img" />
                <div className="comparison-product-title-wrap">
                  <h3>ATLAS CORE</h3>
                  <span>{language === 'fr' ? 'Ascenseur en gaine béton' : 'Concrete shaft elevator'}</span>
                </div>
              </div>
            </div>
            
            {/* Rows */}
            <div className="comparison-card-body">
              {comparisonRows.map(([criterion, panorama, core], index) => {
                let criterionIcon;
                if (index === 0) { // Installation
                  criterionIcon = (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  );
                } else if (index === 1) { // Project fit / Projet idéal
                  criterionIcon = (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  );
                } else if (index === 2) { // Visual identity / Identité visuelle
                  criterionIcon = (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  );
                } else if (index === 3) { // Customization / Personnalisation
                  criterionIcon = (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
                      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
                      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="12" x2="23" y2="12" />
                    </svg>
                  );
                } else { // Best choice / Meilleur choix
                  criterionIcon = (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  );
                }
                
                return (
                  <div className="comparison-card-row" key={criterion}>
                    <div className="comparison-col-criterion">
                      <span className="comparison-criterion-icon">{criterionIcon}</span>
                      <span>{criterion}</span>
                    </div>
                    <div className="comparison-col-val">{panorama}</div>
                    <div className="comparison-col-val">{core}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AtlasCoreSections({ language }) {
  return (
    <section className="atlas-core-block text-center-luxury">
      <div className="gallery-head">
        <div>
          <div className="eyebrow">{language === "fr" ? "Applications" : "Applications"}</div>
          <h2 className="section-title tight-title">{language === "fr" ? "Conçu pour plusieurs types de bâtiments" : "Built for multiple building types"}</h2>
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
  );
}

export default function ElevatorDetail() {
  const { language } = useUI();
  const { pathname } = useLocation();
  const [openFaq, setOpenFaq] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const page = elevatorPages[pathname] ?? elevatorPages["/villa-glass-elevators-morocco"];
  
  const pageKey = page?.key ?? "Atlas Core";
  const notes = language === "fr" ? frProductNotes : productNotes;
  const note = notes[pageKey] ?? notes["Atlas Core"];
  const item = residentialElevators.find((e) => e[1] === pageKey) ?? commercialElevators.find((e) => e[1] === pageKey) ?? residentialElevators[0];

  const [, itemTitle, itemText, itemImage] = item;
  const gallery = elevatorDetailGalleries[itemTitle] ?? [itemImage];
  const showGallery = !noGalleryPages.has(itemTitle);
  const phoneTallGalleryPages = new Set(["Atlas Panorama", "Atlas Core", "Circular Elevators", "Exterior Elevators"]);
  const usePhoneTallGallery = phoneTallGalleryPages.has(itemTitle);
  const showAtlasCoreSections = itemTitle === "Atlas Core";
  const showAtlasPanoramaSections = itemTitle === "Atlas Panorama";
  const useLuxuryArchitecture = ["Atlas Core", "Atlas Panorama", "Circular Elevators", "Exterior Elevators"].includes(itemTitle);
  const showAtlasExtendedSections = showAtlasCoreSections || showAtlasPanoramaSections;
  const whyChooseItems = showAtlasCoreSections
    ? atlasCoreReasons
    : showAtlasPanoramaSections
      ? atlasPanoramaReasons
      : note.points.map((point, index) => ({
          titlePart1: { en: point, fr: point },
          titlePart2: { en: "", fr: "" },
          desc: { en: note.body.split(". " )[index] || note.body.split(". " )[0], fr: note.body.split(". " )[index] || note.body.split(". " )[0] },
          icon: atlasPanoramaReasons[index % atlasPanoramaReasons.length].icon
        }));
  const brochureHref = itemTitle === "Atlas Panorama" ? atlasPanoramaPdf : itemTitle === "Atlas Core" ? atlasCoreCataloguePdf : "/contact";
  const brochureIsPdf = itemTitle === "Atlas Panorama" || itemTitle === "Atlas Core";
  const pageTitle = page.title[language] ?? page.title.en;
  const pageAccent = page.accent[language] ?? page.accent.en;

  return (
    <div className={useLuxuryArchitecture ? "elevator-luxury-layout" : ""}>
      {useLuxuryArchitecture ? (
        <>
          <section className="elevator-luxury-hero">
            <div 
              className="elevator-luxury-hero-bg" 
              style={{ backgroundImage: `url(${itemImage})` }}
            />
            <div className="elevator-luxury-hero-overlay"></div>
            <div className="elevator-luxury-hero-content">
              <span className="elevator-luxury-hero-eyebrow">{note.label}</span>
              <h1>
                {pageTitle.replace(pageAccent, "").trim()}
                <em>{pageAccent}</em>
              </h1>
              <p>{note.body}</p>
              <div className="elevator-luxury-hero-actions">
                <Link to="/contact" className="btn-gold">
                  <span>{language === "fr" ? "Demander un devis" : "Request a quote"}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "10px", transition: "transform 0.3s ease" }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </Link>
                <a href={brochureHref} className="btn-outline-icon" target={brochureIsPdf ? "_blank" : undefined} rel={brochureIsPdf ? "noreferrer" : undefined}>
                  <span>{language === "fr" ? "Télécharger la brochure" : "Download Brochure"}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "10px" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                </a>
              </div>
            </div>
          </section>

          <section className="elevator-why-choose-bar">
            <div className="why-choose-header">
              <div className="eyebrow">{language === "fr" ? "Avantages" : "Benefits"}</div>
              <h2>
                {language === "fr" ? `Pourquoi choisir ${itemTitle} ?` : `Why choose ${itemTitle}?`}
              </h2>
            </div>
            <div className="elevator-why-choose-grid">
              {whyChooseItems.map((item, index) => (
                <article className="why-choose-item" key={index}>
                  <div className="why-choose-item-icon">
                    {item.icon}
                  </div>
                  <div className="why-choose-item-text">
                    <h4>
                      <span>{item.titlePart1[language] ?? item.titlePart1.en}</span>
                      {(item.titlePart2[language] ?? item.titlePart2.en) && <strong>{item.titlePart2[language] ?? item.titlePart2.en}</strong>}
                    </h4>
                    {item.desc && (
                      <p>{item.desc[language] ?? item.desc.en}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          <PageHero current={language === "fr" ? "Nos Ascenseurs" : "Our Elevators"} title={pageTitle} accent={pageAccent} separateAccent={false} />
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
                className={`product-presentation-image ${itemTitle === "COMO Commercial" ? "product-presentation-image-clean" : ""} ${itemTitle === "Atlas Core" ? "product-presentation-image-como" : ""} ${itemTitle === "Exterior Elevators" ? "product-presentation-image-exterior" : ""}`}
              >
                <img src={itemImage} alt={itemTitle} />
              </div>
            </div>

            <div className="product-summary-band">
              <div>
                <span>{language === "fr" ? "Application" : "Application"}</span>
                <strong>{page.source === "res" ? (language === "fr" ? "Projets résidentiels" : "Residential projects") : (language === "fr" ? "Projets commerciaux" : "Commercial projects")}</strong>
              </div>
              <div>
                <span>{language === "fr" ? "Personnalisation" : "Customization"}</span>
                <strong>{language === "fr" ? "Cabine, portes, gaine, éclairage" : "Cabin, doors, shaft, lighting"}</strong>
              </div>
              <div>
                <span>{language === "fr" ? "Support" : "Support"}</span>
                <strong>{language === "fr" ? "Installation et maintenance" : "Installation and maintenance"}</strong>
              </div>
            </div>
          </section>
        </>
      )}

      <section className="section">
        {showAtlasCoreSections && <AtlasCoreSections language={language} />}

        {showAtlasCoreSections && (
          <div className="como-cabin-section text-center-luxury">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">{language === "fr" ? "Cabines Atlas Core" : "Atlas Core Cabins"}</div>
                <h2 className="section-title tight-title">{language === "fr" ? "Choisir une cabine personnalisable" : "Choose a customizable cabin"}</h2>
              </div>
            </div>
            <div className="como-cabin-grid">
              {comoCabins.map((cabin) => (
                <Link className="como-cabin-card" to={cabin.to} key={cabin.id}>
                  <img src={cabin.image} alt={cabin.title} loading="lazy" />
                  <div className="como-cabin-card-info">
                    <h3>
                      <span>{language === "fr" ? "Cabine" : "Cabin"}</span>
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
            eyebrow={language === "fr" ? "Galerie Produit" : "Product Gallery"}
            title={language === "fr" ? "Images de la Gamme" : `${itemTitle} Gallery`}
            images={gallery}
            className={`${usePhoneTallGallery ? "product-gallery-phone-tall" : ""} ${itemTitle === "Atlas Panorama" ? "text-center-luxury" : ""}`.trim()}
            showAll={itemTitle === "Atlas Panorama"}
            getLabel={(index, image) => {
              if (itemTitle === "Atlas Panorama") {
                return language === "fr" ? `Ascenseur Panoramique Atlas Panorama ${index + 1}` : `Atlas Panorama Panoramic Elevator ${index + 1}`;
              }
              return `${language === "fr" ? "Image Produit" : itemTitle} ${String(index + 1).padStart(2, "0")}`;
            }}
            getAlt={(index, image) => {
              if (itemTitle === "Atlas Panorama") {
                const altTags = {
                  fr: [
                    "Ascenseur panoramique en verre pour villa moderne à Rabat - Atlas Panorama",
                    "Ascenseur de villa en verre avec gaine vitrée à Marrakech - Atlas Panorama",
                    "Installation d’ascenseur panoramique privatif à Casablanca - Atlas Panorama",
                    "Ascenseur résidentiel de luxe avec structure en verre à Tanger - Atlas Panorama",
                    "Cabine d’ascenseur vitrée d’intérieur de maison au Maroc - Atlas Panorama"
                  ],
                  en: [
                    "Panoramic glass villa elevator in Rabat - Atlas Panorama",
                    "Glass home lift with glazed shaft in Marrakech - Atlas Panorama",
                    "Private panoramic residential elevator installation in Casablanca - Atlas Panorama",
                    "Luxury residential elevator with glass structure in Tangier - Atlas Panorama",
                    "Modern indoor panoramic lift cabin in Morocco - Atlas Panorama"
                  ]
                };
                return altTags[language]?.[index] ?? altTags.fr[index] ?? `Atlas Panorama ${index + 1}`;
              }
              return undefined;
            }}
          />
        )}

        {showAtlasExtendedSections && (
          <PanoramaVsCoreComparison language={language} />
        )}

        {showAtlasExtendedSections && (
          <section className="atlas-core-block" id="documents">
            <div className="split-docs-faq">
              <div className="split-col">
                <h3>{language === "fr" ? "Téléchargements" : "Downloads"}</h3>
                <div>
                  {(itemTitle === "Atlas Core" ? (language === "fr" ? frAtlasCoreDownloads : atlasCoreDownloads) : (language === "fr" ? frAtlasPanoramaDownloads : atlasPanoramaDownloads)).map((item) => (
                    <a className="compact-download-box" href={item.file || "/contact"} download={item.file ? true : undefined} target={item.file ? "_blank" : undefined} rel={item.file ? "noreferrer" : undefined} key={item.label}>
                      <div className="compact-download-info">
                        <div className="compact-download-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><polyline points="9 15 12 18 15 15"></polyline></svg>
                        </div>
                        <div className="compact-download-text">
                          <span>{item.label}</span>
                          <small>{item.note}</small>
                        </div>
                      </div>
                      <div className="compact-download-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div className="split-col">
                <h3>{language === "fr" ? "Questions fréquentes" : "Frequently Asked Questions"}</h3>
                <div className="faq-wrap atlas-core-faq">
                  {((itemTitle === "Atlas Core" ? (language === "fr" ? frAtlasCoreFaqs : atlasCoreFaqs) : (language === "fr" ? frAtlasPanoramaFaqs : atlasPanoramaFaqs)).slice(0, showAllFaqs ? undefined : 3)).map(([question, answer], index) => (
                    <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}>
                      <button className="faq-q" type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                        {question} <span className="faq-plus">+</span>
                      </button>
                      <div className="faq-a">{answer}</div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  className="faq-view-all-btn"
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                >
                  {showAllFaqs 
                    ? (language === "fr" ? "Masquer les questions" : "Hide questions") 
                    : (language === "fr" ? "Voir toutes les questions" : "View all questions")}
                  <svg 
                    width="14" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ transform: showAllFaqs ? "rotate(180deg)" : "none", transition: "transform 0.2s", marginLeft: "6px" }}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </section>
        )}

        {showAtlasExtendedSections && (
          <section className="elevator-testimonials-block text-center-luxury">
            <div className="gallery-head" style={{ maxWidth: 'var(--max-width)', margin: '0 auto 40px', padding: '0 5%' }}>
              <div>
                <div className="eyebrow">{language === "fr" ? "Ils nous font confiance" : "They trust us"}</div>
                <h2 className="section-title tight-title">
                  {language === "fr" ? "Ce que disent nos clients" : "What Our Clients Say"}
                </h2>
              </div>
            </div>
            <div className="chat-testimonials-grid" style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 5%' }}>
              {(itemTitle === "Atlas Core" ? atlasCoreTestimonials : atlasPanoramaTestimonials).map((item) => (
                <article className="chat-bubble-card" key={`${item.source}-${item.name}`}>
                  <div className="chat-header">
                    <div className="chat-avatar">{item.name.charAt(0)}</div>
                    <div className="chat-user">
                      <h4>{item.name}</h4>
                      <small>{item.source}</small>
                    </div>
                  </div>
                  <div className="chat-message">
                    {item.text}
                    <div className="chat-meta">
                      <span>✓✓</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {showAtlasExtendedSections && (
          <section className="elevator-bottom-cta">
            <h2>{language === "fr" ? "Prêt à donner une nouvelle dimension à votre villa ?" : "Ready to give a new dimension to your villa?"}</h2>
            <p>{language === "fr" ? "Contactez nos experts dès aujourd'hui." : "Contact our experts today."}</p>
            <div className="cta-actions">
              <Link to="/contact" className="btn-gold">
                {language === "fr" ? "Demander un devis" : "Request a quote"}
              </Link>
              <a href="https://wa.me/212600000000" className="btn-whatsapp-outline" target="_blank" rel="noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
