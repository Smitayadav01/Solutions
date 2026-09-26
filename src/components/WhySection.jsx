import { Icon } from "./Icons.jsx";
import { WHY } from "../data/content.js";

export default function WhySection() {
  return (
    <section className="sec" aria-labelledby="why-h">
      <div className="wrap">
        <div className="head"><h2 id="why-h">Why Businesses Choose Anita Solutions</h2></div>
        <div className="why">
          {WHY.map(([ic, t, d]) => { const C = Icon[ic]; return <div key={t}><span className="ic"><C /></span><h3>{t}</h3><p>{d}</p></div>; })}
        </div>
      </div>
    </section>
  );
}
