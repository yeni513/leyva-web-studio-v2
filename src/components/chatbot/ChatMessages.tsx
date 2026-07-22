"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { ChatMessage, Lang } from "@/lib/chatbot/chatbot-types";
import { formatTime } from "@/lib/chatbot/chatbot-utils";
import { t } from "@/lib/chatbot/chatbot-config";
import { cn } from "@/lib/utils";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplies } from "./QuickReplies";
import { PackageRecommendationCard } from "./PackageRecommendationCard";
import { ChatbotDisclaimer } from "./ChatbotDisclaimer";

export function ChatMessages({
  messages,
  lang,
  isTyping,
  onQuickReply,
  onOpenLead,
}: {
  messages: ChatMessage[];
  lang: Lang;
  isTyping: boolean;
  onQuickReply: (value: string) => void;
  onOpenLead: () => void;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  const copy = t(lang);

  // Auto-scroll to the newest message / typing indicator.
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  // Index of the last assistant message — only it shows live affordances
  // (packages / quick replies / lead CTA) so history stays clean.
  const lastAssistantIndex = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return i;
    }
    return -1;
  })();

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 space-y-4 [scrollbar-width:thin]">
      <ChatbotDisclaimer lang={lang} />

      {messages.map((m, i) => {
        const isAssistant = m.role === "assistant";
        const isLastAssistant = isAssistant && i === lastAssistantIndex;

        return (
          <div key={m.id} className="space-y-2">
            <div
              className={cn(
                "flex items-end gap-2",
                isAssistant ? "justify-start" : "justify-end",
              )}
            >
              {isAssistant && (
                <span className="grid place-items-center w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-ember-200 via-ember-300 to-ember-500 text-ink-950 shadow-[0_0_16px_-4px_rgba(236,139,42,0.7)]">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              )}
              <div className={cn("max-w-[80%]", !isAssistant && "items-end")}>
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    "whitespace-pre-wrap break-words px-3.5 py-2.5 text-[13.5px] leading-relaxed",
                    isAssistant
                      ? "rounded-2xl rounded-bl-md border border-white/[0.08] bg-white/[0.04] text-ember-50/90"
                      : "rounded-2xl rounded-br-md bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 font-medium",
                  )}
                >
                  {m.text}
                </motion.div>
                <p
                  className={cn(
                    "mt-1 px-1 text-[10px] text-ember-50/35",
                    isAssistant ? "text-left" : "text-right",
                  )}
                >
                  {formatTime(m.createdAt, lang)}
                </p>
              </div>
            </div>

            {/* Live affordances — only under the most recent assistant turn */}
            {isLastAssistant && (
              <div className="pl-9 space-y-2.5">
                {m.packages?.map((pid) => (
                  <PackageRecommendationCard
                    key={pid}
                    id={pid}
                    lang={lang}
                    onRequestQuote={onOpenLead}
                  />
                ))}

                {m.offerLead && (
                  <button
                    type="button"
                    onClick={onOpenLead}
                    className="no-tap-highlight inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 px-4 py-2 text-[12.5px] font-semibold text-ink-950 shadow-[0_0_24px_-6px_rgba(236,139,42,0.6)] transition-shadow hover:shadow-[0_0_32px_-4px_rgba(236,139,42,0.85)]"
                  >
                    {copy.leadOpenCta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {m.quickReplies && (
                  <QuickReplies
                    replies={m.quickReplies}
                    onSelect={onQuickReply}
                    disabled={isTyping}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}

      <AnimatePresence>
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-2"
          >
            <span className="grid place-items-center w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-ember-200 via-ember-300 to-ember-500 text-ink-950">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <TypingIndicator />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={endRef} />
    </div>
  );
}
