import { useEffect, useState } from "react";
import { PAGE_META } from "../data/meta.js";

/** Build a link: href("/", "contact") -> "/#contact" */
export const href = (path, section) => path + (section ? "#" + section : "");

const read = () => ({ path: window.location.pathname.replace(/\/+$/, "") || "/", anchor: window.location.hash.slice(1) });

export function navigate(to) {
  window.history.pushState({}, "", to);
  window.dispatchEvent(new Event("locationchange"));
}

/** Tiny client-side router: clean URLs (/about, /ai-solutions) with section anchors (#contact). */
export function useRoute() {
  const [r, setR] = useState(read);

  useEffect(() => {
    const update = () => setR(read());
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname.startsWith("/api")) return;
      e.preventDefault();
      if (url.pathname === window.location.pathname && url.hash) {
        window.history.pushState({}, "", url.pathname + url.hash);
        document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
        return;
      }
      navigate(url.pathname + url.hash);
    };
    window.addEventListener("popstate", update);
    window.addEventListener("locationchange", update);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("locationchange", update);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    const meta = PAGE_META[r.path] || PAGE_META["/"];
    document.title = meta[0];
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta[1]);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://anitasolutions.in" + (r.path === "/" ? "/" : r.path));
    if (r.anchor) requestAnimationFrame(() => document.getElementById(r.anchor)?.scrollIntoView());
    else window.scrollTo(0, 0);
  }, [r.path, r.anchor]);

  return r;
}
