"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Calendar, MessageCircle, Sparkles, Star } from "lucide-react";
import { AnchorButton } from "@/components/ui/button";
import { StaticHeroBackground } from "@/components/visuals/StaticHeroBackground";
import { VideoHeroBackground } from "@/components/visuals/VideoHeroBackground";
import { useIsMobile } from "@/lib/use-is-mobile";
import { useLang } from "@/lib/i18n";
import { site, whatsappLink } from "@/lib/site";

export function Hero() {
  // Cinematic video background — desktop + motion-allowed only:
  //   - Mobile: the static cinematic backdrop looks great and we never
  //     ship a multi-MB autoplay video over cellular / to small GPUs.
  //   - Reduced motion: video motion can be a vestibular trigger.
  // The `mounted` gate means the <video> only mounts after we know the
  // real viewport, so its bytes never load on phones (no first-paint flash).
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!mounted || isMobile || reducedMotion) {
      setLoadVideo(false);
      return;
    }

    const load = () => setLoadVideo(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(load, { timeout: 1600 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(load, 900);
    return () => globalThis.clearTimeout(timeoutId);
  }, [mounted, isMobile, reducedMotion]);
  const showVideo = loadVideo && !isMobile && !reducedMotion;

  const { lang } = useLang();
  const t = {
    es: {
      badge: "Estudio web premium para negocios locales · Cleveland, OH",
      h1a: "Sitios web que hacen ver",
      h1b: "premium a tu negocio.",
      sub: "Atrae mejores clientes y cobra precios más altos. Sitio cinematográfico hecho a la medida, listo en 14 días. Para contratistas, restaurantes, inmobiliarias y servicios locales en EE. UU. y LATAM.",
      cta: "Obtén mi sitio web",
      book: "Agendar 15 min",
      wa: "Hablar por WhatsApp",
      waMsg: "Hola Leyva, vi tu sitio y quiero cotizar uno para mi negocio.",
      t1: "Trabajo real que puedes ver",
      t2: "Primera llamada gratis",
      t3: "Entrega en 14 días",
      t4: "El dueño te responde",
    },
    en: {
      badge: "Premium web studio for local businesses · Cleveland, OH",
      h1a: "Websites that make your",
      h1b: "business look premium.",
      sub: "Attract better clients and charge higher prices. A custom, cinematic website built in 14 days — for contractors, restaurants, real estate and local services across the U.S.",
      cta: "Get my website",
      book: "Book 15 min",
      wa: "Chat on WhatsApp",
      waMsg: "Hi Leyva, I saw your site and I'd like a quote for my business.",
      t1: "Real work you can see",
      t2: "First call is free",
      t3: "Delivered in 14 days",
      t4: "You talk to the owner",
    },
  }[lang];

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      {/* Background layer */}
      <div className="absolute inset-0 -z-10">
        {/* Always-on static cinematic backdrop. Carries the hero on
            mobile + reduced-motion, and acts as the poster/safety net
            until the video paints on desktop. */}
        <StaticHeroBackground className="absolute inset-0" />

        {/* Cinematic video — desktop only, motion-allowed only. */}
        {showVideo && (
          <div className="absolute inset-0">
            <VideoHeroBackground className="absolute inset-0 w-full h-full object-cover" />
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
          <span>{t.badge}</span>
        </div>

        <h1 className="mt-7 sm:mt-9 max-w-5xl font-display font-semibold tracking-tight text-balance text-[clamp(2.4rem,7vw,5.5rem)] leading-[1.08]">
          <span className="block text-ember-50">{t.h1a}</span>
          <span className="block gradient-text pb-[0.12em]">{t.h1b}</span>
        </h1>

        <p className="mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg text-ember-50/75 leading-relaxed text-pretty">
          {t.sub}
        </p>

        <div className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <AnchorButton
            href="#contact"
            size="xl"
            className="w-full sm:w-auto group"
          >
            {t.cta}
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </AnchorButton>
          {site.contact.bookingUrl ? (
            <AnchorButton
              href={site.contact.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <Calendar className="w-5 h-5" />
              {t.book}
            </AnchorButton>
          ) : (
            <AnchorButton
              href={whatsappLink(t.waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              size="xl"
              variant="secondary"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              {t.wa}
            </AnchorButton>
          )}
        </div>

        {/* Single trust strip under the CTAs — combines reassurance
            and proof so it's one line, not two stacked. */}
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-ember-50/65">
          <span className="inline-flex items-center gap-1.5 text-ember-50/85">
            <Star className="w-3.5 h-3.5 fill-ember-300 text-ember-300" />
            {t.t1}
          </span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
          <span>{t.t2}</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
          <span>{t.t3}</span>
          <span className="hidden sm:block w-1 h-1 rounded-full bg-ember-50/20" />
          <span>{t.t4}</span>
        </div>
      </div>
    </section>
  );
}
