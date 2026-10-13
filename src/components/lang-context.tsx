"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { isLanguage, type Language } from "@/lib/language";

export type { Language };

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

// Standalone provider: same useLanguage() contract as monSite, without
// next/navigation. Preference persists in localStorage only.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setState] = useState<Language>("en");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("pkmn.lang");
      if (isLanguage(saved)) {
        setState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* Language remains usable without storage. */
    }
  }, []);

  const setLanguage = (next: Language) => {
    if (!isLanguage(next)) return;
    setState(next);
    try {
      window.localStorage.setItem("pkmn.lang", next);
    } catch {
      /* Language remains usable without storage. */
    }
    document.documentElement.lang = next;
  };

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
