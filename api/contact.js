
import nodemailer from "nodemailer";

const REQUIRED = ["CONTACT_TO", "SMTP_HOST", "SMTP_USER", "SMTP_PASS"];

const clean = (v, max = 2000) =>
  String(v ?? "").trim().slice(0, max);

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

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
    to: clean(env.CONTACT_TO, 1000)
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),

    host: clean(env.SMTP_HOST, 200),
    port: Number(clean(env.SMTP_PORT, 10)) || 465,
    user: clean(env.SMTP_USER, 200),

    // Remove spaces from Zoho app passwords if copied with spaces.
    pass: String(env.SMTP_PASS ?? "").replace(/\s+/g, ""),

    from: clean(env.MAIL_FROM, 200) || clean(env.SMTP_USER, 200),

    missing: REQUIRED.filter((key) => !clean(env[key])),
  };
}

function explain(err) {
  const code = err?.responseCode || err?.code;
  const msg = String(err?.message || "");

  if (
    Number(code) === 535 ||
    /Invalid login|Authentication Failed|BadCredentials|Username and Password not accepted/i.test(msg)
  ) {
    return "SMTP authentication failed. Check your SMTP mailbox, App Password, and SMTP server settings.";
  }

  if (/Application-specific password required/i.test(msg)) {
    return "An app-specific password is required for this email account.";
  }

  if (
    ["ETIMEDOUT", "ECONNECTION", "ESOCKET", "ECONNREFUSED"].includes(code)
  ) {
    return "Could not connect to the SMTP server. Check SMTP_HOST, SMTP_PORT, and network access.";
  }

  if (code === "EENVELOPE") {
    return "The sender or recipient email address is invalid. Check SMTP_USER, MAIL_FROM, and CONTACT_TO.";
  }

  return "The enquiry email could not be sent. Check the backend terminal for details.";
}

export default async function handler(req, res) {
  try {
    const cfg = settings();

    // Health check: never expose passwords or their values.
    if (req.method === "GET") {
      return send(res, 200, {
        ok: cfg.missing.length === 0,
        settings: Object.fromEntries(
          REQUIRED.map((key) => [key, !cfg.missing.includes(key)])
        ),
        missing: cfg.missing,
        hint: cfg.missing.length
          ? "Configure the missing environment variables and restart or redeploy the backend."
          : "Environment variables are present. Submit the form to test email delivery.",
      });
    }

    if (req.method !== "POST") {
      return send(res, 405, { error: "Method not allowed." });
    }

    let body;

    try {
      body = await readBody(req);
    } catch {
      return send(res, 400, {
        error: "The form data could not be read.",
      });
    }

    // Spam trap.
    if (body.website) {
      return send(res, 200, { ok: true });
    }

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

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email);

    if (
      f.name.length < 2 ||
      !validEmail ||
      digits.length < 8 ||
      !f.service ||
      f.message.length < 20
    ) {
      return send(res, 400, {
        error: "Some details are missing or invalid.",
      });
    }

    if (cfg.missing.length) {
      console.error(
        "Contact form: missing environment variables:",
        cfg.missing.join(", ")
      );

      return send(res, 500, {
        error: `Email isn't configured. Missing: ${cfg.missing.join(", ")}.`,
      });
    }

    if (!cfg.to.length) {
      return send(res, 500, {
        error: "No recipient email is configured in CONTACT_TO.",
      });
    }

    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.port === 465,
      auth: {
        user: cfg.user,
        pass: cfg.pass,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    const waNumber = digits.length === 10 ? `91${digits}` : digits;
    const waUrl = `https://wa.me/${waNumber}`;

    const rows = [
      ["Name", f.name],
      ["Company", f.company || "—"],
      ["Email", f.email],
      ["Phone", f.phone],
      ["Service", f.service],
      ["Budget", f.budget || "Not specified"],
    ];

    const text =
      rows.map(([key, value]) => `${key}: ${value}`).join("\n") +
      `\n\nMessage:\n${f.message}\n\nWhatsApp: ${waUrl}`;

    const html = `
      <div style="font-family:Arial,sans-serif;font-size:14px;color:#0E1A33">
        <h2 style="color:#0B2A66;margin:0 0 12px">
          New website enquiry
        </h2>

        <table style="border-collapse:collapse">
          ${rows.map(([key, value]) => `
            <tr>
              <td style="padding:6px 16px 6px 0;color:#55657F">
                ${esc(key)}
              </td>
              <td style="padding:6px 0">
                <b>${esc(value)}</b>
              </td>
            </tr>
          `).join("")}
        </table>

        <p style="white-space:pre-wrap;border-left:3px solid #1B84F2;padding-left:12px;margin:16px 0">${esc(f.message)}</p>

        <p>
          <a href="${waUrl}">Reply on WhatsApp</a>
          &nbsp;·&nbsp; Or reply to this email to answer ${esc(f.name)}.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Anita Solutions Website" <${cfg.from}>`,
      to: cfg.to,
      replyTo: {
        name: f.name,
        address: f.email,
      },
      subject: `New enquiry: ${f.service} — ${f.name}${
        f.company ? ` (${f.company})` : ""
      }`,
      text,
      html,
    });

    return send(res, 200, { ok: true });
  } catch (err) {
    // Log the SMTP error for debugging; never log credentials.
    console.error("Contact form failed:", {
      code: err?.code,
      responseCode: err?.responseCode,
      command: err?.command,
      response: err?.response,
      message: err?.message,
    });

    return send(res, 500, {
      error: explain(err),
    });
  }
}
