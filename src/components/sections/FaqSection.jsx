import { useState } from 'react';
import Button from '../ui/Button.jsx';
import { faqs, pageImages } from '../../data/siteData.js';
import { useUI } from '../../context/UIContext.jsx';

export default function FaqSection() {
  const { t } = useUI();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section section-alt">
      <div className="faq-grid">
        <div>
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title">{t('commonQuestions')}</h2>
          <p className="section-desc">{t('everythingNeed')}</p>
          <div className="faq-visual" style={{ backgroundImage: `url(${pageImages.faq})` }} />
          <Button to="/contact" className="top-gap">{t('speakExpert')}</Button>
        </div>
        <div className="faq-wrap">
          {faqs.map(([question, answer], index) => (
            <div className={`faq-item ${openIndex === index ? 'open' : ''}`} key={question}>
              <button className="faq-q" type="button" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                {question} <span className="faq-plus">+</span>
              </button>
              <div className="faq-a">{answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
