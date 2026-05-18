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
    a: "Entre 7 y 14 días para los paquetes Esencial y Crecimiento. Proyectos a la medida pueden tomar de 3 a 6 semanas según alcance.",
  },
  {
    q: "¿Qué necesitas de mi parte para empezar?",
    a: "Una llamada de 30 minutos, fotos de tu negocio (si las tienes), y acceso a tu dominio si ya cuentas con uno. El copy y la estructura los preparamos nosotros.",
  },
  {
    q: "¿Yo puedo editar el sitio después?",
    a: "Sí. Te entregamos un sitio fácil de actualizar y te enseñamos a cambiar textos, fotos y precios. También ofrecemos planes mensuales si prefieres que nosotros lo mantengamos.",
  },
  {
    q: "¿Incluye hosting y dominio?",
    a: "El sitio se publica en infraestructura premium (Vercel). El primer año puede incluirse según paquete. El dominio se compra a tu nombre — tú siempre eres dueño.",
  },
  {
    q: "¿Trabajan con negocios fuera de Ohio?",
    a: "Sí. Trabajamos con clientes en todo EE. UU. y LATAM de forma remota. Comunicación clara en español o inglés, según prefieras.",
  },
  {
    q: "¿Qué pasa si no me gusta el diseño?",
    a: "Trabajamos con rondas de revisión incluidas en cada paquete. No empezamos a programar hasta que apruebas el diseño visual — así nunca hay sorpresas al final.",
  },
  {
    q: "¿Cómo se hacen los pagos?",
    a: "50% al iniciar (apartar fecha de inicio) y 50% al entregar. Aceptamos transferencia bancaria, Zelle, Wise o tarjeta. Todos los pagos en USD.",
  },
  {
    q: "¿Puedo cambiar de paquete después de empezar?",
    a: "Sí. Si decides ampliar a un paquete mayor durante el proyecto, solo pagas la diferencia. Sin penalización ni proceso engorroso — solo más alcance.",
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
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon`,
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
      name: "Paquetes web",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Esencial",
          description: "Sitio premium de una página con WhatsApp y SEO básico",
          price: "1500",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Crecimiento",
          description:
            "Sitio multipágina con catálogo/reservas, copy y animaciones",
          price: "3500",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          name: "Autoridad",
          description: "Sistema de marca completo con integraciones",
          price: "6500",
          priceCurrency: "USD",
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
