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
import { getBookingUrl, whatsappLink } from "@/lib/site";
import { prefillQuote } from "@/lib/prefill-quote";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CategoryId = "all" | "time" | "process" | "price" | "support";

interface Category {
  id: CategoryId;
  es: string;
  en: string;
}

interface FAQItem {
  id: string;
  cat: CategoryId;
  icon: LucideIcon;
  q: string;
  a: string;
}

interface RawFAQ {
  id: string;
  cat: CategoryId;
  icon: LucideIcon;
  es: { q: string; a: string };
  en: { q: string; a: string };
}

const categories: Category[] = [
  { id: "all", es: "Todos", en: "All" },
  { id: "time", es: "Tiempos", en: "Timing" },
  { id: "process", es: "Proceso", en: "Process" },
  { id: "price", es: "Precios", en: "Pricing" },
  { id: "support", es: "Soporte", en: "Support" },
];

const FAQS_RAW: RawFAQ[] = [
  {
    id: "tiempo",
    cat: "time",
    icon: Clock,
    es: { q: "¿Cuánto tarda en estar listo mi sitio?", a: "Entre 7 y 14 días para los paquetes Starter Local y Growth Pro. Authority Premium y proyectos a la medida pueden tomar de 3 a 6 semanas según alcance." },
    en: { q: "How long does it take to build my website?", a: "Between 7 and 14 days for the Starter Local and Growth Pro packages. Authority Premium and custom projects can take 3 to 6 weeks depending on scope." },
  },
  {
    id: "mensualidad",
    cat: "price",
    icon: RefreshCw,
    es: { q: "¿Por qué hay mensualidad?", a: "Porque un sitio serio necesita más que solo lanzarse. El plan mensual es de cuidado y crecimiento: actualizaciones, monitoreo, pequeños cambios, chequeos de performance, mejoras continuas y soporte cuando algo necesita atención. Tu web no se queda abandonada el día después del lanzamiento — se mantiene viva, rápida y lista para convertir." },
    en: { q: "Why is there a monthly fee?", a: "Because a serious site needs more than just launching. The monthly plan is care and growth: updates, monitoring, small edits, performance checks, ongoing improvements and support when something needs attention. Your site isn't abandoned the day after launch — it stays alive, fast and ready to convert." },
  },
  {
    id: "cancelar",
    cat: "price",
    icon: Globe,
    es: { q: "¿Puedo cancelar el plan mensual?", a: "Sí, según el plan acordado. No hay contratos eternos ni penalidades grandes por salir. El objetivo es mantener tu sitio sano y creciendo, no atraparte. Si decides pausar el plan, te explicamos qué cambia (hosting, soporte, etc.)." },
    en: { q: "Can I cancel the monthly plan?", a: "Yes, per the agreed plan. There are no endless contracts or large exit penalties. The goal is to keep your site healthy and growing, not to trap you. If you pause the plan, we explain what changes (hosting, support, etc.)." },
  },
  {
    id: "dominio",
    cat: "price",
    icon: KeyRound,
    es: { q: "¿El dominio es mío?", a: "Sí. El dominio se registra a tu nombre y queda bajo tu propiedad desde el día 1. Leyva Web Studio te ayuda a configurarlo y conectarlo, pero el dueño legal siempre eres tú. Si decides irte mañana, el dominio se va contigo." },
    en: { q: "Is the domain mine?", a: "Yes. The domain is registered in your name and is yours from day 1. Leyva Web Studio helps you set it up and connect it, but the legal owner is always you. If you decide to leave tomorrow, the domain goes with you." },
  },
  {
    id: "despues-publicar",
    cat: "support",
    icon: Sparkles,
    es: { q: "¿Qué pasa después de publicar mi sitio?", a: "Empezamos el plan mensual: cuidamos la salud técnica, hacemos pequeñas mejoras cada mes, actualizamos contenido cuando lo pidas, monitoreamos performance y respondemos cuando algo necesita atención. No es solo \"mantenimiento\" — es cuidado continuo y crecimiento." },
    en: { q: "What happens after my site launches?", a: "We start the monthly plan: we look after technical health, make small improvements each month, update content when you ask, monitor performance and respond when something needs attention. It's not just \"maintenance\" — it's ongoing care and growth." },
  },
  {
    id: "necesidades",
    cat: "process",
    icon: FileText,
    es: { q: "¿Qué necesitas de mi parte para empezar?", a: "Una llamada de 30 minutos, fotos de tu negocio (si las tienes), y acceso a tu dominio si ya cuentas con uno. El copy y la estructura los preparamos nosotros." },
    en: { q: "What do you need from me to start?", a: "A 30-minute call, photos of your business (if you have them), and access to your domain if you already have one. We prepare the copy and structure for you." },
  },
  {
    id: "editar",
    cat: "support",
    icon: Pencil,
    es: { q: "¿Yo puedo editar el sitio después?", a: "Para cambios mayores (nuevas secciones, restyling) el plan mensual los cubre. Para cambios menores frecuentes te enseñamos a hacerlos tú mismo si prefieres. La filosofía: tú te concentras en tu negocio, nosotros en mantener el sitio." },
    en: { q: "Can I edit the site myself later?", a: "Major changes (new sections, restyling) are covered by the monthly plan. For frequent minor edits we can teach you to do them yourself if you prefer. The philosophy: you focus on your business, we keep the site running." },
  },
  {
    id: "hosting",
    cat: "price",
    icon: Globe,
    es: { q: "¿Incluye hosting?", a: "Sí — el hosting y el deploy están incluidos en el plan mensual de cualquier paquete. Publicamos en infraestructura premium (Cloudflare) con cobertura global. Tu dominio sí lo registras a tu nombre y queda bajo tu propiedad." },
    en: { q: "Is hosting included?", a: "Yes — hosting and deployment are included in the monthly plan of any package. We publish on premium infrastructure (Cloudflare) with global coverage. Your domain is registered in your name and stays your property." },
  },
  {
    id: "ubicacion",
    cat: "process",
    icon: MapPin,
    es: { q: "¿Trabajan con negocios fuera de Ohio?", a: "Sí. Trabajamos con clientes en todo EE. UU. y LATAM de forma remota. Comunicación clara en español o inglés, según prefieras." },
    en: { q: "Do you work with businesses outside Ohio?", a: "Yes. We work with clients across the U.S. and Latin America remotely. Clear communication in English or Spanish, whichever you prefer." },
  },
  {
    id: "diseno",
    cat: "time",
    icon: Heart,
    es: { q: "¿Qué pasa si no me gusta el diseño?", a: "Trabajamos con rondas de revisión incluidas en cada paquete (1 en Starter, 2 en Growth Pro, 3 en Authority). No empezamos a programar hasta que apruebas el diseño visual — así nunca hay sorpresas al final." },
    en: { q: "What if I don't like the design?", a: "We work with revision rounds included in each package (1 in Starter, 2 in Growth Pro, 3 in Authority). We don't start building until you approve the visual design — so there are never surprises at the end." },
  },
  {
    id: "pagos",
    cat: "price",
    icon: CreditCard,
    es: { q: "¿Cómo se hacen los pagos?", a: "El pago inicial cubre la construcción del sitio (50% al iniciar para apartar fecha, 50% al entregar). El plan mensual se cobra a partir del lanzamiento. Aceptamos transferencia bancaria, Zelle, Wise o tarjeta. Todos los pagos en USD." },
    en: { q: "How do payments work?", a: "The setup fee covers building the site (50% to start and reserve your slot, 50% on delivery). The monthly plan is billed from launch. We accept bank transfer, Zelle, Wise or card. All payments in USD." },
  },
  {
    id: "cambio-paquete",
    cat: "support",
    icon: RefreshCw,
    es: { q: "¿Puedo cambiar de paquete después de empezar?", a: "Sí. Puedes subir de plan (de Starter a Growth Pro, por ejemplo) y solo pagas la diferencia del setup más la nueva mensualidad. Bajar de plan es posible después del primer ciclo mensual — lo conversamos y ajustamos." },
    en: { q: "Can I change package after starting?", a: "Yes. You can upgrade (from Starter to Growth Pro, for example) and only pay the setup difference plus the new monthly fee. Downgrading is possible after the first monthly cycle — we talk it through and adjust." },
  },
];

export function FAQ() {
  const { lang } = useLang();
  const en = lang === "en";
  const faqs: FAQItem[] = FAQS_RAW.map((f) => ({
    id: f.id,
    cat: f.cat,
    icon: f.icon,
    ...f[lang],
  }));
  const [filter, setFilter] = useState<CategoryId>("all");
  const [open, setOpen] = useState<string | null>(FAQS_RAW[0].id);

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
            eyebrow={en ? "Frequently asked" : "Preguntas frecuentes"}
            title={
              en ? (
                <>
                  What you probably want to know{" "}
                  <span className="gradient-text">before we start.</span>
                </>
              ) : (
                <>
                  Lo que probablemente quieres saber{" "}
                  <span className="gradient-text">antes de empezar.</span>
                </>
              )
            }
            description={
              en
                ? "Filter by category or click any question. If you can't find yours, we connect you directly below."
                : "Filtra por categoría o haz clic en cualquier pregunta. Si no encuentras la tuya, abajo te conectamos directo."
            }
          />
        </Reveal>

        {/* Category chips */}
        <Reveal>
          <div
            role="tablist"
            aria-label={
              en ? "Filter questions by category" : "Filtrar preguntas por categoría"
            }
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
                  {cat[lang]}
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
          <div className="mt-10 max-w-3xl mx-auto rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.04] to-ink-950/20 overflow-hidden shadow-[0_20px_60px_-40px_rgba(0,0,0,0.95)]">
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
          <NoQuestionFoundCard lang={lang} />
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
        isOpen && "bg-white/[0.025]",
      )}
    >
      {/* Left accent line — only shown when open */}
      <div
        className={cn(
          "absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-500 transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0",
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
              ? "border-ember-300/42 bg-ember-300/[0.08] text-ember-300"
              : "border-white/[0.09] bg-ink-950/35 text-ember-50/65",
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
              ? "rotate-45 border-ember-300/45 bg-ember-300/[0.10] text-ember-300"
              : "border-white/[0.09] text-ember-300/75",
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

function NoQuestionFoundCard({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const bookingUrl = getBookingUrl();
  return (
    <div className="mt-10 max-w-3xl mx-auto relative rounded-2xl border border-ember-300/20 bg-gradient-to-br from-white/[0.045] via-ember-300/[0.035] to-transparent p-6 sm:p-8 overflow-hidden shadow-[0_20px_60px_-42px_rgba(0,0,0,0.95)]">
      <div
        className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-ember-400/[0.08] blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-ember-600/[0.07] blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/40 to-transparent" />

      <div className="relative flex flex-col md:flex-row md:items-center gap-5 md:gap-7">
        <div className="grid place-items-center w-12 h-12 rounded-2xl border border-ember-300/28 bg-ink-950/45 text-ember-300 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg sm:text-xl font-semibold text-ember-50 tracking-tight">
            {en ? "Didn't find your question?" : "¿No encontraste tu pregunta?"}
          </h3>
          <p className="mt-1 text-sm text-ember-50/65 leading-relaxed">
            {en
              ? "We talk for 30 minutes, no commitment, and answer any specific question about your business."
              : "Hablamos 30 minutos sin compromiso y resolvemos cualquier duda específica de tu negocio."}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
          <a
            href={whatsappLink(
              en
                ? "Hi Leyva, I have a question before getting a quote for my site."
                : "Hola Leyva, tengo una pregunta antes de cotizar mi sitio.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-ember-300/35 bg-ember-300/[0.06] text-ember-50 text-sm hover:bg-ember-300/[0.14] hover:border-ember-300/55 transition-colors no-tap-highlight"
          >
            <MessageCircle className="w-4 h-4 text-ember-300" />
            WhatsApp
          </a>
          {bookingUrl ? (
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-ember-100 via-ember-300 to-ember-500 text-ink-950 text-sm font-semibold shadow-[0_14px_34px_-22px_rgba(236,139,42,0.95)] hover:shadow-[0_18px_42px_-22px_rgba(236,139,42,1)] transition-shadow no-tap-highlight"
            >
              {en ? "Book 15 min" : "Agendar 15 min"}
              <ArrowUpRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              type="button"
              onClick={() =>
                prefillQuote({
                  message: en
                    ? "I have a few questions before defining the project. Can we talk for 30 min?"
                    : "Tengo algunas preguntas antes de definir el proyecto. ¿Podemos hablar 30 min?",
                  fromLabel: en ? "FAQ — direct question" : "FAQ — pregunta directa",
                })
              }
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-b from-ember-100 via-ember-300 to-ember-500 text-ink-950 text-sm font-semibold shadow-[0_14px_34px_-22px_rgba(236,139,42,0.95)] hover:shadow-[0_18px_42px_-22px_rgba(236,139,42,1)] transition-shadow no-tap-highlight"
            >
              {en ? "Let's talk" : "Hablemos"}
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
