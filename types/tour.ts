export interface Tour {
  id: string;
  slug: Record<string, string>;
  status: 'draft' | 'published' | 'archived';
  name: Record<string, string>;
  shortDescription: Record<string, string>;
  description: Record<string, string>;
  highlights: Record<string, string[]>;
  coverImage: string;
  gallery: string[];
  videoUrl?: string;
  region: Region;
  location: {
    startPoint: Record<string, string>;
    endPoint: Record<string, string>;
    stops: Stop[];
  };
  price: {
    amount: number;
    currency: 'GEL' | 'USD' | 'EUR';
  };
  groupDiscount?: number;
  childDiscount?: number;
  duration: {
    hours: number;
    days?: number;
  };
  difficulty: 'easy' | 'moderate' | 'challenging';
  categories: Category[];
  tags: string[];
  seasons: Season[];
  languages: string[];
  bookingType: 'instant' | 'inquiry';
  maxGroupSize: number;
  averageRating: number;
  reviewCount: number;
  meta: {
    title: Record<string, string>;
    description: Record<string, string>;
    keywords: Record<string, string[]>;
  };
}

// ExtendedTour type matching the data in extended-tours.ts
export interface ExtendedTour {
  id: string;
  slug: string;
  region: string;
  category: string;
  duration: string;
  durationHours: number;
  priceGel: number;
  priceUsd: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'moderate' | 'challenging' | 'extreme';
  languages: string[];
  featured: boolean;
  images: string[];
  includes: string[];
  notIncludes: string[];
  whatToBring: string[];
  seoKeywords: string[];
  translations: Record<string, {
    title: string;
    description: string;
    shortDescription: string;
    highlights: string[];
    itinerary: string[];
  }>;
}

// Legacy Tour type for old components (BookingForm, etc.)
export interface LegacyTour {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  priceGEL: number;
  priceUSD: number;
  duration: Record<string, string>;
  difficulty: string;
  image: string;
  category: string;
}

export interface Stop {
  name: Record<string, string>;
  description?: Record<string, string>;
  latitude: number;
  longitude: number;
  durationMinutes?: number;
  type: 'attraction' | 'restaurant' | 'photo-spot' | 'restroom' | 'viewpoint';
}

export type Region = 'adjara' | 'tbilisi' | 'kakheti' | 'kazbegi' | 'svaneti' | 'west' | 'samtskhe' | 'imereti' | 'racha' | 'guria' | 'samegrelo' | 'tusheti';
export type Category = 'city' | 'mountain' | 'wine' | 'adventure' | 'cultural' | 'food' | 'transfer' | 'custom';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'all';

// Region data from content.ts
export interface RegionData {
  id: string;
  slug: string;
  image: string;
  translations: Record<string, { name: string; description: string }>;
}

// Category data from content.ts
export interface CategoryData {
  id: string;
  name: string;
  translations: Record<string, { name: string }>;
}
