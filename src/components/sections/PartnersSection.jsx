import { useEffect, useRef } from 'react';
import { useUI } from '../../context/UIContext.jsx';

const partnerImages = Object.entries(
  import.meta.glob('../../assets/images/partners/*.{jpg,jpeg,png,webp,svg,avif,JPG,JPEG,PNG,WEBP,SVG,AVIF}', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([path, src]) => {
    const fileName = path.split('/').pop()?.replace(/\.[^.]+$/, '') ?? 'Partner';
    const name = fileName
      .replace(/-?removebg-preview$/i, '')
      .replace(/[-_]+/g, ' ')
      .trim();
    // Scale only these marks inside the same card size
    const enlarge = /al\s*maaden|green\s*town|casa\s*green/i.test(name);

    return { src, name, enlarge };
  });

export default function PartnersSection() {
  const { language } = useUI();
  const gliderRef = useRef(null);
  const dragRef = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startScroll: 0,
  });

  const isAnimated = partnerImages.length > 1;

  useEffect(() => {
    const glider = gliderRef.current;
    if (!glider || !isAnimated) return;

    let rafId = 0;
    let last = performance.now();
    // Matches the previous ~26s full-loop glide speed
    const speed = 0.55;

    const step = (now) => {
      const dt = Math.min(now - last, 48);
      last = now;

      const paused =
        glider.classList.contains('is-dragging') ||
        glider.classList.contains('is-paused');

      if (!paused) {
        glider.scrollLeft += speed * (dt / 16.67);
        const half = glider.scrollWidth / 2;
        if (half > 0 && glider.scrollLeft >= half) {
          glider.scrollLeft -= half;
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isAnimated]);

  const onPointerDown = (event) => {
    if (!isAnimated || event.button !== 0) return;
    const glider = gliderRef.current;
    if (!glider) return;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScroll: glider.scrollLeft,
    };
    glider.classList.add('is-dragging');
    glider.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    const glider = gliderRef.current;
    if (!drag.active || !glider) return;

    const delta = event.clientX - drag.startX;
    let next = drag.startScroll - delta;
    const half = glider.scrollWidth / 2;

    if (half > 0) {
      while (next < 0) next += half;
      while (next >= half) next -= half;
    }

    glider.scrollLeft = next;
  };

  const endDrag = () => {
    const drag = dragRef.current;
    const glider = gliderRef.current;
    if (!drag.active) return;

    if (glider && drag.pointerId != null) {
      try {
        glider.releasePointerCapture?.(drag.pointerId);
      } catch {
        /* already released */
      }
      glider.classList.remove('is-dragging');
    }

    dragRef.current = {
      active: false,
      pointerId: null,
      startX: 0,
      startScroll: 0,
    };
  };

  const onScroll = () => {
    const glider = gliderRef.current;
    if (!glider || !isAnimated || dragRef.current.active) return;
    const half = glider.scrollWidth / 2;
    if (half > 0 && glider.scrollLeft >= half) {
      glider.scrollLeft -= half;
    }
  };

  if (!partnerImages.length) return null;

  const images = isAnimated ? [...partnerImages, ...partnerImages] : partnerImages;
  const title = language === 'fr' ? 'Nos Partenaires' : 'Our Partners';

  return (
    <section className="section partners-section" aria-labelledby="partners-title">
      <div className="gallery-head partners-head">
        <div>
          <div className="eyebrow">{title}</div>
          <h2 className="section-title tight-title" id="partners-title">{title}</h2>
        </div>
      </div>

      <div
        className={`partners-glider${isAnimated ? ' is-interactive' : ''}`}
        aria-label={title}
        ref={gliderRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={onScroll}
        onMouseEnter={() => gliderRef.current?.classList.add('is-paused')}
        onMouseLeave={() => gliderRef.current?.classList.remove('is-paused')}
      >
        <div className={`partners-track${isAnimated ? ' is-animated' : ''}`.trim()}>
          {images.map((partner, index) => (
            <article
              className={`partner-logo-card${partner.enlarge ? ' partner-logo-card--enlarge' : ''}`}
              key={`${partner.src}-${index}`}
              aria-hidden={isAnimated && index >= partnerImages.length ? 'true' : undefined}
            >
              <img
                src={partner.src}
                alt={isAnimated && index >= partnerImages.length ? '' : partner.name}
                loading="lazy"
                draggable="false"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
