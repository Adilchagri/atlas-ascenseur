import { useMemo, useState } from 'react';
import atlasCoreCompareImg from '../assets/images/photos-of-comparaisons/Atlas Core.png';
import atlasPanoramaCompareImg from '../assets/images/photos-of-comparaisons/Atlas Panorama.png';
import circularCompareImg from '../assets/images/photos-of-comparaisons/ChatGPT Image Jul 10, 2026, 02_51_00 PM.png';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import { atlasCoreGallery, commercialElevators, comoCabins, elevatorDetailGalleries, residentialElevators } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';
import ProductGallery from '../components/ui/ProductGallery.jsx';
import atlasCoreCataloguePdf from '../assets/pdfs-for-brochures/atlas core.pdf';
import atlasPanoramaElectricPdf from '../assets/pdfs-for-brochures/Atlas Panorama Electrique.pdf';
import atlasPanoramaHydraulicPdf from '../assets/pdfs-for-brochures/Atlas Panorama Hydrolique1.pdf';
import { buildWhatsAppUrl } from '../data/contact.js';

const testimonialScreenshotImages = Object.entries(
  import.meta.glob('../assets/images/client-testimonials/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b, 'fr', { numeric: true }))
  .map(([, image]) => image);

const noGalleryPages = new Set([
  'Hospital Lifts',
  'Car Lifts',
  'Escalators & Walkways',
  'Core Commercial',
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
  '/elevators/como-commercial': { title: { en: 'Core', fr: 'Core' }, accent: { en: 'Commercial', fr: 'Commercial' }, source: 'com', key: 'Core Commercial' },
  '/elevators/cargo-lifts': { title: { en: 'Cargo', fr: 'Monte' }, accent: { en: 'Lifts', fr: 'Charges' }, source: 'com', key: 'Cargo Lifts' },
  '/elevators/dumbwaiter-lifts': { title: { en: 'Dumbwaiter', fr: 'Monte' }, accent: { en: 'Lifts', fr: 'Plats' }, source: 'com', key: 'Dumbwaiter Lifts' },
};

const productNotes = {
  'Atlas Panorama': {
    label: 'Panoramic Design Lift',
    headline: 'Panoramic Elevators for Villas in Morocco',
    body: 'Atlas Panorama is our premium range of panoramic glass elevators designed for modern villas in Morocco. Offering a glazed shaft, elegant styling, and extensive customization, it provides an exquisite residential addition with silent, safe, and comfortable operation. Each project is tailormade to meet our clients\' technical and aesthetic desires.',
    mobileBody: 'A premium panoramic glass elevator for modern villas in Morocco, with elegant design, quiet comfort, and bespoke finishes.',
    points: ['Glass panoramic structure', 'Smooth and quiet operation', 'Custom cabin, lighting, and doors', 'Ideal for Moroccan villas'],
  },
  'Atlas Core': {
    label: 'Atlas Core',
    headline: 'Residential Elevators for Villas & Buildings in Morocco',
    body: 'Atlas Core is our premium elevator range designed for concrete shaft installations. Adapted to villas, residential buildings, and professional spaces, it delivers a reliable, elegant, and durable solution with broad personalization options, quiet operation, and high-quality components.',
    mobileBody: 'A premium concrete-shaft elevator for villas and buildings, designed for reliable performance, quiet comfort, and elegant finishes.',
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
  'Core Commercial': {
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
    mobileBody: 'Un ascenseur panoramique haut de gamme pour villas au Maroc, avec design élégant, confort silencieux et finitions sur mesure.',
    points: ['Design panoramique en verre', 'Déplacement silencieux et sécurisé', 'Intégration architecturale sur mesure', 'Conçu pour les villas marocaines'],
  },
  'Atlas Core': {
    label: 'Atlas Core',
    headline: 'Ascenseurs Résidentiels pour Villas & Immeubles au Maroc',
    body: 'Atlas Core est notre gamme d’ascenseurs premium conçue pour les installations en gaine béton. Adaptée aux villas, immeubles résidentiels et bâtiments professionnels, cette gamme offre une solution fiable, élégante et durable. Grâce à ses nombreuses possibilités de personnalisation, son fonctionnement silencieux et ses composants de haute qualité, Atlas Core répond aux exigences des architectes, promoteurs et particuliers.',
    mobileBody: 'Un ascenseur premium pour gaine béton, idéal pour villas et immeubles, alliant fiabilité, silence et finitions élégantes.',
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
  'Core Commercial': {
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

const exteriorApplications = [
  { en: 'Villas and private homes', fr: 'Villas et maisons privees', icon: atlasCoreApplications[0].icon },
  { en: 'Existing buildings and extensions', fr: 'Batiments existants et extensions', icon: atlasCoreApplications[1].icon },
  { en: 'Hotels, riads, and guest spaces', fr: 'Hotels, riads et espaces d accueil', icon: atlasCoreApplications[3].icon },
  { en: 'Terraces, gardens, and pool levels', fr: 'Terrasses, jardins et niveaux piscine', icon: atlasCoreApplications[5].icon },
  { en: 'Accessible routes between levels', fr: 'Parcours accessibles entre niveaux', icon: atlasCoreApplications[4].icon },
];

const circularApplications = [
  { en: 'Villas with an atrium or central void', fr: 'Villas avec atrium ou vide central', icon: atlasCoreApplications[0].icon },
  { en: 'Hotel and hospitality lobbies', fr: 'Halls d hotels et espaces hospitality', icon: atlasCoreApplications[3].icon },
  { en: 'Retail showrooms and flagship spaces', fr: 'Showrooms et espaces de vente', icon: atlasCoreApplications[5].icon },
  { en: 'Museums and cultural venues', fr: 'Musees et lieux culturels', icon: atlasCoreApplications[1].icon },
  { en: 'Architectural office interiors', fr: 'Interieurs de bureaux architecturaux', icon: atlasCoreApplications[2].icon },
];

const exteriorReasons = [
  { titlePart1: { en: 'Site-specific', fr: 'Etude du' }, titlePart2: { en: 'planning', fr: 'site' }, desc: { en: 'The shaft, entrances, structure, drainage, and access are coordinated around the building.', fr: 'La gaine, les acces, la structure et le drainage sont etudies avec le batiment.' }, icon: atlasCoreApplications[0].icon },
  { titlePart1: { en: 'Weather-aware', fr: 'Concu pour' }, titlePart2: { en: 'specification', fr: 'l exterieur' }, desc: { en: 'Materials, drainage, and electrical protection must be selected for the local exposure.', fr: 'Materiaux, drainage et protections electriques sont choisis selon l exposition du site.' }, icon: atlasCoreApplications[1].icon },
  { titlePart1: { en: 'Clear vertical', fr: 'Connexion' }, titlePart2: { en: 'connection', fr: 'verticale' }, desc: { en: 'A practical way to link entrances, terraces, gardens, and upper floors.', fr: 'Une liaison pratique entre entree, terrasses, jardin et etages.' }, icon: atlasCoreApplications[5].icon },
  { titlePart1: { en: 'Architectural', fr: 'Integration' }, titlePart2: { en: 'integration', fr: 'architecturale' }, desc: { en: 'Glazing, cladding, and landing details can be coordinated with the facade.', fr: 'Vitrage, habillage et paliers peuvent etre coordonnes avec la facade.' }, icon: atlasCoreApplications[2].icon },
];

const circularReasons = [
  { titlePart1: { en: 'Panoramic', fr: 'Vue' }, titlePart2: { en: 'experience', fr: 'panoramique' }, desc: { en: 'The circular form keeps the elevator visually open within an atrium or lobby.', fr: 'La forme circulaire preserve une presence visuelle ouverte dans un atrium ou un hall.' }, icon: atlasCoreApplications[2].icon },
  { titlePart1: { en: 'Architectural', fr: 'Piece' }, titlePart2: { en: 'centrepiece', fr: 'architecturale' }, desc: { en: 'A bespoke option when vertical circulation is also part of the interior design.', fr: 'Une option sur mesure quand la circulation verticale fait partie du projet interieur.' }, icon: atlasCoreApplications[5].icon },
  { titlePart1: { en: 'Bespoke', fr: 'Etude sur' }, titlePart2: { en: 'engineering', fr: 'mesure' }, desc: { en: 'Diameter, doors, travel, capacity, and structure are validated during technical design.', fr: 'Diametre, portes, course, capacite et structure sont valides pendant l etude technique.' }, icon: atlasCoreApplications[1].icon },
  { titlePart1: { en: 'Finish', fr: 'Finitions' }, titlePart2: { en: 'coordination', fr: 'coordonnees' }, desc: { en: 'Glass, metalwork, lighting, and cabin finishes can be aligned with the space.', fr: 'Verre, metal, eclairage et finitions cabine peuvent etre harmonises avec le lieu.' }, icon: atlasCoreApplications[3].icon },
];

const exteriorFaqs = [
  ['When should I choose an outdoor elevator?', 'Atlas Outdoor is the ideal solution when there is not enough space inside the villa or building. It is installed outside the building while offering comfortable and elegant access between floors.'],
  ['Can an outdoor elevator be installed on an existing building?', 'Yes. Atlas Outdoor can be installed on both existing buildings and new projects after a technical study carried out by our experts.'],
  ['How long does a project take?', 'The total duration of a project is approximately 3 months, including manufacturing, maritime transport, installation, and commissioning.'],
  ['Is the elevator resistant to weather conditions?', 'Yes. Atlas Outdoor is designed to resist rain, sun, humidity, and climate variations thanks to high-quality materials suited to outdoor installation.'],
  ['Can the design be personalized?', 'Yes. You can personalize the structure, glazing, stainless steel finishes, colors, LED lighting, and cabin so the elevator integrates perfectly with your building architecture.'],
  ['Are the elevators compliant with safety standards?', 'Yes. All Atlas Outdoor elevators are manufactured in accordance with European standards and also meet Moroccan regulatory requirements for safety and quality.'],
];

const frExteriorFaqs = [
  ["Dans quels cas choisir un ascenseur extérieur ?", "Atlas Outdoor est la solution idéale lorsqu'il n'y a pas suffisamment d'espace à l'intérieur de la villa ou de l'immeuble. Il s'installe à l'extérieur du bâtiment tout en offrant un accès confortable et élégant entre les étages."],
  ["Peut-on installer un ascenseur extérieur sur un bâtiment existant ?", "Oui. Atlas Outdoor peut être installé aussi bien sur une construction existante que sur un projet neuf, après une étude technique réalisée par nos experts."],
  ["Combien de temps dure un projet ?", "La durée totale d'un projet est d'environ 3 mois, incluant la fabrication, le transport maritime, l'installation et la mise en service."],
  ["L'ascenseur résiste-t-il aux intempéries ?", "Oui. Atlas Outdoor est conçu pour résister à la pluie, au soleil, à l'humidité et aux variations climatiques grâce à des matériaux de haute qualité adaptés à une installation extérieure."],
  ["Peut-on personnaliser le design ?", "Oui. Vous pouvez personnaliser la structure, les vitrages, les finitions inox, les couleurs, l'éclairage LED et la cabine afin d'intégrer parfaitement l'ascenseur à l'architecture de votre bâtiment."],
  ["Les ascenseurs sont-ils conformes aux normes de sécurité ?", "Oui. Tous les ascenseurs Atlas Outdoor sont fabriqués conformément aux normes européennes et répondent également aux exigences réglementaires marocaines en matière de sécurité et de qualité."],
];

const circularFaqs = [
  ['What is the minimum dimension required?', 'Atlas Circulaire generally requires a minimum diameter of 1,200 mm to allow an optimal installation. Our experts study each project to confirm feasibility according to your available space.'],
  ['How long does a project take?', 'The total duration of a project is approximately 6 months, including technical studies, custom manufacturing, maritime transport, installation, and commissioning.'],
  ['Can a circular elevator be installed in an existing villa?', 'Yes. Atlas Circulaire can be installed in both a new villa and an existing villa, subject to a prior technical study.'],
  ['Why choose a circular elevator?', 'Thanks to its 360-degree panoramic design, Atlas Circulaire becomes a true architectural feature. It offers an exceptional view while adding prestige and modernity to your villa.'],
  ['Is the cabin customizable?', 'Yes. You can personalize the glazing, stainless steel finishes, colors, flooring, ceiling, LED lighting, and controls to create a fully custom elevator.'],
  ['Are the elevators compliant with safety standards?', 'Yes. All Atlas Circulaire elevators are manufactured in accordance with European standards and also meet Moroccan regulatory requirements for safety and quality.'],
];

const frCircularFaqs = [
  ["Quelle est la dimension minimale requise ?", "Atlas Circulaire nécessite généralement un diamètre minimum de 1 200 mm pour permettre une installation optimale. Nos experts étudient chaque projet afin de confirmer la faisabilité selon votre espace disponible."],
  ["Combien de temps dure un projet ?", "La durée totale d'un projet est d'environ 6 mois, incluant les études techniques, la fabrication sur mesure, le transport maritime, l'installation et la mise en service."],
  ["Peut-on installer un ascenseur circulaire dans une villa existante ?", "Oui. Atlas Circulaire peut être installé aussi bien dans une villa neuve que dans une villa existante, sous réserve d'une étude technique préalable."],
  ["Pourquoi choisir un ascenseur circulaire ?", "Grâce à son design panoramique à 360°, Atlas Circulaire devient une véritable pièce architecturale. Il offre une vue exceptionnelle tout en apportant une touche de prestige et de modernité à votre villa."],
  ["La cabine est-elle personnalisable ?", "Oui. Vous pouvez personnaliser les vitrages, les finitions inox, les couleurs, le sol, le plafond, l'éclairage LED ainsi que les commandes afin de créer un ascenseur entièrement sur mesure."],
  ["Les ascenseurs sont-ils conformes aux normes de sécurité ?", "Oui. Tous les ascenseurs Atlas Circulaire sont fabriqués conformément aux normes européennes et répondent également aux exigences réglementaires marocaines en matière de sécurité et de qualité."],
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

const circularVsPanoramaComparison = {
  en: [
    ['Installation', 'Panoramic structure planned around the project', 'Circular shaft or enclosure engineered for the project'],
    ['Best fit', 'Villas and projects where a glazed lift is a visible feature', 'Atriums, lobbies, showrooms, and central architectural spaces'],
    ['Visual identity', 'Vertical glass presence and open views', 'A circular focal point within the interior composition'],
    ['Key design inputs', 'Structure, glazing, cabin finishes, and landings', 'Diameter, door positions, structure, finishes, and landings'],
    ['Project validation', 'Technical survey confirms the route, structure, and access', 'Technical survey confirms diameter, structure, access, and circulation'],
  ],
  fr: [
    ['Installation', 'Structure panoramique etudiee selon le projet', 'Gaine ou enveloppe circulaire etudiee selon le projet'],
    ['Projet ideal', 'Villas et projets ou l ascenseur vitré est un element visible', 'Atriums, halls, showrooms et espaces architecturaux centraux'],
    ['Identite visuelle', 'Presence vitree verticale et vues ouvertes', 'Point focal circulaire dans la composition interieure'],
    ['Points de conception', 'Structure, vitrage, finitions cabine et paliers', 'Diametre, positions des portes, structure, finitions et paliers'],
    ['Validation projet', 'Visite technique pour confirmer course, structure et acces', 'Visite technique pour confirmer diametre, structure, acces et circulation'],
  ],
};

const atlasCoreDownloads = [
  { label: 'Atlas Core Brochure', note: 'Discover the Atlas Core range details', file: atlasCoreCataloguePdf },
];

const frAtlasCoreDownloads = [
  { label: 'Brochure Atlas Core', note: 'Découvrez les détails de la gamme Atlas Core', file: atlasCoreCataloguePdf },
];

const atlasCoreFaqs = [
  ['What is the minimum dimension required?', 'Atlas Core can be installed in a masonry shaft from 70 x 90 cm, depending on the project configuration. Our engineers provide a free technical study to propose the most suitable solution for your villa.'],
  ['How long does a project take?', 'The total duration of a project is approximately 3 months, including manufacturing, maritime transport, installation, and commissioning.'],
  ['Can Atlas Core be installed in an existing villa?', 'Yes. Atlas Core can be installed in both a new villa and an existing villa, provided there is a suitable masonry shaft or one that can be created.'],
  ['Is Atlas Core suitable for buildings?', 'Yes. Atlas Core is perfectly suited to villas and residential buildings. For buildings above G+4 or with high-frequency use, we recommend Atlas Core Plus, specially designed for commercial buildings and intensive use.'],
  ['What is the electrical consumption?', 'Atlas Core is designed with high-efficiency energy technology. Its electrical consumption is comparable to that of a modern household appliance while ensuring optimal performance and quiet operation.'],
  ['Is the cabin customizable?', 'Absolutely. You can personalize the finishes, wall coverings, floor, ceiling, LED lighting, control buttons, and cabin dimensions so it integrates perfectly with your interior.'],
  ['What capacity is available?', 'Atlas Core is available with several capacities, generally from 2 to 8 persons (250 to 630 kg), depending on your project needs.'],
  ['What warranty is provided?', 'All Atlas Core elevators are covered by a manufacturer warranty. Our team also supports you with responsive after-sales service and maintenance contracts.'],
  ['Is maintenance available?', 'Yes. Atlas Ascenseurs offers preventive maintenance contracts, troubleshooting interventions, and spare parts supply throughout Morocco.'],
  ['Which safety standards are respected?', 'All Atlas Core elevators are manufactured in accordance with European standards and also meet Moroccan regulatory requirements for safety and quality.'],
];

const frAtlasCoreFaqs = [
  ["Quelle est la dimension minimale requise ?", "Atlas Core peut être installé dans une gaine maçonnée à partir de 70 × 90 cm, selon la configuration du projet. Nos ingénieurs réalisent gratuitement une étude technique afin de proposer la solution la plus adaptée à votre villa."],
  ["Combien de temps dure un projet ?", "La durée totale d'un projet est d'environ 3 mois, incluant la fabrication, le transport maritime, l'installation et la mise en service."],
  ["Peut-on installer Atlas Core dans une villa existante ?", "Oui. Atlas Core peut être installé aussi bien dans une villa neuve que dans une villa existante, à condition de disposer d'une gaine maçonnée adaptée ou pouvant être créée."],
  ["Atlas Core est-il adapté aux immeubles ?", "Oui. Atlas Core convient parfaitement aux villas et aux immeubles résidentiels. Pour les immeubles de plus de G+4 ou à forte fréquence d'utilisation, nous recommandons Atlas Core Plus, spécialement conçu pour les bâtiments commerciaux et les usages intensifs."],
  ["Quelle est la consommation électrique ?", "Atlas Core est conçu avec une technologie à haute efficacité énergétique. Sa consommation électrique est comparable à celle d'un appareil électroménager moderne, tout en garantissant des performances optimales et un fonctionnement silencieux."],
  ["La cabine est-elle personnalisable ?", "Absolument. Vous pouvez personnaliser les finitions, les revêtements, le sol, le plafond, l'éclairage LED, les boutons de commande et les dimensions de la cabine afin qu'elle s'intègre parfaitement à votre intérieur."],
  ["Quelle capacité est disponible ?", "Atlas Core est disponible avec plusieurs capacités, généralement de 2 à 8 personnes (250 à 630 kg), selon les besoins de votre projet."],
  ["Quelle garantie est prévue ?", "Tous les ascenseurs Atlas Core sont couverts par une garantie constructeur. Notre équipe vous accompagne également avec un service après-vente réactif et des contrats de maintenance."],
  ["L'entretien est-il disponible ?", "Oui. Atlas Ascenseurs propose des contrats de maintenance préventive, des interventions de dépannage ainsi que la fourniture de pièces détachées partout au Maroc."],
  ["Quelles normes de sécurité sont respectées ?", "Tous les ascenseurs Atlas Core sont fabriqués conformément aux normes européennes et répondent également aux exigences réglementaires marocaines en matière de sécurité et de qualité."],
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
  { label: "Atlas Panorama Electrique", note: "Electric Traction Edition", file: atlasPanoramaElectricPdf },
  { label: "Atlas Panorama Hydrolique", note: "Hydraulic System Edition", file: atlasPanoramaHydraulicPdf },
];

const frAtlasPanoramaDownloads = [
  { label: "Atlas Panorama Electrique", note: "Édition Traction Électrique", file: atlasPanoramaElectricPdf },
  { label: "Atlas Panorama Hydrolique", note: "Édition Système Hydraulique", file: atlasPanoramaHydraulicPdf },
];

const atlasPanoramaFaqs = [
  ["What is the minimum dimension required?", "In most projects, a shaft of around 1 m x 1 m is sufficient to install an Atlas Panorama elevator. In some specific cases, we have completed installations in spaces as compact as 70 x 70 cm. Contact our experts for a personalized technical study."],
  ["Can a panoramic elevator be installed in an existing villa?", "Yes. Atlas Panorama elevators can be installed in both a villa under construction and an existing villa, thanks to a self-supporting glass structure when necessary."],
  ["How long does a project take?", "The total duration of a project is approximately 3 months, including manufacturing, maritime transport, installation, and commissioning of your elevator."],
  ["Is a machine room or pit required?", "No. Atlas Panorama elevators generally require neither a machine room nor a pit, which makes them easier to integrate into new villas and renovation projects."],
  ["Can the cabin be personalized?", "Absolutely. You can personalize the glass, stainless steel finishes, flooring, ceiling, LED lighting, controls, and dimensions to create a unique elevator."],
  ["What is the electrical consumption?", "Our elevators are designed to be energy-efficient thanks to latest-generation motors and low-consumption LED lighting."],
  ["What happens during a power outage?", "All our elevators are equipped with an automatic rescue system (ARD) that allows the cabin to reach the nearest level and open the doors safely."],
  ["What maintenance is necessary?", "Periodic maintenance is recommended to ensure the proper operation, safety, and long life of your elevator. Atlas Ascenseurs offers maintenance contracts adapted to each installation."],
  ["Are the elevators compliant with safety standards?", "Yes. All Atlas Panorama elevators are manufactured in accordance with European standards and also meet Moroccan regulatory requirements for safety."]
];

const frAtlasPanoramaFaqs = [
  ["Quelle est la dimension minimale requise ?", "Dans la plupart des projets, une gaine d'environ 1 m × 1 m est suffisante pour installer un ascenseur Atlas Panorama. Dans certains cas spécifiques, nous avons réalisé des installations dans des espaces aussi réduits que 70 × 70 cm. Contactez nos experts pour une étude technique personnalisée."],
  ["Peut-on installer un ascenseur panoramique dans une villa existante ?", "Oui. Les ascenseurs Atlas Panorama peuvent être installés aussi bien dans une villa en construction que dans une villa existante, grâce à une structure autoportante en verre lorsque cela est nécessaire."],
  ["Combien de temps dure un projet ?", "La durée totale d'un projet est d'environ 3 mois, incluant la fabrication, le transport maritime, l'installation et la mise en service de votre ascenseur."],
  ["Faut-il un local technique ou une fosse ?", "Non. Les ascenseurs Atlas Panorama ne nécessitent généralement ni local technique ni fosse, ce qui facilite leur intégration dans les villas neuves comme dans les projets de rénovation."],
  ["Peut-on personnaliser la cabine ?", "Absolument. Vous pouvez personnaliser le verre, les finitions inox, le sol, le plafond, l'éclairage LED, les commandes ainsi que les dimensions afin de créer un ascenseur unique."],
  ["Quelle est la consommation électrique ?", "Nos ascenseurs sont conçus pour être économes en énergie grâce à des moteurs de dernière génération et un éclairage LED basse consommation."],
  ["Que se passe-t-il en cas de coupure de courant ?", "Tous nos ascenseurs sont équipés d'un système de secours automatique (ARD) qui permet à la cabine de rejoindre le niveau le plus proche et d'ouvrir les portes en toute sécurité."],
  ["Quel entretien est nécessaire ?", "Un entretien périodique est recommandé afin d'assurer le bon fonctionnement, la sécurité et la longévité de votre ascenseur. Atlas Ascenseurs propose des contrats de maintenance adaptés à chaque installation."],
  ["Les ascenseurs sont-ils conformes aux normes de sécurité ?", "Oui. Tous les ascenseurs Atlas Panorama sont fabriqués conformément aux normes européennes et répondent également aux exigences réglementaires marocaines en matière de sécurité."]
];

const atlasPanoramaTestimonials = [
  { source: "WhatsApp", name: "Client villa - Marrakech", text: "Le rendu avec la gaine vitrée est incroyable. L'ascenseur est silencieux et s'intègre parfaitement dans notre patio." },
  { source: "Facebook", name: "Architecte - Casablanca", text: "Nous avons intégré la gamme Atlas Panorama sur plusieurs projets de villas contemporaines. Flexibilité technique et esthétique haut de gamme au rendez-vous." },
  { source: "WhatsApp", name: "Propriétaire - Rabat", text: "Très satisfait de l'installation de notre ascenseur en verre. L'équipe d'Atlas a été très professionnelle du début à la fin." }
];

const galleryNamesByTitle = {
  'Atlas Panorama': [
    'Atlas Panorama Pure (Entry model)',
    'Atlas Panorama Edge',
    'Atlas Panorama Select',
    'Atlas Panorama Elegance',
    'Atlas Panorama Signature',
    'Atlas Panorama Prestige',
    'Atlas Panorama Horizon',
    'Atlas Panorama Imperial',
    'Atlas Panorama Infinity (Flagship model)',
  ],
  'Circular Elevators': [
    'Atlas Circular Pure',
    'Atlas Circular One',
    'Atlas Circular Nova',
    'Atlas Circular Slim',
    'Atlas Circular Vision',
    'Atlas Circular Crystal',
    'Atlas Circular Horizon',
    'Atlas Circular Select',
    'Atlas Circular Elegance',
    'Atlas Circular Signature',
    'Atlas Circular Prestige',
    'Atlas Circular Imperial',
    'Atlas Circular Platinum',
    'Atlas Circular Diamond',
    'Atlas Circular Infinity',
  ],
  'Exterior Elevators': [
    'Atlas Outdoor Pure',
    'Atlas Outdoor One',
    'Atlas Outdoor Nova',
    'Atlas Outdoor Vision',
    'Atlas Outdoor Crystal',
    'Atlas Outdoor Horizon',
    'Atlas Outdoor Signature',
    'Atlas Outdoor Prestige',
    'Atlas Outdoor Imperial',
    'Atlas Outdoor Infinity',
  ],
};

function PanoramaVsCoreComparison({ language, comparison = atlasCoreComparison, title = 'PANORAMA VS CORE', description, leftSubtitle, rightImage = atlasCoreCompareImg, rightTitle = 'ATLAS CORE', rightSubtitle }) {
  const comparisonRows = comparison[language] ?? comparison.en;
  const comparisonDescription = description ?? (language === 'fr' ? 'Quel modèle est fait pour vous ?' : 'Which model is right for you?');
  const panoramaSubtitle = leftSubtitle ?? (language === 'fr' ? 'Ascenseur panoramique (gaine verre)' : 'Panoramic glass shaft elevator');
  
  return (
    <section className="comparison-split-section">
      <div className="comparison-container">
        <div className="comparison-info-side">
          <div className="eyebrow">{language === 'fr' ? 'Comparatif' : 'Comparison'}</div>
          <h2>{title}</h2>
          <p>{comparisonDescription}</p>

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
                  <span>{panoramaSubtitle}</span>
                </div>
              </div>
              
              <div className="comparison-col-product">
                <img src={rightImage} alt={rightTitle} className="comparison-product-img" />
                <div className="comparison-product-title-wrap">
                  <h3>{rightTitle}</h3>
                  <span>{rightSubtitle ?? (language === 'fr' ? 'Ascenseur pour gaine maçonnée (béton)' : 'Concrete shaft elevator')}</span>
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

function ProductApplicationsSection({ language, items, title }) {
  return (
    <section className="atlas-core-block text-center-luxury">
      <div className="gallery-head"><div><div className="eyebrow">Applications</div><h2 className="section-title tight-title">{title}</h2></div></div>
      <div className="atlas-core-icon-grid">
        {items.map((item) => <article className="atlas-core-icon-card" key={item.en}><span>{item.icon}</span><h3>{item[language] ?? item.en}</h3></article>)}
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
  const showExteriorSections = itemTitle === "Exterior Elevators";
  const showCircularSections = itemTitle === "Circular Elevators";
  const useLuxuryArchitecture = ["Atlas Core", "Atlas Panorama", "Circular Elevators", "Exterior Elevators"].includes(itemTitle);
  const showAtlasExtendedSections = showAtlasCoreSections || showAtlasPanoramaSections;
  const whyChooseItems = showAtlasCoreSections
    ? atlasCoreReasons
    : showAtlasPanoramaSections
      ? atlasPanoramaReasons
      : showExteriorSections
        ? exteriorReasons
        : showCircularSections
          ? circularReasons
          : note.points.map((point, index) => ({
          titlePart1: { en: point, fr: point },
          titlePart2: { en: "", fr: "" },
          desc: { en: note.body.split(". " )[index] || note.body.split(". " )[0], fr: note.body.split(". " )[index] || note.body.split(". " )[0] },
          icon: atlasPanoramaReasons[index % atlasPanoramaReasons.length].icon
        }));
  const brochureHref = itemTitle === "Atlas Panorama" ? atlasPanoramaElectricPdf : itemTitle === "Atlas Core" ? atlasCoreCataloguePdf : "/contact";
  const brochureIsPdf = itemTitle === "Atlas Panorama" || itemTitle === "Atlas Core";
  const pageTitle = page.title[language] ?? page.title.en;
  const pageAccent = page.accent[language] ?? page.accent.en;
  const quoteHref = buildWhatsAppUrl(
    language === 'fr'
      ? 'Bonjour Atlas Ascenseurs, je souhaite demander un devis.'
      : 'Hello Atlas Ascenseurs, I would like to request a quote.'
  );
  const galleryLabels = galleryNamesByTitle[itemTitle];
  const hasMobileHeroCopy = Boolean(note.mobileBody);
  const activeTestimonials = itemTitle === "Atlas Core" ? atlasCoreTestimonials : atlasPanoramaTestimonials;
  const hasTestimonialScreenshots = testimonialScreenshotImages.length > 0;
  const standaloneFaqs = showExteriorSections
    ? (language === "fr" ? frExteriorFaqs : exteriorFaqs)
    : (language === "fr" ? frCircularFaqs : circularFaqs);

  return (
    <div className={useLuxuryArchitecture ? `elevator-luxury-layout elevator-luxury-layout--${itemTitle.toLowerCase().replaceAll(" ", "-")}` : ""}>
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
              <p className={hasMobileHeroCopy ? "elevator-luxury-hero-copy-desktop" : undefined}>{note.body}</p>
              {hasMobileHeroCopy && <p className="elevator-luxury-hero-copy-mobile">{note.mobileBody}</p>}
              <div className="elevator-luxury-hero-actions">
                <a href={quoteHref} className="btn-gold" target="_blank" rel="noreferrer">
                  <span>{language === "fr" ? "Demander un devis" : "Request a quote"}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "10px", transition: "transform 0.3s ease" }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                {brochureIsPdf && (
                  <a href={brochureHref} className="btn-outline-icon" target="_blank" rel="noreferrer">
                  <span>{language === "fr" ? "Télécharger la brochure" : "Download Brochure"}</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "10px" }}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </a>
                )}
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
                className={`product-presentation-image ${itemTitle === "Core Commercial" ? "product-presentation-image-clean" : ""} ${itemTitle === "Atlas Core" ? "product-presentation-image-como" : ""} ${itemTitle === "Exterior Elevators" ? "product-presentation-image-exterior" : ""}`}
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

        {showExteriorSections && (
          <ProductApplicationsSection
            language={language}
            items={exteriorApplications}
            title={language === 'fr' ? 'Solutions pour Ascenseurs Extérieurs' : 'Applications planned for exterior access'}
          />
        )}

        {showCircularSections && (
          <ProductApplicationsSection
            language={language}
            items={circularApplications}
            title={language === 'fr' ? 'Des applications ou le design devient experience' : 'Applications where design becomes part of the experience'}
          />
        )}

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
            title="Inspirations & Realisations"
            images={gallery}
            className={`${usePhoneTallGallery ? "product-gallery-phone-tall" : ""} ${itemTitle === "Atlas Panorama" ? "text-center-luxury" : ""}`.trim()}
            showAll={itemTitle === "Atlas Panorama" || showExteriorSections || showCircularSections}
            getLabel={(index, image) => {
              if (galleryLabels?.[index]) {
                return galleryLabels[index];
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

        {showCircularSections && (
          <PanoramaVsCoreComparison
            language={language}
            comparison={circularVsPanoramaComparison}
            title="CIRCULAR VS PANORAMA"
            rightImage={circularCompareImg}
            rightTitle="CIRCULAR ELEVATOR"
            rightSubtitle={language === 'fr' ? 'Ascenseur circulaire sur mesure' : 'Bespoke circular elevator'}
          />
        )}

        {(showExteriorSections || showCircularSections) && (
          <section className="atlas-core-block" id="faq">
            <div className="split-col">
              <h3>{language === 'fr' ? 'Questions fréquentes' : 'Frequently Asked Questions'}</h3>
              <div className="faq-wrap atlas-core-faq">
                {standaloneFaqs.map(([question, answer], index) => (
                  <div className={`faq-item ${openFaq === index ? 'open' : ''}`} key={question}>
                    <button className="faq-q" type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                      {question} <span className="faq-plus">+</span>
                    </button>
                    <div className="faq-a">{answer}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {showAtlasExtendedSections && (
          <PanoramaVsCoreComparison
            language={language}
            description={language === 'fr' ? 'choisissez la solution adaptée à votre villa.' : undefined}
            leftSubtitle={language === 'fr' ? 'Ascenseur panoramique avec gaine en verre' : undefined}
          />
        )}

        {showAtlasExtendedSections && (
          <section className="atlas-core-block" id="documents">
            <div className="split-docs-faq">
              <div className="split-col">
                <h3>Brochures & Catalogues</h3>
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
              {hasTestimonialScreenshots
                ? testimonialScreenshotImages.map((image, index) => (
                  <article className="chat-bubble-card testimonial-screenshot-card" key={image}>
                    <img
                      className="testimonial-screenshot-img"
                      src={image}
                      alt={language === "fr" ? `Capture témoignage client ${String(index + 1).padStart(2, "0")}` : `Client testimonial screenshot ${String(index + 1).padStart(2, "0")}`}
                      loading="lazy"
                    />
                  </article>
                ))
                : activeTestimonials.map((item) => (
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
              <a href={quoteHref} className="btn-gold" target="_blank" rel="noreferrer">
                {language === "fr" ? "Demander un devis" : "Request a quote"}
              </a>
              <a href={quoteHref} className="btn-whatsapp-outline" target="_blank" rel="noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
            </div>
          </section>
        )}
      </section>
    </div>
  );
}
