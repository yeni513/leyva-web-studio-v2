"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import { AnchorButton } from "@/components/ui/button";
import { StaticHeroBackground } from "@/components/visuals/StaticHeroBackground";
import { useIsMobile } from "@/lib/use-is-mobile";

const ShaderBackground = dynamic(
  () =>
    import("@/components/visuals/ShaderBackground").then(
      (m) => m.ShaderBackground,
    ),
  { ssr: false, loading: () => null },
);

export function Hero() {
  const isMobile = useIsMobile();

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      {/* Background layer */}
      <div className="absolute inset-0 -z-10">
        {/* Always-on static cinematic backdrop. Acts as a safety net so
            the hero is never blank if the shader fails to mount. */}
        <StaticHeroBackground className="absolute inset-0" />

        {/* Desktop-only WebGL shader on top of the static backdrop */}
        {!isMobile && (
          <div className="absolute inset-0">
            <ShaderBackground className="absolute inset-0 w-full h-full" />
            {/* Vignette to make the content pop */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_50%_45%,transparent_0%,rgba(7,6,8,0.55)_75%,rgba(7,6,8,0.92)_100%)] pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink-950 pointer-events-none" />
          </div>
        )}

        {/* Subtle hairline grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,244,224,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,244,224,0.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 60% 50% at 50% 40%, black, transparent 75%)",
          }}
          aria-hidden
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex flex-col items-center justify-center min-h-[100svh] pt-28 pb-24 sm:pt-32 sm:pb-32 text-center">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ember-300/25 bg-ember-300/[0.04] backdrop-blur-md text-xs sm:text-sm text-ember-50/85 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-ember-300" />
          <span>
            Estudio web premium para negocios locales en LATAM y EE. UU.
          </span>
        </div>

        <h1 className="mt-7 sm:mt-9 max-w-5xl font-display font-semibold tracking-tight text-balance text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.08]">
          <span className="block text-ember-50">Sitios web que hacen ver</span>
          <span className="block gradient-text pb-[0.12em]">
            premium a tu negocio.
          </span>
        </h1>

        <p className="mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg text-ember-50/75 leading-relaxed text-pretty">
          Diseñamos y desarrollamos páginas web cinematográficas para
          contratistas, restaurantes, inmobiliarias y comercios locales que
          quieren atraer mejores clientes y cobrar más por su servicio.
        </p>

        <div className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <AnchorButton
            href="#contact"
            size="xl"
            className="w-full sm:w-auto group"
          >
            Obtén mi sitio web
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </AnchorButton>
          <AnchorButton
            href="#paquetes"
            size="xl"
            variant="secondary"
            className="w-full sm:w-auto"
          >
            Ver paquetes
          </AnchorButton>
        </div>

        {/* Social proof strip */}
        <div className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm text-ember-50/60">
          <div className="flex items-center gap-1.5">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-ember-300 text-ember-300"
                />
              ))}
            </div>
            <span className="text-ember-50/80">5.0 calidad de entrega</span>
          </div>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
          <span>Entregas en 7–14 días</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
          <span>Soporte directo con el desarrollador</span>
        </div>
      </div>
    </section>
  );
}
