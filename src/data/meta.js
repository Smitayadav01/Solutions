import { SERVICES } from "./content.js";

export const PAGE_META = {
  "/": ["Anita Solutions | AI, Software & Business Automation Solutions", "Anita Solutions provides AI solutions, custom software development, recruitment technology, business automation, websites, web applications, and digital solutions for growing businesses."],
  "/about": ["About Anita Solutions | Technology Partner for Growing Businesses", "Anita Solutions helps businesses adopt software, AI, automation and digital technologies through practical, scalable solutions."],
};
SERVICES.forEach((s) => { PAGE_META["/" + s.slug] = [`${s.title} | Anita Solutions`, s.short]; });
