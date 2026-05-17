"use client";

import { useEffect, useRef, useState } from "react";
import {
  cubicBezier,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  Hammer,
  HardHat,
  Home,
  Image as ImageIcon,
  MapPin,
  Scissors,
  ShieldCheck,
  Star,
  TrendingUp,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useIsMobile } from "@/lib/use-is-mobile";

interface CaseTile {
  icon: LucideIcon;
  title: string;
  sub: string;
}

interface CaseStudy {
  industry: string;
  name: string;
  domain: string;
  result: string;
  desc: string;
  brandIcon: LucideIcon;
  heroAccent: string;
  navItems: string[];
  cta: string;
  secondaryCta: string;
  headline: { line1: string; line2: string };
  subhead: string;
  tiles: [CaseTile, CaseTile, CaseTile];
  trust: string;
}

const cases: CaseStudy[] = [
  {
    industry: "Restaurante",
    name: "Casa Olivar",
    domain: "casaolivar.com",
    result: "+38% reservas en 60 días",
    desc: "Menú digital cinematográfico, reservas por WhatsApp y SEO local para destacar arriba de la competencia.",
    brandIcon: UtensilsCrossed,
    heroAccent:
      "from-ember-300/45 via-ember-500/22 to-ember-700/10",
    navItems: ["Menú", "Reservar", "Cocina"],
    cta: "Reservar mesa",
    secondaryCta: "Ver menú",
    headline: {
      line1: "Cocina mediterránea",
      line2: "con alma de barrio.",
    },
    subhead: "Reservas el mismo día · Roma Norte, CDMX",
    tiles: [
      { icon: Wine, title: "Cava", sub: "50+ etiquetas" },
      { icon: Calendar, title: "Hoy", sub: "Disponible" },
      { icon: MapPin, title: "Roma Nte", sub: "CDMX" },
    ],
    trust: "★ 5.0 · 200+ reseñas",
  },
  {
    industry: "Contratista",
    name: "Estructuras Vela",
    domain: "estructurasvela.com",
    result: "12 cotizaciones / mes",
    desc: "Portafolio de obras, testimonios de clientes y formulario de cotización directo al WhatsApp del dueño.",
    brandIcon: HardHat,
    heroAccent:
      "from-ember-200/35 via-ember-400/20 to-ember-600/8",
    navItems: ["Obras", "Servicios", "Contacto"],
    cta: "Cotizar proyecto",
    secondaryCta: "Ver obras",
    headline: {
      line1: "Construimos lo",
      line2: "que imaginas.",
    },
    subhead: "+120 obras entregadas · 15 años en el oficio",
    tiles: [
      { icon: Hammer, title: "Obras", sub: "+120 hechas" },
      { icon: ShieldCheck, title: "Garantía", sub: "1 año" },
      { icon: MapPin, title: "Ohio", sub: "Midwest" },
    ],
    trust: "★ 4.9 · 84 reseñas",
  },
  {
    industry: "Inmobiliaria",
    name: "Norte Realty",
    domain: "norterealty.com",
    result: "x3 leads calificados",
    desc: "Listado de propiedades con filtros, fotos optimizadas y CTA a WhatsApp en cada ficha.",
    brandIcon: Home,
    heroAccent:
      "from-ember-300/40 via-ember-500/18 to-ember-700/8",
    navItems: ["Casas", "Rentas", "Vender"],
    cta: "Ver propiedades",
    secondaryCta: "Filtrar",
    headline: {
      line1: "Tu próxima casa",
      line2: "te está esperando.",
    },
    subhead: "200+ propiedades · Cleveland & Columbus, OH",
    tiles: [
      { icon: DollarSign, title: "$285K", sub: "3 rec · 2 ba" },
      { icon: DollarSign, title: "$420K", sub: "4 rec · 3 ba" },
      { icon: DollarSign, title: "$550K", sub: "5 rec · piscina" },
    ],
    trust: "★ 4.8 · 156 reseñas",
  },
  {
    industry: "Barbería",
    name: "Don Felipe Barber",
    domain: "donfelipebarber.com",
    result: "Agenda llena 3 semanas",
    desc: "Sitio dark elegante, galería de cortes y botón de cita por WhatsApp visible en todo momento.",
    brandIcon: Scissors,
    heroAccent:
      "from-ember-200/28 via-ember-400/16 to-ember-800/8",
    navItems: ["Cortes", "Equipo", "Agenda"],
    cta: "Agendar cita",
    secondaryCta: "Galería",
    headline: {
      line1: "Estilo clásico,",
      line2: "corte moderno.",
    },
    subhead: "Cortes desde $35 · Houston, TX",
    tiles: [
      { icon: Scissors, title: "Corte", sub: "Desde $35" },
      { icon: ImageIcon, title: "Galería", sub: "100+ cortes" },
      { icon: Calendar, title: "Hoy", sub: "5 horarios" },
    ],
    trust: "★ 5.0 · 312 reseñas",
  },
];

export function Portfolio() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const safe = !mounted || isMobile || !!reduced;

  if (safe) return <PortfolioStatic />;
  return <PortfolioScroll />;
}

// ─────────────────────────────────────────────────
// MOBILE / safe fallback — static grid with reveal
// ─────────────────────────────────────────────────
function PortfolioStatic() {
  return (
    <section
      id="trabajo"
      className="relative py-24 sm:py-32 bg-ink-950/40 overflow-hidden"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            eyebrow="Casos de muestra"
            title={
              <>
                Ejemplos del nivel{" "}
                <span className="gradient-text">que entregamos.</span>
              </>
            }
            description="Conceptos basados en proyectos reales para negocios locales. Cada uno diseñado para una sola cosa: convertir."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.06}>
              <CaseCard data={c} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// DESKTOP — scroll-driven assembly (cards fly in)
// ─────────────────────────────────────────────────
// Premium ease — decelerate hard at the end (Tesla landing feel)
const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);

function PortfolioScroll() {
  const ref = useRef<HTMLDivElement>(null);
  // Offset is aligned so progress=1 fires EXACTLY when the section is
  // centered in the viewport — i.e. the user's "moment of arrival". All
  // four cards finish their animation by ~progress 0.85, leaving a 15%
  // buffer where everything is settled before the user reaches center.
  // With "end center" we previously had progress=1 firing when the
  // section's BOTTOM was at viewport center, which meant the user was
  // already past the cards visually while card 3 was still mid-flight.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Header parallax — drifts up + grows slightly through the entry
  const headerScale = useTransform(scrollYProgress, [0, 0.5], [0.93, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.35], [0.4, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section
      ref={ref}
      id="trabajo"
      className="relative py-24 sm:py-32 bg-ink-950/40 overflow-x-hidden"
    >
      <div className="container relative">
        {/* Ambient glow behind the assembly */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1100px] h-[80vh] rounded-full bg-ember-400/[0.06] blur-3xl pointer-events-none"
          aria-hidden
        />

        <motion.div
          style={{
            scale: headerScale,
            opacity: headerOpacity,
            y: headerY,
          }}
          className="origin-center will-change-transform"
        >
          <SectionHeading
            eyebrow="Casos de muestra"
            title={
              <>
                Ejemplos del nivel{" "}
                <span className="gradient-text">que entregamos.</span>
              </>
            }
            description="Conceptos basados en proyectos reales para negocios locales. Cada uno diseñado para una sola cosa: convertir."
          />
        </motion.div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {cases.map((c, i) => (
            <FlyInCard
              key={c.name}
              data={c}
              index={i}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlyInCard({
  data,
  index,
  progress,
}: {
  data: CaseStudy;
  index: number;
  progress: MotionValue<number>;
}) {
  // Cards arrive STRICTLY one after the other — no overlap.
  // Each card owns a 20% slice of the scroll progress. The 0–5% intro and
  // 85–100% outro give breathing room before the first card arrives and
  // after the last one lands so the user can admire the finished grid.
  //
  //  scroll progress:  0    0.05    0.25    0.45    0.65    0.85    1.0
  //  card 0          : ░░  [  card 0  ] ──────── settled ────────────
  //  card 1          : ░░  ─ wait ──   [  card 1  ] ── settled ─────
  //  card 2          : ░░  ───── wait ─────────   [ card 2 ] ── set.
  //  card 3          : ░░  ───────── wait ───────────────   [ card 3 ]
  const fromLeft = index % 2 === 0;
  const start = 0.05 + index * 0.20;
  const end = 0.25 + index * 0.20;

  const ease = { ease: EASE_PREMIUM };

  const x = useTransform(
    progress,
    [start, end],
    [fromLeft ? "-220%" : "220%", "0%"],
    ease,
  );
  const opacity = useTransform(
    progress,
    [start, start + 0.04, end - 0.02],
    [0, 0.85, 1],
    ease,
  );
  const rotate = useTransform(
    progress,
    [start, end],
    [fromLeft ? -22 : 22, 0],
    ease,
  );
  const scale = useTransform(
    progress,
    [start, end],
    [0.72, 1],
    ease,
  );
  const skewX = useTransform(
    progress,
    [start, end],
    [fromLeft ? 8 : -8, 0],
    ease,
  );
  // Combined filter: motion blur clears at 70% of the window (well before
  // the card finishes its slide) so the card is sharp by the time the
  // user's eyes land on it. Drop shadow grows over the full window.
  const focusEnd = start + (end - start) * 0.7;
  const filter = useTransform(
    progress,
    [start, focusEnd, end],
    [
      "blur(8px) drop-shadow(0 0 0 rgba(0,0,0,0))",
      "blur(0px) drop-shadow(0 20px 35px rgba(0,0,0,0.40))",
      "blur(0px) drop-shadow(0 30px 45px rgba(0,0,0,0.50))",
    ],
  );

  return (
    <motion.article
      style={{ x, opacity, rotate, scale, skewX, filter }}
      className="will-change-transform origin-center"
    >
      <CaseCard data={data} />
    </motion.article>
  );
}

// ─────────────────────────────────────────────────
// Card — rich mock website preview + meta
// ─────────────────────────────────────────────────
function CaseCard({ data }: { data: CaseStudy }) {
  const BrandIcon = data.brandIcon;
  return (
    <a
      href="#contact"
      className="group relative block h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:border-ember-300/35 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgba(236,139,42,0.35)]"
    >
      {/* Hover top-right radial glow */}
      <div
        className="absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(450px circle at 100% 0%, rgba(236,139,42,0.10), transparent 55%)",
        }}
        aria-hidden
      />

      {/* Realistic site mockup */}
      <div className="relative rounded-2xl border border-white/[0.07] overflow-hidden bg-ink-900 aspect-[16/10]">
        {/* Hero background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${data.heroAccent}`}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_25%,rgba(236,139,42,0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_85%_85%,rgba(168,80,12,0.18),transparent_60%)]" />

        {/* Browser chrome */}
        <div className="relative flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-ink-950/30 backdrop-blur-sm">
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-400/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-ember-300/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-ember-200/50" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-[8px] text-ember-50/75 font-mono">
              <span className="w-1 h-1 rounded-full bg-ember-300/70" />
              {data.domain}
            </div>
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-2 h-2 fill-ember-300 text-ember-300"
              />
            ))}
          </div>
        </div>

        {/* Page interior */}
        <div className="relative p-3 sm:p-4 flex flex-col gap-2.5 h-[calc(100%-28px)]">
          {/* Internal navbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="grid place-items-center w-4 h-4 rounded-full bg-gradient-to-br from-ember-200 via-ember-300 to-ember-500 text-ink-950">
                <BrandIcon className="w-2 h-2" />
              </span>
              <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-ember-50 whitespace-nowrap">
                {data.name.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[7px] sm:text-[8px] text-ember-50/65">
              {data.navItems.map((n) => (
                <span key={n} className="hidden sm:inline">
                  {n}
                </span>
              ))}
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full border border-ember-300/40 text-ember-300 bg-ember-300/[0.06]">
                {data.cta.split(" ")[0]}
                <ArrowUpRight className="w-2 h-2" />
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-0.5 mt-0.5">
            <h4 className="font-display font-semibold leading-[1.1] tracking-tight text-[11px] sm:text-[13px]">
              <span className="text-ember-50">{data.headline.line1}</span>
              <br />
              <span className="gradient-text">{data.headline.line2}</span>
            </h4>
            <p className="text-[8px] sm:text-[9px] text-ember-50/65 leading-snug">
              {data.subhead}
            </p>
          </div>

          {/* CTAs row */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 text-[8px] font-semibold shadow-[0_0_18px_-4px_rgba(236,139,42,0.6)]">
              {data.cta}
              <ArrowUpRight className="w-2 h-2" />
            </span>
            <span className="px-2 py-1 rounded-full border border-ember-300/35 bg-ember-300/[0.04] text-[8px] text-ember-50/85">
              {data.secondaryCta}
            </span>
            <span className="ml-auto text-[8px] text-ember-300/85 font-medium">
              {data.trust}
            </span>
          </div>

          {/* Mini tiles */}
          <div className="grid grid-cols-3 gap-1.5 mt-auto">
            {data.tiles.map((tile) => {
              const TileIcon = tile.icon;
              return (
                <div
                  key={tile.title}
                  className="rounded-md border border-white/[0.07] bg-white/[0.025] p-1.5 backdrop-blur-sm"
                >
                  <span className="grid place-items-center w-3.5 h-3.5 rounded-sm bg-ember-300/15 text-ember-300">
                    <TileIcon className="w-2 h-2" />
                  </span>
                  <p className="mt-1 text-[8px] sm:text-[9px] font-semibold text-ember-50 leading-none">
                    {tile.title}
                  </p>
                  <p className="text-[7px] sm:text-[8px] text-ember-50/55 leading-none mt-0.5">
                    {tile.sub}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top hairline gradient */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/40 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Meta below mockup */}
      <div className="relative mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-ember-300/85">
            {data.industry}
          </p>
          <h3 className="mt-1 text-xl font-semibold text-ember-50">
            {data.name}
          </h3>
        </div>
        <ArrowUpRight className="w-5 h-5 text-ember-50/40 transition-all duration-300 group-hover:text-ember-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="relative mt-2 text-sm text-ember-50/70 leading-relaxed">
        {data.desc}
      </p>

      <div className="relative mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ember-300/10 border border-ember-300/25 text-ember-300 text-xs">
        <TrendingUp className="w-3.5 h-3.5" />
        {data.result}
      </div>
    </a>
  );
}
