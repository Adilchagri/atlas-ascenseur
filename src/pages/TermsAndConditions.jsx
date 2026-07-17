import LegalPolicyPage from '../components/layout/LegalPolicyPage.jsx';

const sections = [
  {
    number: '1',
    title: 'Introduction',
    icon: 'file',
    paragraphs: [
      "This website ('Site') is operated by MHI Stays Morocco SARL, trading as Atlas Ascenseurs ('we', 'our' or 'us'). By using www.atlasascenseurs.com you agree to these Terms and Conditions and our Privacy Policy.",
    ],
  },
  {
    number: '2',
    title: 'Website Purpose',
    icon: 'globe',
    paragraphs: [
      'This website provides information about residential elevators, commercial elevators, panoramic elevators, outdoor elevators, modernization, maintenance and customized mobility solutions.',
    ],
  },
  {
    number: '3',
    title: 'Quotations',
    icon: 'clipboard',
    paragraphs: [
      'All quotations are subject to technical validation, site inspection and the validity period stated on the quotation. Prices may change due to supplier costs, exchange rates or shipping.',
    ],
  },
  {
    number: '4',
    title: 'Orders',
    icon: 'clipboard',
    paragraphs: [
      'Orders become effective only after written acceptance, deposit payment and final technical approval.',
    ],
  },
  {
    number: '5',
    title: 'Delivery & Installation',
    icon: 'clock',
    paragraphs: [
      'Delivery times are estimates and may vary because of manufacturing, shipping, customs, weather, force majeure or site readiness.',
    ],
  },
  {
    number: '6',
    title: 'Warranty',
    icon: 'shield',
    paragraphs: [
      'Products are covered by the applicable manufacturer warranty. Warranty excludes misuse, unauthorized modifications, fire, flooding, electrical instability and lack of maintenance.',
    ],
  },
  {
    number: '7',
    title: 'Maintenance',
    icon: 'shield',
    paragraphs: [
      'Regular maintenance by qualified technicians is recommended to ensure safety, performance and warranty eligibility.',
    ],
  },
  {
    number: '8',
    title: 'Intellectual Property',
    icon: 'file',
    paragraphs: [
      'All text, logos, brochures, drawings, photographs, videos and website content remain the property of Atlas Ascenseurs or its licensors.',
    ],
  },
  {
    number: '9',
    title: 'Limitation of Liability',
    icon: 'shield',
    paragraphs: [
      'Atlas Ascenseurs is not liable for temporary website interruptions, technical errors or indirect damages arising from website use.',
    ],
  },
  {
    number: '10',
    title: 'Third-Party Links',
    icon: 'globe',
    paragraphs: [
      'External website links are provided for convenience only. Atlas Ascenseurs is not responsible for their content.',
    ],
  },
  {
    number: '11',
    title: 'Privacy',
    icon: 'shield',
    paragraphs: [
      'Personal information is processed in accordance with our Privacy Policy and is never sold to third parties.',
    ],
  },
  {
    number: '12',
    title: 'Governing Law',
    icon: 'file',
    paragraphs: [
      'These Terms are governed by the laws of the Kingdom of Morocco. Any dispute shall be subject to the competent courts of Casablanca.',
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <LegalPolicyPage
      title="Terms and Conditions"
      updated="General Terms of Use MHI Stays Morocco SARL - Trading as Atlas Ascenseurs"
      introIcon="file"
      intro={[
        '<strong>Atlas Ascenseurs</strong> provides these Terms and Conditions for visitors using www.atlasascenseurs.com.',
      ]}
      sections={sections}
      contact={{
        number: '13',
        title: 'Contact',
        lines: ['Atlas Ascenseurs', 'MHI Stays Morocco SARL'],
        links: [
          { label: 'Website: www.atlasascenseurs.com', href: 'https://www.atlasascenseurs.com', external: true },
          { label: 'Email: contact@atlasascenseurs.com', href: 'mailto:contact@atlasascenseurs.com' },
        ],
      }}
    />
  );
}
