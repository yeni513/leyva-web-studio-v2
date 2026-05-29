"use client";

import { AnimatePresence, motion } from "framer-motion";
import type {
  ChatMessage,
  Lang,
  LeadData,
} from "@/lib/chatbot/chatbot-types";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { LeadCapturePanel } from "./LeadCapturePanel";

/**
 * The chat surface.
 * - Desktop: compact floating panel anchored bottom-right; does NOT block
 *   the page (no full-screen backdrop, pointer events only on the panel).
 * - Mobile: near-full-width bottom sheet with a dimmed, tap-to-close
 *   backdrop, capped at 85vh and safe-area aware.
 */
export function ChatWindow({
  lang,
  messages,
  isTyping,
  isMobile,
  leadOpen,
  leadHints,
  onClose,
  onSend,
  onQuickReply,
  onOpenLead,
  onCloseLead,
  onSubmitLead,
  onLeadDone,
}: {
  lang: Lang;
  messages: ChatMessage[];
  isTyping: boolean;
  isMobile: boolean;
  leadOpen: boolean;
  leadHints: Partial<LeadData>;
  onClose: () => void;
  onSend: (text: string) => void;
  onQuickReply: (value: string) => void;
  onOpenLead: () => void;
  onCloseLead: () => void;
  onSubmitLead: (lead: LeadData) => Promise<boolean>;
  onLeadDone: () => void;
}) {
  return (
    <>
      {/* Mobile-only dimmed backdrop */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[55] bg-ink-950/70 backdrop-blur-sm md:hidden"
          aria-hidden
        />
      )}

      <motion.div
        role="dialog"
        aria-modal={isMobile}
        aria-label="Leyva AI Assistant"
        initial={
          isMobile
            ? { opacity: 0, y: "100%" }
            : { opacity: 0, scale: 0.9, y: 24 }
        }
        animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
        exit={
          isMobile
            ? { opacity: 0, y: "100%" }
            : { opacity: 0, scale: 0.9, y: 24 }
        }
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={
          isMobile
            ? undefined
            : {
                right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
                bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
              }
        }
        className={
          isMobile
            ? "fixed inset-x-0 bottom-0 z-[60] flex h-[85vh] max-h-[85vh] flex-col overflow-hidden rounded-t-3xl border-t border-ember-300/25 bg-ink-900/95 backdrop-blur-xl shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.7)]"
            : "fixed z-[60] flex h-[620px] max-h-[calc(100vh-2.5rem)] w-[400px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-ember-300/25 bg-ink-900/90 backdrop-blur-xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)]"
        }
      >
        {/* Soft gradient border glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-60"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, rgba(236,139,42,0.18), transparent 60%)",
          }}
          aria-hidden
        />
        {/* Mobile grab handle */}
        {isMobile && (
          <div className="relative flex justify-center pt-2.5" aria-hidden>
            <span className="h-1 w-10 rounded-full bg-white/15" />
          </div>
        )}

        <div className="relative flex flex-1 flex-col overflow-hidden">
          <ChatHeader lang={lang} onClose={onClose} />

          <div className="relative flex flex-1 flex-col overflow-hidden">
            <ChatMessages
              messages={messages}
              lang={lang}
              isTyping={isTyping}
              onQuickReply={onQuickReply}
              onOpenLead={onOpenLead}
            />

            <AnimatePresence>
              {leadOpen && (
                <LeadCapturePanel
                  lang={lang}
                  initial={leadHints}
                  onBack={onCloseLead}
                  onSubmit={onSubmitLead}
                  onDone={onLeadDone}
                />
              )}
            </AnimatePresence>
          </div>

          {!leadOpen && (
            <ChatInput lang={lang} disabled={isTyping} onSend={onSend} />
          )}
        </div>
      </motion.div>
    </>
  );
}
