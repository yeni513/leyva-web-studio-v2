"use client";

import { useEffect } from "react";

/**
 * Lock body scrolling while `isLocked` is true.
 *
 * Avoids the classic "position: fixed + top: -scrollY" pattern that causes
 * a visible flash on iOS Safari / Chrome Android (the body briefly snaps
 * to top: 0 between setting position and setting top). Instead we just
 * disable overflow and touch-action, which prevents scroll without
 * triggering any layout shift.
 *
 * Trade-off: on iOS < 16 the body might still be slightly touch-scrollable
 * behind the modal. With a full-screen backdrop-blur overlay this is
 * imperceptible and worth the tradeoff for zero flash.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousTouchAction = body.style.touchAction;
    body.style.overflow = "hidden";
    body.style.touchAction = "none";
    return () => {
      body.style.overflow = previousOverflow;
      body.style.touchAction = previousTouchAction;
    };
  }, [isLocked]);
}
