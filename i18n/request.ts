import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import kaMessages from '../messages/ka.json';
import enMessages from '../messages/en.json';
import ruMessages from '../messages/ru.json';
import trMessages from '../messages/tr.json';
import deMessages from '../messages/de.json';
import heMessages from '../messages/he.json';
import { locales, defaultLocale, type Locale } from './config';

const messagesMap: Record<Locale, any> = {
  ka: kaMessages,
  en: enMessages,
  ru: ruMessages,
  tr: trMessages,
  de: deMessages,
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
