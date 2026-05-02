'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  Phone,
  Mail,
  Instagram,
  MapPin,
  Compass,
  BookOpen,
  Star,
  ArrowRight,
  Mountain,
  Newspaper,
  Sparkles,
  Home,
  Image,
  MessageSquare,
  Users,
  HelpCircle,
} from 'lucide-react';

const languages = [
  { code: 'ka', name: 'ქართული', flag: '🇬🇪' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
];

export function Header() {
  const { language, isRTL, setLanguage, t } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const currentLang = languages.find((l) => l.code === language) || languages[1];

  const navItems = [
    { href: `/${language}`, label: t?.nav?.home || 'Home', icon: Home },
    { href: `/${language}/tours`, label: t?.nav?.tours || 'Tours', icon: Compass },
    { href: `/${language}/regions`, label: t?.nav?.regions || 'Regions', icon: MapPin },
    { href: `/${language}/gallery`, label: t?.nav?.gallery || 'Gallery', icon: Image },
    { href: `/${language}/reviews`, label: t?.nav?.reviews || 'Reviews', icon: Star },
    { href: `/${language}/blog`, label: t?.nav?.blog || 'Blog', icon: Newspaper },
    { href: `/${language}/about`, label: t?.nav?.about || 'About', icon: Users },
    { href: `/${language}/contact`, label: t?.nav?.contact || 'Contact', icon: MessageSquare },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const switchLang = (code: Language) => {
    setLanguage(code);
    setLangDropdownOpen(false);
    // Navigate to same page in new language
    const segments = pathname.split('/');
    if (segments.length > 1) {
      segments[1] = code;
      window.location.href = segments.join('/');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-[#001F3F]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${language}`} className="flex items-center gap-2 z-10">
            <span className="text-[#D4AF37] text-xl font-black tracking-tighter">
              GEORGIAN
            </span>
            <span className="text-white text-xl font-black tracking-tighter">
              TREASURE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                  isActive(item.href)
                    ? 'text-[#D4AF37]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#D4AF37] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className={`flex items-center gap-3 z-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {/* Custom Tour CTA - Desktop */}
            <Link
              href={`/${language}/custom-tour`}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-[#001F3F] text-sm font-bold rounded-xl hover:bg-[#E5C048] transition-colors"
            >
              <Sparkles size={14} />
              {language === 'ka' ? 'ინდ. ტური'
                : language === 'en' ? 'Custom Tour'
                : language === 'ru' ? 'Инд. тур'
                : language === 'uk' ? 'Інд. тур'
                : language === 'ar' ? 'جولة مخصصة'
                : 'סיור מותאם'}
            </Link>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-sm text-white hover:bg-white/10 transition-colors"
              >
                <span>{currentLang.flag}</span>
                <span className="hidden sm:inline">{currentLang.code.toUpperCase()}</span>
                <ChevronDown size={12} className={`text-white/50 transition-transform ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <>
                    <div className="fixed inset-0" onClick={() => setLangDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-48 glass-dark rounded-xl overflow-hidden shadow-2xl border border-white/10"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => switchLang(lang.code as Language)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                            language === lang.code
                              ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[#001F3F]/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className={`flex flex-col gap-1 ${isRTL ? 'items-end' : ''}`}>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    } ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ))}

                {/* Custom Tour CTA - Mobile */}
                <Link
                  href={`/${language}/custom-tour`}
                  className={`flex items-center gap-3 px-4 py-3 mt-2 bg-[#D4AF37] text-[#001F3F] rounded-xl text-sm font-bold ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <Sparkles size={18} />
                  {language === 'ka' ? 'ინდივიდუალური ტური'
                    : language === 'en' ? 'Custom Tour'
                    : language === 'ru' ? 'Индивидуальный тур'
                    : language === 'uk' ? 'Індивідуальний тур'
                    : language === 'ar' ? 'جولة مخصصة'
                    : 'סיור מותאם אישית'}
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
