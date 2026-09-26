import { PRODUCTS } from "../data/content.js";
import { href } from "../lib/router.js";

export default function Products() {
  const bars = [["b",60],["",90],["",70],["b",40],["",80]];
  return (
    <section className="sec alt" aria-labelledby="prod-h">
      <div className="wrap">
        <div className="head"><h2 id="prod-h">Solutions We Build</h2><p className="lede">The kinds of platforms we design and develop — and where our own products will be showcased.</p></div>
        <div className="prods">
          {PRODUCTS.map(([t, d, slug], k) => (
            <article className="prod" key={t}>
              <div className="mock" aria-hidden="true">{bars.map(([c, w], i) => <i key={i} className={c} style={{width: ((w + k * 13 + i * 7) % 60 + 35) + "%"}} />)}</div>
              <h3>{t}</h3><p>{d}</p>
              <a className="link" href={"/" + slug} style={{marginTop:18}}>Learn more</a>
            </article>
          ))}
        </div>
        <div className="inline-cta">
          <h3>Have a Business Problem to Solve? Let's Build It.</h3>
          <a className="btn primary" href={href("/", "contact")}>Start a Project</a>
        </div>
      </div>
    </section>
  );
}
