import { useState } from 'react';
import Button from '../ui/Button.jsx';
import { faqs } from '../../data/siteData.js';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section section-alt">
      <div className="faq-grid">
        <div>
          <div className="eyebrow">FAQ</div>
          <h2 className="section-title">Common <em>Questions</em></h2>
          <p className="section-desc">Everything you need to know before your project begins.</p>
          <Button to="/contact" className="top-gap">Speak to an Expert</Button>
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
