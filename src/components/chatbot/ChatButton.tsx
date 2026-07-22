"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Lang } from "@/lib/chatbot/chatbot-types";
import { t } from "@/lib/chatbot/chatbot-config";

/**
 * Floating launcher — studio grammar edition. A discreet dark-glass pill
 * with a hairline border, micro uppercase label in ( parentheses ) and a
 * softly pulsing ember "online" dot. Sits quietly over the experience.
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
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="no-tap-highlight group fixed z-40 inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-black/70 px-4 py-3 backdrop-blur-xl transition-colors duration-300 hover:border-white/30 sm:px-5"
      style={{
        right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* ember "online" dot */}
      <span className="relative grid place-items-center w-2.5 h-2.5">
        <span className="absolute inset-0 rounded-full bg-[#ec8b2a]" />
        {!reducedMotion && (
          <motion.span
            aria-hidden
            className="absolute -inset-1 rounded-full bg-[#ec8b2a]/40"
            animate={{ scale: [1, 1.9, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          />
        )}
      </span>
      <span className="relative hidden sm:inline text-[11px] font-medium uppercase tracking-[0.16em] text-white/75 transition-colors duration-300 group-hover:text-white whitespace-nowrap">
        ( {copy.openLabel} )
      </span>
    </motion.button>
  );
}
