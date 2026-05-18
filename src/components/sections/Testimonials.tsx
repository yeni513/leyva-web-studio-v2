"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  AnimatePresence,
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Quote,
  RefreshCw,
  ShieldCheck,
  Star,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useIsMobile } from "@/lib/use-is-mobile";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Pravatar image number (1–70) — deterministic face per testimonial. */
  img: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "El sitio se ve como el de una marca grande. Empezamos a recibir cotizaciones serias en la primera semana.",
    name: "Mariana R.",
    role: "Dueña de restaurante, Columbus OH",
    img: 47,
  },
  {
    quote:
      "Por fin un desarrollador que entiende mi negocio y no me llena de palabras técnicas. Quedó impecable en celular.",
    name: "Luis G.",
    role: "Contratista, Houston TX",
    img: 11,
  },
  {
    quote:
      "Mi competencia se ve básica al lado de mi nuevo sitio. El proceso fue rápido y profesional de principio a fin.",
    name: "Andrea M.",
    role: "Inmobiliaria, Cleveland OH",
    img: 32,
  },
  {
    quote:
      "Las clientes me dicen que mi sitio se ve más caro que mis precios. Justo el efecto que quería.",
    name: "Camila R.",
    role: "Salón de uñas, Columbus OH",
    img: 16,
  },
  {
    quote:
      "El sitio paga por sí solo en dos meses. Cero arrepentimientos.",
    name: "Manuel T.",
    role: "Auto repair, Chicago IL",
    img: 60,
  },
  {
    quote:
      "Mis citas se llenaron tres semanas adelante. El WhatsApp suena todo el día.",
    name: "Carlos D.",
    role: "Barbería, Cincinnati OH",
    img: 65,
  },
  {
    quote:
      "Pasé de 2 a 12 cotizaciones por semana. Vale cada dólar invertido.",
    name: "Sofía P.",
    role: "Limpieza comercial, Dallas TX",
    img: 23,
  },
  {
    quote:
      "Antes ni aparecía en Google. Ahora me llaman de toda la ciudad y precalifico a mis clientes.",
    name: "Roberto J.",
    role: "Plomería, Toledo OH",
    img: 52,
  },
  {
    quote:
      "Mi portfolio por fin refleja la calidad de mi trabajo. Subí mis precios un 40% y siguen contratando.",
    name: "Valeria C.",
    role: "Fotógrafa de bodas, Miami FL",
    img: 5,
  },
  {
    quote:
      "Subí precios 25% y siguen contratándome más. El sitio vendió por mí.",
    name: "Diego H.",
    role: "Concrete contractor, Cleveland OH",
    img: 68,
  },
];

interface Stat {
  icon: LucideIcon;
  to: number;
  format: (v: number) => string;
  label: string;
}

const stats: Stat[] = [
  {
    icon: Zap,
    to: 14,
    format: (v) => `${Math.round(v)}d`,
    label: "Tiempo de entrega",
  },
  {
    icon: ShieldCheck,
    to: 100,
    format: (v) => `${Math.round(v)}%`,
    label: "Código a tu nombre",
  },
  {
    icon: RefreshCw,
    to: 2,
    format: (v) => `${Math.round(v)}×`,
    label: "Rondas de revisión",
  },
  {
    icon: Heart,
    to: 60,
    format: (v) => `${Math.round(v)}d`,
    label: "Soporte post-lanzamiento",
  },
];

const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);
const AUTO_SPEED_PX_PER_SEC = 32;
const PAUSE_AFTER_INTERACTION_MS = 4000;

export function Testimonials() {
  return (
    <section
      aria-label="Testimonios de clientes"
      className="relative py-16 sm:py-24 overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-32 h-[480px] bg-[radial-gradient(50%_60%_at_50%_50%,rgba(236,139,42,0.10),transparent_60%)] pointer-events-none"
        aria-hidden
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            eyebrow="Voces del negocio local"
            title={
              <>
                Lo que escucharás cuando tu sitio{" "}
                <span className="gradient-text">empiece a vender.</span>
              </>
            }
            description="Ejemplos del tipo de feedback que recibirás de tus clientes y operadores cuando tu negocio tenga un sitio que realmente funciona. Pasa el mouse para pausar."
          />
        </Reveal>
      </div>

      <Carousel items={testimonials} />

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
function Carousel({ items }: { items: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const [expanded, setExpanded] = useState<Testimonial | null>(null);
  const [inView, setInView] = useState(false);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  const interactionTimerRef = useRef<number | null>(null);

  // Auto-scroll is paused while hovering, while a modal is expanded,
  // while the user is in the middle of an arrow interaction, when the
  // section is not in the viewport, or for reduced-motion / mobile users.
  const autoPaused =
    hovering ||
    expanded !== null ||
    interacted ||
    !inView ||
    !!reduced ||
    isMobile;

  // Only run the rAF loop when the section is visible — avoids burning
  // CPU on every frame while the user is reading a different section.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Duplicate items so the auto-scroll can loop seamlessly.
  const looped = [...items, ...items];

  const checkScroll = useCallback(() => {
    const node = scrollRef.current;
    if (!node) return;
    setCanLeft(node.scrollLeft > 4);
    setCanRight(node.scrollLeft < node.scrollWidth - node.clientWidth - 4);
  }, []);

  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    checkScroll();
    node.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      node.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // ── Continuous auto-scroll ──────────────────────
  useEffect(() => {
    if (autoPaused) return;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;

      const node = scrollRef.current;
      if (node) {
        const half = node.scrollWidth / 2;
        // Seamless loop: when we cross the halfway point (which holds the
        // duplicated set), jump back by half. The visible content is
        // identical at both positions so the user perceives no jump.
        if (half > 0 && node.scrollLeft >= half) {
          node.scrollLeft = node.scrollLeft - half;
        }
        node.scrollLeft += AUTO_SPEED_PX_PER_SEC * dt;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoPaused]);

  const scrollBy = (delta: number) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: "smooth" });
    // Pause auto-scroll briefly so the user can settle their gaze
    setInteracted(true);
    if (interactionTimerRef.current) {
      window.clearTimeout(interactionTimerRef.current);
    }
    interactionTimerRef.current = window.setTimeout(
      () => setInteracted(false),
      PAUSE_AFTER_INTERACTION_MS,
    );
  };

  // Pause auto-scroll when user touches/wheels the carousel directly
  useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    const onInteract = () => {
      setInteracted(true);
      if (interactionTimerRef.current) {
        window.clearTimeout(interactionTimerRef.current);
      }
      interactionTimerRef.current = window.setTimeout(
        () => setInteracted(false),
        PAUSE_AFTER_INTERACTION_MS,
      );
    };
    node.addEventListener("wheel", onInteract, { passive: true });
    node.addEventListener("touchstart", onInteract, { passive: true });
    return () => {
      node.removeEventListener("wheel", onInteract);
      node.removeEventListener("touchstart", onInteract);
    };
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="relative mt-10 sm:mt-14"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Edge fade masks */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-ink-950 via-ink-950/80 to-transparent"
          aria-hidden
        />

        <div
          ref={scrollRef}
          aria-label="Carrusel de testimonios"
          className="flex gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain py-6 sm:py-8 px-5 sm:px-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {looped.map((t, i) => (
            <TestimonialCard
              key={`${t.name}-${i}`}
              testimonial={t}
              index={i}
              onOpen={() => setExpanded(t)}
            />
          ))}
        </div>

        {/* Auto-scroll status pill (subtle indicator) */}
        <div
          className="container flex items-center justify-between gap-3 mt-2 sm:mt-4"
          aria-hidden
        >
          <span
            className={cn(
              "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ember-50/45 transition-opacity duration-500",
              isMobile && "hidden",
              autoPaused ? "opacity-100" : "opacity-60",
            )}
          >
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-500",
                autoPaused
                  ? "bg-ember-50/50"
                  : "bg-ember-300 animate-pulse-glow",
              )}
            />
            {autoPaused ? "Pausado" : "Auto-scroll"}
          </span>

          <div className="flex gap-2 ml-auto">
            <button
              type="button"
              aria-label="Testimonio anterior"
              onClick={() => scrollBy(-380)}
              disabled={!canLeft}
              className={cn(
                "grid place-items-center w-11 h-11 rounded-full border border-ember-300/25 bg-ember-300/[0.06] text-ember-300 transition-all duration-300 no-tap-highlight",
                "hover:bg-ember-300/[0.14] hover:border-ember-300/50 hover:shadow-glow-sm active:scale-95",
                "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-ember-300/[0.06] disabled:hover:border-ember-300/25 disabled:hover:shadow-none",
              )}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Siguiente testimonio"
              onClick={() => scrollBy(380)}
              disabled={!canRight}
              className={cn(
                "grid place-items-center w-11 h-11 rounded-full border border-ember-300/25 bg-ember-300/[0.06] text-ember-300 transition-all duration-300 no-tap-highlight",
                "hover:bg-ember-300/[0.14] hover:border-ember-300/50 hover:shadow-glow-sm active:scale-95",
                "disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-ember-300/[0.06] disabled:hover:border-ember-300/25 disabled:hover:shadow-none",
              )}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded modal — rendered once at carousel level */}
      <ExpandedModal
        testimonial={expanded}
        onClose={() => setExpanded(null)}
      />
    </>
  );
}

// ─────────────────────────────────────────────────
// Card with retro photo + tilt-on-hover
// ─────────────────────────────────────────────────
function TestimonialCard({
  testimonial,
  index,
  onOpen,
}: {
  testimonial: Testimonial;
  index: number;
  onOpen: () => void;
}) {
  const reduced = useReducedMotion();
  // Alternating subtle base rotation creates a "stacked photos" feel
  const baseRotate = index % 2 === 0 ? -0.6 : 0.6;
  const hoverRotate = index % 2 === 0 ? 2 : -2;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ rotate: baseRotate }}
      whileHover={
        reduced
          ? undefined
          : {
              rotateX: 4,
              rotateY: -3,
              rotate: hoverRotate,
              scale: 1.04,
              y: -6,
              transition: { duration: 0.35, ease: "easeOut" },
            }
      }
      whileTap={{ scale: 0.98 }}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="group/card shrink-0 w-[280px] sm:w-[340px] h-[460px] sm:h-[500px] text-left rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-7 relative overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-ember-300/45 hover:shadow-[0_30px_70px_-20px_rgba(236,139,42,0.50)] no-tap-highlight"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background:
            "radial-gradient(420px circle at 100% 0%, rgba(236,139,42,0.16), transparent 55%)",
        }}
        aria-hidden
      />

      {/* Top corners: stars + quote */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="w-3.5 h-3.5 fill-ember-300 text-ember-300"
            />
          ))}
        </div>
        <Quote
          className="w-6 h-6 text-ember-300/60 transition-transform duration-500 group-hover/card:scale-110 group-hover/card:rotate-6"
          aria-hidden
        />
      </div>

      {/* Retro avatar centered */}
      <div className="relative mt-6 sm:mt-7 flex justify-center">
        <RetroAvatar img={testimonial.img} name={testimonial.name} />
      </div>

      {/* Quote */}
      <blockquote className="relative mt-5 font-display text-[14px] sm:text-[15.5px] leading-snug text-ember-50/95 text-balance line-clamp-[5] text-center">
        “{testimonial.quote}”
      </blockquote>

      {/* Footer: name + role */}
      <div className="absolute bottom-6 sm:bottom-7 inset-x-6 sm:inset-x-7 text-center">
        <p className="font-display font-medium text-base sm:text-lg text-ember-50 tracking-tight">
          {testimonial.name}
        </p>
        <p className="text-[11px] sm:text-xs text-ember-50/55 mt-0.5">
          {testimonial.role}
        </p>
        <div
          className="mx-auto mt-3 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.20em] text-ember-300/60 group-hover/card:text-ember-300 transition-colors duration-300"
          aria-hidden
        >
          <span>Leer testimonio</span>
          <span>+</span>
        </div>
      </div>
    </motion.button>
  );
}

// ─────────────────────────────────────────────────
// Retro avatar — self-hosted SVG monogram with cinematic
// gradient + retro filter. No external image dependencies.
// ─────────────────────────────────────────────────
function RetroAvatar({ img, name }: { img: number; name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  // Use the `img` seed to deterministically pick a gradient pair so each
  // testimonial gets its own colorway (still all warm/ember, just varied).
  const palettes: Array<[string, string, string]> = [
    ["#5a2c0a", "#a8500c", "#ec8b2a"], // bronze → ember
    ["#3a1c08", "#7a3a08", "#d76a14"], // deep ink → ember
    ["#6a3410", "#b85e1e", "#fdc97a"], // warm copper → gold
    ["#4a2510", "#9a4814", "#ec8b2a"], // mahogany → amber
    ["#3a1a07", "#883e0c", "#f5ad4f"], // dark wood → light amber
  ];
  const palette = palettes[img % palettes.length];

  return (
    <div className="relative w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] rounded-full overflow-hidden ring-2 ring-ember-300/40 shadow-[0_8px_28px_-8px_rgba(236,139,42,0.55)]">
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        aria-label={name}
        role="img"
      >
        <defs>
          <radialGradient
            id={`avatar-bg-${img}`}
            cx="0.35"
            cy="0.35"
            r="0.85"
          >
            <stop offset="0%" stopColor={palette[2]} stopOpacity="0.95" />
            <stop offset="55%" stopColor={palette[1]} stopOpacity="0.95" />
            <stop offset="100%" stopColor={palette[0]} stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect
          width="100"
          height="100"
          fill={`url(#avatar-bg-${img})`}
        />
        {/* Soft inner texture */}
        <circle
          cx="30"
          cy="28"
          r="22"
          fill="rgba(255, 244, 224, 0.15)"
        />
        <circle
          cx="78"
          cy="84"
          r="28"
          fill="rgba(7, 6, 8, 0.20)"
        />
        {/* Initials */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontSize="38"
          fontWeight="600"
          fill="#fff4e0"
          fontFamily="Inter, sans-serif"
          letterSpacing="-1"
        >
          {initials}
        </text>
      </svg>

      {/* Warm tint overlay — unifies all avatars to the ember palette */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-ember-300/10 via-transparent to-ember-700/20 mix-blend-overlay pointer-events-none"
        aria-hidden
      />

      {/* Subtle inner glow ring */}
      <div
        className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10 pointer-events-none"
        aria-hidden
      />
    </div>
  );
}

// ─────────────────────────────────────────────────
// Expanded modal — full quote, photo, escape/click-out close
// ─────────────────────────────────────────────────
function ExpandedModal({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial | null;
  onClose: () => void;
}) {
  const isOpen = testimonial !== null;

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {testimonial && (
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
            aria-label={`Testimonio de ${testimonial.name}`}
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

            <div className="relative flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-ember-300 text-ember-300"
                />
              ))}
            </div>

            <div className="relative mt-6 flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">
              <div className="shrink-0">
                <RetroAvatar img={testimonial.img} name={testimonial.name} />
              </div>
              <div className="flex-1 min-w-0">
                <Quote
                  className="w-7 h-7 text-ember-300/60"
                  aria-hidden
                />
                <blockquote className="mt-3 font-display font-medium text-[1.35rem] sm:text-[1.75rem] leading-[1.25] text-ember-50/95 tracking-tight text-balance">
                  “{testimonial.quote}”
                </blockquote>
              </div>
            </div>

            <div className="relative mt-8 sm:mt-10 pt-6 border-t border-white/[0.06]">
              <p className="font-display text-lg text-ember-50">
                {testimonial.name}
              </p>
              <p className="text-sm text-ember-50/60 mt-0.5">
                {testimonial.role}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────
// Stat card with animated counter (unchanged)
// ─────────────────────────────────────────────────
function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const Icon = stat.icon;
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const safe = isMobile || !!reduced;

  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, stat.format);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (safe) {
      motionVal.set(stat.to);
      return;
    }
    if (!inView) return;
    const controls = animate(motionVal, stat.to, {
      duration: 2.2,
      ease: EASE_PREMIUM,
    });
    return () => controls.stop();
  }, [inView, safe, motionVal, stat.to]);

  return (
    <div
      ref={ref}
      className="group relative rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:border-ember-300/35 hover:-translate-y-1 hover:shadow-glow-sm"
    >
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

      <motion.p
        className="relative mt-5 font-display text-[2.5rem] sm:text-[3.2rem] font-bold tracking-tight gradient-text leading-none tabular-nums"
        aria-label={stat.format(stat.to) + " " + stat.label}
      >
        {display}
      </motion.p>

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
