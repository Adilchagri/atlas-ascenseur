import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import { commercialElevators, comoCabins, elevatorDetailGalleries, residentialElevators } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';
import ProductGallery from '../components/ui/ProductGallery.jsx';

const noGalleryPages = new Set([
  'Hospital Lifts',
  'Car Lifts',
  'Escalators & Walkways',
  'COMO Commercial',
  'COMO Residential',
  'Cargo Lifts',
  'Dumbwaiter Lifts',
]);

const elevatorPages = {
  '/elevators/circular-elevators': { title: { en: 'Circular', fr: 'Ascenseurs' }, accent: { en: 'Elevators', fr: 'Circulaires' }, source: 'res', key: 'Circular Elevators' },
  '/elevators/exterior-elevators': { title: { en: 'Exterior', fr: 'Ascenseurs' }, accent: { en: 'Elevators', fr: 'Extérieurs' }, source: 'res', key: 'Exterior Elevators' },
  '/elevators/astoria-range': { title: { en: 'Astoria', fr: 'Gamme' }, accent: { en: 'Range', fr: 'Astoria' }, source: 'res', key: 'Astoria Range' },
  '/elevators/como-range': { title: { en: 'COMO', fr: 'COMO' }, accent: { en: 'Residential', fr: 'Résidentiel' }, source: 'res', key: 'COMO Residential' },
  '/elevators/hospital-lifts': { title: { en: 'Hospital', fr: 'Ascenseurs' }, accent: { en: 'Lifts', fr: 'Hospitaliers' }, source: 'com', key: 'Hospital Lifts' },
  '/elevators/car-lifts': { title: { en: 'Car', fr: 'Monte' }, accent: { en: 'Lifts', fr: 'Voitures' }, source: 'com', key: 'Car Lifts' },
  '/elevators/escalators-walkways': { title: { en: 'Escalators', fr: 'Escalators' }, accent: { en: '& Walkways', fr: '& Trottoirs Roulants' }, source: 'com', key: 'Escalators & Walkways' },
  '/elevators/como-commercial': { title: { en: 'COMO', fr: 'COMO' }, accent: { en: 'Commercial', fr: 'Commercial' }, source: 'com', key: 'COMO Commercial' },
  '/elevators/cargo-lifts': { title: { en: 'Cargo', fr: 'Monte' }, accent: { en: 'Lifts', fr: 'Charges' }, source: 'com', key: 'Cargo Lifts' },
  '/elevators/dumbwaiter-lifts': { title: { en: 'Dumbwaiter', fr: 'Monte' }, accent: { en: 'Lifts', fr: 'Plats' }, source: 'com', key: 'Dumbwaiter Lifts' },
};

const productNotes = {
  'Astoria Range': {
    label: 'Residential design lift',
    headline: 'A panoramic elevator designed for contemporary villas.',
    body: 'Self-supporting aluminum and glass structure, bespoke design, quiet operation, and premium finishes.',
    points: ['Compact shaft sizing', 'Smooth and quiet operation', 'Custom cabin, lighting, and doors', 'Indoor residential installation'],
  },
  'COMO Residential': {
    label: 'Custom-made residential elevator',
    headline: 'Residential comfort reimagined for modern villas.',
    body: 'COMO combines design, personalization, and architectural integration in an elegant, compact, and quiet solution.',
    points: ['Hydraulic or electric drive logic', 'Space-optimized cabin dimensions', 'Factory-finished cabin packages', 'Wall, floor, lighting, and shaft upgrades'],
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
  'Astoria Range': {
    label: 'Ascenseur résidentiel design',
    headline: 'L’ascenseur panoramique pensé pour les villas contemporaines.',
    body: 'Structure autoportante en aluminium et verre, design sur mesure, fonctionnement silencieux et finitions premium.',
    points: ['Gaine compacte', 'Fonctionnement doux et silencieux', 'Cabine, éclairage et portes personnalisés', 'Installation résidentielle intérieure'],
  },
  'COMO Residential': {
    label: 'Ascenseur résidentiel sur mesure',
    headline: 'Le confort résidentiel repensé pour les villas modernes.',
    body: 'COMO associe design, personnalisation et intégration architecturale dans une solution élégante, compacte et silencieuse.',
    points: ['Motorisation hydraulique ou électrique', 'Dimensions optimisées', 'Packages cabine finis en usine', 'Murs, sols, éclairage et gaine personnalisables'],
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

export default function ElevatorDetail() {
  const { language } = useUI();
  const { pathname } = useLocation();
  const page = elevatorPages[pathname] ?? elevatorPages['/elevators/astoria-range'];

  const item = useMemo(() => {
    const pool = page.source === 'res' ? residentialElevators : commercialElevators;
    return pool.find(([, title]) => title === page.key) ?? pool[0];
  }, [page.key, page.source]);

  const [, itemTitle, itemText, itemImage] = item;
  const gallery = elevatorDetailGalleries[itemTitle] ?? [itemImage];
  const notes = language === 'fr' ? frProductNotes : productNotes;
  const note = notes[itemTitle] ?? notes['COMO Residential'];
  const showGallery = !noGalleryPages.has(itemTitle);
  const phoneTallGalleryPages = new Set(['Astoria Range', 'COMO Residential', 'Circular Elevators', 'Exterior Elevators']);
  const usePhoneTallGallery = phoneTallGalleryPages.has(itemTitle);
  const showComoCabins = itemTitle === 'COMO Residential';
  const pageTitle = page.title[language] ?? page.title.en;
  const pageAccent = page.accent[language] ?? page.accent.en;

  return (
    <>
      <PageHero current={language === 'fr' ? 'Nos Ascenseurs' : 'Our Elevators'} title={pageTitle} accent={pageAccent} />
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
            className={`product-presentation-image ${itemTitle === 'COMO Commercial' ? 'product-presentation-image-clean' : ''} ${itemTitle === 'COMO Residential' ? 'product-presentation-image-como' : ''} ${itemTitle === 'Exterior Elevators' ? 'product-presentation-image-exterior' : ''}`}
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

        {showComoCabins && (
          <div className="como-cabin-section">
            <div className="gallery-head">
              <div>
                <div className="eyebrow">{language === 'fr' ? 'Cabines COMO' : 'COMO Cabins'}</div>
                <h2 className="section-title tight-title">{language === 'fr' ? 'Choisir une Cabine' : 'Choose a Cabin'}</h2>
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
            getLabel={(index) => `${language === 'fr' ? 'Image Produit' : itemTitle} ${String(index + 1).padStart(2, '0')}`}
          />
        )}
      </section>
    </>
  );
}
