import { TECH } from "../data/content.js";

export default function TechnologySection() {
  return (
    <section className="sec alt" aria-labelledby="tech-h">
      <div className="wrap">
        <div className="head"><h2 id="tech-h">Technologies We Work With</h2><p className="lede">Proven, well-supported tools chosen for reliability and long-term maintainability.</p></div>
        <div className="tech">
          {TECH.map(([g, list]) => <div key={g}><h3>{g}</h3><div className="chips">{list.map(t => <span className="chip" key={t}>{t}</span>)}</div></div>)}
        </div>
      </div>
    </section>
  );
}
