import Button from '../ui/Button.jsx';
import { buildWhatsAppUrl } from '../../data/contact.js';
import { imagePaths } from '../../data/siteData.js';
import { useUI } from '../../context/UIContext.jsx';

export default function Hero() {
  const { language, t } = useUI();
  const quoteHref = buildWhatsAppUrl(
    language === 'fr'
      ? 'Bonjour Atlas Ascenseurs, je souhaite demander un devis.'
      : 'Hello Atlas Ascenseurs, I would like to request a quote.'
  );

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
        <h1 className="hero-title hero-title-luxury" dangerouslySetInnerHTML={{ __html: t('heroTitle') }} />
        <div className="hero-actions">
          <Button href={quoteHref} target="_blank" rel="noreferrer">{t('getQuote')}</Button>
          <Button to="/elevators" variant="outline">{t('exploreMore')}</Button>
        </div>
      </div>
      <div className="hero-scroll">{t('scrollDiscover')}</div>
    </section>
  );
}
