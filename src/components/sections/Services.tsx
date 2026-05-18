"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Gauge,
  LayoutTemplate,
  Search,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useIsMobile } from "@/lib/use-is-mobile";
import { prefillQuote } from "@/lib/prefill-quote";
import { cn } from "@/lib/utils";

interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  detail: string;
  orbit: "inner" | "outer";
  phaseDeg: number;
}

const services: Service[] = [
  {
    id: "design",
    icon: LayoutTemplate,
    title: "Sitios web a la medida",
    desc: "Diseño cinematográfico, copy persuasivo y desarrollo limpio en Next.js.",
    detail:
      "Cada sitio se construye desde cero alrededor de tu negocio. Sin plantillas, sin diseño genérico — Next.js, TypeScript y diseño hecho a mano.",
    orbit: "inner",
    phaseDeg: 270,
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile-first real",
    desc: "Probado en celulares reales, no solo en DevTools.",
    detail:
      "Probamos en iPhone y Android reales antes de entregar. Cero secciones rotas, cero contenido oculto, cero scroll horizontal.",
    orbit: "inner",
    phaseDeg: 30,
  },
  {
    id: "speed",
    icon: Gauge,
    title: "Velocidad y Core Web Vitals",
    desc: "Imágenes optimizadas, fuentes locales y código limpio.",
    detail:
      "Optimizamos imágenes a AVIF/WebP, servimos fuentes locales y mantenemos el JS al mínimo. Tu sitio carga rápido y Google lo nota.",
    orbit: "inner",
    phaseDeg: 150,
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO local",
    desc: "Estructura, metadatos y contenido pensados para tu ciudad.",
    detail:
      "Schema markup, sitemaps, Open Graph, alt text, headings semánticos. Los clientes de tu ciudad te encuentran primero, no a la competencia.",
    orbit: "outer",
    phaseDeg: 330,
  },
  {
    id: "catalog",
    icon: ShoppingCart,
    title: "Catálogos y reservas",
    desc: "Menús digitales, propiedades, servicios y reservas por WhatsApp.",
    detail:
      "Catálogos con filtros, galerías rápidas, formularios de cotización y reservas directas por WhatsApp. Sin fricción entre el visitante y la venta.",
    orbit: "outer",
    phaseDeg: 90,
  },
  {
    id: "support",
    icon: Wrench,
    title: "Soporte y mantenimiento",
    desc: "Cambios mensuales, monitoreo y respaldos.",
    detail:
      "Mantenemos tu sitio impecable: actualizaciones, monitoreo de uptime, respaldos automáticos y hasta 2 rondas de cambios mensuales incluidas.",
    orbit: "outer",
    phaseDeg: 210,
  },
];

const INNER_RADIUS = 220;
const OUTER_RADIUS = 355;
const INNER_SPEED = 0.16; // rad/s — slightly slower so the bigger orbit still feels graceful
const OUTER_SPEED = -0.095;
const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);

export function Services() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const useFallback = !mounted || isMobile || !!reduced;

  return (
    <section
      id="servicios"
      className="relative py-24 sm:py-32 overflow-hidden"
    >
      {/* Ambient warm glow centered behind the orbit */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] max-w-[125vw] max-h-[125vw] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(236,139,42,0.12),transparent_70%)] pointer-events-none"
        aria-hidden
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            eyebrow="Servicios"
            title={
              <>
                Todo lo que tu negocio necesita
                <br className="hidden sm:block" /> para verse{" "}
                <span className="gradient-text">profesional online.</span>
              </>
            }
            description={
              useFallback
                ? "No vendemos plantillas. Diseñamos cada sitio desde cero alrededor de tu negocio, tu cliente ideal y la acción que necesitas que tomen."
                : "Haz clic en cualquier órbita para explorar lo que entregamos. Cada servicio se diseña alrededor de tu negocio y tu cliente ideal."
            }
          />
        </Reveal>
      </div>

      {useFallback ? <ServicesGrid /> : <ServicesOrbit />}
    </section>
  );
}

// ─────────────────────────────────────────────────
// DESKTOP — orbital UI with center hub
// ─────────────────────────────────────────────────
function ServicesOrbit() {
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);
  const iconRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const pausedRef = useRef(paused);

  // Keep ref in sync so the RAF closure reads the latest value without
  // having to re-create the loop on every pause change.
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Single RAF loop drives all orbiting icons via direct DOM transform.
  // No re-renders during animation = silky smooth, no React work per frame.
  useEffect(() => {
    let raf = 0;
    let t = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!pausedRef.current) {
        t += dt;
      }
      for (const s of services) {
        const node = iconRefs.current[s.id];
        if (!node) continue;
        const radius = s.orbit === "inner" ? INNER_RADIUS : OUTER_RADIUS;
        const speed = s.orbit === "inner" ? INNER_SPEED : OUTER_SPEED;
        const phase = (s.phaseDeg * Math.PI) / 180;
        const angle = t * speed + phase;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        node.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="mt-16 sm:mt-20 flex justify-center">
      <div
        className="relative w-[800px] h-[800px] max-w-[95vw] aspect-square"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Orbit paths */}
        <OrbitRing radius={INNER_RADIUS} delay={0} />
        <OrbitRing radius={OUTER_RADIUS} delay={1.5} />

        {/* Center hub */}
        <CenterHub
          selected={selected}
          onClear={() => setSelected(null)}
        />

        {/* Orbiting service icons */}
        {services.map((s) => {
          const radius = s.orbit === "inner" ? INNER_RADIUS : OUTER_RADIUS;
          const phase = (s.phaseDeg * Math.PI) / 180;
          const initialX = Math.cos(phase) * radius;
          const initialY = Math.sin(phase) * radius;
          return (
            <OrbitingIcon
              key={s.id}
              service={s}
              isActive={selected?.id === s.id}
              onSelect={() =>
                setSelected((prev) => (prev?.id === s.id ? null : s))
              }
              refCallback={(el) => {
                iconRefs.current[s.id] = el;
              }}
              initialX={initialX}
              initialY={initialY}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Orbit ring — subtle pulsing border + radial glow
// ─────────────────────────────────────────────────
function OrbitRing({
  radius,
  delay,
}: {
  radius: number;
  delay: number;
}) {
  return (
    <>
      {/* Outer halo — radial glow that extends ~20px past the ring on both sides */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: radius * 2,
          height: radius * 2,
          background:
            "radial-gradient(circle, transparent 74%, rgba(236,139,42,0.18) 90%, rgba(236,139,42,0.38) 99%, transparent 100%)",
        }}
        aria-hidden
      />

      {/* Main visible ring — solid ember border + tube glow (inset + outset) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: radius * 2,
          height: radius * 2,
          border: "1px solid rgba(236, 139, 42, 0.55)",
          boxShadow:
            "0 0 22px -2px rgba(236,139,42,0.40), inset 0 0 22px -2px rgba(236,139,42,0.28)",
        }}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
        aria-hidden
      />

      {/* Hairline accent — a fainter, slightly inset second ring for "double tube" depth */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: radius * 2 - 6,
          height: radius * 2 - 6,
          border: "1px solid rgba(255, 244, 224, 0.06)",
        }}
        aria-hidden
      />
    </>
  );
}

// ─────────────────────────────────────────────────
// Single orbiting icon
// ─────────────────────────────────────────────────
function OrbitingIcon({
  service,
  isActive,
  onSelect,
  refCallback,
  initialX,
  initialY,
}: {
  service: Service;
  isActive: boolean;
  onSelect: () => void;
  refCallback: (el: HTMLButtonElement | null) => void;
  initialX: number;
  initialY: number;
}) {
  const Icon = service.icon;
  const isOuter = service.orbit === "outer";
  return (
    <button
      ref={refCallback}
      type="button"
      onClick={onSelect}
      aria-label={service.title}
      aria-pressed={isActive}
      style={{
        transform: `translate3d(calc(${initialX}px - 50%), calc(${initialY}px - 50%), 0)`,
      }}
      className={cn(
        "group/icon absolute top-1/2 left-1/2 grid place-items-center rounded-full border bg-gradient-to-b from-ink-900 to-ink-950 transition-[box-shadow,border-color,background-color,scale] duration-300 will-change-transform no-tap-highlight z-10",
        isOuter ? "w-[88px] h-[88px]" : "w-[76px] h-[76px]",
        isActive
          ? "border-ember-300/65 bg-ember-300/[0.10] shadow-[0_0_36px_-3px_rgba(236,139,42,0.70)] scale-110 z-20"
          : "border-ember-300/25 hover:border-ember-300/55 hover:bg-ember-300/[0.07] hover:scale-110 hover:shadow-[0_0_28px_-5px_rgba(236,139,42,0.55)] hover:z-20",
      )}
    >
      {/* inner ring accent */}
      <span
        className={cn(
          "absolute inset-0.5 rounded-full pointer-events-none transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-0 group-hover/icon:opacity-100",
        )}
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(236,139,42,0.20), transparent 60%)",
        }}
        aria-hidden
      />

      <Icon
        className={cn(
          "relative transition-colors duration-300",
          isOuter ? "w-8 h-8" : "w-7 h-7",
          isActive
            ? "text-ember-100"
            : "text-ember-300 group-hover/icon:text-ember-200",
        )}
      />

      {/* Label */}
      <span
        className={cn(
          "absolute top-full mt-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.20em] pointer-events-none transition-all duration-300",
          isActive
            ? "opacity-100 text-ember-300 -translate-y-0"
            : "opacity-0 group-hover/icon:opacity-100 text-ember-50/85 -translate-y-1 group-hover/icon:translate-y-0",
        )}
      >
        {service.title}
      </span>
    </button>
  );
}

// ─────────────────────────────────────────────────
// Center hub — shows default state or selected service
// ─────────────────────────────────────────────────
function CenterHub({
  selected,
  onClear,
}: {
  selected: Service | null;
  onClear: () => void;
}) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] z-30 pointer-events-none">
      {/* Outer warm glow */}
      <div
        className="absolute inset-0 rounded-full bg-ember-400/15 blur-2xl"
        aria-hidden
      />
      <div
        className="absolute inset-4 rounded-full bg-ember-300/[0.06] blur-md"
        aria-hidden
      />

      <div className="relative w-full h-full rounded-full border border-ember-300/30 bg-gradient-to-b from-ink-900/95 to-ink-950 backdrop-blur-md flex items-center justify-center overflow-hidden pointer-events-auto">
        {/* Top hairline */}
        <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/45 to-transparent" />

        {/* Subtle inner glow following the curve */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 20%, rgba(236,139,42,0.10), transparent 60%)",
          }}
          aria-hidden
        />

        {/* Close badge — only when selected */}
        {selected && (
          <button
            type="button"
            onClick={onClear}
            aria-label="Limpiar selección"
            className="absolute top-3.5 right-3.5 z-10 grid place-items-center w-6 h-6 rounded-full border border-white/[0.10] bg-white/[0.04] text-ember-50/60 hover:text-ember-50 hover:bg-white/[0.10] transition-colors text-[14px] leading-none"
          >
            ×
          </button>
        )}

        <div className="relative w-[270px] text-center">
          <AnimatePresence mode="wait">
            {selected ? (
              <SelectedView key={selected.id} service={selected} />
            ) : (
              <DefaultView key="default" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function SelectedView({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -10 }}
      transition={{ duration: 0.35, ease: EASE_PREMIUM }}
    >
      <span className="inline-grid place-items-center w-14 h-14 rounded-2xl border border-ember-300/35 bg-ember-300/[0.10] text-ember-300 shadow-[0_0_28px_-4px_rgba(236,139,42,0.60)]">
        <Icon className="w-7 h-7" />
      </span>
      <h3 className="mt-4 font-display text-[18px] font-semibold text-ember-50 leading-tight tracking-tight text-balance">
        {service.title}
      </h3>
      <p className="mt-2.5 text-[12.5px] leading-relaxed text-ember-50/75 text-pretty">
        {service.detail}
      </p>
      <button
        type="button"
        onClick={() =>
          prefillQuote({
            type: "Sitio nuevo",
            message: `Me interesa el servicio: ${service.title}. ${service.detail}`,
            fromLabel: `Servicio: ${service.title}`,
          })
        }
        className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-ember-300/35 bg-ember-300/[0.08] text-[11px] uppercase tracking-[0.18em] text-ember-300 hover:bg-ember-300/[0.16] hover:border-ember-300/55 transition-colors no-tap-highlight"
      >
        Cotizar este servicio
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}

function DefaultView() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.3, ease: EASE_PREMIUM }}
    >
      <div className="relative inline-grid place-items-center w-14 h-14 rounded-full border border-ember-300/30 bg-ember-300/[0.06]">
        <Sparkles className="w-7 h-7 text-ember-300" />
        <span
          className="absolute inset-0 rounded-full border border-ember-300/30 animate-pulse-glow"
          aria-hidden
        />
      </div>
      <p className="mt-4 font-display text-[18px] text-ember-50 font-medium">
        Servicios premium
      </p>
      <p className="mt-2 text-[12.5px] leading-relaxed text-ember-50/65">
        Haz clic en cualquier ícono para explorar lo que entregamos.
      </p>
      <div className="mt-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-ember-300/70">
        <span className="w-1 h-1 rounded-full bg-ember-300 animate-pulse-glow" />
        Hover para pausar
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────
// MOBILE / reduced-motion — static 6-card grid
// ─────────────────────────────────────────────────
function ServicesGrid() {
  return (
    <div className="container">
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.id} delay={i * 0.05}>
              <button
                type="button"
                onClick={() =>
                  prefillQuote({
                    type: "Sitio nuevo",
                    message: `Me interesa el servicio: ${s.title}. ${s.detail}`,
                    fromLabel: `Servicio: ${s.title}`,
                  })
                }
                className="group relative block h-full w-full text-left rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-7 transition-all duration-500 hover:border-ember-300/30 hover:from-ember-300/[0.06] hover:to-white/[0.01] shadow-card no-tap-highlight"
              >
                <div className="relative flex items-start justify-between">
                  <span className="inline-grid place-items-center w-11 h-11 rounded-xl border border-ember-300/25 bg-ember-300/[0.06] text-ember-300">
                    <Icon className="w-5 h-5" />
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-ember-50/40 transition-all duration-300 group-hover:text-ember-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h3 className="relative mt-6 text-lg sm:text-xl font-semibold tracking-tight text-ember-50">
                  {s.title}
                </h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-ember-50/70">
                  {s.desc}
                </p>
              </button>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
