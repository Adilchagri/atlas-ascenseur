import logo from '../assets/images/logos/atlas ascenseur.png';
import heroImage from '../assets/images/hero/elevator-hero.svg';
import homeBackgroundImage from '../assets/images/hero/home_bqckgound.png';
import astoriaImage from '../assets/images/elevators/astoria.svg';
import circularImage from '../assets/images/elevators/circular.svg';
import exteriorImage from '../assets/images/elevators/exterior.svg';
import commercialImage from '../assets/images/elevators/commercial.svg';
import hospitalCargoImage from '../assets/images/elevators/hospital-cargo.svg';
import escalatorImage from '../assets/images/elevators/escalator.svg';
import imgHeroElevatorLuxury from '../assets/images/library/hero-elevator-luxury.jpg';
import imgElevatorAstoriaInterior from '../assets/images/library/elevator-astoria-interior.jpg';
import imgElevatorCircularGlass from '../assets/images/library/elevator-circular-glass.jpg';
import imgElevatorExteriorTower from '../assets/images/library/elevator-exterior-tower.jpg';
import imgElevatorCommercialLobby from '../assets/images/library/elevator-commercial-lobby.jpg';
import imgElevatorHospitalCargo from '../assets/images/library/elevator-hospital-cargo.jpg';
import imgElevatorEscalatorWalkway from '../assets/images/library/elevator-escalator-walkway.jpg';
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
import comoRangeWelcomeImage from '../assets/images/como_range/como-range_picture_welcome-page.jpeg';

const withFallback = (src, fallback) => fallback || src;

function galleryFrom(modules) {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([, src]) => src);
}

function galleriesByCabin(modules) {
  return Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .reduce((groups, [path, src]) => {
      const match = path.match(/como_range\/cabine([^/]+)\//);
      if (!match) return groups;
      const id = match[1];
      return { ...groups, [id]: [...(groups[id] ?? []), src] };
    }, {});
}

const astoriaGallery = galleryFrom(import.meta.glob('../assets/images/astoria_range/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const comoCabinImages = galleriesByCabin(import.meta.glob('../assets/images/como_range/cabine*/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const circularGallery = galleryFrom(import.meta.glob('../assets/images/circular_elevators/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const exteriorGallery = galleryFrom(import.meta.glob('../assets/images/exterior_elevators/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const comoCommercialGallery = galleryFrom(import.meta.glob('../assets/images/Como_Commercial_Range/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const escalatorGallery = galleryFrom(import.meta.glob('../assets/images/escalators/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const carLiftGallery = galleryFrom(import.meta.glob('../assets/images/car-lifts/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const cargoGallery = galleryFrom(import.meta.glob('../assets/images/Cargo Lifts/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const doorGallery = galleryFrom(import.meta.glob('../assets/images/Doors/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const inspirationGallery = galleryFrom(import.meta.glob('../assets/images/Inspiration Gallery/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' }));
const projectVideos = galleryFrom(import.meta.glob('../assets/images/videos_our_projects/*.mp4', { eager: true, import: 'default' }));

const comoCabinSpecs = [
  { id: '208', specs: [['Ceiling', 'C203 hairline stainless steel with LED ceiling light'], ['COP', 'COP43-00 dot matrix display with hairline stainless steel faceplate'], ['Cabin Walls', 'CAR208 hairline stainless steel'], ['Cabin Door', 'L01-00 hairline stainless steel']] },
  { id: '215', specs: [['Ceiling', 'C216 mirror stainless steel with acrylic translucent panel'], ['COP', 'CP07 integrated control panel'], ['Cabin Walls', 'CAR215 with hairline stainless steel side walls, hairline stainless steel front wall, and mirror stainless steel back panels around a white wood-grain steel center panel'], ['Corner Panels', 'Mirror stainless steel'], ['Guardrail', 'Black titanium mirror stainless steel with black titanium screws'], ['Skirting', 'Hairline stainless steel'], ['Control Box Panel', 'Black titanium stainless steel with mirror stainless steel center'], ['Cabin Door', 'Hairline stainless steel'], ['Welcome Pedal', 'Yellow light illumination']] },
  { id: '314', specs: [['Ceiling', 'White film-faced ceiling panel with rose gold aluminum alloy frame and LED strip lighting'], ['COP', 'COP12 long-rectangle fingerprint panel with rose gold stainless steel frame'], ['Cabin Walls', 'CAR314 with sandblasted stainless steel plated in rose gold, rose gold upper decoration strips, matching handrail strips, and mirror-finish stainless steel lower decoration strips'], ['Cabin Door', 'Mirror stainless steel plated in rose gold'], ['Flooring', 'Marble with brass strips']] },
  { id: '315', specs: [['Ceiling', 'Beige film-fixed ceiling panel with champagne gold sand-bead stainless steel decorative frame, champagne gold film-facial frame, concealed lighting trough, and spotlights'], ['COP', 'COP12S black glass panel with segmented display'], ['Cabin Walls', 'FA02 wall, PA01 wall, side walls, and rear wall in mirror-finish stainless steel plated in rose gold with fine-faced champagne gold finish on the rear wall'], ['Cabin Door', 'Mirror-finish stainless steel plated in rose gold'], ['Baseboard', 'Stainless-steel baseboard plated in rose gold'], ['Flooring', 'Marble with brass strips']] },
  { id: '316', specs: [['Ceiling', 'Sand-bead stainless steel with black titanium coating, concealed lighting trough, and spotlights'], ['COP', 'COP12 black glass panel with segmented display'], ['Cabin Walls', 'FA02 wall, PA01 wall, and side walls in mirror-finish stainless steel with black titanium sand-bead stainless-steel protective handrail; rear wall in black titanium sand-bead stainless steel with decorative mirror and sand-bead stainless-steel pattern'], ['Cabin Door', 'Mirror-finish stainless steel'], ['Baseboard', 'Sand-bead stainless steel with black titanium coating'], ['Handrail', 'Standard stainless-steel handrail with black titanium coating'], ['Flooring', 'Sintered stone']] },
  { id: '317', specs: [['Ceiling', 'White film-fixed finish panel with concealed lighting trough and spotlights'], ['COP', 'COP12P gold glass panel with segmented display'], ['Cabin Walls', 'Light wood finish film-fixed texture panels on FA02 wall, PA01 wall, and side walls; rear wall with mirror panel, gold sand-bead stainless-steel panel, gold fine-faced panel, and carved mirror-finish decorative groove'], ['Cabin Door', 'Mirror-finish stainless steel'], ['Baseboard', 'Hairline-finish stainless steel coated in gold'], ['Handrail', 'Standard round stainless-steel handrail with gold coating and fine-faced texture'], ['Flooring', 'Sintered stone']] },
  { id: '318', specs: [['Ceiling', 'Flat bead-finish fixed ceiling panel with champagne gold stainless-steel firm frame, concealed light trough, and spotlights'], ['COP', 'COP12 gold glass panel with segmented display'], ['Cabin Walls', 'Sand-bead stainless steel coated in champagne gold on FA02 wall, PA01 wall, side wall, and rear wall with marble-texture metal sheet decoration plate'], ['Cabin Door', 'Sand-bead stainless steel coated in champagne gold'], ['Baseboard', 'Sand-bead stainless steel coated in champagne gold'], ['Handrail', 'Standard round stainless-steel handrail in champagne-gold brushed finish with horizontal single-flat shape'], ['Flooring', 'Sintered stone']] },
  { id: '319', specs: [['Ceiling', 'Rose gold metallic texture flat fixed ceiling panel with black titanium metallic texture firm frame, concealed light trough, and spotlights'], ['COP', 'COP12 black glass panel with segmented display'], ['Cabin Walls', 'Black titanium metallic texture on FA02 wall, PA01 wall, side wall, and rear wall with marble-texture metal sheet decoration plates on the side and rear walls'], ['Cabin Door', 'Black titanium metallic texture film finish'], ['Baseboard', 'Black titanium metallic texture film finish'], ['Handrail', 'Standard round stainless-steel handrail with black titanium metallic texture'], ['Flooring', 'Cloud gray PVC']] },
  { id: '320', specs: [['Ceiling', 'Flat fixed ceiling panel with hairline stainless-steel frame, concealed light trough, and spotlights'], ['COP', 'COP12 black glass panel with segmented display'], ['Cabin Walls', 'Champagne gold hairline stainless steel on FA02 wall, PA01 wall, side wall, and rear wall with imitation wood-grain decorative panels and flower-shaped rear decoration'], ['Cabin Door', 'Hairline stainless steel coated in champagne gold'], ['Baseboard', 'Hairline stainless steel coated in champagne gold'], ['Handrail', 'Standard round stainless-steel handrail in champagne-gold brushed finish'], ['Flooring', 'Marble']] },
  { id: '321', specs: [['Ceiling', 'Mirrored stainless steel with alloy mirror and spotlights'], ['COP', 'COP12 black glass panel with segmented display'], ['Cabin Walls', 'Mirror stainless steel coated in black titanium on FA02 wall, sand-bead stainless steel coated in black titanium with alloy decorative plates on PA01 and side walls, and patterned black titanium sand-bead stainless steel on the rear wall'], ['Cabin Door', 'Mirror stainless steel coated in black titanium'], ['Baseboard', 'Sand-bead stainless steel coated in black titanium'], ['Handrail', 'Standard round stainless-steel handrail in mirror black titanium'], ['Flooring', 'Sintered stone']] },
  { id: '413', specs: [['Ceiling', 'C119 white spray-painted steel plate with champagne gold edge and LED lighting'], ['COP', 'CP120 LED single-panel display with mirror stainless steel frame'], ['Cabin Walls', 'CAR13 with champagne gold-plated hairline stainless steel side walls, champagne gold-plated mirror stainless steel front wall, and beige mirror-finish integrated steel center panel on the back wall'], ['Guardrail', 'Champagne gold mirror stainless steel'], ['Skirting', 'Champagne gold hairline stainless steel'], ['Cabin Door', 'Champagne gold hairline stainless steel'], ['Welcome Pedal', 'Yellow light illumination']] },
  { id: '415', specs: [['Ceiling', 'C230 mirror stainless steel with LED light strip'], ['COP', 'COP12B black glass panel with dot matrix display'], ['Cabin Walls', 'Hairline stainless steel front wall, golden oak wood and wood-grain metal plate side walls, and rear wall with mirror stainless steel side panels plus golden oak wood-grain metal decoration plate'], ['Cabin Door', 'Hairline stainless steel'], ['Flooring', 'F108 moonlight beige PVC']] },
  { id: '416', specs: [['Ceiling', 'C121 ripple mirror stainless steel plated in champagne gold with LED light strip'], ['COP', 'CP121 matrix display with stainless steel frame'], ['Cabin Walls', 'CAR416 with sandblasted stainless steel plated in champagne gold on side walls and a back wall with sintered stone center plate plus champagne gold mirror stainless steel side panels'], ['Guardrail', 'Champagne gold mirror stainless steel'], ['Skirting', 'Champagne gold hairline stainless steel'], ['Cabin Door', 'Hairline stainless steel'], ['Flooring', 'F103 PVC']] },
  { id: '505', specs: [['Ceiling', 'CS11 center honeycomb aluminum panel with aluminum alloy frame and LED strip lighting'], ['COP', 'COP10 LED single-panel display with black powder stainless steel frame'], ['Cabin Walls', 'CAR503 with black titanium mirror stainless steel upper panels, rose gold aluminum alloy middle frame, wood-pattern steel lower panels, and wood-pattern steel side and rear panels'], ['Cabin Door', 'D07 aluminum alloy plated with black titanium and wood-pattern fingerprint finish'], ['Flooring', 'PD37 marble'], ['Welcome Pedal', 'Yellow light illumination']] },
  { id: '506', specs: [['Ceiling', 'CS11 center honeycomb aluminum panel with aluminum alloy frame and LED strip lighting'], ['COP', 'COP10 LED single-panel display with black powder stainless steel frame'], ['Cabin Walls', 'CAR506 with rose gold mirror stainless steel upper panels, rose gold aluminum alloy middle frame, wood-pattern steel lower panels, black titanium pattern stainless steel side walls, and mirror stainless steel rear wall with curve pattern'], ['Cabin Door', 'L15 standard hairline stainless steel in white gold'], ['Flooring', 'PD37 marble'], ['Welcome Pedal', 'Yellow light illumination']] },
  { id: '90-02', specs: [['Ceiling', 'C212 mirror stainless steel plated in rose gold with ultra-thin ceiling light protruding 10mm'], ['COP', 'COP43-04 hairline stainless steel plated in rose gold'], ['Cabin Walls', 'CW03-35 with mirror stainless steel plated in rose gold on front and rear walls and hairline stainless steel plated in rose gold on side walls'], ['Cabin Door', 'L01-08 mirror stainless steel plated in rose gold'], ['Flooring', 'F02-06 marble medallion']] },
];

export const comoCabins = comoCabinSpecs.map((cabin) => ({
  ...cabin,
  title: `Cabin ${cabin.id}`,
  slug: `cabine-${cabin.id}`,
  to: `/elevators/como-range/cabine-${cabin.id}`,
  images: comoCabinImages[cabin.id] ?? [],
  image: comoCabinImages[cabin.id]?.[0],
}));

const comoResidentialGallery = comoCabins.flatMap((cabin) => cabin.images);
const primaryComoCabinImage = comoCabins.find((cabin) => cabin.image)?.image ?? imgElevatorAstoriaInterior;

export const imagePaths = {
  logos: {
    main: logo,
  },
  hero: {
    main: withFallback(heroImage, homeBackgroundImage),
  },
  elevators: {
    astoria: astoriaRange1,
    comoResidential: comoRangeWelcomeImage,
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
    villa: astoriaRange3,
    veterinary: comoCabins[3]?.image ?? primaryComoCabinImage,
    circular: circularLift3,
    outdoor: circularLift5,
    marina: comoCabins[1]?.image ?? primaryComoCabinImage,
    golf: astoriaRange5,
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
    astoriaRange3,
    comoCabins[1]?.image ?? primaryComoCabinImage,
    circularLift5,
    imgElevatorExteriorTower,
    imgElevatorHospitalCargo,
    imgPageFaqConsultation,
  ],
  inspiration: inspirationGallery,
  door: doorGallery,
};

export const libraryCabinImages = {
  signature: astoriaRange3,
  panoramic: imgElevatorCircularGlass,
  contemporary: imgElevatorAstoriaInterior,
  commercial: imgElevatorCommercialLobby,
  clinical: imgElevatorHospitalCargo,
  outdoor: imgElevatorExteriorTower,
  luxuryBanner: imgHeroElevatorLuxury,
};

export const projects = [
  { category: 'Residential - Marrakech', title: 'Palmeraie Marrakech', desc: 'Custom residential elevator for a luxury villa in the Palmeraie district.', video: projectVideos[0], image: imagePaths.projects.villa },
  { category: 'Commercial - Casablanca', title: 'Anfa Casablanca', desc: 'Medical-grade lift installation for a professional space in Casablanca.', video: projectVideos[1], image: imagePaths.projects.veterinary },
  { category: 'Residential - Rabat', title: 'Souissi Rabat', desc: 'Panoramic circular lift for a modern residence in Rabat.', video: projectVideos[2], image: imagePaths.projects.circular },
  { category: 'Outdoor - Tangier', title: 'Malabata Tanger', desc: 'Weatherproof external lift for a hillside residential property in Tangier.', video: projectVideos[3], image: imagePaths.projects.outdoor },
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
  { category: 'Résidentiel - Marrakech', title: 'Palmeraie Marrakech', desc: 'Ascenseur résidentiel sur mesure pour une villa de luxe dans le quartier de la Palmeraie.', video: projectVideos[0], image: imagePaths.projects.villa },
  { category: 'Commercial - Casablanca', title: 'Anfa Casablanca', desc: 'Installation d’un ascenseur adapté à un espace professionnel à Casablanca.', video: projectVideos[1], image: imagePaths.projects.veterinary },
  { category: 'Résidentiel - Rabat', title: 'Souissi Rabat', desc: 'Ascenseur panoramique circulaire pour une résidence moderne à Rabat.', video: projectVideos[2], image: imagePaths.projects.circular },
  { category: 'Extérieur - Tanger', title: 'Malabata Tanger', desc: 'Ascenseur extérieur résistant aux intempéries pour une propriété résidentielle en pente à Tanger.', video: projectVideos[3], image: imagePaths.projects.outdoor },
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
