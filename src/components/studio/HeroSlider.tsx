"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/studio/gsap";
import { GlslSurface } from "@/lib/studio/glsl";
import { HERO_MEDIA_FRAG, HERO_VERT } from "./heroShaders";
import { heroSlides } from "@/lib/studio/data";
import { useContent, useLang } from "@/lib/studio/i18n";
import { site, whatsappLink } from "@/lib/site";
import { useLenis } from "@/lib/studio/lenis";

const WAVE_BARS = 72;
const AUTOPLAY_S = 6.2;
const TRANSITION_S = 1.4;

interface SlideMedia {
  img: HTMLImageElement;
  imgReady: boolean;
  video: HTMLVideoElement | null;
  texture: WebGLTexture | null;
  staticUploaded: boolean;
}

/**
 * Hero — fullscreen WebGL slider over real cinematic footage with the exact
 * Nudot console grammar: centered counter · title · waveform · thumb strip,
 * wordmark bottom-right, hairlined service lists, difference-blend type.
 */
export function HeroSlider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const lenis = useLenis();
  const c = useContent();
  const { lang } = useLang();
  const heroOverlay = c.heroOverlay;
  const titlesRef = useRef(c.heroTitles);
  titlesRef.current = c.heroTitles;

  const trans = useRef({ a: 0, b: 0, p: 0, running: false });
  const autoplayRef = useRef<gsap.core.Tween | null>(null);
  const mediaRef = useRef<SlideMedia[]>([]);

  const hydrateVideo = useCallback((idx: number) => {
    const m = mediaRef.current[idx];
    if (!m || m.video) return;
    const v = document.createElement("video");
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.crossOrigin = "anonymous";
    v.preload = "auto";
    v.src = heroSlides[idx].video;
    v.play().catch(() => {
      v.addEventListener("canplay", () => v.play().catch(() => {}), {
        once: true,
      });
    });
    m.video = v;
  }, []);

  const goTo = useCallback(
    (next: number, viaAuto = false) => {
      const t = trans.current;
      const count = heroSlides.length;
      const target = ((next % count) + count) % count;
      if (t.running || target === activeRef.current) return;
      hydrateVideo(target);
      t.running = true;
      t.a = activeRef.current;
      t.b = target;
      t.p = 0;

      const titleEl = titleRef.current;
      if (titleEl) {
        gsap.to(titleEl, {
          yPercent: -120,
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          onComplete: () => {
            titleEl.textContent = titlesRef.current[target];
            gsap.fromTo(
              titleEl,
              { yPercent: 120, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            );
          },
        });
      }

      gsap.to(t, {
        p: 1,
        duration: TRANSITION_S,
        ease: "power2.inOut",
        onComplete: () => {
          t.a = target;
          t.p = 0;
          t.running = false;
          activeRef.current = target;
          setActive(target);
        },
      });

      if (!viaAuto) scheduleAutoplay();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [hydrateVideo],
  );

  const scheduleAutoplay = useCallback(() => {
    autoplayRef.current?.kill();
    autoplayRef.current = gsap.delayedCall(AUTOPLAY_S, () => {
      goTo(activeRef.current + 1, true);
      scheduleAutoplay();
    });
  }, [goTo]);

  /* WebGL + media lifecycle */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const surface = new GlslSurface(canvas, HERO_VERT, HERO_MEDIA_FRAG, 1.6);
    const gl = surface.gl;
    if (!gl) return;

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    const makeTexture = () => {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      // 1×1 black placeholder
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255]),
      );
      return tex;
    };

    mediaRef.current = heroSlides.map((slide) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = slide.poster;
      const m: SlideMedia = {
        img,
        imgReady: false,
        video: null,
        texture: makeTexture(),
        staticUploaded: false,
      };
      img.onload = () => {
        m.imgReady = true;
      };
      return m;
    });

    // first slide video plays immediately; the rest hydrate on idle/intent
    hydrateVideo(0);
    const idleHydrate = window.setTimeout(() => {
      heroSlides.forEach((_, i) => hydrateVideo(i));
    }, 5000);
    const intentHydrate = () => heroSlides.forEach((_, i) => hydrateVideo(i));
    window.addEventListener("wheel", intentHydrate, {
      passive: true,
      once: true,
    });
    window.addEventListener("touchstart", intentHydrate, {
      passive: true,
      once: true,
    });

    const pickSource = (
      m: SlideMedia,
    ): { src: TexImageSource; w: number; h: number; isVideo: boolean } | null => {
      if (m.video && m.video.readyState >= 2 && m.video.videoWidth > 0) {
        return {
          src: m.video,
          w: m.video.videoWidth,
          h: m.video.videoHeight,
          isVideo: true,
        };
      }
      if (m.imgReady) {
        return {
          src: m.img,
          w: m.img.naturalWidth,
          h: m.img.naturalHeight,
          isVideo: false,
        };
      }
      return null;
    };

    const upload = (m: SlideMedia): { w: number; h: number } => {
      const source = pickSource(m);
      if (!source) return { w: 16, h: 9 };
      if (source.isVideo || !m.staticUploaded) {
        gl.bindTexture(gl.TEXTURE_2D, m.texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          source.src,
        );
        if (!source.isVideo) m.staticUploaded = true;
      }
      return { w: source.w, h: source.h };
    };

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let sleeping = false;
    const onScroll = () => {
      const wasSleeping = sleeping;
      sleeping = window.scrollY > window.innerHeight * 0.65;
      if (sleeping !== wasSleeping) {
        mediaRef.current.forEach((m) => {
          if (!m.video) return;
          if (sleeping) m.video.pause();
          else m.video.play().catch(() => {});
        });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const start = performance.now();
    const tick = () => {
      if (sleeping || document.hidden || !surface.gl) return;
      const t = (performance.now() - start) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      const tr = trans.current;

      const mA = mediaRef.current[tr.a];
      const mB = mediaRef.current[tr.running ? tr.b : tr.a];
      if (!mA || !mB) return;

      gl.useProgram(surface.program);
      const dimsA = upload(mA);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, mA.texture);
      let dimsB = dimsA;
      gl.activeTexture(gl.TEXTURE1);
      if (tr.running && mB !== mA) {
        gl.activeTexture(gl.TEXTURE0 + 1);
        // upload B on unit 1
        const srcB = pickSource(mB);
        if (srcB) {
          gl.bindTexture(gl.TEXTURE_2D, mB.texture);
          if (srcB.isVideo || !mB.staticUploaded) {
            gl.texImage2D(
              gl.TEXTURE_2D,
              0,
              gl.RGBA,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              srcB.src,
            );
            if (!srcB.isVideo) mB.staticUploaded = true;
          }
          dimsB = { w: srcB.w, h: srcB.h };
        } else {
          gl.bindTexture(gl.TEXTURE_2D, mB.texture);
        }
      } else {
        gl.bindTexture(gl.TEXTURE_2D, mA.texture);
      }

      if (surface.uniforms.uTex1) gl.uniform1i(surface.uniforms.uTex1, 0);
      if (surface.uniforms.uTex2) gl.uniform1i(surface.uniforms.uTex2, 1);
      surface.set2("uRes", surface.canvas.width, surface.canvas.height);
      surface.set2("uTexRes1", dimsA.w, dimsA.h);
      surface.set2("uTexRes2", dimsB.w, dimsB.h);
      surface.set1("uTime", t);
      surface.set1("uProgress", tr.running ? tr.p : 0);
      surface.set2("uMouse", mouse.x, mouse.y);
      surface.draw();
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      window.clearTimeout(idleHydrate);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("wheel", intentHydrate);
      window.removeEventListener("touchstart", intentHydrate);
      mediaRef.current.forEach((m) => {
        m.video?.pause();
        if (m.video) m.video.src = "";
        if (m.texture && surface.gl) surface.gl.deleteTexture(m.texture);
      });
      mediaRef.current = [];
      surface.destroy();
    };
  }, [hydrateVideo]);

  /* reveal on loader done + autoplay start */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveal = () => {
      // huge words rise out of their clipped line via a CSS class —
      // immune to dev double-mounts and node replacement
      root.classList.add("is-revealed");
      const items = root.querySelectorAll("[data-hero-reveal]");
      gsap.fromTo(
        items,
        { y: 44, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.07,
          delay: 0.15,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
      scheduleAutoplay();
    };
    if (document.documentElement.classList.contains("st-loading")) {
      document.addEventListener("studio:loader-done", reveal, { once: true });
    } else {
      reveal();
    }
    return () => {
      document.removeEventListener("studio:loader-done", reveal);
      autoplayRef.current?.kill();
    };
  }, [scheduleAutoplay]);

  /* swipe */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let startX = 0;
    let startY = 0;
    const onDown = (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
    };
    const onUp = (e: PointerEvent) => {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      if (Math.abs(dx) > 64 && Math.abs(dx) > Math.abs(dy) * 1.4) {
        goTo(activeRef.current + (dx < 0 ? 1 : -1));
      }
    };
    root.addEventListener("pointerdown", onDown, { passive: true });
    root.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointerup", onUp);
    };
  }, [goTo]);

  const anchorTo = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el && lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.5 });
      else el?.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  /* waveform bell heights around the active slide zone (values rounded so
     SSR and client markup match exactly) */
  const barCenter = ((active + 0.5) / heroSlides.length) * WAVE_BARS;
  const bars = Array.from({ length: WAVE_BARS }, (_, i) => {
    const dist = Math.abs(i - barCenter);
    const bell = Math.exp(-((dist / 5.2) ** 2));
    return {
      h: Math.round(10 + bell * 26),
      hot: bell > 0.28,
      delay: Math.round(Math.min(dist * 9, 320)),
    };
  });

  return (
    <div className="st-hero" ref={rootRef} id="inicio">
      <canvas ref={canvasRef} className="st-hero-canvas" aria-hidden="true" />

      {/* overlay UI */}
      <div className="st-hero-overlay">
        <div>
          <div className="st-hero-topline">
            <div className="st-hero-lineclip">
              <div className="st-huge" data-hero-line>
                {heroOverlay.hugeLeft}
              </div>
            </div>
            <div className="st-hero-brandmid" data-hero-reveal>
              <svg
                className="st-brandmark"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9 24 L17 8" />
                <path d="M16 24 L24 8" />
              </svg>
              <div className="st-hero-smalltag">{heroOverlay.smallTag}</div>
            </div>
            <div className="st-hero-lineclip">
              <div className="st-huge" data-hero-line>
                {heroOverlay.hugeRight}
              </div>
            </div>
          </div>

          <div className="st-grid-4 st-hero-services" data-hero-reveal>
            <ul className="st-services-list">
              {heroOverlay.servicesEs.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="st-col-right">
              <ul className="st-services-list is-lined">
                {heroOverlay.servicesEn.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="st-hero-mid">
          <div className="st-hero-quicklinks" data-hero-reveal>
            {heroOverlay.quickLinks.map((l) => (
              <a key={l.href} href={l.href} data-cursor="IR" onClick={anchorTo(l.href)}>
                {l.label}
              </a>
            ))}
          </div>

          <div className="st-grid-4 st-hero-tags" data-hero-reveal>
            {heroOverlay.tags.map((tag) =>
              tag.h1 ? (
                <div key={tag.text}>
                  <h1>{tag.text}</h1>
                </div>
              ) : (
                <div key={tag.text}>{tag.text}</div>
              ),
            )}
          </div>
        </div>

        <div className="st-grid-4 st-hero-foot" data-hero-reveal>
            <div>
              {heroOverlay.footNote.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </div>
            <div className="st-foot-col-mid">
              <a href={`mailto:${site.contact.email}`} data-cursor="EMAIL">
                {site.contact.email}
              </a>
              <br />
              <a
                href={whatsappLink(
                  c.ui.waMessages.quote,
                )}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="WHATSAPP"
              >
                {site.contact.whatsappDisplay}
              </a>
              <br />
              LEYVA Web Studio 2026©
            </div>
            <div />
            <div className="st-foot-links">
              <a href="#contacto" onClick={anchorTo("#contacto")} data-cursor="HOLA">
                {c.ui.quoteCta}
              </a>
              <a
                href={whatsappLink(c.ui.waMessages.interested)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="CHAT"
              >
                WhatsApp
              </a>
              <a href={`mailto:${site.contact.email}`} data-cursor="EMAIL">
                Email
              </a>
            </div>
          </div>
      </div>

      {/* wordmark */}
      <div className="st-hero-wordmark" data-hero-reveal aria-hidden="true">
        LEYVA<span>®</span>
      </div>

      {/* centered slide console */}
      <div className="st-console" data-hero-reveal>
        <div className="st-console-counter">
          <button
            className="st-counter-nav"
            onClick={() => goTo(activeRef.current - 1)}
            data-cursor={c.ui.prevCursor}
            aria-label={c.ui.prevAria}
          >
            ⟪
          </button>
          <div className="st-counter-display">
            <span>{String(active + 1).padStart(2, "0")}</span>
            <span className="st-counter-divider">//</span>
            <span>{String(heroSlides.length).padStart(2, "0")}</span>
          </div>
          <button
            className="st-counter-nav"
            onClick={() => goTo(activeRef.current + 1)}
            data-cursor={c.ui.nextCursor}
            aria-label={c.ui.nextAria}
          >
            ⟫
          </button>
        </div>

        <div className="st-console-titlebox" key={lang}>
          <div className="st-console-title" ref={titleRef}>
            {c.heroTitles[active]}
          </div>
        </div>

        <div className="st-waveform" aria-hidden="true">
          {bars.map((bar, i) => (
            <span
              key={i}
              className={bar.hot ? "is-hot" : undefined}
              style={{
                height: `${bar.h}px`,
                transitionDelay: `${bar.delay}ms`,
              }}
            />
          ))}
        </div>

        <div className="st-console-thumbs">
          {heroSlides.map((slide, i) => (
            <button
              key={slide.id}
              className={`st-thumb${i === active ? " is-active" : ""}`}
              onClick={() => goTo(i)}
              data-cursor={c.heroTitles[i].toUpperCase()}
              aria-label={c.heroTitles[i]}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={slide.poster} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
