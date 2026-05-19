import { getCloudflareContext } from "@opennextjs/cloudflare";

// Always run dynamically — never prerender this route
export const dynamic = "force-dynamic";

interface ContactBody {
  name?: string;
  business?: string;
  contact?: string;
  industry?: string;
  type?: string;
  timeline?: string;
  budget?: string;
  hasContent?: string;
  message?: string;
  prefilledFrom?: string;
  /** Honeypot — humans never fill this. */
  website?: string;
}

/**
 * Contact form lead-capture endpoint.
 *
 * The Contact form opens WhatsApp as the primary user-facing flow.
 * In parallel it POSTs to /api/contact so we never lose a lead if
 * the user closes WhatsApp without sending.
 *
 * Reads RESEND_API_KEY as a Cloudflare Worker secret (set via
 * `wrangler secret put RESEND_API_KEY`).
 */
export async function POST(request: Request): Promise<Response> {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silently succeed for bots so they don't probe further
  if (body.website && body.website.length > 0) {
    return Response.json({ ok: true });
  }

  // Minimal validation. Name + contact are the only must-have fields
  if (!body.name || !body.contact) {
    return Response.json(
      { error: "Faltan datos obligatorios" },
      { status: 400 },
    );
  }

  // Length sanity (prevent abuse / huge payloads)
  if (
    body.name.length > 200 ||
    body.contact.length > 300 ||
    (body.message?.length ?? 0) > 5000
  ) {
    return Response.json({ error: "Payload demasiado grande" }, { status: 413 });
  }

  // Pull the secret from the Worker bindings
  const { env } = getCloudflareContext();
  const apiKey = (env as Record<string, string | undefined>).RESEND_API_KEY;

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    // Don't expose internal state to the client — still return 200 so the
    // form UX isn't blocked. The user's WhatsApp flow is the primary path.
    return Response.json({ ok: true, note: "no-backend" });
  }

  const subject = `Cotización ${body.name}${body.business ? ` — ${body.business}` : ""}${body.industry ? ` (${body.industry})` : ""}`;

  const text = composeText(body);
  const html = composeHtml(body);

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Leyva Cotizaciones <onboarding@resend.dev>",
        to: ["alexspark513@yahoo.com"],
        subject,
        text,
        html,
        // Replies bounce back to the prospect's email if it looks like an email
        reply_to: looksLikeEmail(body.contact)
          ? [body.contact]
          : ["alexspark513@yahoo.com"],
      }),
    });

    if (!resp.ok) {
      const errorText = await resp.text();
      console.error("[contact] Resend error:", resp.status, errorText);
      // Still return 200 to the client — WhatsApp is already open, UX continues.
      return Response.json({ ok: true, note: "backend-failed" });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] Network error:", err);
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

function composeText(b: ContactBody): string {
  return [
    `Nueva cotización desde leyvawebstudio.com`,
    `═══════════════════════════════════════════`,
    "",
    `Nombre:      ${b.name}`,
    b.business && `Negocio:     ${b.business}`,
    b.industry && `Industria:   ${b.industry}`,
    b.type && `Tipo:        ${b.type}`,
    b.timeline && `Tiempo:      ${b.timeline}`,
    b.budget && `Presupuesto: ${b.budget}`,
    b.hasContent && `Contenido:   ${b.hasContent}`,
    `Contacto:    ${b.contact}`,
    b.prefilledFrom && `Vino desde:  ${b.prefilledFrom}`,
    "",
    "─────────────────────────",
    b.message || "(sin mensaje adicional)",
  ]
    .filter(Boolean)
    .join("\n");
}

function composeHtml(b: ContactBody): string {
  const row = (label: string, value: string | undefined, highlight = false) =>
    value
      ? `<tr>
          <td style="padding:8px 10px;font-weight:600;color:#5a2c0a;width:140px;vertical-align:top;${highlight ? "background:#fff7e6;" : ""}">${escapeHtml(label)}</td>
          <td style="padding:8px 10px;${highlight ? "background:#fff7e6;font-weight:600;" : ""}">${escapeHtml(value)}</td>
        </tr>`
      : "";

  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Nueva cotización</title></head>
<body style="margin:0;padding:0;background:#f4ecdf;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1a1a1a;">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;">
    <div style="background:linear-gradient(135deg,#ec8b2a 0%,#a8500c 100%);padding:24px;color:#fff;">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.22em;opacity:0.85;">LEYVA · Web Studio</div>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:600;">Nueva cotización</h1>
      <p style="margin:4px 0 0;opacity:0.85;font-size:13px;">desde leyvawebstudio.com</p>
    </div>
    <div style="padding:24px;">
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.4;">
        ${row("Nombre", b.name)}
        ${row("Negocio", b.business)}
        ${row("Industria", b.industry)}
        ${row("Tipo de proyecto", b.type)}
        ${row("Cuándo lo necesita", b.timeline)}
        ${row("Presupuesto", b.budget)}
        ${row("Contenido listo", b.hasContent)}
        ${row("Contacto", b.contact, true)}
        ${row("Vino desde", b.prefilledFrom)}
      </table>
      ${
        b.message
          ? `<div style="margin-top:24px;padding:16px;background:#fafafa;border-left:3px solid #ec8b2a;border-radius:6px;">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:0.2em;color:#888;margin-bottom:8px;">Mensaje</div>
        <div style="white-space:pre-wrap;font-size:14px;line-height:1.5;">${escapeHtml(b.message)}</div>
      </div>`
          : ""
      }
      <p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#888;">
        Replicá directamente a este email para responderle al prospecto.<br>
        Recibido: ${new Date().toLocaleString("es-MX", { dateStyle: "medium", timeStyle: "short" })}
      </p>
    </div>
  </div>
</body></html>`;
}
