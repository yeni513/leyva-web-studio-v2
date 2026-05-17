import {
  HardHat,
  UtensilsCrossed,
  Home,
  Scissors,
  Sparkles,
  Wrench,
  Refrigerator,
  Building2,
  Stethoscope,
  Dumbbell,
} from "lucide-react";

const industries = [
  { icon: HardHat, label: "Contratistas" },
  { icon: UtensilsCrossed, label: "Restaurantes" },
  { icon: Home, label: "Inmobiliarias" },
  { icon: Scissors, label: "Barberías y estéticas" },
  { icon: Sparkles, label: "Limpieza" },
  { icon: Refrigerator, label: "Tiendas de electrodomésticos" },
  { icon: Wrench, label: "Servicios a domicilio" },
  { icon: Building2, label: "Despachos" },
  { icon: Stethoscope, label: "Clínicas y dentistas" },
  { icon: Dumbbell, label: "Gimnasios" },
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
          Construido para negocios locales como el tuyo
        </p>
      </div>

      <div className="mt-8 relative mask-fade-x overflow-hidden">
        <ul
          className="flex gap-8 sm:gap-12 w-max animate-marquee will-change-transform"
          style={{ animationDuration: "45s" }}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <li
                key={`${item.label}-${i}`}
                className="flex items-center gap-3 text-ember-50/70 hover:text-ember-50 transition-colors"
              >
                <span className="grid place-items-center w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02]">
                  <Icon className="w-4 h-4 text-ember-300/80" />
                </span>
                <span className="text-sm sm:text-base whitespace-nowrap tracking-tight">
                  {item.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
