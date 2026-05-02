export interface Tour {
  id: string;
  slug: string;
  region: string;
  category: string;
  duration: string;
  duration_hours: number;
  price_gel: number;
  price_usd: number;
  max_group_size: number;
  difficulty: string;
  languages: string[];
  featured: boolean;
  images: string[];
  includes: string[];
  not_includes: string[];
  what_to_bring: string[];
  seo_keywords: string;
  translations: Record<string, {
    title: string;
    description: string;
    shortDescription: string;
    highlights: string[];
    itinerary: string[];
  }>;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  name: string;
  email?: string;
  phone: string;
  tour_id?: string;
  tour_name?: string;
  message: string;
  status: 'new' | 'contacted' | 'confirmed' | 'cancelled' | 'completed';
  source: 'website' | 'whatsapp' | 'chatbot' | 'email';
  notes?: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  lead_id?: string;
  tour_id: string;
  tour_name: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  tour_date: string;
  people_count: number;
  total_price_gel: number;
  total_price_usd: number;
  status: 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'partial' | 'paid';
  special_requests?: string;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  seo_title: string;
  seo_description: string;
  keywords: string;
  published: boolean;
  translations: Record<string, {
    title: string;
    content: string;
    excerpt: string;
  }>;
  created_at: string;
  updated_at: string;
}

export interface ChatbotMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface AnalyticsEvent {
  id: string;
  event_type: string;
  page_url: string;
  session_id: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface Admin {
  id: string;
  user_id: string;
  email: string;
  name?: string;
  role: 'admin' | 'super_admin';
  created_at: string;
  updated_at: string;
}

export type LeadStatus = 'new' | 'contacted' | 'confirmed' | 'cancelled' | 'completed';
export type LeadSource = 'website' | 'whatsapp' | 'chatbot' | 'email';
export type BookingStatus = 'pending' | 'confirmed' | 'paid' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'partial' | 'paid';
