import logo from '../assets/images/logos/atlas ascenseur.png';
import heroImage from '../assets/images/hero/elevator-hero.svg';
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

const withFallback = (src, fallback) => ({ src, fallback });

export const imagePaths = {
  logos: {
    main: withFallback(
      logo,
      'https://dummyimage.com/440x160/080808/c9a84c&text=Atlas+Ascenseurs',
    ),
  },
  hero: {
    main: withFallback(
      heroImage,
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=80',
    ),
  },
  elevators: {
    astoria: withFallback(
      astoriaImage,
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    ),
    circular: withFallback(
      circularImage,
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    ),
    exterior: withFallback(
      exteriorImage,
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ),
    commercial: withFallback(
      commercialImage,
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    ),
    hospitalCargo: withFallback(
      hospitalCargoImage,
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    ),
    escalator: withFallback(
      escalatorImage,
      'https://images.unsplash.com/photo-1567954970774-58d6aa6c50dc?auto=format&fit=crop&w=1200&q=80',
    ),
  },
  projects: {
    villa: withFallback(
      villaProject,
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    ),
    veterinary: withFallback(
      vetProject,
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    ),
    circular: withFallback(
      circularProject,
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80',
    ),
    outdoor: withFallback(
      outdoorProject,
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    ),
    marina: withFallback(
      marinaProject,
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    ),
    golf: withFallback(
      golfProject,
      'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=1200&q=80',
    ),
  },
};

export const navLinks = [
  { label: 'About', to: '/about' },
  { label: '3D Personalization', to: '/configurator' },
  { label: 'Service & Maintenance', to: '/service' },
  { label: 'Our Projects', to: '/projects' },
];

export const residentialLinks = ['Circular Elevators', 'Exterior Elevators', 'Astoria Range', 'Como Range'];
export const commercialLinks = ['Hospital Lifts', 'Car Lifts', 'Escalators / Walkways', 'Como Commercial', 'Cargo Lifts', 'Dumbwaiter Lifts'];

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
  { tag: 'Commercial', title: 'Hospital & Cargo Lifts', desc: 'Specialized lifts engineered for healthcare environments and industrial logistics needs.', image: imagePaths.elevators.hospitalCargo },
  { tag: 'Commercial', title: 'Escalators & Walkways', desc: 'Smooth, reliable moving infrastructure for malls, airports, and large public spaces.', image: imagePaths.elevators.escalator },
];

export const residentialElevators = [
  ['A', 'Astoria Range', 'Elegant indoor home elevators for villas, townhouses, and apartments. The Astoria concept uses a self-supporting aluminum tower, refined cabin finishes, compact installation logic, and a premium residential look without heavy structural work.'],
  ['C', 'COMO Residential', 'A flexible residential lift family for moderate daily use. Hydraulic and electric drive options optimize shaft space, creating larger cabins even in compact homes while keeping the ride smooth, quiet, and reliable.'],
  ['O', 'Circular Elevators', 'Panoramic circular lifts designed as architectural centerpieces. Clear, smoked, or frosted glass, stainless steel or coated structures, custom flooring, railings, and lighting help the elevator become part of the interior design.'],
  ['X', 'Exterior Elevators', 'Outdoor lifts for terraces, gardens, split-level homes, and hillside properties. Weather-ready shaft structures, glass options, and compact footprints make accessibility possible without compromising the architecture.'],
  ['P', 'Panoramic & Glass Cabins', 'Glass cabin and panoramic lift options bring light, visibility, and a strong design presence to homes, hospitality projects, and premium commercial interiors.'],
  ['D', 'Doors & Cabin Finishes', 'Automatic single swing doors, automatic double swing doors, manual handle doors, metallic finishes, wood tones, bright modern colors, flooring, lighting, and control panels can be combined into a made-to-measure cabin.'],
];

export const commercialElevators = [
  ['B', 'COMO Commercial', 'Gearless all-electric passenger elevators for offices, hotels, public buildings, and commercial properties. Modular shaft design, refined cabin options, UPS emergency release, and configurable load capacities support demanding daily use.'],
  ['E', 'Escalators & Walkways', 'Continuous movement solutions for malls, airports, stations, supermarkets, and public infrastructure. Robust truss construction, anti-slip surfaces, anti-corrosion materials, and advanced safety systems create smooth high-volume flow.'],
  ['V', 'Car Lifts', 'Vehicle lifts for private garages, showrooms, parking facilities, and service buildings. Configurations can support light, heavy, and very heavy vehicles with automatic doors, protective bump rails, and adaptable speeds.'],
  ['F', 'Cargo Lifts', 'Machine-room-less freight elevators for warehouses, factories, retail back-of-house areas, and industrial buildings. Heavy-load models, regenerative energy options, stand-by systems, and quiet gearless technology improve logistics performance.'],
  ['H', 'Hospital Lifts', 'Healthcare elevators for patients, visitors, beds, and medical staff. Wide cabins, smooth travel, hygienic surfaces, traffic-ready gearless systems, and speeds from 1 m/s up to 2.5 m/s support demanding hospital circulation.'],
  ['S', 'Dumbwaiter Lifts', 'Compact service lifts for restaurants, hotels, clinics, villas, and back-office operations. They move meals, laundry, documents, and supplies efficiently between floors while reducing staff travel and energy use.'],
];

export const projects = [
  { category: 'Residential - Marrakech', title: 'Villa Palmeraie', desc: 'Custom residential elevator for a luxury villa in the Palmeraie district.', image: imagePaths.projects.villa },
  { category: 'Commercial - Casablanca', title: 'Atlas Veterinaire', desc: 'Medical-grade lift installation for a veterinary clinic in Casablanca.', image: imagePaths.projects.veterinary },
  { category: 'Residential - Rabat', title: 'Circular Elevator', desc: 'Panoramic circular lift for a modern residence in the diplomatic quarter of Rabat.', image: imagePaths.projects.circular },
  { category: 'Outdoor - Tangier', title: 'Outdoor Elevator', desc: 'Weatherproof external lift for a hillside residential property in Tangier.', image: imagePaths.projects.outdoor },
  { category: 'Hospitality - Agadir', title: 'Marina Agadir', desc: 'Commercial elevator suite for a marina-front hotel complex in Agadir.', image: imagePaths.projects.marina },
  { category: 'Hospitality - Marrakech', title: 'Amalkis Golf Resort', desc: 'Multi-unit elevator installation for a premium golf resort in Marrakech.', image: imagePaths.projects.golf },
];

export const services = [
  ['01', 'Preventive Maintenance', 'Scheduled inspection and servicing to prevent breakdowns before they happen. Our technicians conduct systematic checks on all mechanical, electrical, and safety components.', 'Monthly - Quarterly - Annual plans available'],
  ['02', '24/7 Emergency Support', 'Round-the-clock availability for urgent breakdowns and technical incidents. Our response team is deployed rapidly across all cities we serve.', 'Nationwide coverage - Priority response'],
  ['03', 'Modernization & Upgrades', 'Breathe new life into aging elevator systems. We upgrade controls, cabins, and mechanical components to current safety and performance standards - without full replacement.', 'Cost-effective - Minimal downtime'],
  ['04', 'Inspections & Certification', 'Official safety inspections and compliance certification in accordance with Euro-Moroccan norms. We handle all documentation and regulatory requirements on your behalf.', 'Full compliance guaranteed'],
];

export const faqs = [
  ['How long does installation take?', 'Most residential elevator installations take between 3 to 5 days. Commercial projects vary depending on scope and building specifications. Our team will give you a precise timeline during the consultation phase.'],
  ['Do you operate outside Casablanca?', 'Yes. Atlas Ascenseurs operates in Casablanca, Rabat, Marrakech, Tangier, Agadir, Fes, and all major Moroccan cities. We have a nationwide team ready to assist you.'],
  ['What maintenance options do you offer?', 'We offer flexible maintenance contracts including monthly, quarterly, and annual inspection plans. All contracts include 24/7 emergency breakdown support and priority response.'],
  ['Are elevators compliant with Moroccan safety norms?', 'Absolutely. All Atlas Ascenseurs elevators are fully compliant with Euro-Moroccan safety standards and come with the necessary certifications. Safety is at the core of every product we offer.'],
  ['Can I customize the cabin design?', 'Yes. We offer extensive customization options including cabin finishes, lighting, door styles, flooring, and control panels. Our design team will help you achieve the exact look and feel you envision.'],
];
