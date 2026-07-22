import type { LeadData } from "./chatbot-types";

export type LeadField = keyof LeadData;

export interface LeadValidation {
  ok: boolean;
  errors: Partial<Record<LeadField, string>>;
}

function looksLikeEmail(s: string): boolean {
  return /^\S+@\S+\.\S+$/.test(s.trim());
}

/**
 * Minimal lead validation shared by the form and the API route.
 * Required: a name + at least one contact channel (phone OR email).
 * Everything else is optional context that improves the quote.
 */
export function validateLead(data: Partial<LeadData>): LeadValidation {
  const errors: Partial<Record<LeadField, string>> = {};
  const lang = data.language === "en" ? "en" : "es";

  const required = lang === "en" ? "Required" : "Requerido";
  const contactMsg =
    lang === "en"
      ? "Add a phone or email"
      : "Agrega un teléfono o correo";
  const emailMsg =
    lang === "en" ? "Enter a valid email" : "Ingresa un correo válido";

  if (!data.name || !data.name.trim()) {
    errors.name = required;
  }

  const hasPhone = !!data.phone && data.phone.trim().length >= 6;
  const hasEmail = !!data.email && looksLikeEmail(data.email);

  if (!hasPhone && !hasEmail) {
    // Require at least one channel — highlight both so either satisfies it.
    errors.phone = contactMsg;
    errors.email = contactMsg;
  } else if (data.email && data.email.trim() && !looksLikeEmail(data.email)) {
    errors.email = emailMsg;
  }

  return { ok: Object.keys(errors).length === 0, errors };
}

/** Trim + cap field lengths before sending to the API (anti-abuse). */
export function sanitizeLead(data: LeadData): LeadData {
  const cap = (s: string, n: number) => (s ?? "").toString().slice(0, n);
  return {
    name: cap(data.name, 120),
    business: cap(data.business, 160),
    phone: cap(data.phone, 40),
    email: cap(data.email, 160),
    businessType: cap(data.businessType, 120),
    service: cap(data.service, 160),
    budget: cap(data.budget, 80),
    timeline: cap(data.timeline, 80),
    notes: cap(data.notes, 4000),
    language: data.language === "en" ? "en" : "es",
  };
}
