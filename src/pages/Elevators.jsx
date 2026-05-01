import PageHero from '../components/layout/PageHero.jsx';
import { ProductCard } from '../components/ui/Cards.jsx';
import { commercialElevators, residentialElevators } from '../data/siteData.js';

export default function Elevators() {
  return (
    <>
      <PageHero current="Our Elevators" title="Our" accent="Elevator Range" />
      <section className="section">
        <div className="eyebrow">Residential Lifts</div>
        <h2 className="section-title tight-title">Residential Range, Refined for <em>Atlas.</em></h2>
        <p className="section-desc">Atlas Ascenseurs covers residential lifts, Astoria indoor elevators, COMO residential, circular elevators, exterior lifts, and panoramic solutions with clear product guidance aligned with the Atlas Ascenseurs identity.</p>
        <div className="elev-page-grid">
          {residentialElevators.map(([icon, title, text]) => <ProductCard key={title} icon={icon} title={title} text={text} />)}
        </div>

        <div className="elev-divider">Commercial Lifts</div>
        <h2 className="section-title tight-title">Built for <em>Traffic, Safety, and Uptime.</em></h2>
        <p className="section-desc">The commercial range includes COMO Commercial, escalators and walkways, car lifts, cargo lifts, hospital lifts, and dumbwaiter lifts, presented with direct guidance for traffic, safety, and uptime.</p>
        <div className="elev-page-grid">
          {commercialElevators.map(([icon, title, text]) => <ProductCard key={title} icon={icon} title={title} text={text} />)}
        </div>
      </section>
    </>
  );
}
