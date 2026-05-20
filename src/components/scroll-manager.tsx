"use client";

import { useEffect } from "react";

/**
 * Two responsibilities:
 *
 * 1. Reload behaviour — by default the browser remembers the last
 *    scroll position (and hash) when the user refreshes. After a user
 *    clicks "Cotizar mi sitio" once, every reload lands on the contact
 *    section instead of the hero. We force scroll-restoration to
 *    manual so refresh always starts at the top, and we strip the
 *    URL hash a moment after each smooth-scroll-to-anchor so a future
 *    reload doesn't replay the navigation.
 *
 * 2. Initial hash — if the user arrives with a hash in the URL (e.g.
 *    they clicked /#paquetes from somewhere external), do the smooth
 *    scroll once, then clean the URL so reloads still go to top.
 *
 * Mounted once at the page root.
 */
export function ScrollManager() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Tell the browser not to restore scroll on reload — we want the
    // page to start at the top every time.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Replace `/path#section` with `/path` after the smooth scroll
    // has had time to settle. 1500ms covers the slowest scrollIntoView
    // animations on the site.
    const clearHash = () => {
      if (!window.location.hash) return;
      window.setTimeout(() => {
        if (!window.location.hash) return;
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
      }, 1500);
    };

    // If the page loads with a hash (refresh or external link),
    // honour the scroll once then clean.
    if (window.location.hash) {
      // Wait a tick so the browser's own anchor-jump has happened
      // before we kick off the cleanup timer.
      window.setTimeout(clearHash, 0);
    }

    // Every time the hash changes (any anchor click on the page),
    // clean up after the scroll settles.
    window.addEventListener("hashchange", clearHash);
    return () => window.removeEventListener("hashchange", clearHash);
  }, []);

  return null;
}
