/**
 * SEO Utilities for Georgian Treasure
 * Provides helpers for generating meta tags, JSON-LD structured data,
 * breadcrumbs, FAQ schema, and Open Graph / Twitter Card tags.
 */

import { Metadata } from 'next';
import React from 'react';

// ─── Constants ───────────────────────────────────────────────

export const SITE_NAME = 'Georgian Treasure';
export const SITE_URL = 'https://georgiantreasure.ge';
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'ka', 'ru', 'he'] as const;

export const ORGANIZATION_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Georgian Treasure',
  alternateName: ['ქართული განძი', 'Грузинское Сокровище'],
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    'Premium Georgia tour operator offering private tours, wine experiences, adventure activities, and cultural journeys across Georgia.',
  sameAs: [
    'https://www.facebook.com/georgiantreasure',
    'https://www.instagram.com/georgiantreasure',
    'https://www.tripadvisor.com/georgiantreasure',
    'https://wa.me/995599147691',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+995-599-03-33-19',
    contactType: 'Customer Service',
    availableLanguage: ['English', 'Russian', 'Georgian'],
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'I. Abashidze Street 5',
    addressLocality: 'Batumi',
    addressRegion: 'Adjara',
    addressCountry: 'GE',
    postalCode: '6010',
  },
} as const;

export const LOCAL_BUSINESS_DATA = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Georgian Treasure',
  image: `${SITE_URL}/images/office.jpg`,
  '@id': `${SITE_URL}/#travelagency`,
  url: SITE_URL,
  telephone: '+995-599-03-33-19',
  email: 'georgiantreasure1@gmail.com',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'I. Abashidze Street 5',
    addressLocality: 'Batumi',
    addressRegion: 'Adjara',
    addressCountry: 'GE',
    postalCode: '6010',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 41.6395,
    longitude: 41.6359,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '22:00',
    },
  ],
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  currenciesAccepted: 'GEL, USD, EUR',
} as const;

// ─── Types ────────────────────────────────────────────────────

export interface MetaTagConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  locale?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
  noindex?: boolean;
  canonical?: string;
  alternates?: Record<string, string>;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ArticleData {
  title: string;
  description: string;
  image: string;
  url: string;
  author: string;
  publishedTime: string;
  modifiedTime?: string;
  category: string;
  tags: string[];
}

// ─── Meta Tag Generator ───────────────────────────────────────

export function generateMetaTags(config: MetaTagConfig): Metadata {
  const {
    title,
    description,
    image = '/images/og-default.jpg',
    url = SITE_URL,
    type = 'website',
    locale = DEFAULT_LOCALE,
    publishedTime,
    modifiedTime,
    author,
    keywords,
    noindex,
    canonical,
    alternates,
  } = config;

  const ogImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const ogUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;

  const metadata: Metadata = {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords,
    authors: author ? [{ name: author }] : undefined,
    robots: noindex ? { index: false, follow: false } : undefined,
    alternates: {
      canonical: canonical || ogUrl,
      languages: alternates,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url: ogUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale,
      type,
      ...(type === 'article' && publishedTime
        ? { publishedTime, modifiedTime, authors: author ? [author] : undefined }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
  };

  return metadata;
}

// ─── JSON-LD Generator ────────────────────────────────────────

export function generateJsonLd(data: object): string {
  return JSON.stringify(data);
}

export function JsonLdScript({ data }: { data: object }): React.JSX.Element {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateJsonLd(data) }}
    />
  );
}

// ─── Breadcrumb Schema ────────────────────────────────────────

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ─── FAQ Schema ───────────────────────────────────────────────

export function generateFaqSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── Article Schema ───────────────────────────────────────────

export function generateArticleSchema(article: ArticleData) {
  const { title, description, image, url, author, publishedTime, modifiedTime, category, tags } =
    article;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    articleSection: category,
    keywords: tags.join(', '),
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url.startsWith('http') ? url : `${SITE_URL}${url}`,
    },
  };
}

// ─── HowTo Schema ─────────────────────────────────────────────

export function generateHowToSchema(
  title: string,
  description: string,
  steps: { name: string; text: string; image?: string }[],
  totalTime?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    totalTime,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image ? { image: step.image.startsWith('http') ? step.image : `${SITE_URL}${step.image}` } : {}),
    })),
  };
}

// ─── TouristAttraction Schemas ────────────────────────────────

export function generateTouristAttractionSchema(
  name: string,
  description: string,
  image: string,
  url: string,
  geo?: { lat: number; lng: number }
) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    name,
    description,
    image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    isPartOf: {
      '@type': 'Country',
      name: 'Georgia',
    },
  };

  if (geo) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.lat,
      longitude: geo.lng,
    };
  }

  return schema;
}

// ─── WebPage Schema ───────────────────────────────────────────

export function generateWebPageSchema(
  title: string,
  description: string,
  url: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: url.startsWith('http') ? url : `${SITE_URL}${url}`,
    ...(image ? { image: image.startsWith('http') ? image : `${SITE_URL}${image}` } : {}),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: `${SITE_URL}/images/logo.png`,
    },
  };
}
