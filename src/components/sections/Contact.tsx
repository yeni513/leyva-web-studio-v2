"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Lock,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AnchorButton } from "@/components/ui/button";
import { site, whatsappLink, mailtoLink } from "@/lib/site";
import { onPrefillQuote } from "@/lib/prefill-quote";
import { cn } from "@/lib/utils";

// ─── Options (kept in sync with prefill-quote keys) ─────────────────
const projectTypes = [
  "Sitio nuevo",
  "Rediseño",
  "Landing para campaña",
  "Otro",
];

const industries = [
  "Restaurante",
  "Contratista / Constructor",
  "Inmobiliaria",
  "Barbería / Estética",
  "Servicio de limpieza",
  "Plomería / Electricidad",
  "Clínica / Dentista",
  "Gimnasio / Wellness",
  "Auto / Mecánica",
  "Tienda local",
  "Otro",
];

const budgetOptions = [
  "Starter Local — $900 + $99/mes",
  "Growth Pro — $1,800 + $149/mes",
  "Authority Premium — $3,500 + $299/mes",
  "A la medida",
];

const timelineOptions = [
  "Lo más pronto posible",
  "En 30 días",
  "En 60–90 días",
  "Solo estoy explorando",
];

const contentOptions = [
  "Sí, todo listo",
  "Tengo parte",
  "Aún no tengo nada",
  "Quiero que ustedes ayuden",
];

interface FormState {
  name: string;
  business: string;
  contact: string;
  type: string;
  industry: string;
  timeline: string;
  budget: string;
  hasContent: string;
  message: string;
}

const initialForm: FormState = {
  name: "",
  business: "",
  contact: "",
  type: projectTypes[0],
  industry: "",
  timeline: "",
  budget: budgetOptions[1],
  hasContent: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [prefilledFrom, setPrefilledFrom] = useState<string | null>(null);
  // Optional fields (project type, timeline, budget, has-content) live
  // behind a "Más detalles" disclosure so first-time visitors see 4
  // essential fields instead of 8. The form still composes the same
  // WhatsApp message; the defaults are sane.
  const [showMore, setShowMore] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  // ── Listen for prefill events from any CTA across the site ─────────
  useEffect(() => {
    const unsubscribe = onPrefillQuote((data) => {
      setForm((s) => ({
        ...s,
        ...(data.type && { type: data.type }),
        ...(data.industry && { industry: data.industry }),
        ...(data.timeline && { timeline: data.timeline }),
        ...(data.budget && { budget: data.budget }),
        ...(data.hasContent && { hasContent: data.hasContent }),
        ...(data.message && { message: data.message }),
      }));
      // If a CTA prefilled fields that live inside the "Más detalles"
      // disclosure, auto-expand it so the user can see what was set.
      if (data.timeline || data.hasContent || data.budget || data.type) {
        setShowMore(true);
      }
      if (data.fromLabel) {
        setPrefilledFrom(data.fromLabel);
      }
    });
    return unsubscribe;
  }, []);

  const composedMessage = useMemo(() => {
    return [
      `Hola, soy ${form.name || "(tu nombre)"}.`,
      form.business && `Mi negocio: ${form.business}.`,
      form.industry && `Industria: ${form.industry}.`,
      `Tipo de proyecto: ${form.type}.`,
      form.timeline && `Tiempo: ${form.timeline}.`,
      `Presupuesto estimado: ${form.budget}.`,
      form.hasContent && `Contenido listo: ${form.hasContent}.`,
      form.contact && `Contacto: ${form.contact}.`,
      prefilledFrom && `Vengo desde: ${prefilledFrom}.`,
      "",
      form.message ||
        "Me gustaría cotizar un sitio web a la medida para mi negocio.",
    ]
      .filter(Boolean)
      .join("\n");
  }, [form, prefilledFrom]);

  // Backup lead capture — POSTs the form to /api/contact which forwards
  // the data to email via Resend. Runs in parallel with the WhatsApp
  // anchor navigation so leads aren't lost if the user closes WhatsApp.
  const fireLeadCapture = () => {
    void fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, prefilledFrom }),
    }).catch(() => {});
  };

  // Click handler on the WhatsApp anchor — validates required fields
  // (anchors don't trigger HTML5 form validation) then fires the backup.
  const onWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const formEl = e.currentTarget.closest("form");
    if (formEl && !formEl.checkValidity()) {
      e.preventDefault();
      formEl.reportValidity();
      return;
    }
    fireLeadCapture();
  };

  // Fallback for Enter key inside the form — anchor handles clicks,
  // but pressing Enter still submits via the form. Open WhatsApp and
  // fire the backup the legacy way.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = whatsappLink(composedMessage);
    fireLeadCapture();
  };

  return (
    <section id="contact" className="relative py-10 sm:py-16">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Left: heading + reasons */}
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Hablemos"
              title={
                <>
                  Cuéntanos de tu negocio.{" "}
                  <span className="gradient-text">Te respondemos hoy.</span>
                </>
              }
              description="Sin formularios eternos. Llena lo básico y abrimos WhatsApp con tu información lista para que solo presiones enviar."
            />

            <ul className="mt-8 space-y-4">
              {[
                {
                  icon: Clock,
                  t: "Respuesta el mismo día",
                  d: "Lunes a viernes contestamos en menos de 4 horas.",
                },
                {
                  icon: ShieldCheck,
                  t: "Cero compromiso",
                  d: "La primera llamada es gratis y sin presión de venta.",
                },
                {
                  icon: Lock,
                  t: "Tu información es tuya",
                  d: "No compartimos tus datos. El sitio queda a tu nombre.",
                },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <li key={b.t} className="flex gap-4">
                    <span className="grid place-items-center w-10 h-10 rounded-xl border border-ember-300/25 bg-ember-300/[0.06] text-ember-300 shrink-0">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <p className="font-medium text-ember-50">{b.t}</p>
                      <p className="text-sm text-ember-50/65">{b.d}</p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4 text-sm">
              <a
                href={whatsappLink(
                  "Hola Leyva, me gustaría cotizar un sitio web a la medida para mi negocio.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ember-300 hover:text-ember-200"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp directo: {site.contact.whatsappDisplay}
              </a>
              <a
                href={mailtoLink(
                  "Cotización sitio web",
                  "Hola Leyva, me gustaría cotizar un sitio web para mi negocio.",
                )}
                className="inline-flex items-center gap-2 text-ember-300 hover:text-ember-200"
              >
                <Mail className="w-4 h-4" />
                {site.contact.email}
              </a>
            </div>
          </Reveal>

          {/* Right: form card */}
          <Reveal delay={0.05}>
            <form
              onSubmit={onSubmit}
              className="relative rounded-3xl border border-ember-300/20 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 shadow-glow-sm"
            >
              <div className="absolute -top-px inset-x-10 h-px bg-gradient-to-r from-transparent via-ember-300/40 to-transparent" />

              <p className="text-xs uppercase tracking-[0.22em] text-ember-300/85">
                Solicitar cotización
              </p>
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-ember-50">
                Cuéntanos en 60 segundos
              </h3>

              {/* Prefilled-from indicator pill */}
              <AnimatePresence>
                {prefilledFrom && (
                  <motion.div
                    key={prefilledFrom}
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 inline-flex items-center gap-2 pl-3 pr-1.5 py-1 rounded-full bg-ember-300/[0.10] border border-ember-300/40 text-[11px]"
                  >
                    <Sparkles className="w-3 h-3 text-ember-300" />
                    <span className="text-ember-50/85">
                      Pre-llenado desde:{" "}
                      <span className="font-semibold text-ember-300">
                        {prefilledFrom}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setPrefilledFrom(null)}
                      aria-label="Quitar indicador"
                      className="grid place-items-center w-5 h-5 rounded-full hover:bg-white/[0.10] text-ember-50/55 hover:text-ember-50 transition-colors no-tap-highlight"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Nombre">
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Tu nombre"
                    className={inputCls}
                  />
                </Field>
                <Field label="Negocio">
                  <input
                    type="text"
                    value={form.business}
                    onChange={(e) => update("business", e.target.value)}
                    placeholder="Nombre del negocio"
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="WhatsApp o correo">
                  <input
                    required
                    type="text"
                    value={form.contact}
                    onChange={(e) => update("contact", e.target.value)}
                    placeholder="Cómo te contactamos"
                    className={inputCls}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field
                  label="Industria"
                  highlight={!!form.industry && form.industry !== ""}
                >
                  <select
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    className={cn(
                      inputCls,
                      !!form.industry && fieldHighlightCls,
                    )}
                  >
                    <option value="">Selecciona tu industria</option>
                    {industries.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Cuéntanos qué quieres lograr">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Ej: quiero más reservas / clientes / cotizaciones por mi sitio."
                    className={cn(inputCls, "resize-none")}
                  />
                </Field>
              </div>

              {/* Optional disclosure — type / timeline / budget / content */}
              <div className="mt-5 border-t border-white/[0.06] pt-4">
                <button
                  type="button"
                  onClick={() => setShowMore((v) => !v)}
                  aria-expanded={showMore}
                  aria-controls="contact-more-details"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-ember-50/65 hover:text-ember-300 transition-colors no-tap-highlight"
                >
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-300",
                      showMore && "rotate-180",
                    )}
                  />
                  {showMore ? "Ocultar detalles" : "Más detalles (opcional)"}
                </button>

                <div
                  id="contact-more-details"
                  className={cn(
                    "grid transition-all duration-500 ease-out",
                    showMore
                      ? "grid-rows-[1fr] opacity-100 mt-4"
                      : "grid-rows-[0fr] opacity-0 mt-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Tipo de proyecto">
                        <select
                          value={form.type}
                          onChange={(e) => update("type", e.target.value)}
                          className={inputCls}
                        >
                          {projectTypes.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        label="¿Cuándo lo necesitas?"
                        highlight={!!form.timeline}
                      >
                        <select
                          value={form.timeline}
                          onChange={(e) => update("timeline", e.target.value)}
                          className={cn(
                            inputCls,
                            !!form.timeline && fieldHighlightCls,
                          )}
                        >
                          <option value="">Selecciona el tiempo</option>
                          {timelineOptions.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <div className="mt-4">
                      <Field label="Presupuesto estimado">
                        <select
                          value={form.budget}
                          onChange={(e) => update("budget", e.target.value)}
                          className={inputCls}
                        >
                          {budgetOptions.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <div className="mt-4">
                      <span className="text-[11px] uppercase tracking-[0.18em] text-ember-50/60 block">
                        ¿Tienes contenido listo? (textos, fotos)
                      </span>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {contentOptions.map((opt) => {
                          const active = form.hasContent === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                update("hasContent", active ? "" : opt)
                              }
                              className={cn(
                                "px-3 py-1.5 rounded-full text-xs border transition-all duration-200 no-tap-highlight",
                                active
                                  ? "border-ember-300/55 bg-ember-300/[0.14] text-ember-50 shadow-[0_0_14px_-4px_rgba(236,139,42,0.55)]"
                                  : "border-white/[0.08] bg-white/[0.02] text-ember-50/70 hover:border-ember-300/30 hover:bg-ember-300/[0.06] hover:text-ember-50",
                              )}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <AnchorButton
                  href={whatsappLink(composedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onWhatsAppClick}
                  size="lg"
                  className="w-full"
                >
                  Enviar por WhatsApp
                  <Send className="w-4 h-4" />
                </AnchorButton>
              </div>

              {/* Trust strip at the friction peak — real, signed commitments
                  (not fabricated proof) to reassure right at submit. */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-ember-50/60">
                <span>Respuesta el mismo día</span>
                <span className="w-1 h-1 rounded-full bg-ember-50/25" />
                <span>Sin compromiso</span>
                <span className="w-1 h-1 rounded-full bg-ember-50/25" />
                <span>Código a tu nombre</span>
              </div>

              <p className="mt-3 text-[11px] text-ember-50/45 leading-relaxed text-center">
                Abrimos WhatsApp con tu info lista — solo presionas enviar. Nos
                llega copia por email para no perder tu cotización.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full h-11 px-3.5 rounded-xl bg-ink-950/60 border border-white/[0.08] text-ember-50 placeholder:text-ember-50/35 focus:border-ember-300/50 focus:bg-ink-950 focus:outline-none transition-colors text-[15px]";

// Subtle ember tint applied to fields the prefill system has populated.
const fieldHighlightCls =
  "border-ember-300/40 bg-ember-300/[0.04] shadow-[0_0_18px_-6px_rgba(236,139,42,0.45)]";

function Field({
  label,
  children,
  highlight,
}: {
  label: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <label className="block">
      <span
        className={cn(
          "text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
          highlight ? "text-ember-300" : "text-ember-50/60",
        )}
      >
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
