"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/studio/gsap";

/**
 * Custom cursor — small dot + difference-blend ring that expands and shows a
 * label over anything carrying [data-cursor="LABEL"].
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const dotX = gsap.quickSetter(dot, "x", "px");
    const dotY = gsap.quickSetter(dot, "y", "px");
    const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });
    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      if (target) {
        const text = target.dataset.cursor || "VER";
        if (label.textContent !== text) label.textContent = text;
        ring.classList.add("is-active");
      } else {
        ring.classList.remove("is-active");
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.classList.remove("is-active");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div id="st-cursor-dot" ref={dotRef} aria-hidden="true" />
      <div id="st-cursor-ring" ref={ringRef} aria-hidden="true">
        <span className="st-cursor-circle" />
        <span className="st-cursor-label" ref={labelRef}>
          VER
        </span>
      </div>
    </>
  );
}
