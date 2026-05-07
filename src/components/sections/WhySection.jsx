import { getWhyCards } from '../../data/siteData.js';
import { WhyCard } from '../ui/Cards.jsx';
import { useUI } from '../../context/UIContext.jsx';

export default function WhySection() {
  const { language, t } = useUI();
  const whyCards = getWhyCards(language);
  return (
    <section className="section">
      <div className="eyebrow">{t('whyEyebrow')}</div>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: t('whyHeading') }} />
      <p className="section-desc">{t('whyDesc')}</p>
      <div className="why-grid">
        {whyCards.map((card) => <WhyCard key={card.number} {...card} />)}
      </div>
    </section>
  );
}
