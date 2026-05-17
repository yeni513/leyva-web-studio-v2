import { ArrowUpRight, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const cases = [
  {
    industry: "Restaurante",
    name: "Casa Olivar",
    result: "+38% reservas en 60 días",
    desc: "Menú digital cinematográfico, reservas por WhatsApp y SEO local para “restaurante en [ciudad]”.",
    accent: "from-ember-300/30 to-ember-400/10",
  },
  {
    industry: "Contratista",
    name: "Estructuras Vela",
    result: "12 cotizaciones / mes",
    desc: "Sitio que muestra obras, testimonios y un formulario de cotización rápida directo al celular del dueño.",
    accent: "from-ember-200/25 to-ember-500/10",
  },
  {
    industry: "Inmobiliaria",
    name: "Norte Realty",
    result: "x3 leads calificados",
    desc: "Listado de propiedades, filtros simples, fotos optimizadas y CTA a WhatsApp en cada ficha.",
    accent: "from-ember-300/30 to-ember-600/10",
  },
  {
    industry: "Barbería",
    name: "Don Felipe Barber",
    result: "Agenda llena 3 semanas",
    desc: "Diseño dark elegante, galería de cortes y botón de cita por WhatsApp visible en todo el sitio.",
    accent: "from-ember-200/30 to-ember-400/10",
  },
];

export function Portfolio() {
  return (
    <section id="trabajo" className="relative py-24 sm:py-32 bg-ink-950/40">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Casos de muestra"
            title={
              <>
                Ejemplos del nivel{" "}
                <span className="gradient-text">que entregamos.</span>
              </>
            }
            description="Conceptos basados en proyectos reales para negocios locales. Cada uno diseñado para una sola cosa: convertir."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06} as="article">
              <a
                href="#contact"
                className="group relative block h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-ember-300/30"
              >
                {/* Preview canvas */}
                <div className="relative aspect-[16/9] rounded-2xl border border-white/[0.06] overflow-hidden bg-ink-900">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${c.accent}`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_30%,rgba(236,139,42,0.25),transparent_60%)]" />
                  <div className="absolute inset-0 flex flex-col p-5">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                      <span className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                    <div className="mt-auto space-y-2">
                      <div className="h-3 w-2/3 rounded bg-gradient-to-r from-ember-100 to-ember-300" />
                      <div className="h-2 w-full rounded bg-white/15" />
                      <div className="h-2 w-5/6 rounded bg-white/10" />
                      <div className="flex gap-2 pt-2">
                        <div className="h-7 w-28 rounded-full bg-gradient-to-r from-ember-200 to-ember-400" />
                        <div className="h-7 w-20 rounded-full border border-white/20" />
                      </div>
                    </div>
                  </div>
                  {/* Hover sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                </div>

                <div className="mt-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-ember-300/80">
                      {c.industry}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-ember-50">
                      {c.name}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-ember-50/40 transition-all duration-300 group-hover:text-ember-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                <p className="mt-3 text-sm text-ember-50/70 leading-relaxed">
                  {c.desc}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ember-300/10 border border-ember-300/25 text-ember-300 text-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {c.result}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
