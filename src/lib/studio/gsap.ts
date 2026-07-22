"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

let registered = false;

export function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, Flip, ScrambleTextPlugin);
    ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
    registered = true;
  }
  return { gsap, ScrollTrigger, Flip };
}

export { gsap, ScrollTrigger, Flip };
