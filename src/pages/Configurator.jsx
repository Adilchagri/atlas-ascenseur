import { useEffect, useMemo, useRef, useState } from 'react';
import PageHero from '../components/layout/PageHero.jsx';

const walls = [
  { id: 'habana', label: 'Habana', a: '#b08a5a', b: '#f0eee6', background: 'linear-gradient(135deg,#9c7142,#f0eee6)' },
  { id: 'sahara', label: 'Sahara', a: '#c9b38d', b: '#f4ead8', background: 'linear-gradient(135deg,#c9b38d,#f4ead8)' },
  { id: 'white', label: 'White', a: '#f3f1ea', b: '#b8b8b8', background: 'linear-gradient(135deg,#f3f1ea,#b8b8b8)' },
  { id: 'red', label: 'Red', a: '#7c1723', b: '#d04a55', background: 'linear-gradient(135deg,#61111a,#d04a55)' },
  { id: 'turquoise', label: 'Turquoise', a: '#2a8a90', b: '#bfe8e2', background: 'linear-gradient(135deg,#1f777d,#bfe8e2)' },
  { id: 'steel', label: 'Steel', a: '#9da1a3', b: '#2a2d2f', background: 'linear-gradient(135deg,#c5c7c8,#2a2d2f)' },
];

const floors = [
  { id: 'stone', label: 'Stone', color: '#2c2c2c', background: '#2c2c2c' },
  { id: 'marble', label: 'Marble', color: '#d8d3c8', background: 'linear-gradient(135deg,#f5f0e8,#b9b3aa)' },
  { id: 'wood', label: 'Wood', color: '#5b3b24', background: '#5b3b24' },
  { id: 'rubber', label: 'Rubber', color: '#151515', background: '#151515' },
];

const lights = [
  { id: 'warm-gold', label: 'Warm Gold', color: 'rgba(232,201,122,0.75)' },
  { id: 'cool-white', label: 'Cool White', color: 'rgba(215,235,255,0.78)' },
  { id: 'neutral', label: 'Neutral', color: 'rgba(255,255,255,0.85)' },
  { id: 'aqua', label: 'Aqua', color: 'rgba(191,232,226,0.78)' },
];

const configProfiles = [
  {
    id: 'astoria',
    name: 'Astoria Home Lift',
    short: 'Astoria',
    useCase: 'Villas, townhouses, and premium apartments.',
    load: ['320 kg', '400 kg', '450 kg'],
    speed: ['0.6 m/s', '1.0 m/s'],
    doors: ['Automatic Single Swing', 'Automatic Double Swing', 'Manual Handle'],
    controls: ['Soft Touch COP', 'Brushed Steel COP'],
    walls: ['habana', 'sahara', 'white', 'steel'],
    floors: ['stone', 'marble', 'wood'],
    lights: ['warm-gold', 'neutral', 'cool-white'],
    features: ['Compact Shaft', 'Quiet Ride', 'Premium Cabin'],
  },
  {
    id: 'como-residential',
    name: 'COMO Residential',
    short: 'COMO Home',
    useCase: 'Compact homes, multi-story villas, and accessible apartments.',
    load: ['320 kg', '400 kg', '500 kg'],
    speed: ['0.6 m/s', '1.0 m/s'],
    doors: ['Automatic Single Swing', 'Automatic Double Swing'],
    controls: ['Soft Touch COP', 'Glass Touch COP'],
    walls: ['sahara', 'white', 'red', 'steel'],
    floors: ['stone', 'marble', 'wood'],
    lights: ['warm-gold', 'neutral', 'cool-white'],
    features: ['Space Optimized', 'Hydraulic/Electric', 'Energy Standby'],
  },
  {
    id: 'circular',
    name: 'Circular Panoramic',
    short: 'Circular',
    useCase: 'Luxury interiors where the lift is an architectural feature.',
    load: ['320 kg', '400 kg'],
    speed: ['0.6 m/s', '1.0 m/s'],
    doors: ['Automatic Single Swing', 'Automatic Double Swing'],
    controls: ['Glass Touch COP', 'Brushed Steel COP'],
    walls: ['white', 'turquoise', 'steel'],
    floors: ['marble', 'wood'],
    lights: ['warm-gold', 'neutral', 'aqua'],
    features: ['Panoramic Glass', 'Design Statement', 'Custom Railings'],
  },
  {
    id: 'exterior',
    name: 'Exterior Glass Lift',
    short: 'Exterior',
    useCase: 'Terraces, gardens, split-level homes, and outdoor access.',
    load: ['320 kg', '400 kg', '500 kg'],
    speed: ['0.6 m/s', '1.0 m/s'],
    doors: ['Automatic Single Swing', 'Automatic Double Swing'],
    controls: ['Weatherproof COP', 'Brushed Steel COP'],
    walls: ['white', 'steel', 'turquoise'],
    floors: ['stone', 'rubber'],
    lights: ['neutral', 'cool-white'],
    features: ['Weatherproof Build', 'Anti-Corrosion', 'Outdoor Access'],
  },
  {
    id: 'como-commercial',
    name: 'COMO Commercial',
    short: 'Commercial',
    useCase: 'Offices, hotels, public buildings, and daily passenger traffic.',
    load: ['630 kg', '800 kg', '1000 kg'],
    speed: ['1.0 m/s', '1.6 m/s'],
    doors: ['Center Opening Auto', 'Side Opening Auto'],
    controls: ['Stainless COP', 'Destination Control'],
    walls: ['sahara', 'white', 'steel'],
    floors: ['stone', 'marble', 'rubber'],
    lights: ['neutral', 'cool-white'],
    features: ['High Traffic Ready', 'Gearless Drive', 'UPS Rescue'],
  },
  {
    id: 'hospital',
    name: 'Hospital Lift',
    short: 'Hospital',
    useCase: 'Healthcare circulation for beds, patients, visitors, and staff.',
    load: ['1000 kg', '1275 kg', '1600 kg'],
    speed: ['1.0 m/s', '1.6 m/s', '2.0 m/s'],
    doors: ['Wide Side Opening', 'Center Opening Auto'],
    controls: ['Antibacterial COP', 'Hands-Free Call'],
    walls: ['white', 'steel'],
    floors: ['rubber', 'stone'],
    lights: ['neutral', 'cool-white', 'aqua'],
    features: ['Bed Compatible Cabin', 'Hygienic Surfaces', 'Smooth Start/Stop'],
  },
  {
    id: 'cargo',
    name: 'Cargo Lift',
    short: 'Cargo',
    useCase: 'Warehouses, factories, retail stockrooms, and heavy goods.',
    load: ['1000 kg', '2000 kg', '3000 kg'],
    speed: ['0.6 m/s', '1.0 m/s'],
    doors: ['Manual Heavy Duty', 'Automatic Industrial'],
    controls: ['Industrial COP', 'Key Switch Control'],
    walls: ['steel'],
    floors: ['rubber', 'stone'],
    lights: ['neutral', 'cool-white'],
    features: ['Reinforced Cabin', 'Heavy-Duty Sill', 'Industrial Reliability'],
  },
  {
    id: 'car',
    name: 'Car Lift',
    short: 'Car Lift',
    useCase: 'Garages, showrooms, parking buildings, and vehicle access.',
    load: ['2500 kg', '3500 kg', '5000 kg'],
    speed: ['0.4 m/s', '0.6 m/s'],
    doors: ['Drive-Through Auto', 'Single Landing Auto'],
    controls: ['Remote + COP', 'Industrial COP'],
    walls: ['steel'],
    floors: ['rubber', 'stone'],
    lights: ['neutral', 'cool-white'],
    features: ['Vehicle Alignment', 'Bumper Protection', 'Low-Speed Precision'],
  },
  {
    id: 'dumbwaiter',
    name: 'Dumbwaiter',
    short: 'Dumbwaiter',
    useCase: 'Restaurants, hotels, clinics, villas, and back-of-house service.',
    load: ['50 kg', '100 kg', '250 kg'],
    speed: ['0.3 m/s', '0.5 m/s'],
    doors: ['Hinged Service Door', 'Guillotine Door'],
    controls: ['Simple Push Panel', 'Digital Service Panel'],
    walls: ['white', 'steel'],
    floors: ['stone', 'rubber'],
    lights: ['neutral', 'cool-white'],
    features: ['Compact Footprint', 'Multi-Stop Service', 'Staff Efficiency'],
  },
  {
    id: 'escalator',
    name: 'Escalator / Walkway',
    short: 'Escalator',
    useCase: 'Malls, airports, stations, supermarkets, and public flow.',
    load: ['4500 pph', '6000 pph', '9000 pph'],
    speed: ['0.5 m/s', '0.65 m/s', '0.75 m/s'],
    doors: ['N/A (Open Transport)', 'Glass Balustrade Entry'],
    controls: ['Traffic Sensor Mode', 'Energy Saver Mode'],
    walls: ['steel', 'white'],
    floors: ['rubber', 'stone'],
    lights: ['neutral', 'cool-white', 'aqua'],
    features: ['Continuous Flow', 'Anti-Slip Steps', 'Public Safety Sensors'],
  },
];

function firstAllowed(collection, ids) {
  return collection.find((item) => ids.includes(item.id)) ?? collection[0];
}

export default function Configurator() {
  const [profileId, setProfileId] = useState(configProfiles[0].id);
  const profile = useMemo(() => configProfiles.find((item) => item.id === profileId) ?? configProfiles[0], [profileId]);

  const [wall, setWall] = useState(firstAllowed(walls, profile.walls));
  const [floor, setFloor] = useState(firstAllowed(floors, profile.floors));
  const [light, setLight] = useState(firstAllowed(lights, profile.lights));
  const [load, setLoad] = useState(profile.load[0]);
  const [speed, setSpeed] = useState(profile.speed[0]);
  const [door, setDoor] = useState(profile.doors[0]);
  const [control, setControl] = useState(profile.controls[0]);
  const [rotateX, setRotateX] = useState(-6);
  const [rotateY, setRotateY] = useState(-19);
  const [isInteracting, setIsInteracting] = useState(false);

  const dragRef = useRef({ active: false, startX: 0, startY: 0, baseX: -6, baseY: -19 });

  useEffect(() => {
    setWall(firstAllowed(walls, profile.walls));
    setFloor(firstAllowed(floors, profile.floors));
    setLight(firstAllowed(lights, profile.lights));
    setLoad(profile.load[0]);
    setSpeed(profile.speed[0]);
    setDoor(profile.doors[0]);
    setControl(profile.controls[0]);
    if (profile.id === 'exterior') {
      setRotateX(-4);
      setRotateY(-28);
      return;
    }
    if (['cargo', 'car', 'escalator'].includes(profile.id)) {
      setRotateX(-5);
      setRotateY(-15);
      return;
    }
    setRotateX(-6);
    setRotateY(-19);
  }, [profile]);

  const availableWalls = useMemo(() => walls.filter((item) => profile.walls.includes(item.id)), [profile.walls]);
  const availableFloors = useMemo(() => floors.filter((item) => profile.floors.includes(item.id)), [profile.floors]);
  const availableLights = useMemo(() => lights.filter((item) => profile.lights.includes(item.id)), [profile.lights]);

  const modelClass = useMemo(() => {
    const classes = ['lift-3d'];
    if (profile.id === 'circular') classes.push('circular');
    if (profile.id === 'exterior') classes.push('exterior');
    if (['cargo', 'car', 'escalator'].includes(profile.id)) classes.push('industrial');
    return classes.join(' ');
  }, [profile.id]);

  const visualState = useMemo(() => {
    const loadValue = parseInt(load, 10) || 400;
    const speedValue = parseFloat(speed) || 1;

    const doorClass = door.toLowerCase().includes('center')
      ? 'door-center'
      : door.toLowerCase().includes('manual') || door.toLowerCase().includes('hinged')
        ? 'door-manual'
        : door.toLowerCase().includes('side')
          ? 'door-side'
          : 'door-swing';

    const controlClass = control.toLowerCase().includes('glass')
      ? 'panel-glass'
      : control.toLowerCase().includes('industrial')
        ? 'panel-industrial'
        : control.toLowerCase().includes('digital') || control.toLowerCase().includes('destination')
          ? 'panel-digital'
          : control.toLowerCase().includes('weatherproof') || control.toLowerCase().includes('antibacterial')
            ? 'panel-sealed'
            : 'panel-standard';

    const scaleFromLoad = clamp(0.9 + (Math.min(loadValue, 5000) / 5000) * 0.35, 0.9, 1.25);
    const doorDuration = clamp(7.2 - speedValue * 2.4, 2.4, 6.6);
    const displayCode = profile.short.slice(0, 1).toUpperCase();

    return { doorClass, controlClass, scaleFromLoad, doorDuration, displayCode };
  }, [control, door, load, profile.short, speed]);

  const onPointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      baseX: rotateX,
      baseY: rotateY,
    };
    setIsInteracting(true);
  };

  const onPointerMove = (event) => {
    if (!dragRef.current.active) return;
    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;
    const nextY = clamp(dragRef.current.baseY + dx * 0.18, -55, 55);
    const nextX = clamp(dragRef.current.baseX - dy * 0.12, -18, 14);
    setRotateY(nextY);
    setRotateX(nextX);
  };

  const onPointerEnd = (event) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current.active = false;
    setIsInteracting(false);
  };

  return (
    <>
      <PageHero current="3D Personalization" title="3D" accent="Elevator Personalization" />
      <section className="section">
        <div className="config-shell">
          <div>
            <div className="eyebrow">Configure Your Lift</div>
            <h2 className="section-title">Choose the Type,<br />Then Shape the <em>Cabin.</em></h2>
            <p className="section-desc">
              The configurator follows Atlas product logic: each model exposes only compatible capacities, speeds, doors, controls, and finishes.
            </p>

            <div className="config-panel">
              <ConfigGroup title="Lift Type">
                <div className="config-options">
                  {configProfiles.map((item) => (
                    <Option key={item.id} active={profileId === item.id} onClick={() => setProfileId(item.id)}>
                      {item.short}
                    </Option>
                  ))}
                </div>
              </ConfigGroup>

              <ConfigGroup title="Capacity">
                <div className="config-options">
                  {profile.load.map((item) => <Option key={item} active={load === item} onClick={() => setLoad(item)}>{item}</Option>)}
                </div>
              </ConfigGroup>

              <ConfigGroup title="Speed">
                <div className="config-options">
                  {profile.speed.map((item) => <Option key={item} active={speed === item} onClick={() => setSpeed(item)}>{item}</Option>)}
                </div>
              </ConfigGroup>

              <ConfigGroup title="Door Type">
                <div className="config-options">
                  {profile.doors.map((item) => <Option key={item} active={door === item} onClick={() => setDoor(item)}>{item}</Option>)}
                </div>
              </ConfigGroup>

              <ConfigGroup title="Control Panel">
                <div className="config-options">
                  {profile.controls.map((item) => <Option key={item} active={control === item} onClick={() => setControl(item)}>{item}</Option>)}
                </div>
              </ConfigGroup>

              <ConfigGroup title="Wall Finish">
                <div className="swatch-row">
                  {availableWalls.map((item) => (
                    <Swatch key={item.id} active={wall.id === item.id} label={item.label} background={item.background} onClick={() => setWall(item)} />
                  ))}
                </div>
              </ConfigGroup>

              <ConfigGroup title="Floor">
                <div className="swatch-row">
                  {availableFloors.map((item) => (
                    <Swatch key={item.id} active={floor.id === item.id} label={item.label} background={item.background} onClick={() => setFloor(item)} />
                  ))}
                </div>
              </ConfigGroup>

              <ConfigGroup title="Lighting" flush>
                <div className="config-options">
                  {availableLights.map((item) => <Option key={item.id} active={light.id === item.id} onClick={() => setLight(item)}>{item.label}</Option>)}
                </div>
              </ConfigGroup>
            </div>
          </div>

          <div
            className="config-stage"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerEnd}
            onPointerCancel={onPointerEnd}
            onPointerLeave={onPointerEnd}
          >
            <div
              className={`${modelClass} ${visualState.doorClass} ${visualState.controlClass} ${isInteracting ? 'is-interacting' : ''}`}
              style={{
                '--wall-a': wall.a,
                '--wall-b': wall.b,
                '--floor': floor.color,
                '--light': light.color,
                '--rx': `${rotateX}deg`,
                '--ry': `${rotateY}deg`,
                '--cabin-scale': visualState.scaleFromLoad,
                '--door-speed': `${visualState.doorDuration}s`,
              }}
            >
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
              <div className="lift-metal-trim" />
              <div className="lift-display">{visualState.displayCode}</div>
            </div>

            <div className="config-readout">
              <Readout label="Selected Type" value={profile.name} />
              <Readout label="Spec" value={`${load} - ${speed}`} />
              <Readout label="Door + COP" value={`${door} + ${control}`} />
              <Readout label="Finish" value={`${wall.label} walls, ${floor.label} floor, ${light.label} light`} />
              <Readout label="Best For" value={profile.useCase} />
            </div>

            <div className="config-feature-grid">
              {profile.features.map((feature) => <span key={feature} className="config-feature-pill">{feature}</span>)}
            </div>
            <div className="config-drag-hint">Drag to rotate</div>
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

function Swatch({ active, label, background, onClick }) {
  return (
    <button
      className={`swatch ${active ? 'active' : ''}`}
      data-label={label}
      aria-label={label}
      title={label}
      style={{ background }}
      type="button"
      onClick={onClick}
    />
  );
}

function Readout({ label, value }) {
  return (
    <div>
      <div className="readout-label">{label}</div>
      <div className="readout-value">{value}</div>
    </div>
  );
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
