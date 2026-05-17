"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "¿Cuánto tarda en estar listo mi sitio?",
    a: "Entre 7 y 14 días para los paquetes Esencial y Crecimiento. Proyectos a la medida pueden tomar de 3 a 6 semanas según alcance.",
  },
  {
    q: "¿Qué necesitas de mi parte para empezar?",
    a: "Una llamada de 30 minutos, fotos de tu negocio (si las tienes), y acceso a tu dominio si ya cuentas con uno. El copy y la estructura los preparamos nosotros.",
  },
  {
    q: "¿Yo puedo editar el sitio después?",
    a: "Sí. Te entregamos un sitio fácil de actualizar y te enseñamos a cambiar textos, fotos y precios. También ofrecemos planes mensuales si prefieres que nosotros lo mantengamos.",
  },
  {
    q: "¿Incluye hosting y dominio?",
    a: "El sitio se publica en infraestructura premium (Vercel). El primer año puede incluirse según paquete. El dominio se compra a tu nombre — tú siempre eres dueño.",
  },
  {
    q: "¿Trabajan con negocios fuera de México?",
    a: "Sí. Trabajamos con clientes en LATAM y EE. UU. de forma remota. Comunicación clara en español o inglés.",
  },
  {
    q: "¿Qué pasa si no me gusta el diseño?",
    a: "Trabajamos con rondas de revisión incluidas. No empezamos a programar hasta que apruebas el diseño visual.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-ink-950/40">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title={
              <>
                Lo que probablemente quieres saber{" "}
                <span className="gradient-text">antes de empezar.</span>
              </>
            }
          />
        </Reveal>

        <div className="mt-12 max-w-3xl mx-auto divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.01]">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.03}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left px-5 sm:px-7 py-5 flex items-start gap-4 no-tap-highlight"
                >
                  <span className="flex-1 text-base sm:text-lg font-medium text-ember-50 pr-4">
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "shrink-0 grid place-items-center w-8 h-8 rounded-full border border-white/[0.08] text-ember-300 transition-transform duration-300",
                      isOpen && "rotate-45 border-ember-300/40 bg-ember-300/10",
                    )}
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 sm:px-7 pb-6 text-sm sm:text-base text-ember-50/70 leading-relaxed">
                      {f.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
