'use client';

import { RegionData, ExtendedTour } from '@/types/tour';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Compass, Mountain, ArrowRight, Clock, Users, Star, ChevronRight, Home, Filter } from 'lucide-react';
import { TourCard } from './TourCard';
import { useState, useMemo } from 'react';

export interface RegionDetails {
  about: string;
  facts: string[];
  bestTime: string;
  attractions: { name: string; desc: string }[];
}

interface RegionDetailClientProps {
  region: RegionData;
  regionTr: { name: string; description: string };
  details: RegionDetails;
  regionTours: ExtendedTour[];
  relatedRegions: RegionData[];
  lang: string;
  isRTL: boolean;
}

export function RegionDetailClient({
  region,
  regionTr,
  details,
  regionTours,
  relatedRegions,
  lang,
  isRTL,
}: RegionDetailClientProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Get unique categories from tours
  const tourCategories = useMemo(() => {
    const cats = new Set<string>();
    regionTours.forEach((t) => cats.add(t.category));
    return Array.from(cats);
  }, [regionTours]);

  const filteredTours = useMemo(() => {
    if (categoryFilter === 'all') return regionTours;
    return regionTours.filter((t) => t.category === categoryFilter);
  }, [categoryFilter, regionTours]);

  // Translations
  const t = {
    about: lang === 'ka' ? `რეგიონის შესახებ`
      : lang === 'en' ? `About ${regionTr.name}`
      : lang === 'ru' ? `О регионе ${regionTr.name}`
      : lang === 'uk' ? `Про регіон ${regionTr.name}`
      : lang === 'ar' ? `حول ${regionTr.name}`
      : `אודות ${regionTr.name}`,
    facts: lang === 'ka' ? 'საინტერესო ფაქტები'
      : lang === 'en' ? 'Interesting Facts'
      : lang === 'ru' ? 'Интересные факты'
      : lang === 'uk' ? 'Цікаві факти'
      : lang === 'ar' ? 'حقائق مثيرة للاهتمام'
      : 'עובדות מעניינות',
    bestTime: lang === 'ka' ? 'საუკეთესო დრო ვიზიტისთვის'
      : lang === 'en' ? 'Best Time to Visit'
      : lang === 'ru' ? 'Лучшее время для посещения'
      : lang === 'uk' ? 'Найкращий час для відвідування'
      : lang === 'ar' ? 'أفضل وقت للزيارة'
      : 'הזמן הטוב ביותר לביקור',
    attractions: lang === 'ka' ? 'ღირსშესანიშნაობები'
      : lang === 'en' ? 'Nearby Attractions'
      : lang === 'ru' ? 'Достопримечательности'
      : lang === 'uk' ? 'Визначні пам\'ятки'
      : lang === 'ar' ? 'معالم الجذب القريبة'
      : 'אתרים בקרבת מקום',
    tours: lang === 'ka' ? `ტურები ${regionTr.name}ში`
      : lang === 'en' ? `Tours in ${regionTr.name}`
      : lang === 'ru' ? `Туры в ${regionTr.name}`
      : lang === 'uk' ? `Тури в ${regionTr.name}`
      : lang === 'ar' ? `جولات في ${regionTr.name}`
      : `סיורים ב${regionTr.name}`,
    toursDesc: lang === 'ka' ? 'აღმოაჩინეთ ჩვენი შერჩეული ტურები ამ რეგიონში'
      : lang === 'en' ? 'Discover our handpicked tours in this region'
      : lang === 'ru' ? 'Откройте для себя наши отобранные туры в этом регионе'
      : lang === 'uk' ? 'Відкрийте для себе наші відібрані тури в цьому регіоні'
      : lang === 'ar' ? 'اكتشف جولاتنا المختارة في هذا الإقليم'
      : 'גלה את הסיורים הנבחרים שלנו באזור זה',
    noTours: lang === 'ka' ? 'ამ რეგიონში ჯერ არ არის ტურები. მალე დაემატება!'
      : lang === 'en' ? 'No tours in this region yet. Coming soon!'
      : lang === 'ru' ? 'В этом регионе пока нет туров. Скоро!'
      : lang === 'uk' ? 'У цьому регіоні ще нема турів. Скоро!'
      : lang === 'ar' ? 'لا توجد جولات في هذا الإقليم حتى الآن. قريباً!'
      : 'אין עדיין סיורים באזור זה. בקרוב!',
    allTours: lang === 'ka' ? 'ყველა ტურის ნახვა'
      : lang === 'en' ? 'View all tours'
      : lang === 'ru' ? 'Посмотреть все туры'
      : lang === 'uk' ? 'Переглянути всі тури'
      : lang === 'ar' ? 'عرض جميع الجولات'
      : 'צפה בכל הסיורים',
    relatedRegions: lang === 'ka' ? 'მსგავსი რეგიონები'
      : lang === 'en' ? 'Explore Related Regions'
      : lang === 'ru' ? 'Исследуйте схожие регионы'
      : lang === 'uk' ? 'Дослідіть схожі регіони'
      : lang === 'ar' ? 'استكشف المناطق ذات الصلة'
      : 'גלה אזורים קשורים',
    customTour: lang === 'ka' ? `ინდივიდუალური ტური ${regionTr.name}ში`
      : lang === 'en' ? `Book Custom Tour in ${regionTr.name}`
      : lang === 'ru' ? `Заказать индивидуальный тур в ${regionTr.name}`
      : lang === 'uk' ? `Замовити індивідуальний тур в ${regionTr.name}`
      : lang === 'ar' ? `حجز جولة مخصصة في ${regionTr.name}`
      : `הזמן סיור מותאם אישית ב${regionTr.name}`,
    customTourDesc: lang === 'ka' ? 'ჩვენ შეგვიძლია დაგიგეგმოთ ინდივიდუალური მარშრუტი თქვენი სურვილების მიხედვით'
      : lang === 'en' ? 'We can plan a custom route according to your preferences'
      : lang === 'ru' ? 'Мы можем спланировать индивидуальный маршрут по вашим пожеланиям'
      : lang === 'uk' ? 'Ми можемо спланувати індивідуальний маршрут за вашими побажаннями'
      : lang === 'ar' ? 'يمكننا تخطيط مسار مخصص حسب تفضيلاتك'
      : 'נוכל לתכנן מסלול מותאם אישית לפי ההעדפות שלך',
    contactUs: lang === 'ka' ? 'დაგვიკავშირდით'
      : lang === 'en' ? 'Contact Us'
      : lang === 'ru' ? 'Свяжитесь с нами'
      : lang === 'uk' ? 'Зв\'яжіться з нами'
      : lang === 'ar' ? 'اتصل بنا'
      : 'צור קשר',
    quickInfo: lang === 'ka' ? 'სწრაფი ინფო'
      : lang === 'en' ? 'Quick Info'
      : lang === 'ru' ? 'Краткая информация'
      : lang === 'uk' ? 'Швидка інформація'
      : lang === 'ar' ? 'معلومات سريعة'
      : 'מידע מהיר',
    availableTours: lang === 'ka' ? 'ხელმისაწვდომი ტურები'
      : lang === 'en' ? 'Available Tours'
      : lang === 'ru' ? 'Доступные туры'
      : lang === 'uk' ? 'Доступні тури'
      : lang === 'ar' ? 'الجولات المتاحة'
      : 'סיורים זמינים',
    attractionsCount: lang === 'ka' ? 'ღირსშესანიშნაობები'
      : lang === 'en' ? 'Attractions'
      : lang === 'ru' ? 'Достопримечательности'
      : lang === 'uk' ? 'Пам\'ятки'
      : lang === 'ar' ? 'معالم الجذب'
      : 'אתרים',
    allCategories: lang === 'ka' ? 'ყველა კატეგორია'
      : lang === 'en' ? 'All Categories'
      : lang === 'ru' ? 'Все категории'
      : lang === 'uk' ? 'Всі категорії'
      : lang === 'ar' ? 'جميع الفئات'
      : 'כל הקטגוריות',
    breadcrumbRegions: lang === 'ka' ? 'რეგიონები'
      : lang === 'en' ? 'Regions'
      : lang === 'ru' ? 'Регионы'
      : lang === 'uk' ? 'Регіони'
      : lang === 'ar' ? 'المناطق'
      : 'אזורים',
  };

  const categoryLabels: Record<string, Record<string, string>> = {
    city: { ka: 'ქალაქური', en: 'City', ru: 'Городской', uk: 'Міський', ar: 'مدينة', he: 'עירוני' },
    mountain: { ka: 'მთის', en: 'Mountain', ru: 'Горный', uk: 'Гірський', ar: 'جبل', he: 'הרים' },
    wine: { ka: 'ღვინის', en: 'Wine', ru: 'Винный', uk: 'Винний', ar: 'نبيذ', he: 'יין' },
    adventure: { ka: 'სათავგადასავლო', en: 'Adventure', ru: 'Приключение', uk: 'Пригода', ar: 'مغامرة', he: 'הרפתקה' },
    cultural: { ka: 'კულტურული', en: 'Cultural', ru: 'Культурный', uk: 'Культурний', ar: 'ثقافي', he: 'תרבותי' },
    food: { ka: 'გასტრონომიული', en: 'Food', ru: 'Гастро', uk: 'Гастро', ar: 'طعام', he: 'אוכל' },
    transfer: { ka: 'ტრანსფერი', en: 'Transfer', ru: 'Трансфер', uk: 'Трансфер', ar: 'نقل', he: 'הסעה' },
    custom: { ka: 'ინდივიდუალური', en: 'Custom', ru: 'Индивид.', uk: 'Індивід.', ar: 'مخصص', he: 'מותאם' },
  };

  const getCategoryLabel = (catId: string) => {
    return categoryLabels[catId]?.[lang] || catId;
  };

  return (
    <div className="min-h-screen bg-[#001F3F]">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <Image
          src={region.image}
          alt={regionTr.name}
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
            <nav className={`flex items-center gap-2 text-sm text-white/70 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Link href={`/${lang}`} className="hover:text-[#D4AF37] transition-colors flex items-center gap-1">
                <Home size={14} />
              </Link>
              <ChevronRight size={14} className={`text-white/30 ${isRTL ? 'rotate-180' : ''}`} />
              <Link href={`/${lang}/regions`} className="hover:text-[#D4AF37] transition-colors">
                {t.breadcrumbRegions}
              </Link>
              <ChevronRight size={14} className={`text-white/30 ${isRTL ? 'rotate-180' : ''}`} />
              <span className="text-[#D4AF37] font-medium">{regionTr.name}</span>
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
              <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-4`}>
                <MapPin size={16} className="text-[#D4AF37]" />
                <span className="text-white/80 text-sm">{regionTr.name}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {regionTr.name}
              </h1>
              <p className="text-white/70 text-lg max-w-2xl line-clamp-2">
                {regionTr.description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-4">{t.about}</h2>
                <p className="text-white/60 leading-relaxed text-base">
                  {details.about}
                </p>
              </motion.div>

              {/* Interesting Facts */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                  <Star size={18} className="text-[#D4AF37]" />
                  {t.facts}
                </h3>
                <div className="space-y-3">
                  {details.facts.map((fact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-3"
                    >
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="text-white/60 text-sm pt-1">{fact}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Best Time */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-gradient-to-br from-[#001F3F] to-[#003366] rounded-2xl p-6 border border-[#D4AF37]/20"
              >
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Calendar size={18} className="text-[#D4AF37]" />
                  {t.bestTime}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">{details.bestTime}</p>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Attractions */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Compass size={18} className="text-[#D4AF37]" />
                  {t.attractions}
                </h3>
                <div className="space-y-4">
                  {details.attractions.map((attr, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex gap-3"
                    >
                      <Mountain size={15} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-white text-sm">{attr.name}</h4>
                        <p className="text-xs text-white/40">{attr.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-4">{t.quickInfo}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">{t.availableTours}</span>
                    <span className="font-bold text-[#D4AF37]">{regionTours.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/40">{t.attractionsCount}</span>
                    <span className="font-medium text-white">{details.attractions.length}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours in this Region */}
      {regionTours.length > 0 && (
        <section className="py-12 md:py-16 border-t border-white/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t.tours}
              </h2>
              <p className="text-white/50">{t.toursDesc}</p>
            </motion.div>

            {/* Category Filter */}
            {tourCategories.length > 1 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <Filter size={14} className="text-white/40 mr-1" />
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all ${
                    categoryFilter === 'all'
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                  }`}
                >
                  {t.allCategories}
                </button>
                {tourCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(categoryFilter === cat ? 'all' : cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-all capitalize ${
                      categoryFilter === cat
                        ? 'bg-[#D4AF37]/20 border-[#D4AF37]/50 text-[#D4AF37]'
                        : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    {getCategoryLabel(cat)}
                  </button>
                ))}
              </div>
            )}

            {filteredTours.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTours.map((tour, idx) => (
                  <TourCard key={tour.id} tour={tour} index={idx} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/50">{t.noTours}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Related Regions */}
      <section className="py-12 md:py-16 border-t border-white/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white">{t.relatedRegions}</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedRegions.map((relRegion, index) => {
              const relTr = relRegion.translations[lang as keyof typeof relRegion.translations] || relRegion.translations.en;
              return (
                <motion.div
                  key={relRegion.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/${lang}/regions/${relRegion.slug}`} className="group block">
                    <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10">
                      <Image
                        src={relRegion.image}
                        alt={relTr.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-lg font-bold text-white">{relTr.name}</h3>
                        <span className={`text-sm text-[#D4AF37] flex items-center gap-1 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {lang === 'ka' ? 'გაიგე მეტი'
                            : lang === 'en' ? 'Explore'
                            : lang === 'ru' ? 'Исследовать'
                            : lang === 'uk' ? 'Дослідити'
                            : lang === 'ar' ? 'استكشف'
                            : 'חקור'}
                          <ArrowRight size={12} className={isRTL ? 'rotate-180' : ''} />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA - Book Custom Tour */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#001F3F] to-[#003366] border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              {t.customTour}
            </h2>
            <p className="text-white/60 mb-8">
              {t.customTourDesc}
            </p>
            <a
              href={`https://wa.me/+995599123456?text=${encodeURIComponent(
                `Hello! I'm interested in a custom tour in ${regionTr.name}. Please contact me to discuss details.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white px-8 py-4 rounded-2xl font-bold transition-all hover:shadow-lg hover:shadow-[#25D366]/20"
            >
              <Clock size={18} />
              {t.contactUs}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
