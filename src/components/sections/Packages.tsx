"use client";

import {
  ArrowUpRight,
  Check,
  KeyRound,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { prefillQuote } from "@/lib/prefill-quote";
import { cn } from "@/lib/utils";

interface Package {
  id: string;
  name: string;
  tag: string;
  setupPrice: string;
  monthlyPrice: string;
  desc: string;
  bestFor: string;
  siteFeatures: string[];
  monthlyFeatures: string[];
  highlight: boolean;
  cta: string;
  prefillBudget: string;
  prefillMessage: string;
}

const packages: Package[] = [
  {
    id: "starter",
    name: "Starter Local",
    tag: "Lanzamiento ligero",
    setupPrice: "$900",
    monthlyPrice: "$99",
    desc: "Para negocios locales que necesitan una presencia online profesional y un canal directo de contacto.",
    bestFor:
      "Barberos, servicios de limpieza, plomeros, handymen, restaurantes pequeños y servicios independientes.",
    siteFeatures: [
      "Sitio premium de una página",
      "Diseño mobile-first responsivo",
      "CTA a WhatsApp, llamada y contacto",
      "Configuración de SEO local básico",
      "Conexión de tu dominio",
      "Performance base optimizado",
      "1 ronda de revisiones",
      "Soporte durante el lanzamiento",
    ],
    monthlyFeatures: [
      "Hosting y deploy gestionado",
      "Mantenimiento técnico",
      "Cambios menores de texto y fotos",
      "Monitoreo de uptime",
      "Chequeos básicos de seguridad",
      "Soporte por email y WhatsApp",
    ],
    highlight: false,
    cta: "Empezar con Starter",
    prefillBudget: "Starter Local — $900 + $99/mes",
    prefillMessage:
      "Me interesa Starter Local ($900 inicial + $99/mes). Quiero una landing premium con WhatsApp para mi negocio.",
  },
  {
    id: "growth",
    name: "Growth Pro",
    tag: "Recomendado",
    setupPrice: "$1,800",
    monthlyPrice: "$149",
    desc: "Para negocios que crecen y necesitan mostrar trabajo, generar confianza y convertir más visitantes en clientes.",
    bestFor:
      "Contratistas, inmobiliarias, restaurantes con marca, empresas de limpieza, electrodomésticos y servicios que necesitan confianza y conversión.",
    siteFeatures: [
      "Sitio premium con 4–6 secciones clave",
      "Copy estructurado para conversión",
      "Fundación de SEO local",
      "Formulario + flujo de WhatsApp",
      "Sección de servicios",
      "Portfolio o casos de muestra",
      "Animaciones premium",
      "Analytics configurado",
      "2 rondas de revisiones",
      "Soporte durante el lanzamiento",
    ],
    monthlyFeatures: [
      "Mantenimiento y actualizaciones",
      "Pequeñas mejoras cada mes",
      "Revisión de performance",
      "Actualizaciones de contenido (texto/foto)",
      "Soporte prioritario",
      "Revisión de salud SEO básica",
      "Reporte mensual simple",
      "Optimización continua de conversión",
    ],
    highlight: true,
    cta: "Quiero Growth Pro",
    prefillBudget: "Growth Pro — $1,800 + $149/mes",
    prefillMessage:
      "Me interesa Growth Pro ($1,800 inicial + $149/mes). Quiero un sitio multipágina enfocado en conversión.",
  },
  {
    id: "authority",
    name: "Authority Premium",
    tag: "Marca con peso",
    setupPrice: "$3,500",
    monthlyPrice: "$299",
    desc: "Para negocios establecidos que quieren una presencia digital fuerte y un sistema de conversión serio que domine su mercado.",
    bestFor:
      "Contratistas establecidos, inmobiliarias serias, clínicas, restaurantes con marca y empresas que quieren verse premium y dominar la confianza local.",
    siteFeatures: [
      "Experiencia web custom premium",
      "Secciones y páginas avanzadas",
      "Estrategia de conversión más fuerte",
      "Portfolio y casos detallados",
      "Animaciones e interacciones avanzadas",
      "Estructura de contenido SEO",
      "Analytics + event tracking",
      "Secciones de confianza y prueba social",
      "3 rondas de revisiones",
      "Soporte durante el lanzamiento",
    ],
    monthlyFeatures: [
      "Mantenimiento premium",
      "Mejoras mensuales de diseño y contenido",
      "Soporte de crecimiento SEO",
      "Optimización de conversión",
      "Soporte prioritario",
      "Monitoreo de performance",
      "Bloques y secciones nuevas cuando se necesiten",
      "Revisión estratégica",
    ],
    highlight: false,
    cta: "Aplicar a Authority",
    prefillBudget: "Authority Premium — $3,500 + $299/mes",
    prefillMessage:
      "Me interesa Authority Premium ($3,500 inicial + $299/mes). Quiero un sistema de marca premium con estrategia de conversión.",
  },
];

const trustBullets = [
  "Pago inicial + mensualidad clara",
  "Sin costos escondidos",
  "Soporte y mejoras después del lanzamiento",
  "Tu negocio no se queda con una web abandonada",
  "Dominio siempre a nombre del cliente",
];

export function Packages() {
  return (
    <section id="paquetes" className="relative py-16 sm:py-24">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Paquetes y plan mensual"
            title={
              <>
                Pago inicial para construir.{" "}
                <span className="gradient-text">
                  Mensualidad para cuidar.
                </span>
              </>
            }
            description="Todos los proyectos incluyen un plan mensual activo para mantener tu sitio rápido, actualizado, seguro y listo para convertir. No entregamos una web para dejarla abandonada — la mantenemos viva."
          />
        </Reveal>

        {/* Compact intro banner */}
        <Reveal>
          <div className="mx-auto mt-8 sm:mt-10 max-w-3xl rounded-2xl border border-ember-300/25 bg-gradient-to-r from-ember-300/[0.06] via-white/[0.02] to-ember-300/[0.06] px-5 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
            <span className="grid place-items-center w-9 h-9 rounded-xl border border-ember-300/35 bg-ember-300/[0.10] text-ember-300 shrink-0">
              <Wallet className="w-4 h-4" />
            </span>
            <p className="text-sm text-ember-50/85 leading-relaxed">
              <span className="font-semibold text-ember-50">
                Pago inicial para construir.
              </span>{" "}
              <span className="font-semibold text-ember-50">
                Mensualidad para cuidar, mejorar y mantener.
              </span>{" "}
              <span className="text-ember-50/65">
                Sin contratos eternos. Cancelación simple según el plan
                acordado.
              </span>
            </p>
          </div>
        </Reveal>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.07} as="article">
              <PackageCard pkg={p} />
            </Reveal>
          ))}
        </div>

        {/* Trust bullets row */}
        <Reveal>
          <div className="mt-10 max-w-5xl mx-auto rounded-2xl border border-ember-300/25 bg-gradient-to-r from-ember-300/[0.04] via-white/[0.02] to-ember-300/[0.04] p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {trustBullets.map((b) => (
                <div key={b} className="flex gap-2.5 items-start">
                  <span className="mt-0.5 grid place-items-center w-5 h-5 rounded-full bg-ember-300/15 text-ember-300 shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <p className="text-xs sm:text-[13px] text-ember-50/85 leading-snug">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Ownership note */}
        <Reveal>
          <div className="mt-6 max-w-4xl mx-auto flex flex-col sm:flex-row gap-3 items-start text-[13px] text-ember-50/70 leading-relaxed">
            <span className="grid place-items-center w-7 h-7 rounded-lg border border-ember-300/30 bg-ember-300/[0.06] text-ember-300 shrink-0">
              <KeyRound className="w-3.5 h-3.5" />
            </span>
            <p>
              <span className="text-ember-50 font-medium">
                Tu negocio, tu dominio, tu código.
              </span>{" "}
              El dominio queda registrado a tu nombre y, según los términos del
              proyecto, los archivos finales del sitio quedan bajo tu
              propiedad. Nosotros gestionamos la parte técnica para que vos te
              dediques a tu negocio — sin lock-in, sin licencias raras.
            </p>
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

// ─────────────────────────────────────────────────
// Single package card
// ─────────────────────────────────────────────────
function PackageCard({ pkg: p }: { pkg: Package }) {
  return (
    <div
      className={cn(
        "relative h-full rounded-3xl p-7 sm:p-8 flex flex-col overflow-hidden transition-all duration-500",
        p.highlight
          ? "border border-ember-300/40 bg-gradient-to-b from-ember-300/[0.10] to-white/[0.015] shadow-glow lg:scale-[1.02]"
          : "border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] hover:border-ember-300/25",
      )}
    >
      {p.highlight && (
        <>
          {/* Top accent line */}
          <div className="absolute -top-px inset-x-10 h-px bg-gradient-to-r from-transparent via-ember-300 to-transparent" />
          {/* Ambient glow */}
          <div className="absolute -inset-x-10 -top-32 h-64 bg-ember-300/10 blur-3xl pointer-events-none" />
          {/* "Recomendado" ribbon */}
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center gap-1.5 pl-2 pr-3 py-1 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 text-[10px] uppercase tracking-[0.18em] font-semibold shadow-[0_0_20px_-4px_rgba(236,139,42,0.7)]">
              <Sparkles className="w-3 h-3" />
              {p.tag}
            </span>
          </div>
        </>
      )}

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3">
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-ember-50">
          {p.name}
        </h3>
        {!p.highlight && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] bg-white/[0.04] text-ember-50/55 border border-white/[0.08] shrink-0 whitespace-nowrap">
            {p.tag}
          </span>
        )}
      </div>

      <p className="relative mt-3 text-sm text-ember-50/70 leading-relaxed">
        {p.desc}
      </p>

      {/* Price block */}
      <div
        className={cn(
          "relative mt-6 rounded-2xl border p-4 sm:p-5 grid grid-cols-2",
          p.highlight
            ? "border-ember-300/35 bg-ink-950/40"
            : "border-white/[0.08] bg-ink-950/40",
        )}
      >
        <div className="pr-3 sm:pr-4 border-r border-white/[0.06]">
          <p className="text-[10px] uppercase tracking-[0.18em] text-ember-50/55 font-medium">
            Pago inicial
          </p>
          <p className="mt-1.5 font-display text-[1.7rem] sm:text-[2rem] font-semibold text-ember-50 tracking-tight leading-none tabular-nums">
            {p.setupPrice}
          </p>
          <p className="mt-1.5 text-[11px] text-ember-50/55">
            USD — única vez
          </p>
        </div>
        <div className="pl-3 sm:pl-4">
          <p className="text-[10px] uppercase tracking-[0.18em] text-ember-300/85 font-medium">
            Plan mensual
          </p>
          <p className="mt-1.5 font-display text-[1.7rem] sm:text-[2rem] font-semibold text-ember-50 tracking-tight leading-none tabular-nums">
            {p.monthlyPrice}
            <span className="text-sm sm:text-base text-ember-50/55 ml-1">
              / mes
            </span>
          </p>
          <p className="mt-1.5 text-[11px] text-ember-50/55">
            Cuidado y crecimiento
          </p>
        </div>
      </div>

      {/* Best for */}
      <p className="relative mt-5 text-xs sm:text-[13px] text-ember-50/65 leading-relaxed">
        <span className="text-ember-50/90 font-medium">Ideal para: </span>
        {p.bestFor}
      </p>

      {/* Site features */}
      <div className="relative mt-6">
        <p className="text-[10px] uppercase tracking-[0.20em] text-ember-300/85 font-semibold">
          El sitio incluye
        </p>
        <ul className="mt-3 space-y-2">
          {p.siteFeatures.map((f) => (
            <FeatureLi key={f} highlight={p.highlight}>
              {f}
            </FeatureLi>
          ))}
        </ul>
      </div>

      {/* Monthly features */}
      <div className="relative mt-6">
        <p className="text-[10px] uppercase tracking-[0.20em] text-ember-300/85 font-semibold flex items-center gap-2">
          <ShieldCheck className="w-3 h-3" />
          Plan mensual incluye
        </p>
        <ul className="mt-3 space-y-2">
          {p.monthlyFeatures.map((f) => (
            <FeatureLi key={f} highlight={p.highlight}>
              {f}
            </FeatureLi>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="relative mt-8 flex-1 flex flex-col justify-end">
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
  );
}

function FeatureLi({
  children,
  highlight,
}: {
  children: React.ReactNode;
  highlight: boolean;
}) {
  return (
    <li className="flex gap-2.5 text-[13.5px] sm:text-sm text-ember-50/85 leading-snug">
      <span
        className={cn(
          "mt-0.5 grid place-items-center w-4 h-4 rounded-full shrink-0",
          highlight
            ? "bg-ember-300/20 text-ember-300"
            : "bg-white/[0.06] text-ember-50/70",
        )}
      >
        <Check className="w-3 h-3" />
      </span>
      <span>{children}</span>
    </li>
  );
}
