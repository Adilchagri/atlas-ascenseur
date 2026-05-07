import { useEffect, useMemo, useRef, useState } from 'react';
import PageHero from '../components/layout/PageHero.jsx';
import { useUI } from '../context/UIContext.jsx';
import logo from '../assets/images/logos/atlas ascenseur.png';

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

const frConfiguratorText = {
  current: 'Personnalisation 3D',
  title: 'Personnalisation',
  accent: 'Ascenseur 3D',
  eyebrow: 'Configurer Votre Ascenseur',
  heading: 'Choisissez le Type,<br />Puis Façonnez la <em>Cabine.</em>',
  desc: 'Le configurateur suit la logique produit Atlas: chaque modèle affiche uniquement les capacités, vitesses, portes, commandes et finitions compatibles.',
  liftType: 'Type d’Ascenseur',
  capacity: 'Capacité',
  speed: 'Vitesse',
  doorType: 'Type de Porte',
  controlPanel: 'Panneau de Commande',
  wallFinish: 'Finition Murale',
  floor: 'Sol',
  lighting: 'Éclairage',
  selectedType: 'Type Sélectionné',
  spec: 'Spécification',
  doorCop: 'Porte + COP',
  finish: 'Finition',
  bestFor: 'Idéal Pour',
  drag: 'Glissez pour tourner',
  downloadModel: 'Télécharger Mon Modèle',
  modalEyebrow: 'Résumé Personnalisé',
  modalTitle: 'Recevoir Votre PDF',
  modalText: 'Entrez vos informations pour télécharger votre fiche de configuration Atlas Ascenseurs.',
  firstName: 'Prénom',
  lastName: 'Nom',
  phone: 'Téléphone',
  email: 'Email',
  cancel: 'Annuler',
  submitDownload: 'Télécharger le PDF',
};

const enConfiguratorText = {
  current: '3D Personalization',
  title: '3D',
  accent: 'Elevator Personalization',
  eyebrow: 'Configure Your Lift',
  heading: 'Choose the Type,<br />Then Shape the <em>Cabin.</em>',
  desc: 'The configurator follows Atlas product logic: each model exposes only compatible capacities, speeds, doors, controls, and finishes.',
  liftType: 'Lift Type',
  capacity: 'Capacity',
  speed: 'Speed',
  doorType: 'Door Type',
  controlPanel: 'Control Panel',
  wallFinish: 'Wall Finish',
  floor: 'Floor',
  lighting: 'Lighting',
  selectedType: 'Selected Type',
  spec: 'Spec',
  doorCop: 'Door + COP',
  finish: 'Finish',
  bestFor: 'Best For',
  drag: 'Drag to rotate',
  downloadModel: 'Download My Model',
  modalEyebrow: 'Personalized Summary',
  modalTitle: 'Get Your PDF',
  modalText: 'Enter your details to download your Atlas Ascenseurs configuration sheet.',
  firstName: 'First Name',
  lastName: 'Last Name',
  phone: 'Phone Number',
  email: 'Email',
  cancel: 'Cancel',
  submitDownload: 'Download PDF',
};

const frProfileText = {
  astoria: {
    name: 'Ascenseur Résidentiel Astoria',
    short: 'Astoria',
    useCase: 'Villas, maisons de ville et appartements premium.',
    features: ['Gaine compacte', 'Trajet silencieux', 'Cabine premium'],
  },
  'como-residential': {
    name: 'COMO Résidentiel',
    short: 'COMO Maison',
    useCase: 'Maisons compactes, villas à plusieurs niveaux et appartements accessibles.',
    features: ['Espace optimisé', 'Hydraulique/Électrique', 'Veille énergétique'],
  },
  circular: {
    name: 'Panoramique Circulaire',
    short: 'Circulaire',
    useCase: 'Intérieurs de luxe où l’ascenseur devient un élément architectural.',
    features: ['Verre panoramique', 'Pièce design', 'Mains courantes sur mesure'],
  },
  exterior: {
    name: 'Ascenseur Vitré Extérieur',
    short: 'Extérieur',
    useCase: 'Terrasses, jardins, maisons à niveaux décalés et accès extérieur.',
    features: ['Construction résistante', 'Anticorrosion', 'Accès extérieur'],
  },
  'como-commercial': {
    name: 'COMO Commercial',
    short: 'Commercial',
    useCase: 'Bureaux, hôtels, bâtiments publics et trafic passagers quotidien.',
    features: ['Prêt fort trafic', 'Motorisation gearless', 'Secours UPS'],
  },
  hospital: {
    name: 'Ascenseur Hospitalier',
    short: 'Hôpital',
    useCase: 'Circulation médicale pour lits, patients, visiteurs et personnel.',
    features: ['Cabine compatible lit', 'Surfaces hygiéniques', 'Démarrage/arrêt doux'],
  },
  cargo: {
    name: 'Monte-charge',
    short: 'Charge',
    useCase: 'Entrepôts, usines, réserves commerciales et charges lourdes.',
    features: ['Cabine renforcée', 'Seuil robuste', 'Fiabilité industrielle'],
  },
  car: {
    name: 'Monte-voitures',
    short: 'Voiture',
    useCase: 'Garages, showrooms, parkings et accès véhicules.',
    features: ['Alignement véhicule', 'Protection pare-chocs', 'Précision basse vitesse'],
  },
  dumbwaiter: {
    name: 'Monte-plats',
    short: 'Monte-plats',
    useCase: 'Restaurants, hôtels, cliniques, villas et service back-office.',
    features: ['Empreinte compacte', 'Service multi-étages', 'Efficacité du personnel'],
  },
  escalator: {
    name: 'Escalator / Trottoir Roulant',
    short: 'Escalator',
    useCase: 'Centres commerciaux, aéroports, gares, supermarchés et flux public.',
    features: ['Flux continu', 'Marches antidérapantes', 'Capteurs de sécurité'],
  },
};

const frOptionLabels = {
  White: 'Blanc',
  Red: 'Rouge',
  Steel: 'Acier',
  Stone: 'Pierre',
  Marble: 'Marbre',
  Wood: 'Bois',
  Rubber: 'Caoutchouc',
  'Warm Gold': 'Or Chaud',
  'Cool White': 'Blanc Froid',
  Neutral: 'Neutre',
  'Automatic Single Swing': 'Porte automatique simple battant',
  'Automatic Double Swing': 'Porte automatique double battant',
  'Manual Handle': 'Poignée manuelle',
  'Center Opening Auto': 'Ouverture centrale automatique',
  'Side Opening Auto': 'Ouverture latérale automatique',
  'Wide Side Opening': 'Grande ouverture latérale',
  'Manual Heavy Duty': 'Manuelle renforcée',
  'Automatic Industrial': 'Automatique industrielle',
  'Drive-Through Auto': 'Traversante automatique',
  'Single Landing Auto': 'Palier simple automatique',
  'Hinged Service Door': 'Porte de service battante',
  'Guillotine Door': 'Porte guillotine',
  'N/A (Open Transport)': 'N/A (transport ouvert)',
  'Glass Balustrade Entry': 'Entrée balustrade vitrée',
  'Soft Touch COP': 'COP tactile doux',
  'Brushed Steel COP': 'COP acier brossé',
  'Glass Touch COP': 'COP tactile verre',
  'Weatherproof COP': 'COP étanche',
  'Stainless COP': 'COP inox',
  'Destination Control': 'Commande de destination',
  'Antibacterial COP': 'COP antibactérien',
  'Hands-Free Call': 'Appel sans contact',
  'Industrial COP': 'COP industriel',
  'Key Switch Control': 'Commande à clé',
  'Remote + COP': 'Télécommande + COP',
  'Simple Push Panel': 'Panneau simple à boutons',
  'Digital Service Panel': 'Panneau de service digital',
  'Traffic Sensor Mode': 'Mode capteur de trafic',
  'Energy Saver Mode': 'Mode économie d’énergie',
};

function localOption(value, language) {
  return language === 'fr' ? (frOptionLabels[value] || value) : value;
}

function localProfile(profile, language) {
  if (language !== 'fr') return profile;
  const text = frProfileText[profile.id];
  return text ? { ...profile, ...text } : profile;
}

function firstAllowed(collection, ids) {
  return collection.find((item) => ids.includes(item.id)) ?? collection[0];
}

const LEADS_ENDPOINT = import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT || '';

export default function Configurator() {
  const { language } = useUI();
  const copy = language === 'fr' ? frConfiguratorText : enConfiguratorText;
  const [profileId, setProfileId] = useState(configProfiles[0].id);
  const profile = useMemo(() => configProfiles.find((item) => item.id === profileId) ?? configProfiles[0], [profileId]);
  const displayProfile = localProfile(profile, language);
  const [openGroups, setOpenGroups] = useState({ type: true });

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
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadForm, setLeadForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

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
    const doorTravel = clamp(16 + speedValue * 8, 18, 34);
    const displayCode = profile.short.slice(0, 1).toUpperCase();
    const floorLabel = localOption(floor.label, language);
    const wallLabel = localOption(wall.label, language);
    const lightLabel = localOption(light.label, language);

    return { doorClass, controlClass, scaleFromLoad, doorDuration, doorTravel, displayCode, floorLabel, wallLabel, lightLabel };
  }, [control, door, floor.label, language, light.label, load, profile.short, speed, wall.label]);

  const toggleGroup = (id) => {
    setOpenGroups((current) => ({ ...current, [id]: !current[id] }));
  };

  const summary = useMemo(() => ({
    type: displayProfile.name,
    capacity: load,
    speed,
    door: localOption(door, language),
    control: localOption(control, language),
    wall: localOption(wall.label, language),
    floor: localOption(floor.label, language),
    lighting: localOption(light.label, language),
    bestFor: displayProfile.useCase,
    features: displayProfile.features,
    wallA: wall.a,
    wallB: wall.b,
    floorColor: floor.color,
    lightColor: light.color,
  }), [control, displayProfile.features, displayProfile.name, displayProfile.useCase, door, floor.color, floor.label, language, light.color, light.label, load, speed, wall.a, wall.b, wall.label]);

  const onLeadChange = (event) => {
    const { name, value } = event.target;
    setLeadForm((current) => ({ ...current, [name]: value }));
  };

  const onLeadSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      ...leadForm,
      submittedAt: new Date().toISOString(),
      configuration: summary,
    };

    if (LEADS_ENDPOINT) {
      try {
        await fetch(LEADS_ENDPOINT, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Keep the PDF flow working even if the sheet endpoint is temporarily unavailable.
      }
    } else {
      console.warn('Google Sheets export is not configured. Add VITE_GOOGLE_SHEETS_ENDPOINT to .env.');
    }

    downloadConfigurationPdf({ lead: payload, summary, language, logoUrl: logo });
    setLeadModalOpen(false);
  };

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
      <PageHero current={copy.current} title={copy.title} accent={copy.accent} />
      <section className="section">
        <div className="config-shell">
          <div>
            <div className="eyebrow">{copy.eyebrow}</div>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: copy.heading }} />
            <p className="section-desc">{copy.desc}</p>

            <div className="config-panel">
              <ConfigGroup id="type" title={copy.liftType} open={openGroups.type} onToggle={toggleGroup}>
                <div className="config-options">
                  {configProfiles.map((item) => (
                    <Option key={item.id} active={profileId === item.id} onClick={() => setProfileId(item.id)}>
                      {localProfile(item, language).short}
                    </Option>
                  ))}
                </div>
              </ConfigGroup>

              <ConfigGroup id="capacity" title={copy.capacity} open={openGroups.capacity} onToggle={toggleGroup}>
                <div className="config-options">
                  {profile.load.map((item) => <Option key={item} active={load === item} onClick={() => setLoad(item)}>{item}</Option>)}
                </div>
              </ConfigGroup>

              <ConfigGroup id="speed" title={copy.speed} open={openGroups.speed} onToggle={toggleGroup}>
                <div className="config-options">
                  {profile.speed.map((item) => <Option key={item} active={speed === item} onClick={() => setSpeed(item)}>{item}</Option>)}
                </div>
              </ConfigGroup>

              <ConfigGroup id="door" title={copy.doorType} open={openGroups.door} onToggle={toggleGroup}>
                <div className="config-options">
                  {profile.doors.map((item) => <Option key={item} active={door === item} onClick={() => setDoor(item)}>{localOption(item, language)}</Option>)}
                </div>
              </ConfigGroup>

              <ConfigGroup id="control" title={copy.controlPanel} open={openGroups.control} onToggle={toggleGroup}>
                <div className="config-options">
                  {profile.controls.map((item) => <Option key={item} active={control === item} onClick={() => setControl(item)}>{localOption(item, language)}</Option>)}
                </div>
              </ConfigGroup>

              <ConfigGroup id="wall" title={copy.wallFinish} open={openGroups.wall} onToggle={toggleGroup}>
                <div className="swatch-row">
                  {availableWalls.map((item) => (
                    <Swatch key={item.id} active={wall.id === item.id} label={localOption(item.label, language)} background={item.background} onClick={() => setWall(item)} />
                  ))}
                </div>
              </ConfigGroup>

              <ConfigGroup id="floor" title={copy.floor} open={openGroups.floor} onToggle={toggleGroup}>
                <div className="swatch-row">
                  {availableFloors.map((item) => (
                    <Swatch key={item.id} active={floor.id === item.id} label={localOption(item.label, language)} background={item.background} onClick={() => setFloor(item)} />
                  ))}
                </div>
              </ConfigGroup>

              <ConfigGroup id="lighting" title={copy.lighting} open={openGroups.lighting} onToggle={toggleGroup} flush>
                <div className="config-options">
                  {availableLights.map((item) => <Option key={item.id} active={light.id === item.id} onClick={() => setLight(item)}>{localOption(item.label, language)}</Option>)}
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
              className={`${modelClass} ${visualState.doorClass} ${visualState.controlClass} floor-${floor.id} wall-${wall.id} light-${light.id} ${isInteracting ? 'is-interacting' : ''}`}
              style={{
                '--wall-a': wall.a,
                '--wall-b': wall.b,
                '--floor': floor.color,
                '--light': light.color,
                '--rx': `${rotateX}deg`,
                '--ry': `${rotateY}deg`,
                '--cabin-scale': visualState.scaleFromLoad,
                '--door-speed': `${visualState.doorDuration}s`,
                '--door-travel': `${visualState.doorTravel}px`,
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
              <div className="lift-floor-preview" />
              <div className="lift-panel" />
              <div className="lift-metal-trim" />
              <div className="lift-display">{visualState.displayCode}</div>
              <div className="lift-material-label">{visualState.wallLabel} / {visualState.floorLabel} / {visualState.lightLabel}</div>
            </div>

            <div className="config-readout">
              <Readout label={copy.selectedType} value={displayProfile.name} />
              <Readout label={copy.spec} value={`${load} - ${speed}`} />
              <Readout label={copy.doorCop} value={`${localOption(door, language)} + ${localOption(control, language)}`} />
              <Readout label={copy.finish} value={language === 'fr' ? `${localOption(wall.label, language)} murs, ${localOption(floor.label, language)} sol, lumière ${localOption(light.label, language)}` : `${wall.label} walls, ${floor.label} floor, ${light.label} light`} />
              <Readout label={copy.bestFor} value={displayProfile.useCase} />
            </div>

            <div className="config-feature-grid">
              {displayProfile.features.map((feature) => <span key={feature} className="config-feature-pill">{feature}</span>)}
            </div>
            <div className="config-drag-hint">{copy.drag}</div>
          </div>

          <div className="config-download-panel">
            <div>
              <span>{copy.modalEyebrow}</span>
              <strong>{copy.downloadModel}</strong>
            </div>
            <button className="btn-gold config-download-btn" type="button" onClick={() => setLeadModalOpen(true)}>
              {copy.downloadModel}
            </button>
          </div>
        </div>
      </section>

      {leadModalOpen && (
        <div className="lead-modal-backdrop" role="presentation">
          <div className="lead-modal" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
            <button className="lead-modal-close" type="button" onClick={() => setLeadModalOpen(false)} aria-label={copy.cancel}>×</button>
            <img className="lead-modal-logo" src={logo} alt="Atlas Ascenseurs" />
            <div className="eyebrow">{copy.modalEyebrow}</div>
            <h2 id="lead-modal-title">{copy.modalTitle}</h2>
            <p>{copy.modalText}</p>
            <form onSubmit={onLeadSubmit}>
              <div className="lead-form-row">
                <LeadField label={copy.firstName} name="firstName" value={leadForm.firstName} onChange={onLeadChange} required />
                <LeadField label={copy.lastName} name="lastName" value={leadForm.lastName} onChange={onLeadChange} required />
              </div>
              <LeadField label={copy.phone} name="phone" type="tel" value={leadForm.phone} onChange={onLeadChange} required />
              <LeadField label={copy.email} name="email" type="email" value={leadForm.email} onChange={onLeadChange} required />
              <div className="lead-modal-actions">
                <button className="btn-outline" type="button" onClick={() => setLeadModalOpen(false)}>{copy.cancel}</button>
                <button className="btn-gold" type="submit">{copy.submitDownload}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

function LeadField({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <label className="lead-field">
      <span>{label}</span>
      <input name={name} type={type} value={value} onChange={onChange} required={required} />
    </label>
  );
}

function ConfigGroup({ id, title, children, open = false, onToggle, flush = false }) {
  return (
    <div className={`config-group ${open ? 'open' : ''} ${flush ? 'flush' : ''}`}>
      <button className="config-group-toggle" type="button" onClick={() => onToggle(id)} aria-expanded={open}>
        <span>{title}</span>
        <span className="config-group-chevron" />
      </button>
      <div className="config-group-content">
        {children}
      </div>
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

async function downloadConfigurationPdf({ lead, summary, language, logoUrl }) {
  const canvas = document.createElement('canvas');
  canvas.width = 900;
  canvas.height = 1180;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 900, 1180);
  gradient.addColorStop(0, '#080808');
  gradient.addColorStop(0.55, '#151515');
  gradient.addColorStop(1, '#050505');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 900, 1180);

  ctx.strokeStyle = 'rgba(201,168,76,0.5)';
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, 816, 1096);

  const logoImage = await loadImage(logoUrl);
  if (logoImage) {
    ctx.drawImage(logoImage, 62, 58, 96, 96);
  } else {
    ctx.fillStyle = '#c9a84c';
    ctx.font = 'bold 34px Georgia, serif';
    ctx.fillText('ATLAS', 70, 100);
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText('ASCENSEURS', 72, 124);
  }

  ctx.fillStyle = '#ffffff';
  ctx.font = '42px Georgia, serif';
  ctx.fillText(language === 'fr' ? 'Configuration Ascenseur' : 'Elevator Configuration', 70, 190);
  ctx.fillStyle = '#c9a84c';
  ctx.font = '22px Arial, sans-serif';
  ctx.fillText(summary.type, 72, 226);

  drawModelPreview(ctx, summary, 560, 285);

  const lines = [
    ['Client', `${lead.firstName} ${lead.lastName}`],
    [language === 'fr' ? 'Téléphone' : 'Phone', lead.phone],
    ['Email', lead.email],
    [language === 'fr' ? 'Capacité' : 'Capacity', summary.capacity],
    [language === 'fr' ? 'Vitesse' : 'Speed', summary.speed],
    [language === 'fr' ? 'Porte' : 'Door', summary.door],
    ['COP', summary.control],
    [language === 'fr' ? 'Murs' : 'Walls', summary.wall],
    [language === 'fr' ? 'Sol' : 'Floor', summary.floor],
    [language === 'fr' ? 'Éclairage' : 'Lighting', summary.lighting],
    [language === 'fr' ? 'Idéal Pour' : 'Best For', summary.bestFor],
    [language === 'fr' ? 'Atouts' : 'Features', summary.features.join(' | ')],
  ];

  let y = 300;
  lines.forEach(([label, value]) => {
    ctx.fillStyle = '#c9a84c';
    ctx.font = '13px Arial, sans-serif';
    ctx.fillText(String(label).toUpperCase(), 72, y);
    ctx.fillStyle = '#f4efe3';
    ctx.font = '22px Arial, sans-serif';
    wrapCanvasText(ctx, value, 72, y + 30, 420, 28);
    y += value.length > 42 ? 88 : 62;
  });

  ctx.fillStyle = '#8d8576';
  ctx.font = '14px Arial, sans-serif';
  ctx.fillText(`Generated ${new Date().toLocaleString()}`, 70, 1090);
  ctx.fillText('contact@atlasascenseurs.ma  |  +212 666323055', 70, 1118);

  canvas.toBlob(async (blob) => {
    if (!blob) return;
    const pdf = await buildImagePdf(blob);
    const url = URL.createObjectURL(pdf);
    const link = document.createElement('a');
    link.href = url;
    link.download = `atlas-configuration-${Date.now()}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, 'image/jpeg', 0.92);
}

function drawModelPreview(ctx, summary, x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = 'rgba(201,168,76,0.12)';
  ctx.fillRect(-30, -30, 260, 430);
  const wallGradient = ctx.createLinearGradient(0, 0, 190, 320);
  wallGradient.addColorStop(0, summary.wallA);
  wallGradient.addColorStop(1, summary.wallB);
  ctx.fillStyle = wallGradient;
  ctx.fillRect(20, 20, 190, 320);
  ctx.strokeStyle = 'rgba(232,201,122,0.8)';
  ctx.lineWidth = 3;
  ctx.strokeRect(20, 20, 190, 320);
  ctx.fillStyle = 'rgba(0,0,0,0.26)';
  ctx.fillRect(115, 45, 86, 280);
  ctx.fillStyle = 'rgba(255,255,255,0.16)';
  ctx.fillRect(32, 45, 76, 280);
  ctx.fillStyle = summary.lightColor;
  ctx.shadowColor = summary.lightColor;
  ctx.shadowBlur = 18;
  ctx.fillRect(60, 36, 110, 9);
  ctx.shadowBlur = 0;
  ctx.fillStyle = summary.floorColor;
  ctx.beginPath();
  ctx.moveTo(32, 300);
  ctx.lineTo(198, 300);
  ctx.lineTo(168, 340);
  ctx.lineTo(20, 340);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(158, 118, 22, 120);
  ctx.fillStyle = '#c9a84c';
  ctx.beginPath();
  ctx.arc(169, 142, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f4efe3';
  ctx.font = '13px Arial, sans-serif';
  ctx.fillText(summary.capacity, 66, 370);
  ctx.restore();
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = String(text).split(' ');
  let line = '';
  words.forEach((word) => {
    const testLine = `${line}${word} `;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      ctx.fillText(line.trim(), x, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line.trim(), x, y);
}

async function buildImagePdf(imageBlob) {
  const imageBytes = new Uint8Array(await imageBlob.arrayBuffer());
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [];
  let length = 0;

  const addText = (text) => {
    const bytes = encoder.encode(text);
    chunks.push(bytes);
    length += bytes.length;
  };
  const addBytes = (bytes) => {
    chunks.push(bytes);
    length += bytes.length;
  };
  const markObject = (id, body) => {
    offsets[id] = length;
    addText(`${id} 0 obj\n${body}\nendobj\n`);
  };

  addText('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  markObject(1, '<< /Type /Catalog /Pages 2 0 R >>');
  markObject(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  markObject(3, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>');

  offsets[4] = length;
  addText(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width 900 /Height 1180 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${imageBytes.length} >>\nstream\n`);
  addBytes(imageBytes);
  addText('\nendstream\nendobj\n');

  const content = 'q\n612 0 0 792 0 0 cm\n/Im0 Do\nQ\n';
  markObject(5, `<< /Length ${content.length} >>\nstream\n${content}endstream`);

  const xrefStart = length;
  addText(`xref\n0 6\n0000000000 65535 f \n`);
  for (let id = 1; id <= 5; id += 1) {
    addText(`${String(offsets[id]).padStart(10, '0')} 00000 n \n`);
  }
  addText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`);

  return new Blob(chunks, { type: 'application/pdf' });
}
