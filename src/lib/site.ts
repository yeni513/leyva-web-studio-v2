export const site = {
  brand: "LEYVA",
  brandSub: "Web Studio",
  url: "https://leyvawebstudio.com",
  description:
    "Estudio web premium con base en Ohio, EE. UU. Diseñamos y desarrollamos sitios cinematográficos para negocios locales que quieren verse profesionales, generar confianza y convertir visitantes en clientes.",
  contact: {
    whatsapp: "16140000000",
    whatsappDisplay: "+1 (614) 000-0000",
    email: "hola@leyvawebstudio.com",
    location: "Ohio, EE. UU. · trabajamos en todo el país y LATAM",
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
