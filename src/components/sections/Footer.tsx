"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  cubicBezier,
  motion,
} from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Compass,
  CreditCard,
  HardHat,
  Home,
  Mail,
  MessageCircle,
  Scissors,
  Sparkles,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from "lucide-react";
import { BrandMark } from "@/components/brand";
import { getBookingUrl, site, whatsappLink, mailtoLink } from "@/lib/site";
import { prefillQuote, type QuotePrefill } from "@/lib/prefill-quote";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface FooterItem {
  id: string;
  icon: LucideIcon;
  label: string;
  modalTitle: string;
  modalDesc: string;
  bullets: string[];
  navigateTo: string;
  navigateLabel: string;
  /** Context passed to the form when the modal's "Cotizar" button is clicked. */
  prefill: QuotePrefill;
}

type FooterCopy = Pick<
  FooterItem,
  "label" | "modalTitle" | "modalDesc" | "bullets" | "navigateLabel"
>;

interface RawFooterItem {
  id: string;
  icon: LucideIcon;
  navigateTo: string;
  prefill: QuotePrefill;
  es: FooterCopy;
  en: FooterCopy;
}

function localizeFooter(items: RawFooterItem[], lang: Lang): FooterItem[] {
  return items.map((it) => ({
    id: it.id,
    icon: it.icon,
    navigateTo: it.navigateTo,
    prefill: it.prefill,
    ...it[lang],
  }));
}

const ESTUDIO_RAW: RawFooterItem[] = [
  {
    id: "servicios",
    icon: Sparkles,
    navigateTo: "#servicios",
    prefill: {
      type: "Sitio nuevo",
      message: "Quiero información sobre los servicios.",
      fromLabel: "Servicios (footer)",
    },
    es: {
      label: "Servicios",
      modalTitle: "Lo que entregamos en cada proyecto",
      modalDesc: "Diseño hecho a la medida con todo lo que tu negocio necesita para verse profesional online — sin plantillas, sin templates de WordPress.",
      bullets: [
        "Diseño cinematográfico hecho a la medida",
        "Mobile-first probado en celulares reales",
        "Velocidad y Core Web Vitals optimizados",
        "SEO local + Google Maps",
        "Catálogos, reservas y WhatsApp",
        "Soporte y mantenimiento mensual",
      ],
      navigateLabel: "Ver sistema orbital de servicios",
    },
    en: {
      label: "Services",
      modalTitle: "What we deliver in every project",
      modalDesc: "Custom design with everything your business needs to look professional online — no templates, no WordPress page-builders.",
      bullets: [
        "Custom cinematic design",
        "Mobile-first tested on real phones",
        "Speed & Core Web Vitals optimized",
        "Local SEO + Google Maps",
        "Catalogs, bookings & WhatsApp",
        "Monthly support & maintenance",
      ],
      navigateLabel: "See the orbital services system",
    },
  },
  {
    id: "proceso",
    icon: Compass,
    navigateTo: "#proceso",
    prefill: {
      type: "Sitio nuevo",
      timeline: "En 30 días",
      message: "Me interesa empezar pronto. Cuéntenme más sobre el proceso de 14 días.",
      fromLabel: "Proceso (footer)",
    },
    es: {
      label: "Proceso",
      modalTitle: "De la primera llamada al lanzamiento",
      modalDesc: "Un proceso claro de 14 días sin sorpresas. Tú apruebas en cada etapa, nosotros entregamos.",
      bullets: [
        "Día 1 — Descubrimiento: llamada de 30 min sobre tu negocio",
        "Días 2–5 — Diseño: propuesta visual + copy en español",
        "Días 6–12 — Desarrollo: construimos en Next.js, lo revisas en vivo",
        "Día 13–14 — Lanzamiento: dominio, analítica y handoff",
      ],
      navigateLabel: "Ver proceso detallado",
    },
    en: {
      label: "Process",
      modalTitle: "From the first call to launch",
      modalDesc: "A clear 14-day process with no surprises. You approve at every stage, we deliver.",
      bullets: [
        "Day 1 — Discovery: 30-min call about your business",
        "Days 2–5 — Design: visual proposal + copy",
        "Days 6–12 — Development: we build in Next.js, you review live",
        "Day 13–14 — Launch: domain, analytics and handoff",
      ],
      navigateLabel: "See the detailed process",
    },
  },
  {
    id: "paquetes",
    icon: CreditCard,
    navigateTo: "#paquetes",
    prefill: {
      type: "Sitio nuevo",
      message: "Quiero información sobre los paquetes.",
      fromLabel: "Paquetes (footer)",
    },
    es: {
      label: "Paquetes",
      modalTitle: "Pago inicial + plan mensual",
      modalDesc: "Pago inicial para construir el sitio + plan mensual de cuidado y crecimiento. Sin contratos eternos, sin costos escondidos.",
      bullets: [
        "Starter Local — $900 + $99/mes · Landing premium para negocios locales",
        "Growth Pro — $1,800 + $149/mes · Multipágina enfocada en conversión (recomendado)",
        "Authority Premium — $3,500 + $299/mes · Marca premium con estrategia",
        "Plan mensual mantiene tu sitio rápido, seguro y actualizado",
        "Dominio y código siempre a nombre del cliente",
      ],
      navigateLabel: "Comparar paquetes",
    },
    en: {
      label: "Pricing",
      modalTitle: "Setup fee + monthly plan",
      modalDesc: "A setup fee to build the site + a monthly care and growth plan. No endless contracts, no hidden costs.",
      bullets: [
        "Starter Local — $900 + $99/mo · Premium landing for local businesses",
        "Growth Pro — $1,800 + $149/mo · Multi-page focused on conversion (recommended)",
        "Authority Premium — $3,500 + $299/mo · Premium brand with strategy",
        "The monthly plan keeps your site fast, secure and current",
        "Domain and code always in the client's name",
      ],
      navigateLabel: "Compare packages",
    },
  },
  {
    id: "trabajo",
    icon: Briefcase,
    navigateTo: "#trabajo",
    prefill: {
      type: "Sitio nuevo",
      message: "Vi el portfolio y me gustaría algo del mismo nivel.",
      fromLabel: "Portfolio (footer)",
    },
    es: {
      label: "Trabajo",
      modalTitle: "Trabajo y conceptos premium",
      modalDesc: "Un build oficial en vivo más conceptos premium por industria. Abre cualquiera para ver el sitio real en una pestaña nueva.",
      bullets: [
        "Leyva Web Studio · sitio oficial en vivo (Next.js + Cloudflare)",
        "Tapatías Taquería · concepto premium para restaurante",
        "Landscaping · demo para negocio de servicios",
        "Chino Electrodomésticos · demo ecommerce de productos",
      ],
      navigateLabel: "Ver trabajo y conceptos",
    },
    en: {
      label: "Work",
      modalTitle: "Work & premium concepts",
      modalDesc: "One live official build plus premium concepts by industry. Open any of them to see the real site in a new tab.",
      bullets: [
        "Leyva Web Studio · official live site (Next.js + Cloudflare)",
        "Tapatías Taquería · premium restaurant concept",
        "Landscaping · demo for a service business",
        "Chino Appliances · ecommerce product demo",
      ],
      navigateLabel: "See work & concepts",
    },
  },
];

const NEGOCIOS_RAW: RawFooterItem[] = [
  {
    id: "restaurantes",
    icon: UtensilsCrossed,
    navigateTo: "#trabajo",
    prefill: {
      type: "Sitio nuevo",
      industry: "Restaurante",
      message: "Tengo un restaurante y quiero un sitio con menú digital, reservas por WhatsApp y galería.",
      fromLabel: "Restaurantes",
    },
    es: {
      label: "Restaurantes",
      modalTitle: "Sitios para restaurantes",
      modalDesc: "Capturamos la atmósfera de tu lugar online — el visitante reserva antes de cerrar la pestaña. Funciona desde food trucks hasta fine dining.",
      bullets: [
        "Menú digital cinematográfico que tú actualizas",
        "Reservas por WhatsApp + agenda online sincronizada",
        "Galería de platos con fotos optimizadas",
        "Mapa interactivo + horarios siempre frescos",
        "Demo en vivo: \"Tapatías Taquería\" — concepto premium",
      ],
      navigateLabel: "Ver concepto Restaurante",
    },
    en: {
      label: "Restaurants",
      modalTitle: "Websites for restaurants",
      modalDesc: "We capture the atmosphere of your place online — visitors book before closing the tab. Works from food trucks to fine dining.",
      bullets: [
        "Cinematic digital menu you update yourself",
        "WhatsApp reservations + synced online calendar",
        "Dish gallery with optimized photos",
        "Interactive map + always-fresh hours",
        "Live demo: \"Tapatías Taquería\" — premium concept",
      ],
      navigateLabel: "See the Restaurant concept",
    },
  },
  {
    id: "contratistas",
    icon: HardHat,
    navigateTo: "#trabajo",
    prefill: {
      type: "Sitio nuevo",
      industry: "Contratista / Constructor",
      message: "Soy contratista y quiero un portafolio digital con galería de obras y cotización por WhatsApp.",
      fromLabel: "Contratistas",
    },
    es: {
      label: "Contratistas",
      modalTitle: "Sitios para contratistas",
      modalDesc: "Portafolio digital que genera cotizaciones serias. Mostramos tu trabajo, tu equipo y tu zona — la gente que te contacta ya viene calificada.",
      bullets: [
        "Portafolio de obras organizadas por tipo",
        "Garantía clara comunicada sin letra chica",
        "Cotización 24h directa al WhatsApp del dueño",
        "Mapa con tu zona de cobertura",
        "Portafolio de obras a la medida según tu trabajo",
      ],
      navigateLabel: "Ver concepto Contratista",
    },
    en: {
      label: "Contractors",
      modalTitle: "Websites for contractors",
      modalDesc: "A digital portfolio that generates serious quotes. We show your work, your team and your service area — the people who contact you arrive pre-qualified.",
      bullets: [
        "Portfolio of projects organized by type",
        "Clear guarantee communicated without fine print",
        "24h quote straight to the owner's WhatsApp",
        "Map of your coverage area",
        "Custom project portfolio based on your work",
      ],
      navigateLabel: "See the Contractor concept",
    },
  },
  {
    id: "inmobiliarias",
    icon: Home,
    navigateTo: "#trabajo",
    prefill: {
      type: "Sitio nuevo",
      industry: "Inmobiliaria",
      message: "Manejo una inmobiliaria y quiero una plataforma con listados, filtros y CTA a WhatsApp por propiedad.",
      fromLabel: "Inmobiliarias",
    },
    es: {
      label: "Inmobiliarias",
      modalTitle: "Sitios para inmobiliarias",
      modalDesc: "Plataforma de listados con filtros, fichas detalladas y CTAs por propiedad. Los prospectos llegan precalificados con preguntas específicas.",
      bullets: [
        "Catálogo de propiedades con filtros (precio, recámaras, zona)",
        "Tour virtual 360° por propiedad",
        "Agenda visitas directo por WhatsApp en la ficha",
        "Vecindarios curados con datos reales",
        "Catálogo de propiedades a la medida según tu inventario",
      ],
      navigateLabel: "Ver concepto Inmobiliaria",
    },
    en: {
      label: "Real estate",
      modalTitle: "Websites for real estate",
      modalDesc: "A listings platform with filters, detailed cards and CTAs per property. Prospects arrive pre-qualified with specific questions.",
      bullets: [
        "Property catalog with filters (price, bedrooms, area)",
        "360° virtual tour per property",
        "Book visits straight via WhatsApp on the listing",
        "Curated neighborhoods with real data",
        "Custom property catalog based on your inventory",
      ],
      navigateLabel: "See the Real estate concept",
    },
  },
  {
    id: "locales",
    icon: Scissors,
    navigateTo: "#trabajo",
    prefill: {
      type: "Sitio nuevo",
      industry: "Barbería / Estética",
      message: "Tengo un servicio local y quiero un sitio elegante con menú de servicios, agenda online y galería.",
      fromLabel: "Servicios locales",
    },
    es: {
      label: "Servicios locales",
      modalTitle: "Sitios para servicios locales",
      modalDesc: "Barberías, salones, plomería, limpieza, autoservicio, gimnasios. Sitios dark elegantes con agenda online y WhatsApp directo.",
      bullets: [
        "Menú de servicios con precios claros",
        "Agenda online cada 30 min con confirmación",
        "Galería de trabajo que se actualiza con cada cliente",
        "Ubicación, horarios y estacionamiento",
        "Demo en vivo: \"Landscaping\" — negocio de servicios",
      ],
      navigateLabel: "Ver concepto Servicios",
    },
    en: {
      label: "Local services",
      modalTitle: "Websites for local services",
      modalDesc: "Barbers, salons, plumbing, cleaning, auto, gyms. Elegant dark sites with online booking and direct WhatsApp.",
      bullets: [
        "Services menu with clear prices",
        "Online booking every 30 min with confirmation",
        "Work gallery that updates with each client",
        "Location, hours and parking",
        "Live demo: \"Landscaping\" — service business",
      ],
      navigateLabel: "See the Services concept",
    },
  },
];

const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);

export function Footer() {
  const { lang } = useLang();
  const en = lang === "en";
  const estudioItems = localizeFooter(ESTUDIO_RAW, lang);
  const negociosItems = localizeFooter(NEGOCIOS_RAW, lang);
  const [active, setActive] = useState<FooterItem | null>(null);
  const bookingUrl = getBookingUrl();

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      {/* Big CTA strip */}
      <div className="container py-10 sm:py-16">
        <div className="relative overflow-hidden rounded-3xl border border-ember-300/25 bg-gradient-to-br from-ember-300/[0.10] via-white/[0.02] to-white/[0.01] p-8 sm:p-12 shadow-glow">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-ember-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-ember-600/15 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-ember-300">
                {en ? "Ready to look premium?" : "¿Listo para verte premium?"}
              </p>
              <h2 className="mt-3 font-display font-semibold tracking-tight text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.05] text-ember-50 max-w-2xl">
                {en ? (
                  <>
                    Your next customer is searching for your business.{" "}
                    <span className="gradient-text">
                      Make sure they find you looking good.
                    </span>
                  </>
                ) : (
                  <>
                    Tu próximo cliente está buscando tu negocio.{" "}
                    <span className="gradient-text">
                      Asegúrate de que te encuentre bien.
                    </span>
                  </>
                )}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {bookingUrl ? (
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 font-medium hover:shadow-glow transition-all"
                >
                  {en ? "Book 15 min" : "Agendar 15 min"}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 font-medium hover:shadow-glow transition-all"
                >
                  {en ? "Get my website" : "Obtén mi sitio web"}
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              )}
              <a
                href={whatsappLink(
                  en
                    ? "Hi Leyva, I'd like info about your packages."
                    : "Hola Leyva, quiero información sobre los paquetes.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-ember-300/30 bg-ember-300/[0.04] text-ember-50 hover:bg-ember-300/[0.10] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                {en ? "Chat on WhatsApp" : "Hablar por WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="container pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
          {/* Brand column */}
          <div className="md:col-span-5">
            <BrandMark />
            <p className="mt-4 max-w-sm text-sm text-ember-50/60 leading-relaxed">
              Estudio web hecho a la medida para negocios locales. Diseñamos sitios
              cinematográficos que convierten visitantes en clientes.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-ember-50/70">
              <a
                href={whatsappLink("Hola Leyva")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-ember-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-ember-300/80" />
                {site.contact.whatsappDisplay}
              </a>
              <a
                href={mailtoLink("Contacto", "Hola Leyva")}
                className="inline-flex items-center gap-2 hover:text-ember-300 transition-colors"
              >
                <Mail className="w-4 h-4 text-ember-300/80" />
                {site.contact.email}
              </a>
              <span className="text-ember-50/45 text-[13px]">
                {site.contact.location}
              </span>
            </div>
          </div>

          {/* Estudio chips */}
          <FooterColumn
            title="Estudio"
            items={estudioItems}
            onOpen={setActive}
            className="md:col-span-3"
          />

          {/* Para negocios chips */}
          <FooterColumn
            title="Para negocios"
            items={negociosItems}
            onOpen={setActive}
            className="md:col-span-4"
          />
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ember-50/45">
          <p>
            © {new Date().getFullYear()} {site.brand} {site.brandSub}. Todos
            los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/privacidad"
              className="hover:text-ember-300 transition-colors"
            >
              Privacidad
            </a>
            <span className="w-1 h-1 rounded-full bg-ember-50/20" />
            <a
              href="/terminos"
              className="hover:text-ember-300 transition-colors"
            >
              Términos
            </a>
            <span className="w-1 h-1 rounded-full bg-ember-50/20" />
            <span>Diseñado y desarrollado por Leyva Web Studio.</span>
          </div>
        </div>
      </div>

      <ExplainerModal item={active} onClose={() => setActive(null)} />
    </footer>
  );
}

// ─────────────────────────────────────────────────
// Column of icon chips
// ─────────────────────────────────────────────────
function FooterColumn({
  title,
  items,
  onOpen,
  className,
}: {
  title: string;
  items: FooterItem[];
  onOpen: (item: FooterItem) => void;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <p className="text-[11px] uppercase tracking-[0.22em] text-ember-50/45 mb-4 flex items-center gap-2">
        <span className="w-1 h-1 rounded-full bg-ember-300/70" />
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onOpen(item)}
                aria-label={`Más información sobre ${item.label}`}
                className="group/chip relative flex items-center gap-3 w-full px-3 py-2.5 rounded-xl border border-white/[0.06] bg-gradient-to-r from-white/[0.025] to-transparent hover:border-ember-300/30 hover:from-ember-300/[0.08] hover:to-white/[0.01] transition-all duration-300 text-left no-tap-highlight"
              >
                {/* Soft hover glow on the chip */}
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover/chip:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(200px circle at 0% 50%, rgba(236,139,42,0.10), transparent 60%)",
                  }}
                  aria-hidden
                />
                <span className="relative grid place-items-center w-8 h-8 rounded-lg border border-ember-300/25 bg-ember-300/[0.06] text-ember-300 group-hover/chip:bg-ember-300/[0.14] group-hover/chip:border-ember-300/55 group-hover/chip:shadow-[0_0_14px_-2px_rgba(236,139,42,0.45)] transition-all duration-300 shrink-0">
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <span className="relative flex-1 text-sm font-medium text-ember-50/85 group-hover/chip:text-ember-50 transition-colors truncate">
                  {item.label}
                </span>
                <ArrowUpRight className="relative w-3.5 h-3.5 text-ember-50/30 group-hover/chip:text-ember-300 group-hover/chip:-translate-y-0.5 group-hover/chip:translate-x-0.5 transition-all duration-300 shrink-0" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────
// Explainer modal — small, elegant, focused
// ─────────────────────────────────────────────────
function ExplainerModal({
  item,
  onClose,
}: {
  item: FooterItem | null;
  onClose: () => void;
}) {
  const isOpen = item !== null;

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    // Remember what was focused so we can restore it on close (a11y).
    const trigger = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      trigger?.focus?.({ preventScroll: true });
    };
  }, [isOpen, onClose]);

  const handleNavigate = (href: string) => {
    onClose();
    setTimeout(() => {
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        // We're on a legal page (no section IDs) — bounce back to home
        window.location.assign("/" + href);
      }
    }, 380);
  };

  const handleCotizar = () => {
    if (!item) return;
    onClose();
    // If the contact section isn't on this page (legal routes), navigate
    // home with hash. Prefill data is dropped intentionally — the user
    // clicked a chip from the footer of a legal page, not from a
    // service/industry card mid-flow.
    if (!document.getElementById("contact")) {
      setTimeout(() => window.location.assign("/#contact"), 380);
      return;
    }
    prefillQuote(item.prefill, { scrollDelay: 420 });
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="footer-explainer-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-ink-950/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={item.modalTitle}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.35, ease: EASE_PREMIUM }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-ember-300/30 bg-gradient-to-b from-ink-900 to-ink-950 p-6 sm:p-8 shadow-[0_30px_90px_-10px_rgba(0,0,0,0.7)] overflow-hidden"
          >
            {/* Top hairline */}
            <div className="absolute -top-px inset-x-12 h-px bg-gradient-to-r from-transparent via-ember-300/50 to-transparent" />
            {/* Corner glow */}
            <div
              className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-ember-400/[0.12] blur-3xl pointer-events-none"
              aria-hidden
            />

            <button
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute top-3 right-3 grid place-items-center w-11 h-11 rounded-full border border-white/[0.10] bg-white/[0.04] text-ember-50/70 hover:text-ember-50 hover:bg-white/[0.10] hover:border-white/[0.20] transition-colors no-tap-highlight"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative">
              <span className="inline-grid place-items-center w-12 h-12 rounded-2xl border border-ember-300/35 bg-ember-300/[0.10] text-ember-300 shadow-[0_0_24px_-4px_rgba(236,139,42,0.55)]">
                <item.icon className="w-6 h-6" />
              </span>
              <h3 className="mt-5 font-display text-xl sm:text-2xl font-semibold text-ember-50 tracking-tight text-balance">
                {item.modalTitle}
              </h3>
              <p className="mt-3 text-sm sm:text-[15px] text-ember-50/75 leading-relaxed">
                {item.modalDesc}
              </p>

              <ul className="mt-5 space-y-2.5">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm text-ember-50/90 leading-snug"
                  >
                    <span className="mt-0.5 grid place-items-center w-4 h-4 rounded-full bg-ember-300/15 text-ember-300 shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => handleNavigate(item.navigateTo)}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 font-semibold text-sm shadow-[0_0_24px_-4px_rgba(236,139,42,0.55)] hover:shadow-[0_0_36px_-4px_rgba(236,139,42,0.80)] transition-shadow no-tap-highlight"
                >
                  {item.navigateLabel}
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCotizar}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-ember-300/30 bg-ember-300/[0.04] text-ember-50 text-sm hover:bg-ember-300/[0.12] hover:border-ember-300/50 transition-colors no-tap-highlight"
                >
                  <MessageCircle className="w-4 h-4 text-ember-300" />
                  Cotizar este servicio
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
