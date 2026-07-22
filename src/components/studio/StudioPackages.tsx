"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap } from "@/lib/studio/gsap";
import { useContent } from "@/lib/studio/i18n";
import { prefillQuote } from "@/lib/prefill-quote";

/** Pricing — minimal black cards in the studio grammar. */
export function StudioPackages() {
  const sectionRef = useRef<HTMLElement>(null);
  const { packagesHeader, studioPackages, ui } = useContent();

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        section.querySelectorAll(".st-pk-card"),
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        },
      );
      gsap.fromTo(
        section.querySelectorAll(".st-pk-header > *"),
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      className="st-packages"
      id="precios"
      ref={sectionRef}
      aria-label="Paquetes y precios"
    >
      <div className="st-pk-header">
        <div className="st-gh-label">{packagesHeader.label}</div>
        <h2 className="st-gh-title">
          {packagesHeader.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <p className="st-gh-sub">{packagesHeader.sub}</p>
      </div>

      <div className="st-pk-grid">
        {studioPackages.map((pkg) => (
          <article
            key={pkg.name}
            className={`st-pk-card${pkg.highlight ? " is-highlight" : ""}`}
          >
            <div className="st-pk-tag">( {pkg.tag} )</div>
            <h3 className="st-pk-name">{pkg.name}</h3>
            <div className="st-pk-price">
              <span className="st-pk-amount">{pkg.setupPrice}</span>
              <span className="st-pk-per">
                {ui.pkSetupSuffix} {pkg.monthlyPrice}
                {ui.pkMonthSuffix}
              </span>
            </div>
            <p className="st-pk-desc">{pkg.desc}</p>
            <ul className="st-pk-features">
              {pkg.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button
              className="st-pk-cta"
              data-cursor="COTIZAR"
              onClick={() =>
                prefillQuote({
                  message: ui.pkPrefill(pkg.name, pkg.setupPrice, pkg.monthlyPrice),
                  fromLabel: pkg.name,
                })
              }
            >
              {ui.pkCtaPrefix} {pkg.name} →
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
