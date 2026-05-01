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
