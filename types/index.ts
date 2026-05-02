export type {
  Tour, ExtendedTour, LegacyTour, Stop, Region, Category, Season,
  RegionData, CategoryData,
} from './tour';
export type { Review } from './review';
export type { Admin } from './supabase';
export type { BlogPost, BlogPostTranslation, BlogLanguage, BlogCategory } from './blog';
export { blogCategories } from './blog';

// Legacy types for old components (LanguageContext, etc.)
export type Language = 'ka' | 'en' | 'ru' | 'uk' | 'ar' | 'he';

export type Translation = Record<Language, string>;

export const languages: Record<Language, { name: string; flag: string; rtl: boolean }> = {
  ka: { name: 'ქართული', flag: '🇬🇪', rtl: false },
  en: { name: 'English', flag: '🇬🇧', rtl: false },
  ru: { name: 'Русский', flag: '🇷🇺', rtl: false },
  uk: { name: 'Українська', flag: '🇺🇦', rtl: false },
  ar: { name: 'العربية', flag: '🇸🇦', rtl: true },
  he: { name: 'עברית', flag: '🇮🇱', rtl: true },
};
