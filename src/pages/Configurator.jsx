import { useMemo, useState } from 'react';
import PageHero from '../components/layout/PageHero.jsx';

const typeUseCases = {
  'Astoria Home Lift': 'Villas, townhouses, and premium apartments.',
  'COMO Residential': 'Compact homes, multi-story villas, and accessible apartments.',
  'Circular Panoramic': 'Luxury interiors where the lift is an architectural feature.',
  'Exterior Glass Lift': 'Terraces, gardens, split-level homes, and outdoor access.',
  'COMO Commercial': 'Offices, hotels, public buildings, and daily passenger traffic.',
  'Hospital Lift': 'Healthcare circulation for beds, patients, visitors, and staff.',
  'Cargo Lift': 'Warehouses, factories, retail stockrooms, and heavy goods.',
  'Car Lift': 'Garages, showrooms, parking buildings, and vehicle access.',
  Dumbwaiter: 'Restaurants, hotels, clinics, villas, and back-of-house service.',
  'Escalator / Walkway': 'Malls, airports, stations, supermarkets, and public flow.',
};

const types = ['Astoria Home Lift', 'COMO Residential', 'Circular Panoramic', 'Exterior Glass Lift', 'COMO Commercial', 'Hospital Lift', 'Cargo Lift', 'Car Lift', 'Dumbwaiter', 'Escalator / Walkway'];
const walls = [
  { label: 'Habana', a: '#b08a5a', b: '#f0eee6', background: 'linear-gradient(135deg,#9c7142,#f0eee6)' },
  { label: 'Sahara', a: '#c9b38d', b: '#f4ead8', background: 'linear-gradient(135deg,#c9b38d,#f4ead8)' },
  { label: 'White', a: '#f3f1ea', b: '#b8b8b8', background: 'linear-gradient(135deg,#f3f1ea,#b8b8b8)' },
  { label: 'Red', a: '#7c1723', b: '#d04a55', background: 'linear-gradient(135deg,#61111a,#d04a55)' },
  { label: 'Turquoise', a: '#2a8a90', b: '#bfe8e2', background: 'linear-gradient(135deg,#1f777d,#bfe8e2)' },
  { label: 'Steel', a: '#9da1a3', b: '#2a2d2f', background: 'linear-gradient(135deg,#c5c7c8,#2a2d2f)' },
];
const floors = [
  { label: 'Stone', color: '#2c2c2c', background: '#2c2c2c' },
  { label: 'Marble', color: '#d8d3c8', background: 'linear-gradient(135deg,#f5f0e8,#b9b3aa)' },
  { label: 'Wood', color: '#5b3b24', background: '#5b3b24' },
  { label: 'Rubber', color: '#151515', background: '#151515' },
];
const lights = [
  { label: 'Warm Gold', color: 'rgba(232,201,122,0.75)' },
  { label: 'Cool White', color: 'rgba(215,235,255,0.78)' },
  { label: 'Neutral', color: 'rgba(255,255,255,0.85)' },
  { label: 'Aqua', color: 'rgba(191,232,226,0.78)' },
];

export default function Configurator() {
  const [type, setType] = useState(types[0]);
  const [wall, setWall] = useState(walls[0]);
  const [floor, setFloor] = useState(floors[0]);
  const [light, setLight] = useState(lights[0]);

  const modelClass = useMemo(() => {
    const classes = ['lift-3d'];
    if (type.includes('Circular')) classes.push('circular');
    if (type.includes('Exterior')) classes.push('exterior');
    return classes.join(' ');
  }, [type]);

  return (
    <>
      <PageHero current="3D Personalization" title="3D" accent="Elevator Personalization" />
      <section className="section">
        <div className="config-shell">
          <div>
            <div className="eyebrow">Configure Your Lift</div>
            <h2 className="section-title">Choose the Type,<br />Then Shape the <em>Cabin.</em></h2>
            <p className="section-desc">This interactive preview is based on the Atlas Ascenseurs product families: Astoria, COMO, circular, exterior, commercial, hospital, cargo, car lift, dumbwaiter, and escalator/walkway solutions. It helps clients understand the design direction before the technical study.</p>
            <div className="config-panel">
              <ConfigGroup title="Lift Type">
                <div className="config-options">
                  {types.map((item) => <Option key={item} active={type === item} onClick={() => setType(item)}>{shortType(item)}</Option>)}
                </div>
              </ConfigGroup>
              <ConfigGroup title="Wall Finish">
                <div className="swatch-row">
                  {walls.map((item) => (
                    <button key={item.label} className={`swatch ${wall.label === item.label ? 'active' : ''}`} data-label={item.label} style={{ background: item.background }} type="button" onClick={() => setWall(item)} />
                  ))}
                </div>
              </ConfigGroup>
              <ConfigGroup title="Floor">
                <div className="swatch-row">
                  {floors.map((item) => (
                    <button key={item.label} className={`swatch ${floor.label === item.label ? 'active' : ''}`} data-label={item.label} style={{ background: item.background }} type="button" onClick={() => setFloor(item)} />
                  ))}
                </div>
              </ConfigGroup>
              <ConfigGroup title="Lighting" flush>
                <div className="config-options">
                  {lights.map((item) => <Option key={item.label} active={light.label === item.label} onClick={() => setLight(item)}>{item.label}</Option>)}
                </div>
              </ConfigGroup>
            </div>
          </div>
          <div className="config-stage">
            <div className={modelClass} style={{ '--wall-a': wall.a, '--wall-b': wall.b, '--floor': floor.color, '--light': light.color }}>
              <div className="lift-face lift-back" />
              <div className="lift-face lift-left" />
              <div className="lift-face lift-right" />
              <div className="lift-face lift-ceiling" />
              <div className="lift-face lift-floor" />
              <div className="lift-face lift-front" />
              <div className="lift-door left" />
              <div className="lift-door right" />
              <div className="lift-light" />
              <div className="lift-panel" />
            </div>
            <div className="config-readout">
              <Readout label="Selected Type" value={type} />
              <Readout label="Finish" value={`${wall.label} walls, ${floor.label} floor`} />
              <Readout label="Best For" value={typeUseCases[type]} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ConfigGroup({ title, children, flush = false }) {
  return (
    <div className={`config-group ${flush ? 'flush' : ''}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function Option({ active, onClick, children }) {
  return <button className={`config-option ${active ? 'active' : ''}`} type="button" onClick={onClick}>{children}</button>;
}

function Readout({ label, value }) {
  return (
    <div>
      <div className="readout-label">{label}</div>
      <div className="readout-value">{value}</div>
    </div>
  );
}

function shortType(type) {
  return {
    'Astoria Home Lift': 'Astoria',
    'COMO Residential': 'COMO Home',
    'Circular Panoramic': 'Circular',
    'Exterior Glass Lift': 'Exterior',
    'COMO Commercial': 'Commercial',
    'Hospital Lift': 'Hospital',
    'Cargo Lift': 'Cargo',
    'Car Lift': 'Car Lift',
    Dumbwaiter: 'Dumbwaiter',
    'Escalator / Walkway': 'Escalator',
  }[type];
}
