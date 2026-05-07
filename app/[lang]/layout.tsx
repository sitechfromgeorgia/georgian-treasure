import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { locales } from '@/lib/i18n';
import { Header } from '@/components/layout/Header';
import { ChatbotWrapper } from '@/components/ui/ChatbotWrapper';

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  // Enable static rendering for next-intl
  setRequestLocale(lang);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <Header />
      {children}
      <ChatbotWrapper />
    </NextIntlClientProvider>
  );
}
