import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Lets the contact form work on localhost with `npm run dev`.
// It runs the same api/contact.js that Vercel runs in production,
// using the settings from your local .env file.
function localApi() {
  return {
    name: "local-api",
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), "");
      for (const k of ["CONTACT_TO", "SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_FROM"]) {
        if (env[k] !== undefined) process.env[k] = env[k];
      }
      server.middlewares.use("/api/contact", async (req, res) => {
        const mod = await server.ssrLoadModule("/api/contact.js");
        await mod.default(req, res);
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localApi()],
});
