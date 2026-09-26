import { CONFIG, waLink } from "../config.js";
import { Swoosh } from "./Icons.jsx";
import { href } from "../lib/router.js";

export default function CTASection({ title = "Have an Idea, Problem, or Process You Want to Improve?", text = "Tell us what you are trying to build or automate. We'll help you identify the right technology solution." }) {
  return (
    <section className="sec" aria-labelledby="cta-h">
      <div className="wrap">
        <div className="bigcta">
          <Swoosh className="swoosh" />
          <h2 id="cta-h">{title}</h2>
          <p>{text}</p>
          <div className="ctas">
            <a className="btn light" href={waLink(CONFIG.phones[0].number)} target="_blank" rel="noopener noreferrer">Start a Conversation</a>
            <a className="btn outline-light" href={href("/", "contact")}>Request a Consultation</a>
          </div>
        </div>
      </div>
    </section>
  );
}
