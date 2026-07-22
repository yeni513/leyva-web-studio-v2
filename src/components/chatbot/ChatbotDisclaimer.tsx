"use client";

import { Info } from "lucide-react";
import type { Lang } from "@/lib/chatbot/chatbot-types";
import { t } from "@/lib/chatbot/chatbot-config";

/** Small always-honest note: the assistant informs, Alexander confirms. */
export function ChatbotDisclaimer({ lang }: { lang: Lang }) {
  return (
    <div className="flex items-start gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[11px] leading-snug text-ember-50/55">
      <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-ember-300/70" />
      <span>{t(lang).disclaimer}</span>
    </div>
  );
}
