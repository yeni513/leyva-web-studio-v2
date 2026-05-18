export const site = {
  brand: "LEYVA",
  brandSub: "Web Studio",
  url: "https://leyvawebstudio.com",
  description:
    "Estudio web con base en Ohio, EE. UU. Diseñamos y desarrollamos sitios cinematográficos a la medida para negocios locales que quieren atraer mejores clientes y cobrar precios más altos.",
  contact: {
    whatsapp: "12166225575",
    whatsappDisplay: "+1 (216) 622-5575",
    email: "alexspark513@yahoo.com",
    location: "Cleveland, Ohio · trabajamos en todo EE. UU. y LATAM",
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
