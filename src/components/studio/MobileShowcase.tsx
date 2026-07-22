"use client";

import { cubeFaceImages } from "@/lib/studio/data";
import { useContent } from "@/lib/studio/i18n";

/** Mobile-only cube showcase — replaces the pinned dark sequence on phones. */
export function MobileShowcase() {
  const { mobileShowcase } = useContent();
  return (
    <section className="st-mcube-section" aria-label="Quiénes somos">
      <h2 className="st-mcube-eye">{mobileShowcase.eyebrow}</h2>
      <div className="st-mcube-line">{mobileShowcase.title}</div>
      <div className="st-mcube-scene" aria-hidden="true">
        <div className="st-mcube">
          {["front", "right", "back", "left", "top", "bottom"].map(
            (face, i) => (
              <div className={`st-face is-${face}`} key={face}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cubeFaceImages[i % cubeFaceImages.length]}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ),
          )}
        </div>
      </div>
      <p className="st-mcube-copy">{mobileShowcase.copy}</p>
    </section>
  );
}
