import { pageImages } from '../data/siteData.js';

const policySections = [
  {
    number: '1',
    title: 'Information We Collect',
    icon: 'person',
    groups: [
      {
        heading: 'Personal Information',
        items: ['Full Name', 'Phone Number', 'Email Address', 'City', 'Project Information'],
      },
      {
        heading: 'Project Information',
        items: ['Project location', 'Type of project', 'Elevator model of interest', 'Installation timeline', 'Any additional information you provide'],
      },
    ],
  },
  {
    number: '2',
    title: 'How We Use Your Information',
    icon: 'clipboard',
    items: [
      'Contact you regarding your request.',
      'Prepare a personalized quotation.',
      'Recommend the most suitable elevator solution.',
      'Schedule consultations or site visits.',
      'Improve our customer service.',
      'Follow up on your project.',
    ],
  },
  {
    number: '3',
    title: 'Data Sharing',
    icon: 'users',
    paragraphs: [
      'Atlas Ascenseurs does not sell, rent, or trade your personal information.',
      'Information may only be shared with Atlas Ascenseurs employees, authorized installation partners, and technical suppliers when required for your project.',
    ],
  },
  {
    number: '4',
    title: 'Data Security',
    icon: 'shield',
    paragraphs: [
      'We implement appropriate technical and organizational measures to protect your information against unauthorized access, loss, misuse, alteration, and disclosure.',
    ],
  },
  {
    number: '5',
    title: 'Data Retention',
    icon: 'clock',
    paragraphs: [
      'We keep your information only as long as necessary to process your inquiry, manage your project, and meet legal and business requirements.',
    ],
  },
  {
    number: '6',
    title: 'Your Rights',
    icon: 'profile',
    paragraphs: [
      'You may request access, correction, deletion, or withdrawal of consent at any time by contacting contact@atlasascenseurs.com.',
    ],
  },
  {
    number: '7',
    title: 'Cookies',
    icon: 'cookie',
    paragraphs: [
      'Our website may use cookies to improve your browsing experience and analyze website traffic.',
    ],
  },
  {
    number: '8',
    title: 'Facebook Lead Ads',
    icon: 'facebook',
    paragraphs: [
      'Information submitted through Meta Lead Forms is used solely by Atlas Ascenseurs to respond to your inquiry.',
    ],
  },
  {
    number: '9',
    title: 'Third-Party Services',
    icon: 'globe',
    items: ['Meta', 'Odoo CRM', 'Google Analytics', 'Google Maps', 'Google Ads'],
  },
  {
    number: '10',
    title: 'Changes to This Policy',
    icon: 'file',
    paragraphs: [
      'Atlas Ascenseurs may update this Privacy Policy at any time.',
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="privacy-page">
      <div className="nav-spacer" />
      <header className="privacy-hero" style={{ '--privacy-hero-image': `url(${pageImages.privacy})` }}>
        <div className="privacy-hero-content">
          <span>Atlas Ascenseurs</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: July 2026</p>
        </div>
      </header>

      <section className="privacy-intro-section" aria-label="Privacy policy introduction">
        <div className="privacy-intro">
          <div className="privacy-intro-icon" aria-hidden="true">
            <PolicyIcon name="lock" />
          </div>
          <div>
            <p><strong>Atlas Ascenseurs ("we", "our", or "us")</strong> respects your privacy and is committed to protecting your personal information.</p>
            <p>This Privacy Policy explains what information we collect, how we use it, and your rights when you interact with our website, Facebook Lead Forms, social media pages, or contact us directly.</p>
          </div>
        </div>
      </section>

      <section className="privacy-policy-section" aria-label="Privacy policy details">
        <div className="privacy-policy-grid">
          {policySections.map((section) => (
            <PolicySection key={section.number} section={section} />
          ))}
        </div>

        <div className="privacy-contact-band">
          <div className="privacy-contact-icon" aria-hidden="true">
            <PolicyIcon name="mail" />
          </div>
          <div className="privacy-contact-copy">
            <h2><span>11.</span> Contact Us</h2>
            <p>Atlas Ascenseurs</p>
          </div>
          <div className="privacy-contact-lines">
            <a href="mailto:contact@atlasascenseurs.com">Email: contact@atlasascenseurs.com</a>
            <a href="https://atlasascenseurs.com" target="_blank" rel="noreferrer">Website: https://atlasascenseurs.com</a>
          </div>
        </div>
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
        {section.groups?.map((group) => (
          <div className="privacy-policy-group" key={group.heading}>
            <h3>{group.heading}</h3>
            <PolicyList items={group.items} />
          </div>
        ))}
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
    case 'lock':
      return (
        <svg {...common}>
          <path d="M12 21h24v19H12z" />
          <path d="M17 21v-6a7 7 0 0 1 14 0v6" />
          <path d="M24 29v5" />
        </svg>
      );
    case 'person':
      return (
        <svg {...common}>
          <path d="M24 23a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          <path d="M10 42v-5a14 14 0 0 1 28 0v5" />
          <path d="M15 42h18" />
        </svg>
      );
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
    case 'users':
      return (
        <svg {...common}>
          <path d="M18 22a7 7 0 1 0 0-14 7 7 0 0 0 0 14z" />
          <path d="M31 24a6 6 0 1 0 0-12" />
          <path d="M6 41v-4a12 12 0 0 1 24 0v4" />
          <path d="M30 30a10 10 0 0 1 12 10v1" />
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
    case 'profile':
      return (
        <svg {...common}>
          <circle cx="24" cy="16" r="8" />
          <path d="M10 42a14 14 0 0 1 28 0" />
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
    case 'facebook':
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="18" />
          <path d="M28 15h-3a5 5 0 0 0-5 5v3h-4v6h4v12h6V29h5l1-6h-6v-3a1 1 0 0 1 1-1h4v-4z" />
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
    case 'file':
      return (
        <svg {...common}>
          <path d="M14 5h14l8 8v30H14z" />
          <path d="M28 5v9h8" />
          <path d="M20 24h12" />
          <path d="M20 32h12" />
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
