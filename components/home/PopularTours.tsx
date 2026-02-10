'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { tours } from '@/data/content';
import { formatPrice, cn } from '@/lib/utils';
import { Clock, MapPin, Star, TrendingUp } from 'lucide-react';

export function PopularTours() {
  const { t, language, isRTL } = useLanguage();

  const labels = {
    explore: {
      ka: 'აღმოაჩინე სილამაზე',
      en: 'Explore the Beauty',
      ru: 'Откройте красоту',
      uk: 'Відкрийте красу',
      ar: 'استكشف الجمال',
      he: 'גלה את היופי'
    },
    startingFrom: {
      ka: 'იწყება',
      en: 'Starting from',
      ru: 'От',
      uk: 'Від',
      ar: 'يبدأ من',
      he: 'החל מ-'
    },
    viewAll: {
      ka: 'ყველა ტურის ნახვა',
      en: 'View All Tours',
      ru: 'Все туры',
      uk: 'Всі тури',
      ar: 'عرض جميع الجولات',
      he: 'צפה בכל הסיורים'
    }
  };

  return (
    <section id="tours" className="py-24 bg-primary dark:bg-black relative overflow-hidden transition-colors duration-500">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className={cn("max-w-2xl", isRTL && "md:text-right")}>
            <h2 className={cn(
              "text-accent font-bold tracking-widest uppercase mb-4 flex items-center gap-2",
              isRTL && "flex-row-reverse"
            )}>
              <TrendingUp size={20} />
              {labels.explore[language]}
            </h2>
            <h3 className={cn(
              "text-4xl md:text-5xl font-black text-white",
              isRTL ? "font-arabic" : "font-inter"
            )}>
              {t.sections.popularTours}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass-dark rounded-[40px] overflow-hidden border border-white/5 hover:border-accent/30 transition-all duration-500 hover:-translate-y-2 shadow-2xl"
            >
              <div className="relative h-80 overflow-hidden">
                <img 
                  src={tour.image} 
                  alt={tour.title[language]}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute top-6 right-6 glass px-4 py-1.5 rounded-full text-white text-sm font-bold flex items-center gap-1.5 shadow-lg">
                  <Star size={14} className="text-accent fill-accent" />
                  <span>4.9</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                   <div className={cn("flex items-center gap-2 text-white font-medium", isRTL && "flex-row-reverse")}>
                      <Clock size={18} className="text-accent" />
                      <span>{tour.duration[language]}</span>
                   </div>
                </div>
              </div>

              <div className="p-8">
                <h4 className={cn(
                  "text-2xl font-black text-white mb-4 group-hover:text-accent transition-colors tracking-tight",
                  isRTL ? "font-arabic text-right" : "font-inter"
                )}>
                  {tour.title[language]}
                </h4>
                <p className={cn(
                  "text-white/50 text-sm mb-8 leading-relaxed line-clamp-3",
                  isRTL && "text-right"
                )}>
                  {tour.description[language]}
                </p>

                <div className={cn(
                  "flex items-center justify-between pt-8 border-t border-white/5",
                  isRTL && "flex-row-reverse"
                )}>
                  <div className={cn(isRTL && "text-right")}>
                    <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-1">
                      {labels.startingFrom[language]}
                    </p>
                    <p className="text-3xl font-black text-accent tracking-tighter">
                      {language === 'ka' ? formatPrice(tour.priceGEL, 'GEL') : formatPrice(tour.priceUSD, 'USD')}
                    </p>
                  </div>
                  <button className="bg-white/5 hover:bg-accent hover:text-primary text-white p-4 rounded-2xl transition-all duration-500 shadow-lg group-hover:rotate-12">
                    <MapPin size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <button className="text-white border border-white/10 px-12 py-4 rounded-full font-bold hover:bg-white hover:text-primary hover:border-white transition-all duration-300 shadow-xl active:scale-95">
            {labels.viewAll[language]}
          </button>
        </div>
      </div>
    </section>
  );
}
