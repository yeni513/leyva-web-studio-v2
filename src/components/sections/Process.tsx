"use client";

import {
  Code2,
  Compass,
  PenTool,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

interface Step {
  n: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  time: string;
}

const steps: Step[] = [
  {
    n: "01",
    icon: Compass,
    title: "Descubrimiento",
    desc: "Hablamos 30 minutos sobre tu negocio, tu cliente ideal y lo que quieres lograr con tu sitio.",
    time: "Día 1",
  },
  {
    n: "02",
    icon: PenTool,
    title: "Diseño",
    desc: "Propuesta visual cinematográfica, estructura clara y copy persuasivo en español listo para aprobar.",
    time: "Días 2–5",
  },
  {
    n: "03",
    icon: Code2,
    title: "Desarrollo",
    desc: "Construimos tu sitio en Next.js, optimizado para velocidad, móvil y SEO. Lo revisas en vivo.",
    time: "Días 6–12",
  },
  {
    n: "04",
    icon: Rocket,
    title: "Lanzamiento",
    desc: "Publicamos, conectamos dominio, instalamos analítica y te enseñamos a editar lo básico.",
    time: "Día 13–14",
  },
];

export function Process() {
  const reduced = useReducedMotion();
  // Mobile gets the same connector / glow animations as desktop. Only
  // prefers-reduced-motion (a11y) downgrades the timeline.
  const safe = !!reduced;

  return (
    <section id="proceso" className="relative py-10 sm:py-16 bg-ink-950/40">
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title={
              <>
                De la primera llamada a tu sitio en vivo{" "}
                <span className="gradient-text">en 14 días.</span>
              </>
            }
            description="Un proceso claro, sin sorpresas y sin perder semanas. Tú apruebas, nosotros entregamos."
          />
        </Reveal>

        <div className="mt-14 relative">
          {/* Connector line — desktop only — with traveling glow */}
          <div
            className="hidden lg:block absolute left-0 right-0 top-[68px] h-px overflow-hidden"
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ember-300/30 to-transparent" />
            {!safe && (
              <>
                <motion.div
                  className="absolute inset-y-0 w-1/2"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(253,201,122,0.95), transparent)",
                    filter: "blur(1px)",
                  }}
                  animate={{ x: ["-60%", "180%"] }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
                <motion.div
                  className="absolute inset-y-0 w-1/3"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(236,139,42,0.8), transparent)",
                    filter: "blur(4px)",
                  }}
                  animate={{ x: ["-100%", "220%"] }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              </>
            )}
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <ProcessCard key={step.n} step={step} index={i} safe={safe} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
  safe,
}: {
  step: Step;
  index: number;
  safe: boolean;
}) {
  const Icon = step.icon;

  return (
    <motion.li
      initial={safe ? undefined : { opacity: 0, y: 28 }}
      whileInView={safe ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative h-full"
    >
      <div className="relative h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-6 sm:p-7 overflow-hidden transition-all duration-500 hover:border-ember-300/35 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgba(236,139,42,0.35)]">
        {/* Big ghost number — bleeds slightly past corner, clipped by overflow */}
        <span
          className="absolute -top-3 -right-1 font-display font-bold text-[96px] leading-none text-ember-300/[0.05] tracking-tighter pointer-events-none select-none transition-all duration-500 group-hover:text-ember-300/[0.14] group-hover:scale-110 origin-top-right"
          aria-hidden
        >
          {step.n}
        </span>

        {/* Hover top-right radial glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(400px circle at 100% 0%, rgba(236,139,42,0.12), transparent 55%)",
          }}
          aria-hidden
        />

        {/* Hover bottom accent line */}
        <div
          className="absolute inset-x-5 bottom-0 h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-transparent via-ember-300 to-transparent"
          aria-hidden
        />

        {/* Icon with pulse rings */}
        <div className="relative inline-block">
          {!safe && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border border-ember-300/40 pointer-events-none"
                animate={{ scale: [1, 1.7, 1], opacity: [0.55, 0, 0.55] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.55,
                  ease: "easeOut",
                }}
                aria-hidden
              />
              <motion.span
                className="absolute inset-0 rounded-full border border-ember-300/20 pointer-events-none"
                animate={{ scale: [1, 2.1, 1], opacity: [0.4, 0, 0.4] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.55 + 0.6,
                  ease: "easeOut",
                }}
                aria-hidden
              />
            </>
          )}
          <span className="relative inline-grid place-items-center w-12 h-12 rounded-full border border-ember-300/30 bg-ink-950 text-ember-300 z-10 transition-all duration-500 group-hover:border-ember-300/65 group-hover:bg-ember-300/[0.08] group-hover:shadow-[0_0_30px_-5px_rgba(236,139,42,0.65)]">
            <Icon className="w-5 h-5 transition-transform duration-500 ease-out group-hover:scale-110" />
          </span>
        </div>

        <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-ember-50 transition-colors duration-300 group-hover:text-white">
          {step.title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-ember-50/70">
          {step.desc}
        </p>

        {/* Animated shimmer divider */}
        <div className="relative mt-5 h-px overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-white/[0.08]" />
          {!safe && (
            <motion.div
              className="absolute inset-y-0 w-1/3"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(236,139,42,0.9), transparent)",
              }}
              animate={{ x: ["-110%", "320%"] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "linear",
                delay: index * 0.45,
              }}
              aria-hidden
            />
          )}
        </div>

        <p className="relative mt-4 text-[11px] uppercase tracking-[0.18em] text-ember-300/85 transition-colors duration-300 group-hover:text-ember-200">
          {step.time}
        </p>
      </div>
    </motion.li>
  );
}
