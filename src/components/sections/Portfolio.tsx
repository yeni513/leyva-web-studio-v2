"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
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
  Check,
  DollarSign,
  Hammer,
  HardHat,
  Home,
  Image as ImageIcon,
  MapPin,
  MessageCircle,
  Quote as QuoteIcon,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UtensilsCrossed,
  Wine,
  X,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useIsMobile } from "@/lib/use-is-mobile";
import { prefillQuote } from "@/lib/prefill-quote";

interface CaseTile {
  icon: LucideIcon;
  title: string;
  sub: string;
}

interface CaseFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface CaseGalleryItem {
  title: string;
  sub: string;
}

interface CaseReview {
  quote: string;
  author: string;
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
  /** Extended content shown only in the expanded modal preview. */
  modal: {
    longDesc: string;
    features: CaseFeature[];
    galleryTitle: string;
    gallery: CaseGalleryItem[];
    review: CaseReview;
    finalCta: string;
  };
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
    modal: {
      longDesc:
        "Diseñamos una experiencia digital que captura la atmósfera del restaurante. Cada elemento — el menú, las reservas, la galería de platos — está pensado para que el visitante reserve antes de cerrar la pestaña. Cero fricción entre el hambre y la mesa.",
      features: [
        {
          icon: Wine,
          title: "Cava de autor",
          desc: "Carta dinámica con 50+ etiquetas que actualizas tú mismo.",
        },
        {
          icon: Calendar,
          title: "Reservas hoy",
          desc: "WhatsApp + agenda online sincronizada, sin solapamientos.",
        },
        {
          icon: ImageIcon,
          title: "Galería de platos",
          desc: "Fotos profesionales optimizadas que cargan al instante.",
        },
        {
          icon: MapPin,
          title: "Ubicación premium",
          desc: "Mapa interactivo y horarios siempre actualizados.",
        },
      ],
      galleryTitle: "Del menú de temporada",
      gallery: [
        { title: "Pulpo al carbón", sub: "Pick del chef" },
        { title: "Risotto de hongos", sub: "Recomendado" },
        { title: "Cordero lechal", sub: "Edición especial" },
        { title: "Burrata casera", sub: "Nuevo" },
        { title: "Cava reserva", sub: "50+ etiquetas" },
        { title: "Postres de autor", sub: "Cambian cada mes" },
      ],
      review: {
        quote:
          "Llenamos viernes y sábados gracias al sitio. La gente reserva con días de anticipación y ya viene sabiendo qué quiere comer.",
        author: "Manuel C., chef ejecutivo",
      },
      finalCta: "Quiero un sitio así para mi restaurante",
    },
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
    modal: {
      longDesc:
        "Tu portafolio digital construido para generar cotizaciones serias. Mostramos tu trabajo, tu equipo y tu zona de cobertura. Hacemos que contactarte sea fácil — el cliente toca un botón y aterriza directo en tu WhatsApp con la información ya en el mensaje.",
      features: [
        {
          icon: Hammer,
          title: "Portafolio de obras",
          desc: "Galerías por tipo de proyecto con antes y después.",
        },
        {
          icon: ShieldCheck,
          title: "Garantía clara",
          desc: "Comunica lo que ofreces sin letra chica.",
        },
        {
          icon: Calendar,
          title: "Cotización 24h",
          desc: "Formulario que llega directo al WhatsApp del dueño.",
        },
        {
          icon: MapPin,
          title: "Zona de servicio",
          desc: "Mapa de las áreas que cubres en todo Ohio.",
        },
      ],
      galleryTitle: "Algunas obras entregadas",
      gallery: [
        { title: "Residencial Vela Park", sub: "Columbus, OH" },
        { title: "Centro comercial Norte", sub: "Cleveland, OH" },
        { title: "Oficinas Coronel", sub: "Cincinnati, OH" },
        { title: "Loft remodelado", sub: "Toledo, OH" },
        { title: "Casa familiar Ríos", sub: "Akron, OH" },
        { title: "Restaurante Brutalist", sub: "Columbus, OH" },
      ],
      review: {
        quote:
          "Pasé de 2 cotizaciones por mes a 12. El sitio filtra a los clientes serios — solo me contactan los que ya saben qué necesitan.",
        author: "Roberto V., dueño",
      },
      finalCta: "Quiero un sitio así para mi contratista",
    },
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
    modal: {
      longDesc:
        "Plataforma de listados profesional con filtros, fichas detalladas, fotos optimizadas y CTAs directos a WhatsApp por propiedad. Los prospectos llegan precalificados — ya vieron las fotos, leyeron la descripción y vienen con preguntas específicas.",
      features: [
        {
          icon: DollarSign,
          title: "200+ propiedades",
          desc: "Listas para tour con fichas profesionales completas.",
        },
        {
          icon: ImageIcon,
          title: "Tour virtual 360°",
          desc: "Recórrelas desde el celular antes de agendar visita.",
        },
        {
          icon: Calendar,
          title: "Agenda al instante",
          desc: "Coordinas visitas directo por WhatsApp en la ficha.",
        },
        {
          icon: MapPin,
          title: "Vecindarios curados",
          desc: "Cleveland, Columbus y zonas de mayor demanda.",
        },
      ],
      galleryTitle: "Propiedades destacadas",
      gallery: [
        { title: "$285K · 3 rec · 2 ba", sub: "Westerville, OH" },
        { title: "$420K · 4 rec · 3 ba", sub: "Dublin, OH" },
        { title: "$550K · piscina", sub: "Bexley, OH" },
        { title: "$640K · 4 rec amplias", sub: "Upper Arlington" },
        { title: "$780K · loft moderno", sub: "Short North" },
        { title: "$950K · frente lago", sub: "Powell, OH" },
      ],
      review: {
        quote:
          "Los leads del sitio están más calificados. Ya vieron las fotos, leyeron la descripción y vienen con preguntas específicas. Mi cierre subió un 60%.",
        author: "Andrea M., agente principal",
      },
      finalCta: "Quiero un sitio así para mi inmobiliaria",
    },
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
    modal: {
      longDesc:
        "Sitio dark elegante con menú de servicios y precios, equipo de barberos, galería actualizada y agenda online vía WhatsApp. La gente reserva sola, tú te concentras en cortar.",
      features: [
        {
          icon: Scissors,
          title: "Servicios premium",
          desc: "Menú completo con precios claros, desde $25 USD.",
        },
        {
          icon: Calendar,
          title: "Agenda online",
          desc: "Horarios cada 30 min, confirmación por WhatsApp.",
        },
        {
          icon: ImageIcon,
          title: "100+ cortes",
          desc: "Galería que se actualiza con cada cliente nuevo.",
        },
        {
          icon: MapPin,
          title: "Houston, TX",
          desc: "Estacionamiento gratis y horarios extendidos.",
        },
      ],
      galleryTitle: "Servicios del menú",
      gallery: [
        { title: "Fade clásico", sub: "Desde $35" },
        { title: "Pompadour", sub: "Desde $45" },
        { title: "Afeitado caliente", sub: "Desde $30" },
        { title: "Barba esculpida", sub: "Desde $25" },
        { title: "Corte niño 12−", sub: "Desde $20" },
        { title: "Combo padre + hijo", sub: "Desde $55" },
      ],
      review: {
        quote:
          "Mi agenda está llena tres semanas adelante. Antes pasaba el día contestando WhatsApp para confirmar citas — ahora la gente agenda sola.",
        author: "Felipe R., barbero y dueño",
      },
      finalCta: "Quiero un sitio así para mi barbería",
    },
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
  const [expanded, setExpanded] = useState<CaseStudy | null>(null);
  return (
    <>
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
              description="Conceptos basados en proyectos reales para negocios locales. Toca cualquier card para abrir el preview del sitio completo."
            />
          </Reveal>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            {cases.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}>
                <CaseCard data={c} onOpen={() => setExpanded(c)} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ExpandedSiteModal
        data={expanded}
        onClose={() => setExpanded(null)}
      />
    </>
  );
}

// ─────────────────────────────────────────────────
// DESKTOP — scroll-driven assembly (cards fly in)
// ─────────────────────────────────────────────────
// Premium ease — decelerate hard at the end (Tesla landing feel)
const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);

function PortfolioScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<CaseStudy | null>(null);
  // Stretched scroll range — animation lives across the entire section
  // traversal, from "first peek at viewport bottom" to "section bottom at
  // viewport center". Roughly 2× the previous span so cards keep arriving
  // as the user keeps scrolling.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end center"],
  });

  // Header parallax — drifts up + grows slightly through the entry
  const headerScale = useTransform(scrollYProgress, [0, 0.5], [0.93, 1]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.35], [0.4, 1]);
  const headerY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <>
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
              description="Conceptos basados en proyectos reales para negocios locales. Haz clic en cualquier card para abrir el preview del sitio completo."
            />
          </motion.div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
            {cases.map((c, i) => (
              <FlyInCard
                key={c.name}
                data={c}
                index={i}
                progress={scrollYProgress}
                onOpen={() => setExpanded(c)}
              />
            ))}
          </div>
        </div>
      </section>

      <ExpandedSiteModal
        data={expanded}
        onClose={() => setExpanded(null)}
      />
    </>
  );
}

function FlyInCard({
  data,
  index,
  progress,
  onOpen,
}: {
  data: CaseStudy;
  index: number;
  progress: MotionValue<number>;
  onOpen: () => void;
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
  // Combined filter: motion blur that focuses + drop shadow that grows
  // as the card lands. Both strings have identical structure so framer
  // can interpolate them frame-perfect.
  const filter = useTransform(
    progress,
    [start, end],
    [
      "blur(8px) drop-shadow(0 0 0 rgba(0,0,0,0))",
      "blur(0px) drop-shadow(0 30px 45px rgba(0,0,0,0.50))",
    ],
  );

  return (
    <motion.article
      style={{ x, opacity, rotate, scale, skewX, filter }}
      className="will-change-transform origin-center"
    >
      <CaseCard data={data} onOpen={onOpen} />
    </motion.article>
  );
}

// ─────────────────────────────────────────────────
// Card — rich mock website preview + meta
// ─────────────────────────────────────────────────
function CaseCard({
  data,
  onOpen,
}: {
  data: CaseStudy;
  onOpen?: () => void;
}) {
  const BrandIcon = data.brandIcon;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Ver el sitio completo de ${data.name}`}
      className="group relative block h-full w-full text-left rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:border-ember-300/35 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgba(236,139,42,0.35)] no-tap-highlight cursor-pointer"
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

      {/* "Ver sitio completo" hint that fades in on hover */}
      <div className="absolute bottom-5 right-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-ember-300/70 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-1 pointer-events-none">
        Ver sitio
        <ArrowUpRight className="w-3 h-3" />
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────
// Expanded site preview modal
// Opens when a card is clicked; renders a full multi-section
// mocked website for that case study with browser chrome on top.
// ─────────────────────────────────────────────────
function ExpandedSiteModal({
  data,
  onClose,
}: {
  data: CaseStudy | null;
  onClose: () => void;
}) {
  const isOpen = data !== null;

  // Body scroll lock + Escape key while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const y = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    document.body.dataset.scrollY = y.toString();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      const stored = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: stored, behavior: "instant" as ScrollBehavior });
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  // Map the case study to one of the form's industry options
  const industryMap: Record<string, string> = {
    Restaurante: "Restaurante",
    Contratista: "Contratista / Constructor",
    Inmobiliaria: "Inmobiliaria",
    Barbería: "Barbería / Estética",
  };

  // Trigger contact navigation AFTER closing — modal exits cleanly first.
  // Form auto-fills with the industry of the case the user just explored.
  const handleCtaToContact = () => {
    onClose();
    if (!data) return;
    prefillQuote(
      {
        type: "Sitio nuevo",
        industry: industryMap[data.industry] ?? "Otro",
        message: `Vi el caso de ${data.name} y quiero algo similar para mi negocio. Resultado destacado: ${data.result}.`,
        fromLabel: `${data.name} (${data.industry.toLowerCase()})`,
      },
      { scrollDelay: 450 },
    );
  };

  return (
    <AnimatePresence>
      {data && (
        <motion.div
          key="portfolio-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-ink-950/85 backdrop-blur-xl flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview del sitio de ${data.name}`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.4, ease: EASE_PREMIUM }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl my-4 sm:my-8 rounded-2xl sm:rounded-3xl border border-ember-300/30 bg-ink-950 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            <BrowserChrome data={data} onClose={onClose} />

            {/* Scrollable inner — the "website" */}
            <div className="max-h-[calc(92vh-58px)] overflow-y-auto overflow-x-hidden">
              <SiteHero data={data} onCta={handleCtaToContact} />
              <SiteAbout data={data} />
              <SiteFeatures data={data} />
              <SiteGallery data={data} />
              <SiteReview data={data} />
              <SiteFinalCta data={data} onCta={handleCtaToContact} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Modal sub-components ────────────────────────

function BrowserChrome({
  data,
  onClose,
}: {
  data: CaseStudy;
  onClose: () => void;
}) {
  return (
    <div className="sticky top-0 z-10 flex items-center gap-3 px-3 sm:px-4 py-3 border-b border-white/[0.07] bg-ink-950/85 backdrop-blur-md">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-ember-400/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-ember-300/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-ember-200/50" />
      </div>
      <div className="flex-1 flex justify-center min-w-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] sm:text-xs font-mono text-ember-50/85 truncate max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-ember-300/80 shrink-0" />
          <span className="truncate">{data.domain}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar preview"
        className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/[0.10] bg-white/[0.04] text-ember-50/75 hover:text-ember-50 hover:bg-white/[0.10] hover:border-white/[0.20] transition-colors shrink-0"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function SiteHero({
  data,
  onCta,
}: {
  data: CaseStudy;
  onCta: () => void;
}) {
  const BrandIcon = data.brandIcon;
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15, ease: EASE_PREMIUM }}
      className={`relative overflow-hidden px-6 sm:px-12 pt-10 sm:pt-14 pb-12 sm:pb-16 bg-gradient-to-br ${data.heroAccent}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_30%_20%,rgba(236,139,42,0.18),transparent_65%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_85%_80%,rgba(168,80,12,0.18),transparent_60%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/40 to-transparent" />

      {/* Internal navbar */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center w-6 h-6 rounded-full bg-gradient-to-br from-ember-200 via-ember-300 to-ember-500 text-ink-950">
            <BrandIcon className="w-3 h-3" />
          </span>
          <span className="text-[11px] sm:text-xs font-bold tracking-[0.22em] text-ember-50">
            {data.name.toUpperCase()}
          </span>
        </div>
        <nav className="hidden sm:flex items-center gap-5 text-xs text-ember-50/70">
          {data.navItems.map((n) => (
            <span key={n}>{n}</span>
          ))}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-ember-300/40 text-ember-300 bg-ember-300/[0.06]">
            {data.cta.split(" ")[0]}
          </span>
        </nav>
      </div>

      {/* Headline */}
      <div className="relative mt-8 sm:mt-12 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/25 bg-ember-300/[0.06] text-[10px] uppercase tracking-[0.22em] text-ember-300 mb-5">
          <Sparkles className="w-3 h-3" />
          {data.industry}
        </div>
        <h2 className="font-display font-semibold tracking-tight leading-[1.05] text-[clamp(1.8rem,4.5vw,3rem)]">
          <span className="text-ember-50">{data.headline.line1}</span>
          <br />
          <span className="gradient-text">{data.headline.line2}</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-ember-50/75 leading-relaxed max-w-xl">
          {data.subhead}
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onCta}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 font-semibold text-sm shadow-[0_0_28px_-4px_rgba(236,139,42,0.65)] hover:shadow-[0_0_40px_-4px_rgba(236,139,42,0.85)] transition-shadow"
          >
            {data.cta}
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onCta}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full border border-ember-300/40 bg-ember-300/[0.06] text-ember-50 text-sm hover:bg-ember-300/[0.14] hover:border-ember-300/60 transition-colors"
          >
            {data.secondaryCta}
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07]">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3 h-3 fill-ember-300 text-ember-300"
                />
              ))}
            </div>
            <span className="text-[11px] text-ember-50/80">{data.trust}</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function SiteAbout({ data }: { data: CaseStudy }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className="px-6 sm:px-12 py-12 sm:py-16 border-t border-white/[0.05]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-ember-300/85">
          Sobre el proyecto
        </p>
        <p className="mt-4 font-display text-lg sm:text-xl leading-relaxed text-ember-50/90 text-balance">
          {data.modal.longDesc}
        </p>
      </div>
    </motion.section>
  );
}

function SiteFeatures({ data }: { data: CaseStudy }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className="px-6 sm:px-12 py-12 sm:py-16 border-t border-white/[0.05] bg-ember-300/[0.015]"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ember-300/85">
            Lo que incluye
          </p>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ember-50">
            Construido para{" "}
            <span className="gradient-text">convertir.</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {data.modal.features.map((f, i) => {
            const FIcon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: EASE_PREMIUM,
                }}
                className="rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 sm:p-6 hover:border-ember-300/35 transition-colors"
              >
                <span className="inline-grid place-items-center w-10 h-10 rounded-xl border border-ember-300/30 bg-ember-300/[0.08] text-ember-300">
                  <FIcon className="w-5 h-5" />
                </span>
                <h4 className="mt-4 font-semibold text-ember-50 text-base sm:text-lg">
                  {f.title}
                </h4>
                <p className="mt-1.5 text-sm text-ember-50/65 leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function SiteGallery({ data }: { data: CaseStudy }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className="px-6 sm:px-12 py-12 sm:py-16 border-t border-white/[0.05]"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] uppercase tracking-[0.22em] text-ember-300/85">
            Galería
          </p>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ember-50">
            {data.modal.galleryTitle}
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {data.modal.gallery.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: EASE_PREMIUM,
              }}
              className={`group relative aspect-[4/3] rounded-xl sm:rounded-2xl border border-white/[0.07] overflow-hidden bg-gradient-to-br ${data.heroAccent} hover:border-ember-300/40 transition-colors cursor-pointer`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(70%_70%_at_30%_25%,rgba(236,139,42,0.20),transparent_65%)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />
              <div className="absolute inset-0 p-3 sm:p-4 flex flex-col justify-end">
                <p className="font-display font-semibold text-ember-50 text-sm sm:text-base leading-tight">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11px] sm:text-xs text-ember-50/65">
                  {item.sub}
                </p>
              </div>
              <div className="absolute top-2.5 right-2.5 grid place-items-center w-7 h-7 rounded-full bg-ink-950/60 backdrop-blur-sm text-ember-300/0 group-hover:text-ember-300 transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function SiteReview({ data }: { data: CaseStudy }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className="px-6 sm:px-12 py-12 sm:py-16 border-t border-white/[0.05] bg-ember-300/[0.02]"
    >
      <div className="max-w-3xl mx-auto text-center">
        <QuoteIcon className="w-8 h-8 mx-auto text-ember-300/60" />
        <blockquote className="mt-5 font-display text-xl sm:text-2xl font-medium leading-snug text-ember-50/95 text-balance">
          “{data.modal.review.quote}”
        </blockquote>
        <div className="mt-6 inline-flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-ember-300 text-ember-300"
              />
            ))}
          </div>
          <span className="text-sm text-ember-50/60">
            {data.modal.review.author}
          </span>
        </div>
      </div>
    </motion.section>
  );
}

function SiteFinalCta({
  data,
  onCta,
}: {
  data: CaseStudy;
  onCta: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: EASE_PREMIUM }}
      className="relative px-6 sm:px-12 py-12 sm:py-16 border-t border-white/[0.05] overflow-hidden"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-ember-400/[0.12] blur-3xl pointer-events-none" />
      <div className="relative max-w-2xl mx-auto text-center">
        <p className="text-[10px] uppercase tracking-[0.22em] text-ember-300">
          Tu turno
        </p>
        <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ember-50 text-balance">
          ¿Listo para verte premium en tu industria?
        </h3>
        <p className="mt-3 text-sm sm:text-base text-ember-50/70 max-w-lg mx-auto">
          Hablamos 30 minutos sobre tu negocio y te entregamos un sitio así
          en 7-14 días.
        </p>
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCta}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 font-semibold text-sm shadow-[0_0_36px_-4px_rgba(236,139,42,0.70)] hover:shadow-[0_0_48px_-4px_rgba(236,139,42,0.90)] transition-shadow"
          >
            {data.modal.finalCta}
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onCta}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-ember-300/35 bg-ember-300/[0.06] text-ember-50 text-sm hover:bg-ember-300/[0.14] hover:border-ember-300/55 transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-ember-300" />
            Hablar por WhatsApp
          </button>
        </div>
        <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-ember-50/50">
          <Check className="w-3.5 h-3.5 text-ember-300/80" />
          Cero compromiso · Primera llamada gratis
        </div>
      </div>
    </motion.section>
  );
}
