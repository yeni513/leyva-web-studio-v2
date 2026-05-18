"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  animate,
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Calendar,
  Clock,
  Code2,
  MapPin,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useIsMobile } from "@/lib/use-is-mobile";
import { cn } from "@/lib/utils";

const HAS_FOUNDER_PHOTO = true;
const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);

export function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const enableTilt = !reduced && !isMobile;

  // Mouse-following 3D tilt (springy)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateXRaw = useTransform(mouseY, [-0.5, 0.5], [4, -4]);
  const rotateYRaw = useTransform(mouseX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 110, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 110, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="about"
      aria-label="Quién está detrás de Leyva"
      className="relative py-16 sm:py-24 overflow-hidden"
    >
      {/* Ambient warm glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(236,139,42,0.10),transparent_70%)] pointer-events-none"
        aria-hidden
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            eyebrow="Quién está detrás"
            title={
              <>
                No es una agencia con 30 empleados.{" "}
                <span className="gradient-text">Soy yo.</span>
              </>
            }
            description="Hablas directamente con quien diseña y programa tu sitio. Sin intermediarios, sin call centers, sin equipos rotativos."
          />
        </Reveal>

        <div
          className="mt-12 max-w-4xl mx-auto"
          style={{ perspective: enableTilt ? 1200 : undefined }}
        >
          <Reveal>
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={
                enableTilt
                  ? {
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }
                  : undefined
              }
              className="relative rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-8 lg:p-10 overflow-hidden will-change-transform"
            >
              {/* Subtle dotted grid background */}
              <div
                className="absolute inset-0 opacity-[0.10] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(236,139,42,0.40) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                  maskImage:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%)",
                }}
                aria-hidden
              />

              {/* Corner ambient glows */}
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-ember-400/[0.10] blur-3xl pointer-events-none"
                aria-hidden
              />
              <div
                className="absolute -bottom-32 -left-32 w-72 h-72 rounded-full bg-ember-600/[0.10] blur-3xl pointer-events-none"
                aria-hidden
              />

              {/* "Disponible ahora" live status pill */}
              <AvailabilityPill />

              <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-10 items-start">
                <PhotoOrbit />

                <div className="relative">
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ember-50 leading-tight">
                    Alexander, fundador de Leyva.
                  </h3>

                  <p className="mt-4 text-[15px] sm:text-base text-ember-50/80 leading-relaxed">
                    Llevo años construyendo sitios para negocios locales en EE.
                    UU. y LATAM. La razón de Leyva es simple: vi demasiados
                    dueños de negocio pagando{" "}
                    <Highlight muted>$200/mes</Highlight> a plantillas
                    genéricas que no convierten, o{" "}
                    <Highlight muted>$15K USD</Highlight> a agencias que
                    tardan <Highlight muted>4 meses</Highlight> y desaparecen
                    después del lanzamiento.
                  </p>
                  <p className="mt-3 text-[15px] sm:text-base text-ember-50/80 leading-relaxed">
                    Yo trabajo distinto: te entrego un sitio hecho a la medida
                    en <Highlight>7–14 días</Highlight>, con{" "}
                    <Highlight>código tuyo desde el día 1</Highlight>, y
                    soporte directo conmigo cuando lo necesites — no con un
                    ticket perdido en un help desk.
                  </p>

                  {/* Animated stats row */}
                  <div className="mt-6 grid grid-cols-3 gap-2.5 sm:gap-3">
                    <StatCard
                      icon={Calendar}
                      to={12}
                      suffix="+"
                      label="años codeando"
                    />
                    <StatCard
                      icon={Clock}
                      to={4}
                      suffix="h"
                      label="respuesta promedio"
                    />
                    <StatCard
                      icon={Zap}
                      to={14}
                      suffix="d"
                      label="entrega máxima"
                    />
                  </div>

                  {/* Context pills */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Pill icon={MapPin}>Cleveland, Ohio</Pill>
                    <Pill icon={Code2}>
                      Next.js + TypeScript + Tailwind + shadcn/ui + Framer Motion
                    </Pill>
                  </div>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// Photo with rotating orbital rings + pulsing halo
// ─────────────────────────────────────────────────
function PhotoOrbit() {
  return (
    <div className="relative shrink-0 mx-auto md:mx-0 self-start">
      <div className="relative w-[148px] h-[148px] sm:w-[172px] sm:h-[172px]">
        {/* Pulsing warm halo behind everything */}
        <motion.div
          className="absolute inset-0 rounded-full bg-ember-400/25 blur-2xl"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.06, 1] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />

        {/* Outer dashed ring — slow rotation */}
        <motion.div
          className="absolute -inset-3 rounded-full border-2 border-dashed border-ember-300/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          aria-hidden
        />

        {/* Inner solid ring — opposite direction, with orbiting dot */}
        <motion.div
          className="absolute -inset-1 rounded-full border border-ember-300/55"
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          aria-hidden
        >
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-ember-100 to-ember-400 shadow-[0_0_14px_-1px_rgba(236,139,42,0.9)]" />
        </motion.div>

        {/* The actual photo, circular */}
        <div className="absolute inset-0 rounded-full overflow-hidden border border-ember-300/35 shadow-[0_18px_45px_-12px_rgba(236,139,42,0.55)]">
          {HAS_FOUNDER_PHOTO ? (
            <Image
              src="/founder.jpg"
              alt="Alexander, fundador de Leyva Web Studio"
              width={344}
              height={344}
              priority={false}
              className="w-full h-full object-cover saturate-[0.92] contrast-[1.04]"
            />
          ) : (
            <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden>
              <defs>
                <radialGradient id="founder" cx="0.35" cy="0.30" r="0.85">
                  <stop offset="0%" stopColor="#fdc97a" />
                  <stop offset="55%" stopColor="#ec8b2a" />
                  <stop offset="100%" stopColor="#5a2c0a" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill="url(#founder)" />
              <text
                x="50"
                y="60"
                textAnchor="middle"
                fontSize="38"
                fontWeight="700"
                fill="#fff4e0"
                fontFamily="Inter, sans-serif"
              >
                L
              </text>
            </svg>
          )}
          {/* warm tint overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-ember-300/8 via-transparent to-ember-700/15 mix-blend-overlay pointer-events-none"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────
// "Disponible ahora" live status indicator (top right)
// ─────────────────────────────────────────────────
function AvailabilityPill() {
  return (
    <div className="absolute top-4 sm:top-5 right-4 sm:right-5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] backdrop-blur-md text-[10px] sm:text-[11px] font-medium tracking-tight">
      <span className="relative grid place-items-center">
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
        <span className="relative w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_-1px_rgba(74,222,128,0.85)]" />
      </span>
      <span className="text-emerald-200">Disponible ahora</span>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Animated stat card with count-up
// ─────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  to,
  suffix,
  label,
}: {
  icon: LucideIcon;
  to: number;
  suffix: string;
  label: string;
}) {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const safe = isMobile || !!reduced;

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionVal = useMotionValue(0);
  const display = useTransform(
    motionVal,
    (v) => `${Math.round(v)}${suffix}`,
  );

  useEffect(() => {
    if (safe) {
      motionVal.set(to);
      return;
    }
    if (!inView) return;
    const controls = animate(motionVal, to, {
      duration: 1.8,
      ease: EASE_PREMIUM,
    });
    return () => controls.stop();
  }, [inView, safe, motionVal, to]);

  return (
    <div
      ref={ref}
      className="group relative rounded-xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-3 sm:p-3.5 overflow-hidden transition-colors duration-300 hover:border-ember-300/30"
    >
      <div
        className="absolute -top-8 -right-8 w-20 h-20 rounded-full bg-ember-400/[0.10] blur-xl pointer-events-none transition-opacity duration-300 opacity-70 group-hover:opacity-100"
        aria-hidden
      />
      <div className="relative flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-ember-300/85" />
        <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-ember-50/55 font-medium leading-tight">
          {label}
        </span>
      </div>
      <motion.p
        className="relative mt-2 font-display text-2xl sm:text-[1.7rem] font-bold tracking-tight gradient-text leading-none tabular-nums"
        aria-label={`${to}${suffix} ${label}`}
      >
        {display}
      </motion.p>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Small static context pill
// ─────────────────────────────────────────────────
function Pill({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs text-ember-50/75">
      <Icon className="w-3.5 h-3.5 text-ember-300/85" />
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────
// Highlighted inline number/phrase
// ─────────────────────────────────────────────────
function Highlight({
  children,
  muted,
}: {
  children: React.ReactNode;
  muted?: boolean;
}) {
  return (
    <span
      className={cn(
        "font-semibold",
        muted
          ? "text-ember-50/85 line-through decoration-ember-50/30 decoration-1"
          : "text-ember-300 underline decoration-ember-300/40 underline-offset-[3px] decoration-1",
      )}
    >
      {children}
    </span>
  );
}
