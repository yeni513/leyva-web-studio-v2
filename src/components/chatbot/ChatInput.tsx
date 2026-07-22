"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import type { Lang } from "@/lib/chatbot/chatbot-types";
import { t } from "@/lib/chatbot/chatbot-config";

/**
 * Auto-growing textarea. Enter sends; Shift+Enter inserts a newline.
 * Send is disabled while empty or while the assistant is responding.
 */
export function ChatInput({
  lang,
  disabled,
  onSend,
}: {
  lang: Lang;
  disabled: boolean;
  onSend: (text: string) => void;
}) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);
  const copy = t(lang);

  const grow = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const submit = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
    requestAnimationFrame(() => {
      if (ref.current) ref.current.style.height = "auto";
    });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const canSend = value.trim().length > 0 && !disabled;

  return (
    <div className="border-t border-white/[0.07] bg-ink-950/60 p-3">
      <div className="flex items-end gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 transition-colors focus-within:border-ember-300/45">
        <textarea
          ref={ref}
          rows={1}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            grow();
          }}
          onKeyDown={onKeyDown}
          placeholder={copy.placeholder}
          aria-label={copy.placeholder}
          className="flex-1 resize-none bg-transparent text-[14px] leading-relaxed text-ember-50 placeholder:text-ember-50/35 focus:outline-none max-h-[120px]"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!canSend}
          aria-label={copy.sendAria}
          className="no-tap-highlight grid place-items-center w-9 h-9 shrink-0 rounded-xl bg-gradient-to-b from-ember-200 via-ember-300 to-ember-400 text-ink-950 shadow-[0_0_18px_-6px_rgba(236,139,42,0.7)] transition-all hover:shadow-[0_0_26px_-4px_rgba(236,139,42,0.9)] active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
