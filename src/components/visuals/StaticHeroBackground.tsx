/**
 * Mobile-safe static cinematic background. No canvas, no WebGL,
 * no IntersectionObserver. Always renders.
 */
export function StaticHeroBackground({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="absolute inset-0 bg-ink-950" />
      {/* Warm radial glows */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 25%, rgba(236,139,42,0.32), transparent 60%), radial-gradient(40% 35% at 80% 70%, rgba(168,80,12,0.22), transparent 65%), radial-gradient(45% 35% at 15% 80%, rgba(122,58,8,0.20), transparent 65%)",
        }}
      />
      {/* Subtle noise/grain via SVG to avoid flat banding */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.92  0 0 0 0 0.55  0 0 0 0 0.18  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      {/* Soft orbital horizon line */}
      <div className="absolute inset-x-0 top-[55%] h-px bg-gradient-to-r from-transparent via-ember-300/30 to-transparent" />
      {/* Bottom fade into the page */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}
