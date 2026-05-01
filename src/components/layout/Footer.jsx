import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="footer-brand-name" to="/">Atlas <em>Ascenseurs</em></Link>
          <p>Combining proven engineering, refined design, and local expertise, Atlas Ascenseurs delivers reliable elevator solutions across Morocco.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/about">About Us</Link>
          <Link to="/elevators">Our Elevators</Link>
          <Link to="/configurator">3D Personalization</Link>
          <Link to="/service">Service & Maintenance</Link>
          <Link to="/projects">Our Projects</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Our Elevators</h4>
          <Link to="/elevators">Residential Lifts</Link>
          <Link to="/elevators">Commercial Lifts</Link>
          <Link to="/elevators">Circular Elevators</Link>
          <Link to="/elevators">Hospital Lifts</Link>
          <Link to="/elevators">Cargo Lifts</Link>
          <Link to="/elevators">Escalators</Link>
          <Link to="/configurator">Cabin Configurator</Link>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <a>Casablanca - Rue 2, Racine</a>
          <a>+212 6 08 88 30 30</a>
          <a>+212 5 22 23 19 73</a>
          <a>contact@atlasascenseurs.ma</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>(c) 2026 Atlas Ascenseurs - Premium Elevators Morocco. All Rights Reserved.</p>
        <p className="footer-tagline">Designed in detail. Installed with confidence.</p>
        <p className="legal-copy">Privacy Policy - Terms & Conditions</p>
      </div>
    </footer>
  );
}
