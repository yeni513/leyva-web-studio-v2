"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "leyva-lang";

/**
 * Site-wide language state for the ES/EN toggle.
 *
 * Default is "es" so the server-rendered HTML matches Spanish (the
 * primary audience). On mount we read the visitor's saved choice from
 * localStorage and switch if needed — and reflect it on <html lang>.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === "en" || saved === "es") setLangState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = lang === "en" ? "en-US" : "es-US";
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  const toggle = () => setLang(lang === "es" ? "en" : "es");

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

/**
 * Read the current language. Safe to call outside the provider (falls
 * back to "es") so a stray component never crashes.
 */
export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    return { lang: "es", setLang: () => {}, toggle: () => {} };
  }
  return ctx;
}

/** Pick the right value from a `{ es, en }` pair. */
export function pick<T>(lang: Lang, es: T, en: T): T {
  return lang === "en" ? en : es;
}
