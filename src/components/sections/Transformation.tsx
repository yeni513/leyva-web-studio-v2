"use client";

import { Check, X, ArrowRight, Sparkles, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const basicIssues = [
  "Plantilla genérica que se ve igual a 1000 sitios",
  "Botones débiles, sin jerarquía ni llamada clara",
  "Cargas lentas y mala experiencia en celular",
  "Cero confianza: sin reseñas, sin pruebas",
  "Visitantes que se van sin contactarte",
];

const premiumWins = [
  "Diseño cinematográfico hecho a la medida",
  "CTAs fuertes en cada sección, sin dudas",
  "Carga rápida y experiencia perfecta en celular",
  "Reseñas, casos y elementos de confianza visibles",
  "Visitantes que terminan en WhatsApp o cotización",
];

export function Transformation() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="De básico a premium"
            title={
              <>
                Convertimos sitios <span className="text-ember-50/60">básicos</span>{" "}
                en presencias digitales{" "}
                <span className="gradient-text">premium.</span>
              </>
            }
            description="La mayoría de los negocios locales pierden clientes por tener un sitio que parece improvisado. Esto es lo que cambia cuando trabajamos contigo."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-stretch">
          {/* Before */}
          <Reveal>
            <div className="relative h-full rounded-3xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-8 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember-50/45">
                <span className="w-1.5 h-1.5 rounded-full bg-ember-50/30" />
                Antes
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-ember-50/85">
                Sitio web básico
              </h3>

              {/* Mock browser */}
              <div className="mt-6 rounded-xl border border-white/[0.05] bg-ink-900/60 overflow-hidden">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.05]">
                  <span className="w-2 h-2 rounded-full bg-white/15" />
                  <span className="w-2 h-2 rounded-full bg-white/15" />
                  <span className="w-2 h-2 rounded-full bg-white/15" />
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-3 w-2/3 rounded bg-white/[0.08]" />
                  <div className="h-2.5 w-full rounded bg-white/[0.05]" />
                  <div className="h-2.5 w-5/6 rounded bg-white/[0.05]" />
                  <div className="h-8 w-32 rounded bg-white/[0.06] mt-3" />
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="h-12 rounded bg-white/[0.04]" />
                    <div className="h-12 rounded bg-white/[0.04]" />
                    <div className="h-12 rounded bg-white/[0.04]" />
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5">
                {basicIssues.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm text-ember-50/65"
                  >
                    <X className="w-4 h-4 mt-0.5 shrink-0 text-ember-50/30" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Arrow */}
          <div className="hidden md:flex items-center justify-center">
            <div className="grid place-items-center w-12 h-12 rounded-full border border-ember-300/30 bg-ember-300/[0.06] text-ember-300 shadow-glow-sm">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          <div className="md:hidden flex justify-center">
            <div className="grid place-items-center w-10 h-10 rounded-full border border-ember-300/30 bg-ember-300/[0.06] text-ember-300 rotate-90">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* After */}
          <Reveal delay={0.1}>
            <div className="relative h-full rounded-3xl border border-ember-300/25 bg-gradient-to-b from-ember-300/[0.07] to-white/[0.015] p-6 sm:p-8 overflow-hidden shadow-glow">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/40 to-transparent" />
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember-300">
                <Sparkles className="w-3 h-3" />
                Después
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-ember-50">
                Sitio web premium Leyva
              </h3>

              {/* Mock premium browser */}
              <div className="mt-6 rounded-xl border border-ember-300/20 bg-gradient-to-b from-ink-900 to-ink-950 overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.05]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-ember-400/70" />
                    <span className="w-2 h-2 rounded-full bg-ember-300/60" />
                    <span className="w-2 h-2 rounded-full bg-ember-200/50" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-ember-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-2.5 h-2.5 fill-ember-300 text-ember-300" />
                    ))}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-3.5 w-3/4 rounded bg-gradient-to-r from-ember-200 to-ember-400" />
                  <div className="h-2.5 w-full rounded bg-white/[0.1]" />
                  <div className="h-2.5 w-5/6 rounded bg-white/[0.08]" />
                  <div className="flex gap-2 mt-3">
                    <div className="h-9 w-36 rounded-full bg-gradient-to-r from-ember-200 to-ember-400" />
                    <div className="h-9 w-28 rounded-full border border-ember-300/30" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="h-14 rounded-lg border border-ember-300/15 bg-white/[0.03]" />
                    <div className="h-14 rounded-lg border border-ember-300/15 bg-white/[0.03]" />
                    <div className="h-14 rounded-lg border border-ember-300/15 bg-white/[0.03]" />
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-2.5">
                {premiumWins.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-ember-50/85">
                    <span className="mt-0.5 grid place-items-center w-4 h-4 rounded-full bg-ember-300/15 text-ember-300 shrink-0">
                      <Check className="w-3 h-3" />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
