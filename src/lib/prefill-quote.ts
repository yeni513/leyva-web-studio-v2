"use client";

/**
 * Shared "smart prefill" channel for the quote form.
 *
 * Any CTA across the site can call `prefillQuote(...)` with context about
 * where the user clicked from (industry, package, service, etc.). The
 * Contact form listens on the global event and auto-completes the
 * matching fields, then smooth-scrolls into view.
 */

export interface QuotePrefill {
  /** Industry to pre-select. Must match one of the form's industry options. */
  industry?: string;
  /** Project timeline. Must match one of the form's timeline options. */
  timeline?: string;
  /** Content readiness chip. Must match one of the form's chip values. */
  hasContent?: string;
  /** Project type. Must match one of the form's type options. */
  type?: string;
  /** Budget bucket. Must match one of the form's budget options. */
  budget?: string;
  /** Free-text message that lands in the textarea. */
  message?: string;
  /** Short human label rendered on the form's "Pre-llenado desde:" pill. */
  fromLabel?: string;
}

const EVENT_NAME = "leyva:prefill-quote";

interface PrefillOptions {
  /**
   * Delay (ms) before scrolling to the contact section. Use a larger value
   * (e.g. 450) when called from inside a modal so the modal's exit
   * animation + body-scroll unlock complete before the smooth scroll fires.
   */
  scrollDelay?: number;
  /** If false, the helper updates state but does not scroll. Defaults to true. */
  scroll?: boolean;
}

export function prefillQuote(
  data: QuotePrefill,
  options: PrefillOptions = {},
) {
  if (typeof window === "undefined") return;

  // Fire the prefill event right away so the form's listener can update
  // state. Even if the scroll is delayed (modal exit), the form is already
  // populated by the time the user arrives.
  window.dispatchEvent(
    new CustomEvent<QuotePrefill>(EVENT_NAME, { detail: data }),
  );

  const shouldScroll = options.scroll !== false;
  if (!shouldScroll) return;

  const delay = options.scrollDelay ?? 80;
  window.setTimeout(() => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, delay);
}

export function onPrefillQuote(
  handler: (data: QuotePrefill) => void,
): () => void {
  if (typeof window === "undefined") return () => {};
  const listener = (e: Event) => {
    handler((e as CustomEvent<QuotePrefill>).detail);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
