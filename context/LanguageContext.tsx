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
  const [language, setLanguageState] = useState<Language>('ka');
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && languages[saved]) {
      setLanguageState(saved);
      setIsRTL(languages[saved].rtl);
      document.documentElement.dir = languages[saved].rtl ? 'rtl' : 'ltr';
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setIsRTL(languages[lang].rtl);
    localStorage.setItem('language', lang);
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
