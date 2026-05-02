'use client';

import { useState, useCallback, useRef } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, unknown>;
}

export interface SuggestedTour {
  slug: string;
  title: string;
  price_gel: number;
  duration: string;
  region: string;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  suggestedTours: SuggestedTour[];
  collectLead: (data: { name: string; phone: string; email?: string; tourId?: string; tourName?: string }) => Promise<boolean>;
  error: string | null;
}

function generateSessionId(): string {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 9);
}

// Build Edge Function URL from Supabase URL
function getEdgeFunctionUrl(functionName: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    throw new Error('Supabase URL not configured');
  }
  return `${supabaseUrl}/functions/v1/${functionName}`;
}

export function useChat(language: string = 'en'): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedTours, setSuggestedTours] = useState<SuggestedTour[]>([]);
  const [error, setError] = useState<string | null>(null);
  const sessionIdRef = useRef<string>(generateSessionId());

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
    };

    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);

    try {
      const response = await fetch(getEdgeFunctionUrl('chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: currentMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          sessionId: sessionIdRef.current,
          language,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Chat request failed');
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        metadata: data.functionCall ? { functionCall: data.functionCall } : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Extract suggested tours from function call if present
      if (data.functionCall?.result?.tours) {
        setSuggestedTours(data.functionCall.result.tours.slice(0, 3));
      }

      // If lead was collected, clear suggested tours
      if (data.functionCall?.name === 'collectLead' && data.functionCall?.result?.success) {
        setSuggestedTours([]);
      }
    } catch (err: unknown) {
      console.error('Chat error:', err);
      const message = err instanceof Error ? err.message : 'Failed to send message';
      setError(message);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'I apologize, I am having trouble connecting right now. Please contact Giorgi directly on WhatsApp at +995 599 033 319.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, language]);

  const collectLead = useCallback(async (data: {
    name: string;
    phone: string;
    email?: string;
    tourId?: string;
    tourName?: string;
  }) => {
    try {
      const supabase = createBrowserSupabaseClient();
      const { error } = await supabase.from('leads').insert({
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        tour_id: data.tourId || null,
        tour_name: data.tourName || null,
        message: 'Lead collected from chatbot',
        status: 'new',
        source: 'chatbot',
      });

      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Lead collection error:', err);
      return false;
    }
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    suggestedTours,
    collectLead,
    error,
  };
}
