"use client";

import { useEffect, useRef } from "react";

/** Film-grain overlay — pre-baked frames, all viewports (ported from noise.js). */
export function Grain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      canvas.style.display = "none";
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FRAMES = 10;
    const FPS = 25;
    let frames: ImageData[] = [];
    let frameIdx = 0;
    let timerId = 0;
    let rafId = 0;
    let resizeTimer = 0;
    let running = false;
    let w = 0;
    let h = 0;

    function bake() {
      frames = [];
      for (let i = 0; i < FRAMES; i++) {
        const idata = ctx!.createImageData(w, h);
        const buf = new Uint32Array(idata.data.buffer);
        for (let p = 0; p < buf.length; p++) {
          if (Math.random() < 0.7) buf[p] = 0xffffffff;
        }
        frames.push(idata);
      }
    }

    function tick() {
      if (!running) return;
      rafId = 0;
      if (document.visibilityState !== "hidden") {
        frameIdx = (frameIdx + 1) % FRAMES;
        ctx!.putImageData(frames[frameIdx], 0, 0);
      }
      timerId = window.setTimeout(() => {
        rafId = window.requestAnimationFrame(tick);
      }, 1000 / FPS);
    }

    function stop() {
      running = false;
      window.clearTimeout(timerId);
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function start() {
      if (running) return;
      running = true;
      rafId = window.requestAnimationFrame(tick);
    }

    function setup() {
      stop();
      // grain renders at half resolution — invisible at 6% opacity, 4x cheaper
      w = canvas!.width = Math.ceil(window.innerWidth / 2);
      h = canvas!.height = Math.ceil(window.innerHeight / 2);
      bake();
      start();
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(setup, 160);
    };
    const onVis = () => (document.hidden ? stop() : start());

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    setup();

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0.06,
        transform: "translateZ(0)",
      }}
    />
  );
}
