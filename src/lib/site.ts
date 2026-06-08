export const site = {
  brand: "LEYVA",
  brandSub: "Web Studio",
  url: "https://leyvawebstudio.com",
  description:
    "Estudio web con base en Ohio, EE. UU. Diseñamos y desarrollamos sitios cinematográficos a la medida para negocios locales que quieren atraer mejores clientes y cobrar precios más altos.",
  contact: {
    whatsapp: "12166225575",
    whatsappDisplay: "+1 (216) 622-5575",
    // Same line — used for tel: links so local-US prospects can call
    // directly from the navbar / footer instead of going through chat.
    phone: "+12166225575",
    phoneDisplay: "+1 (216) 622-5575",
    // hola@leyvawebstudio.com está enrutado vía Cloudflare Email Routing
    // a la bandeja personal. También hay un catch-all *@leyvawebstudio.com
    // → bandeja personal por si alguien escribe a cualquier alias.
    email: "hola@leyvawebstudio.com",
    location: "Cleveland, Ohio · trabajamos en todo EE. UU. y LATAM",
    // Cal.com booking link. Cuando esté seteado, el sitio muestra un CTA
    // "Agendar 15 min" en Hero + FAQ. Si queda vacío, el CTA se oculta y
    // los usuarios siguen yendo por WhatsApp como hasta ahora.
    // Setup: docs/SETUP-CALCOM.md
    bookingUrl: "",
  },
  analytics: {
    // Cloudflare Web Analytics (free, cookieless, privacy-first).
    // Get it: Cloudflare dashboard → Analytics & Logs → Web Analytics →
    // Add a site → copy the token. Paste it here and redeploy — the
    // beacon then loads automatically. Empty = analytics off (no script).
    cfBeaconToken: "",
  },
};

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.contact.whatsapp}?text=${text}`;
}

export function mailtoLink(subject: string, body: string) {
  return `mailto:${site.contact.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
