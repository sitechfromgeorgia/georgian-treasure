export type {
  Tour, ExtendedTour, LegacyTour, Stop, Region, Category, Season,
  RegionData, CategoryData,
} from './tour';
export type { Review } from './review';
export type { Admin } from './supabase';
export type { BlogPost, BlogPostTranslation, BlogLanguage, BlogCategory } from './blog';
export { blogCategories } from './blog';

// Legacy types for old components (LanguageContext, etc.)
export type Language = 'en' | 'ka' | 'ru' | 'he';

export type Translation = Record<Language, string>;

export const languages: Record<Language, { name: string; flag: string; rtl: boolean }> = {
  en: { name: 'English', flag: '🇬🇧', rtl: false },
  ka: { name: 'ქართული', flag: '🇬🇪', rtl: false },
  ru: { name: 'Русский', flag: '🇷🇺', rtl: false },
  he: { name: 'עברית', flag: '🇮🇱', rtl: true },
};
