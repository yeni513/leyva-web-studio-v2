"use client";

import {
  Building2,
  Dumbbell,
  HardHat,
  Home,
  Refrigerator,
  Scissors,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { prefillQuote } from "@/lib/prefill-quote";

interface Industry {
  icon: LucideIcon;
  label: string;
  /** Maps to the contact form's industry dropdown options. */
  industry: string;
}

const industries: Industry[] = [
  { icon: HardHat, label: "Contratistas", industry: "Contratista / Constructor" },
  { icon: UtensilsCrossed, label: "Restaurantes", industry: "Restaurante" },
  { icon: Home, label: "Inmobiliarias", industry: "Inmobiliaria" },
  { icon: Scissors, label: "Barberías y estéticas", industry: "Barbería / Estética" },
  { icon: Sparkles, label: "Limpieza", industry: "Servicio de limpieza" },
  { icon: Refrigerator, label: "Tiendas de electrodomésticos", industry: "Tienda local" },
  { icon: Wrench, label: "Servicios a domicilio", industry: "Plomería / Electricidad" },
  { icon: Building2, label: "Despachos", industry: "Otro" },
  { icon: Stethoscope, label: "Clínicas y dentistas", industry: "Clínica / Dentista" },
  { icon: Dumbbell, label: "Gimnasios", industry: "Gimnasio / Wellness" },
];

export function IndustryMarquee() {
  // Duplicate the list so the CSS marquee loops seamlessly.
  const items = [...industries, ...industries];

  return (
    <section
      aria-label="Industrias que servimos"
      className="relative py-14 sm:py-16 border-y border-white/[0.06] bg-ink-950/40"
    >
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-ember-50/55">
          Construido para negocios locales como el tuyo · toca tu industria
        </p>
      </div>

      <div className="mt-8 relative mask-fade-x overflow-hidden">
        <ul
          className="flex gap-3 sm:gap-4 w-max animate-marquee will-change-transform"
          style={{ animationDuration: "55s" }}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li key={`${item.label}-${i}`}>
                <button
                  type="button"
                  onClick={() =>
                    prefillQuote({
                      type: "Sitio nuevo",
                      industry: item.industry,
                      message: `Tengo un negocio del rubro "${item.label}" y quiero un sitio hecho a la medida.`,
                      fromLabel: item.label,
                    })
                  }
                  aria-label={`Cotizar sitio para ${item.label}`}
                  className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.015] text-ember-50/75 transition-all duration-300 hover:border-ember-300/40 hover:bg-ember-300/[0.08] hover:text-ember-50 hover:shadow-[0_0_18px_-4px_rgba(236,139,42,0.45)] no-tap-highlight"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.02] group-hover:border-ember-300/40 group-hover:bg-ember-300/[0.08] transition-colors">
                    <Icon className="w-4 h-4 text-ember-300/80 group-hover:text-ember-200 transition-colors" />
                  </span>
                  <span className="text-sm sm:text-base whitespace-nowrap tracking-tight font-medium">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
