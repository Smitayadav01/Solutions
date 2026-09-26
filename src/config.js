/* ============================================================
   SITE SETTINGS — edit contact details here
   ============================================================ */
export const CONFIG = {
  siteUrl: "https://anitasolutions.in",

  // Public email shown on the website. Leave "" to hide the email card.
  // (The address that RECEIVES form enquiries is set in Vercel as CONTACT_TO.)
  email: "anitasolutions.tech@gmail.com",

  // WhatsApp / phone numbers: country code + number, digits only
  phones: [
    { number: "918291506766", display: "+91 82915 06766" },
    { number: "919821888626", display: "+91 98218 88626" },
  ],

  // Where the contact form sends enquiries (serverless function in /api)
  formEndpoint: "/api/contact",

  social: { linkedin: "#", instagram: "#", github: "#" },
};

export const waLink = (number, text = "Hi Anita Solutions, I'd like to discuss a project.") =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
