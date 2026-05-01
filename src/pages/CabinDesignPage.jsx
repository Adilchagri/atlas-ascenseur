import { useLocation } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import { imagePaths, pageImages } from '../data/siteData.js';

const cabinTypes = [
  { name: 'Signature Gold', bestFor: 'Luxury villas', finishes: 'Golden trims, marble texture, warm ceiling glow.', image: imagePaths.projects.villa, tags: ['Premium', 'Warm Mood', 'Low Traffic'] },
  { name: 'Panoramic Crystal', bestFor: 'Architectural homes', finishes: 'High-glass composition, slim metallic framing, open visual depth.', image: imagePaths.projects.circular, tags: ['Iconic', 'Glass', 'Showpiece'] },
  { name: 'Contemporary Sand', bestFor: 'Family residences', finishes: 'Neutral sand palette, soft floor tones, balanced lighting.', image: imagePaths.elevators.astoria, tags: ['Balanced', 'Comfort', 'Daily Use'] },
  { name: 'Urban Graphite', bestFor: 'Commercial lobbies', finishes: 'Dark laminates, durable floor, high-traffic resistant skin.', image: imagePaths.elevators.commercial, tags: ['Commercial', 'Durable', 'Modern'] },
  { name: 'Clinical Pure', bestFor: 'Hospitals and clinics', finishes: 'Antibacterial panels, clean white light, protective corners.', image: imagePaths.elevators.hospitalCargo, tags: ['Medical', 'Hygienic', 'Safety'] },
  { name: 'Outdoor Shield', bestFor: 'Exterior lifts', finishes: 'Weather-safe surfaces, anti-corrosion metals, clear contrast lines.', image: imagePaths.elevators.exterior, tags: ['Outdoor', 'Resistant', 'Robust'] },
];

const inspirationSets = [
  { title: 'Villa Comfort Story', tip: 'Use warm tones and wood accents for timeless comfort.', image: imagePaths.projects.villa, tags: ['Warm', 'Natural', 'Elegant'] },
  { title: 'Glass & Light Story', tip: 'Prioritize transparency and cool light for visual expansion.', image: imagePaths.projects.circular, tags: ['Open', 'Bright', 'Modern'] },
  { title: 'Hospitality Story', tip: 'Align cabin and lobby materials for seamless premium flow.', image: imagePaths.projects.golf, tags: ['Guest Flow', 'Premium', 'Calm'] },
  { title: 'Medical Story', tip: 'Use bright tones and cleanable materials for safety confidence.', image: imagePaths.elevators.hospitalCargo, tags: ['Clean', 'Safe', 'Functional'] },
  { title: 'Urban Office Story', tip: 'Combine neutral finishes with faster door logic for traffic.', image: imagePaths.elevators.commercial, tags: ['Traffic', 'Neutral', 'Efficient'] },
  { title: 'Outdoor Access Story', tip: 'Favor durable surfaces and high-contrast visual guidance.', image: imagePaths.projects.outdoor, tags: ['Outdoor', 'Durable', 'Clear'] },
];

const doorCollections = [
  { name: 'Automatic Single Swing', use: 'Homes and compact shafts', detail: 'Elegant profile with efficient opening footprint.', image: imagePaths.elevators.astoria, tags: ['Compact', 'Elegant', 'Residential'] },
  { name: 'Automatic Double Swing', use: 'Premium residential and hospitality', detail: 'Symmetrical look with comfortable entry experience.', image: imagePaths.elevators.circular, tags: ['Premium', 'Symmetric', 'Comfort'] },
  { name: 'Center Opening Auto', use: 'Offices, hotels, and public flow', detail: 'Optimized passenger throughput and professional look.', image: imagePaths.elevators.commercial, tags: ['Fast Flow', 'Commercial', 'Reliable'] },
  { name: 'Wide Side Opening', use: 'Hospital beds and cargo movement', detail: 'Maximum useful opening with smooth handling.', image: imagePaths.elevators.hospitalCargo, tags: ['Wide Access', 'Medical', 'Safe'] },
  { name: 'Industrial Reinforced Door', use: 'Cargo and back-of-house service', detail: 'High durability for frequent heavy operation.', image: imagePaths.elevators.hospitalCargo, tags: ['Heavy Duty', 'Cargo', 'High Cycle'] },
  { name: 'Weatherproof Exterior Entry', use: 'Outdoor installations', detail: 'Sealed mechanisms and robust weather-ready finish.', image: imagePaths.elevators.exterior, tags: ['Outdoor', 'Sealed', 'Durable'] },
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

const pages = {
  '/cabin-design': {
    current: 'Cabin Design',
    title: 'Cabin',
    accent: 'Design',
    eyebrow: 'Personalization Studio',
    heading: 'Build the Cabin Identity',
    text: 'A complete cabin catalog that helps clients compare style, material logic, and fit by project type.',
    banner: pageImages.about,
    items: cabinTypes,
    kind: 'cabin',
  },
  '/inspiration-gallery': {
    current: 'Inspiration Gallery',
    title: 'Inspiration',
    accent: 'Gallery',
    eyebrow: 'Visual Direction',
    heading: 'Choose by Design Story',
    text: 'A guided gallery for faster decisions with real design intentions: comfort, prestige, performance, and clarity.',
    banner: pageImages.faq,
    items: inspirationSets,
    kind: 'inspiration',
  },
  '/door-collections': {
    current: 'Door Collections',
    title: 'Door',
    accent: 'Collections',
    eyebrow: 'Entry Systems',
    heading: 'Match the Right Door Type',
    text: 'Compare door systems through use case, opening logic, and durability so your final choice is both beautiful and practical.',
    banner: pageImages.contact,
    items: doorCollections,
    kind: 'door',
  },
};

export default function CabinDesignPage() {
  const { pathname } = useLocation();
  const page = pages[pathname] ?? pages['/cabin-design'];

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

        <div className="cabin-guide">
          {guidance[page.kind].map((step) => (
            <div className="cabin-guide-step" key={step}>{step}</div>
          ))}
        </div>

        <div className="cabin-grid">
          {page.items.map((item) => (
            <article className="cabin-card" key={item.name || item.title}>
              <div className="cabin-card-image" style={{ backgroundImage: `url(${item.image})` }} />
              <div className="cabin-card-body">
                <h3>{item.name || item.title}</h3>
                {'tags' in item && (
                  <div className="cabin-tags">
                    {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                )}
                {page.kind === 'cabin' && (
                  <>
                    <p><strong>Best For:</strong> {item.bestFor}</p>
                    <p><strong>Finish Logic:</strong> {item.finishes}</p>
                  </>
                )}
                {page.kind === 'inspiration' && (
                  <>
                    <p><strong>Inspiration:</strong> {item.title}</p>
                    <p><strong>Selection Tip:</strong> {item.tip}</p>
                  </>
                )}
                {page.kind === 'door' && (
                  <>
                    <p><strong>Use Case:</strong> {item.use}</p>
                    <p><strong>Technical Note:</strong> {item.detail}</p>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
