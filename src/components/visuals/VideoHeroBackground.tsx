"use client";

/**
 * Cinematic video hero background.
 *
 * Rendered desktop-only, motion-allowed-only (gated by the parent), so the
 * video bytes are never shipped to phones or to reduced-motion users — they
 * keep the lightweight StaticHeroBackground instead.
 *
 * Muted + playsInline + autoplay + loop is the only combination browsers
 * allow to autoplay without a user gesture. The parent mounts this after
 * first paint/idle on desktop, so the static hero carries LCP and the video
 * enhances the scene once critical content is already visible.
 *
 * Two sources: AV1 (~450 KB) is offered first — Chrome/Edge/Firefox (and
 * Safari with AV1 hardware) take it, an ~87% byte saving. Everyone else
 * falls back to the H.264 mp4. So the speed-selling site keeps a fast LCP
 * for the vast majority while staying universally compatible.
 */
export function VideoHeroBackground({ className }: { className?: string }) {
  return (
    <video
      className={className}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero-poster.jpg"
      disablePictureInPicture
      aria-hidden
      tabIndex={-1}
    >
      <source src="/hero.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"' />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
