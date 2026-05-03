export type BlogLanguage = 'en' | 'ka' | 'ru' | 'he';

export interface BlogPostTranslation {
  title: string;
  excerpt: string;
  content: string[];
}

export interface BlogPost {
  slug: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  translations: Partial<Record<BlogLanguage, BlogPostTranslation>>;
}

export const blogCategories = [
  'All',
  'Travel Guide',
  'Adventure',
  'Wine Culture',
  'Food',
  'Culture',
  'Practical',
  'Itinerary',
  'Family'
] as const;

export type BlogCategory = (typeof blogCategories)[number];
