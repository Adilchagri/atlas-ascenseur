import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  comoCabins,
  getCommercialElevators,
  getFaqs,
  getResidentialElevators,
  getServices,
  imagePaths,
  pageImages,
} from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

const SITE_URL = 'https://www.atlasascenseurs.com';
const SITE_NAME = 'Atlas Ascenseurs';
const DEFAULT_IMAGE = pageImages.luxuryBanner || imagePaths.logos.main;
const BUSINESS_PHONE = '+212666323055';
const BUSINESS_EMAIL = 'contact@atlasascenseurs.ma';
const BUSINESS_ADDRESS = {
  streetAddress: '23 Rue 2, Lot Les Arenes 2, Etage, Suite 10, Racine',
  addressLocality: 'Casablanca',
  addressRegion: 'Casablanca-Settat',
  postalCode: '20250',
  addressCountry: 'MA',
};

const localAreas = ['Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Agadir', 'Fes', 'Morocco'];
const localAreaSchemas = localAreas.map((area) => ({
  '@type': area === 'Morocco' ? 'Country' : 'City',
  name: area,
}));

const coreKeywords = {
  en: [
    'Atlas Ascenseurs',
    'elevator Morocco',
    'residential elevator Morocco',
    'villa elevator Morocco',
    'home lift Morocco',
    'private elevator Morocco',
    'elevator installation Casablanca',
    'elevator maintenance Casablanca',
    'elevator company Casablanca',
  ],
  fr: [
    'Atlas Ascenseurs',
    'ascenseur Maroc',
    'ascenseur résidentiel Maroc',
    'ascenseur villa Maroc',
    'home lift Maroc',
    'ascenseur privatif Maroc',
    'prix ascenseur villa Maroc',
    'installation ascenseur Casablanca',
    'entretien ascenseur Casablanca',
    'ascenseuriste Casablanca',
  ],
};

const defaultSeo = {
  en: {
    title: 'Atlas Ascenseurs - Premium Elevator Solutions in Morocco',
    description: 'Atlas Ascenseurs designs, installs, modernizes, and maintains premium residential and commercial elevator solutions across Morocco.',
  },
  fr: {
    title: 'Atlas Ascenseurs - Ascenseurs Premium au Maroc',
    description: 'Atlas Ascenseurs conçoit, installe, modernise et maintient des solutions d’ascenseurs résidentiels et commerciaux premium à travers le Maroc.',
  },
};

const routeSeo = {
  '/': {
    en: {
      title: 'Atlas Ascenseurs - Elevators, Home Lifts & Service in Morocco',
      description: 'Atlas Ascenseurs designs, installs, modernizes, and maintains residential elevators, villa lifts, home lifts, and commercial elevators across Morocco.',
    },
    fr: {
      title: 'Atlas Ascenseurs - Ascenseur Maroc, Home Lift & Maintenance',
      description: 'Atlas Ascenseurs conçoit, installe et entretient des ascenseurs résidentiels, ascenseurs de villa, home lifts et solutions commerciales au Maroc.',
    },
  },
  '/about': {
    en: {
      title: 'About Atlas Ascenseurs - Elevator Experts in Morocco',
      description: 'Learn about Atlas Ascenseurs, a Moroccan elevator company focused on reliable engineering, refined design, installation, and maintenance.',
    },
    fr: {
      title: 'À Propos - Atlas Ascenseurs au Maroc',
      description: 'Découvrez Atlas Ascenseurs, spécialiste marocain des ascenseurs avec ingénierie fiable, design raffiné, installation et maintenance.',
    },
  },
  '/elevators': {
    en: {
      title: 'Residential Elevators & Villa Lifts in Morocco',
      description: 'Explore residential elevators, villa lifts, home lifts, private elevators, circular lifts, exterior elevators, and commercial lift solutions in Morocco.',
    },
    fr: {
      title: 'Ascenseurs Résidentiels & Ascenseur Villa Maroc',
      description: 'Découvrez nos ascenseurs résidentiels au Maroc: ascenseur villa, home lift, ascenseur privatif, circulaire, extérieur et solutions commerciales.',
    },
  },
  '/elevators/circular-elevators': {
    en: {
      title: 'Circular Panoramic Elevators - Atlas Ascenseurs',
      description: 'Circular panoramic elevators designed as architectural centerpieces for prestigious residential spaces in Morocco.',
    },
    fr: {
      title: 'Ascenseurs Circulaires Panoramiques - Atlas Ascenseurs',
      description: 'Ascenseurs panoramiques circulaires conçus comme des pièces architecturales pour les espaces résidentiels prestigieux au Maroc.',
    },
  },
  '/elevators/exterior-elevators': {
    en: {
      title: 'Exterior Elevators for Villas and Buildings',
      description: 'Elegant, durable, and compact exterior elevators that combine accessibility and design for villas and contemporary buildings.',
    },
    fr: {
      title: 'Ascenseurs Extérieurs pour Villas et Bâtiments',
      description: 'Ascenseurs extérieurs élégants, résistants et peu encombrants pour conjuguer accessibilité et design.',
    },
  },
  '/elevators/astoria-range': {
    en: {
      title: 'Astoria Home Lifts & Villa Elevators in Morocco',
      description: 'Astoria home lifts and villa elevators in Morocco with panoramic aluminum and glass structure, quiet operation, and premium finishes.',
    },
    fr: {
      title: 'Gamme Astoria - Home Lift & Ascenseur Villa Maroc',
      description: 'Ascenseurs panoramiques Astoria pour villas au Maroc: home lift premium, structure aluminium et verre, fonctionnement silencieux et finitions haut de gamme.',
    },
  },
  '/elevators/como-range': {
    en: {
      title: 'COMO Residential Elevators & Home Lifts Morocco',
      description: 'COMO residential elevators and home lifts in Morocco combine design, personalization, compact dimensions, and quiet architectural integration.',
    },
    fr: {
      title: 'COMO Résidentiel - Ascenseur Privatif & Home Lift Maroc',
      description: 'COMO associe ascenseur privatif, home lift Maroc, design, personnalisation et intégration architecturale dans une solution compacte et silencieuse.',
    },
  },
  '/elevators/hospital-lifts': {
    en: {
      title: 'Hospital Lifts - Healthcare Elevator Solutions',
      description: 'Hospital elevators for patients, beds, visitors, and medical staff with wide access, hygienic surfaces, and smooth ride comfort.',
    },
    fr: {
      title: 'Ascenseurs Hospitaliers - Solutions Médicales',
      description: 'Ascenseurs hospitaliers pour patients, lits, visiteurs et personnel médical avec accès larges, surfaces hygiéniques et confort de trajet.',
    },
  },
  '/elevators/car-lifts': {
    en: {
      title: 'Car Lifts for Garages and Parking Buildings',
      description: 'Vehicle lift solutions for private garages, showrooms, parking buildings, and service spaces in Morocco.',
    },
    fr: {
      title: 'Monte-Voitures pour Garages et Parkings',
      description: 'Solutions de monte-voitures pour garages privés, showrooms, parkings et bâtiments de service au Maroc.',
    },
  },
  '/elevators/escalators-walkways': {
    en: {
      title: 'Escalators and Walkways - Atlas Ascenseurs',
      description: 'Escalators and moving walkways for malls, airports, stations, supermarkets, and high-volume public spaces.',
    },
    fr: {
      title: 'Escalators et Trottoirs Roulants - Atlas Ascenseurs',
      description: 'Escalators et trottoirs roulants pour centres commerciaux, aéroports, gares, supermarchés et espaces publics à fort trafic.',
    },
  },
  '/elevators/como-commercial': {
    en: {
      title: 'COMO Commercial Elevators - Atlas Ascenseurs',
      description: 'Commercial passenger elevators for offices, hotels, public buildings, and daily traffic environments.',
    },
    fr: {
      title: 'COMO Commercial - Ascenseurs Professionnels',
      description: 'Ascenseurs passagers commerciaux pour bureaux, hôtels, bâtiments publics et environnements à trafic quotidien.',
    },
  },
  '/elevators/cargo-lifts': {
    en: {
      title: 'Cargo and Freight Lifts - Atlas Ascenseurs',
      description: 'Durable cargo and freight elevator solutions for warehouses, factories, retail stockrooms, and logistics buildings.',
    },
    fr: {
      title: 'Monte-Charges et Ascenseurs de Fret',
      description: 'Solutions de monte-charges durables pour entrepôts, usines, réserves commerciales et bâtiments logistiques.',
    },
  },
  '/elevators/dumbwaiter-lifts': {
    en: {
      title: 'Dumbwaiter Lifts for Restaurants, Hotels, and Villas',
      description: 'Compact dumbwaiter lifts for restaurants, hotels, clinics, villas, and back-of-house service teams.',
    },
    fr: {
      title: 'Monte-Plats pour Restaurants, Hôtels et Villas',
      description: 'Monte-plats compacts pour restaurants, hôtels, cliniques, villas et équipes de service back-office.',
    },
  },
  '/projects': {
    en: {
      title: 'Atlas Ascenseurs Projects Across Morocco',
      description: 'Explore selected Atlas Ascenseurs installations across Morocco, including residential, commercial, exterior, and panoramic elevator projects.',
    },
    fr: {
      title: 'Projets Atlas Ascenseurs au Maroc',
      description: 'Découvrez des installations Atlas Ascenseurs au Maroc: projets résidentiels, commerciaux, extérieurs et ascenseurs panoramiques.',
    },
  },
  '/cabin-design': {
    en: {
      title: 'Cabin Design and Elevator Finishes',
      description: 'Compare elevator cabin styles, materials, lighting moods, finishes, and project fit with Atlas Ascenseurs.',
    },
    fr: {
      title: 'Design Cabine et Finitions d’Ascenseur',
      description: 'Comparez styles de cabine, matériaux, éclairage, finitions et adéquation projet avec Atlas Ascenseurs.',
    },
  },
  '/inspiration-gallery': {
    en: {
      title: 'Elevator Inspiration Gallery - Atlas Ascenseurs',
      description: 'Browse elevator design inspiration for villas, glass interiors, hospitality, medical circulation, outdoor access, and commercial lobbies.',
    },
    fr: {
      title: 'Galerie d’Inspiration Ascenseur - Atlas Ascenseurs',
      description: 'Parcourez des inspirations ascenseur pour villas, intérieurs vitrés, hôtellerie, médical, accès extérieur et lobbys commerciaux.',
    },
  },
  '/door-collections': {
    en: {
      title: 'Elevator Door Collections - Atlas Ascenseurs',
      description: 'Choose elevator door systems based on opening width, traffic, installation type, safety, and landing design.',
    },
    fr: {
      title: 'Collections de Portes d’Ascenseur - Atlas Ascenseurs',
      description: 'Choisissez les portes d’ascenseur selon largeur d’ouverture, trafic, type d’installation, sécurité et design du palier.',
    },
  },
  '/service': {
    en: {
      title: 'Elevator Maintenance Casablanca & Service in Morocco',
      description: 'Atlas Ascenseurs provides elevator maintenance in Casablanca, emergency support, modernization, inspections, and certification across Morocco.',
    },
    fr: {
      title: 'Entretien Ascenseur Casablanca & Maintenance au Maroc',
      description: 'Atlas Ascenseurs assure entretien ascenseur Casablanca, maintenance, urgence, modernisation, inspections et certification à travers le Maroc.',
    },
  },
  '/contact': {
    en: {
      title: 'Elevator Company Casablanca - Contact Atlas Ascenseurs',
      description: 'Contact Atlas Ascenseurs for elevator installation in Casablanca, elevator quotes, maintenance, modernization, and consultation across Morocco.',
    },
    fr: {
      title: 'Ascenseuriste Casablanca - Devis Atlas Ascenseurs',
      description: 'Contactez Atlas Ascenseurs, ascenseuriste à Casablanca, pour installation ascenseur Casablanca, devis, maintenance et modernisation au Maroc.',
    },
  },
  '/configurator': {
    en: {
      title: '3D Elevator Personalization - Atlas Ascenseurs',
      description: 'Configure elevator type, capacity, speed, doors, controls, wall finishes, floor finishes, and lighting with Atlas Ascenseurs.',
    },
    fr: {
      title: 'Personnalisation Ascenseur 3D - Atlas Ascenseurs',
      description: 'Configurez type d’ascenseur, capacité, vitesse, portes, commandes, murs, sols et éclairage avec Atlas Ascenseurs.',
    },
  },
};

const routeKeywords = {
  '/': {
    en: ['elevator Morocco', 'residential elevator Morocco', 'villa elevator Morocco', 'home lift Morocco'],
    fr: ['ascenseur Maroc', 'ascenseur résidentiel Maroc', 'ascenseur villa Maroc', 'home lift Maroc', 'prix ascenseur villa Maroc'],
  },
  '/elevators': {
    en: ['residential elevators Morocco', 'villa lifts Morocco', 'home lifts Morocco', 'private elevator Morocco'],
    fr: ['ascenseurs résidentiels Maroc', 'ascenseur villa Maroc', 'home lift Maroc', 'ascenseur privatif Maroc'],
  },
  '/elevators/astoria-range': {
    en: ['Astoria home lift', 'villa elevator Morocco', 'panoramic home lift Morocco'],
    fr: ['Gamme Astoria', 'home lift Maroc', 'ascenseur villa Maroc', 'ascenseur panoramique villa'],
  },
  '/elevators/como-range': {
    en: ['COMO residential elevator', 'home lift Morocco', 'private elevator Morocco'],
    fr: ['COMO résidentiel', 'home lift Maroc', 'ascenseur privatif Maroc', 'ascenseur résidentiel Maroc'],
  },
  '/elevators/exterior-elevators': {
    en: ['exterior elevator Morocco', 'outdoor lift Morocco', 'villa elevator Morocco'],
    fr: ['ascenseur extérieur Maroc', 'ascenseur villa Maroc', 'élévateur extérieur villa'],
  },
  '/service': {
    en: ['elevator maintenance Casablanca', 'elevator service Morocco', 'elevator modernization Morocco'],
    fr: ['entretien ascenseur Casablanca', 'maintenance ascenseur Maroc', 'modernisation ascenseur Maroc'],
  },
  '/contact': {
    en: ['elevator company Casablanca', 'elevator installation Casablanca', 'elevator quote Morocco'],
    fr: ['ascenseuriste Casablanca', 'installation ascenseur Casablanca', 'devis ascenseur Maroc'],
  },
};

const routeLabels = {
  '/': { en: 'Home', fr: 'Accueil' },
  '/about': { en: 'About', fr: 'À Propos' },
  '/elevators': { en: 'Elevators', fr: 'Ascenseurs' },
  '/elevators/circular-elevators': { en: 'Circular Elevators', fr: 'Ascenseurs Circulaires' },
  '/elevators/exterior-elevators': { en: 'Exterior Elevators', fr: 'Ascenseurs Extérieurs' },
  '/elevators/astoria-range': { en: 'Astoria Range', fr: 'Gamme Astoria' },
  '/elevators/como-range': { en: 'COMO Residential', fr: 'COMO Résidentiel' },
  '/elevators/hospital-lifts': { en: 'Hospital Lifts', fr: 'Ascenseurs Hospitaliers' },
  '/elevators/car-lifts': { en: 'Car Lifts', fr: 'Monte-Voitures' },
  '/elevators/escalators-walkways': { en: 'Escalators and Walkways', fr: 'Escalators et Trottoirs Roulants' },
  '/elevators/como-commercial': { en: 'COMO Commercial', fr: 'COMO Commercial' },
  '/elevators/cargo-lifts': { en: 'Cargo Lifts', fr: 'Monte-Charges' },
  '/elevators/dumbwaiter-lifts': { en: 'Dumbwaiter Lifts', fr: 'Monte-Plats' },
  '/projects': { en: 'Projects', fr: 'Projets' },
  '/cabin-design': { en: 'Cabin Design', fr: 'Design Cabine' },
  '/inspiration-gallery': { en: 'Inspiration Gallery', fr: 'Galerie d’Inspiration' },
  '/door-collections': { en: 'Door Collections', fr: 'Collections de Portes' },
  '/service': { en: 'Service and Maintenance', fr: 'Service et Maintenance' },
  '/contact': { en: 'Contact', fr: 'Contact' },
  '/configurator': { en: '3D Personalization', fr: 'Personnalisation 3D' },
};

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const match = selector.match(/\[(name|property|http-equiv)="([^"]+)"\]/);
    if (match) element.setAttribute(match[1], match[2]);
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function setLink(rel, href, hreflang) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hreflang) element.setAttribute('hreflang', hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function setLinkAttributes(rel, attributes) {
  let element = document.head.querySelector(`link[rel="${rel}"][data-managed-seo="true"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    element.setAttribute('data-managed-seo', 'true');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

function removeManagedLinks(selector, keepHreflangs = []) {
  document.head.querySelectorAll(selector).forEach((element) => {
    const hreflang = element.getAttribute('hreflang');
    if (!keepHreflangs.includes(hreflang)) element.remove();
  });
}

function setJsonLd(id, data) {
  let element = document.getElementById(id);
  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

function cleanPath(pathname) {
  return pathname.replace(/\/+$/, '') || '/';
}

function getKeywords(pathname, language) {
  const normalized = cleanPath(pathname);
  const keywords = [
    ...(coreKeywords[language] || coreKeywords.en),
    ...(routeKeywords[normalized]?.[language] || []),
  ];
  return Array.from(new Set(keywords)).join(', ');
}

function getSeo(pathname, language) {
  const normalized = cleanPath(pathname);
  const route = routeSeo[normalized] || (normalized.startsWith('/elevators/como-range/cabine-') ? {
    en: {
      title: 'COMO Cabin Details - Atlas Ascenseurs',
      description: 'Explore COMO elevator cabin finishes, ceiling, panels, control, door, handrail, flooring, and design details.',
    },
    fr: {
      title: 'Détails Cabine COMO - Atlas Ascenseurs',
      description: 'Découvrez les finitions de cabine COMO: plafond, panneaux, commande, porte, main courante, sol et détails design.',
    },
  } : null);
  return route?.[language] || defaultSeo[language] || defaultSeo.en;
}

function getLabel(pathname, language) {
  const normalized = cleanPath(pathname);
  if (normalized.startsWith('/elevators/como-range/cabine-')) {
    return language === 'fr' ? 'Détails Cabine COMO' : 'COMO Cabin Details';
  }
  return routeLabels[normalized]?.[language] || routeLabels[normalized]?.en || SITE_NAME;
}

function getBreadcrumbItems(pathname, language) {
  const normalized = cleanPath(pathname);
  const items = [{ name: getLabel('/', language), path: '/' }];

  if (normalized === '/') return items;
  if (normalized.startsWith('/elevators/')) {
    items.push({ name: getLabel('/elevators', language), path: '/elevators' });
  }
  items.push({ name: getLabel(normalized, language), path: normalized });
  return items;
}

function toSiteUrl(path) {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}

function toAbsoluteUrl(asset) {
  if (!asset) return SITE_URL;
  if (/^https?:\/\//i.test(asset)) return asset;
  return `${SITE_URL}${asset.startsWith('/') ? asset : `/${asset}`}`;
}

function getRouteImage(pathname) {
  const normalized = cleanPath(pathname);
  if (normalized === '/contact') return pageImages.contact;
  if (normalized === '/service') return pageImages.service;
  if (normalized === '/about') return pageImages.about;
  if (normalized === '/elevators') return imagePaths.elevators.comoResidential;
  if (normalized === '/elevators/astoria-range') return imagePaths.elevators.astoria;
  if (normalized === '/elevators/como-range') return imagePaths.elevators.comoResidential;
  if (normalized === '/elevators/circular-elevators') return imagePaths.elevators.circular;
  if (normalized === '/elevators/exterior-elevators') return imagePaths.elevators.exterior;
  if (normalized === '/elevators/hospital-lifts') return imagePaths.elevators.hospitalCargo;
  if (normalized === '/elevators/car-lifts') return imagePaths.elevators.car;
  if (normalized === '/elevators/escalators-walkways') return imagePaths.elevators.escalator;
  if (normalized === '/elevators/como-commercial') return imagePaths.elevators.commercial;
  if (normalized === '/elevators/cargo-lifts') return imagePaths.elevators.cargo;
  if (normalized === '/elevators/dumbwaiter-lifts') return imagePaths.elevators.cargo;
  if (normalized.startsWith('/elevators/como-range/cabine-')) {
    return comoCabins.find((cabin) => normalized.endsWith(cabin.slug))?.image || imagePaths.elevators.comoResidential;
  }
  return DEFAULT_IMAGE;
}

function getAllOfferItems(language) {
  const residential = getResidentialElevators(language).map(([, name, description]) => ({ name, description }));
  const commercial = getCommercialElevators(language).map(([, name, description]) => ({ name, description }));
  const services = getServices(language).map(([, name, description]) => ({ name, description }));
  return [...residential, ...commercial, ...services];
}

export default function SEO() {
  const { pathname } = useLocation();
  const { language } = useUI();

  useEffect(() => {
    const normalizedPath = cleanPath(pathname);
    const seo = getSeo(normalizedPath, language);
    const canonical = toSiteUrl(normalizedPath);
    const imageUrl = toAbsoluteUrl(getRouteImage(normalizedPath));
    const logoUrl = toAbsoluteUrl(imagePaths.logos.main);
    const keywords = getKeywords(normalizedPath, language);
    const breadcrumbItems = getBreadcrumbItems(normalizedPath, language);
    const offerItems = getAllOfferItems(language);
    const faqs = getFaqs(language);

    document.documentElement.lang = language;
    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[name="keywords"]', 'content', keywords);
    setMeta('meta[name="robots"]', 'content', 'index, follow');
    setMeta('meta[name="author"]', 'content', SITE_NAME);
    setMeta('meta[name="geo.region"]', 'content', 'MA-CAS');
    setMeta('meta[name="geo.placename"]', 'content', 'Casablanca, Morocco');
    setMeta('meta[name="geo.position"]', 'content', '33.5731;-7.5898');
    setMeta('meta[name="ICBM"]', 'content', '33.5731, -7.5898');
    setMeta('meta[http-equiv="content-language"]', 'content', language === 'fr' ? 'fr-MA' : 'en');
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', imageUrl);
    setMeta('meta[property="og:image:secure_url"]', 'content', imageUrl);
    setMeta('meta[property="og:image:alt"]', 'content', `${SITE_NAME} - ${seo.title}`);
    setMeta('meta[property="og:updated_time"]', 'content', '2026-06-27T00:00:00+01:00');
    setMeta('meta[property="og:locale"]', 'content', language === 'fr' ? 'fr_MA' : 'en_US');
    setMeta('meta[property="og:locale:alternate"]', 'content', language === 'fr' ? 'en_US' : 'fr_MA');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);
    setMeta('meta[name="twitter:image"]', 'content', imageUrl);
    setMeta('meta[name="twitter:image:alt"]', 'content', `${SITE_NAME} - ${seo.title}`);
    setMeta('meta[name="format-detection"]', 'content', 'telephone=yes');
    setMeta('meta[name="rating"]', 'content', 'General');
    setLink('canonical', canonical);
    setLinkAttributes('preconnect', { href: 'https://fonts.googleapis.com' });
    removeManagedLinks('link[rel="alternate"][hreflang]');
    setLink('alternate', canonical, 'x-default');

    setJsonLd('atlas-local-business-schema', {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      legalName: SITE_NAME,
      url: SITE_URL,
      image: imageUrl,
      logo: logoUrl,
      telephone: BUSINESS_PHONE,
      email: BUSINESS_EMAIL,
      description: language === 'fr'
        ? 'Ascenseuriste à Casablanca spécialisé dans l’installation, l’entretien, la modernisation et les ascenseurs résidentiels au Maroc.'
        : 'Elevator company in Casablanca specializing in installation, maintenance, modernization, and residential elevators across Morocco.',
      address: {
        '@type': 'PostalAddress',
        ...BUSINESS_ADDRESS,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: BUSINESS_PHONE,
        email: BUSINESS_EMAIL,
        contactType: language === 'fr' ? 'devis et support ascenseur' : 'elevator quotes and support',
        areaServed: 'MA',
        availableLanguage: ['English', 'French', 'Arabic'],
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 33.5731,
        longitude: -7.5898,
      },
      areaServed: localAreaSchemas,
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      }],
      priceRange: '$$',
      currenciesAccepted: 'MAD',
      paymentAccepted: 'Cash, Bank transfer',
      knowsAbout: coreKeywords[language] || coreKeywords.en,
      serviceType: [
        language === 'fr' ? 'Installation ascenseur Casablanca' : 'Elevator installation Casablanca',
        language === 'fr' ? 'Entretien ascenseur Casablanca' : 'Elevator maintenance Casablanca',
        language === 'fr' ? 'Modernisation ascenseur Maroc' : 'Elevator modernization Morocco',
        language === 'fr' ? 'Ascenseur résidentiel Maroc' : 'Residential elevator Morocco',
        language === 'fr' ? 'Home lift Maroc' : 'Home lift Morocco',
        language === 'fr' ? 'Ascenseur villa Maroc' : 'Villa elevator Morocco',
        language === 'fr' ? 'Ascenseurs commerciaux' : 'Commercial elevators',
      ],
    });

    setJsonLd('atlas-website-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: language === 'fr' ? 'fr-MA' : 'en',
      publisher: { '@id': `${SITE_URL}/#business` },
      potentialAction: {
        '@type': 'CommunicateAction',
        target: `${SITE_URL}/contact`,
        name: language === 'fr' ? 'Demander un devis ascenseur' : 'Request an elevator quote',
      },
    });

    setJsonLd('atlas-services-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#services`,
      name: language === 'fr' ? 'Services Atlas Ascenseurs' : 'Atlas Ascenseurs Services',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Service',
            name: language === 'fr' ? 'Installation ascenseur Casablanca' : 'Elevator installation Casablanca',
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed: localAreaSchemas,
            serviceType: language === 'fr' ? 'Installation d’ascenseurs' : 'Elevator installation',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Service',
            name: language === 'fr' ? 'Entretien ascenseur Casablanca' : 'Elevator maintenance Casablanca',
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed: localAreaSchemas,
            serviceType: language === 'fr' ? 'Entretien et maintenance ascenseur' : 'Elevator service and maintenance',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'Service',
            name: language === 'fr' ? 'Ascenseur résidentiel Maroc' : 'Residential elevator Morocco',
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed: localAreaSchemas,
            serviceType: language === 'fr' ? 'Ascenseur résidentiel et ascenseur villa' : 'Residential elevator and villa lift',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'Service',
            name: language === 'fr' ? 'Home lift Maroc' : 'Home lift Morocco',
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed: localAreaSchemas,
            serviceType: language === 'fr' ? 'Home lift et ascenseur privatif' : 'Home lift and private elevator',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'Service',
            name: language === 'fr' ? 'Modernisation ascenseur Maroc' : 'Elevator modernization Morocco',
            provider: { '@id': `${SITE_URL}/#business` },
            areaServed: localAreaSchemas,
            serviceType: language === 'fr' ? 'Modernisation d’ascenseurs' : 'Elevator modernization',
          },
        },
      ],
    });

    setJsonLd('atlas-offers-schema', {
      '@context': 'https://schema.org',
      '@type': 'OfferCatalog',
      '@id': `${SITE_URL}/#offer-catalog`,
      name: language === 'fr' ? 'Catalogue ascenseurs et services Atlas Ascenseurs' : 'Atlas Ascenseurs elevator and service catalog',
      url: `${SITE_URL}/elevators`,
      itemListElement: offerItems.map((item, index) => ({
        '@type': 'Offer',
        position: index + 1,
        availability: 'https://schema.org/InStock',
        areaServed: localAreaSchemas,
        itemOffered: {
          '@type': 'Service',
          name: item.name,
          description: item.description,
          provider: { '@id': `${SITE_URL}/#business` },
        },
      })),
    });

    setJsonLd('atlas-webpage-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: seo.title,
      headline: seo.title,
      description: seo.description,
      keywords,
      inLanguage: language === 'fr' ? 'fr-MA' : 'en',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
      },
      breadcrumb: { '@id': `${canonical}#breadcrumb` },
      mainEntity: normalizedPath === '/' ? { '@id': `${canonical}#faq` } : undefined,
    });

    setJsonLd('atlas-breadcrumb-schema', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: toSiteUrl(item.path),
      })),
    });

    if (normalizedPath === '/') {
      setJsonLd('atlas-faq-schema', {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${canonical}#faq`,
        mainEntity: faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: answer,
          },
        })),
      });
    } else {
      document.getElementById('atlas-faq-schema')?.remove();
    }
  }, [language, pathname]);

  return null;
}
