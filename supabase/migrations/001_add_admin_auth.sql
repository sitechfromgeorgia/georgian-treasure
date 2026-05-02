-- ============================================================
-- Georgian Treasure - Admin Auth & RLS Updates
-- Run this in Supabase SQL Editor after initial setup
-- ============================================================

-- 1. Create admins table (links Supabase Auth users to admin role)
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Index for fast lookups
CREATE INDEX IF NOT EXISTS idx_admins_user_id ON admins(user_id);

-- 2. Enable RLS on admins table
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Admins can view admins table
CREATE POLICY "Admins can view admins" ON admins
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Only super_admin can insert/update/delete admins
CREATE POLICY "Super admins can manage admins" ON admins
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid() AND role = 'super_admin')
  );

-- 3. Update existing RLS policies to use admins table instead of generic auth.role()

-- Tours: authenticated → admin check
DROP POLICY IF EXISTS "Tours are insertable by admin" ON tours;
DROP POLICY IF EXISTS "Tours are updatable by admin" ON tours;
DROP POLICY IF EXISTS "Tours are deletable by admin" ON tours;

CREATE POLICY "Tours are manageable by admin" ON tours
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Leads: authenticated → admin check
DROP POLICY IF EXISTS "Leads are viewable by admin" ON leads;
DROP POLICY IF EXISTS "Leads are updatable by admin" ON leads;

CREATE POLICY "Leads are viewable by admin" ON leads
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

CREATE POLICY "Leads are updatable by admin" ON leads
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Bookings: authenticated → admin check
DROP POLICY IF EXISTS "Bookings are viewable by admin" ON bookings;
DROP POLICY IF EXISTS "Bookings are updatable by admin" ON bookings;

CREATE POLICY "Bookings are viewable by admin" ON bookings
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

CREATE POLICY "Bookings are updatable by admin" ON bookings
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Blog posts: authenticated → admin check
DROP POLICY IF EXISTS "Blog posts are manageable by admin" ON blog_posts;

CREATE POLICY "Blog posts are manageable by admin" ON blog_posts
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Chatbot messages: authenticated → admin check
DROP POLICY IF EXISTS "Chat messages are viewable by admin" ON chatbot_messages;

CREATE POLICY "Chat messages are viewable by admin" ON chatbot_messages
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Analytics: authenticated → admin check
DROP POLICY IF EXISTS "Analytics are viewable by admin" ON analytics_events;

CREATE POLICY "Analytics are viewable by admin" ON analytics_events
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Training data: authenticated → admin check
DROP POLICY IF EXISTS "Training data is manageable by admin" ON chatbot_training;

CREATE POLICY "Training data is manageable by admin" ON chatbot_training
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- Settings: authenticated → admin check
DROP POLICY IF EXISTS "Settings are manageable by admin" ON site_settings;

CREATE POLICY "Settings are manageable by admin" ON site_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid())
  );

-- 4. Function to automatically add first user as super_admin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM public.admins) = 0 THEN
    INSERT INTO public.admins (user_id, email, role)
    VALUES (NEW.id, NEW.email, 'super_admin');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-add first user as admin
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
