"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/studio/gsap";
import { useLenis } from "@/lib/studio/lenis";
import { ringImagePool } from "@/lib/studio/data";
import { useContent } from "@/lib/studio/i18n";

/**
 * "LOS SECTORES" — a dense orbital cloud of small tilted footage cards
 * spinning around the typography, with scroll-velocity boost and mouse tilt.
 */

interface RingSpec {
  count: number;
  radius: number; // fraction of viewport width
  y: string;
  scale: number;
  speed: number;
}

const RINGS: RingSpec[] = [
  { count: 10, radius: 0.46, y: "-32vh", scale: 1.0, speed: 0.05 },
  { count: 14, radius: 0.56, y: "-8vh", scale: 0.82, speed: -0.068 },
  { count: 14, radius: 0.56, y: "14vh", scale: 0.72, speed: 0.058 },
  { count: 10, radius: 0.44, y: "34vh", scale: 0.92, speed: -0.048 },
];

function rand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function RingSectors() {
  const sectionRef = useRef<HTMLElement>(null);
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);
  const coreVideoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();
  const { ringSection } = useContent();

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    if (!section) return;

    let boost = 0;
    let tiltTarget = -5;
    let tilt = -5;
    let inView = false;
    const rots = RINGS.map((r) => rand(r.count) * 360);
    const radii = RINGS.map(() => 600);

    lenis?.on("scroll", (e: { velocity: number }) => {
      boost += e.velocity * 0.018;
    });

    const layout = () => {
      const w = window.innerWidth;
      ringRefs.current.forEach((ring, ri) => {
        if (!ring) return;
        const spec = RINGS[ri];
        const radius = Math.max(340, w * spec.radius);
        radii[ri] = radius;
        ring.querySelectorAll<HTMLElement>(".st-orb-card").forEach(
          (card, ci) => {
            const angle = (360 / spec.count) * ci + rand(ri * 31 + ci) * 10;
            const tz = radius * (0.92 + rand(ri * 7 + ci * 3) * 0.16);
            const rx = (rand(ri * 13 + ci * 5) - 0.5) * 26;
            const rz = (rand(ri * 17 + ci * 11) - 0.5) * 30;
            card.style.transform = `rotateY(${angle}deg) translateZ(${tz}px) rotateX(${rx}deg) rotateZ(${rz}deg)`;
          },
        );
      });
    };
    layout();
    window.addEventListener("resize", layout, { passive: true });

    const onMouse = (e: MouseEvent) => {
      tiltTarget = -5 + (e.clientY / window.innerHeight - 0.5) * -8;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? false;
        const v = coreVideoRef.current;
        if (v) {
          if (inView) {
            if (!v.src) v.src = "/media/hero3.mp4?v=3";
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        }
      },
      { rootMargin: "260px 0px" },
    );
    io.observe(section);

    /* drag to spin — horizontal pointer movement feeds the orbit */
    let dragging = false;
    let lastX = 0;
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      boost += (e.clientX - lastX) * 0.012;
      lastX = e.clientX;
    };
    const onUp = () => {
      dragging = false;
    };
    section.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    const tick = () => {
      if (!inView || document.hidden) return;
      boost *= 0.93;
      tilt += (tiltTarget - tilt) * 0.05;
      ringRefs.current.forEach((ring, ri) => {
        if (!ring) return;
        const spec = RINGS[ri];
        rots[ri] += spec.speed + boost * (ri % 2 === 0 ? 1 : -0.8);
        // push each ring behind the screen plane so no card flies at the camera
        ring.style.transform = `translate(-50%, -50%) translateY(${spec.y}) translateZ(${-radii[ri] * 0.95}px) rotateX(${tilt}deg) rotateY(${rots[ri]}deg)`;
      });
    };
    gsap.ticker.add(tick);

    /* typography reveal */
    const reveals = section.querySelectorAll<HTMLElement>(".st-reveal-inner");
    const revealTl = gsap.timeline({
      scrollTrigger: { trigger: section, start: "top 62%" },
    });
    revealTl.to(reveals, {
      y: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out",
    });

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", layout);
      window.removeEventListener("mousemove", onMouse);
      section.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      io.disconnect();
      revealTl.scrollTrigger?.kill();
      revealTl.kill();
    };
  }, [lenis]);

  let imgIdx = 0;

  return (
    <section
      className="st-ring-section"
      id="sectores"
      ref={sectionRef}
      aria-label="Sectores que atendemos"
    >
      <div className="st-ring-sticky">
        <div className="st-ring-stage" aria-hidden="true">
          {RINGS.map((spec, ri) => (
            <div
              className="st-orb-ring"
              key={ri}
              ref={(el) => {
                ringRefs.current[ri] = el;
              }}
              style={{ ["--orb-scale" as string]: spec.scale }}
            >
              {Array.from({ length: spec.count }).map((_, ci) => {
                const src = ringImagePool[imgIdx++ % ringImagePool.length];
                return (
                  <div className="st-orb-card" key={ci}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" loading="lazy" decoding="async" />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="st-ring-fade is-left" aria-hidden="true" />
        <div className="st-ring-fade is-right" aria-hidden="true" />

        <div className="st-ring-dom">
          <div className="st-ring-title">
            <span className="st-reveal-wrap">
              <span className="st-reveal-inner">{ringSection.title}</span>
            </span>
          </div>

          <div className="st-ring-sub">
            <div className="st-reveal-wrap">
              <span className="st-reveal-inner">{ringSection.subLine1}</span>
            </div>
            <br />
            <div className="st-reveal-wrap">
              <span className="st-reveal-inner">{ringSection.subLine2}</span>
            </div>
          </div>

          <div className="st-ring-statsbar">
            {ringSection.stats.map((s) => (
              <span className="st-reveal-wrap" key={s}>
                <span className="st-reveal-inner">{s}</span>
              </span>
            ))}
          </div>

          <div className="st-ring-center">
            <div className="st-ring-videobox">
              <video
                ref={coreVideoRef}
                muted
                loop
                playsInline
                preload="none"
                poster="/media/hero3.webp?v=3"
                aria-hidden="true"
              />
            </div>
            <div className="st-ring-centerlabel st-reveal-wrap">
              <h2
                className="st-reveal-inner"
                style={{ margin: 0, font: "inherit" }}
              >
                {ringSection.centerLabel}
              </h2>
            </div>
          </div>

          <div className="st-ring-tags">
            {ringSection.tags.map((t) => (
              <span className="st-reveal-wrap" key={t}>
                <h3 className="st-reveal-inner">{t}</h3>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
