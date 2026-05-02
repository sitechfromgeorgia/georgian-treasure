export const locales = ['en', 'ka', 'ru', 'he'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const rtlLocales = ['he'] as const;
