import { CONFIG, waLink } from "../config.js";
import { Icon } from "./Icons.jsx";
import ContactForm from "./ContactForm.jsx";

export default function ContactSection({ presetService }) {
  return (
    <section className="sec alt" id="contact" aria-labelledby="contact-h">
      <div className="wrap contact">
        <div>
          <h2 id="contact-h">Tell us about your project</h2>
          <p className="lede" style={{ marginTop: 16 }}>Share what you need and we'll get back to you with next steps. Prefer to talk? Call or WhatsApp us directly.</p>
          <div className="ways">
            {CONFIG.phones.map((p) => (
              <div className="way" key={p.number}>
                <span className="ic"><Icon.wa /></span>
                <span style={{ flex: 1 }}><b>{p.display}</b><small>WhatsApp or call</small></span>
                <span className="way-actions">
                  <a href={waLink(p.number)} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${p.display}`}>WhatsApp</a>
                  <a href={`tel:+${p.number}`} aria-label={`Call ${p.display}`}>Call</a>
                </span>
              </div>
            ))}
            {CONFIG.email && (
              <a className="way" href={`mailto:${CONFIG.email}`}>
                <span className="ic"><Icon.mail /></span><span><b>Email</b><small>{CONFIG.email}</small></span>
              </a>
            )}
          </div>
        </div>
        <ContactForm presetService={presetService} />
      </div>
    </section>
  );
}
