"use client";

import { useEffect, useRef } from "react";
import { ensureGsap, gsap, ScrollTrigger, Flip } from "@/lib/studio/gsap";
import { useContent, useLang } from "@/lib/studio/i18n";

/**
 * STM — the signature "letters matrix". Small service chips swap positions
 * via scrubbed GSAP Flip while the giant L·E·Y·V·A letters scramble in,
 * all in difference blend over the pinned cube backdrop.
 */
export function LettersMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  const { stmGroups } = useContent();
  const { lang } = useLang();

  useEffect(() => {
    ensureGsap();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const els = section.querySelectorAll<HTMLElement>(".st-stm-el");

      els.forEach((el) => {
        el.dataset.text = el.textContent ?? "";
      });

      const scramble = (el: HTMLElement) => {
        const text = el.dataset.text ?? "";
        const dur =
          el.dataset.stmScramble !== undefined
            ? parseFloat(el.dataset.stmScramble)
            : 1;
        gsap.killTweensOf(el);
        if (dur === 0) {
          el.textContent = text;
          return;
        }
        gsap.fromTo(
          el,
          { scrambleText: { text: "", chars: "" } },
          {
            scrambleText: { text, chars: "upperAndLowerCase", revealDelay: 0 },
            duration: dur,
          },
        );
      };

      els.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          onEnter: () => scramble(el),
          onEnterBack: () => scramble(el),
        });
      });

      els.forEach((el) => {
        const original = [...el.classList].find((c) =>
          c.startsWith("st-stm-pos-"),
        );
        const alt = el.dataset.stmAlt;
        if (!original || !alt) return;
        const flipEase = el.dataset.stmFlipEase || "expo.inOut";

        el.classList.add(alt);
        el.classList.remove(original);
        const flipState = Flip.getState(el, { props: "opacity,filter,width" });
        el.classList.add(original);
        el.classList.remove(alt);

        Flip.to(flipState, {
          ease: flipEase,
          scrollTrigger: {
            trigger: el,
            start: "clamp(bottom bottom-=10%)",
            end: "clamp(center center)",
            scrub: true,
          },
        });
        Flip.from(flipState, {
          ease: flipEase,
          scrollTrigger: {
            trigger: el,
            start: "clamp(center center)",
            end: "clamp(top top)",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section className="st-stm" ref={sectionRef} key={lang} aria-label="Servicios del estudio">
      <div className="st-stm-content">
        {stmGroups.map((group, gi) => (
          <div className="st-stm-group" key={gi}>
            {group.map((el, ei) => (
              <div
                key={`${gi}-${ei}`}
                className={[
                  "st-stm-el",
                  el.xl ? "st-stm-el--xl" : "",
                  el.typing ? "st-stm-typing" : "",
                  `st-stm-pos-${el.pos}`,
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-stm-alt={`st-stm-pos-${el.alt}`}
                data-stm-scramble={el.scramble}
                data-stm-flip-ease={el.flipEase}
              >
                {el.text}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
