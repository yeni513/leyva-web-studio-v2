"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wine,
  X,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useIsMobile } from "@/lib/use-is-mobile";

const beforeItems = [
  "Plantilla genérica",
  "Botones débiles",
  "Mala carga móvil",
  "Cero confianza",
];

const afterItems = [
  "Diseño cinematográfico",
  "CTAs fuertes y claros",
  "Mobile perfecto",
  "Reseñas y casos visibles",
];

const basicIssues = [
  "Plantilla genérica que se ve igual a 1000 sitios",
  "Botones débiles, sin jerarquía ni llamada clara",
  "Cargas lentas y mala experiencia en celular",
  "Cero confianza: sin reseñas, sin pruebas",
  "Visitantes que se van sin contactarte",
];

const cardData = [
  { icon: Wine, title: "Cava de autor", sub: "50+ etiquetas" },
  { icon: Calendar, title: "Reservas hoy", sub: "Respuesta inmediata" },
  { icon: MapPin, title: "Roma Norte", sub: "CDMX" },
];

const premiumWins = [
  "Diseño cinematográfico hecho a la medida",
  "CTAs fuertes en cada sección, sin dudas",
  "Carga rápida y experiencia perfecta en celular",
  "Reseñas, casos y elementos de confianza visibles",
  "Visitantes que terminan en WhatsApp o cotización",
];

/**
 * Mobile / reduced-motion users get the side-by-side static cards.
 * Desktop gets the pinned Apple-style scrollytelling experience.
 */
export function Transformation() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted || isMobile || reduced) return <TransformationStatic />;
  return <TransformationScroll />;
}

// ─────────────────────────────────────────────────────────
// DESKTOP: Sticky scroll-driven transformation
// ─────────────────────────────────────────────────────────

function TransformationScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Eyebrow swap
  const eyebrowBefore = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5],
    [1, 0.4, 0],
  );
  const eyebrowAfter = useTransform(
    scrollYProgress,
    [0.45, 0.6, 1],
    [0, 0.65, 1],
  );

  // Frame
  const frameScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.94, 1, 1.03],
  );
  const frameRotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [-1.2, 0, 0.4],
  );
  const frameBorder = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(255,255,255,0.07)", "rgba(236,139,42,0.45)"],
  );
  const frameShadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      "0 0 0px rgba(0,0,0,0)",
      "0 10px 40px -15px rgba(236,139,42,0.20)",
      "0 25px 90px -10px rgba(236,139,42,0.55)",
    ],
  );
  const frameGlowOpacity = useTransform(scrollYProgress, [0.4, 1], [0, 1]);

  // Browser dots: gray → amber palette
  const dotA = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgba(255,255,255,0.16)", "#ec8b2a"],
  );
  const dotB = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgba(255,255,255,0.16)", "#fdc97a"],
  );
  const dotC = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["rgba(255,255,255,0.16)", "#fff4e0"],
  );

  // Title bar gradient overlay opacity
  const titleGradient = useTransform(scrollYProgress, [0.05, 0.45], [0, 1]);

  // Primary CTA: width grows + gradient fills + glow appears
  const btnWidth = useTransform(
    scrollYProgress,
    [0.2, 0.6],
    ["120px", "180px"],
  );
  const btnGradient = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const btnShadow = useTransform(
    scrollYProgress,
    [0.3, 0.7],
    [
      "0 0 0px rgba(236,139,42,0)",
      "0 0 32px -5px rgba(236,139,42,0.55)",
    ],
  );

  // Secondary CTA appears
  const btn2Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const btn2X = useTransform(scrollYProgress, [0.45, 0.65], [-16, 0]);

  // Stars badge appears
  const starsOpacity = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  const starsScale = useTransform(scrollYProgress, [0.6, 0.85], [0.6, 1]);

  // Card row borders/bg lift
  const cardBorder = useTransform(
    scrollYProgress,
    [0.55, 0.9],
    ["rgba(255,255,255,0.04)", "rgba(236,139,42,0.25)"],
  );
  const cardBg = useTransform(
    scrollYProgress,
    [0.55, 0.9],
    ["rgba(255,255,255,0.02)", "rgba(255,255,255,0.05)"],
  );

  // Wins staggered (4 thresholds spread across scroll)
  const win0 = useTransform(scrollYProgress, [0.1, 0.22], [0, 1]);
  const win1 = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
  const win2 = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);
  const win3 = useTransform(scrollYProgress, [0.7, 0.82], [0, 1]);
  const wins = [win0, win1, win2, win3];

  // Corresponding "before" items fade out
  const before0 = useTransform(scrollYProgress, [0.1, 0.22], [0.7, 0]);
  const before1 = useTransform(scrollYProgress, [0.3, 0.42], [0.7, 0]);
  const before2 = useTransform(scrollYProgress, [0.5, 0.62], [0.7, 0]);
  const before3 = useTransform(scrollYProgress, [0.7, 0.82], [0.7, 0]);
  const befores = [before0, before1, before2, before3];

  // Progress bar
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressText = useTransform(
    scrollYProgress,
    (v) => `${Math.round(v * 100)}%`,
  );

  // ─── Real-website content reveal ────────────────────────
  // URL bar in the browser chrome
  const urlOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);

  // Internal navbar inside the mockup
  const navOpacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const navY = useTransform(scrollYProgress, [0.45, 0.65], [-8, 0]);

  // Real headline crosses fade with skeleton bar
  const skeletonHeadlineOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.7],
    [1, 0],
  );
  const realHeadlineOpacity = useTransform(
    scrollYProgress,
    [0.5, 0.75],
    [0, 1],
  );
  const realHeadlineY = useTransform(scrollYProgress, [0.5, 0.75], [8, 0]);

  // Body paragraph (subtitle) reveal
  const subtitleOpacity = useTransform(
    scrollYProgress,
    [0.55, 0.78],
    [0, 1],
  );

  // CTA text labels
  const ctaLabelOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);

  // Trust pill (stars + 200+ reseñas) appears next to CTAs
  const trustPillOpacity = useTransform(
    scrollYProgress,
    [0.62, 0.82],
    [0, 1],
  );
  const trustPillX = useTransform(scrollYProgress, [0.62, 0.82], [-12, 0]);

  // Card content (icons + text) fades in inside the empty cards
  const cardContent0 = useTransform(scrollYProgress, [0.68, 0.82], [0, 1]);
  const cardContent1 = useTransform(scrollYProgress, [0.74, 0.88], [0, 1]);
  const cardContent2 = useTransform(scrollYProgress, [0.80, 0.94], [0, 1]);
  const cardContents = [cardContent0, cardContent1, cardContent2];

  // Floating WhatsApp button — last to appear, pulses
  const waOpacity = useTransform(scrollYProgress, [0.85, 0.97], [0, 1]);
  const waScale = useTransform(scrollYProgress, [0.85, 0.97], [0.4, 1]);

  // Hero soft glow behind headline (suggests a hero image)
  const heroGlowOpacity = useTransform(
    scrollYProgress,
    [0.4, 0.8],
    [0, 0.6],
  );

  return (
    <section
      ref={ref}
      aria-label="De básico a premium"
      className="relative"
      style={{ height: "300vh" }}
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {/* Ambient warm glow that intensifies with progress */}
        <motion.div
          style={{ opacity: frameGlowOpacity }}
          className="absolute inset-0 pointer-events-none"
          aria-hidden
        >
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full bg-ember-400/10 blur-3xl" />
        </motion.div>

        <div className="container relative w-full py-6">
          {/* Eyebrow */}
          <div className="relative h-6 mb-3 text-center">
            <motion.div
              style={{ opacity: eyebrowBefore }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ember-50/55"
            >
              <span className="w-1 h-1 rounded-full bg-ember-50/40" />
              Antes — Sitio web básico
            </motion.div>
            <motion.div
              style={{ opacity: eyebrowAfter }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.22em] text-ember-300"
            >
              <Sparkles className="w-3 h-3" />
              Después — Premium Leyva
            </motion.div>
          </div>

          <h2 className="font-display text-center font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-ember-50">
            De <span className="text-ember-50/55">básico</span> a{" "}
            <span className="gradient-text">premium.</span>
          </h2>

          {/* Mockup */}
          <div className="mt-5 sm:mt-6 flex justify-center">
            <motion.div
              style={{
                scale: frameScale,
                rotate: frameRotate,
                borderColor: frameBorder,
                boxShadow: frameShadow,
              }}
              className="relative w-full max-w-2xl aspect-[16/9] rounded-2xl border bg-gradient-to-b from-ink-900 to-ink-950 overflow-hidden will-change-transform"
            >
              {/* Browser bar */}
              <div className="relative flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5 shrink-0">
                  <motion.span
                    style={{ backgroundColor: dotA }}
                    className="w-2 h-2 rounded-full"
                  />
                  <motion.span
                    style={{ backgroundColor: dotB }}
                    className="w-2 h-2 rounded-full"
                  />
                  <motion.span
                    style={{ backgroundColor: dotC }}
                    className="w-2 h-2 rounded-full"
                  />
                </div>

                {/* URL pill — empty bar that fills with real URL */}
                <div className="flex-1 flex justify-center">
                  <div className="relative h-5 w-full max-w-[260px] rounded-full bg-white/[0.05] border border-white/[0.05] overflow-hidden">
                    <motion.div
                      style={{ opacity: urlOpacity }}
                      className="absolute inset-0 flex items-center justify-center gap-1.5 text-[10px] text-ember-50/80 tracking-tight"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-ember-300/70" />
                      <span className="font-mono">casaolivar.com</span>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  style={{ opacity: starsOpacity, scale: starsScale }}
                  className="flex items-center gap-0.5 shrink-0"
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-ember-300 text-ember-300"
                    />
                  ))}
                </motion.div>
              </div>

              {/* Page content */}
              <div className="relative px-6 sm:px-8 pt-4 sm:pt-5 pb-6 sm:pb-7">
                {/* Soft hero glow that hints a hero image is there */}
                <motion.div
                  style={{ opacity: heroGlowOpacity }}
                  className="absolute -top-4 -right-10 w-72 h-72 rounded-full bg-ember-400/15 blur-3xl pointer-events-none"
                  aria-hidden
                />
                <motion.div
                  style={{ opacity: heroGlowOpacity }}
                  className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-ember-500/10 blur-3xl pointer-events-none"
                  aria-hidden
                />

                {/* Internal navbar (brand + links + mini CTA) */}
                <motion.div
                  style={{ opacity: navOpacity, y: navY }}
                  className="relative flex items-center justify-between pb-4 mb-4 border-b border-white/[0.05]"
                >
                  <div className="flex items-center gap-2">
                    <span className="grid place-items-center w-5 h-5 rounded-full bg-gradient-to-br from-ember-200 via-ember-300 to-ember-500 text-ink-950">
                      <UtensilsCrossed className="w-2.5 h-2.5" />
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.22em] text-ember-50">
                      CASA OLIVAR
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-ember-50/65">
                    <span>Menú</span>
                    <span>Reservar</span>
                    <span>Contacto</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-ember-300/40 text-ember-300 bg-ember-300/[0.06]">
                      Reservar
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </motion.div>

                {/* Headline — crossfade from gradient bar to real text */}
                <div className="relative min-h-[44px] sm:min-h-[52px]">
                  {/* Skeleton with gradient overlay */}
                  <motion.div
                    style={{ opacity: skeletonHeadlineOpacity }}
                    className="absolute inset-x-0 top-0 space-y-2"
                  >
                    <div className="relative h-4 w-3/4 overflow-hidden rounded">
                      <div className="absolute inset-0 bg-white/[0.12]" />
                      <motion.div
                        style={{ opacity: titleGradient }}
                        className="absolute inset-0 bg-gradient-to-r from-ember-100 via-ember-300 to-ember-400"
                      />
                    </div>
                    <div className="h-3 w-2/3 rounded bg-white/[0.08]" />
                  </motion.div>

                  {/* Real headline */}
                  <motion.h3
                    style={{ opacity: realHeadlineOpacity, y: realHeadlineY }}
                    className="relative font-display font-semibold tracking-tight leading-[1.05] text-[clamp(1rem,2.4vw,1.45rem)]"
                  >
                    <span className="text-ember-50">Cocina mediterránea</span>
                    <br />
                    <span className="gradient-text">con alma de barrio.</span>
                  </motion.h3>
                </div>

                {/* Subtitle / body — skeleton + real text crossfade */}
                <div className="relative min-h-[32px] mt-3">
                  <motion.div
                    style={{ opacity: skeletonHeadlineOpacity }}
                    className="absolute inset-x-0 top-0 space-y-2"
                  >
                    <div className="h-2.5 w-full rounded bg-white/[0.06]" />
                    <div className="h-2.5 w-5/6 rounded bg-white/[0.05]" />
                  </motion.div>
                  <motion.p
                    style={{ opacity: subtitleOpacity }}
                    className="relative text-[12px] sm:text-[13px] text-ember-50/70 leading-snug max-w-[78%]"
                  >
                    Reservas el mismo día, menú de temporada y cava de 50+
                    etiquetas. Roma Norte, CDMX.
                  </motion.p>
                </div>

                {/* CTA row */}
                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  {/* Primary CTA with label */}
                  <motion.div
                    style={{ width: btnWidth, boxShadow: btnShadow }}
                    className="relative h-9 rounded-full overflow-hidden flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-white/[0.10]" />
                    <motion.div
                      style={{ opacity: btnGradient }}
                      className="absolute inset-0 bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400"
                    />
                    <motion.span
                      style={{ opacity: ctaLabelOpacity }}
                      className="relative inline-flex items-center gap-1.5 text-[11px] font-semibold text-ink-950 tracking-tight"
                    >
                      Reservar mesa
                      <ArrowUpRight className="w-3 h-3" />
                    </motion.span>
                  </motion.div>

                  {/* Secondary CTA */}
                  <motion.div
                    style={{ opacity: btn2Opacity, x: btn2X }}
                    className="relative h-9 px-4 rounded-full border border-ember-300/35 bg-ember-300/[0.04] flex items-center justify-center"
                  >
                    <motion.span
                      style={{ opacity: ctaLabelOpacity }}
                      className="text-[11px] font-medium text-ember-50/90 tracking-tight"
                    >
                      Ver menú
                    </motion.span>
                  </motion.div>

                  {/* Trust pill */}
                  <motion.div
                    style={{ opacity: trustPillOpacity, x: trustPillX }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07]"
                  >
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-2.5 h-2.5 fill-ember-300 text-ember-300"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-ember-50/80 tracking-tight">
                      +200 reseñas
                    </span>
                  </motion.div>
                </div>

                {/* Service cards — empty boxes that fill with real content */}
                <div className="grid grid-cols-3 gap-2.5 mt-5">
                  {cardData.map((card, i) => {
                    const Icon = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        style={{
                          borderColor: cardBorder,
                          backgroundColor: cardBg,
                        }}
                        className="relative h-[68px] sm:h-[72px] rounded-lg border overflow-hidden"
                      >
                        <motion.div
                          style={{ opacity: cardContents[i] }}
                          className="absolute inset-0 p-2.5 flex flex-col justify-between"
                        >
                          <span className="inline-grid place-items-center w-6 h-6 rounded-md bg-ember-300/12 text-ember-300">
                            <Icon className="w-3 h-3" />
                          </span>
                          <div>
                            <p className="text-[10px] font-semibold text-ember-50 leading-none">
                              {card.title}
                            </p>
                            <p className="mt-1 text-[9px] text-ember-50/55 leading-none">
                              {card.sub}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Floating WhatsApp button — last to appear */}
              <motion.div
                style={{ opacity: waOpacity, scale: waScale }}
                className="absolute right-4 bottom-4 sm:right-5 sm:bottom-5 origin-bottom-right"
                aria-hidden
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-ember-400/40 blur-md animate-pulse-glow" />
                  <div className="relative grid place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-ember-200 via-ember-300 to-ember-500 text-ink-950 shadow-glow">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="absolute -top-0.5 -right-0.5 grid place-items-center w-4 h-4 rounded-full bg-red-500 text-white text-[8px] font-bold border border-ink-950">
                    1
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Wins / before-after rail */}
          <div className="mt-6 sm:mt-8 grid grid-cols-2 max-w-3xl mx-auto gap-x-8 gap-y-2.5">
            {afterItems.map((item, i) => (
              <div
                key={item}
                className="relative h-6 flex items-center text-sm"
              >
                <motion.div
                  style={{ opacity: befores[i] }}
                  className="absolute inset-0 flex items-center gap-3 text-ember-50/55"
                >
                  <span className="grid place-items-center w-5 h-5 rounded-full border border-white/[0.10] text-ember-50/40 shrink-0">
                    <X className="w-3 h-3" />
                  </span>
                  <span className="line-through decoration-ember-50/25 whitespace-nowrap">
                    {beforeItems[i]}
                  </span>
                </motion.div>
                <motion.div
                  style={{ opacity: wins[i] }}
                  className="flex items-center gap-3 text-ember-50/95"
                >
                  <span className="grid place-items-center w-5 h-5 rounded-full bg-ember-300/15 text-ember-300 shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{item}</span>
                </motion.div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-5 sm:mt-7 max-w-xl mx-auto">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] mb-2">
              <span className="text-ember-50/55">Básico</span>
              <motion.span className="text-ember-300 font-mono tabular-nums">
                {progressText}
              </motion.span>
              <span className="text-ember-50/55">Premium</span>
            </div>
            <div className="relative h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember-300 to-ember-400 rounded-full shadow-glow-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────
// MOBILE / reduced-motion: static side-by-side cards
// ─────────────────────────────────────────────────────────

function TransformationStatic() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="De básico a premium"
            title={
              <>
                Convertimos sitios{" "}
                <span className="text-ember-50/60">básicos</span> en presencias
                digitales <span className="gradient-text">premium.</span>
              </>
            }
            description="La mayoría de los negocios locales pierden clientes por tener un sitio que parece improvisado. Esto es lo que cambia cuando trabajamos contigo."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-4 items-stretch">
          <div className="relative h-full rounded-3xl border border-white/[0.06] bg-white/[0.015] p-6 sm:p-8 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember-50/45">
              <span className="w-1.5 h-1.5 rounded-full bg-ember-50/30" />
              Antes
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-ember-50/85">
              Sitio web básico
            </h3>

            <div className="mt-6 rounded-xl border border-white/[0.05] bg-ink-900/60 overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.05]">
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
                <span className="w-2 h-2 rounded-full bg-white/15" />
              </div>
              <div className="p-4 space-y-3">
                <div className="h-3 w-2/3 rounded bg-white/[0.08]" />
                <div className="h-2.5 w-full rounded bg-white/[0.05]" />
                <div className="h-2.5 w-5/6 rounded bg-white/[0.05]" />
                <div className="h-8 w-32 rounded bg-white/[0.06] mt-3" />
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="h-12 rounded bg-white/[0.04]" />
                  <div className="h-12 rounded bg-white/[0.04]" />
                  <div className="h-12 rounded bg-white/[0.04]" />
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5">
              {basicIssues.map((b) => (
                <li
                  key={b}
                  className="flex gap-3 text-sm text-ember-50/65"
                >
                  <X className="w-4 h-4 mt-0.5 shrink-0 text-ember-50/30" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="grid place-items-center w-12 h-12 rounded-full border border-ember-300/30 bg-ember-300/[0.06] text-ember-300 shadow-glow-sm">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
          <div className="md:hidden flex justify-center">
            <div className="grid place-items-center w-10 h-10 rounded-full border border-ember-300/30 bg-ember-300/[0.06] text-ember-300 rotate-90">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="relative h-full rounded-3xl border border-ember-300/25 bg-gradient-to-b from-ember-300/[0.07] to-white/[0.015] p-6 sm:p-8 overflow-hidden shadow-glow">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/40 to-transparent" />
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-ember-300">
              <Sparkles className="w-3 h-3" />
              Después
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-ember-50">
              Sitio web premium Leyva
            </h3>

            <div className="mt-6 rounded-xl border border-ember-300/20 bg-gradient-to-b from-ink-900 to-ink-950 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.05]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-ember-400/70" />
                  <span className="w-2 h-2 rounded-full bg-ember-300/60" />
                  <span className="w-2 h-2 rounded-full bg-ember-200/50" />
                </div>
                <div className="flex items-center gap-1 text-[10px] text-ember-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-2.5 h-2.5 fill-ember-300 text-ember-300"
                    />
                  ))}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="h-3.5 w-3/4 rounded bg-gradient-to-r from-ember-200 to-ember-400" />
                <div className="h-2.5 w-full rounded bg-white/[0.1]" />
                <div className="h-2.5 w-5/6 rounded bg-white/[0.08]" />
                <div className="flex gap-2 mt-3">
                  <div className="h-9 w-36 rounded-full bg-gradient-to-r from-ember-200 to-ember-400" />
                  <div className="h-9 w-28 rounded-full border border-ember-300/30" />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="h-14 rounded-lg border border-ember-300/15 bg-white/[0.03]" />
                  <div className="h-14 rounded-lg border border-ember-300/15 bg-white/[0.03]" />
                  <div className="h-14 rounded-lg border border-ember-300/15 bg-white/[0.03]" />
                </div>
              </div>
            </div>

            <ul className="mt-6 space-y-2.5">
              {premiumWins.map((p) => (
                <li key={p} className="flex gap-3 text-sm text-ember-50/85">
                  <span className="mt-0.5 grid place-items-center w-4 h-4 rounded-full bg-ember-300/15 text-ember-300 shrink-0">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
