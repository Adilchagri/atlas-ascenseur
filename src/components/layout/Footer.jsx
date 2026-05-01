import { Link } from 'react-router-dom';
import { useUI } from '../../context/UIContext.jsx';

export default function Footer() {
  const { t } = useUI();
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
          <Link to="/elevators">{t('ourElevators')}</Link>
          <Link to="/configurator">3D Personalization</Link>
          <Link to="/service">{t('serviceMaintenance')}</Link>
          <Link to="/projects">{t('ourProjects')}</Link>
          <Link to="/contact">{t('footerContact')}</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footerOurElevators')}</h4>
          <Link to="/elevators">{t('residentialLifts')}</Link>
          <Link to="/elevators">{t('commercialLifts')}</Link>
          <Link to="/elevators">Circular Elevators</Link>
          <Link to="/elevators">Hospital Lifts</Link>
          <Link to="/elevators">Cargo Lifts</Link>
          <Link to="/elevators">{t('escalators')}</Link>
          <Link to="/configurator">{t('cabinConfigurator')}</Link>
        </div>
        <div className="footer-col">
          <h4>{t('footerContact')}</h4>
          <a>Casablanca - Rue 2, Racine</a>
          <a>+212 666323055</a>
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
