import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCabinMenuLinks, getElevatorMenuLinks, getNavLinks, imagePaths } from '../../data/siteData.js';
import { useUI } from '../../context/UIContext.jsx';

export default function Navbar() {
  const { language, setLanguage, t } = useUI();
  const navLinks = getNavLinks(language);
  const elevatorMenuLinks = getElevatorMenuLinks(language);
  const cabinMenuLinks = getCabinMenuLinks(language);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileView, setMobileView] = useState('main');

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
    setMobileView('main');
  };

  const toggleMobile = () => {
    setMobileOpen((open) => {
      if (open) setMobileView('main');
      return !open;
    });
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

        <button className={`hamburger ${mobileOpen ? 'open' : ''}`} type="button" onClick={toggleMobile} aria-label={t('toggleMenu')} aria-expanded={mobileOpen}>
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
        <div className="mobile-panel-stack">
          <div className={`mobile-panel ${mobileView === 'main' ? 'active' : ''}`} aria-hidden={mobileView !== 'main'}>
            <Link to="/about" onClick={closeMobile}>{t('about')}</Link>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileView('elevators')}>
              {t('ourElevators')} <span className="mobile-menu-arrow" />
            </button>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileView('cabin')}>
              {t('cabinDesign')} <span className="mobile-menu-arrow" />
            </button>
            <Link to="/configurator" onClick={closeMobile}>{t('personal3d')}</Link>
            <Link to="/projects" onClick={closeMobile}>{t('ourProjects')}</Link>
            <Link to="/service" onClick={closeMobile}>{t('serviceMaintenance')}</Link>
            <Link to="/contact" onClick={closeMobile}>{t('contactUs')}</Link>
          </div>

          <div className={`mobile-panel ${mobileView === 'elevators' ? 'active' : ''}`} aria-hidden={mobileView !== 'elevators'}>
            <button className="mobile-panel-back" type="button" onClick={() => setMobileView('main')}>{language === 'fr' ? 'Retour' : 'Back'}</button>
            <div className="mobile-panel-title">{t('ourElevators')}</div>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileView('residential')}>
              {t('residentialLifts')} <span className="mobile-menu-arrow" />
            </button>
            <button className="mobile-menu-button" type="button" onClick={() => setMobileView('commercial')}>
              {t('commercialLifts')} <span className="mobile-menu-arrow" />
            </button>
          </div>

          <div className={`mobile-panel ${mobileView === 'residential' ? 'active' : ''}`} aria-hidden={mobileView !== 'residential'}>
            <button className="mobile-panel-back" type="button" onClick={() => setMobileView('elevators')}>{language === 'fr' ? 'Retour' : 'Back'}</button>
            <div className="mobile-panel-title">{t('residentialLifts')}</div>
            {elevatorMenuLinks.residential.map((item) => <Link key={item.label} to={item.to} onClick={closeMobile}>{item.label}</Link>)}
          </div>

          <div className={`mobile-panel ${mobileView === 'commercial' ? 'active' : ''}`} aria-hidden={mobileView !== 'commercial'}>
            <button className="mobile-panel-back" type="button" onClick={() => setMobileView('elevators')}>{language === 'fr' ? 'Retour' : 'Back'}</button>
            <div className="mobile-panel-title">{t('commercialLifts')}</div>
            {elevatorMenuLinks.commercial.map((item) => <Link key={item.label} to={item.to} onClick={closeMobile}>{item.label}</Link>)}
          </div>

          <div className={`mobile-panel ${mobileView === 'cabin' ? 'active' : ''}`} aria-hidden={mobileView !== 'cabin'}>
            <button className="mobile-panel-back" type="button" onClick={() => setMobileView('main')}>{language === 'fr' ? 'Retour' : 'Back'}</button>
            <div className="mobile-panel-title">{t('cabinDesign')}</div>
            {cabinMenuLinks.map((item) => <Link key={item.label} to={item.to} onClick={closeMobile}>{item.label}</Link>)}
          </div>
        </div>
      </div>
    </>
  );
}
