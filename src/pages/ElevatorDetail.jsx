import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import { commercialElevators, elevatorDetailGalleries, residentialElevators } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';
import ProductGallery from '../components/ui/ProductGallery.jsx';

const noGalleryPages = new Set([
  'Hospital Lifts',
  'Car Lifts',
  'Escalators & Walkways',
  'COMO Commercial',
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
    headline: 'Compact, refined, and made for private interiors.',
    body: 'A villa-ready indoor elevator with a self-supporting structure, quiet travel, premium cabin finishes, and low-impact installation for homes that need comfort without heavy construction.',
    points: ['Compact shaft sizing', 'Smooth and quiet operation', 'Custom cabin, lighting, and doors', 'Indoor residential installation'],
  },
  'COMO Residential': {
    label: 'Custom-made residential elevator',
    headline: 'A flexible COMO solution for villas, apartments, and multi-level homes.',
    body: 'Inspired by Halifax COMO guidance, this range is ideal for moderate usage needs. Hydraulic and electric drive options optimize shaft space, while customizable cabins help the lift blend into the architecture.',
    points: ['Hydraulic or electric drive logic', 'Space-optimized cabin dimensions', 'Factory-finished cabin packages', 'Wall, floor, lighting, and shaft upgrades'],
  },
  'Circular Elevators': {
    label: 'Architectural lift',
    headline: 'A panoramic centerpiece for luxury spaces.',
    body: 'Circular and glass lifts turn vertical movement into a design feature, using transparent shafts, slim structures, and custom finishes for villas, hotels, and premium interiors.',
    points: ['Panoramic glass effect', 'Custom railings and flooring', 'Statement architecture', 'High visibility and light'],
  },
  'Exterior Elevators': {
    label: 'Outdoor access',
    headline: 'Accessibility added cleanly to exterior spaces.',
    body: 'Exterior elevators support terraces, gardens, split-level properties, and hillside homes with weather-ready structures and compact footprints.',
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
    headline: 'Compact, raffiné et pensé pour les intérieurs privés.',
    body: 'Un ascenseur intérieur prêt pour les villas, avec structure autoportante, trajet silencieux, finitions premium et installation à faible impact.',
    points: ['Gaine compacte', 'Fonctionnement doux et silencieux', 'Cabine, éclairage et portes personnalisés', 'Installation résidentielle intérieure'],
  },
  'COMO Residential': {
    label: 'Ascenseur résidentiel sur mesure',
    headline: 'Une solution COMO flexible pour villas, appartements et maisons à plusieurs niveaux.',
    body: 'Idéale pour un usage modéré, cette gamme propose des options hydrauliques et électriques pour optimiser l’espace et intégrer la cabine à l’architecture.',
    points: ['Motorisation hydraulique ou électrique', 'Dimensions optimisées', 'Packages cabine finis en usine', 'Murs, sols, éclairage et gaine personnalisables'],
  },
  'Circular Elevators': {
    label: 'Ascenseur architectural',
    headline: 'Une pièce panoramique centrale pour les espaces de luxe.',
    body: 'Les ascenseurs circulaires et vitrés transforment le déplacement vertical en élément design grâce aux gaines transparentes, structures fines et finitions sur mesure.',
    points: ['Effet verre panoramique', 'Mains courantes et sols personnalisés', 'Présence architecturale', 'Lumière et visibilité'],
  },
  'Exterior Elevators': {
    label: 'Accès extérieur',
    headline: 'Ajouter l’accessibilité proprement aux espaces extérieurs.',
    body: 'Les ascenseurs extérieurs servent terrasses, jardins, propriétés en pente et maisons à niveaux décalés avec structures résistantes et emprise compacte.',
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
          <div className={`product-presentation-image ${itemTitle === 'COMO Commercial' ? 'product-presentation-image-clean' : ''}`}>
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

        {showGallery && (
          <ProductGallery
            eyebrow={language === 'fr' ? 'Galerie Produit' : 'Product Gallery'}
            title={language === 'fr' ? 'Images de la Gamme' : `${itemTitle} Gallery`}
            images={gallery}
            getLabel={(index) => `${language === 'fr' ? 'Image Produit' : itemTitle} ${String(index + 1).padStart(2, '0')}`}
          />
        )}
      </section>
    </>
  );
}
