"use client";

import { Globe } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Compact ES/EN segmented toggle. Premium pill that matches the navbar.
 * `compact` drops the globe icon for tight spaces (mobile menu row).
 */
export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  const opts: Lang[] = ["es", "en"];

  return (
    <div
      role="group"
      aria-label="Language / Idioma"
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-0.5",
        className,
      )}
    >
      <Globe className="w-3.5 h-3.5 mx-1 text-ember-300/70 shrink-0" aria-hidden />
      {opts.map((o) => {
        const active = lang === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => setLang(o)}
            aria-pressed={active}
            aria-label={o === "es" ? "Español" : "English"}
            className={cn(
              "no-tap-highlight px-2 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-colors",
              active
                ? "bg-ember-300/[0.16] text-ember-100"
                : "text-ember-50/55 hover:text-ember-50",
            )}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
