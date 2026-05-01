import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cabinMenuLinks, elevatorMenuLinks, imagePaths, navLinks } from '../../data/siteData.js';
import { useUI } from '../../context/UIContext.jsx';

export default function Navbar() {
  const { language, setLanguage, t } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileElevatorsOpen, setMobileElevatorsOpen] = useState(true);
  const [mobileCabinOpen, setMobileCabinOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileElevatorsOpen(false);
    setMobileCabinOpen(false);
  };

  return (
    <>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''}>
        <Link className="nav-logo" to="/" onClick={closeMobile}>
          <img src={imagePaths.logos.main} alt="Atlas Ascenseurs" />
        </Link>

        <ul className="nav-links">
          <li><NavLink to="/about">{t('about')}</NavLink></li>
          <li>
            <span>{t('ourElevators')} <span className="nav-chevron" /></span>
            <div className="dropdown">
              <div className="dropdown-col">
                <h4>{t('residentialLifts')}</h4>
                {elevatorMenuLinks.residential.map((item) => <Link key={item.label} to={item.to}>{item.label}</Link>)}
              </div>
              <div className="dropdown-col">
                <h4>{t('commercialLifts')}</h4>
                {elevatorMenuLinks.commercial.map((item) => <Link key={item.label} to={item.to}>{item.label}</Link>)}
              </div>
            </div>
          </li>
          <li>
            <span>{t('cabinDesign')} <span className="nav-chevron" /></span>
            <div className="dropdown dropdown-small">
              <div className="dropdown-col">
                <h4>{t('personalization')}</h4>
                {cabinMenuLinks.map((item) => <Link key={item.label} to={item.to}>{item.label}</Link>)}
              </div>
            </div>
          </li>
          {navLinks.slice(1).map((link) => (
            <li key={link.to}><NavLink to={link.to}>{link.label}</NavLink></li>
          ))}
        </ul>

        <div className="nav-tools">
          <div className="lang-switch" aria-label={t('language')}>
            <button className={`ui-pill ${language === 'en' ? 'active' : ''}`} type="button" onClick={() => setLanguage('en')}>EN</button>
            <button className={`ui-pill ${language === 'fr' ? 'active' : ''}`} type="button" onClick={() => setLanguage('fr')}>FR</button>
          </div>
        </div>
        <Link className="nav-cta" to="/contact">{t('getQuote')}</Link>

        <button className={`hamburger ${mobileOpen ? 'open' : ''}`} type="button" onClick={() => setMobileOpen((open) => !open)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobileMenu">
        <div className="mobile-menu-tools">
          <div className="lang-switch" aria-label={t('language')}>
            <button className={`ui-pill ${language === 'en' ? 'active' : ''}`} type="button" onClick={() => setLanguage('en')}>EN</button>
            <button className={`ui-pill ${language === 'fr' ? 'active' : ''}`} type="button" onClick={() => setLanguage('fr')}>FR</button>
          </div>
        </div>
        <Link to="/about" onClick={closeMobile}>{t('about')}</Link>
        <button className={`mobile-accordion ${mobileElevatorsOpen ? 'open' : ''}`} type="button" onClick={() => setMobileElevatorsOpen((v) => !v)}>
          {t('ourElevators')} <span className="mobile-accordion-chevron" />
        </button>
        <div className={`mobile-accordion-content ${mobileElevatorsOpen ? 'open' : ''}`}>
          <div className="mobile-sub-title">{t('residentialLifts')}</div>
          <div className="mobile-sub">
            {elevatorMenuLinks.residential.map((item) => <Link key={item.label} to={item.to} onClick={closeMobile}>{item.label}</Link>)}
          </div>
          <div className="mobile-sub-title">{t('commercialLifts')}</div>
          <div className="mobile-sub">
            {elevatorMenuLinks.commercial.map((item) => <Link key={item.label} to={item.to} onClick={closeMobile}>{item.label}</Link>)}
          </div>
        </div>

        <button className={`mobile-accordion ${mobileCabinOpen ? 'open' : ''}`} type="button" onClick={() => setMobileCabinOpen((v) => !v)}>
          {t('cabinDesign')} <span className="mobile-accordion-chevron" />
        </button>
        <div className={`mobile-accordion-content ${mobileCabinOpen ? 'open' : ''}`}>
          <div className="mobile-sub">
            {cabinMenuLinks.map((item) => <Link key={item.label} to={item.to} onClick={closeMobile}>{item.label}</Link>)}
          </div>
        </div>

        <Link to="/configurator" onClick={closeMobile}>3D Personalization</Link>
        <Link to="/projects" onClick={closeMobile}>{t('ourProjects')}</Link>
        <Link to="/service" onClick={closeMobile}>{t('serviceMaintenance')}</Link>
        <Link to="/contact" onClick={closeMobile}>{t('contactUs')}</Link>
      </div>
    </>
  );
}
