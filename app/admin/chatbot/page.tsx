'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  MessageSquare,
  Brain,
  History,
  Database,
  Loader2,
  Save,
  RefreshCw,
  Search,
  User,
  Bot,
  Clock,
  ChevronRight,
  Settings2,
} from 'lucide-react';

type Tab = 'faq' | 'prompt' | 'history' | 'training';

interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant';
  content: string;
  metadata?: Record<string, any>;
  created_at: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function ChatbotTraining() {
  const [activeTab, setActiveTab] = useState<Tab>('faq');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [originalPrompt, setOriginalPrompt] = useState('');
  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    { id: '1', question: 'What is the best time to visit Georgia?', answer: 'The best time to visit Georgia is from May to October. September is ideal for wine harvest (Rtveli). Summer (June-August) is perfect for mountains and beaches.', category: 'general' },
    { id: '2', question: 'Do I need a visa for Georgia?', answer: 'Citizens of 90+ countries can enter Georgia visa-free for up to 1 year, including EU, US, UK, Canada, Australia, Israel, and UAE citizens.', category: 'general' },
    { id: '3', question: 'How do I book a tour?', answer: 'You can book via WhatsApp at +995 599 033 319, through our website booking form, or by sending an email to info@georgiantreasure.ge.', category: 'booking' },
    { id: '4', question: 'What payment methods do you accept?', answer: 'We accept cash (GEL/USD/EUR), bank transfer, and Wise transfers. Payment is typically made on arrival or via transfer before the tour.', category: 'payment' },
    { id: '5', question: 'Are your guides licensed?', answer: 'Yes, all our guides are licensed professionals who speak multiple languages including Georgian, English, Russian, Ukrainian, Arabic, and Hebrew.', category: 'guides' },
    { id: '6', question: 'Can you arrange custom tours?', answer: 'Absolutely! We specialize in custom itineraries. Tell us your interests, dates, group size, and budget, and we will create a personalized tour plan within 24 hours.', category: 'custom' },
    { id: '7', question: 'What is included in the tour price?', answer: 'Most tours include professional guide, transportation, entrance fees, and meals where specified. Specific inclusions are listed on each tour page.', category: 'pricing' },
    { id: '8', question: 'What should I bring on a mountain tour?', answer: 'Comfortable hiking shoes, warm layers (mountains can be cold), sunscreen, water bottle, camera, and rain jacket. We provide a detailed packing list after booking.', category: 'packing' },
  ]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchChatHistory();
    loadSystemPrompt();
  }, []);

  const fetchChatHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/chat/history?limit=100');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadSystemPrompt = async () => {
    try {
      const res = await fetch('/api/chat/prompt');
      if (res.ok) {
        const data = await res.json();
        setSystemPrompt(data.prompt || '');
        setOriginalPrompt(data.prompt || '');
      }
    } catch {
      // Fallback: load from module
      const { systemPrompt: sp } = await import('@/lib/chatbot/system-prompt');
      setSystemPrompt(sp);
      setOriginalPrompt(sp);
    }
  };

  const saveSystemPrompt = async () => {
    setSaving(true);
    try {
      await fetch('/api/chat/prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: systemPrompt }),
      });
      setOriginalPrompt(systemPrompt);
    } catch (error) {
      console.error('Error saving prompt:', error);
    } finally {
      setSaving(false);
    }
  };

  const filteredMessages = messages.filter((m) =>
    m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.session_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'faq', label: 'FAQ Management', icon: Database },
    { id: 'prompt', label: 'System Prompt', icon: Brain },
    { id: 'history', label: 'Chat History', icon: History },
    { id: 'training', label: 'Training Data', icon: Settings2 },
  ];

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#001F3F] dark:text-white tracking-tight">Chatbot Training</h1>
        <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage FAQ, system prompt, and review chat history</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-white/5 p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all',
              activeTab === tab.id
                ? 'bg-[#001F3F] text-white shadow-sm'
                : 'text-gray-500 dark:text-white/40 hover:text-gray-700 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5'
            )}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* FAQ Management */}
      {activeTab === 'faq' && (
        <div className="space-y-4">
          {faqItems.map((faq, idx) => (
            <div key={faq.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center text-[10px] font-black">{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 dark:bg-white/5 text-gray-500">{faq.category}</span>
                  </div>
                  <h3 className="font-bold text-[#001F3F] dark:text-white text-sm mb-2">{faq.question}</h3>
                  <p className="text-sm text-gray-600 dark:text-white/60 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* System Prompt Editor */}
      {activeTab === 'prompt' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-black text-[#001F3F] dark:text-white">System Prompt</h2>
              <p className="text-xs text-gray-400 mt-1">This is the core instruction given to the AI. Edit carefully.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSystemPrompt(originalPrompt)}
                className="flex items-center gap-1 px-3 py-2 border border-gray-200 dark:border-white/10 rounded-lg text-xs font-bold text-gray-500 hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                <RefreshCw size={12} /> Reset
              </button>
              <button
                onClick={saveSystemPrompt}
                disabled={saving || systemPrompt === originalPrompt}
                className={cn(
                  'flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-bold transition-all',
                  saving || systemPrompt === originalPrompt
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#001F3F] text-white hover:bg-[#003366]'
                )}
              >
                <Save size={12} /> {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
          <textarea
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-zinc-800 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#D4AF37] resize-none font-mono leading-relaxed"
            rows={24}
          />
        </div>
      )}

      {/* Chat History */}
      {activeTab === 'history' && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-xl pl-9 pr-4 py-2.5 shadow-sm w-full focus:ring-2 focus:ring-[#D4AF37] outline-none dark:text-white text-sm"
                placeholder="Search conversations..."
              />
            </div>
            <button
              onClick={fetchChatHistory}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-gray-500 hover:border-[#D4AF37] transition-all"
            >
              <RefreshCw size={16} />
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 size={28} className="animate-spin text-[#D4AF37]" />
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-16 text-gray-400 dark:text-white/30 text-sm">
              No chat history yet. Conversations will appear here.
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'p-4 rounded-xl border transition-all',
                    msg.role === 'user'
                      ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900/20'
                      : 'bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-white/5'
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {msg.role === 'user' ? (
                      <User size={14} className="text-blue-500" />
                    ) : (
                      <Bot size={14} className="text-[#D4AF37]" />
                    )}
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      {msg.role}
                    </span>
                    <span className="text-[10px] text-gray-400 flex items-center gap-1 ml-auto">
                      <Clock size={10} /> {new Date(msg.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-white/70 whitespace-pre-wrap">{msg.content}</p>
                  {msg.metadata?.functionCall && (
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-[#D4AF37]/10 text-[#D4AF37]">
                      fn: {msg.metadata.functionCall.name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Training Data */}
      {activeTab === 'training' && (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 p-6 shadow-sm">
          <h2 className="text-lg font-black text-[#001F3F] dark:text-white mb-4">Training Data Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
              <p className="text-2xl font-black text-blue-600">{faqItems.length}</p>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">FAQ Items</p>
            </div>
            <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20">
              <p className="text-2xl font-black text-purple-600">{messages.length}</p>
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">Chat Messages</p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
              <p className="text-2xl font-black text-green-600">{systemPrompt.length}</p>
              <p className="text-xs font-bold text-green-400 uppercase tracking-wider">Prompt Chars</p>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-white/5 pt-6">
            <h3 className="font-bold text-sm text-[#001F3F] dark:text-white mb-3">Response Templates</h3>
            <div className="space-y-3">
              {[
                { name: 'greeting', desc: 'Welcome message when user starts chat' },
                { name: 'tour_suggestion', desc: 'Suggested tours based on user interests' },
                { name: 'pricing_info', desc: 'Pricing and discount information' },
                { name: 'booking_guide', desc: 'How to book step-by-step' },
                { name: 'lead_collection', desc: 'Collect user contact information' },
              ].map((template) => (
                <div key={template.name} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <MessageSquare size={16} className="text-[#D4AF37]" />
                    <div>
                      <p className="text-sm font-bold text-[#001F3F] dark:text-white">{template.name}</p>
                      <p className="text-xs text-gray-400">{template.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={14} className="text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
