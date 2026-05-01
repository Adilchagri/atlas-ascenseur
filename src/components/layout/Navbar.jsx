import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { commercialLinks, imagePaths, navLinks, residentialLinks } from '../../data/siteData.js';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link className="nav-logo" to="/" onClick={closeMobile}>
          <img src={imagePaths.logos.main} alt="Atlas Ascenseurs" />
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/about">About</NavLink></li>
          <li>
            <span>Our Elevators <span className="nav-chevron" /></span>
            <div className="dropdown">
              <div className="dropdown-col">
                <h4>Residential Lifts</h4>
                {residentialLinks.map((item) => <Link key={item} to="/elevators">{item}</Link>)}
              </div>
              <div className="dropdown-col">
                <h4>Commercial Lifts</h4>
                {commercialLinks.map((item) => <Link key={item} to="/elevators">{item}</Link>)}
              </div>
            </div>
          </li>
          <li>
            <span>Cabin Design <span className="nav-chevron" /></span>
            <div className="dropdown dropdown-small">
              <div className="dropdown-col">
                <h4>Personalization</h4>
                {['Cabin Design', 'Inspiration Gallery', 'Door Collections'].map((item) => <Link key={item} to="/projects">{item}</Link>)}
              </div>
            </div>
          </li>
          {navLinks.slice(1).map((link) => (
            <li key={link.to}><NavLink to={link.to}>{link.label}</NavLink></li>
          ))}
        </ul>

        <Link className="nav-cta" to="/contact">Get a Quote</Link>

        <button className="hamburger" type="button" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobileMenu">
        <Link to="/about" onClick={closeMobile}>About</Link>
        <div className="mobile-sub-title">Residential Lifts</div>
        <div className="mobile-sub">
          {residentialLinks.map((item) => <Link key={item} to="/elevators" onClick={closeMobile}>{item}</Link>)}
        </div>
        <div className="mobile-sub-title">Commercial Lifts</div>
        <div className="mobile-sub">
          {commercialLinks.slice(0, 3).map((item) => <Link key={item} to="/elevators" onClick={closeMobile}>{item}</Link>)}
        </div>
        <Link to="/configurator" onClick={closeMobile}>3D Personalization</Link>
        <Link to="/projects" onClick={closeMobile}>Our Projects</Link>
        <Link to="/service" onClick={closeMobile}>Service & Maintenance</Link>
        <Link to="/contact" onClick={closeMobile}>Contact Us</Link>
      </div>
    </>
  );
}
