import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 select-none",
        className,
      )}
      aria-label="Leyva Web Studio"
    >
      {/* SVG monogram — orbit with ember dot, no boxed background */}
      <span className="relative grid place-items-center w-7 h-7">
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <defs>
            <linearGradient id="lg-ember" x1="0" y1="0" x2="32" y2="32">
              <stop offset="0%" stopColor="#fdc97a" />
              <stop offset="60%" stopColor="#ec8b2a" />
              <stop offset="100%" stopColor="#a8500c" />
            </linearGradient>
            <radialGradient id="lg-dot" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fff4e0" />
              <stop offset="100%" stopColor="#ec8b2a" />
            </radialGradient>
          </defs>
          <circle
            cx="16"
            cy="16"
            r="12.5"
            stroke="url(#lg-ember)"
            strokeWidth="1.25"
            opacity="0.85"
          />
          <circle
            cx="16"
            cy="16"
            r="7.5"
            stroke="url(#lg-ember)"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <circle cx="26.5" cy="9.5" r="2.4" fill="url(#lg-dot)" />
        </svg>
      </span>
      <span className="flex items-baseline gap-1.5 font-semibold tracking-[0.18em] text-[15px]">
        <span className="text-ember-50">LEYVA</span>
        <span className="text-ember-300/70">·</span>
        <span className="text-ember-50/70 tracking-[0.22em] text-[11px] uppercase">
          Web Studio
        </span>
      </span>
    </span>
  );
}
