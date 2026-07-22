"use client";

import { useEffect, useRef } from "react";

/** Hairline scroll progress bar pinned to the very top. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let target = 0;
    let current = 0;
    let raf = 0;

    const measure = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      target = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const apply = () => {
      raf = 0;
      current += (target - current) * 0.25;
      if (Math.abs(target - current) > 0.0005) {
        raf = requestAnimationFrame(apply);
      } else {
        current = target;
      }
      bar.style.transform = `scaleX(${current})`;
    };

    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    measure();
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div id="st-scroll-progress" ref={barRef} aria-hidden="true" />;
}
