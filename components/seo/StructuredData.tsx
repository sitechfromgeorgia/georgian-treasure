'use client';

import Script from 'next/script';
import {
  ORGANIZATION_DATA,
  LOCAL_BUSINESS_DATA,
  generateBreadcrumbSchema,
  generateFaqSchema,
  generateArticleSchema,
  generateHowToSchema,
  generateTouristAttractionSchema,
  generateWebPageSchema,
  type BreadcrumbItem,
  type FAQ,
  type ArticleData,
  SITE_URL,
} from '@/lib/seo';

// ─── Organization Schema ──────────────────────────────────────

export function OrganizationSchema() {
  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(ORGANIZATION_DATA),
      }}
    />
  );
}

// ─── LocalBusiness Schema ─────────────────────────────────────

export function LocalBusinessSchema() {
  return (
    <Script
      id="localbusiness-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(LOCAL_BUSINESS_DATA),
      }}
    />
  );
}

// ─── BreadcrumbList Schema ────────────────────────────────────

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = generateBreadcrumbSchema(items);

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── FAQPage Schema ───────────────────────────────────────────

export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  const schema = generateFaqSchema(faqs);

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Article Schema ───────────────────────────────────────────

export function ArticleSchema({ article }: { article: ArticleData }) {
  const schema = generateArticleSchema(article);

  return (
    <Script
      id="article-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── HowTo Schema ─────────────────────────────────────────────

export function HowToSchema({
  title,
  description,
  steps,
  totalTime,
}: {
  title: string;
  description: string;
  steps: { name: string; text: string; image?: string }[];
  totalTime?: string;
}) {
  const schema = generateHowToSchema(title, description, steps, totalTime);

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── TouristAttraction Schemas ────────────────────────────────

export function TouristAttractionSchema({
  name,
  description,
  image,
  url,
  geo,
}: {
  name: string;
  description: string;
  image: string;
  url: string;
  geo?: { lat: number; lng: number };
}) {
  const schema = generateTouristAttractionSchema(name, description, image, url, geo);

  return (
    <Script
      id={`attraction-schema-${name.toLowerCase().replace(/\\s+/g, '-')}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── WebPage Schema ───────────────────────────────────────────

export function WebPageSchema({
  title,
  description,
  url,
  image,
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
}) {
  const schema = generateWebPageSchema(title, description, url, image);

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Combined Site Schemas ────────────────────────────────────

export function SiteSchemas() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
    </>
  );
}

// ─── Region TouristAttractions ────────────────────────────────

const REGION_ATTRACTIONS = [
  {
    name: 'Kazbegi National Park',
    description:
      'Stunning mountain region featuring Gergeti Trinity Church at the base of Mount Kazbek, offering spectacular alpine scenery and hiking trails.',
    image: '/tours/kazbegi-mountain.jpg',
    url: '/en/destinations/kazbegi',
    geo: { lat: 42.6614, lng: 44.6367 },
  },
  {
    name: 'Svaneti Region',
    description:
      'UNESCO World Heritage region famous for its medieval defensive towers, pristine alpine villages including Ushguli, and dramatic Caucasus mountain scenery.',
    image: '/tours/svaneti-towers.jpg',
    url: '/en/destinations/svaneti',
    geo: { lat: 43.0412, lng: 42.7417 },
  },
  {
    name: 'Kakheti Wine Region',
    description:
      "Georgia's premier wine region with ancient qvevri winemaking traditions, historic vineyards, and charming hilltop towns like Sighnaghi.",
    image: '/tours/kakheti-wine.jpg',
    url: '/en/destinations/kakheti',
    geo: { lat: 41.75, lng: 45.72 },
  },
  {
    name: 'Batumi Black Sea Coast',
    description:
      'Vibrant coastal city featuring subtropical beaches, the famous Boulevard promenade, botanical gardens, and modern architecture.',
    image: '/tours/hero-batumi.jpg',
    url: '/en/destinations/batumi',
    geo: { lat: 41.6168, lng: 41.6367 },
  },
  {
    name: 'Vardzia Cave City',
    description:
      'Magnificent 12th-century rock-hewn cave city with over 6,000 caves, a monastery with ancient frescoes, and remarkable cliff architecture.',
    image: '/tours/vardzia-cave.jpg',
    url: '/en/destinations/vardzia',
    geo: { lat: 41.3822, lng: 43.2844 },
  },
  {
    name: 'Martvili Canyon',
    description:
      'Breathtaking natural canyon with turquoise waters, boat rides through narrow limestone gorge walls, and lush subtropical vegetation.',
    image: '/tours/martvili-canyon.jpg',
    url: '/en/destinations/martvili',
    geo: { lat: 42.4583, lng: 42.3708 },
  },
  {
    name: 'Tusheti National Park',
    description:
      "Georgia's most remote and pristine mountain region with ancient stone towers, medieval villages, and spectacular alpine landscapes.",
    image: '/tours/tusheti-village.jpg',
    url: '/en/destinations/tusheti',
    geo: { lat: 42.3575, lng: 45.6333 },
  },
  {
    name: 'Tbilisi Old Town',
    description:
      "Historic district of Georgia's capital featuring ancient churches, sulfur baths, narrow cobblestone streets, and traditional wooden balconies.",
    image: '/tours/tbilisi-old-town-1.jpg',
    url: '/en/destinations/tbilisi',
    geo: { lat: 41.6938, lng: 44.8015 },
  },
];

export function RegionAttractionsSchemas() {
  return (
    <>
      {REGION_ATTRACTIONS.map(attraction => (
        <TouristAttractionSchema
          key={attraction.name}
          name={attraction.name}
          description={attraction.description}
          image={attraction.image}
          url={attraction.url}
          geo={attraction.geo}
        />
      ))}
    </>
  );
}
