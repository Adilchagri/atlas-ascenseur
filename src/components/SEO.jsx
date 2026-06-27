import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { imagePaths } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

const SITE_URL = 'https://atlasascenseurs.ma';
const SITE_NAME = 'Atlas Ascenseurs';
const DEFAULT_IMAGE = imagePaths.logos.main;

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
      title: 'Atlas Ascenseurs - Premium Elevators in Morocco',
      description: 'Premium residential and commercial elevator solutions in Morocco, including custom cabins, installation, maintenance, and modernization.',
    },
    fr: {
      title: 'Atlas Ascenseurs - Ascenseurs Premium au Maroc',
      description: 'Solutions d’ascenseurs résidentiels et commerciaux premium au Maroc: cabines sur mesure, installation, maintenance et modernisation.',
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
      title: 'Our Elevators - Residential and Commercial Lifts',
      description: 'Explore Atlas Ascenseurs residential and commercial elevators: Astoria, COMO, circular, exterior, hospital, cargo, car lifts, and escalators.',
    },
    fr: {
      title: 'Nos Ascenseurs - Solutions Résidentielles et Commerciales',
      description: 'Découvrez les ascenseurs Atlas Ascenseurs: Astoria, COMO, circulaires, extérieurs, hospitaliers, monte-charges, monte-voitures et escalators.',
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
      title: 'Astoria Home Lifts - Atlas Ascenseurs',
      description: 'Panoramic Astoria elevators for contemporary villas with aluminum and glass structure, quiet operation, and premium finishes.',
    },
    fr: {
      title: 'Gamme Astoria - Ascenseurs pour Villas Contemporaines',
      description: 'Ascenseurs panoramiques Astoria pour villas contemporaines avec structure aluminium et verre, fonctionnement silencieux et finitions premium.',
    },
  },
  '/elevators/como-range': {
    en: {
      title: 'COMO Residential Elevators - Atlas Ascenseurs',
      description: 'COMO residential elevators combine design, personalization, and architectural integration in a compact and quiet solution.',
    },
    fr: {
      title: 'COMO Résidentiel - Ascenseurs pour Villas Modernes',
      description: 'COMO associe design, personnalisation et intégration architecturale dans une solution élégante, compacte et silencieuse.',
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
      title: 'Elevator Service and Maintenance in Morocco',
      description: 'Atlas Ascenseurs provides elevator maintenance, emergency support, modernization, inspections, and certification across Morocco.',
    },
    fr: {
      title: 'Service et Maintenance Ascenseur au Maroc',
      description: 'Atlas Ascenseurs assure maintenance, urgence, modernisation, inspections et certification d’ascenseurs à travers le Maroc.',
    },
  },
  '/contact': {
    en: {
      title: 'Contact Atlas Ascenseurs - Elevator Quote in Morocco',
      description: 'Contact Atlas Ascenseurs for elevator installation, maintenance, modernization, and consultation across Casablanca and Morocco.',
    },
    fr: {
      title: 'Contact Atlas Ascenseurs - Devis Ascenseur au Maroc',
      description: 'Contactez Atlas Ascenseurs pour installation, maintenance, modernisation et consultation ascenseur à Casablanca et partout au Maroc.',
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

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
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

export default function SEO() {
  const { pathname } = useLocation();
  const { language } = useUI();

  useEffect(() => {
    const normalizedPath = cleanPath(pathname);
    const seo = getSeo(normalizedPath, language);
    const canonical = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
    const imageUrl = new URL(DEFAULT_IMAGE, window.location.origin).href;

    document.documentElement.lang = language;
    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[name="robots"]', 'content', 'index, follow');
    setMeta('meta[property="og:site_name"]', 'content', SITE_NAME);
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', imageUrl);
    setMeta('meta[property="og:locale"]', 'content', language === 'fr' ? 'fr_MA' : 'en_US');
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);
    setMeta('meta[name="twitter:image"]', 'content', imageUrl);
    setLink('canonical', canonical);
    setLink('alternate', canonical, language);

    setJsonLd('atlas-local-business-schema', {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      image: imageUrl,
      telephone: '+212666323055',
      email: 'contact@atlasascenseurs.ma',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '23 Rue 2, Lot Les Arenes 2, Etage, Suite 10, Racine',
        addressLocality: 'Casablanca',
        addressCountry: 'MA',
      },
      areaServed: ['Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Agadir', 'Fes', 'Morocco'],
      priceRange: '$$',
      serviceType: [
        'Elevator installation',
        'Elevator maintenance',
        'Elevator modernization',
        'Residential elevators',
        'Commercial elevators',
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
    });

    setJsonLd('atlas-services-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#services`,
      name: language === 'fr' ? 'Services Atlas Ascenseurs' : 'Atlas Ascenseurs Services',
      itemListElement: [
        {
          '@type': 'Service',
          name: language === 'fr' ? 'Installation d’ascenseurs' : 'Elevator installation',
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: 'Morocco',
        },
        {
          '@type': 'Service',
          name: language === 'fr' ? 'Maintenance d’ascenseurs' : 'Elevator maintenance',
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: 'Morocco',
        },
        {
          '@type': 'Service',
          name: language === 'fr' ? 'Modernisation d’ascenseurs' : 'Elevator modernization',
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: 'Morocco',
        },
        {
          '@type': 'Service',
          name: language === 'fr' ? 'Ascenseurs résidentiels' : 'Residential elevators',
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: 'Morocco',
        },
        {
          '@type': 'Service',
          name: language === 'fr' ? 'Ascenseurs commerciaux' : 'Commercial elevators',
          provider: { '@id': `${SITE_URL}/#business` },
          areaServed: 'Morocco',
        },
      ],
    });
  }, [language, pathname]);

  return null;
}
