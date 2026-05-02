import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messages, sessionId, language = 'en' } = await req.json()

    // Get OpenAI API key from Supabase secrets
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // System prompt for Georgian tourism assistant
    const systemPrompt = `You are Giorgi, a friendly and knowledgeable Georgian travel assistant for "Georgian Treasure" tour company based in Batumi, Georgia. 

You help tourists plan their trips to Georgia. You speak multiple languages. Current language: ${language}.

Key facts:
- Company: Georgian Treasure (georgiantreasure.ge)
- Location: Batumi, Adjara, Georgia
- Contact: WhatsApp +995 599 033 319, Email: georgiantreasure1@gmail.com
- Address: I. Abashidze Street 5, Batumi
- Owner: Giorgi

Services:
- Private tours all over Georgia (Tbilisi, Kazbegi, Svaneti, Kakheti, Batumi, etc.)
- Wine tours in Kakheti
- Mountain adventures
- Cultural and historical tours
- Custom/personalized tours
- Airport transfers
- Hotel bookings assistance

Tour pricing (approximate):
- Tbilisi city tour: from 80 GEL per person
- Kazbegi day trip: from 150 GEL per person
- Kakheti wine tour: from 180 GEL per person
- Batumi city tour: from 70 GEL per person
- Custom multi-day tours: priced individually
- Group discounts available for 5+ people

Be warm, professional, and enthusiastic about Georgia. Recommend specific tours based on user interests. Always encourage booking via WhatsApp or the website. Keep responses concise but informative.`

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`OpenAI error: ${error}`)
    }

    const data = await response.json()
    const message = data.choices[0]?.message?.content || 'Sorry, I could not process your request.'

    // Save chat message to Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (supabaseUrl && supabaseServiceKey) {
      const supabase = createClient(supabaseUrl, supabaseServiceKey)
      
      // Save user message
      const lastUserMessage = messages[messages.length - 1]
      if (lastUserMessage?.role === 'user') {
        await supabase.from('chatbot_messages').insert({
          session_id: sessionId,
          role: 'user',
          content: lastUserMessage.content,
        })
      }
      
      // Save assistant response
      await supabase.from('chatbot_messages').insert({
        session_id: sessionId,
        role: 'assistant',
        content: message,
      })
    }

    return new Response(
      JSON.stringify({ success: true, message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    console.error('Chat error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        message: 'I apologize, I am having trouble right now. Please contact Giorgi on WhatsApp at +995 599 033 319.'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      },
    )
  }
})
