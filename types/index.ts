export type Language = 'ka' | 'en' | 'ru' | 'uk' | 'ar' | 'he';

export interface Translation {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  nav: {
    tours: string;
    about: string;
    booking: string;
    contact: string;
  };
  // More to come...
}

export const languages: Record<Language, { name: string; flag: string; rtl: boolean }> = {
  ka: { name: 'ქართული', flag: '🇬🇪', rtl: false },
  en: { name: 'English', flag: '🇬🇧', rtl: false },
  ru: { name: 'Русский', flag: '🇷🇺', rtl: false },
  uk: { name: 'Українська', flag: '🇺🇦', rtl: false },
  ar: { name: 'العربية', flag: '🇸🇦', rtl: true },
  he: { name: 'עברית', flag: '🇮🇱', rtl: true },
};

export interface Tour {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  priceGEL: number;
  priceUSD: number;
  duration: Record<Language, string>;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  image: string;
  category: 'day' | 'multi' | 'vip';
}
