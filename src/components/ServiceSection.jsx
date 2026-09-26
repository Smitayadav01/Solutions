import { SERVICES } from "../data/content.js";
import ServiceCard from "./ServiceCard.jsx";

export default function ServiceSection() {
  const order = ["ai","software","recruit","digital"].map(k => SERVICES.find(s => s.key === k));
  return (
    <section className="sec alt" id="solutions" aria-labelledby="sol-h">
      <div className="wrap">
        <div className="head">
          <h2 id="sol-h">Our Solutions</h2>
          <p className="lede">Four areas of expertise that work together — so the software you build, the AI you add and the processes you automate stay connected.</p>
        </div>
        <div className="svc-grid">{order.map(s => <ServiceCard key={s.slug} s={s} />)}</div>
      </div>
    </section>
  );
}
