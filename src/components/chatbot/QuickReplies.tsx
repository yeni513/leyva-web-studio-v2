"use client";

import { motion } from "framer-motion";
import type { QuickReply } from "@/lib/chatbot/chatbot-types";

/** Elegant pill buttons that inject a canned user message when tapped. */
export function QuickReplies({
  replies,
  onSelect,
  disabled,
}: {
  replies: QuickReply[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}) {
  if (!replies.length) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {replies.map((r, i) => (
        <motion.button
          key={r.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(r.value)}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          className="no-tap-highlight inline-flex items-center rounded-full border border-ember-300/30 bg-ember-300/[0.06] px-3.5 py-1.5 text-[12.5px] font-medium text-ember-50/90 transition-colors hover:border-ember-300/55 hover:bg-ember-300/[0.14] hover:text-ember-50 disabled:opacity-50 disabled:pointer-events-none"
        >
          {r.label}
        </motion.button>
      ))}
    </div>
  );
}
