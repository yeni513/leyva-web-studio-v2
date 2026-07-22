"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/studio/gsap";

/**
 * Intro loader — L · core · W letters, counter, then a clean exit.
 * Dispatches "studio:loader-done" so the hero can start its reveal.
 */
export function Loader() {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.classList.add("st-loading");
    const mark = root.querySelector(".st-loader-mark");
    const counter = { v: 0 };

    const tl = gsap.timeline();
    tl.to(mark, {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: "power3.out",
      delay: 0.15,
    })
      .to(
        mark,
        { scale: 1.06, duration: 1.4, ease: "sine.inOut" },
        ">-0.2",
      )
      .to(
        counter,
        {
          v: 100,
          duration: 1.7,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = String(
                Math.round(counter.v),
              ).padStart(2, "0");
            }
          },
        },
        0.2,
      );

    const finish = gsap.delayedCall(2.45, () => {
      setDone(true);
      document.documentElement.classList.remove("st-loading");
      document.dispatchEvent(new Event("studio:loader-done"));
    });

    return () => {
      tl.kill();
      finish.kill();
      document.documentElement.classList.remove("st-loading");
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`st-loader${done ? " is-done" : ""}`}
      aria-hidden="true"
    >
      <div className="st-loader-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="st-loader-mark"
          src="/media/wordmark.webp?v=3"
          alt=""
          fetchPriority="high"
        />
      </div>
      <div className="st-loader-meta">Leyva Web Studio — Cleveland, OH</div>
      <div className="st-loader-counter">
        [ <span ref={counterRef}>00</span> ]
      </div>
    </div>
  );
}
