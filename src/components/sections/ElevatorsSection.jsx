import Button from '../ui/Button.jsx';
import { ElevatorCard } from '../ui/Cards.jsx';
import { getElevatorCards } from '../../data/siteData.js';
import { useUI } from '../../context/UIContext.jsx';

export default function ElevatorsSection() {
  const { language, t } = useUI();
  const elevatorCards = getElevatorCards(language);
  return (
    <section className="section section-alt">
      <div className="elevators-header">
        <div>
          <div className="eyebrow">{t('ourRange')}</div>
          <h2 className="section-title no-margin" dangerouslySetInnerHTML={{ __html: t('elevatorsHeading') }} />
        </div>
        <Button to="/elevators" variant="outline">{t('viewAllElevators')}</Button>
      </div>
      <div className="elevators-grid">
        {elevatorCards.map((card) => <ElevatorCard key={card.title} {...card} />)}
      </div>
    </section>
  );
}
