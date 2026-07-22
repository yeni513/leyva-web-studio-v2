import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { BrandMark } from "@/components/brand";

export default function NotFound() {
  return (
    <main id="main-content" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Ambient warm glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] max-w-[140vw] max-h-[140vw] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(236,139,42,0.15),transparent_70%)] pointer-events-none"
        aria-hidden
      />

      <div className="relative container max-w-2xl text-center px-6 py-20">
        <div className="flex justify-center mb-8">
          <BrandMark />
        </div>

        <div className="relative inline-grid place-items-center w-20 h-20 rounded-full border border-ember-300/35 bg-ember-300/[0.08] text-ember-300 shadow-[0_0_40px_-6px_rgba(236,139,42,0.55)] mx-auto mb-7">
          <Compass className="w-8 h-8" />
          <span
            className="absolute inset-0 rounded-full border border-ember-300/30 animate-pulse-glow"
            aria-hidden
          />
        </div>

        <p className="text-[11px] uppercase tracking-[0.24em] text-ember-300/85">
          Error 404
        </p>

        <h1 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(2.2rem,6vw,4rem)] leading-[1.05]">
          Esta página{" "}
          <span className="gradient-text">se perdió en órbita.</span>
        </h1>

        <p className="mt-5 text-base text-ember-50/70 leading-relaxed max-w-md mx-auto">
          La URL que intentaste abrir no existe — o quizá la movimos a otro
          lado. Pero todo lo importante sigue en el inicio.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 text-sm font-semibold shadow-[0_0_28px_-4px_rgba(236,139,42,0.65)] hover:shadow-[0_0_40px_-4px_rgba(236,139,42,0.85)] transition-shadow"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio
          </Link>
          <Link
            href="/#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-ember-300/35 bg-ember-300/[0.06] text-ember-50 text-sm hover:bg-ember-300/[0.14] hover:border-ember-300/55 transition-colors"
          >
            Ir a contacto
          </Link>
        </div>
      </div>
    </main>
  );
}
