export const locales = ['ka', 'en', 'ru', 'tr', 'de', 'he'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ka';

export const rtlLocales = ['he'] as const;
