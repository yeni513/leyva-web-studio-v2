import { Check, ArrowUpRight, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { AnchorButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const packages = [
  {
    name: "Esencial",
    price: "$1,500",
    priceSuffix: "USD",
    tag: "Lanzamiento rápido",
    desc: "Para negocios que necesitan presencia online profesional y un canal directo de contacto.",
    features: [
      "Sitio de una página premium",
      "Diseño a la medida (no plantilla)",
      "WhatsApp y formulario de contacto",
      "Optimización móvil y SEO básico",
      "Entrega en 7 días",
    ],
    highlight: false,
    cta: "Empezar con Esencial",
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
      "Soporte premium 60 días",
      "Estrategia de conversión incluida",
    ],
    highlight: false,
    cta: "Hablar de Autoridad",
  },
];

export function Packages() {
  return (
    <section id="paquetes" className="relative py-24 sm:py-32">
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
                  <AnchorButton
                    href="#contact"
                    size="lg"
                    variant={p.highlight ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {p.cta}
                    <ArrowUpRight className="w-4 h-4" />
                  </AnchorButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center text-sm text-ember-50/55">
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
