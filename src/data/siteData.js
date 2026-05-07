import logo from '../assets/images/logos/atlas ascenseur.png';
import heroImage from '../assets/images/hero/elevator-hero.svg';
import homeBackgroundImage from '../assets/images/hero/home_bqckgound.png';
import astoriaImage from '../assets/images/elevators/astoria.svg';
import circularImage from '../assets/images/elevators/circular.svg';
import exteriorImage from '../assets/images/elevators/exterior.svg';
import commercialImage from '../assets/images/elevators/commercial.svg';
import hospitalCargoImage from '../assets/images/elevators/hospital-cargo.svg';
import escalatorImage from '../assets/images/elevators/escalator.svg';
import villaProject from '../assets/images/projects/villa-palmeraie.svg';
import vetProject from '../assets/images/projects/atlas-veterinaire.svg';
import circularProject from '../assets/images/projects/circular-elevator.svg';
import outdoorProject from '../assets/images/projects/outdoor-elevator.svg';
import marinaProject from '../assets/images/projects/marina-agadir.svg';
import golfProject from '../assets/images/projects/amalkis-golf.svg';
import imgHeroElevatorLuxury from '../assets/images/library/hero-elevator-luxury.jpg';
import imgElevatorAstoriaInterior from '../assets/images/library/elevator-astoria-interior.jpg';
import imgElevatorCircularGlass from '../assets/images/library/elevator-circular-glass.jpg';
import imgElevatorExteriorTower from '../assets/images/library/elevator-exterior-tower.jpg';
import imgElevatorCommercialLobby from '../assets/images/library/elevator-commercial-lobby.jpg';
import imgElevatorHospitalCargo from '../assets/images/library/elevator-hospital-cargo.jpg';
import imgElevatorEscalatorWalkway from '../assets/images/library/elevator-escalator-walkway.jpg';
import imgProjectVillaLift from '../assets/images/library/project-villa-lift.jpg';
import imgProjectVeterinaryClinic from '../assets/images/library/project-veterinary-clinic.jpg';
import imgProjectMarinaHospitality from '../assets/images/library/project-marina-hospitality.jpg';
import imgProjectGolfResort from '../assets/images/library/project-golf-resort.jpg';
import imgPageContactOffice from '../assets/images/library/page-contact-office.jpg';
import imgPageFaqConsultation from '../assets/images/library/page-faq-consultation.jpg';
import imgElevatorCarLift from '../assets/images/library/elevator-car-lift.jpg';
import imgElevatorCargoWarehouse from '../assets/images/library/elevator-cargo-warehouse.jpg';
import imgElevatorDumbwaiterService from '../assets/images/library/elevator-dumbwaiter-service.jpg';
import imgServiceEmergencySupport from '../assets/images/library/service-emergency-support.jpg';
import imgServiceModernizationUpgrade from '../assets/images/library/service-modernization-upgrade.jpg';
import imgServiceInspectionCertification from '../assets/images/library/service-inspection-certification.jpg';
import astoriaRange1 from '../assets/images/astoria_range/Astoria-1-.jpeg';
import astoriaRange2 from '../assets/images/astoria_range/Astoria-2.png';
import astoriaRange3 from '../assets/images/astoria_range/Astoria-3.jpg';
import astoriaRange4 from '../assets/images/astoria_range/Astoria-4.jpg';
import astoriaRange5 from '../assets/images/astoria_range/Astoria-5-.jpeg';
import comoRange1 from '../assets/images/como_range/1.jpg';
import comoRange2 from '../assets/images/como_range/2.jpg';
import comoRange3 from '../assets/images/como_range/3.jpg';
import comoRange4 from '../assets/images/como_range/4.jpg';
import comoRange5 from '../assets/images/como_range/5.jpg';
import circularLift1 from '../assets/images/circular_elevators/1.jpeg';
import circularLift2 from '../assets/images/circular_elevators/2.jpg';
import circularLift3 from '../assets/images/circular_elevators/3.jpeg';
import circularLift4 from '../assets/images/circular_elevators/4.jpg';
import circularLift5 from '../assets/images/circular_elevators/5.jpeg';
import exteriorLift1 from '../assets/images/exterior_elevators/1.jpeg';
import exteriorLift2 from '../assets/images/exterior_elevators/2.jpeg';
import exteriorLift3 from '../assets/images/exterior_elevators/3.jpeg';
import exteriorLift4 from '../assets/images/exterior_elevators/4.jpeg';
import exteriorLift5 from '../assets/images/exterior_elevators/5.jpeg';
import comoCommercialPassenger from '../assets/images/Como_Commercial_Range/passenger.jpg';
import escalatorCover from '../assets/images/escalators/cover.jpg';
import escalatorDetail from '../assets/images/escalators/1742962114078.jpeg';
import carLiftProduct from '../assets/images/car-lifts/car-lift-prod_2.jpg';
import cargoFreightElevator from '../assets/images/Cargo Lifts/Automatic-Freight-Elevator.jpg';
import doorSingleSwing from '../assets/images/Doors/single-swing-576x1024.jpg';
import doorDoubleSwing from '../assets/images/Doors/double-swing-576x1024.jpg';
import doorManual from '../assets/images/Doors/manuel-door-576x1024.jpg';
import inspiration1 from '../assets/images/Inspiration Gallery/1.jpg';
import inspiration2 from '../assets/images/Inspiration Gallery/2.jpg';
import inspiration3 from '../assets/images/Inspiration Gallery/3.jpg';

const withFallback = (src, fallback) => fallback || src;

function galleryFrom(modules) {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([, src]) => src);
}

const astoriaGallery = galleryFrom(import.meta.glob('../assets/images/astoria_range/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const comoResidentialGallery = galleryFrom(import.meta.glob('../assets/images/como_range/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const circularGallery = galleryFrom(import.meta.glob('../assets/images/circular_elevators/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const exteriorGallery = galleryFrom(import.meta.glob('../assets/images/exterior_elevators/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const comoCommercialGallery = galleryFrom(import.meta.glob('../assets/images/Como_Commercial_Range/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const escalatorGallery = galleryFrom(import.meta.glob('../assets/images/escalators/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const carLiftGallery = galleryFrom(import.meta.glob('../assets/images/car-lifts/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const cargoGallery = galleryFrom(import.meta.glob('../assets/images/Cargo Lifts/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const doorGallery = galleryFrom(import.meta.glob('../assets/images/Doors/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const inspirationGallery = galleryFrom(import.meta.glob('../assets/images/Inspiration Gallery/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));

export const imagePaths = {
  logos: {
    main: logo,
  },
  hero: {
    main: withFallback(heroImage, homeBackgroundImage),
  },
  elevators: {
    astoria: astoriaRange1,
    comoResidential: comoRange1,
    circular: circularLift1,
    exterior: exteriorLift1,
    commercial: comoCommercialPassenger,
    hospitalCargo: withFallback(hospitalCargoImage, imgElevatorHospitalCargo),
    escalator: escalatorCover,
    car: carLiftProduct,
    cargo: cargoFreightElevator,
    doors: doorSingleSwing,
    inspiration: inspiration1,
  },
  projects: {
    villa: withFallback(villaProject, imgProjectVillaLift),
    veterinary: withFallback(vetProject, imgProjectVeterinaryClinic),
    circular: withFallback(circularProject, imgElevatorCircularGlass),
    outdoor: withFallback(outdoorProject, imgElevatorExteriorTower),
    marina: withFallback(marinaProject, imgProjectMarinaHospitality),
    golf: withFallback(golfProject, imgProjectGolfResort),
  },
};

export const pageImages = {
  about: imgElevatorExteriorTower,
  service: imgElevatorAstoriaInterior,
  contact: imgPageContactOffice,
  faq: imgServiceInspectionCertification,
};

export const navLinks = [
  { label: 'About', to: '/about' },
  { label: '3D Personalization', to: '/configurator' },
  { label: 'Service & Maintenance', to: '/service' },
  { label: 'Our Projects', to: '/projects' },
];

export const residentialLinks = ['Circular Elevators', 'Exterior Elevators', 'Astoria Range', 'Como Range'];
export const commercialLinks = ['Hospital Lifts', 'Car Lifts', 'Escalators / Walkways', 'Como Commercial', 'Cargo Lifts', 'Dumbwaiter Lifts'];
export const elevatorMenuLinks = {
  residential: [
    { label: 'Circular Elevators', to: '/elevators/circular-elevators' },
    { label: 'Exterior Elevators', to: '/elevators/exterior-elevators' },
    { label: 'Astoria Range', to: '/elevators/astoria-range' },
    { label: 'Como Range', to: '/elevators/como-range' },
  ],
  commercial: [
    { label: 'Hospital Lifts', to: '/elevators/hospital-lifts' },
    { label: 'Car Lifts', to: '/elevators/car-lifts' },
    { label: 'Escalators / Walkways', to: '/elevators/escalators-walkways' },
    { label: 'Como Commercial', to: '/elevators/como-commercial' },
    { label: 'Cargo Lifts', to: '/elevators/cargo-lifts' },
    { label: 'Dumbwaiter Lifts', to: '/elevators/dumbwaiter-lifts' },
  ],
};

export const cabinMenuLinks = [
  { label: 'Cabin Design', to: '/cabin-design' },
  { label: 'Inspiration Gallery', to: '/inspiration-gallery' },
  { label: 'Door Collections', to: '/door-collections' },
];

export const stats = [
  { value: '70', suffix: '+', label: 'Years of History' },
  { value: '500', suffix: '+', label: 'Installations in Morocco' },
  { value: '24', suffix: '/7', label: 'Emergency Support' },
  { value: '10', suffix: '+', label: 'Cities Served' },
];

export const whyCards = [
  {
    number: '01',
    title: 'Full Service',
    text: 'From the first design consultation to installation, certification, maintenance, and emergency support, Atlas Ascenseurs stays responsible for the complete elevator lifecycle.',
  },
  {
    number: '02',
    title: 'Quick Installation',
    text: 'Modular shaft systems and factory-finished cabins reduce site work, shorten installation time, and keep homes, hotels, clinics, and offices moving.',
  },
  {
    number: '03',
    title: 'Safety First',
    text: 'Every proposed lift is specified around strict Euro-Moroccan safety expectations, reliable components, protective systems, and clean user operation.',
  },
  {
    number: '04',
    title: '70+ Years of Expertise',
    text: 'Built on proven product families and deep technical know-how, Atlas Ascenseurs keeps the engineering expertise while improving the client experience.',
  },
];

export const elevatorCards = [
  { tag: 'Residential', title: 'Astoria Range', desc: 'Elegant indoor elevators for private villas and apartments. Fully customizable cabin, lighting, and finishes.', image: imagePaths.elevators.astoria },
  { tag: 'Residential', title: 'Circular Elevators', desc: 'A statement piece for any home. Panoramic, architectural, and unmistakably refined.', image: imagePaths.elevators.circular },
  { tag: 'Residential', title: 'Exterior Elevators', desc: 'Weatherproof and beautifully designed for outdoor installations, gardens, and terraces.', image: imagePaths.elevators.exterior },
  { tag: 'Commercial', title: 'Como Commercial', desc: 'High-traffic performance elevators built for offices, hotels, and commercial buildings.', image: imagePaths.elevators.commercial },
  { tag: 'Commercial', title: 'Hospital & Cargo Lifts', desc: 'Specialized lifts engineered for healthcare environments and industrial logistics needs.', image: imagePaths.elevators.cargo },
  { tag: 'Commercial', title: 'Escalators & Walkways', desc: 'Smooth, reliable moving infrastructure for malls, airports, and large public spaces.', image: imagePaths.elevators.escalator },
];

export const residentialElevators = [
  ['A', 'Astoria Range', 'Elegant indoor home elevators for villas, townhouses, and apartments. The Astoria concept uses a self-supporting aluminum tower, refined cabin finishes, compact installation logic, and a premium residential look without heavy structural work.', imagePaths.elevators.astoria],
  ['C', 'COMO Residential', 'A flexible residential lift family for moderate daily use. Inspired by the COMO range, hydraulic and electric drive options optimize shaft space, creating larger cabins even in compact homes while keeping the ride smooth, quiet, and reliable.', imagePaths.elevators.comoResidential],
  ['O', 'Circular Elevators', 'Panoramic circular lifts designed as architectural centerpieces. Clear, smoked, or frosted glass, stainless steel or coated structures, custom flooring, railings, and lighting help the elevator become part of the interior design.', imagePaths.elevators.circular],
  ['X', 'Exterior Elevators', 'Outdoor lifts for terraces, gardens, split-level homes, and hillside properties. Weather-ready shaft structures, glass options, and compact footprints make accessibility possible without compromising the architecture.', imagePaths.elevators.exterior],
  ['P', 'Panoramic & Glass Cabins', 'Glass cabin and panoramic lift options bring light, visibility, and a strong design presence to homes, hospitality projects, and premium commercial interiors.', imagePaths.projects.circular],
  ['D', 'Doors & Cabin Finishes', 'Automatic single swing doors, automatic double swing doors, manual handle doors, metallic finishes, wood tones, bright modern colors, flooring, lighting, and control panels can be combined into a made-to-measure cabin.', imagePaths.elevators.doors],
];

export const commercialElevators = [
  ['B', 'COMO Commercial', 'Gearless all-electric passenger elevators for offices, hotels, public buildings, and commercial properties. Modular shaft design, refined cabin options, UPS emergency release, and configurable load capacities support demanding daily use.', imagePaths.elevators.commercial],
  ['E', 'Escalators & Walkways', 'Continuous movement solutions for malls, airports, stations, supermarkets, and public infrastructure. Robust truss construction, anti-slip surfaces, anti-corrosion materials, and advanced safety systems create smooth high-volume flow.', imagePaths.elevators.escalator],
  ['V', 'Car Lifts', 'Vehicle lifts for private garages, showrooms, parking facilities, and service buildings. Configurations can support light, heavy, and very heavy vehicles with automatic doors, protective bump rails, and adaptable speeds.', imagePaths.elevators.car],
  ['F', 'Cargo Lifts', 'Machine-room-less freight elevators for warehouses, factories, retail back-of-house areas, and industrial buildings. Heavy-load models, reinforced cabins, regenerative energy options, and quiet gearless technology improve logistics performance.', imagePaths.elevators.cargo],
  ['H', 'Hospital Lifts', 'Healthcare elevators for patients, visitors, beds, and medical staff. Wide cabins, smooth travel, hygienic surfaces, traffic-ready gearless systems, and speeds from 1 m/s up to 2.5 m/s support demanding hospital circulation.', imagePaths.elevators.hospitalCargo],
  ['S', 'Dumbwaiter Lifts', 'Compact service lifts for restaurants, hotels, clinics, villas, and back-office operations. They move meals, laundry, documents, and supplies efficiently between floors while reducing staff travel and energy use.', imgElevatorDumbwaiterService],
];

export const elevatorDetailGalleries = {
  'Astoria Range': astoriaGallery,
  'COMO Residential': comoResidentialGallery,
  'Circular Elevators': circularGallery,
  'Exterior Elevators': exteriorGallery,
  'Panoramic & Glass Cabins': circularGallery,
  'Doors & Cabin Finishes': doorGallery,
  'COMO Commercial': comoCommercialGallery,
  'Escalators & Walkways': escalatorGallery,
  'Car Lifts': carLiftGallery,
  'Cargo Lifts': cargoGallery,
  'Hospital Lifts': [imgElevatorHospitalCargo, imgServiceInspectionCertification],
  'Dumbwaiter Lifts': [imgElevatorDumbwaiterService],
};

export const designGalleries = {
  cabin: [
    imgElevatorAstoriaInterior,
    imgElevatorCircularGlass,
    imgElevatorCommercialLobby,
    imgProjectVillaLift,
    imgProjectMarinaHospitality,
    imgProjectGolfResort,
    imgElevatorExteriorTower,
    imgElevatorHospitalCargo,
    imgPageFaqConsultation,
  ],
  inspiration: inspirationGallery,
  door: doorGallery,
};

export const libraryCabinImages = {
  signature: imgProjectVillaLift,
  panoramic: imgElevatorCircularGlass,
  contemporary: imgElevatorAstoriaInterior,
  commercial: imgElevatorCommercialLobby,
  clinical: imgElevatorHospitalCargo,
  outdoor: imgElevatorExteriorTower,
  luxuryBanner: imgHeroElevatorLuxury,
};

export const projects = [
  { category: 'Residential - Marrakech', title: 'Villa Palmeraie', desc: 'Custom residential elevator for a luxury villa in the Palmeraie district.', image: imagePaths.projects.villa },
  { category: 'Commercial - Casablanca', title: 'Atlas Veterinaire', desc: 'Medical-grade lift installation for a veterinary clinic in Casablanca.', image: imagePaths.projects.veterinary },
  { category: 'Residential - Rabat', title: 'Circular Elevator', desc: 'Panoramic circular lift for a modern residence in the diplomatic quarter of Rabat.', image: imagePaths.projects.circular },
  { category: 'Outdoor - Tangier', title: 'Outdoor Elevator', desc: 'Weatherproof external lift for a hillside residential property in Tangier.', image: imagePaths.projects.outdoor },
  { category: 'Hospitality - Agadir', title: 'Marina Agadir', desc: 'Commercial elevator suite for a marina-front hotel complex in Agadir.', image: imagePaths.projects.marina },
  { category: 'Hospitality - Marrakech', title: 'Amalkis Golf Resort', desc: 'Multi-unit elevator installation for a premium golf resort in Marrakech.', image: imagePaths.projects.golf },
];

export const services = [
  ['01', 'Preventive Maintenance', 'Scheduled inspection and servicing to prevent breakdowns before they happen. Our technicians conduct systematic checks on all mechanical, electrical, and safety components.', 'Monthly - Quarterly - Annual plans available', imgElevatorAstoriaInterior],
  ['02', '24/7 Emergency Support', 'Round-the-clock availability for urgent breakdowns and technical incidents. Our response team is deployed rapidly across all cities we serve.', 'Nationwide coverage - Priority response', imgServiceEmergencySupport],
  ['03', 'Modernization & Upgrades', 'Breathe new life into aging elevator systems. We upgrade controls, cabins, and mechanical components to current safety and performance standards - without full replacement.', 'Cost-effective - Minimal downtime', imgServiceModernizationUpgrade],
  ['04', 'Inspections & Certification', 'Official safety inspections and compliance certification in accordance with Euro-Moroccan norms. We handle all documentation and regulatory requirements on your behalf.', 'Full compliance guaranteed', imgServiceInspectionCertification],
];

export const faqs = [
  ['How long does installation take?', 'Most residential elevator installations take between 3 to 5 days. Commercial projects vary depending on scope and building specifications. Our team will give you a precise timeline during the consultation phase.'],
  ['Do you operate outside Casablanca?', 'Yes. Atlas Ascenseurs operates in Casablanca, Rabat, Marrakech, Tangier, Agadir, Fes, and all major Moroccan cities. We have a nationwide team ready to assist you.'],
  ['What maintenance options do you offer?', 'We offer flexible maintenance contracts including monthly, quarterly, and annual inspection plans. All contracts include 24/7 emergency breakdown support and priority response.'],
  ['Are elevators compliant with Moroccan safety norms?', 'Absolutely. All Atlas Ascenseurs elevators are fully compliant with Euro-Moroccan safety standards and come with the necessary certifications. Safety is at the core of every product we offer.'],
  ['Can I customize the cabin design?', 'Yes. We offer extensive customization options including cabin finishes, lighting, door styles, flooring, and control panels. Our design team will help you achieve the exact look and feel you envision.'],
];

export const frNavLinks = [
  { label: 'À Propos', to: '/about' },
  { label: 'Personnalisation 3D', to: '/configurator' },
  { label: 'Service & Maintenance', to: '/service' },
  { label: 'Nos Projets', to: '/projects' },
];

export const frElevatorMenuLinks = {
  residential: [
    { label: 'Ascenseurs Circulaires', to: '/elevators/circular-elevators' },
    { label: 'Ascenseurs Extérieurs', to: '/elevators/exterior-elevators' },
    { label: 'Gamme Astoria', to: '/elevators/astoria-range' },
    { label: 'Gamme COMO', to: '/elevators/como-range' },
  ],
  commercial: [
    { label: 'Ascenseurs Hospitaliers', to: '/elevators/hospital-lifts' },
    { label: 'Monte-voitures', to: '/elevators/car-lifts' },
    { label: 'Escalators / Trottoirs Roulants', to: '/elevators/escalators-walkways' },
    { label: 'COMO Commercial', to: '/elevators/como-commercial' },
    { label: 'Monte-charges', to: '/elevators/cargo-lifts' },
    { label: 'Monte-plats', to: '/elevators/dumbwaiter-lifts' },
  ],
};

export const frCabinMenuLinks = [
  { label: 'Design Cabine', to: '/cabin-design' },
  { label: 'Galerie d’Inspiration', to: '/inspiration-gallery' },
  { label: 'Collections de Portes', to: '/door-collections' },
];

export const frStats = [
  { value: '70', suffix: '+', label: 'Années d’Histoire' },
  { value: '500', suffix: '+', label: 'Installations au Maroc' },
  { value: '24', suffix: '/7', label: 'Support d’Urgence' },
  { value: '10', suffix: '+', label: 'Villes Couvertes' },
];

export const frWhyCards = [
  {
    number: '01',
    title: 'Service Complet',
    text: 'De la première consultation à l’installation, la certification, la maintenance et le support d’urgence, Atlas Ascenseurs prend en charge tout le cycle de vie de l’ascenseur.',
  },
  {
    number: '02',
    title: 'Installation Rapide',
    text: 'Les structures modulaires et les cabines finies en usine réduisent les travaux sur site et raccourcissent les délais d’installation.',
  },
  {
    number: '03',
    title: 'Sécurité Avant Tout',
    text: 'Chaque ascenseur est défini autour d’exigences strictes de sécurité euro-marocaines, de composants fiables et de systèmes de protection clairs.',
  },
  {
    number: '04',
    title: '70+ Ans d’Expertise',
    text: 'Porté par des gammes éprouvées et un savoir-faire technique solide, Atlas Ascenseurs conserve l’exigence d’ingénierie tout en améliorant l’expérience client.',
  },
];

export const frElevatorCards = [
  { tag: 'Résidentiel', title: 'Gamme Astoria', desc: 'Ascenseurs intérieurs élégants pour villas et appartements. Cabine, éclairage et finitions entièrement personnalisables.', image: imagePaths.elevators.astoria },
  { tag: 'Résidentiel', title: 'Ascenseurs Circulaires', desc: 'Une pièce architecturale forte pour la maison. Panoramique, raffinée et immédiatement reconnaissable.', image: imagePaths.elevators.circular },
  { tag: 'Résidentiel', title: 'Ascenseurs Extérieurs', desc: 'Solutions extérieures résistantes aux intempéries pour jardins, terrasses et accès en façade.', image: imagePaths.elevators.exterior },
  { tag: 'Commercial', title: 'COMO Commercial', desc: 'Ascenseurs haute performance pour bureaux, hôtels et bâtiments à fort trafic.', image: imagePaths.elevators.commercial },
  { tag: 'Commercial', title: 'Ascenseurs Hospitaliers & Monte-charges', desc: 'Solutions spécialisées pour environnements médicaux et besoins logistiques industriels.', image: imagePaths.elevators.cargo },
  { tag: 'Commercial', title: 'Escalators & Trottoirs Roulants', desc: 'Mouvements fluides et fiables pour centres commerciaux, aéroports et grands espaces publics.', image: imagePaths.elevators.escalator },
];

export const frResidentialElevators = [
  ['A', 'Gamme Astoria', 'Ascenseur résidentiel intérieur pour villas, maisons et appartements. Le concept Astoria utilise une structure autoportante en aluminium, des finitions raffinées, une installation compacte et un aspect premium sans gros travaux structurels.', imagePaths.elevators.astoria],
  ['C', 'COMO Résidentiel', 'Une solution résidentielle flexible pour un usage quotidien modéré. Les options hydrauliques et électriques optimisent l’espace de gaine et permettent une cabine plus généreuse même dans les maisons compactes.', imagePaths.elevators.comoResidential],
  ['O', 'Ascenseurs Circulaires', 'Ascenseurs panoramiques circulaires conçus comme des pièces architecturales. Verre clair, fumé ou dépoli, structures en acier inoxydable ou laquées, sols, mains courantes et éclairage personnalisables.', imagePaths.elevators.circular],
  ['X', 'Ascenseurs Extérieurs', 'Ascenseurs extérieurs pour terrasses, jardins, maisons à niveaux décalés et propriétés en pente. Structures résistantes aux intempéries, options vitrées et empreinte compacte.', imagePaths.elevators.exterior],
  ['P', 'Cabines Panoramiques & Vitrées', 'Les cabines vitrées et panoramiques apportent lumière, visibilité et présence design aux maisons, hôtels et intérieurs commerciaux premium.', imagePaths.projects.circular],
  ['D', 'Portes & Finitions Cabine', 'Portes automatiques simple ou double battant, portes manuelles, finitions métalliques, tons bois, couleurs modernes, sols, éclairage et panneaux de commande sur mesure.', imagePaths.elevators.doors],
];

export const frCommercialElevators = [
  ['B', 'COMO Commercial', 'Ascenseurs passagers gearless tout électriques pour bureaux, hôtels, bâtiments publics et espaces commerciaux. Conception modulaire, cabines raffinées, secours UPS et capacités configurables pour un usage intensif.', imagePaths.elevators.commercial],
  ['E', 'Escalators & Trottoirs Roulants', 'Solutions de circulation continue pour centres commerciaux, aéroports, gares, supermarchés et infrastructures publiques, avec construction robuste et systèmes de sécurité avancés.', imagePaths.elevators.escalator],
  ['V', 'Monte-voitures', 'Ascenseurs pour garages privés, showrooms, parkings et bâtiments de service. Configurations adaptées aux véhicules légers, lourds et très lourds.', imagePaths.elevators.car],
  ['F', 'Monte-charges', 'Ascenseurs de fret pour entrepôts, usines, réserves commerciales et bâtiments industriels. Cabines renforcées, accès pratique et technologie fiable pour la logistique quotidienne.', imagePaths.elevators.cargo],
  ['H', 'Ascenseurs Hospitaliers', 'Ascenseurs pour patients, visiteurs, lits et personnel médical. Cabines larges, déplacement doux, surfaces hygiéniques et gestion du trafic hospitalier.', imagePaths.elevators.hospitalCargo],
  ['S', 'Monte-plats', 'Petits ascenseurs de service pour restaurants, hôtels, cliniques, villas et back-office. Ils déplacent repas, linge, documents et fournitures entre les étages.', imgElevatorDumbwaiterService],
];

export const frProjects = [
  { category: 'Résidentiel - Marrakech', title: 'Villa Palmeraie', desc: 'Ascenseur résidentiel sur mesure pour une villa de luxe dans le quartier de la Palmeraie.', image: imagePaths.projects.villa },
  { category: 'Commercial - Casablanca', title: 'Atlas Vétérinaire', desc: 'Installation d’un ascenseur adapté à une clinique vétérinaire à Casablanca.', image: imagePaths.projects.veterinary },
  { category: 'Résidentiel - Rabat', title: 'Ascenseur Circulaire', desc: 'Ascenseur panoramique circulaire pour une résidence moderne dans le quartier diplomatique de Rabat.', image: imagePaths.projects.circular },
  { category: 'Extérieur - Tanger', title: 'Ascenseur Extérieur', desc: 'Ascenseur extérieur résistant aux intempéries pour une propriété résidentielle en pente à Tanger.', image: imagePaths.projects.outdoor },
  { category: 'Hôtellerie - Agadir', title: 'Marina Agadir', desc: 'Suite d’ascenseurs commerciaux pour un complexe hôtelier en front de marina à Agadir.', image: imagePaths.projects.marina },
  { category: 'Hôtellerie - Marrakech', title: 'Amalkis Golf Resort', desc: 'Installation multi-ascenseurs pour un resort de golf premium à Marrakech.', image: imagePaths.projects.golf },
];

export const frServices = [
  ['01', 'Maintenance Préventive', 'Inspection et entretien planifiés pour éviter les pannes avant qu’elles ne surviennent. Nos techniciens contrôlent les composants mécaniques, électriques et de sécurité.', 'Plans mensuels - trimestriels - annuels disponibles', imgElevatorAstoriaInterior],
  ['02', 'Support d’Urgence 24/7', 'Disponibilité permanente pour les pannes urgentes et incidents techniques. Notre équipe intervient rapidement dans les villes couvertes.', 'Couverture nationale - intervention prioritaire', imgServiceEmergencySupport],
  ['03', 'Modernisation & Mise à Niveau', 'Redonnez vie aux anciens ascenseurs. Nous modernisons commandes, cabines et composants selon les normes actuelles, sans remplacement complet.', 'Solution rentable - arrêt réduit', imgServiceModernizationUpgrade],
  ['04', 'Inspections & Certification', 'Inspections officielles et certification de conformité selon les normes euro-marocaines. Nous prenons en charge les documents et exigences réglementaires.', 'Conformité complète garantie', imgServiceInspectionCertification],
];

export const frFaqs = [
  ['Combien de temps dure l’installation ?', 'La plupart des installations résidentielles prennent entre 3 et 5 jours. Les projets commerciaux varient selon le périmètre et les spécifications du bâtiment. Notre équipe vous donnera un planning précis pendant la consultation.'],
  ['Intervenez-vous hors Casablanca ?', 'Oui. Atlas Ascenseurs intervient à Casablanca, Rabat, Marrakech, Tanger, Agadir, Fès et dans les principales villes du Maroc.'],
  ['Quelles options de maintenance proposez-vous ?', 'Nous proposons des contrats flexibles avec inspections mensuelles, trimestrielles ou annuelles. Tous les contrats incluent le support d’urgence 24/7 et une intervention prioritaire.'],
  ['Vos ascenseurs respectent-ils les normes marocaines ?', 'Absolument. Tous les ascenseurs Atlas Ascenseurs sont conformes aux standards de sécurité euro-marocains et livrés avec les certifications nécessaires.'],
  ['Puis-je personnaliser le design de la cabine ?', 'Oui. Nous proposons de nombreuses options: finitions cabine, éclairage, portes, sol et panneaux de commande. Notre équipe design vous aide à obtenir le rendu souhaité.'],
];

export function localized(language, enValue, frValue) {
  return language === 'fr' ? frValue : enValue;
}

export const getNavLinks = (language) => localized(language, navLinks, frNavLinks);
export const getElevatorMenuLinks = (language) => localized(language, elevatorMenuLinks, frElevatorMenuLinks);
export const getCabinMenuLinks = (language) => localized(language, cabinMenuLinks, frCabinMenuLinks);
export const getStats = (language) => localized(language, stats, frStats);
export const getWhyCards = (language) => localized(language, whyCards, frWhyCards);
export const getElevatorCards = (language) => localized(language, elevatorCards, frElevatorCards);
export const getResidentialElevators = (language) => localized(language, residentialElevators, frResidentialElevators);
export const getCommercialElevators = (language) => localized(language, commercialElevators, frCommercialElevators);
export const getProjects = (language) => localized(language, projects, frProjects);
export const getServices = (language) => localized(language, services, frServices);
export const getFaqs = (language) => localized(language, faqs, frFaqs);
