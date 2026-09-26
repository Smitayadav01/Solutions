import { CASES } from "../data/content.js";
import CaseStudyCard from "./CaseStudyCard.jsx";

export default function CaseStudies() {
  return (
    <section className="sec" id="projects" aria-labelledby="case-h">
      <div className="wrap">
        <div className="head"><h2 id="case-h">Turning Business Challenges Into Digital Solutions</h2><p className="lede">Selected projects we have designed and built, and the problems each one solves.</p></div>
        <div className="cases">{CASES.map((c, i) => <CaseStudyCard key={i} c={c} />)}</div>
        <p className="note">Want to see a project in action? Ask us for a demo.</p>
      </div>
    </section>
  );
}
