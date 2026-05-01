import Button from '../ui/Button.jsx';
import { imagePaths } from '../../data/siteData.js';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.78) 42%, rgba(8,8,8,0.22) 100%), url(${imagePaths.hero.main})` }} />
      <div className="hero-geo" />
      <div className="hero-logo-display">
        <div className="hero-logo-ring" />
        <div className="hero-logo-ring-2" />
        <img src={imagePaths.logos.main} alt="Atlas Ascenseurs Logo" />
      </div>
      <div className="hero-content">
        <div className="hero-label">Welcome to Atlas Ascenseurs</div>
        <h1 className="hero-title hero-title-luxury">Luxury Elevators,<br /><em>Made Personal.</em></h1>
        <div className="hero-actions">
          <Button to="/contact">Get a Quote</Button>
          <Button to="/elevators" variant="outline">Explore More</Button>
        </div>
      </div>
      <div className="hero-scroll">Scroll to discover</div>
    </section>
  );
}
