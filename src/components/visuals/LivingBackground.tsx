/**
 * Living background — a single, page-wide ambient aurora that slowly
 * drifts and breathes behind the whole site, so every section feels
 * alive and cohesive without per-section video/WebGL.
 *
 * Why this approach:
 *  - Pure CSS, ~0 KB, no JS, no hydration (server component).
 *  - Animations are transform/opacity only → run on the compositor,
 *    so they're cheap even on mobile and never block the main thread.
 *  - `fixed` + negative z so it sits behind all content; transparent /
 *    semi-transparent sections reveal it, solid ones (the hero) cover it —
 *    which keeps the hero the singular cinematic moment.
 *  - Disabled under prefers-reduced-motion (see globals.css) — the blobs
 *    simply rest as a static warm field.
 */
export function LivingBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Ember blob — top-left, the warmest */}
      <div
        className="absolute -top-[15%] left-[5%] w-[60vw] h-[60vw] max-w-[820px] max-h-[820px] rounded-full blur-3xl will-change-transform animate-aurora-a"
        style={{
          background:
            "radial-gradient(circle, rgba(245,173,79,0.42), transparent 70%)",
        }}
      />
      {/* Bronze blob — right side, deeper tone */}
      <div
        className="absolute top-[28%] right-[0%] w-[55vw] h-[55vw] max-w-[760px] max-h-[760px] rounded-full blur-3xl will-change-transform animate-aurora-b"
        style={{
          background:
            "radial-gradient(circle, rgba(236,139,42,0.38), transparent 70%)",
        }}
      />
      {/* Deep amber blob — lower-center, breathes opacity */}
      <div
        className="absolute bottom-[-12%] left-[22%] w-[65vw] h-[65vw] max-w-[880px] max-h-[880px] rounded-full blur-3xl will-change-transform animate-aurora-c"
        style={{
          background:
            "radial-gradient(circle, rgba(252,201,122,0.34), transparent 70%)",
        }}
      />

      {/* Fine static grain — adds premium texture, kills gradient banding.
          Static (no animation) so it stays crisp and free. */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.92  0 0 0 0 0.55  0 0 0 0 0.18  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
