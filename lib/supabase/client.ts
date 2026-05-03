import { createBrowserClient } from '@supabase/ssr'
import type { Tour, Lead, Booking, ChatbotMessage, AnalyticsEvent } from '@/types/supabase'

export const createBrowserSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// ─── Public Data Helpers (Browser-safe) ───────────────────────

export const getTours = async (filters?: { region?: string; category?: string; featured?: boolean }) => {
  const supabase = createBrowserSupabaseClient()
  let query = supabase.from('tours').select('*')

  if (filters?.region) query = query.eq('region', filters.region)
  if (filters?.category) query = query.eq('category', filters.category)
  if (filters?.featured !== undefined) query = query.eq('featured', filters.featured)

  const { data, error } = await query.order('created_at', { ascending: false })
  if (error) throw error
  return data as Tour[]
}

export const getTourBySlug = async (slug: string) => {
  const supabase = createBrowserSupabaseClient()
  const { data, error } = await supabase.from('tours').select('*').eq('slug', slug).single()
  if (error) throw error
  return data as Tour
}

export const createLead = async (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>) => {
  const supabase = createBrowserSupabaseClient()
  const { data, error } = await supabase.from('leads').insert(lead).select().single()
  if (error) throw error
  return data as Lead
}

export const createBooking = async (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => {
  const supabase = createBrowserSupabaseClient()
  const { data, error } = await supabase.from('bookings').insert(booking).select().single()
  if (error) throw error
  return data as Booking
}

export const trackEvent = async (event: Omit<AnalyticsEvent, 'id' | 'created_at'>) => {
  const supabase = createBrowserSupabaseClient()
  await supabase.from('analytics_events').insert(event)
}

export const saveChatMessage = async (message: Omit<ChatbotMessage, 'id' | 'created_at'>) => {
  const supabase = createBrowserSupabaseClient()
  await supabase.from('chatbot_messages').insert(message)
}
