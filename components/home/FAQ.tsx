'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { FAQSchema } from '@/components/seo/StructuredData';

// ─── Types ────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

// ─── FAQ Data ─────────────────────────────────────────────────

export const faqData: FAQItem[] = [
  {
    question: 'What is the best time to visit Georgia?',
    answer:
      'The best time to visit Georgia is from May to October. Summer (June-August) is ideal for mountain trekking and beach holidays, while autumn (September-October) is perfect for wine tours during the harvest season. Spring (April-May) offers blooming landscapes and fewer crowds. Winter (December-March) is excellent for skiing in Gudauri and Bakuriani.',
  },
  {
    question: 'Do I need a visa to travel to Georgia?',
    answer:
      'Citizens of over 90 countries, including the EU, USA, UK, Canada, Australia, and most of the Middle East, can enter Georgia visa-free for up to one year. Check the official Georgian government website for the most current visa requirements for your nationality.',
  },
  {
    question: 'Is Georgia safe for tourists?',
    answer:
      'Yes, Georgia is one of the safest countries for tourists. It consistently ranks among the safest destinations globally with very low crime rates. Georgians are famous for their hospitality, and visitors are treated with great warmth and respect. As with any travel destination, standard precautions are recommended.',
  },
  {
    question: 'What currency is used in Georgia and can I use cards?',
    answer:
      'The Georgian Lari (GEL) is the official currency. Credit and debit cards are widely accepted in Tbilisi, Batumi, and Kutaisi. However, cash is preferred in smaller towns and rural areas. ATMs are readily available in cities, and currency exchange offices offer competitive rates.',
  },
  {
    question: 'How do I get around Georgia?',
    answer:
      'Marshrutkas (shared minibuses) are the most common and affordable way to travel between cities. Taxis and ride-hailing apps like Bolt work well in cities. For mountain regions like Kazbegi, Svaneti, and Tusheti, renting a 4WD with a driver is recommended. Domestic flights connect Tbilisi with Mestia and Ambrolauri.',
  },
  {
    question: 'What languages are spoken in Georgia?',
    answer:
      'Georgian is the official language and uses its own unique alphabet. Russian is widely spoken, especially among older generations. English is increasingly common among younger people and in the tourism industry. Our guides at Georgian Treasure speak English, Russian, and Georgian fluently.',
  },
  {
    question: 'What should I pack for a trip to Georgia?',
    answer:
      'Pack layers regardless of season, as mountain weather can change quickly. Comfortable walking shoes are essential for cobblestone streets and hiking trails. A waterproof jacket, sunscreen, and a universal power adapter (Type C and F plugs) are recommended. For mountain regions, warm clothing is necessary even in summer.',
  },
  {
    question: 'How much does a trip to Georgia cost?',
    answer:
      'Georgia is very budget-friendly. A mid-range traveler can expect to spend $50-80 per day including accommodation, meals, and transport. Budget travelers can manage on $25-40 per day. Private tours typically range from $80-200 per day depending on the itinerary and group size.',
  },
  {
    question: 'What food should I try in Georgia?',
    answer:
      'Must-try Georgian dishes include khachapuri (cheese-filled bread), khinkali (soup dumplings), mtsvadi (grilled meat), badrijani nigvzit (eggplant with walnut paste), churchkhela (grape and walnut snack), and any dish from a traditional supra (Georgian feast). Georgian wine, with its 8,000-year history, is also essential.',
  },
  {
    question: 'Can Georgian Treasure organize custom private tours?',
    answer:
      'Absolutely! Georgian Treasure specializes in custom private tours tailored to your interests, schedule, and budget. Whether you want a wine-focused journey through Kakheti, an adventure trek in Svaneti, a family-friendly coastal holiday, or a photography expedition, we design personalized itineraries. Contact us via WhatsApp or email to start planning your perfect Georgia trip.',
  },
];

// ─── Translations ─────────────────────────────────────────────

const translations = {
  en: {
    title: 'Frequently Asked Questions',
    subtitle: 'Everything you need to know about traveling to Georgia',
    contactPrompt: 'Still have questions?',
    contactAction: 'Contact us on WhatsApp',
  },
  ka: {
    title: 'ხშირად დასმული კითხვები',
    subtitle: 'ყველაფერი, რაც საქართველოში მოგზაურობისთვის გჭირდებათ',
    contactPrompt: 'კიდევ გაქვთ კითხვები?',
    contactAction: 'დაგვიკავშირდით WhatsApp-ზე',
  },
  ru: {
    title: 'Часто задаваемые вопросы',
    subtitle: 'Все, что вам нужно знать о путешествии в Грузию',
    contactPrompt: 'Остались вопросы?',
    contactAction: 'Свяжитесь с нами в WhatsApp',
  },
};

// ─── FAQ Accordion Item ───────────────────────────────────────

function FAQAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen
          ? 'bg-white/10 border-[#D4AF37]/30'
          : 'bg-white/5 border-white/10 hover:border-white/20'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-white text-base md:text-lg pr-4">
          {item.question}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-[#D4AF37] text-[#001F3F] rotate-180'
              : 'bg-white/10 text-white/60'
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          <p className="text-white/70 leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ Section Component ────────────────────────────────────

export default function FAQ({
  locale = 'en',
  items = faqData,
}: {
  locale?: keyof typeof translations;
  items?: FAQItem[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const t = translations[locale] || translations.en;

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* SEO: FAQPage Schema */}
      <FAQSchema faqs={items} />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#F9E272] text-sm font-medium mb-6">
            <MessageCircleQuestion className="w-4 h-4" />
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-gradient-to-r from-[#D4AF37]/10 to-[#F9E272]/5 border border-[#D4AF37]/20">
          <p className="text-white mb-4">{t.contactPrompt}</p>
          <a
            href="https://wa.me/995599147691"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold hover:shadow-lg hover:shadow-green-500/20 transition-all"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {t.contactAction}
          </a>
        </div>
      </div>
    </section>
  );
}
