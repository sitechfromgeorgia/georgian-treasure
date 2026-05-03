'use client';

import { ExtendedTour } from '@/types/tour';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Star, Clock, Users, MapPin, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface TourCardProps {
  tour: ExtendedTour;
  index?: number;
}

const difficultyColors: Record<string, string> = {
  easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  moderate: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  challenging: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
  extreme: 'bg-red-500/15 text-red-400 border-red-500/20',
};

const difficultyLabels: Record<string, Record<string, string>> = {
  easy: { ka: 'მარტივი', en: 'Easy', ru: 'Легко', he: 'קל' },
  moderate: { ka: 'საშუალო', en: 'Moderate', ru: 'Средне', he: 'בינוני' },
  challenging: { ka: 'რთული', en: 'Challenging', ru: 'Сложно', he: 'מאתגר' },
  extreme: { ka: 'ექსტრემალური', en: 'Extreme', ru: 'Экстрим', he: 'קיצוני' },
};

const categoryLabels: Record<string, Record<string, string>> = {
  city: { ka: 'ქალაქური', en: 'City', ru: 'Городской', he: 'עירוני' },
  mountain: { ka: 'მთის', en: 'Mountain', ru: 'Горный', he: 'הרים' },
  wine: { ka: 'ღვინის', en: 'Wine', ru: 'Винный', he: 'יין' },
  adventure: { ka: 'სათავგადასავლო', en: 'Adventure', ru: 'Приключение', he: 'הרפתקה' },
  cultural: { ka: 'კულტურული', en: 'Cultural', ru: 'Культурный', he: 'תרבותי' },
  food: { ka: 'გასტრონომიული', en: 'Food', ru: 'Гастро', he: 'אוכל' },
  transfer: { ka: 'ტრანსფერი', en: 'Transfer', ru: 'Трансфер', he: 'הסעה' },
  custom: { ka: 'ინდივიდუალური', en: 'Custom', ru: 'Индивид.', he: 'מותאם' },
};

const regionLabels: Record<string, Record<string, string>> = {
  adjara: { ka: 'აჭარა', en: 'Adjara', ru: 'Аджария', he: 'אג׳ריה' },
  tbilisi: { ka: 'თბილისი', en: 'Tbilisi', ru: 'Тбилиси', he: 'טביליסי' },
  kakheti: { ka: 'კახეთი', en: 'Kakheti', ru: 'Кахетия', he: 'קאחתי' },
  kazbegi: { ka: 'ყაზბეგი', en: 'Kazbegi', ru: 'Казбеги', he: 'קאזבגי' },
  svaneti: { ka: 'სვანეთი', en: 'Svaneti', ru: 'Сванетия', he: 'סוונטי' },
  west: { ka: 'დასავლეთი', en: 'West', ru: 'Запад', he: 'מערב' },
  samtskhe: { ka: 'სამცხე', en: 'Samtskhe', ru: 'Самцхе', he: 'סאמצחה' },
  imereti: { ka: 'იმერეთი', en: 'Imereti', ru: 'Имеретия', he: 'אימרתי' },
  racha: { ka: 'რაჭა', en: 'Racha', ru: 'Рача', he: 'ראצה' },
  guria: { ka: 'გურია', en: 'Guria', ru: 'Гурия', he: 'גוריה' },
  samegrelo: { ka: 'სამეგრელო', en: 'Samegrelo', ru: 'Самегрело', he: 'סאמגרלו' },
  tusheti: { ka: 'თუშეთი', en: 'Tusheti', ru: 'Тушетия', he: 'תושטיה' },
};

export function TourCard({ tour, index = 0 }: TourCardProps) {
  const { language, isRTL } = useLanguage();

  const tr = tour.translations[language] || tour.translations.en;
  const coverImage = tour.images[0] || '/tours/placeholder.jpg';

  const diffKey = tour.difficulty;
  const diffColor = difficultyColors[diffKey] || difficultyColors.easy;
  const diffLabel = difficultyLabels[diffKey]?.[language] || diffKey;
  const categoryLabel = categoryLabels[tour.category]?.[language] || tour.category;
  const regionLabel = regionLabels[tour.region]?.[language] || tour.region;

  // View details label
  const viewDetailsLabel =
    language === 'ka' ? 'დეტალების ნახვა'
    : language === 'en' ? 'View Details'
    : language === 'ru' ? 'Подробнее'
    : 'פרטים';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-500 hover:shadow-xl hover:shadow-[#D4AF37]/5"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={coverImage}
          alt={tr.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 via-[#001F3F]/20 to-transparent" />

        {/* Featured Badge */}
        {tour.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-3 left-3 z-10"
          >
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4AF37] text-[#001F3F] text-xs font-bold rounded-full uppercase tracking-wide">
              <Star size={10} fill="currentColor" />
              {language === 'ka' ? 'რეკომენდებული'
                : language === 'en' ? 'Featured'
                : language === 'ru' ? 'Рекомендуем'
                : 'מומלץ'}
            </span>
          </motion.div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-3 py-1 bg-[#001F3F]/70 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/10 capitalize">
            {categoryLabel}
          </span>
        </div>

        {/* Price Badge - Bottom */}
        <div className={`absolute bottom-3 ${isRTL ? 'left-3' : 'right-3'} z-10`}>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs text-white/70 line-through">${tour.priceUsd}</span>
            <span className="px-3 py-1 bg-[#D4AF37] text-[#001F3F] text-sm font-bold rounded-lg">
              {tour.priceGel} GEL
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors duration-300">
          {tr.title}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-1">
          {tr.shortDescription}
        </p>

        {/* Meta Row */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-white/50">
          <div className="flex items-center gap-1">
            <Clock size={13} className="text-[#D4AF37]" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={13} className="text-[#D4AF37]" />
            <span>1-{tour.maxGroupSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={13} className="text-[#D4AF37]" />
            <span>{regionLabel}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full border text-[10px] font-medium ${diffColor}`}>
            {diffLabel}
          </span>
        </div>

        {/* CTA */}
        <Link
          href={`/${language}/tours/${tour.slug}`}
          className={`inline-flex items-center justify-center gap-2 w-full py-3 bg-[#001F3F] hover:bg-[#D4AF37] text-white hover:text-[#001F3F] font-semibold rounded-xl border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all duration-300 group/btn ${isRTL ? 'flex-row-reverse' : ''}`}
        >
          <span className="text-sm">{viewDetailsLabel}</span>
          <ArrowRight size={14} className={`group-hover/btn:translate-x-1 transition-transform duration-300 ${isRTL ? 'rotate-180 group-hover/btn:-translate-x-1' : ''}`} />
        </Link>
      </div>
    </motion.div>
  );
}
