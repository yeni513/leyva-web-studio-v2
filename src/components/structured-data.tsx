import { site } from "@/lib/site";

/**
 * JSON-LD structured data injected into <head> for SEO.
 *
 * - LocalBusiness/ProfessionalService schema → enables Google "near me" /
 *   knowledge-panel results.
 * - FAQPage schema → enables rich FAQ results in search.
 *
 * Keep this in a Server Component so the JSON is in the static HTML and
 * Googlebot can read it without running JavaScript.
 */

const faqs = [
  {
    q: "¿Cuánto tarda en estar listo mi sitio?",
    a: "Entre 7 y 14 días para los paquetes Starter Local y Growth Pro. Authority Premium y proyectos a la medida pueden tomar de 3 a 6 semanas según alcance.",
  },
  {
    q: "¿Por qué hay mensualidad?",
    a: "Porque un sitio serio necesita actualizaciones, monitoreo, pequeños cambios, chequeos de performance y soporte después del lanzamiento. El plan mensual cubre todo eso para que tu web no se quede abandonada.",
  },
  {
    q: "¿Puedo cancelar el plan mensual?",
    a: "Sí, según el plan acordado. No hay contratos eternos ni penalidades de salida. El objetivo es mantener tu sitio sano, no atrapar al cliente.",
  },
  {
    q: "¿El dominio es mío?",
    a: "Sí. El dominio se registra a tu nombre y queda bajo tu propiedad. Leyva Web Studio te ayuda a configurarlo, pero el dueño legal siempre eres tú.",
  },
  {
    q: "¿Qué pasa después de publicar mi sitio?",
    a: "Empieza el plan mensual: cuidamos la salud técnica, hacemos mejoras cada mes, actualizamos contenido, monitoreamos performance y respondemos cuando algo necesita atención.",
  },
  {
    q: "¿Qué necesitas de mi parte para empezar?",
    a: "Una llamada de 30 minutos, fotos de tu negocio (si las tienes), y acceso a tu dominio si ya cuentas con uno. El copy y la estructura los preparamos nosotros.",
  },
  {
    q: "¿Incluye hosting?",
    a: "Sí — el hosting y el deploy están incluidos en el plan mensual de cualquier paquete. Publicamos en infraestructura premium (Cloudflare). El dominio se registra a tu nombre.",
  },
  {
    q: "¿Trabajan con negocios fuera de Ohio?",
    a: "Sí. Trabajamos con clientes en todo EE. UU. y LATAM de forma remota. Comunicación clara en español o inglés, según prefieras.",
  },
  {
    q: "¿Qué pasa si no me gusta el diseño?",
    a: "Trabajamos con rondas de revisión incluidas en cada paquete (1 en Starter, 2 en Growth Pro, 3 en Authority). No empezamos a programar hasta que apruebas el diseño visual.",
  },
  {
    q: "¿Cómo se hacen los pagos?",
    a: "El pago inicial cubre la construcción (50% al iniciar, 50% al entregar). El plan mensual se cobra a partir del lanzamiento. Aceptamos transferencia, Zelle, Wise o tarjeta. Todos en USD.",
  },
];

export function StructuredData() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}#business`,
    name: `${site.brand} ${site.brandSub}`,
    description: site.description,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    priceRange: "$$",
    telephone: `+${site.contact.whatsapp}`,
    email: site.contact.email,
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Mexico" },
      { "@type": "Place", name: "Latin America" },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "OH",
      addressCountry: "US",
    },
    sameAs: [],
    knowsAbout: [
      "Diseño web",
      "Desarrollo web",
      "Next.js",
      "SEO local",
      "Diseño UX/UI",
      "Sitios para restaurantes",
      "Sitios para contratistas",
      "Sitios para inmobiliarias",
    ],
    serviceType: "Diseño y desarrollo web",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Paquetes web con plan mensual",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Starter Local",
          description:
            "Sitio premium de una página con WhatsApp y SEO local, más plan mensual de cuidado y crecimiento.",
          price: "900",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "99",
            priceCurrency: "USD",
            billingDuration: "P1M",
            unitText: "MON",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
        },
        {
          "@type": "Offer",
          name: "Growth Pro",
          description:
            "Sitio multipágina enfocado en conversión con copy, SEO y portfolio, más plan mensual de mejoras y soporte prioritario.",
          price: "1800",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "149",
            priceCurrency: "USD",
            billingDuration: "P1M",
            unitText: "MON",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
        },
        {
          "@type": "Offer",
          name: "Authority Premium",
          description:
            "Experiencia premium custom con estrategia de conversión y prueba social, más plan mensual de crecimiento y revisión estratégica.",
          price: "3500",
          priceCurrency: "USD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "299",
            priceCurrency: "USD",
            billingDuration: "P1M",
            unitText: "MON",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          },
        },
      ],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}#website`,
    url: site.url,
    name: `${site.brand} ${site.brandSub}`,
    description: site.description,
    inLanguage: "es-US",
    publisher: { "@id": `${site.url}#business` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
