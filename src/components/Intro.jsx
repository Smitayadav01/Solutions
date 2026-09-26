import { Icon } from "./Icons.jsx";

export default function Intro() {
  const hl = [["puzzle","Custom-Built Solutions","Designed for your workflow."],["ai","AI & Automation","Less manual, repetitive work."],["layers","Scalable Technology","Ready for your next stage."],["target","Business-Focused Approach","Measured by business results."]];
  return (
    <section className="sec" aria-labelledby="intro-h">
      <div className="wrap intro">
        <div>
          <h2 id="intro-h">Technology Solutions Built Around Your Business</h2>
          <p className="lede" style={{marginTop:20}}>Every business has different challenges. Anita Solutions combines software development, AI, automation, and digital technologies to create solutions that solve real business problems.</p>
          <p className="lede" style={{marginTop:16}}>We work with businesses to understand their workflow, identify opportunities for improvement, and build scalable digital solutions.</p>
        </div>
        <div className="highlights">
          {hl.map(([ic, t, d]) => { const C = Icon[ic]; return <div key={t}><span style={{color:"var(--blue)"}}><C /></span><h3>{t}</h3><p>{d}</p></div>; })}
        </div>
      </div>
    </section>
  );
}
