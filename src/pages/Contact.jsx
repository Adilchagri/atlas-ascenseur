import PageHero from '../components/layout/PageHero.jsx';
import Button from '../components/ui/Button.jsx';

export default function Contact() {
  return (
    <>
      <PageHero current="Contact" title="Get in" accent="Touch" />
      <section className="section">
        <div className="contact-grid">
          <div className="contact-info">
            <div className="eyebrow">Contact Information</div>
            <h2 className="section-title contact-title">Let's Discuss<br /><em>Your Project.</em></h2>
            <h4>Address</h4>
            <p>23 Rue 2, Lot Les Arenes 2<br />Etage, Suite 10, Racine<br />Casablanca, Morocco</p>
            <h4>Phone</h4>
            <p>+212 6 08 88 30 30<br />+212 5 22 23 19 73</p>
            <h4>Email</h4>
            <p>contact@atlasascenseurs.ma</p>
            <h4>Coverage</h4>
            <p>Casablanca - Rabat - Marrakech<br />Tangier - Agadir - and all major cities</p>
          </div>
          <form>
            <div className="eyebrow">Free Quote</div>
            <h3 className="form-title">Request a <em>Free Consultation</em></h3>
            <div className="form-row">
              <Field label="First Name" placeholder="Your first name" />
              <Field label="Last Name" placeholder="Your last name" />
            </div>
            <div className="form-row">
              <Field label="Phone" type="tel" placeholder="+212 6 00 00 00 00" />
              <Field label="Email" type="email" placeholder="your@email.com" />
            </div>
            <Select label="City" options={['Select your city', 'Casablanca', 'Rabat', 'Marrakech', 'Tangier', 'Agadir', 'Fes', 'Other']} />
            <Select label="Type of Project" options={['Select project type', 'Residential - New installation', 'Commercial - New installation', 'Maintenance contract', 'Repair / Modernization', 'Other']} />
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="Tell us about your project..." />
            </div>
            <Button className="full-width-button">Send Request</Button>
            <p className="form-note">* All elevators comply with Euro-Moroccan safety standards and are manufactured in Europe.</p>
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
