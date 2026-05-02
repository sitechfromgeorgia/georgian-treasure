import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import enMessages from '../messages/en.json';
import kaMessages from '../messages/ka.json';
import ruMessages from '../messages/ru.json';
import heMessages from '../messages/he.json';
import { locales, defaultLocale, type Locale } from './config';

const messagesMap: Record<Locale, any> = {
  en: enMessages,
  ka: kaMessages,
  ru: ruMessages,
  he: heMessages,
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : defaultLocale;

  return {
    locale,
    messages: messagesMap[locale]
  };
});
