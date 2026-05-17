import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const testimonials = [
  {
    quote:
      "El sitio se ve como el de una marca grande. Empezamos a recibir cotizaciones serias en la primera semana.",
    name: "Mariana R.",
    role: "Dueña, restaurante en CDMX",
  },
  {
    quote:
      "Por fin un desarrollador que entiende mi negocio y no me llena de palabras técnicas. Quedó impecable en celular.",
    name: "Luis G.",
    role: "Contratista, Monterrey",
  },
  {
    quote:
      "Mi competencia se ve básica al lado de mi nuevo sitio. El proceso fue rápido y profesional de principio a fin.",
    name: "Andrea M.",
    role: "Inmobiliaria, Guadalajara",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Confianza"
            title={
              <>
                Lo que dicen los negocios que ya{" "}
                <span className="gradient-text">trabajan con nosotros.</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07} as="article">
              <figure className="relative h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 sm:p-7">
                <Quote className="w-6 h-6 text-ember-300/40" />
                <blockquote className="mt-4 text-[15px] sm:text-base leading-relaxed text-ember-50/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-ember-50">
                      {t.name}
                    </p>
                    <p className="text-xs text-ember-50/55">{t.role}</p>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-3.5 h-3.5 fill-ember-300 text-ember-300"
                      />
                    ))}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Trust strip */}
        <Reveal>
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {[
              { v: "40+", l: "Proyectos entregados" },
              { v: "14d", l: "Tiempo promedio" },
              { v: "98%", l: "Satisfacción" },
              { v: "5.0", l: "Calidad de entrega" },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-ink-950 p-6 text-center"
              >
                <p className="font-display text-3xl sm:text-4xl font-semibold gradient-text">
                  {s.v}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ember-50/55">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
