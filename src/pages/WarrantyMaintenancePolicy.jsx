import LegalPolicyPage from '../components/layout/LegalPolicyPage.jsx';

const sections = [
  {
    number: '1',
    title: 'Manufacturer Warranty',
    icon: 'shield',
    paragraphs: [
      "All elevators supplied by Atlas Ascenseurs are covered by the applicable manufacturer's warranty from the date of commissioning.",
    ],
  },
  {
    number: '2',
    title: 'Warranty Coverage',
    icon: 'shield',
    paragraphs: [
      "The warranty covers manufacturing defects and defective components under normal use, subject to the manufacturer's conditions.",
    ],
  },
  {
    number: '3',
    title: 'Warranty Exclusions',
    icon: 'file',
    paragraphs: [
      'The warranty does not cover misuse, accidents, flooding, fire, power fluctuations, unauthorized modifications, vandalism, normal wear or lack of scheduled maintenance.',
    ],
  },
  {
    number: '4',
    title: 'Preventive Maintenance',
    icon: 'clock',
    paragraphs: [
      'Regular maintenance by Atlas Ascenseurs or an approved technician is recommended to ensure safety, reliability and warranty eligibility.',
    ],
  },
  {
    number: '5',
    title: 'Service Requests',
    icon: 'clipboard',
    paragraphs: [
      'In the event of a fault, customers should contact Atlas Ascenseurs promptly. Our technical team will schedule an inspection and provide the appropriate assistance.',
    ],
  },
  {
    number: '6',
    title: 'Spare Parts',
    icon: 'file',
    paragraphs: [
      'We maintain access to genuine spare parts to ensure reliable repairs and long-term performance.',
    ],
  },
  {
    number: '7',
    title: 'Governing Law',
    icon: 'globe',
    paragraphs: [
      'This policy is governed by the laws of the Kingdom of Morocco.',
    ],
  },
];

export default function WarrantyMaintenancePolicy() {
  return (
    <LegalPolicyPage
      title="Warranty & Maintenance Policy"
      updated="Warranty & Maintenance Policy - Atlas Ascenseurs"
      introIcon="shield"
      intro={[
        '<strong>Atlas Ascenseurs</strong> applies the following warranty and maintenance policy to elevators supplied by the company.',
      ]}
      sections={sections}
    />
  );
}
