// Contact form email sender.
// Runs as a Vercel serverless function in production (POST /api/contact),
// and inside `npm run dev` through the small plugin in vite.config.js.
//
// Settings come from environment variables (Vercel → Settings → Environment Variables,
// or a local .env file):
//   CONTACT_TO   who receives enquiries (comma-separated for several)
//   SMTP_HOST    smtp.gmail.com
//   SMTP_PORT    465
//   SMTP_USER    the Gmail address that sends
//   SMTP_PASS    16-character Google App Password (NOT your normal Gmail password)
//   MAIL_FROM    optional, defaults to SMTP_USER
//
// Open https://your-site/api/contact in a browser to check which settings are present.

import nodemailer from "nodemailer";

const REQUIRED = ["CONTACT_TO", "SMTP_HOST", "SMTP_USER", "SMTP_PASS"];

const clean = (v, max = 2000) => String(v ?? "").trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") return JSON.parse(req.body || "{}");
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
}

function settings() {
  const env = process.env;
  return {
    to: clean(env.CONTACT_TO, 1000).split(",").map((s) => s.trim()).filter(Boolean),
    host: clean(env.SMTP_HOST, 200),
    port: Number(clean(env.SMTP_PORT, 10)) || 465,
    user: clean(env.SMTP_USER, 200),
    // Google shows app passwords with spaces ("abcd efgh ijkl mnop"); remove them.
    pass: String(env.SMTP_PASS ?? "").replace(/\s+/g, ""),
    from: clean(env.MAIL_FROM, 200) || clean(env.SMTP_USER, 200),
    missing: REQUIRED.filter((k) => !clean(env[k])),
  };
}

// Turn SMTP errors into a message the site owner can act on.
function explain(err) {
  const code = err && (err.responseCode || err.code);
  const msg = String((err && err.message) || "");
  if (code === 535 || /Username and Password not accepted|BadCredentials|Invalid login/i.test(msg))
    return "Gmail rejected the login. SMTP_USER must be the full Gmail address and SMTP_PASS must be a 16-character App Password (not your normal password).";
  if (/Application-specific password required/i.test(msg))
    return "Gmail needs an App Password. Turn on 2-Step Verification, create one at myaccount.google.com/apppasswords and put it in SMTP_PASS.";
  if (code === "ETIMEDOUT" || code === "ECONNECTION" || code === "ESOCKET" || code === "ECONNREFUSED")
    return "Couldn't connect to the email server. Check SMTP_HOST (smtp.gmail.com) and SMTP_PORT (465).";
  if (code === "EENVELOPE") return "The receiving address in CONTACT_TO looks invalid.";
  return "The email server refused the message.";
}

export default async function handler(req, res) {
  try {
    const cfg = settings();

    // Health check: open /api/contact in a browser. Shows only true/false, never the values.
    if (req.method === "GET") {
      return send(res, 200, {
        ok: cfg.missing.length === 0,
        settings: Object.fromEntries(REQUIRED.map((k) => [k, !cfg.missing.includes(k)])),
        missing: cfg.missing,
        hint: cfg.missing.length
          ? "Add the missing variables in Vercel → Settings → Environment Variables (Production), then Redeploy."
          : "All settings present. Submit the form to test sending.",
      });
    }
    if (req.method !== "POST") return send(res, 405, { error: "Method not allowed." });

    let body;
    try { body = await readBody(req); } catch { return send(res, 400, { error: "The form data couldn't be read." }); }
    if (body.website) return send(res, 200, { ok: true }); // spam trap filled: ignore quietly

    const f = {
      name: clean(body.name, 120),
      company: clean(body.company, 160),
      email: clean(body.email, 200),
      phone: clean(body.phone, 40),
      service: clean(body.service, 80),
      budget: clean(body.budget, 80),
      message: clean(body.message, 5000),
    };
    const digits = f.phone.replace(/\D/g, "");
    if (f.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email) || digits.length < 8 || !f.service || f.message.length < 20) {
      return send(res, 400, { error: "Some details are missing or invalid." });
    }

    if (cfg.missing.length) {
      console.error("Contact form: missing environment variables:", cfg.missing.join(", "));
      return send(res, 500, { error: `Email isn't set up yet (missing ${cfg.missing.join(", ")}).` });
    }

    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.port === 465,
      auth: { user: cfg.user, pass: cfg.pass },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const waNumber = digits.length === 10 ? "91" + digits : digits;
    const rows = [["Name", f.name], ["Company", f.company || "—"], ["Email", f.email], ["Phone", f.phone], ["Service", f.service], ["Budget", f.budget || "Not specified"]];
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${f.message}\n\nWhatsApp: https://wa.me/${waNumber}`;
    const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0E1A33">
<h2 style="color:#0B2A66;margin:0 0 12px">New website enquiry</h2>
<table style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:6px 16px 6px 0;color:#55657F">${k}</td><td style="padding:6px 0"><b>${esc(v)}</b></td></tr>`).join("")}</table>
<p style="white-space:pre-wrap;border-left:3px solid #1B84F2;padding-left:12px;margin:16px 0">${esc(f.message)}</p>
<p><a href="https://wa.me/${waNumber}">Reply on WhatsApp</a> &nbsp;·&nbsp; Or just reply to this email to answer ${esc(f.name)} directly.</p>
</div>`;

    await transporter.sendMail({
      from: `"Anita Solutions Website" <${cfg.from}>`,
      to: cfg.to,
      replyTo: { name: f.name, address: f.email },
      subject: `New enquiry: ${f.service} — ${f.name}${f.company ? " (" + f.company + ")" : ""}`,
      text,
      html,
    });

    return send(res, 200, { ok: true });
  } catch (err) {
    console.error("Contact form failed:", err);
    return send(res, 500, { error: explain(err) });
  }
}
