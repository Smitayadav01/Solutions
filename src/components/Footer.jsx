import { CONFIG, waLink } from "../config.js";
import Logo from "./Logo.jsx";
import { href } from "../lib/router.js";

export default function Footer() {
  const links = [["Home","/"],["About","/about"],["Services",href("/","solutions")],["AI Solutions","/ai-solutions"],["Software Development","/software-development"],["Recruitment Technology","/recruitment-technology"],["Digital Solutions","/digital-business-solutions"],["Projects",href("/","projects")],["Contact",href("/","contact")]];
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <a className="brand" href="/" aria-label="Anita Solutions home"><Logo tone="white" alt="" /></a>
            <p style={{marginTop:18,maxWidth:"34ch"}}>Software, AI & Business Automation Solutions</p>
          </div>
          <div><h4>Company</h4><ul>{links.filter((_, i) => [0,1,2,7,8].includes(i)).map(([t, h]) => <li key={t}><a href={h}>{t}</a></li>)}</ul></div>
          <div><h4>Solutions</h4><ul>{links.slice(3,7).map(([t, h]) => <li key={t}><a href={h}>{t}</a></li>)}</ul></div>
          <div><h4>Connect</h4><ul>
            <li><a href={CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href={CONFIG.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={CONFIG.social.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
            {CONFIG.phones.map((p) => <li key={p.number}><a href={waLink(p.number)} target="_blank" rel="noopener noreferrer">WhatsApp {p.display}</a></li>)}
          </ul></div>
        </div>
        <div className="fbottom"><span>© 2026 Anita Solutions. All rights reserved.</span><span>Ideas | Technology | AI | Real Impact</span></div>
      </div>
    </footer>
  );
}
