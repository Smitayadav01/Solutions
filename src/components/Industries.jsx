import { INDUSTRIES } from "../data/content.js";

export default function Industries() {
  return (
    <section className="sec" aria-labelledby="ind-h">
      <div className="wrap">
        <div className="head"><h2 id="ind-h">Technology for Different Business Needs</h2><p className="lede">We adapt our solutions to how each industry works.</p></div>
        <div className="inds">{INDUSTRIES.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div>
    </section>
  );
}
