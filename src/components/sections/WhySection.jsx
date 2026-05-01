import { whyCards } from '../../data/siteData.js';
import { WhyCard } from '../ui/Cards.jsx';
import { useUI } from '../../context/UIContext.jsx';

export default function WhySection() {
  const { language } = useUI();
  return (
    <section className="section">
      <div className="eyebrow">{language === 'fr' ? 'Pourquoi Atlas Ascenseurs' : 'Why Atlas Ascenseurs'}</div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: language === 'fr' ? 'Fondé sur la confiance,<br />Livré avec <em>Précision.</em>' : 'Built on Trust,<br />Delivered with <em>Precision.</em>' }} />
      <p className="section-desc">{language === 'fr' ? 'Chaque bâtiment est unique. Atlas Ascenseurs associe les normes de sécurité euro-marocaines à une équipe locale capable de concevoir, installer, maintenir et moderniser des ascenseurs à travers tout le Maroc.' : 'Every building is unique. Atlas Ascenseurs pairs Euro-Moroccan safety standards with a local Moroccan team that can design, install, maintain, and modernize lifts across Casablanca, Rabat, Marrakech, Tangier, Agadir, Fes, and beyond.'}</p>
      <div className="why-grid">
        {whyCards.map((card) => <WhyCard key={card.number} {...card} />)}
      </div>
    </section>
  );
}
