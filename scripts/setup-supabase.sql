-- ============================================================
-- Georgian Treasure - Supabase Database Setup
-- Run this in the Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. TOURS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  region TEXT NOT NULL,
  category TEXT NOT NULL,
  duration TEXT NOT NULL,
  duration_hours INTEGER NOT NULL DEFAULT 0,
  price_gel INTEGER NOT NULL,
  price_usd NUMERIC(10,2) NOT NULL,
  max_group_size INTEGER NOT NULL DEFAULT 15,
  difficulty TEXT NOT NULL DEFAULT 'easy',
  languages TEXT[] NOT NULL DEFAULT '{}',
  featured BOOLEAN NOT NULL DEFAULT false,
  images TEXT[] NOT NULL DEFAULT '{}',
  includes TEXT[] NOT NULL DEFAULT '{}',
  not_includes TEXT[] NOT NULL DEFAULT '{}',
  what_to_bring TEXT[] NOT NULL DEFAULT '{}',
  seo_keywords TEXT,
  translations JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tours indexes
CREATE INDEX IF NOT EXISTS idx_tours_region ON tours(region);
CREATE INDEX IF NOT EXISTS idx_tours_category ON tours(category);
CREATE INDEX IF NOT EXISTS idx_tours_featured ON tours(featured);
CREATE INDEX IF NOT EXISTS idx_tours_slug ON tours(slug);

-- ============================================================
-- 2. LEADS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE SET NULL,
  tour_name TEXT,
  message TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'confirmed', 'cancelled', 'completed')),
  source TEXT NOT NULL DEFAULT 'website' CHECK (source IN ('website', 'whatsapp', 'chatbot', 'email')),
  notes TEXT,
  assigned_to TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Leads indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_assigned ON leads(assigned_to);

-- ============================================================
-- 3. BOOKINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  tour_id UUID REFERENCES tours(id) ON DELETE CASCADE,
  tour_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  tour_date DATE NOT NULL,
  people_count INTEGER NOT NULL DEFAULT 1,
  total_price_gel INTEGER NOT NULL,
  total_price_usd NUMERIC(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'paid', 'completed', 'cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid')),
  special_requests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bookings indexes
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_tour_date ON bookings(tour_date);
CREATE INDEX IF NOT EXISTS idx_bookings_lead ON bookings(lead_id);

-- ============================================================
-- 4. BLOG POSTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  author TEXT NOT NULL DEFAULT 'Giorgi',
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  image TEXT NOT NULL DEFAULT '/blog/default.jpg',
  category TEXT NOT NULL DEFAULT 'general',
  tags TEXT[] NOT NULL DEFAULT '{}',
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  translations JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Blog indexes
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_date ON blog_posts(date);

-- ============================================================
-- 5. CHATBOT MESSAGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS chatbot_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_session ON chatbot_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_created ON chatbot_messages(created_at);

-- ============================================================
-- 6. ANALYTICS EVENTS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  page_url TEXT NOT NULL,
  session_id TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics_events(page_url);
CREATE INDEX IF NOT EXISTS idx_analytics_created ON analytics_events(created_at);

-- ============================================================
-- 7. CHATBOT TRAINING DATA (FAQ + System Prompt)
-- ============================================================
CREATE TABLE IF NOT EXISTS chatbot_training (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('faq', 'system_prompt', 'response_template')),
  key TEXT NOT NULL,
  content TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(key, type, language)
);

-- ============================================================
-- 8. SETTINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Tours: readable by all, writable by admin only
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tours are viewable by everyone" ON tours
  FOR SELECT USING (true);

CREATE POLICY "Tours are insertable by admin" ON tours
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Tours are updatable by admin" ON tours
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Tours are deletable by admin" ON tours
  FOR DELETE USING (auth.role() = 'authenticated');

-- Leads: readable by admin, insertable by all
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leads are viewable by admin" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Leads are insertable by everyone" ON leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Leads are updatable by admin" ON leads
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Bookings: readable by admin, insertable by authenticated
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Bookings are viewable by admin" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Bookings are insertable by everyone" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Bookings are updatable by admin" ON bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Blog posts: readable by all, writable by admin
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Blog posts are manageable by admin" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Chatbot messages: admin readable
ALTER TABLE chatbot_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chat messages are viewable by admin" ON chatbot_messages
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Chat messages are insertable by everyone" ON chatbot_messages
  FOR INSERT WITH CHECK (true);

-- Analytics: admin readable
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Analytics are viewable by admin" ON analytics_events
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Analytics are insertable by everyone" ON analytics_events
  FOR INSERT WITH CHECK (true);

-- Training data: admin readable, admin writable
ALTER TABLE chatbot_training ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Training data is manageable by admin" ON chatbot_training
  FOR ALL USING (auth.role() = 'authenticated');

-- Settings: admin only
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Settings are manageable by admin" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================
-- REALTIME SUBSCRIPTIONS
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE leads;
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;

-- ============================================================
-- INITIAL DATA: Insert all 58 tours from extended-tours.ts data
-- Run the data seeding function after creating tables
-- ============================================================

-- Seed function that inserts tours (run from application or via Edge Function)
-- The application will handle data migration on first run
