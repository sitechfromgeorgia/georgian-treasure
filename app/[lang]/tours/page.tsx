import { Metadata } from 'next';
import { extendedTours } from '@/data/extended-tours';
import { ToursCatalogClient } from '@/components/tours/ToursCatalogClient';

export async function generateStaticParams() {
  return ['ka', 'en', 'ru', 'he'].map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    ka: `ყველა ტური | Georgian Treasure - ${extendedTours.length}+ ტური საქართველოში`,
    en: `All Tours | Georgian Treasure - ${extendedTours.length}+ Tours in Georgia`,
    ru: `Все туры | Georgian Treasure - ${extendedTours.length}+ туров по Грузии`,
    he: `כל הסיורים | Georgian Treasure - ${extendedTours.length}+ סיורים בגאורגיה`,
  };

  const descriptions: Record<string, string> = {
    ka: `აღმოაჩინეთ ${extendedTours.length}+ ექსკლუზიური ტური საქართველოში. ქალაქური ტურები, მთის ტურები, ღვინის ტურები, ექსტრემალური ტურები და მეტი.`,
    en: `Discover ${extendedTours.length}+ exclusive tours in Georgia. City tours, mountain tours, wine tours, adventure tours and more. Book your unforgettable experience now.`,
    ru: `Откройте для себя ${extendedTours.length}+ эксклюзивных туров по Грузии. Городские туры, горные туры, винные туры, экстремальные туры и многое другое.`,
    he: `גלה ${extendedTours.length}+ סיורים בלעדיים בגאורגיה. סיורי ערים, סיורי הרים, סיורי יין, סיורי הרפתקאות ועוד.`,
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['Georgia tours', 'Georgian Treasure', 'tours catalog', 'travel Georgia', 'Tbilisi tours', 'Batumi tours', 'wine tours', 'mountain tours'],
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      type: 'website',
      locale: lang,
    },
  };
}

export default async function ToursPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  return (
    <main className="min-h-screen bg-[#001F3F]" dir={lang === 'he' ? 'rtl' : 'ltr'}>
      <ToursCatalogClient tours={extendedTours} lang={lang} />
    </main>
  );
}