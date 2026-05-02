'use client';

import { Tour } from '@/types/tour';
import { useLocale, useTranslations } from 'next-intl';
import { Check, Globe, Users, Clock, Star } from 'lucide-react';

interface TourDetailsProps {
  tour: Tour;
}

export function TourDetails({ tour }: TourDetailsProps) {
  const locale = useLocale();
  const t = useTranslations('tours');
  
  return (
    <div className="space-y-8">
      {/* What's Included */}
      <section>
        <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-4">
          What's Included
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Professional guide',
            'Transportation',
            'Bottled water',
            'Entrance fees',
            'Hotel pickup'
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#10B981]/10 flex items-center justify-center flex-shrink-0">
                <Check size={12} className="text-[#10B981]" />
              </div>
              <span className="text-[#1E293B] dark:text-gray-300">{item}</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Highlights */}
      <section>
        <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-4">
          Highlights
        </h3>
        <ul className="space-y-2">
          {tour.highlights[locale]?.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-2 flex-shrink-0" />
              <span className="text-[#1E293B] dark:text-gray-300">{highlight}</span>
            </li>
          )) || tour.highlights.en?.map((highlight, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-2 flex-shrink-0" />
              <span className="text-[#1E293B] dark:text-gray-300">{highlight}</span>
            </li>
          ))}
        </ul>
      </section>
      
      {/* Languages */}
      <section>
        <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-4">
          Available Languages
        </h3>
        <div className="flex flex-wrap gap-2">
          {tour.languages.map((lang) => (
            <span 
              key={lang}
              className="px-3 py-1.5 bg-gray-100 dark:bg-zinc-800 rounded-full text-sm text-[#64748B] dark:text-gray-400"
            >
              {lang === 'en' && '🇬🇧 English'}
              {lang === 'ru' && '🇷🇺 Русский'}
              {lang === 'tr' && '🇹🇷 Türkçe'}
              {lang === 'de' && '🇩🇪 Deutsch'}
              {lang === 'he' && '🇮🇱 עברית'}
              {lang === 'ka' && '🇬🇪 ქართული'}
            </span>
          ))}
        </div>
      </section>
      
      {/* Description */}
      <section>
        <h3 className="text-xl font-bold text-[#1E293B] dark:text-white mb-4">
          Description
        </h3>
        <p className="text-[#64748B] dark:text-gray-400 leading-relaxed whitespace-pre-line">
          {tour.description[locale] || tour.description.en}
        </p>
      </section>
    </div>
  );
}
