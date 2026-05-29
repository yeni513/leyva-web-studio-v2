"use client";

import { ChevronDown, Sparkles, X } from "lucide-react";
import type { Lang } from "@/lib/chatbot/chatbot-types";
import { chatbotConfig, t } from "@/lib/chatbot/chatbot-config";

export function ChatHeader({
  lang,
  onClose,
}: {
  lang: Lang;
  onClose: () => void;
}) {
  const copy = t(lang);

  return (
    <div className="relative flex items-center gap-3 border-b border-white/[0.07] bg-ink-900/70 px-4 py-3">
      {/* top hairline accent */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-ember-300/45 to-transparent" />

      {/* Avatar with live status dot */}
      <span className="relative grid place-items-center w-10 h-10 shrink-0 rounded-full bg-gradient-to-br from-ember-200 via-ember-300 to-ember-500 text-ink-950 shadow-[0_0_20px_-4px_rgba(236,139,42,0.8)]">
        <Sparkles className="w-5 h-5" />
        <span className="absolute -bottom-0.5 -right-0.5 grid place-items-center w-3.5 h-3.5 rounded-full bg-ink-900">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_-1px_rgba(74,222,128,0.9)]" />
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <p className="font-display text-[15px] font-semibold tracking-tight text-ember-50 leading-tight">
          {copy.headerTitle}
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-ember-50/55">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          {copy.headerStatus}
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label={copy.minimizeAria}
        className="no-tap-highlight grid place-items-center w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] text-ember-50/70 transition-colors hover:bg-white/[0.08] hover:text-ember-50"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={onClose}
        aria-label={copy.closeAria}
        className="no-tap-highlight grid place-items-center w-8 h-8 rounded-full border border-white/[0.08] bg-white/[0.03] text-ember-50/70 transition-colors hover:bg-white/[0.08] hover:text-ember-50"
      >
        <X className="w-4 h-4" />
      </button>

      <span className="sr-only">{chatbotConfig.poweredBy}</span>
    </div>
  );
}
