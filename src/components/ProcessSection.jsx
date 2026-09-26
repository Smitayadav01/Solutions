import { STEPS } from "../data/content.js";

export default function ProcessSection({ alt = true, title = "From Idea to Implementation" }) {
  return (
    <section className={"sec" + (alt ? " alt" : "")} aria-labelledby="proc-h">
      <div className="wrap">
        <div className="head"><h2 id="proc-h">{title}</h2><p className="lede">A clear, four-step process so you always know what happens next.</p></div>
        <ol className="steps">
          {STEPS.map(([t, d], i) => (
            <li key={t}><span className="n">{String(i + 1).padStart(2, "0")}</span><div><h3>{t}</h3><p>{d}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
