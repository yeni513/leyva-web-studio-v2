"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type BadgeType = "live" | "concept";

interface Project {
  id: string;
  name: string;
  url: string;
  /** Display string for the browser-chrome URL bar. */
  domain: string;
  /** Eyebrow label above the project name. */
  industry: string;
  /** Honest status badge. */
  badge: string;
  badgeType: BadgeType;
  description: string;
  tags: string[];
  /** Real screenshot of the live site (captured headless, optimized). */
  screenshot: string;
}

interface RawProject {
  id: string;
  name: string;
  url: string;
  domain: string;
  badgeType: BadgeType;
  screenshot: string;
  es: { industry: string; badge: string; description: string; tags: string[] };
  en: { industry: string; badge: string; description: string; tags: string[] };
}

const RAW_PROJECTS: RawProject[] = [
  {
    id: "leyva",
    name: "Leyva Web Studio",
    url: "https://leyvawebstudio.com/",
    domain: "leyvawebstudio.com",
    badgeType: "live",
    screenshot: "/work/leyva.jpg",
    es: {
      industry: "Estudio web · Sitio oficial",
      badge: "Sitio en vivo",
      description:
        "Nuestro sitio oficial: Next.js sobre Cloudflare Workers, chatbot con IA, captación de leads, estructura SEO y secciones enfocadas en conversión.",
      tags: ["Next.js", "Cloudflare", "Chatbot IA", "SEO", "Conversión"],
    },
    en: {
      industry: "Web studio · Official site",
      badge: "Live site",
      description:
        "Our official site: Next.js on Cloudflare Workers, AI chatbot, lead capture, SEO structure and conversion-focused sections.",
      tags: ["Next.js", "Cloudflare", "AI chatbot", "SEO", "Conversion"],
    },
  },
  {
    id: "tapatias",
    name: "Tapatías Taquería",
    url: "https://tapatias-premium-demo.vercel.app/",
    domain: "tapatias-premium-demo.vercel.app",
    badgeType: "concept",
    screenshot: "/work/tapatias.jpg",
    es: {
      industry: "Restaurante",
      badge: "Concepto privado",
      description:
        "Concepto premium para restaurante: branding moderno, showcase de menú, visuales de comida y secciones de conversión para llamadas, visitas y catering.",
      tags: ["Branding", "Menú", "Catering", "Local SEO"],
    },
    en: {
      industry: "Restaurant",
      badge: "Private concept",
      description:
        "Premium restaurant concept: modern branding, menu showcase, food visuals and conversion sections for calls, visits and catering.",
      tags: ["Branding", "Menu", "Catering", "Local SEO"],
    },
  },
  {
    id: "landscaping",
    name: "Landscaping Premium",
    url: "https://landscaping-premium-demo.vercel.app/",
    domain: "landscaping-premium-demo.vercel.app",
    badgeType: "concept",
    screenshot: "/work/landscaping.jpg",
    es: {
      industry: "Servicios · Jardinería",
      badge: "Demo de servicio",
      description:
        "Concepto para negocio de jardinería y servicios locales: confianza, visuales de antes/después, presentación de servicios y captación de clientes.",
      tags: ["Antes/Después", "Confianza", "Servicios", "Captación"],
    },
    en: {
      industry: "Services · Landscaping",
      badge: "Service demo",
      description:
        "Concept for a landscaping and local-services business: trust, before/after visuals, service presentation and lead capture.",
      tags: ["Before/After", "Trust", "Services", "Lead capture"],
    },
  },
  {
    id: "chino",
    name: "Chino Electrodomésticos",
    url: "https://chino-electrodomesticos.vercel.app/",
    domain: "chino-electrodomesticos.vercel.app",
    badgeType: "concept",
    screenshot: "/work/chino-v2.jpg",
    es: {
      industry: "Electrodomésticos · Ecommerce",
      badge: "Demo ecommerce",
      description:
        "Concepto para negocio de electrodomésticos: estructura enfocada en producto, presentación tipo catálogo, secciones de confianza y layout orientado a ventas.",
      tags: ["Catálogo", "Producto", "Ventas", "Confianza"],
    },
    en: {
      industry: "Appliances · Ecommerce",
      badge: "Ecommerce demo",
      description:
        "Concept for an appliance business: product-focused structure, catalog-style presentation, trust sections and a sales-oriented layout.",
      tags: ["Catalog", "Product", "Sales", "Trust"],
    },
  },
];

function localizeProjects(lang: Lang): Project[] {
  return RAW_PROJECTS.map((p) => ({
    id: p.id,
    name: p.name,
    url: p.url,
    domain: p.domain,
    badgeType: p.badgeType,
    screenshot: p.screenshot,
    ...p[lang],
  }));
}

export function Portfolio() {
  const { lang } = useLang();
  const projects = localizeProjects(lang);
  return (
    <section
      id="trabajo"
      className="relative py-10 sm:py-16 bg-ink-950/40 overflow-hidden"
    >
      {/* Ambient warm glow behind the grid */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1100px] h-[70vh] rounded-full bg-ember-400/[0.06] blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="container relative">
        <Reveal>
          <SectionHeading
            eyebrow={lang === "en" ? "Work & concepts" : "Trabajo y conceptos"}
            title={
              lang === "en" ? (
                <>
                  Selected work and{" "}
                  <span className="gradient-text">premium concepts.</span>
                </>
              ) : (
                <>
                  Trabajo seleccionado y{" "}
                  <span className="gradient-text">conceptos premium.</span>
                </>
              )
            }
            description={
              lang === "en"
                ? "Real builds and high-end concept demos, created to show how a local business can look more professional, earn trust faster and turn more visitors into customers."
                : "Builds reales y demos conceptuales de alto nivel, creados para mostrar cómo un negocio local puede verse más profesional, generar confianza más rápido y convertir más visitantes en clientes."
            }
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <CardReveal key={p.id} index={i}>
              <ProjectCard project={p} lang={lang} />
            </CardReveal>
          ))}
        </div>

        {/* Honest trust note */}
        <Reveal>
          <p className="mt-10 max-w-3xl mx-auto text-center text-[13px] leading-relaxed text-ember-50/55">
            {lang === "en"
              ? "Some projects are private concept demos created for presentation purposes: they show the level of design, strategy and functionality we deliver. Brand names are used for demonstration only."
              : "Algunos proyectos son conceptos privados creados con fines de presentación: muestran el nivel de diseño, estrategia y funcionalidad que entregamos. Las marcas mostradas se usan solo con fines demostrativos."}
          </p>
        </Reveal>

        {/* Conversion bridge into the offer */}
        <Reveal>
          <p className="mt-6 text-center text-sm text-ember-50/70">
            {lang === "en" ? (
              <>
                Want a site like this for your business?{" "}
                <a
                  href="#contact"
                  className="text-ember-300 hover:text-ember-200 underline-offset-4 hover:underline"
                >
                  Ask for a quote
                </a>
                .
              </>
            ) : (
              <>
                ¿Quieres un sitio así para tu negocio?{" "}
                <a
                  href="#contact"
                  className="text-ember-300 hover:text-ember-200 underline-offset-4 hover:underline"
                >
                  Pídenos una cotización
                </a>
                .
              </>
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────
// Staggered "fly-in" entrance — each card arrives one after another from
// its side (even = left, odd = right). Fires once when it scrolls into
// view (not scroll-driven, so no jank / no horizontal overflow), and
// collapses to a simple state under prefers-reduced-motion.
// ─────────────────────────────────────────────────
function CardReveal({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const fromLeft = index % 2 === 0;

  if (reduced) {
    return <div className="h-full">{children}</div>;
  }

  return (
    <motion.div
      className="h-full will-change-transform"
      initial={{
        opacity: 0,
        x: fromLeft ? -64 : 64,
        y: 28,
        rotate: fromLeft ? -3 : 3,
        scale: 0.94,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────
// Single project card — whole card links to the real site
// ─────────────────────────────────────────────────
function ProjectCard({ project: p, lang }: { project: Project; lang: Lang }) {
  const isLive = p.badgeType === "live";

  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        lang === "en"
          ? `Open ${p.name} (opens in a new tab)`
          : `Ver proyecto ${p.name} (abre en una pestaña nueva)`
      }
      className="group relative block h-full rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.035] to-white/[0.01] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:border-ember-300/35 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_-20px_rgba(236,139,42,0.35)] no-tap-highlight"
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

      {/* Status badge */}
      <div className="absolute top-7 right-7 z-10 sm:top-8 sm:right-8">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.16em] font-medium border backdrop-blur-md",
            isLive
              ? "border-emerald-400/35 bg-emerald-400/[0.10] text-emerald-200"
              : "border-ember-300/35 bg-ember-300/[0.10] text-ember-300",
          )}
        >
          {isLive ? (
            <span className="relative grid place-items-center">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </span>
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-ember-300/80" />
          )}
          {p.badge}
        </span>
      </div>

      {/* Real site preview — browser chrome + actual screenshot */}
      <div className="relative rounded-2xl border border-white/[0.07] overflow-hidden bg-ink-900 aspect-[16/10] flex flex-col">
        {/* Browser chrome with the real domain */}
        <div className="relative z-10 flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] bg-ink-950/85 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-ember-400/70" />
            <span className="w-1.5 h-1.5 rounded-full bg-ember-300/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-ember-200/50" />
          </div>
          <div className="flex-1 flex justify-center min-w-0">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.06] text-[8px] sm:text-[9px] text-ember-50/75 font-mono truncate max-w-full">
              <span className="w-1 h-1 rounded-full bg-ember-300/70 shrink-0" />
              <span className="truncate">{p.domain}</span>
            </div>
          </div>
          <ExternalLink className="w-3 h-3 text-ember-50/40 shrink-0 transition-colors group-hover:text-ember-300" />
        </div>

        {/* Actual screenshot of the live site */}
        <div className="relative flex-1 overflow-hidden">
          <Image
            src={p.screenshot}
            alt={`${p.name} — sitio web de ${p.industry} diseñado por Leyva Web Studio en Cleveland, Ohio`}
            fill
            sizes="(max-width: 768px) 92vw, 46vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Warm hover wash to tie it into the brand */}
          <div className="absolute inset-0 bg-ember-500/0 group-hover:bg-ember-500/[0.06] transition-colors duration-500" />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-ink-950/40 to-transparent pointer-events-none" />
        </div>

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/40 to-transparent z-10" />
      </div>

      {/* Meta */}
      <div className="relative mt-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-ember-300/85">
          {p.industry}
        </p>
        <h3 className="mt-1 text-xl font-semibold text-ember-50">{p.name}</h3>
        <p className="mt-2 text-sm text-ember-50/70 leading-relaxed">
          {p.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[11px] text-ember-50/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-ember-300/30 bg-ember-300/[0.06] px-4 py-2 text-[13px] font-medium text-ember-50 transition-colors group-hover:bg-ember-300/[0.14] group-hover:border-ember-300/55">
          {lang === "en" ? "View project" : "Ver proyecto"}
          <ExternalLink className="w-3.5 h-3.5 text-ember-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
