import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { LeadData } from "@/lib/chatbot/chatbot-types";
import { sanitizeLead, validateLead } from "@/lib/chatbot/lead-schema";

// Always run dynamically — never prerender this route.
export const dynamic = "force-dynamic";

interface LeadBody extends Partial<LeadData> {
  /** Honeypot — humans never fill this. */
  website?: string;
}

/**
 * Chatbot lead-capture endpoint.
 *
 * Today: validates the lead, and — if RESEND_API_KEY is configured as a
 * Cloudflare Worker secret — emails it to Alexander (same transport the
 * contact form uses). With no key it logs and still returns success so
 * the widget UX never breaks.
 *
 * Later: branch here to also write to Supabase / Google Sheets / a CRM.
 * The validated `lead` object below is the single record to forward.
 */
export async function POST(request: Request): Promise<Response> {
  let body: LeadBody;
  try {
    body = (await request.json()) as LeadBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently succeed for bots.
  if (body.website && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  const lead = sanitizeLead({
    name: body.name ?? "",
    business: body.business ?? "",
    phone: body.phone ?? "",
    email: body.email ?? "",
    businessType: body.businessType ?? "",
    service: body.service ?? "",
    budget: body.budget ?? "",
    timeline: body.timeline ?? "",
    notes: body.notes ?? "",
    language: body.language === "en" ? "en" : "es",
  });

  const { ok, errors } = validateLead(lead);
  if (!ok) {
    return Response.json({ error: "Validation failed", errors }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const apiKey = (env as Record<string, string | undefined>).RESEND_API_KEY;

  // No mail transport configured — log and succeed. The lead is not lost
  // from the user's POV; in dev this shows in the worker console.
  if (!apiKey) {
    console.log("[leads] (no RESEND_API_KEY) lead captured:", lead);
    return Response.json({ ok: true, note: "no-backend" });
  }

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Leyva AI <cotizaciones@leyvawebstudio.com>",
        to: ["alexspark513@yahoo.com"],
        subject: `Lead chatbot — ${lead.name}${lead.business ? ` (${lead.business})` : ""}`,
        text: composeText(lead),
        html: composeHtml(lead),
        reply_to: looksLikeEmail(lead.email)
          ? [lead.email]
          : ["alexspark513@yahoo.com"],
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("[leads] Resend error:", resp.status, errorText);
      return Response.json({ ok: true, note: "backend-failed" });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[leads] Network error:", err);
    return Response.json({ ok: true, note: "network-failed" });
  }
}

// ─── Helpers ────────────────────────────────────────

function looksLikeEmail(s: string): boolean {
  return /^\S+@\S+\.\S+$/.test(s.trim());
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function composeText(b: LeadData): string {
  return [
    "Nuevo lead desde el chatbot de leyvawebstudio.com",
    "═══════════════════════════════════════════",
    "",
    `Nombre:      ${b.name}`,
    b.business && `Negocio:     ${b.business}`,
    b.businessType && `Tipo:        ${b.businessType}`,
    b.service && `Servicio:    ${b.service}`,
    b.budget && `Presupuesto: ${b.budget}`,
    b.timeline && `Tiempo:      ${b.timeline}`,
    b.phone && `Teléfono:    ${b.phone}`,
    b.email && `Correo:      ${b.email}`,
    `Idioma:      ${b.language === "en" ? "Inglés" : "Español"}`,
    "",
    "─────────────────────────",
    b.notes || "(sin descripción adicional)",
  ]
    .filter(Boolean)
    .join("\n");
}

function composeHtml(b: LeadData): string {
  const row = (label: string, value: string | undefined, highlight = false) =>
    value
      ? `<tr>
          <td style="padding:8px 10px;font-weight:600;color:#5a2c0a;width:150px;vertical-align:top;${highlight ? "background:#fff7e6;" : ""}">${escapeHtml(label)}</td>
          <td style="padding:8px 10px;${highlight ? "background:#fff7e6;font-weight:600;" : ""}">${escapeHtml(value)}</td>
        </tr>`
      : "";

  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Nuevo lead</title></head>
<body style="margin:0;padding:0;background:#f4ecdf;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:linear-gradient(135deg,#ec8b2a 0%,#a8500c 100%);padding:24px;color:#fff;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.22em;opacity:0.85;">LEYVA · AI Assistant</div>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;">Nuevo lead del chatbot</h1>
      <p style="margin:4px 0 0;opacity:0.85;font-size:13px;">desde leyvawebstudio.com</p>
    </div>
    <div style="padding:24px;">
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.4;">
        ${row("Nombre", b.name)}
        ${row("Negocio", b.business)}
        ${row("Tipo de negocio", b.businessType)}
        ${row("Servicio", b.service)}
        ${row("Presupuesto", b.budget)}
        ${row("Tiempo", b.timeline)}
        ${row("Teléfono", b.phone, true)}
        ${row("Correo", b.email, true)}
        ${row("Idioma", b.language === "en" ? "Inglés" : "Español")}
      </table>
      ${
        b.notes
          ? `<div style="margin-top:24px;padding:16px;background:#fafafa;border-left:3px solid #ec8b2a;border-radius:6px;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#888;margin-bottom:8px;">Descripción</div>
        <div style="white-space:pre-wrap;font-size:14px;line-height:1.5;">${escapeHtml(b.notes)}</div>
      </div>`
          : ""
      }
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#888;">
        Lead generado por el asistente AI. Responde directo a este correo para contactar al prospecto.<br>
        Recibido: ${new Date().toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" })}
      </p>
    </div>
  </div>
</body></html>`;
}
