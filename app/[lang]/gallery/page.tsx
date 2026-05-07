'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ZoomIn, Mountain, Waves, Building2, Palette } from 'lucide-react';

// Gallery image data with categories
const galleryImages = [
  {
    src: '/tours/kazbegi-mountain.jpg',
    alt: 'Kazbegi Mountain',
    category: 'mountains',
    title: {
      ka: 'ყაზბეგის მთა',
      en: 'Kazbegi Mountain',
      ru: 'Гора Казбек',
      he: 'הר קזבגי',
    },
  },
  {
    src: '/tours/svaneti-towers.jpg',
    alt: 'Svaneti Towers',
    category: 'mountains',
    title: {
      ka: 'სვანეთის კოშკები',
      en: 'Svaneti Towers',
      ru: 'Башни Сванетии',
      he: 'מגדלי סוואנתי',
    },
  },
  {
    src: '/tours/tusheti-village.jpg',
    alt: 'Tusheti Village',
    category: 'mountains',
    title: {
      ka: 'თუშეთის სოფელი',
      en: 'Tusheti Village',
      ru: 'Деревня Тушети',
      he: 'כפר טושתי',
    },
  },
  {
    src: '/tours/racha-lake.jpg',
    alt: 'Racha Lake',
    category: 'mountains',
    title: {
      ka: 'რაჭის ტბა',
      en: 'Racha Lake',
      ru: 'Озеро Рача',
      he: 'אגם ראצה',
    },
  },
  {
    src: '/tours/gudauri-ski.jpg',
    alt: 'Gudauri Ski Resort',
    category: 'mountains',
    title: {
      ka: 'გუდაურის სასრიალო',
      en: 'Gudauri Ski Resort',
      ru: 'Горнолыжный курорт Гудаури',
      he: 'אתר הסקי גודאורי',
    },
  },
  {
    src: '/tours/hero-batumi.jpg',
    alt: 'Batumi Coastline',
    category: 'sea',
    title: {
      ka: 'ბათუმის სანაპირო',
      en: 'Batumi Coastline',
      ru: 'Батумское побережье',
      he: 'חוף בתומי',
    },
  },
  {
    src: '/tours/martvili-canyon.jpg',
    alt: 'Martvili Canyon',
    category: 'sea',
    title: {
      ka: 'მარტვილის კანიონი',
      en: 'Martvili Canyon',
      ru: 'Каньон Мартвили',
      he: 'קניון מרטווילי',
    },
  },
  {
    src: '/tours/prometheus-cave.jpg',
    alt: 'Prometheus Cave',
    category: 'sea',
    title: {
      ka: 'პრომეთეს მღვიმე',
      en: 'Prometheus Cave',
      ru: 'Пещера Прометея',
      he: 'מערת פרומתאוס',
    },
  },
  {
    src: '/tours/rafting.jpg',
    alt: 'Rafting Adventure',
    category: 'sea',
    title: {
      ka: 'რაფტინგი',
      en: 'Rafting Adventure',
      ru: 'Рафтинг',
      he: 'רפטינג',
    },
  },
  {
    src: '/tours/hero-tbilisi.jpg',
    alt: 'Tbilisi Old Town',
    category: 'cities',
    title: {
      ka: 'თბილისის ძველი ქალაქი',
      en: 'Tbilisi Old Town',
      ru: 'Старый Тбилиси',
      he: 'העיר העתיקה של טביליסי',
    },
  },
  {
    src: '/tours/borjomi-park.jpg',
    alt: 'Borjomi Park',
    category: 'cities',
    title: {
      ka: 'ბორჯომის პარკი',
      en: 'Borjomi Park',
      ru: 'Парк Боржоми',
      he: "פארק בורג'ומי",
    },
  },
  {
    src: '/tours/vardzia-cave.jpg',
    alt: 'Vardzia Cave City',
    category: 'cities',
    title: {
      ka: 'ვარძიის მღვიმე-ქალაქი',
      en: 'Vardzia Cave City',
      ru: 'Пещерный город Вардзия',
      he: 'עיר המערות ורדזיה',
    },
  },
  {
    src: '/tours/kakheti-wine.jpg',
    alt: 'Kakheti Wine Region',
    category: 'culture',
    title: {
      ka: 'კახეთის ღვინის რეგიონი',
      en: 'Kakheti Wine Region',
      ru: 'Винный регион Кахетия',
      he: 'אזור היין קאחתי',
    },
  },
  {
    src: '/tours/food-supra.jpg',
    alt: 'Georgian Supra',
    category: 'culture',
    title: {
      ka: 'ქართული სუფრა',
      en: 'Georgian Supra',
      ru: 'Грузинский супра',
      he: 'סופרה גאורגית',
    },
  },
  {
    src: '/tours/paragliding.jpg',
    alt: 'Paragliding over Georgia',
    category: 'mountains',
    title: {
      ka: 'პარაგლაიდინგი',
      en: 'Paragliding over Georgia',
      ru: 'Параглайдинг',
      he: 'פרגלידינג',
    },
  },
  {
    src: '/images/batumi/night-beach.jpg',
    alt: 'Batumi Night Beach',
    category: 'sea',
    title: {
      ka: 'ბათუმის ღამის სანაპირო',
      en: 'Batumi Night Beach',
      ru: 'Ночной пляж Батуми',
      he: 'חוף לילה בתומי',
    },
  },
  {
    src: '/images/batumi/sunset-sea.jpg',
    alt: 'Batumi Sunset',
    category: 'sea',
    title: {
      ka: 'ბათუმის მზის ჩასვლა',
      en: 'Batumi Sunset',
      ru: 'Закат в Батуми',
      he: 'שקיעה בבתומי',
    },
  },
  {
    src: '/images/batumi/aerial-coastline.jpg',
    alt: 'Batumi Aerial View',
    category: 'cities',
    title: {
      ka: 'ბათუმის ხედი ზემოდან',
      en: 'Batumi Aerial View',
      ru: 'Вид на Батуми с высоты',
      he: 'נוף אווירי של בתומי',
    },
  },
  {
    src: '/images/batumi/night-skyline.jpg',
    alt: 'Batumi Skyline',
    category: 'cities',
    title: {
      ka: 'ბათუმის ჰორიზონტი',
      en: 'Batumi Skyline',
      ru: 'Панорама Батуми',
      he: 'קו הרקיע של בתומי',
    },
  },
  {
    src: '/images/batumi/green-cityscape.jpg',
    alt: 'Batumi Green City',
    category: 'cities',
    title: {
      ka: 'მწვანე ბათუმი',
      en: 'Green Batumi',
      ru: 'Зеленый Батуми',
      he: 'בתומי הירוקה',
    },
  },
];

type Category = 'all' | 'mountains' | 'sea' | 'cities' | 'culture';

const categories: { id: Category; icon: React.ReactNode }[] = [
  { id: 'all', icon: <ZoomIn className="w-4 h-4" /> },
  { id: 'mountains', icon: <Mountain className="w-4 h-4" /> },
  { id: 'sea', icon: <Waves className="w-4 h-4" /> },
  { id: 'cities', icon: <Building2 className="w-4 h-4" /> },
  { id: 'culture', icon: <Palette className="w-4 h-4" /> },
];

// Masonry column heights for visual variety
const getMasonryHeight = (index: number): string => {
  const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-60', 'h-88'];
  return heights[index % heights.length];
};

export default function GalleryPage() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    setIsRTL(locale === 'he');
  }, [locale]);

  const filteredImages = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrevious = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  }, [selectedImage, filteredImages.length]);

  const goToNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  }, [selectedImage, filteredImages.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        setSelectedImage(prev => prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1);
      }
      if (e.key === 'ArrowRight') {
        setSelectedImage(prev => prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, filteredImages.length, closeLightbox]);

  return (
    <main className="min-h-screen bg-[#001F3F]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B35]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4ECDC4]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-full font-medium
                  transition-all duration-300 ease-out
                  ${activeCategory === category.id
                    ? 'bg-[#FF6B35] text-white shadow-lg shadow-[#FF6B35]/30 scale-105'
                    : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  }
                `}
              >
                {category.icon}
                <span>{t(`categories.${category.id}`)}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid - Masonry Layout */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredImages.map((image, index) => (
                <motion.div
                  key={image.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="break-inside-avoid"
                >
                  <div
                    onClick={() => openLightbox(index)}
                    className={`
                      group relative overflow-hidden rounded-2xl cursor-pointer
                      ${getMasonryHeight(index)}
                      bg-white/5
                    `}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-lg">
                          {image.title[locale as keyof typeof image.title] || image.title.en}
                        </h3>
                        <p className="text-white/70 text-sm capitalize">
                          {t(`categories.${image.category}`)}
                        </p>
                      </div>
                      
                      {/* Zoom icon */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-white/60 text-lg">{t('noImages')}</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation - Previous */}
            <button
              onClick={goToPrevious}
              className={`
                absolute z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 
                flex items-center justify-center transition-colors
                ${isRTL ? 'right-4' : 'left-4'}
                top-1/2 -translate-y-1/2
              `}
            >
              {isRTL ? (
                <ChevronRight className="w-6 h-6 text-white" />
              ) : (
                <ChevronLeft className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Navigation - Next */}
            <button
              onClick={goToNext}
              className={`
                absolute z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 
                flex items-center justify-center transition-colors
                ${isRTL ? 'left-4' : 'right-4'}
                top-1/2 -translate-y-1/2
              `}
            >
              {isRTL ? (
                <ChevronLeft className="w-6 h-6 text-white" />
              ) : (
                <ChevronRight className="w-6 h-6 text-white" />
              )}
            </button>

            {/* Image container */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-[75vh] object-contain rounded-lg"
                  priority
                />
              </div>

              {/* Image info */}
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold">
                  {(filteredImages[selectedImage].title as Record<string, string>)[locale] || 
                   filteredImages[selectedImage].title.en}
                </h3>
                <p className="text-white/60 mt-1">
                  {selectedImage + 1} / {filteredImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
