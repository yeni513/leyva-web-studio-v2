import type { Lang, QuickReply } from "./chatbot-types";

export const chatbotConfig = {
  /** The site is Spanish-first (es-US); the assistant switches to EN the
   *  moment the visitor writes in English. */
  defaultLang: "es" as Lang,
  brand: "Leyva AI",
  poweredBy: "Powered by Leyva Web Studio",
  /** Simulated "thinking" delay for the mock assistant (ms). */
  typing: { min: 480, max: 1050 },
};

/** Every visitor-facing string, per language. */
export interface ChatCopy {
  headerTitle: string;
  headerStatus: string;
  openLabel: string;
  placeholder: string;
  sendAria: string;
  closeAria: string;
  minimizeAria: string;
  disclaimer: string;
  opening: string;
  recommendCta: string;
  // Lead capture
  leadOpenCta: string;
  leadTitle: string;
  leadSubtitle: string;
  leadIntro: string;
  leadQuestion: string;
  leadSubmit: string;
  leadBack: string;
  leadSending: string;
  leadSuccessTitle: string;
  leadSuccess: string;
  leadError: string;
  whatsappContinue: string;
  done: string;
  requiredHint: string;
  optional: string;
  fields: {
    name: string;
    business: string;
    phone: string;
    email: string;
    businessType: string;
    service: string;
    budget: string;
    timeline: string;
    notes: string;
  };
}

const COPY: Record<Lang, ChatCopy> = {
  en: {
    headerTitle: "Leyva AI",
    headerStatus: "Online • AI Sales Assistant",
    openLabel: "Need a website?",
    placeholder: "Tell me about your business...",
    sendAria: "Send message",
    closeAria: "Close chat",
    minimizeAria: "Minimize chat",
    disclaimer:
      "This assistant provides general information. Final pricing and project details are confirmed by Alexander.",
    opening:
      "Hi 👋 I'm the Leyva Web Studio AI assistant. I can help you choose the right website, online store, SEO, or growth package for your business. What kind of business do you have?",
    recommendCta: "Request a quote",
    leadOpenCta: "Request a consultation",
    leadTitle: "Start your project",
    leadSubtitle: "A few details so Alexander can prepare your quote.",
    leadIntro: "Here's what I have so far:",
    leadQuestion: "Want Alexander to review this and contact you?",
    leadSubmit: "Send to Alexander",
    leadBack: "Back to chat",
    leadSending: "Sending…",
    leadSuccessTitle: "Request prepared",
    leadSuccess:
      "Perfect — your request is ready. Alexander will review your project details and contact you soon.",
    leadError:
      "Something went wrong sending your request. You can try again or reach us on WhatsApp.",
    whatsappContinue: "Continue on WhatsApp",
    done: "Done",
    requiredHint: "Name and a phone or email are required.",
    optional: "optional",
    fields: {
      name: "Full name",
      business: "Business name",
      phone: "Phone",
      email: "Email",
      businessType: "Business type",
      service: "Service needed",
      budget: "Budget range",
      timeline: "Timeline",
      notes: "Project description",
    },
  },
  es: {
    headerTitle: "Leyva AI",
    headerStatus: "En línea • Asistente de ventas",
    openLabel: "¿Necesitas una web?",
    placeholder: "Cuéntame sobre tu negocio...",
    sendAria: "Enviar mensaje",
    closeAria: "Cerrar chat",
    minimizeAria: "Minimizar chat",
    disclaimer:
      "Este asistente ofrece información general. Alexander confirma el precio final y los detalles del proyecto.",
    opening:
      "Hola 👋 Soy el asistente de Leyva Web Studio. Puedo ayudarte a elegir la página web, tienda online, SEO o paquete de crecimiento ideal para tu negocio. ¿Qué tipo de negocio tienes?",
    recommendCta: "Pedir cotización",
    leadOpenCta: "Solicitar consulta",
    leadTitle: "Empieza tu proyecto",
    leadSubtitle: "Unos datos para que Alexander prepare tu cotización.",
    leadIntro: "Esto es lo que tengo hasta ahora:",
    leadQuestion: "¿Quieres que Alexander revise esto y te contacte?",
    leadSubmit: "Enviar a Alexander",
    leadBack: "Volver al chat",
    leadSending: "Enviando…",
    leadSuccessTitle: "Solicitud preparada",
    leadSuccess:
      "Perfecto — tu solicitud quedó preparada. Alexander revisará los detalles de tu proyecto y te contactará pronto.",
    leadError:
      "Hubo un problema al enviar tu solicitud. Puedes intentar de nuevo o escribirnos por WhatsApp.",
    whatsappContinue: "Continuar en WhatsApp",
    done: "Listo",
    requiredHint: "El nombre y un teléfono o correo son obligatorios.",
    optional: "opcional",
    fields: {
      name: "Nombre completo",
      business: "Nombre del negocio",
      phone: "Teléfono",
      email: "Correo",
      businessType: "Tipo de negocio",
      service: "Servicio que necesitas",
      budget: "Presupuesto aproximado",
      timeline: "Tiempo / plazo",
      notes: "Descripción del proyecto",
    },
  },
};

export function t(lang: Lang): ChatCopy {
  return COPY[lang];
}

export const INITIAL_QUICK_REPLIES: Record<Lang, QuickReply[]> = {
  en: [
    { id: "qr-web", label: "I need a website", value: "I need a website" },
    {
      id: "qr-store",
      label: "I need an online store",
      value: "I need an online store",
    },
    { id: "qr-seo", label: "I need SEO", value: "I need SEO" },
    {
      id: "qr-ads",
      label: "I need Google Ads",
      value: "I need Google Ads",
    },
    {
      id: "qr-maint",
      label: "I need maintenance",
      value: "I need maintenance",
    },
    { id: "qr-quote", label: "I want a quote", value: "I want a quote" },
  ],
  es: [
    {
      id: "qr-web",
      label: "Necesito una página web",
      value: "Necesito una página web",
    },
    {
      id: "qr-store",
      label: "Necesito una tienda online",
      value: "Necesito una tienda online",
    },
    { id: "qr-seo", label: "Necesito SEO", value: "Necesito SEO" },
    {
      id: "qr-ads",
      label: "Necesito Google Ads",
      value: "Necesito Google Ads",
    },
    {
      id: "qr-maint",
      label: "Necesito mantenimiento",
      value: "Necesito mantenimiento",
    },
    {
      id: "qr-quote",
      label: "Quiero una cotización",
      value: "Quiero una cotización",
    },
  ],
};
