import { useState, useEffect } from "react";
import { Icon } from "./Icons.jsx";
import { href } from "../lib/router.js";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap">
        <div>
          <h1 id="hero-h" className="reveal">Build Smarter. Automate Faster. Grow Better.</h1>
          <p className="lede reveal d1">Anita Solutions helps businesses build powerful software, integrate AI, and automate repetitive processes with practical technology solutions designed around their business needs.</p>
          <div className="ctas reveal d2">
            <a className="btn primary" href={href("/", "contact")}>Start a Project</a>
            <a className="btn ghost" href={href("/", "solutions")}>Explore Our Solutions</a>
          </div>
          <div className="tagline reveal d3"><span>Ideas</span><span>Technology</span><span>AI</span><span>Real Impact</span></div>
        </div>
        <HeroFlow />
      </div>
    </section>
  );
}

function HeroFlow() {
  const nodes = [
    ["chat","New enquiry received","WhatsApp · Website · Email"],
    ["ai","AI understands the request","Classifies, extracts details"],
    ["bolt","Workflow runs automatically","CRM updated, task created"],
    ["check","Your team takes action","Reply sent, follow-up scheduled"],
  ];
  const [on, setOn] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setOn(3); return; }
    const t = setInterval(() => setOn(v => (v + 1) % 5), 1400);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flow reveal d2" role="img" aria-label="Illustration of an automated workflow: an enquiry arrives, AI processes it, a workflow runs, and the team takes action.">
      <div className="bar"><b>Automation workflow</b><span className="live"><i></i>Running</span></div>
      <div className="stage">
        <div className="stack">
          {nodes.map(([ic, t, s], i) => {
            const C = Icon[ic];
            return (
              <div key={t} className={"node" + (i <= on ? " on" : "")}>
                <span className="ic"><C size={20} /></span>
                <span><b>{t}</b><small>{s}</small></span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="foot"><span>Example workflow</span><span>Designed around your process</span></div>
    </div>
  );
}
