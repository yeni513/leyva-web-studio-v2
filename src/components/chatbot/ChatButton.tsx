"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { Lang } from "@/lib/chatbot/chatbot-types";
import { t } from "@/lib/chatbot/chatbot-config";

/**
 * Floating launcher. Bottom-right, above the fold of every section.
 * Pulsing glow ring (disabled under reduced motion) + a premium label
 * pill that reads "¿Necesitas una web?" / "Need a website?".
 */
export function ChatButton({
  lang,
  onOpen,
}: {
  lang: Lang;
  onOpen: () => void;
}) {
  const reducedMotion = useReducedMotion();
  const copy = t(lang);

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      aria-label={copy.openLabel}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.6, y: 20 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="no-tap-highlight fixed z-40 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-500 p-4 sm:pl-3.5 sm:pr-4 sm:py-3 text-ink-950 shadow-glow"
      style={{
        right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Pulsing glow ring */}
      {!reducedMotion && (
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-ember-400/50"
          animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative grid place-items-center w-6 h-6 rounded-full bg-ink-950/15">
        <Sparkles className="w-4 h-4" />
      </span>
      <span className="relative hidden sm:inline text-[13.5px] font-semibold tracking-tight whitespace-nowrap">
        {copy.openLabel}
      </span>
    </motion.button>
  );
}
