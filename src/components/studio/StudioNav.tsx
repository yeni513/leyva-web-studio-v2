"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/studio/gsap";
import { useLenis } from "@/lib/studio/lenis";
import { menuThumbs } from "@/lib/studio/data";
import { useContent } from "@/lib/studio/i18n";
import { whatsappLink } from "@/lib/site";

/**
 * Navigation system:
 *  - fixed wordmark top-left (difference blend, always visible)
 *  - floating pill nav that slides in after scrolling past the hero
 *  - fullscreen-ish dropdown with big showcase rows + hover thumbnails
 */
export function StudioNav() {
  const [pillVisible, setPillVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const { menuRows, ui } = useContent();

  // pill appears after one viewport of scroll
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const goingUp = y < last - 2;
      last = y;
      setPillVisible(y > window.innerHeight * 0.85 && (goingUp || y > 0));
      if (y <= window.innerHeight * 0.5) setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // stagger rows when opening
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const rows = container.querySelectorAll(".st-showcase-row");
    if (open) {
      gsap.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.06,
        delay: 0.16,
        ease: "power3.out",
        overwrite: true,
      });
    } else {
      gsap.to(rows, { opacity: 0, y: 18, duration: 0.25, overwrite: true });
    }
  }, [open]);

  // close on Escape / outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [open]);

  const scrollTo = useCallback(
    (href: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(false);
      const el = document.querySelector(href);
      if (!el) return;
      if (lenis) lenis.scrollTo(el as HTMLElement, { duration: 1.4 });
      else el.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );

  return (
    <>
      <a
        className="st-fixed-logo"
        href="#inicio"
        onClick={scrollTo("#inicio")}
        data-cursor="INICIO"
        aria-label="LEYVA Web Studio — inicio"
      >
        LEYVA<sup>WS</sup>
      </a>

      <div
        ref={containerRef}
        className={`st-pillnav-container${pillVisible ? " is-visible" : ""}${
          open ? " is-open" : ""
        }`}
      >
        <div className="st-pillnav">
          <a
            className="st-pill-icon"
            href={whatsappLink(ui.waMessages.generic)}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="WHATSAPP"
            aria-label="Escribir por WhatsApp"
          >
            <svg viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </a>
          <a
            className="st-pill-logo"
            href="#inicio"
            onClick={scrollTo("#inicio")}
            data-cursor="INICIO"
            aria-label="LEYVA — inicio"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/wordmark-line.webp?v=3" alt="LEYVA WEB STUDIO" />
          </a>
          <button
            className="st-pill-icon"
            onClick={() => setOpen((v) => !v)}
            data-cursor={open ? ui.menuCloseCursor : ui.menuOpenCursor}
            aria-label={open ? ui.menuCloseAria : ui.menuOpenAria}
            aria-expanded={open}
          >
            <svg className="st-ham-svg" viewBox="0 0 24 24">
              <line className="st-ham-l1" x1="5" y1="9" x2="19" y2="9" />
              <line className="st-ham-l2" x1="5" y1="15" x2="19" y2="15" />
            </svg>
          </button>
        </div>

        <div className="st-dropdown" aria-hidden={!open}>
          <div className="st-dropdown-inner">
            {menuRows.map((row, i) => (
              <a
                key={row.href}
                className="st-showcase-row"
                href={row.href}
                onClick={scrollTo(row.href)}
                data-cursor="IR"
                tabIndex={open ? 0 : -1}
              >
                <span className="st-showcase-index">{row.index}</span>
                <MenuThumb src={menuThumbs[(i * 2) % menuThumbs.length]} side="left" />
                <span className="st-showcase-title">
                  <span className="st-showcase-title-track">
                    <span className="st-showcase-layer">{row.label}</span>
                    <span className="st-showcase-layer is-accent" aria-hidden>
                      {row.label}
                    </span>
                  </span>
                </span>
                <MenuThumb
                  src={menuThumbs[(i * 2 + 1) % menuThumbs.length]}
                  side="right"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function MenuThumb({ src, side }: { src: string; side: "left" | "right" }) {
  return (
    <span className={`st-showcase-thumb is-${side}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" loading="lazy" decoding="async" />
    </span>
  );
}
