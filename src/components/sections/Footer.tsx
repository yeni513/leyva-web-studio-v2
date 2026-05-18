"use client";

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
import { site, whatsappLink, mailtoLink } from "@/lib/site";
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
}

const estudioItems: FooterItem[] = [
  {
    id: "servicios",
    icon: Sparkles,
    label: "Servicios",
    modalTitle: "Lo que entregamos en cada proyecto",
    modalDesc:
      "Diseño hecho a la medida con todo lo que tu negocio necesita para verse profesional online — sin plantillas, sin templates de WordPress.",
    bullets: [
      "Diseño cinematográfico premium",
      "Mobile-first probado en celulares reales",
      "Velocidad y Core Web Vitals optimizados",
      "SEO local + Google Maps",
      "Catálogos, reservas y WhatsApp",
      "Soporte y mantenimiento mensual",
    ],
    navigateTo: "#servicios",
    navigateLabel: "Ver sistema orbital de servicios",
  },
  {
    id: "proceso",
    icon: Compass,
    label: "Proceso",
    modalTitle: "De la primera llamada al lanzamiento",
    modalDesc:
      "Un proceso claro de 14 días sin sorpresas. Tú apruebas en cada etapa, nosotros entregamos.",
    bullets: [
      "Día 1 — Descubrimiento: llamada de 30 min sobre tu negocio",
      "Días 2–5 — Diseño: propuesta visual + copy en español",
      "Días 6–12 — Desarrollo: construimos en Next.js, lo revisas en vivo",
      "Día 13–14 — Lanzamiento: dominio, analítica y handoff",
    ],
    navigateTo: "#proceso",
    navigateLabel: "Ver proceso detallado",
  },
  {
    id: "paquetes",
    icon: CreditCard,
    label: "Paquetes",
    modalTitle: "Precio claro, sin sorpresas",
    modalDesc:
      "Tres paquetes para distintos momentos de tu negocio. Si necesitas algo a la medida también lo cotizamos.",
    bullets: [
      "Esencial — $1,500 USD · Sitio premium de una página",
      "Crecimiento — $3,500 USD · Multipágina + reservas (más popular)",
      "Autoridad — Desde $6,500 USD · Sistema de marca completo",
      "Pagos en USD · 50% de anticipo, 50% al entregar",
    ],
    navigateTo: "#paquetes",
    navigateLabel: "Comparar paquetes",
  },
  {
    id: "trabajo",
    icon: Briefcase,
    label: "Trabajo",
    modalTitle: "Casos de muestra",
    modalDesc:
      "Cuatro conceptos basados en proyectos reales. Haz clic en cualquier card del portfolio para abrir el preview completo del sitio.",
    bullets: [
      "Casa Olivar — Restaurante en CDMX · +38% reservas en 60 días",
      "Estructuras Vela — Contratista en Ohio · 12 cotizaciones/mes",
      "Norte Realty — Inmobiliaria en Cleveland · x3 leads calificados",
      "Don Felipe Barber — Barbería en Houston · agenda llena 3 semanas",
    ],
    navigateTo: "#trabajo",
    navigateLabel: "Ver portfolio completo",
  },
];

const negociosItems: FooterItem[] = [
  {
    id: "restaurantes",
    icon: UtensilsCrossed,
    label: "Restaurantes",
    modalTitle: "Sitios para restaurantes",
    modalDesc:
      "Capturamos la atmósfera de tu lugar online — el visitante reserva antes de cerrar la pestaña. Funciona desde food trucks hasta fine dining.",
    bullets: [
      "Menú digital cinematográfico que tú actualizas",
      "Reservas por WhatsApp + agenda online sincronizada",
      "Galería de platos con fotos optimizadas",
      "Mapa interactivo + horarios siempre frescos",
      "Caso de muestra: Casa Olivar — Roma Norte, CDMX",
    ],
    navigateTo: "#trabajo",
    navigateLabel: "Ver el caso Casa Olivar",
  },
  {
    id: "contratistas",
    icon: HardHat,
    label: "Contratistas",
    modalTitle: "Sitios para contratistas",
    modalDesc:
      "Portafolio digital que genera cotizaciones serias. Mostramos tu trabajo, tu equipo y tu zona — la gente que te contacta ya viene calificada.",
    bullets: [
      "Portafolio de obras organizadas por tipo",
      "Garantía clara comunicada sin letra chica",
      "Cotización 24h directa al WhatsApp del dueño",
      "Mapa con tu zona de cobertura",
      "Caso de muestra: Estructuras Vela — Ohio, EE. UU.",
    ],
    navigateTo: "#trabajo",
    navigateLabel: "Ver el caso Estructuras Vela",
  },
  {
    id: "inmobiliarias",
    icon: Home,
    label: "Inmobiliarias",
    modalTitle: "Sitios para inmobiliarias",
    modalDesc:
      "Plataforma de listados con filtros, fichas detalladas y CTAs por propiedad. Los prospectos llegan precalificados con preguntas específicas.",
    bullets: [
      "200+ propiedades con filtros (precio, recámaras, zona)",
      "Tour virtual 360° por propiedad",
      "Agenda visitas directo por WhatsApp en la ficha",
      "Vecindarios curados con datos reales",
      "Caso de muestra: Norte Realty — Cleveland & Columbus",
    ],
    navigateTo: "#trabajo",
    navigateLabel: "Ver el caso Norte Realty",
  },
  {
    id: "locales",
    icon: Scissors,
    label: "Servicios locales",
    modalTitle: "Sitios para servicios locales",
    modalDesc:
      "Barberías, salones, plomería, limpieza, autoservicio, gimnasios. Sitios dark elegantes con agenda online y WhatsApp directo.",
    bullets: [
      "Menú de servicios con precios claros",
      "Agenda online cada 30 min con confirmación",
      "Galería de trabajo que se actualiza con cada cliente",
      "Ubicación, horarios y estacionamiento",
      "Caso de muestra: Don Felipe Barber — Houston, TX",
    ],
    navigateTo: "#trabajo",
    navigateLabel: "Ver el caso Don Felipe Barber",
  },
];

const EASE_PREMIUM = cubicBezier(0.22, 1, 0.36, 1);

export function Footer() {
  const [active, setActive] = useState<FooterItem | null>(null);

  return (
    <footer className="relative border-t border-white/[0.06] bg-ink-950">
      {/* Big CTA strip */}
      <div className="container py-20 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-ember-300/25 bg-gradient-to-br from-ember-300/[0.10] via-white/[0.02] to-white/[0.01] p-8 sm:p-12 shadow-glow">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-ember-400/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-ember-600/15 blur-3xl pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-ember-300">
                ¿Listo para verte premium?
              </p>
              <h2 className="mt-3 font-display font-semibold tracking-tight text-[clamp(1.8rem,4.5vw,3rem)] leading-[1.05] text-ember-50 max-w-2xl">
                Tu próximo cliente está buscando tu negocio.{" "}
                <span className="gradient-text">
                  Asegúrate de que te encuentre bien.
                </span>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 font-medium hover:shadow-glow transition-all"
              >
                Obtén mi sitio web
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={whatsappLink(
                  "Hola Leyva, quiero información sobre los paquetes.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-ember-300/30 bg-ember-300/[0.04] text-ember-50 hover:bg-ember-300/[0.10] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Hablar por WhatsApp
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
              Estudio web premium para negocios locales. Diseñamos sitios
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
          <p>Hecho con Next.js, cuidado y café fuerte.</p>
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

  const handleNavigate = (href: string) => {
    onClose();
    setTimeout(() => {
      const id = href.replace("#", "");
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 380);
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
              className="absolute top-4 right-4 grid place-items-center w-9 h-9 rounded-full border border-white/[0.10] bg-white/[0.04] text-ember-50/70 hover:text-ember-50 hover:bg-white/[0.10] hover:border-white/[0.20] transition-colors no-tap-highlight"
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
                  onClick={() => handleNavigate("#contact")}
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
