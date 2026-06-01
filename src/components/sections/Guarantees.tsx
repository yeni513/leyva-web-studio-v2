"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  cubicBezier,
  motion,
} from "framer-motion";
import {
  BadgeCheck,
  CreditCard,
  Heart,
  KeyRound,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Timer,
  Unlock,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import { cn } from "@/lib/utils";

interface Guarantee {
  id: string;
  icon: LucideIcon;
  title: string;
  category: string;
  promise: string;
  detail: string;
  /** Palette seed (0-4) — deterministic warm gradient per seal. */
  palette: number;
}

const guarantees: Guarantee[] = [
  {
    id: "refund",
    icon: ShieldCheck,
    title: "Cancelación pre-desarrollo",
    category: "Tu inversión protegida",
    promise:
      "Si después de la primera propuesta visual y las revisiones incluidas no encontramos una dirección aprobada, puedes cancelar antes de iniciar desarrollo según los términos del contrato.",
    detail:
      "Trabajamos primero el diseño visual y aplicamos las rondas de revisión incluidas en tu paquete. Si al cierre de esas revisiones no llegamos a una dirección que apruebes, tienes la opción de cancelar antes de que comencemos desarrollo. El reembolso o ajuste del anticipo se rige por los términos del contrato firmado al inicio del proyecto.",
    palette: 0,
  },
  {
    id: "ownership",
    icon: KeyRound,
    title: "Tú dueño del código",
    category: "Sin candados",
    promise:
      "Al completar el proyecto, el código del sitio queda bajo tu propiedad según los términos del contrato.",
    detail:
      "Te damos acceso al repositorio (GitHub) a tu nombre cuando el proyecto se entrega. Nada queda atado a nosotros: ni el dominio, ni el hosting, ni las cuentas. Si decides irte, no negociamos rescates ni amenazamos con bajar el sitio.",
    palette: 1,
  },
  {
    id: "fixed-price",
    icon: CreditCard,
    title: "Precio fijo del alcance",
    category: "Sin sorpresas",
    promise:
      "Cotización fija para el alcance aprobado al firmar. Si el trabajo toma más tiempo del estimado dentro del alcance, no se aplica un costo adicional al cliente.",
    detail:
      "El precio que ves en la propuesta es el que firmas y el que pagas, siempre que el alcance no cambie. Si nuestra estimación resulta corta, asumimos la diferencia internamente. Si decides ampliar el alcance, te enviamos una cotización aparte y tú decides si avanzas.",
    palette: 2,
  },
  {
    id: "delivery",
    icon: Zap,
    title: "Entrega en 14 días",
    category: "Tiempo garantizado",
    promise:
      "Si por causas nuestras nos atrasamos, aplicamos un crédito o descuento acordado por escrito según el alcance aprobado.",
    detail:
      "El cronograma de 14 días aplica al alcance aprobado al firmar y asume que recibimos tus materiales (textos, fotos, accesos) dentro de los plazos acordados. Si por causas nuestras nos atrasamos, aplicamos un crédito o descuento acordado por escrito según el alcance aprobado. Si hay cambios de alcance o demoras del cliente, ajustamos la fecha de común acuerdo.",
    palette: 3,
  },
  {
    id: "response",
    icon: Timer,
    title: "Respuesta en 4 horas",
    category: "Comunicación real",
    promise:
      "De lunes a viernes en horario laboral contestamos en menos de 4 horas hábiles. Si tardamos, te avisamos por qué.",
    detail:
      "Cada mensaje tuyo se contesta el mismo día hábil. Nada de \"te respondo cuando pueda\" ni desaparecer una semana. Si en algún momento se nos pasan las 4 horas hábiles, te avisamos por mensaje o por teléfono para explicar la razón.",
    palette: 4,
  },
  {
    id: "revisions",
    icon: RefreshCw,
    title: "Rondas de revisión incluidas",
    category: "Tu opinión cuenta",
    promise:
      "Rondas de revisión incluidas según paquete (1 en Starter, 2 en Growth Pro, 3 en Authority). Sin letra chica.",
    detail:
      "Después de entregar la propuesta visual, tienes las rondas que tu paquete incluye para pedir cambios — tipografía, colores, estructura, copy, secciones. Si necesitas más rondas que las incluidas, las cotizamos aparte de forma transparente.",
    palette: 0,
  },
  {
    id: "no-lock-in",
    icon: Unlock,
    title: "Sin contratos eternos",
    category: "Sin amarres",
    promise:
      "Plan mensual con cancelación simple según el plan acordado. Sin multas de salida ni \"plazo mínimo\" oculto.",
    detail:
      "Después del lanzamiento, el plan mensual de cuidado y crecimiento se puede cancelar por email según los términos acordados al iniciar. Cero penalidades sorpresa. Si en algún momento decides pausarlo, te explicamos qué deja de cubrirse (hosting gestionado, soporte, mejoras) y procedemos sin discusión.",
    palette: 1,
  },
  {
    id: "payment",
    icon: BadgeCheck,
    title: "Pago 50/50",
    category: "Pago justo",
    promise:
      "Anticipo del 50% al firmar, 50% al entregar el sitio en producción. No pagas todo a ciegas.",
    detail:
      "Nunca pagas el total por adelantado. El primer 50% cubre el inicio del proyecto (diseño + desarrollo); el segundo 50% se cobra al entregar el sitio funcionando en tu dominio. Si por algún motivo no llegamos a la entrega, el segundo pago no se cobra.",
    palette: 2,
  },
];

interface Stat {
  icon: LucideIcon;
  display: string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: Zap,
    display: "14 días",
    label: "Tiempo de entrega",
  },
  {
    icon: ShieldCheck,
    display: "100%",
    label: "Código a tu nombre",
  },
  {
    icon: RefreshCw,
    display: "2 rondas",
    label: "Revisiones incluidas (Growth Pro)",
  },
  {
    icon: Heart,
    display: "4 horas",
    label: "Respuesta lun–vie",
  },
];

const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);

export function Guarantees() {
  return (
    <section
      aria-label="Garantías firmadas"
      className="relative py-10 sm:py-16 overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-32 h-[480px] bg-[radial-gradient(50%_60%_at_50%_50%,rgba(236,139,42,0.10),transparent_60%)] pointer-events-none"
        aria-hidden
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            eyebrow="Compromisos firmados"
            title={
              <>
                Cada palabra que te decimos,{" "}
                <span className="gradient-text">la firmamos en contrato.</span>
              </>
            }
            description="Ocho compromisos por escrito que entran en el contrato que firmamos contigo. Si no cumplimos uno solo, nos cuesta a nosotros — no a ti."
          />
        </Reveal>
      </div>

      <Carousel items={guarantees} />

      <div className="container relative mt-20 sm:mt-24">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s, i) => (
              <StatCard key={s.label} stat={s} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// Carousel — auto-scroll + hover pause + arrow nav
// ─────────────────────────────────────────────────
function Carousel({ items }: { items: Guarantee[] }) {
  const [expanded, setExpanded] = useState<Guarantee | null>(null);

  // Animation duration: at ~32px/s scroll speed, traversing 50% of the
  // (duplicated) row takes one full card-set duration. We pick a single
  // duration that feels right for both mobile (narrower cards) and
  // desktop (wider cards) — slight speed difference is imperceptible.
  // CSS marquee runs on the compositor thread, so iOS Safari doesn't
  // throttle it during touch-scroll like it does with rAF/scrollLeft.
  const marqueeDuration = "80s";

  return (
    <>
      <div className="group/carousel relative mt-10 sm:mt-14">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-ink-950 via-ink-950/80 to-transparent"
          aria-hidden
        />

        <div
          aria-label="Carrusel de compromisos firmados"
          className="overflow-hidden py-6 sm:py-8"
        >
          <div
            className="flex gap-4 sm:gap-5 w-max px-5 sm:px-10 group-hover/carousel:[animation-play-state:paused]"
            style={{
              animation: `marquee ${marqueeDuration} linear infinite`,
            }}
          >
            {/* Original set — accessible, interactive, announced by SR. */}
            {items.map((g, i) => (
              <GuaranteeCard
                key={`a-${g.id}`}
                guarantee={g}
                index={i}
                onOpen={() => setExpanded(g)}
              />
            ))}

            {/* Duplicate set — required so the marquee keyframe
                (translateX 0 -> -50%) wraps back to the start position
                without a visible jump. Hidden from a11y/SEO. */}
            <div
              className="contents"
              aria-hidden="true"
              inert
              role="presentation"
            >
              {items.map((g, i) => (
                <GuaranteeCard
                  key={`b-${g.id}`}
                  guarantee={g}
                  index={items.length + i}
                  onOpen={() => setExpanded(g)}
                  ariaHidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <ExpandedModal
        guarantee={expanded}
        onClose={() => setExpanded(null)}
      />
    </>
  );
}

// ─────────────────────────────────────────────────
// Card — "signed contract clause" aesthetic
// ─────────────────────────────────────────────────
function GuaranteeCard({
  guarantee,
  index,
  onOpen,
  ariaHidden = false,
}: {
  guarantee: Guarantee;
  index: number;
  onOpen: () => void;
  /** True when this card is a duplicate rendered solely for the
   *  seamless-loop autoscroll. Hidden from AT + crawlers + keyboard. */
  ariaHidden?: boolean;
}) {
  const baseRotate = index % 2 === 0 ? -0.6 : 0.6;
  const hoverRotate = index % 2 === 0 ? 2 : -2;

  return (
    <motion.button
      type="button"
      onClick={ariaHidden ? undefined : onOpen}
      tabIndex={ariaHidden ? -1 : 0}
      aria-hidden={ariaHidden || undefined}
      inert={ariaHidden || undefined}
      initial={{ rotate: baseRotate }}
      whileHover={{
        rotateX: 4,
        rotateY: -3,
        rotate: hoverRotate,
        scale: 1.04,
        y: -6,
        transition: { duration: 0.35, ease: "easeOut" },
      }}
      whileTap={{ scale: 0.98 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="group/card shrink-0 w-[280px] sm:w-[340px] h-[460px] sm:h-[500px] text-left rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-7 relative overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-ember-300/45 hover:shadow-[0_30px_70px_-20px_rgba(236,139,42,0.50)] no-tap-highlight"
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(420px circle at 100% 0%, rgba(236,139,42,0.16), transparent 55%)",
        }}
        aria-hidden
      />

      {/* Top row: "Firmado" pill + verification badge */}
      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 pl-1.5 pr-2.5 py-1 rounded-full border border-ember-300/35 bg-ember-300/[0.08] text-[10px] font-medium uppercase tracking-[0.18em] text-ember-300">
          <span className="grid place-items-center w-3.5 h-3.5 rounded-full bg-ember-300/20">
            <BadgeCheck className="w-2.5 h-2.5" />
          </span>
          Firmado
        </span>
        <Sparkles
          className="w-5 h-5 text-ember-300/60 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-12"
          aria-hidden
        />
      </div>

      {/* Center seal */}
      <div className="relative mt-6 sm:mt-7 flex justify-center">
        <GuaranteeSeal icon={guarantee.icon} palette={guarantee.palette} />
      </div>

      {/* Promise */}
      <blockquote className="relative mt-5 font-display text-[14px] sm:text-[15.5px] leading-snug text-ember-50/95 text-balance line-clamp-[5] text-center">
        “{guarantee.promise}”
      </blockquote>

      {/* Footer */}
      <div className="absolute bottom-6 sm:bottom-7 inset-x-6 sm:inset-x-7 text-center">
        <p className="font-display font-medium text-base sm:text-lg text-ember-50 tracking-tight">
          {guarantee.title}
        </p>
        <p className="text-[11px] sm:text-xs text-ember-50/55 mt-0.5">
          {guarantee.category}
        </p>
        <div
          className="mx-auto mt-3 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.20em] text-ember-300/60 group-hover/card:text-ember-300 transition-colors duration-300"
          aria-hidden
        >
          <span>Leer compromiso</span>
          <span>+</span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────
// Seal — wax-stamp aesthetic with the lucide icon embossed
// ─────────────────────────────────────────────────
function GuaranteeSeal({
  icon: Icon,
  palette,
}: {
  icon: LucideIcon;
  palette: number;
}) {
  const palettes: Array<[string, string, string]> = [
    ["#5a2c0a", "#a8500c", "#ec8b2a"],
    ["#3a1c08", "#7a3a08", "#d76a14"],
    ["#6a3410", "#b85e1e", "#fdc97a"],
    ["#4a2510", "#9a4814", "#ec8b2a"],
    ["#3a1a07", "#883e0c", "#f5ad4f"],
  ];
  const colors = palettes[palette % palettes.length];

  return (
    <div className="relative w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] rounded-full overflow-hidden ring-2 ring-ember-300/40 shadow-[0_8px_28px_-8px_rgba(236,139,42,0.55)]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <radialGradient
            id={`seal-${palette}`}
            cx="0.35"
            cy="0.35"
            r="0.85"
          >
            <stop offset="0%" stopColor={colors[2]} stopOpacity="0.95" />
            <stop offset="55%" stopColor={colors[1]} stopOpacity="0.95" />
            <stop offset="100%" stopColor={colors[0]} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#seal-${palette})`} />
        <circle cx="30" cy="28" r="22" fill="rgba(255, 244, 224, 0.15)" />
        <circle cx="78" cy="84" r="28" fill="rgba(7, 6, 8, 0.20)" />
      </svg>

      <div className="absolute inset-0 grid place-items-center">
        <Icon
          className="w-9 h-9 sm:w-11 sm:h-11 text-ember-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
          strokeWidth={1.75}
        />
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-ember-300/10 via-transparent to-ember-700/20 mix-blend-overlay pointer-events-none"
        aria-hidden
      />

      <div
        className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none"
        aria-hidden
      />
    </div>
  );
}

// ─────────────────────────────────────────────────
// Expanded modal — full guarantee detail
// ─────────────────────────────────────────────────
function ExpandedModal({
  guarantee,
  onClose,
}: {
  guarantee: Guarantee | null;
  onClose: () => void;
}) {
  const isOpen = guarantee !== null;

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    // Remember what was focused so we can restore it on close (a11y).
    const trigger = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      trigger?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {guarantee && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-ink-950/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Compromiso: ${guarantee.title}`}
            className="relative w-full max-w-3xl rounded-3xl border border-ember-300/30 bg-gradient-to-b from-ink-900 to-ink-950 p-7 sm:p-12 shadow-[0_30px_90px_-10px_rgba(0,0,0,0.7)]"
          >
            <div className="absolute -top-px inset-x-14 h-px bg-gradient-to-r from-transparent via-ember-300/50 to-transparent" />
            <div
              className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-ember-400/[0.10] blur-3xl pointer-events-none"
              aria-hidden
            />

            <button
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute top-3 right-3 grid place-items-center w-11 h-11 rounded-full border border-white/[0.10] bg-white/[0.04] text-ember-50/70 hover:text-ember-50 hover:bg-white/[0.10] hover:border-white/[0.20] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative inline-flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-ember-300/40 bg-ember-300/[0.10] text-[11px] font-medium uppercase tracking-[0.20em] text-ember-300">
              <BadgeCheck className="w-3.5 h-3.5" />
              Compromiso firmado en contrato
            </div>

            <div className="relative mt-7 flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">
              <div className="shrink-0">
                <GuaranteeSeal
                  icon={guarantee.icon}
                  palette={guarantee.palette}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-[1.6rem] sm:text-[2rem] font-semibold text-ember-50 tracking-tight text-balance leading-tight">
                  {guarantee.title}
                </h3>
                <p className="mt-1.5 text-[12px] sm:text-[13px] uppercase tracking-[0.22em] text-ember-300/85">
                  {guarantee.category}
                </p>
                <blockquote className="mt-5 font-display text-[1.15rem] sm:text-[1.35rem] leading-[1.4] text-ember-50/95 tracking-tight text-balance border-l-2 border-ember-300/55 pl-4">
                  “{guarantee.promise}”
                </blockquote>
                <p className="mt-5 text-[14px] sm:text-[15px] leading-relaxed text-ember-50/75">
                  {guarantee.detail}
                </p>
              </div>
            </div>

            <div className="relative mt-8 sm:mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-[12px] text-ember-50/55">
                Este punto se incluye, palabra por palabra, en el contrato que firmas al iniciar tu proyecto.
              </p>
              <a
                href="#contact"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 font-medium text-sm shadow-glow-sm hover:shadow-glow transition-all whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                Cotizar mi sitio
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────
// Stat card — static value, animated reveal bar
// ─────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = stat.icon;
  const safe = false;

  return (
    <div className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:border-ember-300/35 hover:-translate-y-1 hover:shadow-glow-sm">
      <div
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-ember-400/[0.10] blur-2xl pointer-events-none transition-opacity duration-500 opacity-70 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative flex items-center gap-2.5">
        <span className="grid place-items-center w-9 h-9 rounded-xl border border-ember-300/25 bg-ember-300/[0.06] text-ember-300 transition-all duration-500 group-hover:bg-ember-300/[0.12] group-hover:border-ember-300/45">
          <Icon className="w-4 h-4" />
        </span>
        <p className="text-[10px] uppercase tracking-[0.22em] text-ember-50/55 font-medium leading-tight">
          {stat.label}
        </p>
      </div>

      <p
        className="relative mt-5 font-display text-[2.5rem] sm:text-[3.2rem] font-bold tracking-tight gradient-text leading-none tabular-nums"
        aria-label={stat.display + " " + stat.label}
      >
        {stat.display}
      </p>

      <div
        className="relative mt-5 h-px overflow-hidden rounded-full bg-white/[0.06]"
        aria-hidden
      >
        {safe ? (
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-ember-300 to-ember-400 rounded-full" />
        ) : (
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember-300 via-ember-200 to-ember-400 rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 2.2,
              ease: EASE_PREMIUM,
              delay: index * 0.08,
            }}
          />
        )}
      </div>
    </div>
  );
}

