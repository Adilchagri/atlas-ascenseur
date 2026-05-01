import { whyCards } from '../../data/siteData.js';
import { WhyCard } from '../ui/Cards.jsx';

export default function WhySection() {
  return (
    <section className="section">
      <div className="eyebrow">Why Atlas Ascenseurs</div>
      <h2 className="section-title">Built on Trust,<br />Delivered with <em>Precision.</em></h2>
      <p className="section-desc">Every building is unique. Atlas Ascenseurs pairs Euro-Moroccan safety standards with a local Moroccan team that can design, install, maintain, and modernize lifts across Casablanca, Rabat, Marrakech, Tangier, Agadir, Fes, and beyond.</p>
      <div className="why-grid">
        {whyCards.map((card) => <WhyCard key={card.number} {...card} />)}
      </div>
    </section>
  );
}
