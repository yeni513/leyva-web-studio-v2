"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import * as es from "./data";
import * as en from "./data.en";

export type SiteLang = "es" | "en";

const STORAGE_KEY = "leyva-lang";

const LangContext = createContext<{
  lang: SiteLang;
  setLang: (l: SiteLang) => void;
}>({ lang: "es", setLang: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<SiteLang>("es");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "es") {
      setLangState(saved);
      document.documentElement.lang = saved === "es" ? "es-US" : "en-US";
    }
  }, []);

  const setLang = useCallback((l: SiteLang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
    document.documentElement.lang = l === "es" ? "es-US" : "en-US";
    // let independent widgets (chatbot) follow the site language
    window.dispatchEvent(
      new CustomEvent<SiteLang>("leyva:lang", { detail: l }),
    );
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

/**
 * Localized studio content. Spanish is the source of truth; the English
 * module overrides only the localized exports — shared assets (media paths,
 * pools, breakpoints) always come from the base module.
 */
export function useContent() {
  const { lang } = useLang();
  return (lang === "en" ? { ...es, ...en } : es) as typeof es;
}

/** Fixed ES — EN switch, top right, difference blend. */
export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="st-lang-toggle" role="group" aria-label="Idioma / Language">
      <button
        className={lang === "es" ? "is-active" : ""}
        onClick={() => setLang("es")}
        data-cursor="ESPAÑOL"
        aria-pressed={lang === "es"}
      >
        ES
      </button>
      <span aria-hidden>—</span>
      <button
        className={lang === "en" ? "is-active" : ""}
        onClick={() => setLang("en")}
        data-cursor="ENGLISH"
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}
