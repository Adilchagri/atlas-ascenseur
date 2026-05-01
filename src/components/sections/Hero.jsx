import Button from '../ui/Button.jsx';
import { imagePaths } from '../../data/siteData.js';
import { useUI } from '../../context/UIContext.jsx';

export default function Hero() {
  const { t } = useUI();
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
        <div className="hero-label">{t('welcomeLabel')}</div>
        <h1 className="hero-title hero-title-luxury">Luxury Elevators,<br /><em>Made Personal.</em></h1>
        <div className="hero-actions">
          <Button to="/contact">{t('getQuote')}</Button>
          <Button to="/elevators" variant="outline">{t('exploreMore')}</Button>
        </div>
      </div>
      <div className="hero-scroll">{t('scrollDiscover')}</div>
    </section>
  );
}
