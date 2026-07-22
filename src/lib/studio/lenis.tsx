"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { ensureGsap, gsap, ScrollTrigger } from "./gsap";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

declare global {
  interface Window {
    _stLenis?: Lenis | null;
  }
}

/** Smooth-scroll provider — wires Lenis into GSAP's ticker + ScrollTrigger. */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafCb = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    ensureGsap();
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: isTouch ? 1.6 : 1,
    });
    window._stLenis = instance;

    instance.on("scroll", ScrollTrigger.update);
    const cb = (time: number) => instance.raf(time * 1000);
    rafCb.current = cb;
    gsap.ticker.add(cb);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      if (rafCb.current) gsap.ticker.remove(rafCb.current);
      instance.destroy();
      window._stLenis = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
