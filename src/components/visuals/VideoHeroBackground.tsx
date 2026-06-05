"use client";

/**
 * Cinematic video hero background.
 *
 * Rendered desktop-only, motion-allowed-only (gated by the parent), so the
 * video bytes are never shipped to phones or to reduced-motion users — they
 * keep the lightweight StaticHeroBackground instead.
 *
 * Muted + playsInline + autoplay + loop is the only combination browsers
 * allow to autoplay without a user gesture. `poster` is the first frame
 * (hero-poster.jpg) so there's no flash before the video paints. Audio was
 * stripped at encode time; the element is decorative (aria-hidden).
 */
export function VideoHeroBackground({ className }: { className?: string }) {
  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster="/hero-poster.jpg"
      aria-hidden
      tabIndex={-1}
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
