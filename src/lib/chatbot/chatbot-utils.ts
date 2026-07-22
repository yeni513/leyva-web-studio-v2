import type { Lang } from "./chatbot-types";

/** Stable unique id for messages. Falls back when crypto is unavailable. */
export function createId(prefix = "msg"): string {
  try {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return `${prefix}-${crypto.randomUUID()}`;
    }
  } catch {
    /* ignore */
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Format a timestamp for the subtle time label under a bubble. */
export function formatTime(ts: number, lang: Lang): string {
  try {
    return new Date(ts).toLocaleTimeString(lang === "es" ? "es-MX" : "en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

const ES_TOKENS = [
  "hola",
  "necesito",
  "quiero",
  "pagina",
  "página",
  "tienda",
  "precio",
  "cotizacion",
  "cotización",
  "mantenimiento",
  "restaurante",
  "negocio",
  "ayuda",
  "cuanto",
  "cuánto",
  "como",
  "cómo",
  "gracias",
  "diseño",
  "paquete",
  "español",
  "sitio",
  "anuncios",
  "publicidad",
  "redes",
];

const EN_TOKENS = [
  "hello",
  "hi",
  "i need",
  "i want",
  "website",
  "web site",
  "store",
  "shop",
  "price",
  "pricing",
  "quote",
  "maintenance",
  "restaurant",
  "business",
  "help",
  "how much",
  "thanks",
  "thank you",
  "design",
  "package",
  "english",
  "ads",
  "marketing",
];

/**
 * Lightweight language detector. Scores Spanish vs English signal tokens
 * (plus accent / ñ presence) and returns the winner; ties fall back to
 * `fallback`. Good enough for routing the assistant's reply language —
 * a real LLM would handle this natively later.
 */
export function detectLanguage(text: string, fallback: Lang = "es"): Lang {
  const t = text.toLowerCase();
  if (!t.trim()) return fallback;

  let es = 0;
  let en = 0;
  for (const tok of ES_TOKENS) if (t.includes(tok)) es += 1;
  for (const tok of EN_TOKENS) if (t.includes(tok)) en += 1;
  // Accented characters / ñ are a strong Spanish signal.
  if (/[ñáéíóú¿¡]/.test(t)) es += 2;

  if (es > en) return "es";
  if (en > es) return "en";
  return fallback;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/** Random integer in [min, max] — used for the mock typing delay. */
export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
