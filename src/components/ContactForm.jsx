import { useState } from "react";
import { CONFIG, waLink } from "../config.js";
import { SERVICE_OPTIONS, BUDGETS } from "../data/content.js";
import { Icon } from "./Icons.jsx";

const EMPTY = { name: "", company: "", email: "", phone: "", service: "", budget: "", message: "", website: "" };

export function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Enter your full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Enter a valid email address, like name@company.com.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) e.phone = "Enter a phone number with 8–15 digits.";
  if (!v.service) e.service = "Choose the service you need.";
  if (v.message.trim().length < 20) e.message = "Tell us a little more — at least 20 characters.";
  return e;
}

const buildMessage = (v) => `Hi Anita Solutions, I'd like to discuss a project.

Name: ${v.name}
Company: ${v.company || "—"}
Email: ${v.email}
Phone: ${v.phone}
Service: ${v.service}
Budget: ${v.budget || "Not specified"}

${v.message}`;

function WhatsAppButtons({ text, primary }) {
  return CONFIG.phones.map((p, i) => (
    <a key={p.number} className={"btn " + (primary && i === 0 ? "primary" : "ghost")} href={waLink(p.number, text)} target="_blank" rel="noopener noreferrer">
      <Icon.wa size={20} />WhatsApp {p.display}
    </a>
  ));
}

export default function ContactForm({ presetService }) {
  const [v, setV] = useState({ ...EMPTY, service: presetService || "" });
  const [errs, setErrs] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState("");

  const set = (k) => (e) => {
    const nv = { ...v, [k]: e.target.value };
    setV(nv);
    if (touched[k]) setErrs(validate(nv));
  };
  const blur = (k) => () => { setTouched((t) => ({ ...t, [k]: true })); setErrs(validate(v)); };

  const submit = async (e) => {
    e.preventDefault();
    if (v.website) return; // spam trap
    const found = validate(v);
    setErrs(found);
    setTouched({ name: 1, email: 1, phone: 1, service: 1, message: 1 });
    if (Object.keys(found).length) {
      document.getElementById("f-" + Object.keys(found)[0])?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(CONFIG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(v),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data) {
        if (data && data.error) throw new Error(data.error);
        if (res.status === 404) throw new Error("The contact service wasn't found on this server.");
        throw new Error(`The contact service didn't respond correctly (error ${res.status}).`);
      }
      setStatus("sent");
    } catch (err) {
      const m = err && err.message ? err.message : "";
      setErrMsg(!m || /failed to fetch|networkerror|load failed/i.test(m) ? "The connection failed." : m);
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="done" role="status" aria-live="polite">
        <span className="tick"><Icon.check /></span>
        <h3>Enquiry sent</h3>
        <p>Thanks, {v.name.split(" ")[0]}. We've received your details and will get back to you at {v.email} within one business day.</p>
        <p>Want a faster reply? Send the same details on WhatsApp.</p>
        <div className="ctas">
          <WhatsAppButtons text={buildMessage(v)} />
          <button className="btn ghost" onClick={() => { setV(EMPTY); setErrs({}); setTouched({}); setStatus("idle"); }}>Start a new enquiry</button>
        </div>
      </div>
    );
  }

  const field = ({ k, label, optional, full, children }) => (
    <div className={"fld" + (full ? " full" : "")} data-err={!!(touched[k] && errs[k])}>
      <label htmlFor={"f-" + k}>{label}{optional && <em> (optional)</em>}</label>
      {children}
      {touched[k] && errs[k] && <span className="err" id={"e-" + k}>{errs[k]}</span>}
    </div>
  );
  const bind = (k) => ({
    id: "f-" + k, name: k, value: v[k], onChange: set(k), onBlur: blur(k),
    "aria-invalid": !!(touched[k] && errs[k]),
    "aria-describedby": touched[k] && errs[k] ? "e-" + k : undefined,
  });

  return (
    <form className="cf" noValidate onSubmit={submit} aria-label="Project enquiry form">
      {status === "error" && (
        <div className="alert bad" role="alert">
          Your enquiry wasn't sent: {errMsg} Try again, or send it to us on WhatsApp instead.
          <div className="ctas" style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            <WhatsAppButtons text={buildMessage(v)} primary />
          </div>
        </div>
      )}
      {field({ k: "name", label: "Full Name", children: <input type="text" autoComplete="name" {...bind("name")} /> })}
      {field({ k: "company", label: "Company Name", optional: true, children: <input type="text" autoComplete="organization" {...bind("company")} /> })}
      {field({ k: "email", label: "Email Address", children: <input type="email" autoComplete="email" inputMode="email" {...bind("email")} /> })}
      {field({ k: "phone", label: "Phone Number", children: <input type="tel" autoComplete="tel" inputMode="tel" placeholder="+91" {...bind("phone")} /> })}
      {field({ k: "service", label: "Service Required", children: <select {...bind("service")}><option value="">Select a service</option>{SERVICE_OPTIONS.map((o) => <option key={o}>{o}</option>)}</select> })}
      {field({ k: "budget", label: "Project Budget", optional: true, children: <select {...bind("budget")}><option value="">Select a range</option>{BUDGETS.map((o) => <option key={o}>{o}</option>)}</select> })}
      {field({ k: "message", label: "Message", full: true, children: <textarea placeholder="What would you like to build, improve or automate?" {...bind("message")} /> })}
      <input type="text" name="website" tabIndex="-1" autoComplete="off" className="sr" aria-hidden="true" value={v.website} onChange={set("website")} />
      <div className="form-foot">
        <small>We reply within one business day. Your details are only used to respond to your enquiry.</small>
        <button className="btn primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Send enquiry"}</button>
      </div>
    </form>
  );
}
