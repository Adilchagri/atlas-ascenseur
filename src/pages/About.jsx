import PageHero from '../components/layout/PageHero.jsx';
import { pageImages } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

const pillars = [
  ['01', 'Engineering Excellence', ['European-manufactured components', 'Strict quality control at every stage', 'Compliance with Euro-Moroccan safety norms', 'Continuous R&D investment']],
  ['02', 'Design & Customization', ['Fully customizable cabin interiors', 'Wide range of door collections', 'Bespoke lighting and finishing options', 'Dedicated in-house design team']],
  ['03', 'Local Expertise', ['Present in 10+ Moroccan cities', 'Multilingual team (Arabic, French, English)', 'Fast response and local stock', 'National after-sales network']],
];

export default function About() {
  const { language } = useUI();
  const content = language === 'fr'
    ? {
      current: 'À Propos',
      title: 'À',
      accent: 'Propos',
      story: 'Notre Histoire',
      heading: 'Plus Qu’une Entreprise <em>d’Ascenseurs.</em>',
      p1: 'Atlas Ascenseurs est une entreprise marocaine premium construite autour d’un transport vertical fiable, d’une ingénierie raffinée et d’une expérience client plus claire.',
      p2: 'Un ascenseur n’est pas seulement un moyen de se déplacer. C’est une expérience quotidienne, un détail architectural, un système de sécurité et un investissement durable.',
      p3: 'Des villas privées aux cliniques, hôtels, bureaux et bâtiments logistiques, Atlas accompagne chaque projet de l’étude à la maintenance.',
      pillars: 'Nos Piliers',
      pillarsHeading: 'Ce Que Nous Représentons <em>Vraiment.</em>',
    }
    : {
      current: 'About',
      title: 'About',
      accent: 'Atlas Ascenseurs',
      story: 'Our Story',
      heading: 'More Than an <em>Elevator</em> Company.',
      p1: 'Atlas Ascenseurs is a premium Moroccan elevator company built around reliable residential and commercial vertical transport, refined engineering, and a clearer client experience.',
      p2: 'An elevator is not only a way to move between floors. It is a daily experience, an architectural detail, a safety system, and a long-term investment that should feel natural inside the building.',
      p3: 'From private villas and clinics to hotels, offices, public spaces, and logistics buildings, Atlas Ascenseurs supports each project from design and technical study to installation, maintenance, modernization, and emergency response.',
      pillars: 'Our Pillars',
      pillarsHeading: 'What We Stand <em>For.</em>',
    };

  return (
    <>
      <PageHero current={content.current} title={content.title} accent={content.accent} />
      <section className="section">
        <div className="about-split">
          <div>
            <div className="eyebrow">{content.story}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: content.heading }} />
            <div className="about-visual" style={{ backgroundImage: `url(${pageImages.about})` }} />
          </div>
          <div>
            <p>{content.p1}</p>
            <p>{content.p2}</p>
            <p>{content.p3}</p>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="eyebrow">{content.pillars}</div>
        <h2 className="section-title section-title-spaced" dangerouslySetInnerHTML={{ __html: content.pillarsHeading }} />
        <div className="pillars-grid">
          {pillars.map(([number, title, items]) => (
            <article className="pillar" key={number}>
              <div className="pillar-num">{number}</div>
              <h3>{title}</h3>
              <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
