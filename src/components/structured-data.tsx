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
    a: "Porque un sitio serio necesita más que solo lanzarse. El plan mensual es de cuidado y crecimiento: actualizaciones, monitoreo, pequeños cambios, chequeos de performance, mejoras continuas y soporte después del lanzamiento. Tu web no se queda abandonada.",
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
    alternateName: "Leyva Web Studio · Web Design Cleveland",
    description: site.description,
    url: site.url,
    logo: `${site.url}/icon.svg`,
    image: `${site.url}/og-image.png`,
    slogan:
      "Sitios web premium que hacen ver profesional a tu negocio y convierten visitantes en clientes.",
    founder: {
      "@type": "Person",
      name: "Alexander Rodríguez",
      jobTitle: "Fundador y desarrollador",
    },
    // Bilingual studio — strengthens "Spanish web designer Cleveland".
    knowsLanguage: ["en", "es"],
    priceRange: "$$",
    telephone: `+${site.contact.whatsapp}`,
    email: site.contact.email,
    // Primary local service area first (Cleveland metro), then the wider
    // reach. Specific places help Google's local relevance.
    areaServed: [
      { "@type": "City", name: "Cleveland", "@id": "https://www.wikidata.org/wiki/Q37320" },
      { "@type": "AdministrativeArea", name: "Cuyahoga County, Ohio" },
      { "@type": "City", name: "Lakewood, Ohio" },
      { "@type": "City", name: "Parma, Ohio" },
      { "@type": "City", name: "Cleveland Heights, Ohio" },
      { "@type": "State", name: "Ohio" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Mexico" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cleveland",
      addressRegion: "OH",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 41.4993,
      longitude: -81.6944,
    },
    // Verifiable cross-references for Google's knowledge panel. Add
    // social/professional URLs as they go live — each one strengthens
    // the entity graph and the "is this a real business?" signal.
    sameAs: [
      "https://github.com/yeni513/leyva-web-studio-v2",
    ],
    knowsAbout: [
      "Web design Cleveland Ohio",
      "Diseño web para negocios locales",
      "Desarrollo web Next.js",
      "SEO local Cleveland",
      "Google Business Profile optimization",
      "Landing pages de alta conversión",
      "Chatbots con IA para negocios",
      "Mantenimiento web mensual",
      "Diseño web para restaurantes",
      "Diseño web para contratistas y landscaping",
      "Diseño web para tiendas y electrodomésticos",
      "Diseño UX/UI y optimización de conversión",
    ],
    serviceType: "Web design & development for local businesses",
    // Individual services (in addition to the packaged offers below) —
    // gives Google explicit Service entities to associate with the brand.
    makesOffer: [
      "Diseño web premium para negocios locales",
      "Páginas web para restaurantes",
      "Páginas web para contractors y landscaping",
      "Páginas web para tiendas y servicios locales",
      "SEO local en Cleveland, Ohio",
      "Google Business Profile optimization",
      "Mantenimiento web mensual",
      "Landing pages de alta conversión",
      "Chatbots con IA para captar leads",
    ].map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s,
        provider: { "@id": `${site.url}#business` },
        areaServed: { "@type": "City", name: "Cleveland, Ohio" },
      },
    })),
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
