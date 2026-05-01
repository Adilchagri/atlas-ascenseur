import PageHero from '../components/layout/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import { pageImages } from '../data/siteData.js';
import { useUI } from '../context/UIContext.jsx';

export default function Contact() {
  const { language } = useUI();
  const isFr = language === 'fr';
  return (
    <>
      <PageHero current={isFr ? 'Contact' : 'Contact'} title={isFr ? 'Entrer en' : 'Get in'} accent={isFr ? 'Contact' : 'Touch'} />
      <section className="section">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="eyebrow">{isFr ? 'Informations de Contact' : 'Contact Information'}</div>
            <h2 className="section-title contact-title" dangerouslySetInnerHTML={{ __html: isFr ? 'Parlons de<br /><em>Votre Projet.</em>' : "Let's Discuss<br /><em>Your Project.</em>" }} />
            <div className="contact-visual" style={{ backgroundImage: `url(${pageImages.contact})` }} />
            <h4>{isFr ? 'Adresse' : 'Address'}</h4>
            <p>23 Rue 2, Lot Les Arenes 2<br />Etage, Suite 10, Racine<br />Casablanca, Morocco</p>
            <h4>{isFr ? 'Téléphone' : 'Phone'}</h4>
            <p>+212 666323055</p>
            <h4>Email</h4>
            <p>contact@atlasascenseurs.ma</p>
            <h4>{isFr ? 'Couverture' : 'Coverage'}</h4>
            <p>Casablanca - Rabat - Marrakech<br />Tangier - Agadir - and all major cities</p>
          </div>
          <form>
            <div className="eyebrow">{isFr ? 'Devis Gratuit' : 'Free Quote'}</div>
            <h3 className="form-title" dangerouslySetInnerHTML={{ __html: isFr ? 'Demander une <em>Consultation Gratuite</em>' : 'Request a <em>Free Consultation</em>' }} />
            <div className="form-row">
              <Field label={isFr ? 'Prénom' : 'First Name'} placeholder={isFr ? 'Votre prénom' : 'Your first name'} />
              <Field label={isFr ? 'Nom' : 'Last Name'} placeholder={isFr ? 'Votre nom' : 'Your last name'} />
            </div>
            <div className="form-row">
              <Field label={isFr ? 'Téléphone' : 'Phone'} type="tel" placeholder="+212 666323055" />
              <Field label="Email" type="email" placeholder="your@email.com" />
            </div>
            <Select label={isFr ? 'Ville' : 'City'} options={isFr ? ['Choisir votre ville', 'Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Agadir', 'Fes', 'Autre'] : ['Select your city', 'Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Agadir', 'Fes', 'Other']} />
            <Select label={isFr ? 'Type de Projet' : 'Type of Project'} options={isFr ? ['Choisir le type de projet', 'Résidentiel - Nouvelle installation', 'Commercial - Nouvelle installation', 'Contrat de maintenance', 'Réparation / Modernisation', 'Autre'] : ['Select project type', 'Residential - New installation', 'Commercial - New installation', 'Maintenance contract', 'Repair / Modernization', 'Other']} />
            <div className="form-group">
              <label>{isFr ? 'Message' : 'Message'}</label>
              <textarea placeholder={isFr ? 'Parlez-nous de votre projet...' : 'Tell us about your project...'} />
            </div>
            <Button className="full-width-button">{isFr ? 'Envoyer la Demande' : 'Send Request'}</Button>
            <p className="form-note">{isFr ? '* Tous les ascenseurs sont conformes aux normes de sécurité euro-marocaines et fabriqués en Europe.' : '* All elevators comply with Euro-Moroccan safety standards and are manufactured in Europe.'}</p>
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, type = 'text', placeholder }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} />
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <select defaultValue="">
        {options.map((option, index) => <option key={option} value={index === 0 ? '' : option}>{option}</option>)}
      </select>
    </div>
  );
}

