import { useMemo, useState } from 'react';
import { useUI } from '../../context/UIContext.jsx';

const INITIAL_COUNT = 6;
const LOAD_STEP = 6;

export default function ProductGallery({ eyebrow = 'Gallery', title = 'Product Images', images = [], getLabel }) {
  const { t } = useUI();
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  const countLabel = useMemo(() => {
    if (!images.length) return `0 ${t('images')}`;
    return `${Math.min(visibleCount, images.length)} / ${images.length} ${t('images')}`;
  }, [images.length, t, visibleCount]);

  if (!images.length) return null;

  return (
    <div className="product-gallery">
      <div className="gallery-head">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h2 className="section-title tight-title">{title}</h2>
        </div>
        <span className="gallery-count">{countLabel}</span>
      </div>
      <div className="product-gallery-grid">
        {visibleImages.map((image, index) => (
          <article
            className="product-gallery-item"
            key={`${image}-${index}`}
          >
            <img src={image} alt={getLabel ? getLabel(index, image) : `Atlas finish ${index + 1}`} loading="lazy" />
            <div className="gallery-item-info">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{getLabel ? getLabel(index, image) : 'Atlas finish'}</h3>
            </div>
          </article>
        ))}
      </div>
      {hasMore && (
        <div className="gallery-actions">
          <button
            className="btn-outline"
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + LOAD_STEP, images.length))}
          >
            {t('loadMoreImages')}
          </button>
        </div>
      )}
    </div>
  );
}
