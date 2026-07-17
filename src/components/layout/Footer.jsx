import { Link } from 'react-router-dom';
import { BUSINESS_PHONE_DISPLAY } from '../../data/contact.js';
import { useUI } from '../../context/UIContext.jsx';

export default function Footer() {
  const { t, language } = useUI();
  return (
    <footer id="main-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="footer-brand-name" to="/">Atlas <em>Ascenseurs</em></Link>
          <p>{t('footerBrandDesc')}</p>
        </div>
        <div className="footer-col">
          <h4>{t('footerQuickLinks')}</h4>
          <Link to="/about">{t('aboutUs')}</Link>
          <Link to="/service">{t('serviceMaintenance')}</Link>
          <Link to="/terms-and-conditions">{t('termsConditions')}</Link>
          <Link to="/cookie-policy">{t('cookiePolicy')}</Link>
          <Link to="/warranty-maintenance-policy">{t('warrantyMaintenancePolicy')}</Link>
          <Link to="/contact">{t('footerContact')}</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footerOurElevators')}</h4>
          <Link to="/elevators">{t('residentialLifts')}</Link>
          <Link to="/elevators">{t('commercialLifts')}</Link>
          <Link to="/elevators">{t('circularElevators')}</Link>
          <Link to="/elevators">{t('hospitalLifts')}</Link>
          <Link to="/elevators">{t('cargoLifts')}</Link>
          <Link to="/elevators">{t('escalators')}</Link>
          <Link to="/configurator">{t('cabinConfigurator')}</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footerContact')}</h4>
          <a>
            {language === 'fr'
              ? 'twin center, angle boulevard zerktouni et al massira, 5ème et 6ème étages, casabanca, 20100'
              : 'twin center, corner of boulevard zerktouni and al massira, 5th and 6th floors, casabanca, 20100'}
          </a>
          <a>{BUSINESS_PHONE_DISPLAY}</a>
          <a>contact@atlasascenseurs.ma</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>{t('footerRights')}</p>
        <p className="footer-tagline">{t('footerTagline')}</p>
        <p className="legal-copy">{t('footerLegal')}</p>
      </div>
    </footer>
  );
}
