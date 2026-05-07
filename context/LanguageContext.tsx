'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, languages } from '../types';
import { translations } from '../data/content';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: any;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isRTL, setIsRTL] = useState(false);

  // Sync with URL locale on mount and when pathname changes
  useEffect(() => {
    const syncWithUrl = () => {
      const pathLang = window.location.pathname.split('/')[1];
      if (pathLang && languages[pathLang as Language]) {
        const lang = pathLang as Language;
        setLanguageState(lang);
        setIsRTL(languages[lang].rtl);
        document.documentElement.dir = languages[lang].rtl ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
      } else {
        // Fallback to localStorage or default
        try {
          const saved = localStorage.getItem('language') as Language;
          if (saved && languages[saved]) {
            setLanguageState(saved);
            setIsRTL(languages[saved].rtl);
            document.documentElement.dir = languages[saved].rtl ? 'rtl' : 'ltr';
            document.documentElement.lang = saved;
          }
        } catch {
          // localStorage unavailable
        }
      }
    };

    syncWithUrl();

    // Listen for popstate (back/forward navigation)
    window.addEventListener('popstate', syncWithUrl);
    return () => window.removeEventListener('popstate', syncWithUrl);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setIsRTL(languages[lang].rtl);
    try {
      localStorage.setItem('language', lang);
    } catch {
      // localStorage unavailable
    }
    document.documentElement.dir = languages[lang].rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
