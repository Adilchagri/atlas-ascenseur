import PageHero from '../components/layout/PageHero.jsx';

const pillars = [
  ['01', 'Engineering Excellence', ['European-manufactured components', 'Strict quality control at every stage', 'Compliance with Euro-Moroccan safety norms', 'Continuous R&D investment']],
  ['02', 'Design & Customization', ['Fully customizable cabin interiors', 'Wide range of door collections', 'Bespoke lighting and finishing options', 'Dedicated in-house design team']],
  ['03', 'Local Expertise', ['Present in 10+ Moroccan cities', 'Multilingual team (Arabic, French, English)', 'Fast response and local stock', 'National after-sales network']],
];

export default function About() {
  return (
    <>
      <PageHero current="About" title="About" accent="Atlas Ascenseurs" />
      <section className="section">
        <div className="about-split">
          <div>
            <div className="eyebrow">Our Story</div>
            <h2 className="section-title">More Than an <em>Elevator</em> Company.</h2>
          </div>
          <div>
            <p>Atlas Ascenseurs is a premium Moroccan elevator company built around reliable residential and commercial vertical transport, refined engineering, and a clearer client experience.</p>
            <p>An elevator is not only a way to move between floors. It is a daily experience, an architectural detail, a safety system, and a long-term investment that should feel natural inside the building.</p>
            <p>From private villas and clinics to hotels, offices, public spaces, and logistics buildings, Atlas Ascenseurs supports each project from design and technical study to installation, maintenance, modernization, and emergency response.</p>
          </div>
        </div>
      </section>
      <section className="section section-alt">
        <div className="eyebrow">Our Pillars</div>
        <h2 className="section-title section-title-spaced">What We Stand <em>For.</em></h2>
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
