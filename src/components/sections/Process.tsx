import { Compass, PenTool, Code2, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    n: "01",
    icon: Compass,
    title: "Descubrimiento",
    desc: "Hablamos 30 minutos sobre tu negocio, tu cliente ideal y lo que quieres lograr con tu sitio.",
    time: "Día 1",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Diseño",
    desc: "Propuesta visual cinematográfica, estructura clara y copy persuasivo en español listo para aprobar.",
    time: "Días 2–5",
  },
  {
    n: "03",
    icon: Code2,
    title: "Desarrollo",
    desc: "Construimos tu sitio en Next.js, optimizado para velocidad, móvil y SEO. Lo revisas en vivo.",
    time: "Días 6–12",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Lanzamiento",
    desc: "Publicamos, conectamos dominio, instalamos analítica y te enseñamos a editar lo básico.",
    time: "Día 13–14",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative py-24 sm:py-32 bg-ink-950/40">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title={
              <>
                De la primera llamada a tu sitio en vivo{" "}
                <span className="gradient-text">en 14 días.</span>
              </>
            }
            description="Un proceso claro, sin sorpresas y sin perder semanas. Tú apruebas, nosotros entregamos."
          />
        </Reveal>

        <div className="mt-14 relative">
          {/* Connecting line - desktop only */}
          <div
            className="hidden lg:block absolute left-0 right-0 top-[68px] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, rgba(236,139,42,0.35) 15%, rgba(236,139,42,0.35) 85%, transparent 100%)",
            }}
          />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.n} delay={i * 0.06} as="li">
                  <div className="relative h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 sm:p-7 hover:border-ember-300/30 transition-colors duration-500">
                    <div className="flex items-start justify-between">
                      <span className="inline-grid place-items-center w-12 h-12 rounded-full border border-ember-300/25 bg-ink-950 text-ember-300 relative z-10">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span className="text-xs font-mono text-ember-50/40 tracking-widest">
                        {s.n}
                      </span>
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-ember-50">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ember-50/70">
                      {s.desc}
                    </p>
                    <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-ember-300/80">
                      {s.time}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
