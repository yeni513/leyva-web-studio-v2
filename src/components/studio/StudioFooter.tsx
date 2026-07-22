"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/studio/gsap";
import { useContent } from "@/lib/studio/i18n";
import { site, whatsappLink } from "@/lib/site";

/** Footer — info bar, giant © bridge and the ember parallax outro. */
export function StudioFooter() {
  const rootRef = useRef<HTMLElement>(null);
  const { footerBlock, ui } = useContent();
  const videoRef = useRef<HTMLVideoElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ensureGsap();
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting ?? false;
        const v = videoRef.current;
        if (!v) return;
        if (inView) {
          if (!v.src) v.src = "/media/hero5.mp4?v=3";
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(root);

    const ctx = gsap.context(() => {
      if (parallaxBgRef.current) {
        gsap.fromTo(
          parallaxBgRef.current,
          { yPercent: -18 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: parallaxBgRef.current.parentElement,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          },
        );
      }
      gsap.fromTo(
        root.querySelectorAll("[data-footer-reveal]"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root, start: "top 82%" },
        },
      );
    }, root);

    return () => {
      io.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <footer className="st-footer" ref={rootRef}>
      <div className="st-footer-top">
        <div className="st-footer-infobar" data-footer-reveal>
          {footerBlock.infoBar.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>

        <div className="st-footer-main">
          <div data-footer-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="st-footer-logo"
              src="/media/wordmark.webp?v=3"
              alt="LEYVA Web Studio"
              loading="lazy"
            />
            <p className="st-footer-desc">{footerBlock.description}</p>
            <div className="st-footer-contact">
              <a href={`mailto:${site.contact.email}`} data-cursor="EMAIL">
                {site.contact.email}
              </a>
              <a
                href={whatsappLink(ui.waMessages.info)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="CHAT"
              >
                {site.contact.whatsappDisplay}
              </a>
            </div>
            <div className="st-footer-location">{ui.location}</div>
            <div className="st-footer-links">
              <a
                href={whatsappLink(ui.waMessages.generic)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ui.footerLinks.whatsapp}
              </a>
              <a href={`mailto:${site.contact.email}`}>{ui.footerLinks.email}</a>
              <a href="/privacidad">{ui.footerLinks.privacy}</a>
              <a href="/terminos">{ui.footerLinks.terms}</a>
            </div>
          </div>

          <div className="st-footer-videothumb" data-footer-reveal>
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              poster="/media/hero5.webp?v=3"
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="st-footer-bridge" aria-hidden="true">
          <span>©</span>
        </div>
      </div>

      <div className="st-footer-parallax">
        <div className="st-footer-parallax-bg" ref={parallaxBgRef} />
        <div className="st-footer-parallax-copy">
          <div>{footerBlock.legalName}</div>
          <div>{footerBlock.copyright}</div>
        </div>
      </div>
    </footer>
  );
}
