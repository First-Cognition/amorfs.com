"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isLoaded: boolean;
  translationsLoaded: boolean;
  animationComplete: boolean;
  setAnimationComplete: (value: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = "amorfs-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [translationsLoaded, setTranslationsLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // isLoaded is true only when BOTH translations are loaded AND animation is complete
  const isLoaded = translationsLoaded && animationComplete;

  // Load language from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (savedLanguage === "en" || savedLanguage === "vi") {
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
      }
    }
  }, []);

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Load translations when language changes
  useEffect(() => {
    const loadTranslations = async () => {
      setTranslationsLoaded(false);
      try {
        const translationsModule = await import(`@/locales/${language}.json`);
        setTranslations(translationsModule.default || translationsModule);
        setTranslationsLoaded(true);
      } catch (error) {
        console.error(`Failed to load translations for ${language}:`, error);
        // Fallback to English if loading fails
        if (language !== "en") {
          try {
            const enTranslations = await import(`@/locales/en.json`);
            setTranslations(enTranslations.default || enTranslations);
            setTranslationsLoaded(true);
          } catch (e) {
            console.error("Failed to load English translations:", e);
            setTranslationsLoaded(true);
          }
        } else {
          setTranslationsLoaded(true);
        }
      }
    };

    loadTranslations();
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    }
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === "string" ? value : key;
  };

  const handleSetAnimationComplete = useCallback((value: boolean) => {
    setAnimationComplete(value);
  }, []);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      isLoaded,
      translationsLoaded,
      animationComplete,
      setAnimationComplete: handleSetAnimationComplete,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
