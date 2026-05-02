'use client';

import { RegionData } from '@/types/tour';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Compass } from 'lucide-react';

interface RegionCardClientProps {
  region: RegionData;
  lang: string;
  tourCount: number;
  index: number;
}

export function RegionCardClient({ region, lang, tourCount, index }: RegionCardClientProps) {
  const isRTL = lang === 'ar' || lang === 'he';
  const tr = region.translations[lang as keyof typeof region.translations] || region.translations.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={`/${lang}/regions/${region.slug}`}
        className="group block relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/5"
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={region.image}
            alt={tr.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-[#001F3F]/40 to-transparent" />

          {/* Region Name & Icon */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-xs font-medium uppercase tracking-wider">
                {tr.name}
              </span>
            </div>
          </div>

          {/* Tour Count Badge */}
          {tourCount > 0 && (
            <div className={`absolute top-3 ${isRTL ? 'left-3' : 'right-3'}`}>
              <span className="px-2.5 py-1 bg-[#D4AF37]/20 backdrop-blur-sm text-[#D4AF37] text-xs font-bold rounded-full border border-[#D4AF37]/30">
                {tourCount} {tourCount === 1
                  ? (lang === 'ka' ? 'ტური'
                    : lang === 'en' ? 'tour'
                    : lang === 'ru' ? 'тур'
                    : lang === 'uk' ? 'тур'
                    : lang === 'ar' ? 'جولة'
                    : 'סיור')
                  : (lang === 'ka' ? 'ტური'
                    : lang === 'en' ? 'tours'
                    : lang === 'ru' ? 'тура'
                    : lang === 'uk' ? 'тури'
                    : lang === 'ar' ? 'جولات'
                    : 'סיורים')
                }
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
            {tr.name}
          </h3>
          <p className="text-sm text-white/50 line-clamp-2 mb-4">
            {tr.description}
          </p>
          <div className={`flex items-center gap-2 text-[#D4AF37] text-sm font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span>
              {lang === 'ka' ? 'გაიგე მეტი'
                : lang === 'en' ? 'Explore'
                : lang === 'ru' ? 'Исследовать'
                : lang === 'uk' ? 'Дослідити'
                : lang === 'ar' ? 'استكشف'
                : 'חקור'}
            </span>
            <ArrowRight size={14} className={`group-hover:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
