import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import { commercialElevators, residentialElevators } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

const elevatorPages = {
  '/elevators/circular-elevators': { title: 'Circular', accent: 'Elevators', source: 'res', key: 'Circular Elevators' },
  '/elevators/exterior-elevators': { title: 'Exterior', accent: 'Elevators', source: 'res', key: 'Exterior Elevators' },
  '/elevators/astoria-range': { title: 'Astoria', accent: 'Range', source: 'res', key: 'Astoria Range' },
  '/elevators/como-range': { title: 'COMO', accent: 'Residential', source: 'res', key: 'COMO Residential' },
  '/elevators/hospital-lifts': { title: 'Hospital', accent: 'Lifts', source: 'com', key: 'Hospital Lifts' },
  '/elevators/car-lifts': { title: 'Car', accent: 'Lifts', source: 'com', key: 'Car Lifts' },
  '/elevators/escalators-walkways': { title: 'Escalators', accent: '& Walkways', source: 'com', key: 'Escalators & Walkways' },
  '/elevators/como-commercial': { title: 'COMO', accent: 'Commercial', source: 'com', key: 'COMO Commercial' },
  '/elevators/cargo-lifts': { title: 'Cargo', accent: 'Lifts', source: 'com', key: 'Cargo Lifts' },
  '/elevators/dumbwaiter-lifts': { title: 'Dumbwaiter', accent: 'Lifts', source: 'com', key: 'Dumbwaiter Lifts' },
};

export default function ElevatorDetail() {
  const { language } = useUI();
  const { pathname } = useLocation();
  const page = elevatorPages[pathname] ?? elevatorPages['/elevators/astoria-range'];

  const item = useMemo(() => {
    const pool = page.source === 'res' ? residentialElevators : commercialElevators;
    return pool.find(([, title]) => title === page.key) ?? pool[0];
  }, [page.key, page.source]);

  const [, itemTitle, itemText, itemImage] = item;

  return (
    <>
      <PageHero current={language === 'fr' ? 'Nos Ascenseurs' : 'Our Elevators'} title={page.title} accent={page.accent} />
      <section className="section">
        <div className="about-split">
          <div>
            <div className="eyebrow">{language === 'fr' ? `${page.source === 'res' ? 'Ascenseur Résidentiel' : 'Ascenseur Commercial'}` : `${page.source === 'res' ? 'Residential' : 'Commercial'} Lift`}</div>
            <h2 className="section-title">{itemTitle}</h2>
            <p className="section-desc">{itemText}</p>
          </div>
          <div className="about-visual" style={{ backgroundImage: `url(${itemImage})` }} />
        </div>
      </section>
    </>
  );
}
