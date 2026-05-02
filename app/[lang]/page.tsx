import { getTranslations, setRequestLocale } from 'next-intl/server';
import HomePageClient from '@/components/HomePageClient';

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Enable static rendering for next-intl
  setRequestLocale(lang);

  const t = await getTranslations({ locale: lang });

  return (
    <HomePageClient
      locale={lang}
      translations={{
        aboutTitle: t('about.title'),
        welcome: 'Welcome',
      }}
    />
  );
}
