"use client";

import { useMemo, useState } from "react";
import {
  Send,
  MessageCircle,
  Mail,
  ShieldCheck,
  Clock,
  Lock,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { site, whatsappLink, mailtoLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const budgetOptions = [
  "Menos de $10K MXN",
  "$10K – $20K MXN",
  "$20K – $40K MXN",
  "$40K+ MXN",
];

const projectTypes = [
  "Sitio nuevo",
  "Rediseño",
  "Landing para campaña",
  "Otro",
];

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    business: "",
    contact: "",
    type: projectTypes[0],
    budget: budgetOptions[1],
    message: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const composedMessage = useMemo(() => {
    return [
      `Hola, soy ${form.name || "(tu nombre)"}.`,
      form.business && `Mi negocio: ${form.business}.`,
      `Tipo de proyecto: ${form.type}.`,
      `Presupuesto estimado: ${form.budget}.`,
      form.contact && `Contacto: ${form.contact}.`,
      "",
      form.message ||
        "Me gustaría cotizar un sitio web premium para mi negocio.",
    ]
      .filter(Boolean)
      .join("\n");
  }, [form]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappLink(composedMessage), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
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
                  "Hola Leyva, me gustaría cotizar un sitio web premium para mi negocio.",
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
                Cuéntanos en 30 segundos
              </h3>

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

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <Field label="Cuéntanos más (opcional)">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="¿Qué quieres lograr con tu sitio?"
                    className={cn(inputCls, "resize-none")}
                  />
                </Field>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button type="submit" size="lg" className="w-full sm:flex-1">
                  Enviar por WhatsApp
                  <Send className="w-4 h-4" />
                </Button>
                <a
                  href={mailtoLink("Cotización sitio web", composedMessage)}
                  className="inline-flex h-12 px-5 items-center justify-center rounded-full border border-ember-300/25 bg-ember-300/[0.04] text-ember-50 text-[15px] hover:bg-ember-300/[0.10] transition-colors"
                >
                  Enviar por correo
                </a>
              </div>

              <p className="mt-4 text-[11px] text-ember-50/45 leading-relaxed">
                Al enviar, abrimos WhatsApp o tu app de correo con la
                información lista. No guardamos nada en un servidor.
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.18em] text-ember-50/60">
        {label}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
