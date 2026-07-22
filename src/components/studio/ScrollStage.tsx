"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/studio/gsap";
import { useLenis } from "@/lib/studio/lenis";
import { cubeFaceImages, cubeFrontVideo, MOBILE_BP } from "@/lib/studio/data";
import { useContent } from "@/lib/studio/i18n";
import { HeroSlider } from "./HeroSlider";
import { LettersMatrix } from "./LettersMatrix";

/** Scroll distance (in vh) that drives the full dark choreography. */
const DARK_VH = 450;

/* Phase map — a faithful port of the Nudot timeline */
const P_REVEAL = 0.12;
const P_TEXT_OUT = 0.44;
const P_TUMBLE = 0.6;
const P_SPIN = 0.78;
const P_ZOOM = 1.0;
const P_PRE_EXIT = P_SPIN - 0.06;

function easeInOutCubic(x: number) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

const clamp01 = (v: number) => Math.max(0, Math.min(v, 1));

export function ScrollStage() {
  const [isMobile, setIsMobile] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const darkNavRef = useRef<HTMLElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const ipHeaderInnerRef = useRef<HTMLHeadingElement>(null);
  const ipBottomInnerRef = useRef<HTMLSpanElement>(null);
  const waveLeftRef = useRef<HTMLDivElement>(null);
  const waveRightRef = useRef<HTMLDivElement>(null);
  const ipThumbRef = useRef<HTMLImageElement>(null);
  const s2Ref = useRef<HTMLDivElement>(null);
  const s2SubtitleRef = useRef<HTMLDivElement>(null);
  const s2MarqueeWrapRef = useRef<HTMLDivElement>(null);
  const s2MarqueeInnerRef = useRef<HTMLDivElement>(null);
  const s2DescRef = useRef<HTMLDivElement>(null);
  const ntRef = useRef<HTMLDivElement>(null);
  const ntSubtitleRef = useRef<HTMLDivElement>(null);
  const ntLine1Ref = useRef<HTMLHeadingElement>(null);
  const ntLine2Ref = useRef<HTMLHeadingElement>(null);
  const ntDescRef = useRef<HTMLParagraphElement>(null);
  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const blackoutRef = useRef<HTMLDivElement>(null);

  const lenis = useLenis();
  const c = useContent();
  const { introPanel, marqueeBlocks, newTextGroup, waveLeft, waveRight, ui } = c;
  const waveLeftDataRef = useRef(waveLeft);
  waveLeftDataRef.current = waveLeft;

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* Front cube face plays the ember film once it's near */
  useEffect(() => {
    if (isMobile) return;
    const video = sceneRef.current?.querySelector("video");
    if (!video) return;
    const hydrate = () => {
      if (video.src) return;
      video.src = cubeFrontVideo;
      video.play().catch(() => {});
    };
    const t = window.setTimeout(hydrate, 6000);
    window.addEventListener("wheel", hydrate, { passive: true, once: true });
    window.addEventListener("touchstart", hydrate, { passive: true, once: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("wheel", hydrate);
      window.removeEventListener("touchstart", hydrate);
    };
  }, [isMobile]);

  /* Main choreography (desktop only) */
  useEffect(() => {
    if (isMobile) return;
    const mask = maskRef.current;
    const sceneWrapper = sceneWrapperRef.current;
    const scene = sceneRef.current;
    const cube = cubeRef.current;
    if (!mask || !sceneWrapper || !scene || !cube) return;

    let target = 0;
    let current = 0;
    let lastApplied = -1;
    let baseRotY = -45;
    let spinBoost = 0;
    let lastThumbIdx = -1;

    const waveItemsL = Array.from(
      waveLeftRef.current?.querySelectorAll<HTMLElement>(".st-wave-text") ?? [],
    );
    const waveItemsR = Array.from(
      waveRightRef.current?.querySelectorAll<HTMLElement>(".st-wave-text") ?? [],
    );

    const darkTotalPx = () => (DARK_VH / 100) * window.innerHeight;

    const onScroll = () => {
      target = clamp01(window.scrollY / darkTotalPx());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const lenisVel = (v: number) => {
      spinBoost += v * 0.045;
    };
    lenis?.on("scroll", (e: { velocity: number }) => lenisVel(e.velocity));

    /* wave column vertical travel + focus styling */
    const updateWave = (panelT: number) => {
      const wrapH = window.innerHeight;
      const travel = wrapH * 0.9;
      const offset = (0.5 - panelT) * travel;
      if (waveLeftRef.current) {
        waveLeftRef.current.style.transform = `translateY(${offset}px)`;
      }
      if (waveRightRef.current) {
        waveRightRef.current.style.transform = `translateY(${-offset}px)`;
      }
      const centerY = wrapH / 2;
      let best = -1;
      let bestDist = Infinity;
      /* dual-wave: each item also drifts on X along a sine, so the columns
         breathe sideways while they travel vertically */
      waveItemsL.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - centerY);
        const norm = Math.min(d / (wrapH * 0.42), 1);
        const drift = Math.sin(panelT * Math.PI * 2 + i * 0.9) * 26;
        el.style.opacity = String(0.18 + (1 - norm) * 0.82);
        el.style.filter = `blur(${norm * 2.6}px)`;
        el.style.transform = `translateX(${drift}px) scale(${0.86 + (1 - norm) * 0.18})`;
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      waveItemsR.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - centerY);
        const norm = Math.min(d / (wrapH * 0.42), 1);
        const drift = Math.sin(panelT * Math.PI * 2 + i * 0.9 + Math.PI) * 26;
        el.style.opacity = String(0.18 + (1 - norm) * 0.82);
        el.style.filter = `blur(${norm * 2.6}px)`;
        el.style.transform = `translateX(${drift}px) scale(${0.86 + (1 - norm) * 0.18})`;
      });
      if (best >= 0 && best !== lastThumbIdx && ipThumbRef.current) {
        lastThumbIdx = best;
        ipThumbRef.current.src = waveLeftDataRef.current[best].img;
      }
    };

    /* infinite marquee drift */
    let marqueeX = 0;
    const marqueeStep = (visible: boolean) => {
      const inner = s2MarqueeInnerRef.current;
      if (!inner || !visible) return;
      const half = inner.scrollWidth / 2;
      if (half <= 0) return;
      marqueeX -= 1.1 + Math.min(Math.abs(spinBoost) * 0.4, 5);
      if (marqueeX <= -half) marqueeX += half;
      inner.style.transform = `translateX(${marqueeX}px)`;
    };

    const setY = (el: Element | null, yPercent: number) => {
      if (el) gsap.set(el, { yPercent });
    };

    const tick = () => {
      current += (target - current) * 0.1;
      if (current < 0.0001) current = 0;
      spinBoost *= 0.94;

      const progress = current;
      const delta = Math.abs(current - lastApplied);
      const targetDelta = Math.abs(target - current);
      const idleSpin = progress <= P_REVEAL;
      if (idleSpin) baseRotY += 0.4;

      if (
        !idleSpin &&
        delta < 0.0001 &&
        targetDelta < 0.0001 &&
        Math.abs(spinBoost) < 0.01
      ) {
        marqueeStep(progress > P_TEXT_OUT && progress < P_ZOOM);
        return;
      }
      lastApplied = current;

      const winW = window.innerWidth;
      const winH = window.innerHeight;

      const prReveal = clamp01(progress / P_REVEAL);
      const easeReveal = easeInOutCubic(prReveal);
      const targetYPhase1 = Math.ceil(baseRotY / 360) * 360 + 360;

      mask.style.clipPath = `inset(${(1 - easeReveal) * 100}% 0 0 0)`;

      const uiEase = easeInOutCubic(clamp01((prReveal - 0.6) / 0.4));
      if (darkNavRef.current)
        gsap.set(darkNavRef.current, { opacity: uiEase, y: (1 - uiEase) * -25 });
      if (scrollIndRef.current)
        gsap.set(scrollIndRef.current, { opacity: uiEase * 0.7 });
      if (glow1Ref.current)
        gsap.set(glow1Ref.current, {
          opacity: uiEase,
          scale: 0.4 + uiEase * 0.6,
          visibility: uiEase > 0 ? "visible" : "hidden",
        });
      if (glow2Ref.current)
        gsap.set(glow2Ref.current, {
          opacity: uiEase * 0.8,
          scale: 0.4 + uiEase * 0.6,
          visibility: uiEase > 0 ? "visible" : "hidden",
        });

      /* ── intro panel + wave ── */
      const waveRp =
        progress <= P_REVEAL ? Math.max(0, (prReveal - 0.45) / 0.55) : 1;
      const intro = introRef.current;
      if (progress <= P_TEXT_OUT) {
        if (intro)
          gsap.set(intro, {
            opacity: waveRp > 0 ? 1 : 0,
            visibility: waveRp > 0 ? "visible" : "hidden",
          });
        if (waveRp > 0) {
          const panelT =
            progress <= P_REVEAL
              ? 0
              : (progress - P_REVEAL) / (P_TEXT_OUT - P_REVEAL);
          const ndIn = easeInOutCubic(clamp01((waveRp - 0.3) / 0.65));
          const ndOut = easeInOutCubic(Math.max(0, (panelT - 0.84) / 0.16));
          const ndOpacity = Math.max(0, ndIn * (1 - ndOut));
          setY(ipHeaderInnerRef.current, (1 - ndIn) * 110);
          setY(ipBottomInnerRef.current, (1 - ndIn) * -110);
          if (ipHeaderInnerRef.current)
            gsap.set(ipHeaderInnerRef.current.parentElement, {
              opacity: ndOpacity,
            });
          if (ipBottomInnerRef.current)
            gsap.set(ipBottomInnerRef.current.parentElement, {
              opacity: ndOpacity,
            });
          const outT = easeInOutCubic(Math.max(0, (panelT - 0.83) / 0.17));
          if (outT > 0 && intro) gsap.set(intro, { opacity: 1 - outT });
          updateWave(panelT);
        }
      } else if (intro) {
        gsap.set(intro, { opacity: 0, visibility: "hidden" });
      }

      /* ── cube + titles ── */
      let currentScale = 0.0001;
      let currentX = -15;
      let currentY = baseRotY;
      const baseSceneSize = 230;
      const zoomedSceneSize = Math.min(winW * 0.44 * 0.9, winH * 0.72 * 0.9);
      let currentSceneSize = baseSceneSize;

      const s2 = s2Ref.current;
      const nt = ntRef.current;

      if (progress > P_TEXT_OUT) {
        const revealTotal = P_PRE_EXIT - P_TEXT_OUT;
        const revealPr = clamp01((progress - P_TEXT_OUT) / revealTotal);

        setY(
          s2SubtitleRef.current,
          (1 - easeInOutCubic(clamp01(revealPr / 0.4))) * 130,
        );
        setY(
          s2MarqueeWrapRef.current,
          (1 - easeInOutCubic(clamp01((revealPr - 0.08) / 0.42))) * 130,
        );
        setY(
          s2DescRef.current,
          (1 - easeInOutCubic(clamp01((revealPr - 0.32) / 0.42))) * 130,
        );

        if (progress <= P_TUMBLE) {
          const ease = easeInOutCubic(
            (progress - P_TEXT_OUT) / (P_TUMBLE - P_TEXT_OUT),
          );
          currentScale = 1.5 * ease;
          currentX = -15 * (1 - ease) + 360 * ease;
          currentY = baseRotY * (1 - ease) + targetYPhase1 * ease;
          if (s2) gsap.set(s2, { opacity: 1 });
          if (nt) gsap.set(nt, { opacity: 0 });
          if (blackoutRef.current) gsap.set(blackoutRef.current, { opacity: 0 });
        } else if (progress <= P_SPIN) {
          const ease = easeInOutCubic(
            (progress - P_TUMBLE) / (P_SPIN - P_TUMBLE),
          );
          currentScale = 1.5;
          currentX = 360;
          currentY = targetYPhase1 + 360 * ease;
          if (s2) gsap.set(s2, { opacity: 1 });
          if (nt) gsap.set(nt, { opacity: 0 });
          if (blackoutRef.current) gsap.set(blackoutRef.current, { opacity: 0 });
        } else {
          const ease = easeInOutCubic(
            (progress - P_SPIN) / (P_ZOOM - P_SPIN),
          );
          const spinDisplaySize = baseSceneSize * 1.5;
          currentSceneSize =
            spinDisplaySize + (zoomedSceneSize - spinDisplaySize) * ease;
          currentScale = 1;
          currentX = 360;
          currentY = targetYPhase1 + 360;

          if (s2) gsap.set(s2, { opacity: Math.max(0, 1 - ease) });
          setY(s2DescRef.current, -easeInOutCubic(clamp01(ease)) * 130);
          setY(
            s2MarqueeWrapRef.current,
            -easeInOutCubic(clamp01((ease - 0.1) / 0.9)) * 130,
          );
          setY(
            s2SubtitleRef.current,
            -easeInOutCubic(clamp01((ease - 0.3) / 0.7)) * 130,
          );

          if (blackoutRef.current)
            gsap.set(blackoutRef.current, { opacity: ease * ease });

          if (nt) gsap.set(nt, { opacity: ease > 0 ? 1 : 0 });
          const enterPr = clamp01(ease / 0.7);
          setY(
            ntSubtitleRef.current,
            (1 - easeInOutCubic(clamp01(enterPr / 0.6))) * 130,
          );
          setY(
            ntLine1Ref.current,
            (1 - easeInOutCubic(clamp01((enterPr - 0.1) / 0.6))) * 130,
          );
          setY(
            ntLine2Ref.current,
            (1 - easeInOutCubic(clamp01((enterPr - 0.2) / 0.6))) * 130,
          );
          setY(
            ntDescRef.current,
            (1 - easeInOutCubic(clamp01((enterPr - 0.35) / 0.55))) * 130,
          );
        }
      } else {
        currentScale = 0.0001;
        if (s2) gsap.set(s2, { opacity: 0 });
        if (nt) gsap.set(nt, { opacity: 0 });
        if (blackoutRef.current) gsap.set(blackoutRef.current, { opacity: 0 });
        setY(s2SubtitleRef.current, 130);
        setY(s2MarqueeWrapRef.current, 130);
        setY(s2DescRef.current, 130);
      }

      /* past the pinned choreography: fade the closing text to pure black
         so the letters matrix plays on an empty stage (reference behavior) */
      const post = clamp01(
        (window.scrollY - darkTotalPx()) / (winH * 0.55),
      );
      if (post > 0) {
        if (nt) gsap.set(nt, { opacity: 1 - post });
        if (blackoutRef.current)
          gsap.set(blackoutRef.current, { opacity: 1 });
      }

      marqueeStep(progress > P_TEXT_OUT && progress < P_ZOOM);

      gsap.set(scene, {
        "--scene-size": `${currentSceneSize}px`,
        "--scene-depth": `${currentSceneSize / 2}px`,
      });
      gsap.set(cube, {
        rotationX: currentX,
        rotationY: currentY + spinBoost * 6,
        rotationZ: 0,
      });
      gsap.set(sceneWrapper, {
        xPercent: -50,
        yPercent: -50,
        scale: currentScale,
        top: "50%",
      });
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMobile, lenis]);

  return (
    <div className="st-scroll-track" ref={trackRef}>
      <div className="st-sticky">
        <HeroSlider />

        <div className="st-dark-mask" ref={maskRef}>
          <div className="st-dark">
            {/* ambient film behind the whole dark sequence */}
            <video
              className="st-dark-bgvideo"
              muted
              loop
              playsInline
              preload="none"
              poster="/media/hero1.webp?v=3"
              ref={(el) => {
                if (el && !el.src) {
                  const hydrate = () => {
                    if (el.src) return;
                    el.src = "/media/hero1.mp4?v=3";
                    el.play().catch(() => {});
                  };
                  window.setTimeout(hydrate, 6500);
                  window.addEventListener("wheel", hydrate, {
                    passive: true,
                    once: true,
                  });
                  window.addEventListener("touchstart", hydrate, {
                    passive: true,
                    once: true,
                  });
                }
              }}
            />
            <div className="st-dark-glow1" ref={glow1Ref} />
            <div className="st-dark-glow2" ref={glow2Ref} />

            <nav className="st-dark-nav" ref={darkNavRef}>
              {ui.darkNav.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="st-scroll-indicator" ref={scrollIndRef}>
              <span className="st-si-arrow">↓</span>
              <span>{ui.scrollDown}</span>
            </div>

            <div className="st-dark-blackout" ref={blackoutRef} />

            {/* intro panel — wave columns */}
            <div className="st-intro-panel" ref={introRef}>
              <div className="st-ip-eyebrow">{introPanel.eyebrow}</div>
              <div className="st-ip-header">
                <h2 ref={ipHeaderInnerRef} style={{ display: "inline-block" }}>
                  {introPanel.heading}
                </h2>
              </div>
              <div className="st-ip-bottomline">
                <span className="st-ip-bottom-inner" ref={ipBottomInnerRef}>
                  {introPanel.bottomLine}
                </span>
              </div>
              <div className="st-wave-wrapper">
                <div className="st-wave-col" ref={waveLeftRef}>
                  {waveLeft.map((item) => (
                    <div className="st-wave-text" key={item.text}>
                      {item.text}
                    </div>
                  ))}
                </div>
                <div className="st-wave-col" ref={waveRightRef}>
                  {waveRight.map((item) => (
                    <div className="st-wave-text" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="st-ip-thumbrow">
                <div className="st-ip-thumbline" />
                <div className="st-ip-thumb">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img ref={ipThumbRef} src={waveLeft[0].img} alt="" />
                </div>
                <div className="st-ip-thumbline" />
              </div>
            </div>

            {/* marquee section */}
            <div className="st-s2" ref={s2Ref}>
              <div className="st-reveal-line">
                <div className="st-nt-subtitle" ref={s2SubtitleRef}>
                  {ui.s2Subtitle}
                </div>
              </div>
              <div className="st-marquee-reveal" style={{ width: "100vw" }}>
                <div ref={s2MarqueeWrapRef}>
                  <div className="st-marquee-outer">
                    <div className="st-marquee-inner" ref={s2MarqueeInnerRef}>
                      {[0, 1].map((set) => (
                        <div className="st-marquee-set" key={set} aria-hidden={set === 1}>
                          {marqueeBlocks.map((b) => (
                            <span className="st-marquee-block" key={`${set}-${b.title}`}>
                              <span className="st-huge-title">{b.title}</span>
                              <span className="st-marquee-label">{b.label}</span>
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="st-reveal-line">
                <div
                  className="st-nt-desc"
                  ref={s2DescRef}
                  style={{ marginTop: "3vh", textAlign: "center" }}
                >
                  {ui.s2Desc}
                </div>
              </div>
            </div>

            {/* new text group (zoom phase) */}
            <div className="st-newtext" ref={ntRef}>
              <div className="st-reveal-line">
                <div className="st-nt-subtitle" ref={ntSubtitleRef}>
                  {newTextGroup.subtitle}
                </div>
              </div>
              <div className="st-reveal-line">
                <h2 className="st-nt-line is-outline" ref={ntLine1Ref}>
                  {newTextGroup.line1}
                </h2>
              </div>
              <div className="st-reveal-line">
                <h2 className="st-nt-line" ref={ntLine2Ref}>
                  {newTextGroup.line2}
                </h2>
              </div>
              <div className="st-reveal-line">
                <p className="st-nt-desc" ref={ntDescRef}>
                  {newTextGroup.desc}
                </p>
              </div>
            </div>

            {/* 3D cube — real footage faces, film on the front */}
            <div className="st-scene-wrapper" ref={sceneWrapperRef}>
              <div className="st-scene" ref={sceneRef}>
                <div className="st-cube" ref={cubeRef}>
                  {["front", "right", "back", "left", "top", "bottom"].map(
                    (face, i) => (
                      <div className={`st-face is-${face}`} key={face}>
                        {face === "front" ? (
                          <video
                            muted
                            loop
                            playsInline
                            preload="none"
                            poster={cubeFaceImages[0]}
                          />
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img src={cubeFaceImages[i]} alt="" loading="lazy" />
                        )}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* pinned scroll distance for the dark choreography (desktop only) */}
      {!isMobile && <div style={{ height: `${DARK_VH}vh` }} aria-hidden />}

      {/* letters matrix scrolls over the pinned cube */}
      {!isMobile && <LettersMatrix />}
    </div>
  );
}
