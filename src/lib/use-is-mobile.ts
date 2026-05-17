"use client";

import { useEffect, useState } from "react";

/**
 * Returns true after mount when viewport width is below `breakpoint`.
 * Always returns false during SSR + first paint so server and client
 * markup match and content is never accidentally hidden.
 */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, [breakpoint]);

  return isMobile;
}
