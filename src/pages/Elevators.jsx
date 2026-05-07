import PageHero from '../components/layout/PageHero.jsx';
import { ProductCard } from '../components/ui/Cards.jsx';
import { getCommercialElevators, getResidentialElevators } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

export default function Elevators() {
  const { language } = useUI();
  const residentialElevators = getResidentialElevators(language);
  const commercialElevators = getCommercialElevators(language);
  const content = language === 'fr'
    ? {
      current: 'Nos Ascenseurs',
      title: 'Notre',
      accent: 'Gamme',
      resEyebrow: 'Ascenseurs Résidentiels',
      resHeading: 'Gamme Résidentielle, Raffinée pour <em>Atlas.</em>',
      resDesc: 'Atlas Ascenseurs couvre les ascenseurs résidentiels, Astoria intérieur, COMO résidentiel, circulaires, extérieurs et panoramiques avec un accompagnement clair.',
      comDivider: 'Ascenseurs Commerciaux',
      comHeading: 'Conçus pour le <em>Trafic, la Sécurité et la Fiabilité.</em>',
      comDesc: 'La gamme commerciale comprend COMO Commercial, escalators et trottoirs roulants, monte-voitures, monte-charges, ascenseurs hospitaliers et monte-plats.',
    }
    : {
      current: 'Our Elevators',
      title: 'Our',
      accent: 'Elevator Range',
      resEyebrow: 'Residential Lifts',
      resHeading: 'Residential Range, Refined for <em>Atlas.</em>',
      resDesc: 'Atlas Ascenseurs covers residential lifts, Astoria indoor elevators, COMO residential, circular elevators, exterior lifts, and panoramic solutions with clear product guidance aligned with the Atlas Ascenseurs identity.',
      comDivider: 'Commercial Lifts',
      comHeading: 'Built for <em>Traffic, Safety, and Uptime.</em>',
      comDesc: 'The commercial range includes COMO Commercial, escalators and walkways, car lifts, cargo lifts, hospital lifts, and dumbwaiter lifts, presented with direct guidance for traffic, safety, and uptime.',
    };

  return (
    <>
      <PageHero current={content.current} title={content.title} accent={content.accent} />
      <section className="section">
        <div className="eyebrow">{content.resEyebrow}</div>
        <h2 className="section-title tight-title" dangerouslySetInnerHTML={{ __html: content.resHeading }} />
        <p className="section-desc">{content.resDesc}</p>
        <div className="elev-page-grid">
          {residentialElevators.map(([icon, title, text, image]) => <ProductCard key={title} icon={icon} title={title} text={text} image={image} />)}
        </div>

        <div className="elev-divider">{content.comDivider}</div>
        <h2 className="section-title tight-title" dangerouslySetInnerHTML={{ __html: content.comHeading }} />
        <p className="section-desc">{content.comDesc}</p>
        <div className="elev-page-grid">
          {commercialElevators.map(([icon, title, text, image]) => <ProductCard key={title} icon={icon} title={title} text={text} image={image} />)}
        </div>
      </section>
    </>
  );
}
