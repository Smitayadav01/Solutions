import { Icon } from "./Icons.jsx";
import { SERVICES } from "../data/content.js";

export default function ServiceCard({ s }) {
  const C = Icon[s.icon];
  if (s.featured) {
    const recruit = SERVICES.find(x => x.key === "recruit");
    return (
      <article className="svc feature">
        <div style={{display:"flex",flexDirection:"column"}}>
          <span className="ic"><C /></span>
          <h3>{s.title}<span className="badge">Our specialisation</span></h3>
          <p>{s.short}</p>
          <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>
          <a className="link" href={"/" + s.slug}>{s.cta}</a>
        </div>
        <div className="pipe" aria-label="Recruitment pipeline">
          {recruit.flow.map(([t, d]) => <div key={t}>{t}<small>{d}</small></div>)}
        </div>
      </article>
    );
  }
  return (
    <article className="svc">
      <span className="ic"><C /></span>
      <h3>{s.title}</h3>
      <p>{s.short}</p>
      <ul>{s.items.map(i => <li key={i}>{i}</li>)}</ul>
      <a className="link" href={"/" + s.slug}>{s.cta}</a>
    </article>
  );
}
