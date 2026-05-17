import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mx-auto",
        align === "center" && "text-center",
        align === "left" && "mx-0 text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ember-300/20 bg-ember-300/[0.04] text-[11px] uppercase tracking-[0.18em] text-ember-300/90",
          )}
        >
          <span className="w-1 h-1 rounded-full bg-ember-300 animate-pulse-glow" />
          {eyebrow}
        </div>
      )}
      <h2 className="mt-4 font-display font-semibold tracking-tight text-balance text-[clamp(1.9rem,4.5vw,3.2rem)] leading-[1.05] text-ember-50">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-ember-50/70 leading-relaxed text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
