import { site } from "@/lib/site";

/**
 * JSON-LD structured data injected into <head> for SEO.
 *
 * - LocalBusiness/ProfessionalService schema → enables Google "near me" /
 *   knowledge-panel results.
 *
 * Keep this in a Server Component so the JSON is in the static HTML and
 * Googlebot can read it without running JavaScript.
 */

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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
    </>
  );
}
