import Button from '../ui/Button.jsx';
import { ElevatorCard } from '../ui/Cards.jsx';
import { elevatorCards } from '../../data/siteData.js';

export default function ElevatorsSection() {
  return (
    <section className="section section-alt">
      <div className="elevators-header">
        <div>
          <div className="eyebrow">Our Range</div>
          <h2 className="section-title no-margin">Engineered for <em>Every</em> Space.</h2>
        </div>
        <Button to="/elevators" variant="outline">View All Elevators</Button>
      </div>
      <div className="elevators-grid">
        {elevatorCards.map((card) => <ElevatorCard key={card.title} {...card} />)}
      </div>
    </section>
  );
}
