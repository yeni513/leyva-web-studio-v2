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

const INNER_RADIUS = 175;
const OUTER_RADIUS = 285;
const INNER_SPEED = 0.18; // rad/s
const OUTER_SPEED = -0.11;
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
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-[120vw] max-h-[120vw] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(236,139,42,0.10),transparent_70%)] pointer-events-none"
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
    <div className="mt-14 sm:mt-16 flex justify-center">
      <div
        className="relative w-[640px] h-[640px] max-w-[92vw] aspect-square"
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
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ember-300/15 pointer-events-none"
        style={{ width: radius * 2, height: radius * 2 }}
        animate={{ opacity: [0.4, 0.85, 0.4] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
        aria-hidden
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: radius * 2,
          height: radius * 2,
          background:
            "radial-gradient(circle, transparent 80%, rgba(236,139,42,0.10) 95%, rgba(236,139,42,0.18) 100%)",
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
        "group/icon absolute top-1/2 left-1/2 grid place-items-center w-[64px] h-[64px] sm:w-[72px] sm:h-[72px] rounded-full border bg-gradient-to-b from-ink-900 to-ink-950 transition-[box-shadow,border-color,background-color,scale] duration-300 will-change-transform no-tap-highlight z-10",
        isActive
          ? "border-ember-300/65 bg-ember-300/[0.10] shadow-[0_0_30px_-3px_rgba(236,139,42,0.65)] scale-110 z-20"
          : "border-ember-300/25 hover:border-ember-300/55 hover:bg-ember-300/[0.07] hover:scale-110 hover:shadow-[0_0_24px_-5px_rgba(236,139,42,0.50)] hover:z-20",
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
            "radial-gradient(circle at 30% 25%, rgba(236,139,42,0.18), transparent 60%)",
        }}
        aria-hidden
      />

      <Icon
        className={cn(
          "relative w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300",
          isActive
            ? "text-ember-100"
            : "text-ember-300 group-hover/icon:text-ember-200",
        )}
      />

      {/* Label */}
      <span
        className={cn(
          "absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] pointer-events-none transition-all duration-300",
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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] z-30 pointer-events-none">
      {/* Outer warm glow */}
      <div
        className="absolute inset-0 rounded-full bg-ember-400/15 blur-2xl"
        aria-hidden
      />
      <div
        className="absolute inset-3 rounded-full bg-ember-300/[0.06] blur-md"
        aria-hidden
      />

      <div className="relative w-full h-full rounded-full border border-ember-300/30 bg-gradient-to-b from-ink-900/95 to-ink-950 backdrop-blur-md flex items-center justify-center overflow-hidden pointer-events-auto">
        {/* Top hairline */}
        <div className="absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/45 to-transparent" />

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

        <div className="relative w-[220px] text-center">
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
      <span className="inline-grid place-items-center w-12 h-12 rounded-2xl border border-ember-300/35 bg-ember-300/[0.10] text-ember-300 shadow-[0_0_24px_-4px_rgba(236,139,42,0.55)]">
        <Icon className="w-6 h-6" />
      </span>
      <h3 className="mt-4 font-display text-[15px] font-semibold text-ember-50 leading-tight tracking-tight text-balance">
        {service.title}
      </h3>
      <p className="mt-2 text-[11px] leading-snug text-ember-50/70 text-pretty">
        {service.detail}
      </p>
      <a
        href="#contact"
        className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-ember-300/35 bg-ember-300/[0.08] text-[10px] uppercase tracking-[0.18em] text-ember-300 hover:bg-ember-300/[0.16] hover:border-ember-300/55 transition-colors"
      >
        Cotizar este servicio
        <ArrowUpRight className="w-3 h-3" />
      </a>
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
      <div className="relative inline-grid place-items-center w-12 h-12 rounded-full border border-ember-300/30 bg-ember-300/[0.06]">
        <Sparkles className="w-6 h-6 text-ember-300" />
        <span
          className="absolute inset-0 rounded-full border border-ember-300/30 animate-pulse-glow"
          aria-hidden
        />
      </div>
      <p className="mt-4 font-display text-[15px] text-ember-50 font-medium">
        Servicios premium
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-ember-50/65">
        Haz clic en cualquier ícono para explorar lo que entregamos.
      </p>
      <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-ember-300/70">
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
              <a
                href="#contact"
                className="group relative block h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-7 transition-all duration-500 hover:border-ember-300/30 hover:from-ember-300/[0.06] hover:to-white/[0.01] shadow-card"
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
              </a>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
