"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type {
  ChatApiRequest,
  ChatMessage,
  ChatResponse,
  Lang,
  LeadData,
} from "@/lib/chatbot/chatbot-types";
import {
  chatbotConfig,
  INITIAL_QUICK_REPLIES,
  t,
} from "@/lib/chatbot/chatbot-config";
import { generateReply } from "@/lib/chatbot/chatbot-mock-ai";
import { createId, randomBetween } from "@/lib/chatbot/chatbot-utils";
import { useIsMobile } from "@/lib/use-is-mobile";
import { useBodyScrollLock } from "@/lib/use-body-scroll-lock";
import { ChatButton } from "./ChatButton";
import { ChatWindow } from "./ChatWindow";

/**
 * Top-level chatbot controller. Owns all conversation + lead state and
 * wires the launcher button to the chat surface. Mounted once globally
 * from app/layout.tsx.
 */
export function UltimateChatbot() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(chatbotConfig.defaultLang);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadHints, setLeadHints] = useState<Partial<LeadData>>({
    language: chatbotConfig.defaultLang,
  });
  const seeded = useRef(false);

  // Lock the page behind the mobile bottom-sheet only.
  useBodyScrollLock(open && isMobile);

  // Seed the opening message the first time the widget opens.
  useEffect(() => {
    if (!open || seeded.current) return;
    seeded.current = true;
    setMessages([
      {
        id: createId("a"),
        role: "assistant",
        text: t(lang).opening,
        createdAt: Date.now(),
        quickReplies: INITIAL_QUICK_REPLIES[lang],
      },
    ]);
  }, [open, lang]);

  // Escape: close the lead panel first, otherwise close the window.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setLeadOpen((wasOpen) => {
        if (wasOpen) return false;
        setOpen(false);
        return false;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const callChat = useCallback(
    async (history: ChatMessage[], currentLang: Lang): Promise<ChatResponse> => {
      const payload: ChatApiRequest = {
        messages: history.map((m) => ({ role: m.role, text: m.text })),
        lang: currentLang,
      };
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) return (await res.json()) as ChatResponse;
      } catch {
        /* fall through to local mock */
      }
      // Offline / error fallback — identical logic, runs client-side.
      return generateReply(payload);
    },
    [],
  );

  const handleSend = useCallback(
    async (text: string) => {
      const userMsg: ChatMessage = {
        id: createId("u"),
        role: "user",
        text,
        createdAt: Date.now(),
      };
      const history = [...messages, userMsg];
      setMessages(history);
      setIsTyping(true);

      const startedAt = Date.now();
      const response = await callChat(history, lang);

      // Keep a natural minimum "thinking" beat even if the API is instant.
      const minDelay = randomBetween(
        chatbotConfig.typing.min,
        chatbotConfig.typing.max,
      );
      const elapsed = Date.now() - startedAt;
      if (elapsed < minDelay) {
        await new Promise((r) => setTimeout(r, minDelay - elapsed));
      }

      setLang(response.lang);
      setLeadHints({ ...response.leadHints, language: response.lang });
      setMessages((prev) => [
        ...prev,
        {
          id: createId("a"),
          role: "assistant",
          text: response.reply,
          createdAt: Date.now(),
          packages: response.packages,
          quickReplies: response.quickReplies,
          offerLead: response.offerLead,
        },
      ]);
      setIsTyping(false);
    },
    [messages, lang, callChat],
  );

  const submitLead = useCallback(
    async (lead: LeadData): Promise<boolean> => {
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lead),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
        };
        return res.ok && data.ok !== false;
      } catch {
        return false;
      }
    },
    [],
  );

  const handleLeadDone = useCallback(() => {
    setLeadOpen(false);
    setMessages((prev) => [
      ...prev,
      {
        id: createId("a"),
        role: "assistant",
        text: t(lang).leadSuccess,
        createdAt: Date.now(),
      },
    ]);
  }, [lang]);

  return (
    <>
      <AnimatePresence>
        {!open && (
          <ChatButton lang={lang} onOpen={() => setOpen(true)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <ChatWindow
            lang={lang}
            messages={messages}
            isTyping={isTyping}
            isMobile={isMobile}
            leadOpen={leadOpen}
            leadHints={leadHints}
            onClose={() => setOpen(false)}
            onSend={handleSend}
            onQuickReply={handleSend}
            onOpenLead={() => setLeadOpen(true)}
            onCloseLead={() => setLeadOpen(false)}
            onSubmitLead={submitLead}
            onLeadDone={handleLeadDone}
          />
        )}
      </AnimatePresence>
    </>
  );
}
