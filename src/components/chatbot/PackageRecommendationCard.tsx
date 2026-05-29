"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  LayoutTemplate,
  Store,
  Sparkles,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  Search,
  Rocket,
  Cpu,
  type LucideIcon,
} from "lucide-react";
import type {
  Lang,
  PackageId,
  PackageIconMap,
} from "@/lib/chatbot/chatbot-types";
import { getPackage, PRICING_NOTE } from "@/lib/chatbot/chatbot-knowledge";
import { t } from "@/lib/chatbot/chatbot-config";

const ICONS: PackageIconMap = {
  "starter-landing": LayoutTemplate,
  "local-business": Store,
  "premium-business": Sparkles,
  ecommerce: ShoppingBag,
  restaurant: UtensilsCrossed,
  maintenance: Wrench,
  "seo-local": Search,
  "growth-bundle": Rocket,
  "custom-system": Cpu,
};

/** A premium recommendation card rendered inline in the conversation. */
export function PackageRecommendationCard({
  id,
  lang,
  onRequestQuote,
}: {
  id: PackageId;
  lang: Lang;
  onRequestQuote: () => void;
}) {
  const pkg = getPackage(id);
  if (!pkg) return null;
  const Icon: LucideIcon = ICONS[id];
  const copy = t(lang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl border border-ember-300/25 bg-gradient-to-b from-ember-300/[0.08] to-white/[0.02] p-4"
    >
      <div
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-ember-400/10 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="relative flex items-start gap-3">
        <span className="grid place-items-center w-9 h-9 shrink-0 rounded-xl border border-ember-300/35 bg-ember-300/[0.12] text-ember-300">
          <Icon className="w-5 h-5" />
        </span>
        <div className="min-w-0">
          <h4 className="font-display text-[15px] font-semibold tracking-tight text-ember-50 leading-tight">
            {pkg.name[lang]}
          </h4>
          <p className="mt-0.5 text-[12.5px] leading-snug text-ember-50/70">
            {pkg.tagline[lang]}
          </p>
        </div>
      </div>

      <ul className="relative mt-3 grid gap-1.5">
        {pkg.includes[lang].slice(0, 4).map((f) => (
          <li
            key={f}
            className="flex items-start gap-2 text-[12.5px] leading-snug text-ember-50/85"
          >
            <span className="mt-0.5 grid place-items-center w-3.5 h-3.5 shrink-0 rounded-full bg-ember-300/20 text-ember-300">
              <Check className="w-2.5 h-2.5" />
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <p className="relative mt-3 text-[10.5px] leading-snug text-ember-50/45">
        {PRICING_NOTE[lang]}
      </p>

      <button
        type="button"
        onClick={onRequestQuote}
        className="no-tap-highlight relative mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 px-4 py-2 text-[12.5px] font-semibold text-ink-950 shadow-[0_0_24px_-6px_rgba(236,139,42,0.6)] transition-shadow hover:shadow-[0_0_32px_-4px_rgba(236,139,42,0.85)]"
      >
        {copy.recommendCta}
        <ArrowUpRight className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
