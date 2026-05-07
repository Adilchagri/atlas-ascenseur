import PageHero from '../components/layout/PageHero.jsx';
import { ServiceCard } from '../components/ui/Cards.jsx';
import { getServices } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

export default function Service() {
  const { language } = useUI();
  const services = getServices(language);
  const content = language === 'fr'
    ? {
      current: 'Service & Maintenance',
      title: 'Service &',
      accent: 'Maintenance',
      eyebrow: 'Nos Services',
      heading: 'Nous Restons à Vos Côtés <em>Toujours.</em>',
      desc: 'Au-delà de l’installation, Atlas Ascenseurs assure un accompagnement complet: maintenance planifiée, modernisation, inspections, réparations et intervention prioritaire.',
    }
    : {
      current: 'Service & Maintenance',
      title: 'Service &',
      accent: 'Maintenance',
      eyebrow: 'Our Services',
      heading: "We're With You <em>Always.</em>",
      desc: 'Beyond installation, Atlas Ascenseurs provides complete service and maintenance support: scheduled maintenance, modernization, inspections, repairs, and priority response for owners.',
    };

  return (
    <>
      <PageHero current={content.current} title={content.title} accent={content.accent} />
      <section className="section">
        <div className="eyebrow">{content.eyebrow}</div>
        <h2 className="section-title" dangerouslySetInnerHTML={{ __html: content.heading }} />
        <p className="section-desc">{content.desc}</p>
        <div className="service-grid">
          {services.map(([number, title, text, detail, image]) => <ServiceCard key={number} number={number} title={title} text={text} detail={detail} image={image} />)}
        </div>
      </section>
    </>
  );
}
