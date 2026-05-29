import type {
  ChatApiRequest,
  ChatResponse,
  Lang,
  PackageId,
  QuickReply,
} from "./chatbot-types";
import { PRICING_NOTE, VALUE_PROP } from "./chatbot-knowledge";
import { chatbotConfig, INITIAL_QUICK_REPLIES } from "./chatbot-config";
import { detectLanguage } from "./chatbot-utils";

/**
 * Smart, keyword-driven mock assistant. Pure & deterministic so it runs
 * identically on the server (api/chat/route.ts) and as a client-side
 * fallback when the network is unavailable.
 *
 * To swap in a real LLM later, keep this signature and build the system
 * prompt from chatbot-knowledge.ts — the UI contract (ChatResponse)
 * does not change.
 */

type Intent =
  | "greeting"
  | "landing"
  | "restaurant"
  | "ecommerce"
  | "seo"
  | "google-ads"
  | "meta-ads"
  | "social"
  | "maintenance"
  | "custom"
  | "website"
  | "pricing"
  | "quote"
  | "thanks"
  | "fallback";

// Order matters: more specific intents are tested before generic ones.
const INTENT_KEYWORDS: Array<{ intent: Intent; keywords: string[] }> = [
  {
    intent: "thanks",
    keywords: ["thank", "thanks", "gracias", "perfecto", "genial"],
  },
  {
    intent: "quote",
    keywords: [
      "quote",
      "cotiz",
      "cotización",
      "consultation",
      "consulta",
      "contact me",
      "contactar",
      "hablar con alexander",
      "talk to alexander",
    ],
  },
  {
    intent: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "how much",
      "precio",
      "cuesta",
      "cuánto",
      "cuanto",
      "tarifa",
    ],
  },
  {
    intent: "restaurant",
    keywords: [
      "restaurant",
      "restaurante",
      "food",
      "comida",
      "menu",
      "menú",
      "cafe",
      "café",
      "taco",
      "catering",
      "food truck",
    ],
  },
  {
    intent: "ecommerce",
    keywords: [
      "ecommerce",
      "e-commerce",
      "online store",
      "store",
      "shop",
      "tienda",
      "vender",
      "productos",
      "carrito",
      "checkout",
    ],
  },
  {
    intent: "seo",
    keywords: [
      "seo",
      "google business",
      "google maps",
      "ranking",
      "posicion",
      "posición",
      "encontrar en google",
      "aparecer en google",
    ],
  },
  {
    intent: "google-ads",
    keywords: ["google ads", "adwords", "anuncios de google", "ppc"],
  },
  {
    intent: "meta-ads",
    keywords: [
      "meta ads",
      "facebook ads",
      "instagram ads",
      "anuncios de facebook",
      "anuncios de instagram",
    ],
  },
  {
    intent: "social",
    keywords: [
      "social media",
      "redes sociales",
      "instagram",
      "facebook",
      "tiktok",
      "posts",
      "publicaciones",
    ],
  },
  {
    intent: "maintenance",
    keywords: [
      "maintenance",
      "maintain",
      "mantenimiento",
      "soporte",
      "support",
      "update",
      "actualiz",
      "backup",
      "respaldo",
    ],
  },
  {
    intent: "custom",
    keywords: [
      "booking",
      "reserva",
      "inventory",
      "inventario",
      "dashboard",
      "portal",
      "system",
      "sistema",
      "automation",
      "automatiz",
      "crm",
    ],
  },
  {
    intent: "landing",
    keywords: ["landing", "one page", "una pagina", "una página", "campaign"],
  },
  {
    intent: "website",
    keywords: [
      "website",
      "web site",
      "web",
      "página",
      "pagina",
      "sitio",
      "site",
      "redesign",
      "rediseño",
    ],
  },
  {
    intent: "greeting",
    keywords: ["hello", "hi", "hey", "hola", "buenas", "saludos"],
  },
];

function detectIntent(text: string): Intent {
  const t = text.toLowerCase();
  for (const { intent, keywords } of INTENT_KEYWORDS) {
    if (keywords.some((k) => t.includes(k))) return intent;
  }
  return "fallback";
}

interface IntentReply {
  reply: Record<Lang, string>;
  packages?: PackageId[];
  offerLead?: boolean;
  leadHints?: ChatResponse["leadHints"];
}

const REPLIES: Record<Intent, IntentReply> = {
  greeting: {
    reply: {
      en: `Hi! 👋 ${VALUE_PROP.en} What kind of business do you have, and what's your main goal right now?`,
      es: `¡Hola! 👋 ${VALUE_PROP.es} ¿Qué tipo de negocio tienes y cuál es tu objetivo principal ahora?`,
    },
  },
  website: {
    reply: {
      en: "Great — a website is the foundation. Depending on your size and goals I'd point you to a Local Business Website or a Premium Business Website. Do you already have a site, and what's the main goal: more calls, more bookings, or a stronger image?",
      es: "Perfecto — la página web es la base. Según tu tamaño y objetivos, te recomendaría un Sitio para Negocio Local o un Sitio Premium. ¿Ya tienes sitio y cuál es tu meta: más llamadas, más reservas o mejor imagen?",
    },
    packages: ["local-business", "premium-business", "starter-landing"],
    leadHints: { service: "Website" },
  },
  landing: {
    reply: {
      en: "A landing page is perfect when you need one focused, high-converting page — ideal for a single offer or ad traffic. Want me to prep a quote for a Starter Landing Page?",
      es: "Una landing es perfecta cuando necesitas una sola página enfocada y de alta conversión — ideal para una oferta o tráfico de anuncios. ¿Quieres que prepare una cotización para una Landing Starter?",
    },
    packages: ["starter-landing"],
    offerLead: true,
    leadHints: { service: "Landing page" },
  },
  restaurant: {
    reply: {
      en: "Love it — for food businesses we build sites that make people hungry and drive reservations and orders: digital menu, gallery, location, ordering links, catering and reviews. Do you want reservations, online ordering, or both?",
      es: "¡Genial! — para negocios de comida hacemos sitios que dan hambre y disparan reservas y pedidos: menú digital, galería, ubicación, enlaces de pedido, catering y reseñas. ¿Quieres reservas, pedidos online o ambos?",
    },
    packages: ["restaurant"],
    leadHints: { businessType: "Restaurante / Comida", service: "Restaurant website" },
  },
  ecommerce: {
    reply: {
      en: "Selling online is a great move. We build clean product pages with a cart/checkout strategy and a path to grow. Roughly how many products are you thinking, and do you already sell anywhere today?",
      es: "Vender online es una gran decisión. Hacemos fichas de producto limpias con estrategia de carrito/checkout y un camino para crecer. ¿Cuántos productos aprox. tienes en mente y ya vendes en algún lado hoy?",
    },
    packages: ["ecommerce"],
    leadHints: { service: "Ecommerce" },
  },
  seo: {
    reply: {
      en: "SEO Local Boost helps customers in your city find you on Google and Maps — keyword structure, Google Business Profile, on-page SEO and monthly health checks. I can't promise specific rankings, but we build the right foundation. What city/area do you serve?",
      es: "SEO Local ayuda a que los clientes de tu ciudad te encuentren en Google y Maps — keywords locales, Google Business Profile, SEO on-page y chequeos mensuales. No prometo posiciones específicas, pero construimos la base correcta. ¿Qué ciudad o zona atiendes?",
    },
    packages: ["seo-local"],
    leadHints: { service: "Local SEO" },
  },
  "google-ads": {
    reply: {
      en: "We set up and manage Google Ads professionally. Note: I can't guarantee leads or sales, and the ad budget is paid separately to Google — our fee covers management. It works best with a strong landing page. Want it as part of a Growth Bundle?",
      es: "Configuramos y gestionamos Google Ads de forma profesional. Nota: no puedo garantizar leads ni ventas, y el presupuesto de anuncios se paga aparte a Google — nuestra tarifa cubre la gestión. Funciona mejor con una buena landing. ¿Lo quieres dentro de un Paquete de Crecimiento?",
    },
    packages: ["growth-bundle"],
    leadHints: { service: "Google Ads" },
  },
  "meta-ads": {
    reply: {
      en: "Facebook/Instagram Ads are great for visual and local offers. Same as Google: no guaranteed results, and ad spend is paid separately to Meta — we handle strategy, creatives and management. Want me to prep a quote?",
      es: "Los anuncios de Facebook/Instagram son ideales para ofertas visuales y locales. Igual que Google: sin resultados garantizados y el gasto se paga aparte a Meta — nosotros llevamos estrategia, creativos y gestión. ¿Preparo una cotización?",
    },
    packages: ["growth-bundle"],
    offerLead: true,
    leadHints: { service: "Meta Ads" },
  },
  social: {
    reply: {
      en: "We manage social media monthly — content calendar, captions, design and reporting. Many clients pair it with ads in a Growth Bundle. How active is your business on social right now?",
      es: "Manejamos redes sociales mensualmente — calendario de contenido, captions, diseño y reportes. Muchos clientes lo combinan con ads en un Paquete de Crecimiento. ¿Qué tan activo está tu negocio en redes hoy?",
    },
    packages: ["growth-bundle"],
    leadHints: { service: "Social media" },
  },
  maintenance: {
    reply: {
      en: "Our Maintenance Plan keeps your site fast, secure and up to date — updates, backups, security checks, content edits and performance monitoring. Do you already have a site you want maintained, or is it a new build?",
      es: "Nuestro Plan de Mantenimiento mantiene tu sitio rápido, seguro y al día — actualizaciones, respaldos, chequeos de seguridad, cambios de contenido y monitoreo. ¿Ya tienes un sitio que quieres mantener o es uno nuevo?",
    },
    packages: ["maintenance"],
    leadHints: { service: "Maintenance" },
  },
  custom: {
    reply: {
      en: "We build custom systems too — booking, inventory, dashboards, client portals and automations tailored to how your business works. Tell me the workflow you'd like to simplify and I'll flag it for Alexander.",
      es: "También construimos sistemas a la medida — reservas, inventario, dashboards, portales de clientes y automatizaciones según cómo opera tu negocio. Cuéntame el flujo que quieres simplificar y se lo marco a Alexander.",
    },
    packages: ["custom-system"],
    leadHints: { service: "Custom system" },
  },
  pricing: {
    reply: {
      en: `${PRICING_NOTE.en} If you tell me your business type and what you need, I'll recommend the right package and prep your request so Alexander can send an exact quote.`,
      es: `${PRICING_NOTE.es} Si me dices tu tipo de negocio y qué necesitas, te recomiendo el paquete ideal y preparo tu solicitud para que Alexander te mande la cotización exacta.`,
    },
    offerLead: true,
  },
  quote: {
    reply: {
      en: "Perfect — let's get you a quote. I'll grab a few quick details so Alexander can review your project and reach out. Tap below to start.",
      es: "Perfecto — vamos por tu cotización. Tomo unos datos rápidos para que Alexander revise tu proyecto y te contacte. Toca abajo para empezar.",
    },
    offerLead: true,
  },
  thanks: {
    reply: {
      en: "You're welcome! 🙌 Want me to recommend a package or prepare a quote for Alexander to review?",
      es: "¡Con gusto! 🙌 ¿Quieres que te recomiende un paquete o que prepare una cotización para que Alexander la revise?",
    },
    offerLead: true,
  },
  fallback: {
    reply: {
      en: "Got it. I can help with websites, online stores, restaurants, SEO, Google/Meta Ads, social media, maintenance, and custom systems. Which of these is closest to what you need?",
      es: "Entendido. Puedo ayudarte con páginas web, tiendas online, restaurantes, SEO, Google/Meta Ads, redes sociales, mantenimiento y sistemas a la medida. ¿Cuál se acerca más a lo que necesitas?",
    },
  },
};

/** Follow-up quick replies that nudge toward a quote, per language. */
function followUpQuickReplies(lang: Lang, offerLead: boolean): QuickReply[] {
  if (offerLead) {
    return [
      {
        id: "qr-start",
        label: lang === "en" ? "Start my project" : "Empezar mi proyecto",
        value: lang === "en" ? "I want a quote" : "Quiero una cotización",
      },
      {
        id: "qr-more",
        label: lang === "en" ? "Tell me more" : "Cuéntame más",
        value: lang === "en" ? "Tell me more" : "Cuéntame más",
      },
    ];
  }
  // Reuse the curated initial set so the conversation always has a path.
  return INITIAL_QUICK_REPLIES[lang].slice(0, 4);
}

export function generateReply(input: ChatApiRequest): ChatResponse {
  const lastUser = [...input.messages]
    .reverse()
    .find((m) => m.role === "user");
  const text = lastUser?.text ?? "";

  const lang: Lang = detectLanguage(
    text,
    input.lang ?? chatbotConfig.defaultLang,
  );
  const intent = detectIntent(text);
  const spec = REPLIES[intent];
  const offerLead = !!spec.offerLead;

  return {
    reply: spec.reply[lang],
    lang,
    packages: spec.packages,
    offerLead,
    leadHints: spec.leadHints
      ? { ...spec.leadHints, language: lang }
      : { language: lang },
    quickReplies: followUpQuickReplies(lang, offerLead),
  };
}
