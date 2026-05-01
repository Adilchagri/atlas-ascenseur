import PageHero from '../components/layout/PageHero.jsx';
import { ServiceCard } from '../components/ui/Cards.jsx';
import { services } from '../data/siteData.js';

export default function Service() {
  return (
    <>
      <PageHero current="Service & Maintenance" title="Service &" accent="Maintenance" />
      <section className="section">
        <div className="eyebrow">Our Services</div>
        <h2 className="section-title">We're With You <em>Always.</em></h2>
        <p className="section-desc">Beyond installation, Atlas Ascenseurs provides complete service and maintenance support: scheduled maintenance, modernization, inspections, repairs, and priority response for owners.</p>
        <div className="service-grid">
          {services.map(([number, title, text, detail]) => <ServiceCard key={number} number={number} title={title} text={text} detail={detail} />)}
        </div>
      </section>
    </>
  );
}
