"use client";

import { useEffect, useState, type CSSProperties } from "react";
import {
  AnimatePresence,
  cubicBezier,
  motion,
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

const INNER_RADIUS = 248;
const OUTER_RADIUS = 355;
const INNER_SPEED = 0.16; // rad/s — slightly slower so the bigger orbit still feels graceful
const OUTER_SPEED = -0.095;
const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);

export function Services() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Orbital runs on every device, every motion preference. Only the
  // SSR pre-mount stays as a fallback so server and client markup match.
  const useFallback = !mounted;

  return (
    <section
      id="servicios"
      className="relative py-10 sm:py-16 overflow-hidden"
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
  const [selected, setSelected] = useState<Service | null>(null);

  // Period of one full revolution per orbit. We reuse the existing
  // `orbit-halo` keyframe (rotate 0deg -> 360deg) defined in
  // tailwind.config.ts. Speed values come from INNER_SPEED / OUTER_SPEED.
  const innerPeriod = (2 * Math.PI) / INNER_SPEED; // ~39.27s
  const outerPeriod = (2 * Math.PI) / Math.abs(OUTER_SPEED); // ~66.14s

  return (
    // Wrapper has aspect-square AND a responsive max-width that matches
    // the scaled orbital's visual size at each breakpoint. The orbital
    // itself stays at the full 800x800 logical size (the icon radii are
    // absolute pixels) and sits at the wrapper's center via the
    // translate(-50%,-50%) + scale() trick. `inset-0 m-auto` does NOT
    // center elements that are larger than their containing block, so
    // we anchor explicitly at top:50% left:50%.
    <div
      className="mt-6 sm:mt-20 mb-2 sm:mb-0 mx-auto relative aspect-square w-[95vw]
                 max-w-[800px]
                 max-[900px]:max-w-[680px]
                 max-[640px]:max-w-[496px]
                 max-[440px]:max-w-[360px]"
    >
      <div
        className="group/orbital absolute top-1/2 left-1/2 w-[800px] h-[800px] origin-center
                   [transform:translate(-50%,-50%)]
                   max-[900px]:[transform:scale(0.85)_translate(-50%,-50%)]
                   max-[640px]:[transform:scale(0.62)_translate(-50%,-50%)]
                   max-[440px]:[transform:scale(0.45)_translate(-50%,-50%)]"
      >
        {/* Orbit paths */}
        <OrbitRing radius={INNER_RADIUS} delay={0} />
        <OrbitRing radius={OUTER_RADIUS} delay={1.5} />

        {/* Center hub */}
        <CenterHub
          selected={selected}
          onClear={() => setSelected(null)}
        />

        {/* Orbiting service icons. Each icon sits inside a five-layer
            structure so static `transform` (translate to radius) and
            animated `transform` (rotation) never collide on the same
            element. Both rotations are pure CSS animations on the
            compositor thread — iOS Safari can't desync them during
            touch-scroll. Hover on the orbital container pauses all
            rotations via group state. */}
        {services.map((s) => {
          const radius = s.orbit === "inner" ? INNER_RADIUS : OUTER_RADIUS;
          const period = s.orbit === "inner" ? innerPeriod : outerPeriod;
          const isOuter = s.orbit === "outer";
          // Negative delay so each icon starts at its own phase angle
          // along the cycle.
          const phaseDelay = -(s.phaseDeg / 360) * period;
          // Longhand animation properties — using the `animation`
          // shorthand silently resets `animation-delay` and
          // `animation-direction` longhands. With longhand we control
          // every axis explicitly.
          const rotatorStyle: CSSProperties = {
            position: "absolute",
            width: 0,
            height: 0,
            transformOrigin: "0 0",
            animationName: "orbit-halo",
            animationDuration: `${period}s`,
            animationDelay: `${phaseDelay}s`,
            animationDirection: isOuter ? "reverse" : "normal",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            animationFillMode: "both",
          };
          const counterRotatorStyle: CSSProperties = {
            transformOrigin: "0 0",
            animationName: "orbit-halo",
            animationDuration: `${period}s`,
            animationDelay: `${phaseDelay}s`,
            animationDirection: isOuter ? "normal" : "reverse",
            animationIterationCount: "infinite",
            animationTimingFunction: "linear",
            animationFillMode: "both",
          };

          return (
            // Layer 1 — wrapper anchored at container center
            <div
              key={s.id}
              className="absolute top-1/2 left-1/2"
              style={{ width: 0, height: 0 }}
            >
              {/* Layer 2 — rotator: animates rotation around (0,0).
                  Pause on container hover. */}
              <div
                className="group-hover/orbital:[animation-play-state:paused]"
                style={rotatorStyle}
              >
                {/* Layer 3 — translator: static translate(radius, 0).
                    Lives in the rotator's rotated coordinate space, so
                    it traces a circle as the rotator spins. */}
                <div
                  style={{
                    position: "absolute",
                    transform: `translate(${radius}px, 0)`,
                  }}
                >
                  {/* Layer 4 — counter-rotator: cancels Layer 2's
                      rotation so the icon stays visually upright. */}
                  <div
                    className="group-hover/orbital:[animation-play-state:paused]"
                    style={counterRotatorStyle}
                  >
                    {/* Layer 5 — centering: shifts the icon by -50%,
                        -50% of its own size so its visual center sits
                        on the (radius, 0) point. */}
                    <div style={{ transform: "translate(-50%, -50%)" }}>
                      <OrbitingIcon
                        service={s}
                        isActive={selected?.id === s.id}
                        onSelect={() =>
                          setSelected((prev) =>
                            prev?.id === s.id ? null : s,
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
}: {
  service: Service;
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = service.icon;
  const isOuter = service.orbit === "outer";
  // Stagger the breathing animation across icons so they don't pulse in unison
  const breatheDelay = `${(service.phaseDeg / 60) % 3}s`;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={service.title}
      aria-pressed={isActive}
      className={cn(
        "group/icon relative grid place-items-center rounded-full will-change-transform no-tap-highlight z-10 transition-transform duration-300",
        isOuter ? "w-[88px] h-[88px]" : "w-[76px] h-[76px]",
        isActive
          ? "scale-[1.16] z-20"
          : "hover:scale-[1.16] hover:z-20",
      )}
    >
      {/* Layer 1: ambient breathing aura — soft radial glow, always pulsing */}
      <span
        className={cn(
          "absolute -inset-3 rounded-full pointer-events-none animate-orbit-breathe",
          isActive ? "opacity-100" : "opacity-80",
        )}
        style={{
          background:
            "radial-gradient(circle, rgba(236,139,42,0.55) 0%, rgba(236,139,42,0.18) 45%, transparent 70%)",
          filter: "blur(8px)",
          animationDelay: breatheDelay,
        }}
        aria-hidden
      />

      {/* Layer 2: rotating conic halo — a bright arc travels around the button edge */}
      <span
        className="absolute -inset-1 rounded-full pointer-events-none animate-orbit-halo opacity-90"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, transparent 230deg, rgba(255,210,140,0.95) 310deg, rgba(236,139,42,0.6) 340deg, transparent 360deg)",
        }}
        aria-hidden
      />

      {/* Layer 3: the solid button face — sits ON TOP of layers 1+2, masking
          their center and leaving only the edge halo + outer aura visible. */}
      <span
        className={cn(
          "absolute inset-0 rounded-full border bg-gradient-to-b from-ink-900 to-ink-950 transition-[border-color,background-color,box-shadow] duration-300",
          isActive
            ? "border-ember-300/70 bg-ember-300/[0.12] shadow-[0_0_44px_-2px_rgba(236,139,42,0.85)]"
            : "border-ember-300/30 group-hover/icon:border-ember-300/65 group-hover/icon:bg-ember-300/[0.08] group-hover/icon:shadow-[0_0_36px_-3px_rgba(236,139,42,0.70)]",
        )}
        aria-hidden
      />

      {/* Layer 4: shimmer sweep — only visible on hover/active, gives a "light pass" feel */}
      <span
        className={cn(
          "absolute inset-0 rounded-full overflow-hidden pointer-events-none transition-opacity duration-300",
          isActive
            ? "opacity-100"
            : "opacity-0 group-hover/icon:opacity-100",
        )}
        aria-hidden
      >
        <span
          className="absolute inset-y-0 -inset-x-4 animate-orbit-shimmer"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, rgba(255,244,224,0.42) 50%, transparent 70%)",
          }}
        />
      </span>

      {/* Layer 5: inner highlight (top-left light source) */}
      <span
        className={cn(
          "absolute inset-0.5 rounded-full pointer-events-none transition-opacity duration-300",
          isActive ? "opacity-100" : "opacity-50 group-hover/icon:opacity-100",
        )}
        style={{
          background:
            "radial-gradient(circle at 30% 25%, rgba(255,210,140,0.30), transparent 60%)",
        }}
        aria-hidden
      />

      <Icon
        className={cn(
          "relative transition-colors duration-300 drop-shadow-[0_0_8px_rgba(236,139,42,0.6)]",
          isOuter ? "w-8 h-8" : "w-7 h-7",
          isActive
            ? "text-ember-100"
            : "text-ember-200 group-hover/icon:text-ember-100",
        )}
      />

      {/* Label */}
      <span
        className={cn(
          "absolute top-full mt-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-[0.20em] pointer-events-none transition-all duration-300",
          isActive
            ? "opacity-100 text-ember-300 -translate-y-0"
            : "opacity-0 group-hover/icon:opacity-100 text-ember-50/90 -translate-y-1 group-hover/icon:translate-y-0",
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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[270px] h-[270px] z-30 pointer-events-none">
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
        className="mt-5 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-ember-300/35 bg-ember-300/[0.08] text-[10.5px] uppercase tracking-[0.14em] text-ember-300 hover:bg-ember-300/[0.16] hover:border-ember-300/55 transition-colors no-tap-highlight whitespace-nowrap"
      >
        Pedir cotización
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
        Servicios curados
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
