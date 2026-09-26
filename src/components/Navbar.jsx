import { useState, useEffect, useRef } from "react";
import Logo from "./Logo.jsx";
import { Icon } from "./Icons.jsx";
import { SERVICES } from "../data/content.js";
import { href } from "../lib/router.js";

export default function Navbar({ path }) {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);
  const ddRef = useRef(null);
  useEffect(() => { setOpen(false); setDd(false); }, [path]);
  useEffect(() => {
    const close = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setDd(false); };
    const esc = (e) => { if (e.key === "Escape") { setDd(false); setOpen(false); } };
    document.addEventListener("click", close); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, []);
  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href="/" aria-label="Anita Solutions home">
          <Logo alt="" />
        </a>
        <nav aria-label="Main">
          <ul className="main">
            <li><a href="/" aria-current={path === "/" ? "page" : undefined}>Home</a></li>
            <li className={"dropdown" + (dd ? " open" : "")} ref={ddRef}>
              <button className="dd" aria-expanded={dd} aria-haspopup="true" onClick={() => setDd(!dd)} style={{display:"inline-flex",alignItems:"center",gap:4}}>Solutions <Icon.down size={16} /></button>
              <div className="menu" role="menu">
                {SERVICES.map(s => <a key={s.slug} role="menuitem" href={"/" + s.slug}>{s.title}<span>{s.items.slice(0,3).join(", ")}</span></a>)}
              </div>
            </li>
            <li><a href="/about" aria-current={path === "/about" ? "page" : undefined}>About</a></li>
            <li><a href={href("/", "projects")}>Projects</a></li>
            <li><a href={href("/", "contact")}>Contact</a></li>
          </ul>
        </nav>
        <a className="btn primary cta-top" href={href("/", "contact")} style={{padding:"11px 20px"}}>Start a Project</a>
        <button className="burger" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <Icon.close /> : <Icon.menu />}</button>
      </div>
      {open && (
        <nav className="mobile" aria-label="Mobile">
          <a href="/">Home</a>
          {SERVICES.map(s => <a key={s.slug} href={"/" + s.slug}>{s.title}</a>)}
          <a href="/about">About</a>
          <a href={href("/", "projects")}>Projects</a>
          <a href={href("/", "contact")}>Contact</a>
          <a className="btn primary" href={href("/", "contact")} style={{marginTop:12,borderBottom:0}}>Start a Project</a>
        </nav>
      )}
    </header>
  );
}
