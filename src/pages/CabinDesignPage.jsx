import { useLocation } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import ProductGallery from '../components/ui/ProductGallery.jsx';
import { designGalleries, libraryCabinImages, pageImages } from '../data/siteData.js';
import cabinIdentityBanner from '../assets/images/library/elevator-car-lift.jpg';
import inspirationWarm from '../assets/images/Inspiration Gallery/1.jpg';
import inspirationGlass from '../assets/images/Inspiration Gallery/2.jpg';
import inspirationHospitality from '../assets/images/Inspiration Gallery/3.jpg';
import inspirationMedical from '../assets/images/Inspiration Gallery/4.jpg';
import inspirationOffice from '../assets/images/Inspiration Gallery/5.jpg';
import inspirationOutdoor from '../assets/images/Inspiration Gallery/6.jpg';
import singleSwingDoor from '../assets/images/Doors/single-swing-576x1024.jpg';
import doubleSwingDoor from '../assets/images/Doors/double-swing-576x1024.jpg';
import manualDoor from '../assets/images/Doors/manuel-door-576x1024.jpg';
import { useUI } from '../context/UIContext.jsx';

const cabinTypes = [
  { name: 'Signature Gold', bestFor: 'Luxury villas', finishes: 'Warm cabin mood, refined trims, soft ceiling light, and finishes that feel integrated with premium residential interiors.', image: libraryCabinImages.signature, tags: ['Premium', 'Warm Mood', 'Low Traffic'] },
  { name: 'Panoramic Crystal', bestFor: 'Architectural homes', finishes: 'Glass-forward composition, slim metallic framing, open visual depth, and a strong design presence.', image: libraryCabinImages.panoramic, tags: ['Iconic', 'Glass', 'Showpiece'] },
  { name: 'Contemporary Sand', bestFor: 'Family residences', finishes: 'Neutral palette, calm lighting, easy-to-match materials, and a balanced finish for daily residential use.', image: libraryCabinImages.contemporary, tags: ['Balanced', 'Comfort', 'Daily Use'] },
  { name: 'Urban Graphite', bestFor: 'Commercial lobbies', finishes: 'Durable finishes, darker contrast, practical surfaces, and a professional cabin mood for repeated traffic.', image: libraryCabinImages.commercial, tags: ['Commercial', 'Durable', 'Modern'] },
  { name: 'Clinical Pure', bestFor: 'Hospitals and clinics', finishes: 'Bright lighting, cleanable panels, protective details, and a hygienic visual language for medical environments.', image: libraryCabinImages.clinical, tags: ['Medical', 'Hygienic', 'Safety'] },
  { name: 'Outdoor Shield', bestFor: 'Exterior lifts', finishes: 'Clear visibility, weather-ready material logic, anti-corrosion thinking, and high-contrast guidance.', image: libraryCabinImages.outdoor, tags: ['Outdoor', 'Resistant', 'Robust'] },
];

const frCabinTypes = [
  { name: 'Signature Or', bestFor: 'Villas de luxe', finishes: 'Ambiance chaleureuse, détails raffinés, éclairage doux au plafond et finitions intégrées aux intérieurs résidentiels premium.', image: libraryCabinImages.signature, tags: ['Premium', 'Ambiance chaude', 'Faible trafic'] },
  { name: 'Cristal Panoramique', bestFor: 'Maisons architecturales', finishes: 'Composition vitrée, encadrement métallique fin, profondeur visuelle ouverte et présence design forte.', image: libraryCabinImages.panoramic, tags: ['Iconique', 'Verre', 'Pièce forte'] },
  { name: 'Sable Contemporain', bestFor: 'Résidences familiales', finishes: 'Palette neutre, éclairage calme, matériaux faciles à associer et finition équilibrée pour l’usage quotidien.', image: libraryCabinImages.contemporary, tags: ['Équilibré', 'Confort', 'Usage quotidien'] },
  { name: 'Graphite Urbain', bestFor: 'Lobbys commerciaux', finishes: 'Finitions durables, contraste sombre, surfaces pratiques et ambiance professionnelle pour un trafic répété.', image: libraryCabinImages.commercial, tags: ['Commercial', 'Durable', 'Moderne'] },
  { name: 'Pure Clinique', bestFor: 'Hôpitaux et cliniques', finishes: 'Éclairage lumineux, panneaux faciles à nettoyer, détails de protection et langage visuel hygiénique.', image: libraryCabinImages.clinical, tags: ['Médical', 'Hygiénique', 'Sécurité'] },
  { name: 'Bouclier Extérieur', bestFor: 'Ascenseurs extérieurs', finishes: 'Visibilité claire, matériaux résistants aux intempéries, logique anticorrosion et guidage visuel contrasté.', image: libraryCabinImages.outdoor, tags: ['Extérieur', 'Résistant', 'Robuste'] },
];

const inspirationSets = [
  { title: 'Villa Comfort Story', tip: 'Use warm tones and wood accents for timeless comfort.', image: inspirationWarm, tags: ['Warm', 'Natural', 'Elegant'] },
  { title: 'Glass & Light Story', tip: 'Prioritize transparency and cool light for visual expansion.', image: inspirationGlass, tags: ['Open', 'Bright', 'Modern'] },
  { title: 'Hospitality Story', tip: 'Align cabin and lobby materials for seamless premium flow.', image: inspirationHospitality, tags: ['Guest Flow', 'Premium', 'Calm'] },
  { title: 'Medical Story', tip: 'Use bright tones and cleanable materials for safety confidence.', image: inspirationMedical, tags: ['Clean', 'Safe', 'Functional'] },
  { title: 'Urban Office Story', tip: 'Combine neutral finishes with faster door logic for traffic.', image: inspirationOffice, tags: ['Traffic', 'Neutral', 'Efficient'] },
  { title: 'Outdoor Access Story', tip: 'Favor durable surfaces and high-contrast visual guidance.', image: inspirationOutdoor, tags: ['Outdoor', 'Durable', 'Clear'] },
];

const frInspirationSets = [
  { title: 'Ambiance Villa Confort', tip: 'Utilisez des tons chauds et des accents bois pour un confort intemporel.', image: inspirationWarm, tags: ['Chaud', 'Naturel', 'Élégant'] },
  { title: 'Ambiance Verre & Lumière', tip: 'Privilégiez la transparence et la lumière froide pour agrandir visuellement l’espace.', image: inspirationGlass, tags: ['Ouvert', 'Lumineux', 'Moderne'] },
  { title: 'Ambiance Hôtellerie', tip: 'Alignez les matériaux cabine et lobby pour un flux premium cohérent.', image: inspirationHospitality, tags: ['Flux client', 'Premium', 'Calme'] },
  { title: 'Ambiance Médicale', tip: 'Utilisez des tons clairs et des matériaux nettoyables pour inspirer confiance.', image: inspirationMedical, tags: ['Propre', 'Sûr', 'Fonctionnel'] },
  { title: 'Ambiance Bureau Urbain', tip: 'Associez finitions neutres et logique de portes rapide pour le trafic.', image: inspirationOffice, tags: ['Trafic', 'Neutre', 'Efficace'] },
  { title: 'Ambiance Accès Extérieur', tip: 'Favorisez les surfaces durables et le guidage visuel à fort contraste.', image: inspirationOutdoor, tags: ['Extérieur', 'Durable', 'Clair'] },
];

const doorCollections = [
  { name: 'Automatic Single Swing', use: 'Homes and compact shafts', detail: 'A clean, elegant residential door solution for projects where space efficiency and simple daily use matter.', image: singleSwingDoor, tags: ['Compact', 'Elegant', 'Residential'] },
  { name: 'Automatic Double Swing', use: 'Premium residential and hospitality', detail: 'A symmetrical entrance with a wider, more ceremonial feel for villas, hospitality spaces, and refined private projects.', image: doubleSwingDoor, tags: ['Premium', 'Symmetric', 'Comfort'] },
  { name: 'Manual Handle Door', use: 'Classic villas and retrofit shafts', detail: 'A tactile door option for classic residential projects and retrofit conditions that need a traditional opening feel.', image: manualDoor, tags: ['Retrofit', 'Classic', 'Residential'] },
];

const frDoorCollections = [
  { name: 'Porte Automatique Simple Battant', use: 'Maisons et gaines compactes', detail: 'Une solution résidentielle propre et élégante quand l’efficacité d’espace et l’usage quotidien comptent.', image: singleSwingDoor, tags: ['Compact', 'Élégant', 'Résidentiel'] },
  { name: 'Porte Automatique Double Battant', use: 'Résidentiel premium et hôtellerie', detail: 'Une entrée symétrique avec une sensation plus large et cérémonielle pour villas et espaces raffinés.', image: doubleSwingDoor, tags: ['Premium', 'Symétrique', 'Confort'] },
  { name: 'Porte Manuelle à Poignée', use: 'Villas classiques et rénovations', detail: 'Une option tactile pour projets résidentiels classiques et rénovations nécessitant une ouverture traditionnelle.', image: manualDoor, tags: ['Rénovation', 'Classique', 'Résidentiel'] },
];

const guidance = {
  cabin: [
    'Start from project type: villa, hospital, office, or outdoor.',
    'Choose visual language first: warm, neutral, glass, or technical.',
    'Validate with traffic level and maintenance expectations.',
  ],
  inspiration: [
    'Pick a reference story close to your building use case.',
    'Compare light mood and finish contrast in each story.',
    'Keep one dominant tone and one accent for clean cohesion.',
  ],
  door: [
    'Select door family based on opening width requirement.',
    'Match door speed with expected daily traffic level.',
    'Confirm durability level for residential vs commercial usage.',
  ],
};

const frGuidance = {
  cabin: [
    'Commencez par le type de projet: villa, hôpital, bureau ou extérieur.',
    'Choisissez d’abord le langage visuel: chaud, neutre, vitré ou technique.',
    'Validez avec le niveau de trafic et les attentes de maintenance.',
  ],
  inspiration: [
    'Choisissez une référence proche de l’usage de votre bâtiment.',
    'Comparez l’ambiance lumineuse et le contraste des finitions.',
    'Gardez un ton dominant et un accent pour une composition claire.',
  ],
  door: [
    'Sélectionnez la famille de porte selon la largeur d’ouverture.',
    'Adaptez la vitesse de porte au trafic quotidien attendu.',
    'Confirmez le niveau de durabilité résidentiel ou commercial.',
  ],
};

const pages = {
  '/cabin-design': {
    current: 'Cabin Design',
    title: 'Cabin',
    accent: 'Design',
    eyebrow: 'Personalization Studio',
    heading: 'Build the Cabin Identity',
    text: 'Compare cabin styles, materials, lighting moods, and project fit. Each option is selected to help the lift feel integrated with the home, hotel, clinic, or office around it.',
    banner: cabinIdentityBanner,
    items: cabinTypes,
    kind: 'cabin',
    galleryTitle: 'Cabin Finish Gallery',
  },
  '/inspiration-gallery': {
    current: 'Inspiration Gallery',
    title: 'Inspiration',
    accent: 'Gallery',
    eyebrow: 'Visual Direction',
    heading: 'Choose by Design Story',
    text: 'Browse real inspiration directions for warm villas, glass interiors, hospitality spaces, medical circulation, outdoor access, and polished commercial lobbies.',
    banner: libraryCabinImages.luxuryBanner,
    items: inspirationSets,
    kind: 'inspiration',
    galleryTitle: 'Inspiration Gallery',
  },
  '/door-collections': {
    current: 'Door Collections',
    title: 'Door',
    accent: 'Collections',
    eyebrow: 'Entry Systems',
    heading: 'Match the Right Door Type',
    text: 'Choose the entry system around opening width, traffic, installation type, safety, and the visual character of the landing.',
    banner: pageImages.contact,
    items: doorCollections,
    kind: 'door',
    galleryTitle: 'Door Collection Gallery',
  },
};

const frPages = {
  '/cabin-design': {
    current: 'Design Cabine',
    title: 'Design',
    accent: 'Cabine',
    eyebrow: 'Studio de Personnalisation',
    heading: 'Construire l’Identité de la Cabine',
    text: 'Comparez styles de cabine, matériaux, ambiances lumineuses et adéquation au projet. Chaque option aide l’ascenseur à s’intégrer naturellement à la maison, l’hôtel, la clinique ou le bureau.',
    banner: cabinIdentityBanner,
    items: frCabinTypes,
    kind: 'cabin',
    galleryTitle: 'Galerie des Finitions Cabine',
  },
  '/inspiration-gallery': {
    current: 'Galerie d’Inspiration',
    title: 'Galerie',
    accent: 'd’Inspiration',
    eyebrow: 'Direction Visuelle',
    heading: 'Choisir par Ambiance Design',
    text: 'Parcourez des directions d’inspiration pour villas chaleureuses, intérieurs vitrés, hôtellerie, circulation médicale, accès extérieur et lobbys commerciaux.',
    banner: libraryCabinImages.luxuryBanner,
    items: frInspirationSets,
    kind: 'inspiration',
    galleryTitle: 'Galerie d’Inspiration',
  },
  '/door-collections': {
    current: 'Collections de Portes',
    title: 'Collections',
    accent: 'de Portes',
    eyebrow: 'Systèmes d’Entrée',
    heading: 'Associer le Bon Type de Porte',
    text: 'Choisissez le système d’entrée selon la largeur d’ouverture, le trafic, le type d’installation, la sécurité et le caractère visuel du palier.',
    banner: pageImages.contact,
    items: frDoorCollections,
    kind: 'door',
    galleryTitle: 'Galerie des Collections de Portes',
  },
};

export default function CabinDesignPage() {
  const { pathname } = useLocation();
  const { language } = useUI();
  const activePages = language === 'fr' ? frPages : pages;
  const activeGuidance = language === 'fr' ? frGuidance : guidance;
  const page = activePages[pathname] ?? activePages['/cabin-design'];
  const gallery = designGalleries[page.kind] ?? [];

  return (
    <>
      <PageHero current={page.current} title={page.title} accent={page.accent} />

      <section className="section">
        <div className="about-split">
          <div>
            <div className="eyebrow">{page.eyebrow}</div>
            <h2 className="section-title">{page.heading}</h2>
            <p className="section-desc">{page.text}</p>
          </div>
          <div className="about-visual" style={{ backgroundImage: `url(${page.banner})` }} />
        </div>

        {page.kind !== 'inspiration' && (
          <div className="cabin-guide">
            {activeGuidance[page.kind].map((step) => (
              <div className="cabin-guide-step" key={step}>{step}</div>
            ))}
          </div>
        )}

        {page.kind !== 'inspiration' && (
          <div className={`cabin-grid ${page.kind === 'door' ? 'door-type-grid' : ''}`}>
            {page.items.map((item) => (
              <article className="cabin-card" key={item.name || item.title}>
                <div className="cabin-card-image">
                  <img src={item.image} alt={item.name || item.title} loading="lazy" />
                </div>
                <div className="cabin-card-body">
                  <h3>{item.name || item.title}</h3>
                  {'tags' in item && (
                    <div className="cabin-tags">
                      {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  )}
                  {page.kind === 'cabin' && (
                    <>
                      <p><strong>{language === 'fr' ? 'Idéal Pour' : 'Best For'}:</strong> {item.bestFor}</p>
                      <p><strong>{language === 'fr' ? 'Logique de Finition' : 'Finish Logic'}:</strong> {item.finishes}</p>
                    </>
                  )}
                  {page.kind === 'door' && (
                    <>
                      <p><strong>{language === 'fr' ? 'Usage' : 'Use Case'}:</strong> {item.use}</p>
                      <p><strong>{language === 'fr' ? 'Note Technique' : 'Technical Note'}:</strong> {item.detail}</p>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {page.kind !== 'cabin' && (
          <ProductGallery
            eyebrow={page.current}
            title={page.galleryTitle}
            images={gallery}
            getLabel={(index) => `${page.current} ${String(index + 1).padStart(2, '0')}`}
          />
        )}
      </section>
    </>
  );
}
