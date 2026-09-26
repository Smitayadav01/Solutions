import { Swoosh } from "./Icons.jsx";

export default function PageHero({ crumb, title, text, children }) {
  return (
    <section className="phero">
      <Swoosh className="swoosh" />
      <div className="wrap" style={{position:"relative"}}>
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/">Home</a> / {crumb}</nav>
        <h1 className="reveal">{title}</h1>
        <p className="reveal d1">{text}</p>
        {children}
      </div>
    </section>
  );
}
