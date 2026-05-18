"use client";

import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { prefillQuote } from "@/lib/prefill-quote";
import { cn } from "@/lib/utils";

interface Package {
  name: string;
  price: string;
  priceSuffix: string;
  tag: string;
  desc: string;
  features: string[];
  highlight: boolean;
  cta: string;
  /** Budget bucket sent to the form when this package CTA is clicked. */
  prefillBudget: string;
  /** Message body that lands in the form's textarea. */
  prefillMessage: string;
}

const packages: Package[] = [
  {
    name: "Esencial",
    price: "$1,500",
    priceSuffix: "USD",
    tag: "Lanzamiento rápido",
    desc: "Para negocios que necesitan presencia online profesional y un canal directo de contacto.",
    features: [
      "Sitio de una página hecho a la medida",
      "Diseño a la medida (no plantilla)",
      "WhatsApp y formulario de contacto",
      "Optimización móvil y SEO básico",
      "Entrega en 7 días",
    ],
    highlight: false,
    cta: "Empezar con Esencial",
    prefillBudget: "Menos de $1,500 USD",
    prefillMessage:
      "Me interesa el paquete Esencial ($1,500 USD). Quiero un sitio a la medida de una página para mi negocio.",
  },
  {
    name: "Crecimiento",
    price: "$3,500",
    priceSuffix: "USD",
    tag: "Más popular",
    desc: "Para negocios que quieren ganar autoridad, mostrar trabajo y convertir más visitantes.",
    features: [
      "Sitio multipágina (hasta 6 secciones)",
      "Catálogo, galería o reservas básicas",
      "Copy persuasivo en español",
      "SEO local y Google Maps",
      "Animaciones y micro-interacciones",
      "Entrega en 14 días",
    ],
    highlight: true,
    cta: "Empezar con Crecimiento",
    prefillBudget: "$1,500 – $3,500 USD",
    prefillMessage:
      "Me interesa el paquete Crecimiento ($3,500 USD). Quiero un sitio multipágina con catálogo/galería/reservas.",
  },
  {
    name: "Autoridad",
    price: "Desde $6,500",
    priceSuffix: "USD",
    tag: "Negocio establecido",
    desc: "Para marcas que ya facturan y quieren un sitio que les abra puertas y precios más altos.",
    features: [
      "Sitio completo (8+ secciones)",
      "Sistema de marca cinematográfico",
      "Casos de éxito y testimonios",
      "Integraciones (CRM, pagos, blog)",
      "Soporte prioritario 60 días",
      "Estrategia de conversión incluida",
    ],
    highlight: false,
    cta: "Hablar de Autoridad",
    prefillBudget: "$3,500 – $7,000 USD",
    prefillMessage:
      "Me interesa el paquete Autoridad (desde $6,500 USD). Quiero un sistema de marca completo con integraciones y estrategia de conversión.",
  },
];

export function Packages() {
  return (
    <section id="paquetes" className="relative py-16 sm:py-24">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Paquetes"
            title={
              <>
                Precio claro.{" "}
                <span className="gradient-text">Sin sorpresas.</span>
              </>
            }
            description="Elige el paquete que mejor encaja con tu negocio hoy. Si necesitas algo a la medida, también lo cotizamos."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {packages.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07} as="article">
              <div
                className={cn(
                  "relative h-full rounded-3xl p-7 sm:p-8 flex flex-col overflow-hidden transition-all duration-500",
                  p.highlight
                    ? "border border-ember-300/40 bg-gradient-to-b from-ember-300/[0.10] to-white/[0.015] shadow-glow"
                    : "border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] hover:border-ember-300/25",
                )}
              >
                {p.highlight && (
                  <>
                    <div className="absolute -top-px inset-x-10 h-px bg-gradient-to-r from-transparent via-ember-300 to-transparent" />
                    <div className="absolute -inset-x-10 -top-32 h-64 bg-ember-300/10 blur-3xl pointer-events-none" />
                  </>
                )}

                <div className="relative flex items-center justify-between">
                  <h3 className="text-xl font-semibold tracking-tight text-ember-50">
                    {p.name}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em]",
                      p.highlight
                        ? "bg-ember-300/15 text-ember-300 border border-ember-300/30"
                        : "bg-white/[0.04] text-ember-50/55 border border-white/[0.08]",
                    )}
                  >
                    {p.highlight && <Sparkles className="w-3 h-3" />}
                    {p.tag}
                  </span>
                </div>

                <p className="relative mt-3 text-sm text-ember-50/70 leading-relaxed">
                  {p.desc}
                </p>

                <div className="relative mt-6 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-display font-semibold text-ember-50 tracking-tight">
                    {p.price}
                  </span>
                  <span className="text-xs text-ember-50/50 tracking-[0.15em]">
                    {p.priceSuffix}
                  </span>
                </div>

                <ul className="relative mt-7 space-y-2.5 flex-1">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex gap-3 text-sm text-ember-50/85"
                    >
                      <span
                        className={cn(
                          "mt-0.5 grid place-items-center w-4 h-4 rounded-full shrink-0",
                          p.highlight
                            ? "bg-ember-300/20 text-ember-300"
                            : "bg-white/[0.06] text-ember-50/70",
                        )}
                      >
                        <Check className="w-3 h-3" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-8">
                  <Button
                    type="button"
                    onClick={() =>
                      prefillQuote({
                        type: "Sitio nuevo",
                        budget: p.prefillBudget,
                        message: p.prefillMessage,
                        fromLabel: `Paquete ${p.name}`,
                      })
                    }
                    size="lg"
                    variant={p.highlight ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {p.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Guarantee strip — risk reversal */}
        <Reveal>
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl border border-ember-300/25 bg-gradient-to-r from-ember-300/[0.04] via-white/[0.02] to-ember-300/[0.04] p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: "Apruebas antes de programar",
                  desc: "No tocamos código hasta que firmas el diseño visual.",
                },
                {
                  title: "50 / 50 en pagos",
                  desc: "La mitad al iniciar, la mitad al entregar. Sin sorpresas.",
                },
                {
                  title: "Código y dominio a tu nombre",
                  desc: "Tú eres dueño del sitio desde el día 1. Sin lock-in.",
                },
              ].map((g) => (
                <div key={g.title} className="flex gap-3">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-ember-300/15 text-ember-300 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ember-50">
                      {g.title}
                    </p>
                    <p className="mt-0.5 text-xs text-ember-50/65 leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 text-center text-sm text-ember-50/55">
            ¿Necesitas algo distinto? Cotizamos proyectos a la medida —{" "}
            <a
              href="#contact"
              className="text-ember-300 hover:text-ember-200 underline-offset-4 hover:underline"
            >
              cuéntanos tu caso
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
