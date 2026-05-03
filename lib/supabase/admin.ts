import 'server-only'

/**
 * Server-only Supabase admin client
 * NEVER import this in client components — use only in:
 * - Edge Functions
 * - Server Components
 * - API routes (if used)
 */

import { createClient } from '@supabase/supabase-js'
import type { Lead, Booking, ChatbotMessage, AnalyticsEvent } from '@/types/supabase'

export const createServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}

// ─── Admin Data Helpers (Server/Edge Function only) ───────────

export const getLeads = async () => {
  const supabase = createServiceClient()
  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Lead[]
}

export const updateLead = async (id: string, updates: Partial<Lead>) => {
  const supabase = createServiceClient()
  const { data, error } = await supabase.from('leads').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Lead
}

export const getBookings = async () => {
  const supabase = createServiceClient()
  const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data as Booking[]
}

export const updateBooking = async (id: string, updates: Partial<Booking>) => {
  const supabase = createServiceClient()
  const { data, error } = await supabase.from('bookings').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data as Booking
}

export const getChatMessages = async (sessionId?: string) => {
  const supabase = createServiceClient()
  let query = supabase.from('chatbot_messages').select('*')
  if (sessionId) query = query.eq('session_id', sessionId)
  const { data, error } = await query.order('created_at', { ascending: false }).limit(500)
  if (error) throw error
  return data as ChatbotMessage[]
}

export const getAnalytics = async (days = 7) => {
  const supabase = createServiceClient()
  const fromDate = new Date(Date.now() - days * 86400000).toISOString()
  const { data, error } = await supabase
    .from('analytics_events')
    .select('*')
    .gte('created_at', fromDate)
    .order('created_at', { ascending: false })
    .limit(1000)
  if (error) throw error
  return data as AnalyticsEvent[]
}
