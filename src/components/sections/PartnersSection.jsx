import { useUI } from '../../context/UIContext.jsx';

const partnerImages = Object.entries(
  import.meta.glob('../../assets/images/partners/*.{jpg,jpeg,png,webp,svg,avif,JPG,JPEG,PNG,WEBP,SVG,AVIF}', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([path, src]) => {
    const fileName = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'Partner';
    const name = fileName.replace(/[-_]+/g, ' ');

    return { src, name };
  });

export default function PartnersSection() {
  const { language } = useUI();

  if (!partnerImages.length) return null;

  const isAnimated = partnerImages.length > 1;
  const images = isAnimated ? [...partnerImages, ...partnerImages] : partnerImages;
  const title = language === 'fr' ? 'Nos Partenaires' : 'Our Partners';
  const imageLabel = language === 'fr' ? 'partenaires' : 'partners';

  return (
    <section className="section partners-section" aria-labelledby="partners-title">
      <div className="gallery-head partners-head">
        <div>
          <div className="eyebrow">{title}</div>
          <h2 className="section-title tight-title" id="partners-title">{title}</h2>
        </div>
        <span className="gallery-count">{partnerImages.length} {imageLabel}</span>
      </div>

      <div className="partners-glider" aria-label={title}>
        <div className={`partners-track ${isAnimated ? 'is-animated' : ''}`.trim()}>
          {images.map((partner, index) => (
            <article className="partner-logo-card" key={`${partner.src}-${index}`} aria-hidden={isAnimated && index >= partnerImages.length ? 'true' : undefined}>
              <img src={partner.src} alt={isAnimated && index >= partnerImages.length ? '' : partner.name} loading="lazy" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
