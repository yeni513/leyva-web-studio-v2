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
import { useLang } from "@/lib/i18n";

interface Industry {
  icon: LucideIcon;
  es: string;
  en: string;
  /** Maps to the contact form's industry dropdown options (canonical). */
  industry: string;
}

const industries: Industry[] = [
  { icon: HardHat, es: "Contratistas", en: "Contractors", industry: "Contratista / Constructor" },
  { icon: UtensilsCrossed, es: "Restaurantes", en: "Restaurants", industry: "Restaurante" },
  { icon: Home, es: "Inmobiliarias", en: "Real estate", industry: "Inmobiliaria" },
  { icon: Scissors, es: "Barberías y estéticas", en: "Barbers & salons", industry: "Barbería / Estética" },
  { icon: Sparkles, es: "Limpieza", en: "Cleaning", industry: "Servicio de limpieza" },
  { icon: Refrigerator, es: "Tiendas de electrodomésticos", en: "Appliance stores", industry: "Tienda local" },
  { icon: Wrench, es: "Servicios a domicilio", en: "Home services", industry: "Plomería / Electricidad" },
  { icon: Building2, es: "Despachos", en: "Offices & firms", industry: "Otro" },
  { icon: Stethoscope, es: "Clínicas y dentistas", en: "Clinics & dentists", industry: "Clínica / Dentista" },
  { icon: Dumbbell, es: "Gimnasios", en: "Gyms", industry: "Gimnasio / Wellness" },
];

export function IndustryMarquee() {
  const { lang } = useLang();
  const heading =
    lang === "en"
      ? "Built for local businesses like yours · tap your industry"
      : "Construido para negocios locales como el tuyo · toca tu industria";
  // Duplicate the list so the CSS marquee loops seamlessly.
  const items = [...industries, ...industries];

  return (
    <section
      aria-label={lang === "en" ? "Industries we serve" : "Industrias que servimos"}
      className="relative py-8 sm:py-12 border-y border-white/[0.06] bg-ink-950/40"
    >
      <div className="container">
        <p className="text-center text-xs uppercase tracking-[0.22em] text-ember-50/55">
          {heading}
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
              <li key={`${item.en}-${i}`}>
                <button
                  type="button"
                  onClick={() =>
                    prefillQuote({
                      type: "Sitio nuevo",
                      industry: item.industry,
                      message:
                        lang === "en"
                          ? `I run a "${item.en}" business and I'd like a custom website.`
                          : `Tengo un negocio del rubro "${item.es}" y quiero un sitio hecho a la medida.`,
                      fromLabel: item[lang],
                    })
                  }
                  aria-label={
                    lang === "en"
                      ? `Get a quote for ${item.en}`
                      : `Cotizar sitio para ${item.es}`
                  }
                  className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.015] text-ember-50/75 transition-all duration-300 hover:border-ember-300/40 hover:bg-ember-300/[0.08] hover:text-ember-50 hover:shadow-[0_0_18px_-4px_rgba(236,139,42,0.45)] no-tap-highlight"
                >
                  <span className="grid place-items-center w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.02] group-hover:border-ember-300/40 group-hover:bg-ember-300/[0.08] transition-colors">
                    <Icon className="w-4 h-4 text-ember-300/80 group-hover:text-ember-200 transition-colors" />
                  </span>
                  <span className="text-sm sm:text-base whitespace-nowrap tracking-tight font-medium">
                    {item[lang]}
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
