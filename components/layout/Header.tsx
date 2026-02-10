'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { languages, Language } from '@/types';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, Moon, Sun } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.tours, href: '#tours' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.booking, href: '#booking' },
    { name: t.nav.contact, href: '#contact' },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "glass-dark py-3 shadow-lg" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-accent animate-pulse">🇬🇪</span>
          <span className={cn("tracking-tight", isRTL ? "font-arabic" : "font-inter")}>GEORGIAN TREASURE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-white/80 hover:text-white transition-colors font-medium text-sm"
            >
              {link.name}
            </Link>
          ))}
          
          <div className="h-4 w-px bg-white/20 mx-2" />

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 text-white/80 hover:text-white glass rounded-full transition-all active:scale-90"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Language Picker */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 text-white glass px-3 py-1.5 rounded-full hover:border-accent/50 transition-all text-sm"
            >
              <Globe size={16} />
              <span>{languages[language].flag}</span>
            </button>
            
            {isLangOpen && (
              <div className={cn(
                "absolute top-full mt-2 w-48 glass-dark rounded-xl overflow-hidden shadow-2xl border border-white/10 p-1",
                isRTL ? "left-0" : "right-0"
              )}>
                {Object.entries(languages).map(([code, data]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code as Language);
                      setIsLangOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-2 flex items-center justify-between hover:bg-white/10 rounded-lg transition-colors text-white text-xs",
                      language === code && "bg-accent/20 text-accent font-bold"
                    )}
                  >
                    <span>{data.name}</span>
                    <span className="text-base">{data.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 text-white glass rounded-full"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className="text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-dark absolute top-full left-0 right-0 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-xl text-white font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              {Object.entries(languages).map(([code, data]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code as Language);
                    setIsMenuOpen(false);
                  }}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl transition-all",
                    language === code ? "bg-accent/20 border border-accent/50 scale-105" : "bg-white/5"
                  )}
                >
                  <span className="text-3xl">{data.flag}</span>
                  <span className="text-[10px] text-white/70 uppercase tracking-widest">{data.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
