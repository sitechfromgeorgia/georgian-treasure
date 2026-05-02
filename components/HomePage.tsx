'use client';

import { useTranslations } from 'next-intl';

export default function HomePage({ locale }: { locale: string }) {
  const t = useTranslations();

  return (
    <main>
      <h1>{t('about.title') || 'Georgian Treasure'}</h1>
      <p>Welcome to {locale}!</p>
    </main>
  );
}
