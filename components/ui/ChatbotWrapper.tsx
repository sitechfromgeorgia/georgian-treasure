'use client';

import dynamic from 'next/dynamic';

const AIChatbot = dynamic(() => import('@/components/chatbot/AIChatbot'), {
  ssr: false,
  loading: () => null,
});

export function ChatbotWrapper() {
  return <AIChatbot />;
}
