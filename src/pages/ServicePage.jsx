import { Icon } from "../components/Icons.jsx";
import { href } from "../lib/router.js";
import ProcessSection from "../components/ProcessSection.jsx";
import CTASection from "../components/CTASection.jsx";
import ContactSection from "../components/ContactSection.jsx";
import PageHero from "../components/PageHero.jsx";

export default function ServicePage({ s }) {
  const optionMap = { ai: "AI Solutions", software: "Software Development", recruit: "Recruitment Technology", digital: "Digital Business Solutions" };
  const isRecruit = s.key === "recruit";
  return (<>
    <PageHero crumb={s.title} title={s.heroTitle} text={s.heroText}>
      <div className="ctas reveal d2">
        <a className="btn light" href={href("/" + s.slug, "contact")}>Discuss your project</a>
        <a className="btn outline-light" href={href("/" + s.slug, "offer")}>See what we build</a>
      </div>
    </PageHero>

    <section className="sec" aria-labelledby="pb-h">
      <div className="wrap problem">
        <div>
          <h2 id="pb-h">Sound familiar?</h2>
          <p className="lede" style={{marginTop:16}}>These are the everyday problems {s.title.toLowerCase()} is built to solve.</p>
        </div>
        <ul>{s.problems.map(p => <li key={p}>{p}</li>)}</ul>
      </div>
    </section>

    <section className="sec alt" id="offer" aria-labelledby="of-h">
      <div className="wrap">
        <div className="head"><h2 id="of-h">What we build</h2></div>
        <div className="offer">{s.offer.map(([t, d]) => <div key={t}><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div>
    </section>

    <section className={"sec" + (isRecruit ? " dark-band" : "")} aria-labelledby="fl-h">
      <div className="wrap">
        <div className="head">
          <h2 id="fl-h">{s.flowTitle}</h2>
          {isRecruit && <p className="lede">Anita Solutions can build custom recruitment platforms and integrations based on your business requirements — connecting every step from first application to final hire.</p>}
          {s.key === "ai" && <p className="lede">Every AI solution follows the same simple path: your data goes in, and a useful business action comes out.</p>}
        </div>
        <div className={"hflow" + (isRecruit ? " dark" : "")}>{s.flow.map(([t, d]) => <div key={t}><b>{t}</b><small>{d}</small></div>)}</div>
      </div>
    </section>

    {isRecruit && (
      <section className="sec alt" aria-labelledby="rp-h">
        <div className="wrap">
          <div className="inline-cta" style={{marginTop:0,background:"var(--card)",border:"1.5px dashed var(--line)"}}>
            <div><h3 id="rp-h">Our recruitment products</h3><p style={{color:"var(--slate)",marginTop:6}}>Recruitment platforms and products built by Anita Solutions will be listed here.</p></div>
            <a className="btn ghost" href={href("/" + s.slug, "contact")}>Ask about early access</a>
          </div>
        </div>
      </section>
    )}

    <section className={"sec" + (isRecruit ? "" : " alt")} aria-labelledby="bn-h">
      <div className="wrap">
        <div className="head"><h2 id="bn-h">Benefits for your business</h2></div>
        <div className="benefits">{s.benefits.map(([ic, t, d]) => { const C = Icon[ic]; return <div key={t}><span className="ic"><C /></span><h3>{t}</h3><p>{d}</p></div>; })}</div>
      </div>
    </section>

    <section className={"sec" + (isRecruit ? " alt" : "")} aria-labelledby="tc-h">
      <div className="wrap">
        <div className="head"><h2 id="tc-h">Technology & integrations</h2></div>
        <div className="chips">{s.tech.map(t => <span className="chip" key={t}>{t}</span>)}</div>
      </div>
    </section>

    <ProcessSection alt={!isRecruit} title="How we work" />

    <section className={"sec" + (isRecruit ? " alt" : "")} aria-labelledby="fq-h">
      <div className="wrap">
        <div className="head"><h2 id="fq-h">Frequently asked questions</h2></div>
        <div className="faq">{s.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
      </div>
    </section>

    <CTASection />
    <ContactSection presetService={optionMap[s.key]} />
  </>);
}
