import { Metadata } from 'next';
import { regions } from '@/data/content';
import { extendedTours } from '@/data/extended-tours';
import { RegionCardClient } from '@/components/tours/RegionCardClient';

export async function generateStaticParams() {
  return ['ka', 'en', 'ru', 'uk', 'ar', 'he'].map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  const titles: Record<string, string> = {
    ka: 'რეგიონები | Georgian Treasure - გამოიკვლიეთ საქართველოს 12 რეგიონი',
    en: 'Regions | Georgian Treasure - Explore 12 Regions of Georgia',
    ru: 'Регионы | Georgian Treasure - Исследуйте 12 регионов Грузии',
    uk: 'Регіони | Georgian Treasure - Дослідіть 12 регіонів Грузії',
    ar: 'المناطق | Georgian Treasure - استكشف 12 منطقة في جورجيا',
    he: 'אזורים | Georgian Treasure - גלה 12 אזורים בגאורגיה',
  };

  const descriptions: Record<string, string> = {
    ka: 'აღმოაჩინეთ საქართველოს 12 რეგიონი: აჭარა, თბილისი, კახეთი, ყაზბეგი, სვანეთი, იმერეთი, რაჭა, გურია, სამეგრელო, თუშეთი და სხვა. თითოეულ რეგიონში უნიკალური ტურები და შეთავაზებები.',
    en: 'Discover 12 regions of Georgia: Adjara, Tbilisi, Kakheti, Kazbegi, Svaneti, Imereti, Racha, Guria, Samegrelo, Tusheti and more. Unique tours and experiences in each region.',
    ru: 'Откройте для себя 12 регионов Грузии: Аджария, Тбилиси, Кахетия, Казбеги, Сванетия, Имеретия, Рача, Гурия, Самегрело, Тушетия и другие. Уникальные туры и впечатления в каждом регионе.',
    uk: 'Відкрийте для себе 12 регіонів Грузії: Аджарія, Тбілісі, Кахетія, Казбегі, Сванетія, Імеретія, Рача, Гурія, Самегрело, Тушетія та інші. Унікальні тури та враження в кожному регіоні.',
    ar: 'اكتشف 12 منطقة في جورجيا: أجاريا، تبليسي، كاخيتي، كازبيجي، سفانيتي، إيميريتي، راتشا، غوريا، ساميغريلو، توشيتي والمزيد. جولات فريدة وتجارب في كل منطقة.',
    he: 'גלה 12 אזורים בגאורגיה: אג׳ריה, טביליסי, קאחתי, קאזבגי, סוונטי, אימרתי, ראצה, גוריה, סאמגרלו, תושטיה ועוד. סיורים וחוויות ייחודיים בכל אזור.',
  };

  return {
    title: titles[lang] || titles.en,
    description: descriptions[lang] || descriptions.en,
    keywords: ['Georgia regions', 'Adjara', 'Tbilisi', 'Kakheti', 'Kazbegi', 'Svaneti', 'Imereti', 'Racha', 'Guria', 'Samegrelo', 'Tusheti', 'travel Georgia'],
    openGraph: {
      title: titles[lang] || titles.en,
      description: descriptions[lang] || descriptions.en,
      type: 'website',
      locale: lang,
    },
  };
}

export default async function RegionsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  // Calculate tour counts per region
  const regionTourCounts: Record<string, number> = {};
  extendedTours.forEach((tour) => {
    regionTourCounts[tour.region] = (regionTourCounts[tour.region] || 0) + 1;
  });

  const heroTitle =
    lang === 'ka' ? 'საქართველოს რეგიონები'
    : lang === 'en' ? 'Regions of Georgia'
    : lang === 'ru' ? 'Регионы Грузии'
    : lang === 'uk' ? 'Регіони Грузії'
    : lang === 'ar' ? 'مناطق جورجيا'
    : 'אזורי גאורגיה';

  const heroSubtitle =
    lang === 'ka' ? 'გამოიკვლიეთ საქართველოს 12 უნიკალური რეგიონი, თითოეული თავისი სილამაზით და ტრადიციებით'
    : lang === 'en' ? 'Explore 12 unique regions of Georgia, each with its own beauty and traditions'
    : lang === 'ru' ? 'Исследуйте 12 уникальных регионов Грузии, каждый со своей красотой и традициями'
    : lang === 'uk' ? 'Дослідіть 12 унікальних регіонів Грузії, кожен зі своєю красою та традиціями'
    : lang === 'ar' ? 'استكشف 12 منطقة فريدة في جورجيا، كل منها بجمالها وتقاليدها الخاصة'
    : 'גלה 12 אזורים ייחודיים בגאורגיה, כל אחד עם היופי והמסורות שלו';

  return (
    <main className="min-h-screen bg-[#001F3F]" dir={lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#001F3F] to-[#001F3F]/90 py-16 md:py-24 border-b border-white/10">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="relative container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white text-center mb-4">
            {heroTitle}
          </h1>
          <p className="text-lg text-white/60 text-center max-w-2xl mx-auto">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regions.map((region, index) => (
              <RegionCardClient
                key={region.id}
                region={region}
                lang={lang}
                tourCount={regionTourCounts[region.id] || 0}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
