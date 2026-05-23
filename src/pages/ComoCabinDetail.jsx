import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHero from '../components/layout/PageHero.jsx';
import { comoCabins } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

export default function ComoCabinDetail() {
  const { language } = useUI();
  const { cabinSlug } = useParams();
  const cabin = comoCabins.find((item) => item.slug === cabinSlug) ?? comoCabins[0];
  const [activeImage, setActiveImage] = useState(0);
  const imageCount = cabin.images.length;
  const selectedImage = cabin.images[activeImage] ?? cabin.image;
  const canSlide = imageCount > 1;
  const goToImage = (direction) => {
    if (!canSlide) return;
    setActiveImage((index) => (index + direction + imageCount) % imageCount);
  };

  return (
    <>
      <PageHero
        current={language === 'fr' ? 'COMO Résidentiel' : 'COMO Residential'}
        title={language === 'fr' ? 'Cabine' : 'Cabin'}
        accent={cabin.id}
      />
      <section className="section">
        <div className="cabin-detail-layout">
          <div className="cabin-detail-slider">
            <div className="cabin-slider-frame">
              <div className="cabin-slider-caption">
                <div>
                  <div className="eyebrow">{language === 'fr' ? 'Galerie Cabine' : 'Cabin Gallery'}</div>
                  <h2>{language === 'fr' ? `Cabine ${cabin.id}` : cabin.title}</h2>
                </div>
                <span>{`${String(activeImage + 1).padStart(2, '0')} / ${String(imageCount).padStart(2, '0')}`}</span>
              </div>
              {selectedImage && <img src={selectedImage} alt={`${cabin.title} ${activeImage + 1}`} />}
              {canSlide && (
                <div className="cabin-slider-controls" aria-label={language === 'fr' ? 'Navigation galerie cabine' : 'Cabin gallery navigation'}>
                  <button type="button" className="cabin-slider-arrow" onClick={() => goToImage(-1)} aria-label={language === 'fr' ? 'Image précédente' : 'Previous image'}>
                    ‹
                  </button>
                  <button type="button" className="cabin-slider-arrow" onClick={() => goToImage(1)} aria-label={language === 'fr' ? 'Image suivante' : 'Next image'}>
                    ›
                  </button>
                </div>
              )}
            </div>

            {canSlide && (
              <div className="cabin-slider-dots" aria-hidden="true">
                {cabin.images.map((image, index) => (
                  <button
                    type="button"
                    className={index === activeImage ? 'active' : ''}
                    key={`${image}-${index}`}
                    onClick={() => setActiveImage(index)}
                    tabIndex={-1}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-presentation como-cabin-detail cabin-detail-info">
            <div className="product-presentation-copy">
              <div className="eyebrow">{language === 'fr' ? 'Détails Cabine' : 'Cabin Details'}</div>
              <h2 className="section-title">{cabin.title}</h2>
              <p>
                {language === 'fr'
                  ? 'Une configuration COMO pensée pour présenter clairement les finitions de plafond, panneaux, commande, porte, main courante et sol.'
                  : 'A COMO configuration presented with clear ceiling, panel, control, door, handrail, and flooring details.'}
              </p>
              <div className="cabin-spec-list">
                {cabin.specs.map(([label, value]) => (
                  <div className="cabin-spec-item" key={label}>
                    <span>{label}</span>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
              <Link className="btn-outline cabin-back-link" to="/elevators/como-range">
                {language === 'fr' ? 'Retour aux cabines COMO' : 'Back to COMO cabins'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
