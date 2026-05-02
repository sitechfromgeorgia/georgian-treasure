'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ChevronRight,
  Loader2,
  MapPin,
  Calendar,
  Users,
  Mail,
  Phone,
  CheckCircle,
  Minimize2,
  Globe,
  Maximize2,
} from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { useLocale } from 'next-intl';

const suggestedQuestions: Record<string, string[]> = {
  en: [
    'What tours do you offer in Kakheti?',
    'How much does a Kazbegi tour cost?',
    'What\'s the best time to visit Georgia?',
    'Do you offer custom tours?',
    'How can I book a tour?',
  ],
  ka: [
    'რა ტურები გაქვთ კახეთში?',
    'რამდენი ღირს ყაზბეგის ტური?',
    'როდის სჯობს საქართველოში ვიზიტი?',
    'გაქვთ ინდივიდუალური ტურები?',
    'როგორ დავბუქინგო ტური?',
  ],
  ru: [
    'Какие туры есть в Кахетии?',
    'Сколько стоит тур в Казбеги?',
    'Когда лучше посетить Грузию?',
    'Есть ли индивидуальные туры?',
    'Как забронировать тур?',
  ],
  uk: [
    'Які тури є в Кахетії?',
    'Скільки коштує тур у Казбегі?',
    'Коли краще відвідати Грузію?',
  ],
  ar: [
    'ما الجولات المتوفرة في كاخيتي؟',
    'كم تكلفة جولة كازبيجي؟',
    'متى أفضل وقت لزيارة جورجيا؟',
  ],
  he: [
    'מהם הסיורים בקאחתי?',
    'כמה עולה סיור בקאזבגי?',
    'מתי הזמן הטוב ביותר לבקר בגאורגיה?',
  ],
};

const welcomeMessages: Record<string, string> = {
  ka: 'გამარჯობა! მე ვარ თქვენი ქართული მოგზაურობის ასისტენტი Giorgi. როგორ შემიძლია დაგეხმაროთ?',
  en: "Hi! I'm Giorgi, your Georgian travel assistant. Ask me about tours, pricing, or anything about Georgia!",
  ru: 'Привет! Я Giorgi, ваш грузинский туристический ассистент. Спросите меня о турах, ценах или о Грузии!',
  uk: 'Привіт! Я Giorgi, ваш грузинський туристичний асистент. Питайте мене про тури, ціни чи Грузію!',
  ar: 'مرحباً! أنا Giorgi، مساعد سفرك الجورجي. اسألني عن الجولات والأسعار أو أي شيء عن جورجيا!',
  he: 'הי! אני Giorgi, עוזר הנסיעות הגאורגי שלך. שאל אותי על סיורים, מחירים או כל דבר על גאורגיה!',
};

const quickRepliesByIntent: Record<string, string[]> = {
  greeting: ['Tour prices', 'Popular tours', 'Custom tour', 'Contact info'],
  prices: ['Budget tours', 'Premium tours', 'Group discounts', 'Back to menu'],
  tours: ['Kakheti wine tour', 'Kazbegi mountain', 'Batumi city', 'Tbilisi culture'],
  booking: ['Book via WhatsApp', 'Send email inquiry', 'Call us', 'Leave details'],
  contact: ['WhatsApp', 'Email', 'Phone number', 'Back to menu'],
};

export default function AIChatbot() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', phone: '', interests: '' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [currentQuickReplies, setCurrentQuickReplies] = useState<string[]>([]);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, isLoading, sendMessage, collectLead } = useChat(locale);

  const welcome = welcomeMessages[locale] || welcomeMessages.en;
  const suggestions = suggestedQuestions[locale] || suggestedQuestions.en;

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !showLeadForm) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, showLeadForm]);

  const handleSend = useCallback(async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    if (!hasStarted) setHasStarted(true);
    setInputValue('');
    setCurrentQuickReplies([]);
    await sendMessage(messageText);

    // Set quick replies based on message content
    const msg = messageText.toLowerCase();
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('gel')) {
      setCurrentQuickReplies(quickRepliesByIntent.prices);
    } else if (msg.includes('book') || msg.includes('reserve')) {
      setCurrentQuickReplies(quickRepliesByIntent.booking);
    } else if (msg.includes('contact') || msg.includes('phone') || msg.includes('email')) {
      setCurrentQuickReplies(quickRepliesByIntent.contact);
    } else {
      setCurrentQuickReplies(quickRepliesByIntent.tours);
    }
  }, [inputValue, hasStarted, sendMessage]);

  const handleQuickReply = useCallback((reply: string) => {
    if (reply === 'Leave details' || reply === 'Custom tour') {
      setShowLeadForm(true);
      setCurrentQuickReplies([]);
      return;
    }
    if (reply === 'Book via WhatsApp' || reply === 'WhatsApp') {
      window.open('https://wa.me/995599033319', '_blank');
      return;
    }
    if (reply === 'Send email inquiry' || reply === 'Email') {
      window.location.href = 'mailto:info@georgiantreasure.ge';
      return;
    }
    if (reply === 'Call us' || reply === 'Phone number') {
      window.location.href = 'tel:+995599033319';
      return;
    }
    if (reply === 'Back to menu') {
      setCurrentQuickReplies(quickRepliesByIntent.greeting);
      return;
    }
    handleSend(reply);
  }, [handleSend]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.phone) return;

    const success = await collectLead({
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email || undefined,
      tourName: leadData.interests || undefined,
    });

    if (success) {
      setLeadSubmitted(true);
      setShowLeadForm(false);
      setCurrentQuickReplies(quickRepliesByIntent.greeting);
    }
  };

  const displayMessages = !hasStarted
    ? [{ id: 'welcome', role: 'assistant' as const, content: welcome }]
    : messages;

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-br from-[#001F3F] to-[#003366] text-white rounded-full shadow-2xl shadow-[#001F3F]/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
            aria-label="Open chat"
          >
            <MessageCircle size={28} className="group-hover:animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] rounded-full border-2 border-white dark:border-zinc-950" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden border shadow-2xl transition-all',
              isMinimized
                ? 'w-[340px] h-[60px] rounded-2xl'
                : 'w-[420px] max-w-[calc(100vw-48px)] h-[620px] max-h-[calc(100vh-100px)] rounded-3xl',
              'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700'
            )}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Georgian Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/60 text-xs">Online</span>
                    <span className="text-white/30 text-xs">·</span>
                    <span className="text-white/40 text-[10px] flex items-center gap-0.5">
                      <Globe size={8} /> {locale.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 transition-all"
                >
                  {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {displayMessages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'flex gap-3',
                        msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                      )}
                    >
                      {/* Avatar */}
                      <div className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                        msg.role === 'user'
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                          : 'bg-[#001F3F]/10 text-[#001F3F] dark:bg-[#D4AF37]/20 dark:text-[#D4AF37]'
                      )}>
                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                      </div>

                      {/* Message Bubble */}
                      <div className={cn(
                        'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                        msg.role === 'user'
                          ? 'bg-[#001F3F] text-white rounded-br-sm'
                          : 'bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-bl-sm'
                      )}>
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#001F3F]/10 dark:bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                        <Bot size={14} className="text-[#001F3F] dark:text-[#D4AF37]" />
                      </div>
                      <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Loader2 size={14} className="text-[#D4AF37] animate-spin" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">Typing...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Lead Form */}
                  {showLeadForm && !leadSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-[#001F3F] to-[#003366] rounded-2xl p-4 text-white"
                    >
                      <h4 className="font-bold text-sm mb-3 flex items-center gap-2">
                        <Mail size={14} className="text-[#D4AF37]" />
                        Get a Custom Quote
                      </h4>
                      <form onSubmit={handleLeadSubmit} className="space-y-3">
                        <input
                          type="text"
                          placeholder="Your name *"
                          required
                          value={leadData.name}
                          onChange={(e) => setLeadData((d) => ({ ...d, name: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        />
                        <input
                          type="tel"
                          placeholder="Phone with country code *"
                          required
                          value={leadData.phone}
                          onChange={(e) => setLeadData((d) => ({ ...d, phone: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        />
                        <input
                          type="email"
                          placeholder="Email (optional)"
                          value={leadData.email}
                          onChange={(e) => setLeadData((d) => ({ ...d, email: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        />
                        <input
                          type="text"
                          placeholder="Interested tour or destination"
                          value={leadData.interests}
                          onChange={(e) => setLeadData((d) => ({ ...d, interests: e.target.value }))}
                          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                        />
                        <button
                          type="submit"
                          className="w-full py-2 bg-[#D4AF37] text-[#001F3F] rounded-lg font-bold text-sm hover:bg-[#F9E272] transition-colors flex items-center justify-center gap-2"
                        >
                          <Send size={14} />
                          Submit Request
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {/* Lead Submitted Success */}
                  {leadSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex justify-center"
                    >
                      <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-2xl px-4 py-3 text-sm flex items-center gap-2">
                        <CheckCircle size={16} />
                        Request submitted! We will contact you within 24h.
                      </div>
                    </motion.div>
                  )}

                  {/* Suggested Questions (only when no messages yet) */}
                  {!hasStarted && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {suggestions.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="px-3 py-1.5 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 text-[#001F3F] dark:text-[#D4AF37] rounded-full text-xs font-medium hover:bg-[#D4AF37]/20 dark:hover:bg-[#D4AF37]/30 transition-colors"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {currentQuickReplies.length > 0 && !showLeadForm && (
                  <div className="px-4 pb-2 flex-shrink-0">
                    <div className="flex flex-wrap gap-2">
                      {currentQuickReplies.slice(0, 4).map((reply) => (
                        <button
                          key={reply}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/20 text-[#001F3F] dark:text-[#D4AF37] rounded-full text-xs font-medium hover:bg-[#D4AF37]/20 dark:hover:bg-[#D4AF37]/30 transition-colors flex items-center gap-1"
                        >
                          {reply}
                          <ChevronRight size={10} />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                {!showLeadForm && (
                  <div className="p-4 border-t border-gray-200 dark:border-zinc-700 flex-shrink-0">
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 rounded-full px-4 py-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask about Georgia tours..."
                        className="flex-1 bg-transparent text-sm text-gray-800 dark:text-white placeholder:text-gray-400 focus:outline-none"
                      />
                      <button
                        onClick={() => handleSend()}
                        disabled={!inputValue.trim() || isLoading}
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                          inputValue.trim() && !isLoading
                            ? 'bg-[#001F3F] text-white hover:bg-[#003366] active:scale-95'
                            : 'bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed'
                        )}
                      >
                        <Send size={14} />
                      </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-300 dark:text-white/10 mt-2">
                      Powered by Georgian Treasure AI · WhatsApp: +995 599 033 319
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
