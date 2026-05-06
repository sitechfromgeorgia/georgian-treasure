import { setRequestLocale } from 'next-intl/server';
import HomePageClient from '@/components/HomePageClient';
import { locales } from '@/lib/i18n';

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Enable static rendering for next-intl
  setRequestLocale(lang);

  return (
    <HomePageClient
      locale={lang}
      translations={{
        welcome: 'Welcome',
      }}
    />
  );
}
