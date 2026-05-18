import { Code2, Coffee, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="about"
      aria-label="Quién está detrás de Leyva"
      className="relative py-16 sm:py-24 overflow-hidden"
    >
      {/* Ambient warm glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(236,139,42,0.08),transparent_70%)] pointer-events-none"
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

        <div className="mt-12 max-w-4xl mx-auto">
          <Reveal>
            <div className="relative grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-10 items-start rounded-3xl border border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-white/[0.01] p-6 sm:p-8 lg:p-10 overflow-hidden">
              <div
                className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-ember-400/[0.10] blur-3xl pointer-events-none"
                aria-hidden
              />

              {/* Founder portrait — SVG monogram until real photo is added */}
              <div className="relative shrink-0 mx-auto md:mx-0">
                <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border border-ember-300/30 shadow-[0_15px_40px_-10px_rgba(236,139,42,0.45)]">
                  <svg
                    viewBox="0 0 100 100"
                    className="w-full h-full"
                    aria-label="Founder portrait placeholder"
                    role="img"
                  >
                    <defs>
                      <radialGradient id="founder" cx="0.35" cy="0.30" r="0.85">
                        <stop offset="0%" stopColor="#fdc97a" />
                        <stop offset="55%" stopColor="#ec8b2a" />
                        <stop offset="100%" stopColor="#5a2c0a" />
                      </radialGradient>
                    </defs>
                    <rect width="100" height="100" fill="url(#founder)" />
                    <circle cx="32" cy="30" r="20" fill="rgba(255, 244, 224, 0.18)" />
                    <circle cx="80" cy="85" r="32" fill="rgba(7, 6, 8, 0.20)" />
                    <text
                      x="50"
                      y="60"
                      textAnchor="middle"
                      fontSize="34"
                      fontWeight="700"
                      fill="#fff4e0"
                      fontFamily="Inter, sans-serif"
                      letterSpacing="-1"
                    >
                      L
                    </text>
                  </svg>
                </div>
              </div>

              <div className="relative">
                <p className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-ember-50 leading-tight">
                  Alexander, fundador de Leyva.
                </p>
                <p className="mt-4 text-[15px] sm:text-base text-ember-50/80 leading-relaxed">
                  Llevo años construyendo sitios para negocios locales en EE.
                  UU. y LATAM. La razón de Leyva es simple: vi demasiados
                  dueños de negocio pagando $200/mes a plantillas genéricas
                  que no convierten, o $15K USD a agencias que tardan 4
                  meses y desaparecen después del lanzamiento.
                </p>
                <p className="mt-3 text-[15px] sm:text-base text-ember-50/80 leading-relaxed">
                  Yo trabajo distinto: te entrego un sitio hecho a la medida
                  en 7–14 días, con código tuyo desde el día 1, y soporte
                  directo conmigo cuando lo necesites — no con un ticket
                  perdido en un help desk.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Pill icon={MapPin}>Ohio, EE. UU.</Pill>
                  <Pill icon={Code2}>Next.js + TypeScript</Pill>
                  <Pill icon={Coffee}>Disponible Lun–Vie</Pill>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Pill({
  icon: Icon,
  children,
}: {
  icon: typeof Code2;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs text-ember-50/75">
      <Icon className="w-3.5 h-3.5 text-ember-300/85" />
      {children}
    </span>
  );
}
