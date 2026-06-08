"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const UltimateChatbot = dynamic(
  () => import("./UltimateChatbot").then((mod) => mod.UltimateChatbot),
  { ssr: false, loading: () => null },
);

export function LazyChatbot() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const enable = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = globalThis.setTimeout(enable, 1500);
    return () => globalThis.clearTimeout(timeoutId);
  }, []);

  return enabled ? <UltimateChatbot /> : null;
}
