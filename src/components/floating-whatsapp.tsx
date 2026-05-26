"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { useIsMobile } from "@/lib/use-is-mobile";
import { cn } from "@/lib/utils";

/**
 * Sticky WhatsApp call-to-action for mobile.
 *
 * Visible only on mobile (< md), only after the user has scrolled past
 * the hero. Sits above the bottom safe-area so it doesn't collide with
 * the iPhone home indicator. Hides itself when the Contact section is
 * already in view — at that point the form's button is the better path
 * and a floating bubble just clutters the screen.
 */
export function FloatingWhatsApp() {
  const isMobile = useIsMobile();
  const [scrolledIn, setScrolledIn] = useState(false);
  const [overContact, setOverContact] = useState(false);

  useEffect(() => {
    if (!isMobile) return;

    const onScroll = () => {
      // Show after the user clears ~60% of the first viewport.
      setScrolledIn(window.scrollY > window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Hide when the contact section enters the viewport — the form's
    // own CTA takes over.
    const contact = document.getElementById("contact");
    let observer: IntersectionObserver | null = null;
    if (contact) {
      observer = new IntersectionObserver(
        ([entry]) => setOverContact(entry.isIntersecting),
        { threshold: 0.15 },
      );
      observer.observe(contact);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, [isMobile]);

  if (!isMobile) return null;

  const visible = scrolledIn && !overContact;

  return (
    <a
      href={whatsappLink(
        "Hola Leyva, vi tu sitio y quiero cotizar uno para mi negocio.",
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className={cn(
        "fixed z-40 grid place-items-center transition-all duration-300 no-tap-highlight",
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
      style={{
        right: "calc(1rem + env(safe-area-inset-right, 0px))",
        bottom: "calc(1rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <span className="relative grid place-items-center">
        {/* Outer pulse aura */}
        <span
          className="absolute inset-0 rounded-full bg-ember-400/45 blur-md animate-pulse-glow"
          aria-hidden
        />
        {/* The button face */}
        <span className="relative grid place-items-center w-14 h-14 rounded-full bg-gradient-to-br from-ember-200 via-ember-300 to-ember-500 text-ink-950 shadow-glow border border-ember-100/40">
          <MessageCircle className="w-6 h-6" strokeWidth={2.25} />
        </span>
        {/* Small "1" indicator — same affordance as the demo mockup, signals "new message" feel */}
        <span
          className="absolute -top-0.5 -right-0.5 grid place-items-center w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold border border-ink-950 shadow"
          aria-hidden
        >
          1
        </span>
      </span>
    </a>
  );
}
