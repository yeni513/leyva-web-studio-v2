"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { BrandMark } from "@/components/brand";
import { AnchorButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proceso", label: "Proceso" },
  { href: "#paquetes", label: "Paquetes" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "pt-2" : "pt-4",
      )}
    >
      <div className="container">
        <nav
          className={cn(
            "flex items-center justify-between gap-3 rounded-full border border-white/[0.06] px-4 sm:px-5 h-14 transition-all duration-500",
            scrolled
              ? "bg-ink-950/70 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)] border-white/[0.09]"
              : "bg-ink-950/30 backdrop-blur-md",
          )}
          aria-label="Navegación principal"
        >
          <a
            href="#top"
            className="no-tap-highlight shrink-0"
            aria-label="Leyva Web Studio — Ir al inicio"
          >
            <BrandMark />
          </a>

          <ul className="hidden md:flex items-center gap-1 text-sm text-ember-50/80">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-3 py-2 rounded-full hover:text-ember-50 hover:bg-white/[0.04] transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <AnchorButton
              href="#contact"
              size="sm"
              variant="primary"
              className="h-10 px-4 text-sm"
            >
              Cotizar mi sitio
              <ArrowUpRight className="w-4 h-4" />
            </AnchorButton>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-ember-50 no-tap-highlight"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden fixed inset-x-0 top-[72px] bottom-0 z-40 transition-all duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div className="relative container pt-6">
          <ul className="flex flex-col gap-1 rounded-3xl border border-white/[0.08] bg-ink-900/80 p-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-4 text-ember-50/90 hover:text-ember-50 hover:bg-white/[0.04] text-base"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-ember-300/70" />
                </a>
              </li>
            ))}
            <li className="pt-2">
              <AnchorButton
                href="#contact"
                onClick={() => setOpen(false)}
                size="lg"
                className="w-full"
              >
                Cotizar mi sitio
                <ArrowUpRight className="w-4 h-4" />
              </AnchorButton>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
