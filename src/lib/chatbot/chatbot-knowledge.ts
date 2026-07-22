import type { Lang, PackageId, PackageInfo } from "./chatbot-types";

/**
 * Single source of truth for everything the assistant is allowed to talk
 * about. The mock AI (and, later, a real LLM via a system prompt built
 * from this file) must never invent services beyond what lives here.
 */

export const VALUE_PROP: Record<Lang, string> = {
  en: "Leyva Web Studio helps local businesses look more professional, earn trust, and turn more visitors into leads with a stronger online presence.",
  es: "Leyva Web Studio ayuda a los negocios locales a verse más profesionales, generar confianza y convertir más visitantes en clientes con una presencia online más fuerte.",
};

export const SERVICES: Record<Lang, string[]> = {
  en: [
    "Custom website design",
    "Landing pages",
    "Local business websites",
    "Restaurant & food websites",
    "Ecommerce websites",
    "Website redesigns",
    "Website maintenance",
    "Local SEO",
    "Google Business Profile optimization",
    "Google Ads management",
    "Meta / Facebook / Instagram Ads management",
    "Social media management",
    "Custom systems (booking, inventory, dashboards)",
    "Lead capture & contact systems",
    "Premium growth bundles",
  ],
  es: [
    "Diseño web a la medida",
    "Landing pages",
    "Sitios para negocios locales",
    "Sitios para restaurantes y comida",
    "Tiendas online (ecommerce)",
    "Rediseño de sitios",
    "Mantenimiento web",
    "SEO local",
    "Optimización de Google Business Profile",
    "Gestión de Google Ads",
    "Gestión de Meta / Facebook / Instagram Ads",
    "Manejo de redes sociales",
    "Sistemas a la medida (reservas, inventario, dashboards)",
    "Sistemas de captación y contacto",
    "Paquetes premium de crecimiento",
  ],
};

/**
 * Safety guardrails surfaced to the model / used to phrase answers.
 * The assistant never promises rankings, ad results, or revenue, and
 * never confirms final prices.
 */
export const SAFETY_RULES: Record<Lang, string[]> = {
  en: [
    "Never guarantee SEO rankings, ad results, or revenue.",
    "Never confirm final pricing — Alexander reviews and quotes.",
    "Never give legal, tax, medical, or financial advice.",
    "Never request sensitive data (SSN, bank, passwords, documents).",
  ],
  es: [
    "Nunca garantizar posiciones SEO, resultados de ads ni ingresos.",
    "Nunca confirmar precio final — Alexander revisa y cotiza.",
    "Nunca dar asesoría legal, fiscal, médica ni financiera.",
    "Nunca pedir datos sensibles (SSN, banco, contraseñas, documentos).",
  ],
};

export const PRICING_NOTE: Record<Lang, string> = {
  en: "Pricing depends on the project scope. Alexander confirms the final quote after reviewing your business and goals.",
  es: "El precio depende del alcance del proyecto. Alexander confirma la cotización final tras revisar tu negocio y tus objetivos.",
};

export const PACKAGES: PackageInfo[] = [
  {
    id: "starter-landing",
    name: { en: "Starter Landing Page", es: "Landing Starter" },
    tagline: {
      en: "A sharp first impression with a clear contact path.",
      es: "Una primera impresión fuerte con un camino claro de contacto.",
    },
    bestFor: {
      en: "Small businesses that need to look credible fast and capture calls or messages.",
      es: "Negocios pequeños que necesitan verse creíbles rápido y captar llamadas o mensajes.",
    },
    includes: {
      en: [
        "Premium one-page design",
        "Mobile-first & fast",
        "Contact + WhatsApp CTA",
        "Basic local SEO setup",
      ],
      es: [
        "Diseño premium de una página",
        "Mobile-first y rápido",
        "Contacto + CTA de WhatsApp",
        "SEO local básico",
      ],
    },
  },
  {
    id: "local-business",
    name: { en: "Local Business Website", es: "Sitio para Negocio Local" },
    tagline: {
      en: "A complete site that builds trust and drives leads.",
      es: "Un sitio completo que genera confianza y atrae clientes.",
    },
    bestFor: {
      en: "Contractors, cleaning, barbers, tax offices, notaries, landscaping, auto shops.",
      es: "Contratistas, limpieza, barberías, oficinas fiscales, notarías, jardinería, talleres.",
    },
    includes: {
      en: [
        "Multi-section premium site",
        "Services & trust sections",
        "Lead form + WhatsApp flow",
        "Local SEO foundation",
      ],
      es: [
        "Sitio premium multi-sección",
        "Secciones de servicios y confianza",
        "Formulario + flujo de WhatsApp",
        "Fundación de SEO local",
      ],
    },
  },
  {
    id: "premium-business",
    name: { en: "Premium Business Website", es: "Sitio Premium de Negocio" },
    tagline: {
      en: "High-end brand presence built to convert.",
      es: "Presencia de marca de alto nivel hecha para convertir.",
    },
    bestFor: {
      en: "Businesses that want a standout brand, stronger conversion, and refined animations.",
      es: "Negocios que quieren una marca que destaque, más conversión y animaciones cuidadas.",
    },
    includes: {
      en: [
        "Custom premium design & motion",
        "Conversion-focused copy",
        "Advanced SEO structure",
        "Analytics & event tracking",
      ],
      es: [
        "Diseño premium y animación a la medida",
        "Copy enfocado en conversión",
        "Estructura SEO avanzada",
        "Analítica y seguimiento de eventos",
      ],
    },
  },
  {
    id: "ecommerce",
    name: { en: "Ecommerce Website", es: "Tienda Online" },
    tagline: {
      en: "Sell online with a clean product and checkout strategy.",
      es: "Vende online con una estrategia clara de producto y checkout.",
    },
    bestFor: {
      en: "Businesses selling products online that need product pages and a growth path.",
      es: "Negocios que venden productos online y necesitan fichas y un plan de crecimiento.",
    },
    includes: {
      en: [
        "Product catalog & pages",
        "Cart / checkout strategy",
        "Payment-ready structure",
        "Growth & SEO options",
      ],
      es: [
        "Catálogo y fichas de producto",
        "Estrategia de carrito / checkout",
        "Estructura lista para pagos",
        "Opciones de crecimiento y SEO",
      ],
    },
  },
  {
    id: "restaurant",
    name: {
      en: "Restaurant / Food Website",
      es: "Sitio para Restaurante",
    },
    tagline: {
      en: "Make people hungry and drive reservations & orders.",
      es: "Da hambre y dispara reservas y pedidos.",
    },
    bestFor: {
      en: "Restaurants, cafes, food trucks, catering — menu, gallery, location, ordering.",
      es: "Restaurantes, cafés, food trucks, catering — menú, galería, ubicación, pedidos.",
    },
    includes: {
      en: [
        "Digital menu & gallery",
        "Reservations / order links",
        "Location, hours & map",
        "Catering & reviews sections",
      ],
      es: [
        "Menú digital y galería",
        "Reservas / enlaces de pedido",
        "Ubicación, horarios y mapa",
        "Secciones de catering y reseñas",
      ],
    },
  },
  {
    id: "maintenance",
    name: { en: "Maintenance Plan", es: "Plan de Mantenimiento" },
    tagline: {
      en: "Keep your site fast, secure, and always up to date.",
      es: "Mantén tu sitio rápido, seguro y siempre actualizado.",
    },
    bestFor: {
      en: "Any business that wants their site cared for after launch.",
      es: "Cualquier negocio que quiera su sitio cuidado después del lanzamiento.",
    },
    includes: {
      en: [
        "Updates & backups",
        "Security checks",
        "Content & image edits",
        "Performance monitoring",
      ],
      es: [
        "Actualizaciones y respaldos",
        "Chequeos de seguridad",
        "Cambios de texto e imágenes",
        "Monitoreo de performance",
      ],
    },
  },
  {
    id: "seo-local",
    name: { en: "SEO Local Boost", es: "SEO Local" },
    tagline: {
      en: "Get found by customers searching in your city.",
      es: "Que los clientes de tu ciudad te encuentren primero.",
    },
    bestFor: {
      en: "Local businesses that want more visibility in Google and Maps.",
      es: "Negocios locales que quieren más visibilidad en Google y Maps.",
    },
    includes: {
      en: [
        "Local keyword structure",
        "Google Business Profile setup",
        "On-page SEO & schema",
        "Monthly health checks",
      ],
      es: [
        "Estructura de keywords locales",
        "Configuración de Google Business Profile",
        "SEO on-page y schema",
        "Chequeos mensuales de salud",
      ],
    },
  },
  {
    id: "growth-bundle",
    name: { en: "Growth Bundle", es: "Paquete de Crecimiento" },
    tagline: {
      en: "Website + SEO + Google Business + ads + maintenance.",
      es: "Web + SEO + Google Business + ads + mantenimiento.",
    },
    bestFor: {
      en: "Businesses ready to grow with a full done-for-you system.",
      es: "Negocios listos para crecer con un sistema completo hecho por nosotros.",
    },
    includes: {
      en: [
        "Premium website",
        "Local SEO + Google Business",
        "Managed Google / Meta Ads",
        "Ongoing maintenance & reports",
      ],
      es: [
        "Sitio web premium",
        "SEO local + Google Business",
        "Google / Meta Ads gestionados",
        "Mantenimiento y reportes continuos",
      ],
    },
  },
  {
    id: "custom-system",
    name: { en: "Custom System", es: "Sistema a la Medida" },
    tagline: {
      en: "Booking, inventory, dashboards, portals & automations.",
      es: "Reservas, inventario, dashboards, portales y automatizaciones.",
    },
    bestFor: {
      en: "Businesses that need a tailored tool or internal workflow.",
      es: "Negocios que necesitan una herramienta o flujo interno a la medida.",
    },
    includes: {
      en: [
        "Booking / inventory systems",
        "Business dashboards",
        "Client portals",
        "Workflow automations",
      ],
      es: [
        "Sistemas de reservas / inventario",
        "Dashboards de negocio",
        "Portales de clientes",
        "Automatización de flujos",
      ],
    },
  },
];

export function getPackage(id: PackageId): PackageInfo | undefined {
  return PACKAGES.find((p) => p.id === id);
}
