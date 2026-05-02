'use client';

import { ExtendedTour } from '@/types/tour';
import { extendedTours } from '@/data/extended-tours';
import { useLanguage } from '@/context/LanguageContext';
import { TourCard } from './TourCard';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  Users,
  Globe,
  Check,
  X,
  Backpack,
  ChevronRight,
  Star,
  ArrowLeft,
  Home,
  Share2,
  MessageCircle,
  ChevronDown,
  XIcon,
  Minus,
  Plus,
  Camera,
} from 'lucide-react';
import { useState, useCallback } from 'react';

interface TourDetailClientProps {
  tour: ExtendedTour;
}

const difficultyConfig: Record<string, { labelKey: Record<string, string>; color: string; bg: string }> = {
  easy: {
    labelKey: { ka: 'მარტივი', en: 'Easy', ru: 'Легко', uk: 'Легко', ar: 'سهل', he: 'קל' },
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/15',
  },
  moderate: {
    labelKey: { ka: 'საშუალო', en: 'Moderate', ru: 'Средне', uk: 'Середньо', ar: 'متوسط', he: 'בינוני' },
    color: 'text-amber-400',
    bg: 'bg-amber-500/15',
  },
  challenging: {
    labelKey: { ka: 'რთული', en: 'Challenging', ru: 'Сложно', uk: 'Складно', ar: 'صعب', he: 'מאתגר' },
    color: 'text-orange-400',
    bg: 'bg-orange-500/15',
  },
  extreme: {
    labelKey: { ka: 'ექსტრემალური', en: 'Extreme', ru: 'Экстрим', uk: 'Екстрим', ar: 'متطرف', he: 'קיצוני' },
    color: 'text-red-400',
    bg: 'bg-red-500/15',
  },
};

const languageLabels: Record<string, string> = {
  ka: 'ქართული',
  en: 'English',
  ru: 'Русский',
  uk: 'Українська',
  ar: 'العربية',
  he: 'עברית',
};

// Accordion section component
function AccordionSection({
  title,
  icon: Icon,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/[0.07] transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon size={20} className="text-[#D4AF37]" />
          <span className="text-white font-semibold">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} className="text-white/50" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-5 pt-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TourDetailClient({ tour }: TourDetailClientProps) {
  const { language, isRTL } = useLanguage();
  const tr = tour.translations[language] || tour.translations.en;

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [groupSize, setGroupSize] = useState(2);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const diffConfig = difficultyConfig[tour.difficulty] || difficultyConfig.easy;
  const diffLabel = diffConfig.labelKey[language] || diffConfig.labelKey.en;

  const coverImage = tour.images[0] || '/tours/placeholder.jpg';

  // Related tours: same region or same category
  const relatedTours = extendedTours
    .filter((t) => t.id !== tour.id && (t.region === tour.region || t.category === tour.category))
    .slice(0, 3);

  const totalPrice = tour.priceGel * groupSize;
  const totalPriceUsd = Math.round(tour.priceUsd * groupSize * 100) / 100;

  // WhatsApp booking message
  const whatsappMessage = encodeURIComponent(
    `Hello! I'm interested in booking the "${tr.title}" tour.\n\n` +
    `Group size: ${groupSize} people\n` +
    `Total price: ${totalPrice} GEL ($${totalPriceUsd})\n\n` +
    `Please confirm availability. Thank you!`
  );
  const whatsappNumber = '+995599123456'; // Replace with actual number
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  // Share handlers
  const handleShare = useCallback(async (platform: string) => {
    const url = window.location.href;
    const text = tr.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
      case 'copy':
        await navigator.clipboard.writeText(url);
        break;
    }
    setShowShareMenu(false);
  }, [tr.title]);

  // Translated labels
  const labels = {
    back: language === 'ka' ? 'უკან'
      : language === 'en' ? 'Back to Tours'
      : language === 'ru' ? 'Назад к турам'
      : language === 'uk' ? 'Назад до турів'
      : language === 'ar' ? 'العودة إلى الجولات'
      : 'חזרה לסיורים',
    breadcrumbTours: language === 'ka' ? 'ტურები'
      : language === 'en' ? 'Tours'
      : language === 'ru' ? 'Туры'
      : language === 'uk' ? 'Тури'
      : language === 'ar' ? 'جولات'
      : 'סיורים',
    region: language === 'ka' ? 'რეგიონი'
      : language === 'en' ? 'Region'
      : language === 'ru' ? 'Регион'
      : language === 'uk' ? 'Регіон'
      : language === 'ar' ? 'المنطقة'
      : 'אזור',
    category: language === 'ka' ? 'კატეგორია'
      : language === 'en' ? 'Category'
      : language === 'ru' ? 'Категория'
      : language === 'uk' ? 'Категорія'
      : language === 'ar' ? 'الفئة'
      : 'קטגוריה',
    duration: language === 'ka' ? 'ხანგრძლივობა'
      : language === 'en' ? 'Duration'
      : language === 'ru' ? 'Длительность'
      : language === 'uk' ? 'Тривалість'
      : language === 'ar' ? 'المدة'
      : 'משך',
    difficulty: language === 'ka' ? 'სირთულე'
      : language === 'en' ? 'Difficulty'
      : language === 'ru' ? 'Сложность'
      : language === 'uk' ? 'Складність'
      : language === 'ar' ? 'المستوى'
      : 'רמת קושי',
    maxGroup: language === 'ka' ? 'მაქს. ჯგუფი'
      : language === 'en' ? 'Max Group'
      : language === 'ru' ? 'Макс. группа'
      : language === 'uk' ? 'Макс. група'
      : language === 'ar' ? 'الحد الأقصى'
      : 'גודל קבוצה מקס',
    languages: language === 'ka' ? 'ენები'
      : language === 'en' ? 'Languages'
      : language === 'ru' ? 'Языки'
      : language === 'uk' ? 'Мови'
      : language === 'ar' ? 'اللغات'
      : 'שפות',
    description: language === 'ka' ? 'აღწერა'
      : language === 'en' ? 'Description'
      : language === 'ru' ? 'Описание'
      : language === 'uk' ? 'Опис'
      : language === 'ar' ? 'الوصف'
      : 'תיאור',
    highlights: language === 'ka' ? 'მთავარი მომენტები'
      : language === 'en' ? 'Highlights'
      : language === 'ru' ? 'Основные моменты'
      : language === 'uk' ? 'Основні моменти'
      : language === 'ar' ? 'أبرز اللحظات'
      : 'נקודות מפתח',
    itinerary: language === 'ka' ? 'მარშრუტი'
      : language === 'en' ? 'Itinerary'
      : language === 'ru' ? 'Маршрут'
      : language === 'uk' ? 'Маршрут'
      : language === 'ar' ? 'خط السير'
      : 'מסלול',
    included: language === 'ka' ? 'რა შედის'
      : language === 'en' ? "What's Included"
      : language === 'ru' ? 'Что включено'
      : language === 'uk' ? 'Що включено'
      : language === 'ar' ? 'ما هو شامل'
      : 'מה כלול',
    notIncluded: language === 'ka' ? 'რა არ შედის'
      : language === 'en' ? 'Not Included'
      : language === 'ru' ? 'Не включено'
      : language === 'uk' ? 'Не включено'
      : language === 'ar' ? 'غير شامل'
      : 'לא כלול',
    whatToBring: language === 'ka' ? 'რა წამოიღოთ'
      : language === 'en' ? 'What to Bring'
      : language === 'ru' ? 'Что взять с собой'
      : language === 'uk' ? 'Що взяти з собою'
      : language === 'ar' ? 'ماذا تحضر'
      : 'מה להביא',
    gallery: language === 'ka' ? 'ფოტო გალერეა'
      : language === 'en' ? 'Gallery'
      : language === 'ru' ? 'Галерея'
      : language === 'uk' ? 'Галерея'
      : language === 'ar' ? 'معرض الصور'
      : 'גלריה',
    relatedTours: language === 'ka' ? 'მსგავსი ტურები'
      : language === 'en' ? 'Related Tours'
      : language === 'ru' ? 'Похожие туры'
      : language === 'uk' ? 'Схожі тури'
      : language === 'ar' ? 'جولات مشابهة'
      : 'סיורים דומים',
    bookNow: language === 'ka' ? 'დაჯავშნე ახლავე'
      : language === 'en' ? 'Book Now'
      : language === 'ru' ? 'Забронировать'
      : language === 'uk' ? 'Забронювати'
      : language === 'ar' ? 'احجز الآن'
      : 'הזמן עכשיו',
    bookViaWhatsApp: language === 'ka' ? 'WhatsApp-ით დაჯავშნა'
      : language === 'en' ? 'Book via WhatsApp'
      : language === 'ru' ? 'Забронировать через WhatsApp'
      : language === 'uk' ? 'Забронювати через WhatsApp'
      : language === 'ar' ? 'احجز عبر واتساب'
      : 'הזמן בוואטסאפ',
    perPerson: language === 'ka' ? 'ერთ ადამიანზე'
      : language === 'en' ? 'per person'
      : language === 'ru' ? 'на человека'
      : language === 'uk' ? 'на людину'
      : language === 'ar' ? 'للشخص'
      : 'לאדם',
    groupSizeLabel: language === 'ka' ? 'ჯგუფის ზომა'
      : language === 'en' ? 'Group Size'
      : language === 'ru' ? 'Размер группы'
      : language === 'uk' ? 'Розмір групи'
      : language === 'ar' ? 'حجم المجموعة'
      : 'גודל קבוצה',
    totalPrice: language === 'ka' ? 'საერთო ფასი'
      : language === 'en' ? 'Total Price'
      : language === 'ru' ? 'Общая цена'
      : language === 'uk' ? 'Загальна ціна'
      : language === 'ar' ? 'السعر الإجمالي'
      : 'מחיר כולל',
    share: language === 'ka' ? 'გაზიარება'
      : language === 'en' ? 'Share'
      : language === 'ru' ? 'Поделиться'
      : language === 'uk' ? 'Поділитися'
      : language === 'ar' ? 'مشاركة'
      : 'שתף',
    reviews: language === 'ka' ? 'მიმოხილვები'
      : language === 'en' ? 'Reviews'
      : language === 'ru' ? 'Отзывы'
      : language === 'uk' ? 'Відгуки'
      : language === 'ar' ? 'التقييمات'
      : 'ביקורות',
  };

  return (
    <div className="min-h-screen bg-[#001F3F]">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={coverImage}
          alt={tr.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F] via-[#001F3F]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#001F3F]/60 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-4 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-white/70">
              <Link href={`/${language}`} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                <Home size={14} />
              </Link>
              <ChevronRight size={14} className="text-white/30" />
              <Link href={`/${language}/tours`} className="hover:text-[#D4AF37] transition-colors">
                {labels.breadcrumbTours}
              </Link>
              <ChevronRight size={14} className="text-white/30" />
              <span className="text-[#D4AF37] font-medium truncate max-w-[200px]">{tr.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {tour.featured && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#D4AF37] text-[#001F3F] text-xs font-bold rounded-full uppercase">
                    <Star size={10} fill="currentColor" />
                    {language === 'ka' ? 'რეკომენდებული'
                      : language === 'en' ? 'Featured'
                      : language === 'ru' ? 'Рекомендуем'
                      : language === 'uk' ? 'Рекомендовано'
                      : language === 'ar' ? 'مميز'
                      : 'מומלץ'}
                  </span>
                )}
                <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-white text-xs rounded-full border border-white/10 capitalize">
                  {tour.region}
                </span>
                <span className={`px-3 py-1 ${diffConfig.bg} ${diffConfig.color} text-xs rounded-full border border-white/10`}>
                  {diffLabel}
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl">
                {tr.title}
              </h1>
              <p className="text-white/70 text-lg max-w-2xl line-clamp-2">
                {tr.shortDescription}
              </p>

              {/* Quick Info Row */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-white/60">
                <div className="flex items-center gap-1.5">
                  <Clock size={15} className="text-[#D4AF37]" />
                  <span>{tour.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={15} className="text-[#D4AF37]" />
                  <span>1-{tour.maxGroupSize}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={15} className="text-[#D4AF37]" />
                  <span>{tour.languages.map((l) => languageLabels[l] || l).join(', ')}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Back Link + Share */}
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
                className="flex items-center justify-between"
              >
                <Link
                  href={`/${language}/tours`}
                  className={`inline-flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                  <ArrowLeft size={16} className={isRTL ? 'rotate-180' : ''} />
                  {labels.back}
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="flex items-center gap-2 text-white/50 hover:text-[#D4AF37] transition-colors text-sm px-3 py-2 rounded-xl hover:bg-white/5"
                  >
                    <Share2 size={16} />
                    {labels.share}
                  </button>
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-48 glass-dark rounded-xl overflow-hidden shadow-2xl border border-white/10 z-50"
                      >
                        {[
                          { key: 'facebook', label: 'Facebook', color: '#1877F2' },
                          { key: 'twitter', label: 'Twitter', color: '#1DA1F2' },
                          { key: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
                          { key: 'copy', label: language === 'ka' ? 'ბმულის კოპირება' : language === 'en' ? 'Copy Link' : language === 'ru' ? 'Копировать ссылку' : 'Copy Link', color: '#D4AF37' },
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => handleShare(item.key)}
                            className="w-full px-4 py-2.5 text-left text-white text-sm hover:bg-white/10 transition-colors flex items-center gap-3"
                          >
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                            {item.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={sectionVariants}
              >
                <AccordionSection title={labels.description} icon={Star} defaultOpen={true}>
                  <p className="text-white/70 leading-relaxed text-base whitespace-pre-line pt-2">
                    {tr.description}
                  </p>
                </AccordionSection>
              </motion.div>

              {/* Highlights */}
              {tr.highlights && tr.highlights.length > 0 && (
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                >
                  <AccordionSection title={labels.highlights} icon={Star} defaultOpen={true}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {tr.highlights.map((highlight, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + idx * 0.08 }}
                          className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check size={14} className="text-[#D4AF37]" />
                          </div>
                          <span className="text-white/80 text-sm">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionSection>
                </motion.div>
              )}

              {/* Itinerary */}
              {tr.itinerary && tr.itinerary.length > 0 && (
                <motion.div
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                >
                  <AccordionSection title={labels.itinerary} icon={Clock} defaultOpen={true}>
                    <div className="relative pt-2">
                      {/* Timeline Line */}
                      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#D4AF37]/50 via-[#D4AF37]/20 to-transparent" />

                      <div className="space-y-0">
                        {tr.itinerary.map((item, idx) => {
                          const isFirst = idx === 0;
                          const isLast = idx === tr.itinerary.length - 1;
                          return (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + idx * 0.08 }}
                              className="relative flex items-start gap-4 py-3"
                            >
                              <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                isFirst
                                  ? 'bg-[#D4AF37] text-[#001F3F]'
                                  : isLast
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-white/10 text-white/60'
                              }`}>
                                <span className="text-xs font-bold">{idx + 1}</span>
                              </div>
                              <div className="flex-1 pt-2">
                                <span className="text-white/80 text-sm">{item}</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </AccordionSection>
                </motion.div>
              )}

              {/* What's Included */}
              {tour.includes && tour.includes.length > 0 && (
                <motion.div
                  custom={4}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                >
                  <AccordionSection title={labels.included} icon={Check}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                      {tour.includes.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 + idx * 0.05 }}
                          className="flex items-center gap-2.5 text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
                            <Check size={12} className="text-emerald-400" />
                          </div>
                          <span className="text-white/70">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionSection>
                </motion.div>
              )}

              {/* Not Included */}
              {tour.notIncludes && tour.notIncludes.length > 0 && (
                <motion.div
                  custom={5}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                >
                  <AccordionSection title={labels.notIncluded} icon={X}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                      {tour.notIncludes.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.45 + idx * 0.05 }}
                          className="flex items-center gap-2.5 text-sm"
                        >
                          <div className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center flex-shrink-0">
                            <X size={12} className="text-red-400" />
                          </div>
                          <span className="text-white/50">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </AccordionSection>
                </motion.div>
              )}

              {/* What to Bring */}
              {tour.whatToBring && tour.whatToBring.length > 0 && (
                <motion.div
                  custom={6}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                >
                  <AccordionSection title={labels.whatToBring} icon={Backpack}>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {tour.whatToBring.map((item, idx) => (
                        <motion.span
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.05 }}
                          className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/70"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </AccordionSection>
                </motion.div>
              )}

              {/* Gallery with Lightbox */}
              {tour.images.length > 1 && (
                <motion.div
                  custom={7}
                  initial="hidden"
                  animate="visible"
                  variants={sectionVariants}
                >
                  <AccordionSection title={labels.gallery} icon={Camera} defaultOpen={true}>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
                      {tour.images.map((img, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 cursor-pointer group"
                          onClick={() => setLightboxImage(img)}
                        >
                          <Image
                            src={img}
                            alt={`${tr.title} ${idx + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        </motion.div>
                      ))}
                    </div>
                  </AccordionSection>
                </motion.div>
              )}
            </div>

            {/* Right Column - Price Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:sticky lg:top-24 space-y-6"
              >
                {/* Price Card */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-6">
                  <div>
                    <span className="text-white/50 text-sm">{labels.perPerson}</span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-bold text-[#D4AF37]">{tour.priceGel} GEL</span>
                      <span className="text-white/40 text-sm">/ ${tour.priceUsd}</span>
                    </div>
                  </div>

                  {/* Group Size Selector */}
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      {labels.groupSizeLabel}
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-xl font-bold text-white w-8 text-center">{groupSize}</span>
                      <button
                        onClick={() => setGroupSize(Math.min(tour.maxGroupSize, groupSize + 1))}
                        className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
                      >
                        <Plus size={16} />
                      </button>
                      <span className="text-white/40 text-xs ml-2">(max {tour.maxGroupSize})</span>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-baseline justify-between">
                      <span className="text-white/70">{labels.totalPrice}</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-white">{totalPrice} GEL</span>
                        <div className="text-white/40 text-sm">~ ${totalPriceUsd}</div>
                      </div>
                    </div>
                  </div>

                  {/* Book via WhatsApp CTA */}
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#25D366]/20"
                  >
                    <MessageCircle size={20} />
                    {labels.bookViaWhatsApp}
                  </a>

                  {/* Quick Info */}
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 flex items-center gap-2">
                        <Clock size={14} className="text-[#D4AF37]" />
                        {labels.duration}
                      </span>
                      <span className="text-white">{tour.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 flex items-center gap-2">
                        <Users size={14} className="text-[#D4AF37]" />
                        {labels.maxGroup}
                      </span>
                      <span className="text-white">{tour.maxGroupSize}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/50 flex items-center gap-2">
                        <MapPin size={14} className="text-[#D4AF37]" />
                        {labels.difficulty}
                      </span>
                      <span className={`${diffConfig.color} text-xs font-medium px-2 py-0.5 rounded-full ${diffConfig.bg}`}>
                        {diffLabel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Reviews Placeholder */}
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star size={18} className="text-[#D4AF37]" />
                    <h3 className="text-white font-semibold">{labels.reviews}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="text-[#D4AF37]" fill="#D4AF37" />
                      ))}
                    </div>
                    <span className="text-white/70 text-sm">5.0 (12 {language === 'ka' ? 'მიმოხილვა' : language === 'en' ? 'reviews' : language === 'ru' ? 'отзывов' : 'reviews'})</span>
                  </div>
                  <p className="text-white/40 text-xs mt-3">
                    {language === 'ka' ? 'მიმოხილვები მალე დაემატება'
                      : language === 'en' ? 'Reviews coming soon'
                      : language === 'ru' ? 'Отзывы скоро будут добавлены'
                      : language === 'uk' ? 'Відгуки незабаром'
                      : language === 'ar' ? 'التقييمات قريباً'
                      : 'ביקורות בקרוב'}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="py-12 border-t border-white/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                {labels.relatedTours}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {relatedTours.map((t, idx) => (
                  <TourCard key={t.id} tour={t} index={idx} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <XIcon size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative w-full max-w-5xl max-h-[85vh] aspect-[16/9]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={lightboxImage}
                alt={tr.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
