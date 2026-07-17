import { pageImages } from '../../data/siteData.js';

export default function LegalPolicyPage({ title, eyebrow = 'Atlas Ascenseurs', updated, introIcon = 'file', intro = [], sections = [], contact }) {
  return (
    <div className="privacy-page">
      <div className="nav-spacer" />
      <header className="privacy-hero" style={{ '--privacy-hero-image': `url(${pageImages.privacy})` }}>
        <div className="privacy-hero-content">
          <span>{eyebrow}</span>
          <h1>{title}</h1>
          {updated && <p>{updated}</p>}
        </div>
      </header>

      {intro.length > 0 && (
        <section className="privacy-intro-section" aria-label={`${title} introduction`}>
          <div className="privacy-intro">
            <div className="privacy-intro-icon" aria-hidden="true">
              <PolicyIcon name={introIcon} />
            </div>
            <div>
              {intro.map((paragraph) => <p key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />)}
            </div>
          </div>
        </section>
      )}

      <section className="privacy-policy-section" aria-label={`${title} details`}>
        <div className="privacy-policy-grid">
          {sections.map((section) => (
            <PolicySection key={section.number} section={section} />
          ))}
        </div>

        {contact && (
          <div className="privacy-contact-band">
            <div className="privacy-contact-icon" aria-hidden="true">
              <PolicyIcon name="mail" />
            </div>
            <div className="privacy-contact-copy">
              <h2><span>{contact.number}.</span> {contact.title}</h2>
              {contact.lines?.map((line) => <p key={line}>{line}</p>)}
            </div>
            <div className="privacy-contact-lines">
              {contact.links?.map((link) => (
                <a href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} key={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function PolicySection({ section }) {
  return (
    <article className="privacy-policy-item">
      <div className="privacy-policy-icon" aria-hidden="true">
        <PolicyIcon name={section.icon} />
      </div>
      <div className="privacy-policy-copy">
        <h2><span>{section.number}.</span> {section.title}</h2>
        {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.items && <PolicyList items={section.items} />}
      </div>
    </article>
  );
}

function PolicyList({ items }) {
  return (
    <ul>
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

function PolicyIcon({ name }) {
  const common = {
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '2',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  };

  switch (name) {
    case 'clipboard':
      return (
        <svg {...common}>
          <path d="M16 8h16v6H16z" />
          <path d="M12 11H8v31h32V11h-4" />
          <path d="M17 22h14" />
          <path d="M17 30h14" />
          <path d="M17 38h8" />
        </svg>
      );
    case 'file':
      return (
        <svg {...common}>
          <path d="M14 5h14l8 8v30H14z" />
          <path d="M28 5v9h8" />
          <path d="M20 24h12" />
          <path d="M20 32h12" />
        </svg>
      );
    case 'globe':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="18" />
          <path d="M6 24h36" />
          <path d="M24 6c5 5 8 11 8 18s-3 13-8 18c-5-5-8-11-8-18s3-13 8-18z" />
        </svg>
      );
    case 'shield':
      return (
        <svg {...common}>
          <path d="M24 5l16 6v10c0 10-6.5 18-16 22C14.5 39 8 31 8 21V11l16-6z" />
          <path d="M17 24l5 5 10-11" />
        </svg>
      );
    case 'clock':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="18" />
          <path d="M24 13v12l8 5" />
        </svg>
      );
    case 'cookie':
      return (
        <svg {...common}>
          <path d="M41 25a17 17 0 1 1-18-18 8 8 0 0 0 8 10 8 8 0 0 0 10 8z" />
          <circle cx="17" cy="19" r="1.5" />
          <circle cx="25" cy="30" r="1.5" />
          <circle cx="15" cy="33" r="1.5" />
        </svg>
      );
    case 'mail':
      return (
        <svg {...common}>
          <path d="M7 13h34v24H7z" />
          <path d="M7 15l17 13 17-13" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="18" />
          <path d="M24 15v10" />
          <path d="M24 33h.01" />
        </svg>
      );
  }
}
