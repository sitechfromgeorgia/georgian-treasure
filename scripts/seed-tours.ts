/**
 * Seed Tours Script
 * Run with: npx tsx scripts/seed-tours.ts
 * 
 * This script reads the extended-tours.ts data and inserts all 58 tours
 * into the Supabase database.
 */

import { createClient } from '@supabase/supabase-js';
import { allTours } from '../data/extended-tours';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

function generateSlug(tour: typeof allTours[0], index: number): string {
  const region = tour.region.toLowerCase().replace(/\s+/g, '-');
  const title = tour.title?.en?.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 40) || `tour-${index}`;
  return `${region}-${title}`;
}

async function seedTours() {
  console.log(`Seeding ${allTours.length} tours...`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < allTours.length; i++) {
    const tour = allTours[i];
    const slug = generateSlug(tour, i);

    const dbTour = {
      slug,
      region: tour.region.toLowerCase(),
      category: tour.category.toLowerCase(),
      duration: tour.duration,
      duration_hours: tour.durationHours || 0,
      price_gel: tour.priceGel || 0,
      price_usd: tour.priceUsd || 0,
      max_group_size: tour.maxGroupSize || 15,
      difficulty: tour.difficulty || 'easy',
      languages: tour.languages || [],
      featured: tour.featured || false,
      images: tour.images || [],
      includes: tour.includes || [],
      not_includes: tour.notIncludes || [],
      what_to_bring: tour.whatToBring || [],
      seo_keywords: tour.seoKeywords || '',
      translations: {
        en: {
          title: tour.title?.en || '',
          description: tour.description?.en || '',
          shortDescription: tour.shortDescription?.en || '',
          highlights: tour.highlights?.map((h: any) => h.en).filter(Boolean) || [],
          itinerary: tour.itinerary?.map((item: any) => item.en).filter(Boolean) || [],
        },
        ka: {
          title: tour.title?.ka || '',
          description: tour.description?.ka || '',
          shortDescription: tour.shortDescription?.ka || '',
          highlights: tour.highlights?.map((h: any) => h.ka).filter(Boolean) || [],
          itinerary: tour.itinerary?.map((item: any) => item.ka).filter(Boolean) || [],
        },
        ru: {
          title: tour.title?.ru || '',
          description: tour.description?.ru || '',
          shortDescription: tour.shortDescription?.ru || '',
          highlights: tour.highlights?.map((h: any) => h.ru).filter(Boolean) || [],
          itinerary: tour.itinerary?.map((item: any) => item.ru).filter(Boolean) || [],
        },
        uk: {
          title: tour.title?.uk || '',
          description: tour.description?.uk || '',
          shortDescription: tour.shortDescription?.uk || '',
          highlights: tour.highlights?.map((h: any) => h.uk).filter(Boolean) || [],
          itinerary: tour.itinerary?.map((item: any) => item.uk).filter(Boolean) || [],
        },
        ar: {
          title: tour.title?.ar || '',
          description: tour.description?.ar || '',
          shortDescription: tour.shortDescription?.ar || '',
          highlights: tour.highlights?.map((h: any) => h.ar).filter(Boolean) || [],
          itinerary: tour.itinerary?.map((item: any) => item.ar).filter(Boolean) || [],
        },
        he: {
          title: tour.title?.he || '',
          description: tour.description?.he || '',
          shortDescription: tour.shortDescription?.he || '',
          highlights: tour.highlights?.map((h: any) => h.he).filter(Boolean) || [],
          itinerary: tour.itinerary?.map((item: any) => item.he).filter(Boolean) || [],
        },
      },
    };

    const { error } = await supabase.from('tours').upsert(dbTour, { onConflict: 'slug' });

    if (error) {
      console.error(`Failed: ${slug} — ${error.message}`);
      failed++;
    } else {
      console.log(`✓ ${slug}`);
      success++;
    }
  }

  console.log('\n========================================');
  console.log(`Seeding complete: ${success} success, ${failed} failed`);
  console.log('========================================');
}

seedTours().catch(console.error);
