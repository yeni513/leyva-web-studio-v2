"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/studio/gsap";
import { useContent, useLang } from "@/lib/studio/i18n";
import { prefillQuote } from "@/lib/prefill-quote";

/**
 * Works showcase — a three-act scroll piece:
 *   1. editorial header with a small media window underneath
 *   2. the window inflates to fullscreen as you scroll (scrub)
 *   3. pinned: the live projects wipe horizontally one per scroll segment,
 *      with a name index + diamond progress markers
 * Runs identically on every viewport — mobile gets the full mechanic.
 */

/* scroll budget (vh) */
const EXPAND_VH = 120;
const PANEL_VH = 95;

const clamp01 = (v: number) => Math.max(0, Math.min(v, 1));
const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export function WorksGallery() {
  const { galleryHeader, works, ui } = useContent();
  const { lang } = useLang();

  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLDivElement>(null);
  const diamondsRef = useRef<HTMLDivElement>(null);

  const count = works.length;
  const totalVh = EXPAND_VH + (count - 1) * PANEL_VH;

  /* header word reveal */
  useEffect(() => {
    ensureGsap();
    const header = headerRef.current;
    if (!header) return;
    const ctx = gsap.context(() => {
      header.querySelectorAll<HTMLElement>("[data-word-reveal]").forEach(
        (el) => {
          const words = (el.textContent ?? "").trim().split(/\s+/);
          el.innerHTML = "";
          const inners: HTMLElement[] = [];
          words.forEach((w, i) => {
            const wrap = document.createElement("span");
            wrap.style.cssText =
              "display:inline-block;overflow:clip;vertical-align:bottom;" +
              (i < words.length - 1 ? "margin-right:0.26em;" : "");
            const inner = document.createElement("span");
            inner.style.cssText = "display:inline-block;";
            inner.textContent = w;
            wrap.appendChild(inner);
            el.appendChild(wrap);
            inners.push(inner);
          });
          gsap.fromTo(
            inners,
            { yPercent: 120 },
            {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 86%" },
            },
          );
        },
      );
    }, header);
    return () => ctx.revert();
  }, [lang]);

  /* the expand + wipe choreography */
  useEffect(() => {
    const track = trackRef.current;
    const header = headerRef.current;
    const frame = frameRef.current;
    const panels = panelsRef.current;
    if (!track || !header || !frame || !panels) return;

    let raf = 0;
    const nameEls = Array.from(
      indexRef.current?.querySelectorAll<HTMLElement>("span[data-wk-name]") ??
        [],
    );
    const diamondEls = Array.from(
      diamondsRef.current?.querySelectorAll<HTMLElement>("i") ?? [],
    );
    let lastActive = -1;

    const tick = () => {
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      const p = clamp01(-rect.top / Math.max(scrollable, 1));
      const pExpand = EXPAND_VH / totalVh;

      /* Act 2 — window inflates */
      const ex = easeInOutCubic(clamp01(p / pExpand));
      const w = window.innerWidth;
      const h = window.innerHeight;
      const narrow = w <= 768;
      const smallW = narrow ? w * 0.72 : Math.min(w * 0.42, 580);
      const smallH = narrow ? Math.min(h * 0.24, 250) : Math.min(h * 0.3, 300);
      const fw = smallW + (w - smallW) * ex;
      const fh = smallH + (h - smallH) * ex;
      frame.style.width = `${fw}px`;
      frame.style.height = `${fh}px`;
      frame.style.borderRadius = `${8 * (1 - ex)}px`;
      // captions only appear once the window has taken over
      frame.style.setProperty("--wk-cap", String(clamp01((ex - 0.55) / 0.45)));
      // window starts low (clear of the title) and settles to center
      frame.style.top = `${72 - 22 * ex}%`;

      // header drifts up and away while the window takes over
      header.style.opacity = String(1 - ex);
      header.style.transform = `translateY(${-ex * 46}%)`;

      /* Act 3 — horizontal wipes, one project per segment with dwell */
      const q = clamp01((p - pExpand) / (1 - pExpand));
      const segs = count - 1;
      const seg = Math.min(Math.floor(q * segs), segs - 1);
      const frac = q * segs - seg;
      // dwell 40% — hold the scene, then wipe across the remaining 60%
      const wipe = easeInOutCubic(clamp01((frac - 0.4) / 0.6));
      const x = (seg + wipe) * 100;
      panels.style.transform = `translateX(-${x}%)`;

      /* index + diamonds highlight */
      const active = ex < 0.65 ? -1 : Math.round(q * segs);
      if (active !== lastActive) {
        lastActive = active;
        nameEls.forEach((el, i) =>
          el.classList.toggle("is-active", i === active),
        );
        diamondEls.forEach((el, i) =>
          el.classList.toggle("is-active", i === active),
        );
      }

      /* chrome fades in with the expansion */
      if (indexRef.current)
        indexRef.current.style.opacity = String(clamp01((ex - 0.6) / 0.4));
      if (diamondsRef.current)
        diamondsRef.current.style.opacity = String(clamp01((ex - 0.6) / 0.4));

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [count, totalVh, lang]);

  const ctaClick = () =>
    prefillQuote({ message: ui.galleryPrefill, fromLabel: works[count - 1].name });

  return (
    <section className="st-gallery" id="proyectos" key={lang}>
      <div
        className="st-wk-track"
        ref={trackRef}
        style={{ height: `calc(100vh + ${totalVh}vh)` }}
      >
        <div className="st-wk-sticky">
          <div className="st-wk-header" ref={headerRef}>
            <h2 className="st-gh-label" data-fade-reveal>
              {galleryHeader.label}
            </h2>
            <div className="st-gh-title">
              {galleryHeader.lines.map((line) => (
                <span key={line} data-word-reveal>
                  {line}
                </span>
              ))}
            </div>
            <p className="st-gh-sub">{galleryHeader.sub}</p>
          </div>

          <div className="st-wk-frame" ref={frameRef}>
            <div className="st-wk-panels" ref={panelsRef}>
              {works.map((work) => (
                <article className="st-wk-panel" key={work.name}>
                  {work.url ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={work.cover}
                        alt={work.name}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="st-wk-caption">
                        <div>
                          <div className="st-wk-name">{work.name}</div>
                          <div className="st-wk-meta">
                            {work.industry} — {work.result}
                          </div>
                        </div>
                        <a
                          className="st-wk-visit"
                          href={work.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor={ui.visitCursor}
                        >
                          {ui.wkVisit}
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="st-wk-ctapanel">
                      <div className="st-gh-label">( {work.industry} )</div>
                      <div className="st-wk-ctatitle">{work.name}</div>
                      <p className="st-wk-ctacopy">{work.result}</p>
                      <button
                        className="st-pk-cta"
                        onClick={ctaClick}
                        data-cursor={ui.startCursor}
                      >
                        {ui.wkCta}
                      </button>
                    </div>
                  )}
                </article>
              ))}
            </div>

            {/* name index — the "phrase" that lights up per panel */}
            <div className="st-wk-index" ref={indexRef}>
              {works.map((work, i) => (
                <span data-wk-name key={work.name}>
                  {work.name}
                  {i < count - 1 ? "," : "."}
                </span>
              ))}
            </div>
          </div>

          {/* diamond progress markers */}
          <div className="st-wk-diamonds" ref={diamondsRef}>
            {works.map((work) => (
              <i key={work.name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
