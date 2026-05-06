'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

// ─── Types ────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

// ─── FAQ Data ─────────────────────────────────────────────────

const faqData: FAQItem[] = [
  {
    question: 'What is the best time to visit Georgia?',
    answer:
      'The best time to visit Georgia is from May to October. Summer (June-August) is ideal for mountain trekking and beach holidays, while autumn (September-October) is perfect for wine tours during the harvest season. Spring (April-May) offers blooming landscapes and fewer crowds. Winter (December-March) is excellent for skiing in Gudauri and Bakuriani.',
  },
  {
    question: 'Do I need a visa to visit Georgia?',
    answer:
      'Citizens of 95+ countries can enter Georgia visa-free for up to 365 days! This includes EU, USA, Canada, UK, Australia, Japan, South Korea, and many others. Check the official Georgia e-Visa portal for specific requirements based on your nationality.',
  },
  {
    question: 'Is Georgia safe for tourists?',
    answer:
      'Yes! Georgia is one of the safest countries for tourists. It consistently ranks in the top 10 safest countries globally. The locals are extremely hospitable, and violent crime against tourists is very rare. Standard travel precautions apply as with any destination.',
  },
  {
    question: 'What currency is used in Georgia?',
    answer:
      'The Georgian Lari (GEL) is the official currency. 1 USD ≈ 2.7 GEL. Credit cards are widely accepted in cities, but carry cash for rural areas. ATMs are available throughout the country.',
  },
  {
    question: 'What languages are spoken in Georgia?',
    answer:
      'Georgian is the official language with its unique alphabet. Russian is widely spoken, especially among older generations. English is increasingly common in tourist areas, hotels, and restaurants in Tbilisi and Batumi. Our guides speak fluent English!',
  },
];

// ─── FAQ Component ────────────────────────────────────────────

export function FAQ() {
  const { t, isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4 bg-gray-50 dark:bg-zinc-900">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <MessageCircleQuestion className="w-4 h-4" />
              <span className="text-sm font-medium">FAQ</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about traveling to Georgia
            </p>
          </motion.div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 overflow-hidden ${
                  isRTL ? 'rtl' : ''
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-zinc-700/50 transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
