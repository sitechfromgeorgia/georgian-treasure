'use client';

import { motion } from 'framer-motion';
import { rtlLocales } from '@/lib/i18n';

interface HomePageClientProps {
  locale: string;
  translations: {
    aboutTitle: string;
    welcome: string;
  };
}

export default function HomePageClient({ locale, translations }: HomePageClientProps) {
  const isRTL = rtlLocales.includes(locale as any);

  return (
    <main className={`min-h-screen ${isRTL ? 'rtl' : ''}`}>
      <h1>{translations.aboutTitle || 'Georgian Treasure'}</h1>
      <p>{translations.welcome}</p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <p>Animated content with Framer Motion!</p>
      </motion.div>
    </main>
  );
}
