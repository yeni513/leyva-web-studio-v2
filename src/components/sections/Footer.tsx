import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { site, whatsappLink, mailtoLink } from "@/lib/site";

const cols = [
  {
    title: "Estudio",
    links: [
      { label: "Servicios", href: "#servicios" },
      { label: "Proceso", href: "#proceso" },
      { label: "Paquetes", href: "#paquetes" },
      { label: "Trabajo", href: "#trabajo" },
    ],
  },
  {
    title: "Para negocios",
    links: [
      { label: "Restaurantes", href: "#contact" },
      { label: "Contratistas", href: "#contact" },
      { label: "Inmobiliarias", href: "#contact" },
      { label: "Servicios locales", href: "#contact" },
    ],
  },
];

export function Footer() {
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
                <span className="gradient-text">Asegúrate de que te encuentre bien.</span>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-2">
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
                className="inline-flex items-center gap-2 hover:text-ember-300"
              >
                <MessageCircle className="w-4 h-4 text-ember-300/80" />
                {site.contact.whatsappDisplay}
              </a>
              <a
                href={mailtoLink("Contacto", "Hola Leyva")}
                className="inline-flex items-center gap-2 hover:text-ember-300"
              >
                <Mail className="w-4 h-4 text-ember-300/80" />
                {site.contact.email}
              </a>
              <span className="text-ember-50/45 text-[13px]">
                {site.contact.location}
              </span>
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-[11px] uppercase tracking-[0.22em] text-ember-50/45">
                {c.title}
              </p>
              <ul className="mt-4 space-y-2.5 text-sm text-ember-50/75">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="hover:text-ember-300 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-ember-50/45">
          <p>
            © {new Date().getFullYear()} {site.brand} {site.brandSub}. Todos los
            derechos reservados.
          </p>
          <p>Hecho con Next.js, cuidado y café fuerte.</p>
        </div>
      </div>
    </footer>
  );
}
