import {
  LayoutTemplate,
  Smartphone,
  Gauge,
  Search,
  ShoppingCart,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const services = [
  {
    icon: LayoutTemplate,
    title: "Sitios web a la medida",
    desc: "Diseño cinematográfico, copy persuasivo y desarrollo limpio en Next.js. Tu sitio se ve premium en cualquier pantalla.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first real",
    desc: "Probado en celulares reales, no solo en DevTools. Cero secciones rotas, cero contenido oculto, cero scroll horizontal.",
  },
  {
    icon: Gauge,
    title: "Velocidad y Core Web Vitals",
    desc: "Imágenes optimizadas, fuentes locales y código limpio. Tu sitio carga rápido y Google lo nota.",
  },
  {
    icon: Search,
    title: "SEO local",
    desc: "Estructura, metadatos y contenido pensados para que clientes de tu ciudad te encuentren primero.",
  },
  {
    icon: ShoppingCart,
    title: "Catálogos y reservas",
    desc: "Menús digitales, listados de propiedades, catálogo de servicios y reservas por WhatsApp. Sin fricción.",
  },
  {
    icon: Wrench,
    title: "Soporte y mantenimiento",
    desc: "Cambios mensuales, monitoreo y respaldos. Tu sitio se mantiene impecable mes con mes.",
  },
];

export function Services() {
  return (
    <section id="servicios" className="relative py-24 sm:py-32">
      <div className="container">
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
            description="No vendemos plantillas. Diseñamos cada sitio desde cero alrededor de tu negocio, tu cliente ideal y la acción que necesitas que tomen."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.title} delay={i * 0.05} as="article">
                <a
                  href="#contact"
                  className="group relative block h-full rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 sm:p-7 transition-all duration-500 hover:border-ember-300/30 hover:from-ember-300/[0.06] hover:to-white/[0.01] shadow-card"
                >
                  {/* Animated border glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "radial-gradient(400px circle at var(--x,50%) var(--y,0%), rgba(236,139,42,0.10), transparent 40%)",
                    }}
                  />
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
    </section>
  );
}
