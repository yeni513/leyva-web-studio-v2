"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  CreditCard,
  FileText,
  Globe,
  Heart,
  KeyRound,
  MapPin,
  MessageCircle,
  Pencil,
  Plus,
  RefreshCw,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { whatsappLink } from "@/lib/site";
import { prefillQuote } from "@/lib/prefill-quote";
import { cn } from "@/lib/utils";

type CategoryId = "all" | "time" | "process" | "price" | "support";

interface Category {
  id: CategoryId;
  label: string;
}

interface FAQItem {
  id: string;
  cat: CategoryId;
  icon: LucideIcon;
  q: string;
  a: string;
}

const categories: Category[] = [
  { id: "all", label: "Todos" },
  { id: "time", label: "Tiempos" },
  { id: "process", label: "Proceso" },
  { id: "price", label: "Precios" },
  { id: "support", label: "Soporte" },
];

const faqs: FAQItem[] = [
  {
    id: "tiempo",
    cat: "time",
    icon: Clock,
    q: "¿Cuánto tarda en estar listo mi sitio?",
    a: "Entre 7 y 14 días para los paquetes Starter Local y Growth Pro. Authority Premium y proyectos a la medida pueden tomar de 3 a 6 semanas según alcance.",
  },
  {
    id: "mensualidad",
    cat: "price",
    icon: RefreshCw,
    q: "¿Por qué hay mensualidad?",
    a: "Porque un sitio serio necesita más que solo lanzarse. El plan mensual es de cuidado y crecimiento: actualizaciones, monitoreo, pequeños cambios, chequeos de performance, mejoras continuas y soporte cuando algo necesita atención. Tu web no se queda abandonada el día después del lanzamiento — se mantiene viva, rápida y lista para convertir.",
  },
  {
    id: "cancelar",
    cat: "price",
    icon: Globe,
    q: "¿Puedo cancelar el plan mensual?",
    a: "Sí, según el plan acordado. No hay contratos eternos ni penalidades grandes por salir. El objetivo es mantener tu sitio sano y creciendo, no atraparte. Si decides pausar el plan, te explicamos qué cambia (hosting, soporte, etc.).",
  },
  {
    id: "dominio",
    cat: "price",
    icon: KeyRound,
    q: "¿El dominio es mío?",
    a: "Sí. El dominio se registra a tu nombre y queda bajo tu propiedad desde el día 1. Leyva Web Studio te ayuda a configurarlo y conectarlo, pero el dueño legal siempre eres tú. Si decides irte mañana, el dominio se va contigo.",
  },
  {
    id: "despues-publicar",
    cat: "support",
    icon: Sparkles,
    q: "¿Qué pasa después de publicar mi sitio?",
    a: "Empezamos el plan mensual: cuidamos la salud técnica, hacemos pequeñas mejoras cada mes, actualizamos contenido cuando lo pidas, monitoreamos performance y respondemos cuando algo necesita atención. No es solo \"mantenimiento\" — es cuidado continuo y crecimiento.",
  },
  {
    id: "necesidades",
    cat: "process",
    icon: FileText,
    q: "¿Qué necesitas de mi parte para empezar?",
    a: "Una llamada de 30 minutos, fotos de tu negocio (si las tienes), y acceso a tu dominio si ya cuentas con uno. El copy y la estructura los preparamos nosotros.",
  },
  {
    id: "editar",
    cat: "support",
    icon: Pencil,
    q: "¿Yo puedo editar el sitio después?",
    a: "Para cambios mayores (nuevas secciones, restyling) el plan mensual los cubre. Para cambios menores frecuentes te enseñamos a hacerlos tú mismo si prefieres. La filosofía: tú te concentras en tu negocio, nosotros en mantener el sitio.",
  },
  {
    id: "hosting",
    cat: "price",
    icon: Globe,
    q: "¿Incluye hosting?",
    a: "Sí — el hosting y el deploy están incluidos en el plan mensual de cualquier paquete. Publicamos en infraestructura premium (Cloudflare) con cobertura global. Tu dominio sí lo registras a tu nombre y queda bajo tu propiedad.",
  },
  {
    id: "ubicacion",
    cat: "process",
    icon: MapPin,
    q: "¿Trabajan con negocios fuera de Ohio?",
    a: "Sí. Trabajamos con clientes en todo EE. UU. y LATAM de forma remota. Comunicación clara en español o inglés, según prefieras.",
  },
  {
    id: "diseno",
    cat: "time",
    icon: Heart,
    q: "¿Qué pasa si no me gusta el diseño?",
    a: "Trabajamos con rondas de revisión incluidas en cada paquete (1 en Starter, 2 en Growth Pro, 3 en Authority). No empezamos a programar hasta que apruebas el diseño visual — así nunca hay sorpresas al final.",
  },
  {
    id: "pagos",
    cat: "price",
    icon: CreditCard,
    q: "¿Cómo se hacen los pagos?",
    a: "El pago inicial cubre la construcción del sitio (50% al iniciar para apartar fecha, 50% al entregar). El plan mensual se cobra a partir del lanzamiento. Aceptamos transferencia bancaria, Zelle, Wise o tarjeta. Todos los pagos en USD.",
  },
  {
    id: "cambio-paquete",
    cat: "support",
    icon: RefreshCw,
    q: "¿Puedo cambiar de paquete después de empezar?",
    a: "Sí. Puedes subir de plan (de Starter a Growth Pro, por ejemplo) y solo pagas la diferencia del setup más la nueva mensualidad. Bajar de plan es posible después del primer ciclo mensual — lo conversamos y ajustamos.",
  },
];

export function FAQ() {
  const [filter, setFilter] = useState<CategoryId>("all");
  const [open, setOpen] = useState<string | null>(faqs[0].id);

  const filtered =
    filter === "all" ? faqs : faqs.filter((f) => f.cat === filter);

  const countFor = (id: CategoryId): number =>
    id === "all" ? faqs.length : faqs.filter((f) => f.cat === id).length;

  return (
    <section
      id="faq"
      className="relative py-10 sm:py-16 bg-ink-950/40 overflow-hidden"
    >
      {/* Ambient warm glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(236,139,42,0.08),transparent_70%)] pointer-events-none"
        aria-hidden
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title={
              <>
                Lo que probablemente quieres saber{" "}
                <span className="gradient-text">antes de empezar.</span>
              </>
            }
            description="Filtra por categoría o haz clic en cualquier pregunta. Si no encuentras la tuya, abajo te conectamos directo."
          />
        </Reveal>

        {/* Category chips */}
        <Reveal>
          <div
            role="tablist"
            aria-label="Filtrar preguntas por categoría"
            className="mt-10 flex flex-wrap gap-2 justify-center"
          >
            {categories.map((cat) => {
              const active = filter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-all duration-300 no-tap-highlight",
                    active
                      ? "border-ember-300/55 bg-ember-300/[0.14] text-ember-50 shadow-[0_0_18px_-4px_rgba(236,139,42,0.55)]"
                      : "border-white/[0.08] bg-white/[0.02] text-ember-50/70 hover:border-ember-300/30 hover:bg-ember-300/[0.06] hover:text-ember-50",
                  )}
                >
                  {cat.label}
                  <span
                    className={cn(
                      "inline-flex items-center justify-center min-w-[20px] h-[18px] px-1.5 rounded-full text-[10px] font-mono tabular-nums transition-colors duration-300",
                      active
                        ? "bg-ember-300/25 text-ember-100"
                        : "bg-white/[0.05] text-ember-50/55",
                    )}
                  >
                    {countFor(cat.id)}
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* FAQ list */}
        <Reveal>
          <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.01] overflow-hidden">
            <motion.div
              layout
              transition={{
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {filtered.map((faq) => (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <FaqRow
                      item={faq}
                      isOpen={open === faq.id}
                      onToggle={() =>
                        setOpen((cur) => (cur === faq.id ? null : faq.id))
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </Reveal>

        {/* Bottom: "still have questions" CTA card */}
        <Reveal>
          <NoQuestionFoundCard />
        </Reveal>
      </div>
    </section>
  );
}

function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  return (
    <div
      className={cn(
        "relative border-b border-white/[0.06] last:border-b-0 transition-colors duration-500",
        isOpen && "bg-ember-300/[0.025]",
      )}
    >
      {/* Left accent line — only shown when open */}
      <div
        className={cn(
          "absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-500 transition-opacity duration-500",
          isOpen ? "opacity-100 shadow-[0_0_12px_-1px_rgba(236,139,42,0.7)]" : "opacity-0",
        )}
        aria-hidden
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left px-5 sm:px-7 py-5 flex items-start gap-3 sm:gap-4 no-tap-highlight"
      >
        <span
          className={cn(
            "shrink-0 grid place-items-center w-9 h-9 rounded-xl border transition-all duration-300",
            isOpen
              ? "border-ember-300/55 bg-ember-300/[0.12] text-ember-300 shadow-[0_0_18px_-4px_rgba(236,139,42,0.55)]"
              : "border-white/[0.08] bg-white/[0.02] text-ember-50/65",
          )}
        >
          <Icon className="w-4 h-4" />
        </span>
        <span
          className={cn(
            "flex-1 text-base sm:text-lg font-medium pr-2 sm:pr-4 leading-snug transition-colors duration-300",
            isOpen ? "text-ember-50" : "text-ember-50/90",
          )}
        >
          {item.q}
        </span>
        <span
          className={cn(
            "shrink-0 grid place-items-center w-8 h-8 rounded-full border transition-all duration-300",
            isOpen
              ? "rotate-45 border-ember-300/55 bg-ember-300/[0.14] text-ember-300"
              : "border-white/[0.08] text-ember-300/75",
          )}
        >
          <Plus className="w-4 h-4" />
        </span>
      </button>

      <div
        className={cn(
          "grid transition-all duration-500 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-7 pb-6 ml-12 sm:ml-[52px] text-sm sm:text-base text-ember-50/70 leading-relaxed">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function NoQuestionFoundCard() {
  return (
    <div className="mt-10 max-w-3xl mx-auto relative rounded-2xl border border-ember-300/25 bg-gradient-to-br from-ember-300/[0.08] via-white/[0.015] to-transparent p-6 sm:p-8 overflow-hidden">
      <div
        className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-ember-400/15 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-ember-600/12 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/40 to-transparent" />

      <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-7">
        <div className="grid place-items-center w-12 h-12 rounded-2xl border border-ember-300/35 bg-ember-300/[0.10] text-ember-300 shrink-0 shadow-[0_0_24px_-4px_rgba(236,139,42,0.55)]">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-ember-50 tracking-tight">
            ¿No encontraste tu pregunta?
          </h3>
          <p className="mt-1 text-sm text-ember-50/65 leading-relaxed">
            Hablamos 30 minutos sin compromiso y resolvemos cualquier duda
            específica de tu negocio.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
          <a
            href={whatsappLink(
              "Hola Leyva, tengo una pregunta antes de cotizar mi sitio.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-ember-300/35 bg-ember-300/[0.06] text-ember-50 text-sm hover:bg-ember-300/[0.14] hover:border-ember-300/55 transition-colors no-tap-highlight"
          >
            <MessageCircle className="w-4 h-4 text-ember-300" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() =>
              prefillQuote({
                message:
                  "Tengo algunas preguntas antes de definir el proyecto. ¿Podemos hablar 30 min?",
                fromLabel: "FAQ — pregunta directa",
              })
            }
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 text-sm font-semibold shadow-[0_0_20px_-4px_rgba(236,139,42,0.55)] hover:shadow-[0_0_32px_-4px_rgba(236,139,42,0.80)] transition-shadow no-tap-highlight"
          >
            Hablemos
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
