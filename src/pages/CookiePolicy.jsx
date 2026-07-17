import LegalPolicyPage from '../components/layout/LegalPolicyPage.jsx';

const sections = [
  {
    number: '1',
    title: 'What Are Cookies?',
    icon: 'cookie',
    paragraphs: [
      'Cookies are small text files stored on your device to improve your browsing experience and help our website function properly.',
    ],
  },
  {
    number: '2',
    title: 'How We Use Cookies',
    icon: 'clipboard',
    paragraphs: [
      'We use cookies to remember your preferences, analyse website traffic, improve performance and support marketing activities.',
    ],
  },
  {
    number: '3',
    title: 'Types of Cookies',
    icon: 'cookie',
    paragraphs: [
      'Essential cookies, analytics cookies and marketing cookies may be used on this website.',
    ],
  },
  {
    number: '4',
    title: 'Managing Cookies',
    icon: 'shield',
    paragraphs: [
      'You can disable or delete cookies at any time through your browser settings. Some website features may not function correctly if cookies are disabled.',
    ],
  },
  {
    number: '5',
    title: 'Third-Party Services',
    icon: 'globe',
    paragraphs: [
      'We may use trusted third-party services such as Google Analytics or Meta Pixel, which may also place cookies in accordance with their own privacy policies.',
    ],
  },
];

export default function CookiePolicy() {
  return (
    <LegalPolicyPage
      title="Cookie Policy"
      updated="Cookie Policy - Atlas Ascenseurs"
      introIcon="cookie"
      intro={[
        '<strong>Atlas Ascenseurs</strong> uses cookies to support core website functionality and improve your browsing experience.',
      ]}
      sections={sections}
      contact={{
        number: '6',
        title: 'Contact',
        lines: ['Atlas Ascenseurs - MHI Stays Morocco SARL'],
        links: [
          { label: 'Website: www.atlasascenseurs.com', href: 'https://www.atlasascenseurs.com', external: true },
        ],
      }}
    />
  );
}
