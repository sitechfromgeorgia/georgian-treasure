import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { extendedTours } from '@/data/extended-tours';
import { TourDetailClient } from '@/components/tours/TourDetailClient';

const supportedLocales = ['ka', 'en', 'ru', 'uk', 'ar', 'he'];

export async function generateStaticParams() {
  const params: { lang: string; slug: string }[] = [];

  for (const locale of supportedLocales) {
    for (const tour of extendedTours) {
      params.push({
        lang: locale,
        slug: tour.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params;

  const tour = extendedTours.find((t) => t.slug === slug);

  if (!tour) {
    return {
      title: 'Tour Not Found | Georgian Treasure',
    };
  }

  const tr = tour.translations[lang] || tour.translations.en;
  const coverImage = tour.images[0] || '/tours/placeholder.jpg';

  const title = `${tr.title} | Georgian Treasure Tours`;
  const description = tr.shortDescription || tr.description;

  const keywords = [
    ...tour.seoKeywords.slice(0, 20),
    `${tour.region} tours`,
    `${tour.category} tours Georgia`,
    'Georgian Treasure',
    'Georgia travel',
    'tours in Georgia',
    `${tour.difficulty} difficulty tour`,
  ];

  // JSON-LD structured data for TouristAttraction
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: tr.title,
    description: tr.description,
    image: tour.images.map((img) => `https://georgiantreasure.ge${img}`),
    url: `https://georgiantreasure.ge/${lang}/tours/${slug}`,
    touristType: {
      '@type': 'Audience',
      audienceType: tour.difficulty,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '42.0',
      longitude: '43.5',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GE',
      addressRegion: tour.region,
    },
    offers: {
      '@type': 'Offer',
      price: tour.priceGel,
      priceCurrency: 'GEL',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '12',
    },
    inLanguage: tour.languages.join(', '),
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      images: [{ url: coverImage, width: 1200, height: 630, alt: tr.title }],
      type: 'article',
      locale: lang,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [coverImage],
    },
    alternates: {
      canonical: `/${lang}/tours/${slug}`,
      languages: Object.fromEntries(
        supportedLocales.map((l) => [l, `/${l}/tours/${slug}`])
      ),
    },
    other: {
      'script:ld+json': JSON.stringify(jsonLd),
    },
  };
}

export default async function TourPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;

  const tour = extendedTours.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name: tour.translations[lang]?.title || tour.translations.en.title,
    description: tour.translations[lang]?.description || tour.translations.en.description,
    image: tour.images.map((img) => `https://georgiantreasure.ge${img}`),
    url: `https://georgiantreasure.ge/${lang}/tours/${slug}`,
    touristType: {
      '@type': 'Audience',
      audienceType: tour.difficulty,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '42.0',
      longitude: '43.5',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GE',
      addressRegion: tour.region,
    },
    offers: {
      '@type': 'Offer',
      price: tour.priceGel,
      priceCurrency: 'GEL',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString(),
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '12',
    },
    inLanguage: tour.languages.join(', '),
  };

  return (
    <main
      className="min-h-screen bg-[#001F3F]"
      dir={lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr'}
    >
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourDetailClient tour={tour} />
    </main>
  );
}
