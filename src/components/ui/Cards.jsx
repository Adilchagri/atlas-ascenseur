import { Link } from 'react-router-dom';

export function WhyCard({ number, title, text }) {
  return (
    <article className="why-card reveal">
      <div className="why-icon">{number}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function ElevatorCard({ tag, title, desc, image }) {
  return (
    <Link className="elev-card" to="/elevators">
      <div className="elev-bg" style={{ backgroundImage: `url(${image})` }} />
      <div className="elev-icon-bg" />
      <div className="elev-overlay" />
      <div className="elev-content">
        <span className="elev-tag">{tag}</span>
        <h3>{title}</h3>
        <div className="elev-desc">{desc}</div>
      </div>
    </Link>
  );
}

export function ProductCard({ icon, title, text, image }) {
  return (
    <article className="elev-page-card">
      {image && <div className="elev-page-cover" style={{ backgroundImage: `url(${image})` }} />}
      <div className="elev-page-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

export function ProjectCard({ category, title, desc, image, page = false }) {
  const cardClass = page ? 'proj-page-card' : 'proj-card';
  const inner = (
    <>
      <div className={page ? 'proj-page-icon' : 'proj-placeholder'} />
      <div className={page ? 'proj-page-bg' : 'proj-bg'} style={{ backgroundImage: `url(${image})` }} />
      <div className={page ? 'proj-page-overlay' : 'proj-overlay'}>
        <div className={page ? 'proj-page-info' : 'proj-info'}>
          <span>{category}</span>
          <h3>{title}</h3>
          {page && <p>{desc}</p>}
        </div>
      </div>
    </>
  );

  if (page) {
    return <article className={cardClass}>{inner}</article>;
  }

  return (
    <article className={cardClass}>
      <div className="proj-inner">{inner}</div>
    </article>
  );
}

export function ServiceCard({ number, title, text, detail, image }) {
  return (
    <article className="service-card">
      {image && <div className="service-cover" style={{ backgroundImage: `url(${image})` }} />}
      <div className="service-num">{number}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <div className="service-detail">{detail}</div>
    </article>
  );
}
