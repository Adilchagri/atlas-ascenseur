import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const UIContext = createContext(null);

const translations = {
  en: {
    about: 'About',
    ourElevators: 'Our Elevators',
    cabinDesign: 'Cabin Design',
    personalization: 'Personalization',
    getQuote: 'Get a Quote',
    contactUs: 'Contact Us',
    serviceMaintenance: 'Service & Maintenance',
    ourProjects: 'Our Projects',
    residentialLifts: 'Residential Lifts',
    commercialLifts: 'Commercial Lifts',
    welcomeLabel: 'Welcome to Atlas Ascenseurs',
    exploreMore: 'Explore More',
    scrollDiscover: 'Scroll to discover',
    selectedProjects: 'Selected Projects',
    viewAllProjects: 'View All Projects',
    ourRange: 'Our Range',
    viewAllElevators: 'View All Elevators',
    commonQuestions: 'Common Questions',
    speakExpert: 'Speak to an Expert',
    everythingNeed: 'Everything you need to know before your project begins.',
    theme: 'Theme',
    language: 'Language',
    dark: 'Dark',
    light: 'Light',
    home: 'Home',
    footerQuickLinks: 'Quick Links',
    footerOurElevators: 'Our Elevators',
    footerContact: 'Contact',
    footerBrandDesc: 'Combining proven engineering, refined design, and local expertise, Atlas Ascenseurs delivers reliable elevator solutions across Morocco.',
    footerRights: '(c) 2026 Atlas Ascenseurs - Premium Elevators Morocco. All Rights Reserved.',
    footerTagline: 'Designed in detail. Installed with confidence.',
    footerLegal: 'Privacy Policy - Terms & Conditions',
    aboutUs: 'About Us',
    cabinConfigurator: 'Cabin Configurator',
    escalators: 'Escalators',
    heroTitle: 'Luxury Elevators,<br /><em>Made Personal.</em>',
    whyEyebrow: 'Why Atlas Ascenseurs',
    whyHeading: 'Built on Trust,<br />Delivered with <em>Precision.</em>',
    whyDesc: 'Every building is unique. Atlas Ascenseurs pairs Euro-Moroccan safety standards with a local Moroccan team that can design, install, maintain, and modernize lifts across Casablanca, Rabat, Marrakech, Tangier, Agadir, Fes, and beyond.',
    elevatorsHeading: 'Engineered for <em>Every</em> Space.',
    projectsHeading: 'Where Our Work <em>Speaks.</em>',
    personal3d: '3D Personalization',
    circularElevators: 'Circular Elevators',
    hospitalLifts: 'Hospital Lifts',
    cargoLifts: 'Cargo Lifts',
    faqEyebrow: 'FAQ',
    whatsAppSupport: 'WhatsApp Support',
    whatsAppChat: 'Chat on WhatsApp',
    loadMoreImages: 'Load More Images',
    images: 'images',
    toggleMenu: 'Toggle menu',
  },
  fr: {
    about: 'À Propos',
    ourElevators: 'Nos Ascenseurs',
    cabinDesign: 'Design Cabine',
    personalization: 'Personnalisation',
    getQuote: 'Demander un Devis',
    contactUs: 'Contact',
    serviceMaintenance: 'Service & Maintenance',
    ourProjects: 'Nos Projets',
    residentialLifts: 'Ascenseurs Résidentiels',
    commercialLifts: 'Ascenseurs Commerciaux',
    welcomeLabel: 'Bienvenue chez Atlas Ascenseurs',
    exploreMore: 'Explorer Plus',
    scrollDiscover: 'Faites défiler pour découvrir',
    selectedProjects: 'Projets Sélectionnés',
    viewAllProjects: 'Voir Tous les Projets',
    ourRange: 'Notre Gamme',
    viewAllElevators: 'Voir Tous les Ascenseurs',
    commonQuestions: 'Questions Fréquentes',
    speakExpert: 'Parler à un Expert',
    everythingNeed: 'Tout ce que vous devez savoir avant de démarrer votre projet.',
    theme: 'Thème',
    language: 'Langue',
    dark: 'Sombre',
    light: 'Clair',
    home: 'Accueil',
    footerQuickLinks: 'Liens Rapides',
    footerOurElevators: 'Nos Ascenseurs',
    footerContact: 'Contact',
    footerBrandDesc: 'En combinant ingénierie éprouvée, design raffiné et expertise locale, Atlas Ascenseurs propose des solutions d’élévation fiables à travers le Maroc.',
    footerRights: '(c) 2026 Atlas Ascenseurs - Ascenseurs Premium Maroc. Tous droits réservés.',
    footerTagline: 'Conçu avec précision. Installé en toute confiance.',
    footerLegal: 'Politique de Confidentialité - Conditions Générales',
    aboutUs: 'À Propos',
    cabinConfigurator: 'Configurateur Cabine',
    escalators: 'Escalators',
    heroTitle: 'Ascenseurs de Luxe,<br /><em>Sur Mesure.</em>',
    whyEyebrow: 'Pourquoi Atlas Ascenseurs',
    whyHeading: 'Fondé sur la confiance,<br />Livré avec <em>Précision.</em>',
    whyDesc: 'Chaque bâtiment est unique. Atlas Ascenseurs associe les normes de sécurité euro-marocaines à une équipe locale capable de concevoir, installer, maintenir et moderniser des ascenseurs à Casablanca, Rabat, Marrakech, Tanger, Agadir, Fès et au-delà.',
    elevatorsHeading: 'Conçu pour <em>Chaque</em> Espace.',
    projectsHeading: 'Des Réalisations qui <em>Parlent.</em>',
    personal3d: 'Personnalisation 3D',
    circularElevators: 'Ascenseurs Circulaires',
    hospitalLifts: 'Ascenseurs Hospitaliers',
    cargoLifts: 'Monte-charges',
    faqEyebrow: 'FAQ',
    whatsAppSupport: 'Support WhatsApp',
    whatsAppChat: 'Discuter sur WhatsApp',
    loadMoreImages: 'Charger Plus d’Images',
    images: 'images',
    toggleMenu: 'Ouvrir le menu',
  },
};

export function UIProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('ui_language') || 'en');

  useEffect(() => {
    localStorage.setItem('ui_language', language);
  }, [language]);

  const t = useMemo(
    () => (key) => translations[language]?.[key] || translations.en[key] || key,
    [language],
  );

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]);

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error('useUI must be used within UIProvider');
  return context;
}
