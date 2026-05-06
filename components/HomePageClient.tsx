'use client';

import { motion } from 'framer-motion';
import { rtlLocales } from '@/lib/i18n';
import { Hero } from './home/Hero';
import { PopularTours } from './home/PopularTours';
import { BookingForm } from './home/BookingForm';
import { Contact } from './home/Contact';
import { FAQ } from './home/FAQ';

interface HomePageClientProps {
  locale: string;
  translations: {
    welcome: string;
  };
}

export default function HomePageClient({ locale, translations }: HomePageClientProps) {
  const isRTL = rtlLocales.includes(locale as any);

  return (
    <main className={`min-h-screen ${isRTL ? 'rtl' : ''}`}>
      <Hero />
      <PopularTours />
      <BookingForm />
      <FAQ />
      <Contact />
    </main>
  );
}
