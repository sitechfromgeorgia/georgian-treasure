import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { blogPosts } from '@/data/blog-posts';
import { allExtendedTours } from '@/data/extended-tours';
import { SUPPORTED_LOCALES } from '@/data/tours';

const SITE_URL = 'https://georgiantreasure.com';

// ─── Types ────────────────────────────────────────────────────

interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

// ─── Route Definitions ────────────────────────────────────────

const STATIC_ROUTES: { path: string; priority: number; frequency: SitemapEntry['changeFrequency'] }[] = [
  { path: '', priority: 1.0, frequency: 'daily' },               // Home
  { path: '/tours', priority: 0.9, frequency: 'daily' },         // Tours listing
  { path: '/destinations', priority: 0.8, frequency: 'weekly' },  // Destinations
  { path: '/about', priority: 0.7, frequency: 'monthly' },        // About
  { path: '/contact', priority: 0.7, frequency: 'monthly' },      // Contact
  { path: '/blog', priority: 0.9, frequency: 'daily' },           // Blog
  { path: '/gallery', priority: 0.6, frequency: 'weekly' },       // Gallery
  { path: '/reviews', priority: 0.6, frequency: 'weekly' },       // Reviews
];

const DESTINATION_ROUTES = [
  'tbilisi', 'batumi', 'kazbegi', 'kakheti', 'svaneti', 'kutaisi',
  'signagi', 'borjomi', 'mestia', 'ushguli', 'vardzia', 'martvili',
  'tusheti', 'racha', 'sighnaghi',
];

// ─── Helper: Generate alternate language URLs ─────────────────

function generateAlternatives(path: string): Record<string, string> {
  const alts: Record<string, string> = {};
  for (const locale of SUPPORTED_LOCALES) {
    alts[locale] = `${SITE_URL}/${locale}${path}`;
  }
  return alts;
}

// ─── Helper: Build localized path ─────────────────────────────

function buildLocalizedPath(locale: string, path: string): string {
  return `${SITE_URL}/${locale}${path}`;
}

// ─── Main Sitemap Generator ───────────────────────────────────

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // ── Static Pages ──────────────────────────────────────────
  for (const route of STATIC_ROUTES) {
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({
        url: buildLocalizedPath(locale, route.path),
        lastModified: new Date(),
        changeFrequency: route.frequency,
        priority: route.priority,
        alternates: {
          languages: generateAlternatives(route.path),
        },
      });
    }
  }

  // ── Destination Pages ─────────────────────────────────────
  for (const dest of DESTINATION_ROUTES) {
    for (const locale of SUPPORTED_LOCALES) {
      const path = `/destinations/${dest}`;
      entries.push({
        url: buildLocalizedPath(locale, path),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: generateAlternatives(path),
        },
      });
    }
  }

  // ── Tour Detail Pages ─────────────────────────────────────
  for (const tour of allExtendedTours) {
    for (const locale of SUPPORTED_LOCALES) {
      const path = `/tours/${tour.id}`;
      entries.push({
        url: buildLocalizedPath(locale, path),
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: {
          languages: generateAlternatives(path),
        },
      });
    }
  }

  // ── Blog Posts ────────────────────────────────────────────
  for (const post of blogPosts) {
    for (const locale of SUPPORTED_LOCALES) {
      const path = `/blog/${post.slug}`;
      entries.push({
        url: buildLocalizedPath(locale, path),
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: generateAlternatives(path),
        },
      });
    }
  }

  return entries;
}
